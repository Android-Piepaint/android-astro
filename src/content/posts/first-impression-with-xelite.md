---
title: 當 Linux 遇上 Qualcomm X Elite —— Fedora 44 在 Lenovo YOGA Slim 7x 的體驗
published: 2026-06-10
description: 我或許是世界第一個在聯想 YOGA Slim 7x 驍龍筆電上安裝並測試 Linux 的用戶...
image: 'assets/yoga-air-14s.png'
tags: [Qualcomm, Laptop, ARM, Linux, Embed]
category: 'Laptop'
draft: false 
lang: 'zh_TW'
---
（原文寫於9月16日）我一直都對採用ARM晶片的筆記本電腦有着濃厚的興趣。不僅僅是因爲CPU與衆不同，更是因爲被RISC晶片的優秀能耗比所驚豔，在優越的性能表現下，卻又有着長久的續航能力。這是普通x86架構的筆電所無法企及的。然而，因爲一個小小的意外，我與這臺筆電的故事，便從此開始了。

## 我爲什麼選擇 Qualcomm X Elite 筆電？

我最早看到有關驍龍版筆電的消息是在2020年，第一次知道了 Windows還有 ARM 的版本。以及一系列關於 Windows on ARM 裝置的技術知識。一般手機改裝 Windows 作業系統的驅動程式，大多是由搭載 Windows ARM 的筆電，原型機等裝置的驅動程式提取並簡單修改而來的。我便在網路上檢索有關 Windows on ARM 的裝置，結果發現市面上竟然真的有這樣的筆電！它們採用高通驍龍SoC，使用 eMMC 或者 UFS 快閃記憶體作爲內置硬碟。並且支援硬體虛擬化，還內建數據機，方便在沒有無線網路的地方，使用行動數據來連接到網際網路。</br>
</br>
另外驍龍筆電在 Linux 下的體驗是遠勝過 Windows on ARM 的，風扇比較安靜，幾乎不會有「開足馬力」的時候，可以使用KVM 和 Xen，因此可以滿足我所有的用途。</br>
</br>

## 我對於「驍龍筆電」的印象

我所購買的裝置是聯想的 YOGA Slim 7x。配備了一個解析度爲2944x1840的OLED屏幕，其重新整理頻率爲90Hz，支援觸控。以及驍龍 X Elite 晶片。筆電採用 32GB LPDDR5x 記憶體，1TB的 Samsung NVME高速固態硬碟。到手的時候，我發現它安裝的是 Windows 11 ARM 版，塞了不少 Lenovo 的 bloadware 進去。因爲現在主要 Linux 發行版套件庫已經收錄了驍龍 X Elite 的韌體，不需要再從 Windows 系統檔案提取，
我選擇抹掉整張硬碟，僅安裝 Fedora Linux 作爲筆電的作業系統。</br>

## 安裝 Linux

首先關閉 Windows 自帶的 Bitlocker 硬碟加密，然後將筆電重開機，在開機時按 `F2`,以此進入 UEFI設定。選擇「安全」選項，之後關閉安全啓動，之後從瀏覽器檢索「Fedora」，下載 Fedora 44 映像檔開機，根據 [Fedora Wiki 的說法](https://fedoraproject.org/wiki/Snapdragon_WoA_Laptop_Install)，驍龍 X Elite 的筆電需要開機後手動修改 Live CD 的開機引數爲 `clk_ignore_unused pd_ignore_unused systemd.tpm2_wait=0 modprobe.blacklist=qcom_q6v5_pas` 才可以開機進入 Live CD。</br>

## 目前的問題

- 待機（suspend）還沒有修好，根本無法休眠；
- 不支援 HDR 視訊；
- 內建TPM也無法使用，可能面臨安全問題；
- 電源管理有問題，耗電明顯比 Windows 系統高；

## 嘗試啓用 KVM

儘管高通平臺支援 ARM 虛擬化技術，但是 UEFI 韌體是以 EL1 異常層級執行，所以作業系統及其虛擬機管理員無法訪問硬體 Hypervisior 。因此我嘗試在 Fedora 44 檢查核心是否開啓了 KVM：

```bash
ls /dev/kvm
/dev/kvm: No such file or directory
```

顯然 KVM 並未開啓。也就是說，Linux 運行在 EL1模式下。我又查看了核心日誌：

```bash
sudo dmesg | egrep -i "EL2|kvm|hypervisor|gunyah"
[sudo] password for edkpiepaint: 
[    0.000000] OF: reserved mem: 0x0000000080000000..0x00000000807fffff (8192 KiB) nomap non-reusable gunyah-hyp@80000000
[    0.000000] CPU features: detected: HCRX_EL2 register
[    0.000000] CPU features: detected: Broken CNTVOFF_EL2
[    0.071971] kvm [1]: HYP mode not available
```

不難看出，韌體將一部分記憶體保留給了 Gunyah（Qualcomm 自己的 EL2 Hypervisor）。如果想要跑 KVM 虛擬機，就需要加載 `slbounce` [EFI 驅動](https://blog.cloudflare88.eu.org/posts/alpine-on-kvm/)，從而讓 Linux 執行於 EL2 模式下。</br>

至於音訊...在跑過 `dnf update` 之後，發現音訊可以使用了。感謝增加這臺筆電支援的開發者們！</br>
</br>

## 關於相機的二三事

高通的 `camss` 裝置已經在主線核心中得到了支援。在終端機中鍵入 ``ls /dev/video*`` 會看到很多視訊裝置節點，例如 ``/dev/video0`` 、 ``/dev/video1`` 、 ``/dev/video2`` 等等。通過 ``v4l2-ctl -A	`` 命令也可以看到先前的裝置節點隸屬於高通的相機遠端處理器：

```yaml
Qualcomm Camera Subsystem (platform:acb6000.isp):
	/dev/video0
	/dev/video1
	/dev/video2
	/dev/video3
...
```

那麼，相機可以使用嗎？答案是不能。使用 `qcam` 發現相機列表是空白的，其它軟體亦不能調用相機。通過核心日誌除錯發現了下面一條信息：

```yaml
[    5.108101] i2c-qcom-cci ac16000.cci: master 1 queue 0 timeout
[    5.110920] ov02c10 2-0036: Error reading reg 0x300a: -110
[    5.113375] ov02c10 2-0036: failed to find sensor: -110

[    5.134422] ov02c10 2-0036: probe with driver ov02c10 failed with error -110
```

因爲I2C通信失敗，導致硬體加電時序出現了偏差，相機無法工作。隨後我檢索了關於上面錯誤的解決方案，在 Linaro 維護的核心分支上找到了一個人提出的 [issue](https://gitlab.com/Linaro/arm64-laptops/linux/-/issues?show=eyJpaWQiOiI5IiwiZnVsbF9wYXRoIjoiTGluYXJvL2FybTY0LWxhcHRvcHMvbGludXgiLCJpZCI6MTcyNDg3MDY3fQ%3D%3D) 裏面的錯誤日誌與我遇到的完全一致。在粗略檢視之後，發現裝置樹中關於相機的定義不正確：

```yaml
 		avdd-supply = <&vreg_l7m_2p8>;
		dvdd-supply = <&vreg_l2m_1p2>;
		dovdd-supply = <&vreg_l4m_1p8>;
```

根據從高通筆電中提取的 [AeoB 文件](https://github.com/alexVinarskis/qcom-aeob-dumps)來看，確認了這些參數是適用於[另一臺筆電（ThinkPad T14s）](https://github.com/alexVinarskis/qcom-aeob-dumps/blob/master/lenovo-thinkpad-t14s-g6/CAMF_RES_QRD.json#L117-L155)的，而 T14s 的參數又是基於 CRD 參考平臺修改而來的，因此它不能應用在 Yoga Slim 7x 上。不過有開發者給出了解決方法，需要定義新的電源調節器 `vreg_l7b_2p8` ，爲相機提供 2.8V 供電：

```yaml
vreg_l7b_2p8: ldo7 {
        regulator-name = "vreg_l7b_2p8";
        regulator-min-microvolt = <2800000>;
        regulator-max-microvolt = <2800000>;
        regulator-initial-mode = <RPMH_REGULATOR_MODE_HPM>;
             };
```

還需要修正裝置樹中相機的參數，因爲相機硬體錯誤安裝（我想負責組裝的工人當時一定在忙着自慰，所以把相機裝反了），我們需要添加 `rotation = <180>` 參數，告訴作業系統將畫面倒轉。相機傳感器需要三組電源：類比 (AVDD)、數位 (DVDD) 和 I/O (DOVDD)，因此修改 `avdd-supply` `dvdd-supply` `dovdd-supply` 參數，換成正確的即可：

```yaml
camera@36 {
               assigned-clock-rates = <19200000>;
 
               orientation = <0>; 
               rotation = <180>;
 
               avdd-supply = <&vreg_l7b_2p8>;
               dvdd-supply = <&vreg_l1m_1p2>;
               dovdd-supply = <&vreg_l3m_1p8>;
 
```

- **AVDD** (Analog): 改為使用剛剛定義的 vreg_l7b_2p8 (2.8V)；
- **DVDD** (Digital): 從 l2m 改為 l1m (1.2V)；
- **DOVDD** (Digital I/O): 從 l4m 改為 l3m (1.8V)。

之後，編譯新的裝置樹，重新啓動核心，相機就工作了。


## 其它有意思的事情...

觀看 YouTube 1080P 影片，同時用終端機開 `htop` 檢視 CPU 使用情況，發現 CPU 佔用比較低。似乎使用了硬體播放器播放了影片？這似乎是我用過第一臺支援硬體解碼的 Arm 筆電。