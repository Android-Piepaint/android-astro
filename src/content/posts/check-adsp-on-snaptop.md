---
title: 如何檢定 Snapdragon 裝置遠端處理器的運轉情況，保證裝置功能正常工作
published: 2026-06-06
description: 給希望在驍龍平臺上體驗 mainline kernel 的使用者提供基礎的除錯知識。
image: 'assets/yoga-air-14s.jpg'
tags: [FOSS, ARM, Qualcomm]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---
:::note
本文提及的檢定方法均以個人的直接觀察和使用經歷爲基礎，部分技術細節需要精通高通平臺或 Arm 晶片的開發者，或者專業人士進行檢定和勘誤。
如果妳想要補充更多細節，或想要修正錯誤，歡迎聯繫我。
:::

今天 Piepaint 要來講述如何檢定 Linux 作業系統下 Snapdragon 晶片各遠端處理器的運行情況。</br>

# 關於遠端處理器(Remote Processor)的紹介

遠端處理器（Remote Processor）是晶片系統（SoC）上用於處理特定任務或高即時性（Real-time）需求的獨立處理器核心，它們受主處理器及主作業系統的管理與調度。視具體業務需求與晶片設計而定，這些輔助核心通常會執行專屬的裸機程式（Bare-metal）或即時作業系統（RTOS），並透過特定的 IPC 機制與主處理器溝通。</br>
</br>

例如，Google Pixel 手機中所搭載的 Samsung G5300 數據機（Modem）便是執行自己的 RTOS[^1]，並與 Tensor 主處理器進行資料交換。與遠端處理器相對的概念是「主處理器（Main Processor）」，在行動裝置與嵌入式領域中更常被稱為「應用處理器（Application Processor）」。主要負責執行功能完整、結構龐大的通用作業系統，如 Android、Linux 或 BSD。</br>
</br>

應用處理器雖然運算效能強大，但它是為了應付高吞吐量的多工任務而設計的，並不具備「硬即時性（Hard Real-Time）」。以 Linux 作業系統為例，雖然它擁有強大的生態，但在原生設計上，其任務調度與搶佔（Preemption）機制是為了公平分配 CPU 資源，而非保證微秒級的絕對延遲。即使加上了 `PREEMPT_RT` 補丁，在面對極端硬體控制或低功耗常駐監聽時，讓龐大的 Linux 核心保持喚醒依舊非常耗電且不夠精準。</br>
</br>
遠端處理器正是為了彌補這些缺陷而生。透過將特定任務「外包」給這些專職的輔助核心，SoC 能夠在維持極佳能效比的同時，確保關鍵任務的絕對即時回應。</br>

# 瞭解 Snapdragon 裝置的遠端處理器

進入實作檢定之前，我們有必要先了解驍龍異質架構（Hexagon DSP 與處理器子系統）中常見的幾位「遠端成員」[^2]：</br>

- ADSP (Audio Digital Signal Processor)： 負責音訊解碼、低功耗語音喚醒（如語音助手常駐監聽）以及音效處理。還負責管理 USB 控制器和電池計量回報；
- CDSP (Compute Digital Signal Processor)： 專門用於加速電腦視覺、圖像處理（ISP 輔助）以及輕量級的機器學習/神經網路推理任務；
- MPSS (Modem Peripheral Subsystem, 簡稱數據機(Modem))： 負責處理極其複雜的 4G/5G 基頻通訊協議；
- WPSS (Wireless Processor Subsystem): 負責無線基頻管理。</br>

</br>

 在筆電以及 IoT 平臺上，最常見的是 ADSP，CDSP，少數支援使用行動數據鏈接網際網路的裝置(還有原型機)會有 Modem。</br>
 在 Linux 上，Linux kernel 會藉由 `rmtfs` 或者 QMI protocol 來管理[^3]，與遠端處理器之間交換資料。Linux 的 `remoteproc` 框架會提供使用者一個 `sysfs` API 用於管理遠端處理器。</br>
 
 </br>


# 檢定遠端處理器的運轉情況

## ADSP 檢定

看一下你的系統 Menu bar，電池圖示是否展示為紅色驚嘆號？在驍龍平台上，ADSP 除了負責音訊，還負責處理電池電量回報的事務。如果 ADSP 韌體沒有成功載入，或者不小心載入到「精簡版韌體（Lite Firmware）」，底層的 qcom-battmgr 驅動就會噴出 uevent 相關錯誤，導致系統完全無法讀取電池剩餘容量。</br>

<img src="/assets/empty-battery.png">

如果載入的是完整韌體，就可以正常展示容量信息。

<img src="/assets/full-battery.png">

另外可以檢查音訊裝置，如果展示的是「Dummy Output」，通過 `aplay -l` 命令找不到可用的音訊裝置，表示 ADSP 韌體沒有加載。</br>

### 通過 `dmesg` 檢定

想要找出 ADSP 是否正常執行，就只能通過檢視 `dmesg` 來確認了。如果 ADSP 成功啓動，那麼 `dmesg` 會出現 `remote processor adsp is now up` 的 log：

```yaml
# dmesg | grep adsp
[   13.901682] remoteproc remoteproc0: adsp is available
[   13.932580] remoteproc remoteproc0: powering up adsp
[   13.941412] remoteproc remoteproc0: Booting fw image qcom/x1e80100/LENOVO/83ED/qcadsp8380.mbn, size 21592504
[   14.277891] remoteproc remoteproc0: remote processor adsp is now up
[   14.297322] PDR: Indication received from msm/adsp/charger_pd, state: 0x1fffffff, trans-id: 1
[   14.310033] PDR: Indication received from msm/adsp/audio_pd, state: 0x1fffffff, trans-id: 1
[   14.310088] qcom,apr 6800000.remoteproc:glink-edge.adsp_apps.-1.-1: Adding APR/GPR dev: gprsvc:service:2:1
[   14.310142] qcom,apr 6800000.remoteproc:glink-edge.adsp_apps.-1.-1: Adding APR/GPR dev: gprsvc:service:2:2
```
同時 `/sys/class/remoteproc/` 也會出現 `remoteproc0` 裝置。

```bash
#cat /sys/class/remoteproc/remoteproc0/name   ##檢視遠端處理器名稱
adsp

#ls /sys/class/remoteproc/remoteproc0/      ##遠端處理器的其他 node  
6800000.remoteproc:glink-edge  device    name   qcom_common.pd-mapper.0  state      uevent
coredump                       firmware  power  recovery                 subsystem

#cat /sys/class/remoteproc/remoteproc0/state     ##檢視遠端處理器狀態
running
```

## CDSP 檢定

CDSP（Compute DSP）主要負責影像處理與 AI/NPU 運算，目前在 GNOME 等圖形介面上沒有直接對應的狀態圖示。要確認其運作狀況，我們主要依賴核心日誌：

```yaml
#dmesg | grep cdsp
[   13.908248] remoteproc remoteproc1: cdsp is available
[   13.914113] remoteproc remoteproc1: powering up cdsp
[   13.915599] remoteproc remoteproc1: Booting fw image qcom/x1e80100/LENOVO/83ED/qccdsp8380.mbn, size 2990504
[   14.059488] remoteproc remoteproc1: remote processor cdsp is now up
```

`/sys/class/remoteproc/` 也會出現 `remoteproc1` 裝置。

```bash
#cat /sys/class/remoteproc/remoteproc1/name   ##檢視遠端處理器名稱
cdsp

#ls /sys/class/remoteproc/remoteproc1/        
32300000.remoteproc:glink-edge  device    name   qcom_common.pd-mapper.1  state      uevent
coredump                        firmware  power  recovery                 subsystem

#cat /sys/class/remoteproc/remoteproc1/state  ##檢視遠端處理器狀態
running
```

## Modem 檢定

高通的 Modem 是作爲遠端處理器存在的，並不像其他平臺通過 PCIe 外掛。最簡單的方法就是看一下狀態列上是否出現「信號格」的圖示，GNOME 設定中是否出現 「Moblie broadband」的選項；或者 `mmcli` 是否可以檢視到數據機的資訊。</br>

另外也可以檢視 `dmesg` 。如果數據機成功啓動，那麼 `dmesg` 會出現 `remote processor modem is now up` 的日誌。同樣也可以在 `/sys/class/remoteproc` 中發現數據機裝置。

# 如果妳想要管理遠端處理器

雖然遠端處理器的韌體是徹底的「黑箱」，沒有任何人可以檢視原始碼並改善它，但我們依然可以通過 `sysfs` 來管理這些遠程處理器。

<img src="/assets/remoteproc-support.png">

Linux 的 `remoteproc` 框架會實時收集遠端處理器的狀態並提供用於啓動和關閉處理器的接口。位於 userspace 的程式或者系統服務隨時都可以藉助 `sysfs` 檢視並管理所有遠端處理器的狀態：

```bash
# 打開遠端處理器:
  echo "start" > /sys/class/remoteproc/remoteprocN/state

# 關閉遠端處理器:
  echo "stop" > /sys/class/remoteproc/remoteprocN/state

# 打開核心轉儲(coredump)除錯功能：
echo enabled > /sys/kernel/debug/remoteproc/remoteprocN/coredump

# 關閉核心轉儲(coredump)除錯功能：
echo disabled > /sys/kernel/debug/remoteproc/remoteprocN/coredump
```

[^1]: [FCC block diagram about Samsung modem](https://fccid.io/T8GSAN9000/User-Manual/Users-Manual-5118614.pdf)
[^2]:[Configure the remoteprocessor (remoteproc) subsystems -- Qualcomm Docs](https://docs.qualcomm.com/doc/80-80020-3/topic/remoteproc-overview.html)
[^3]:[QMI Protocol -- DeepWiki linux-msm rmtfs](https://deepwiki.com/linux-msm/rmtfs/7-qmi-protocol)	
		
			
		
	