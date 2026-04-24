---
title: Lenovo Yoga Air 14S （或者 Slim 7x）筆電的溫控，超頻和省電策略
published: 2026-04-24
description: 事實證明，研究 Linux on Everything 的樂趣遠比 Windows on ARM 的樂趣要豐富不少。或許會對我完善 SM8750 MTP Armbian 的移植和研究嵌入式系統有幫助。
image: 'assets/ideapad-ubuntu.png'
tags: [Qualcomm, Laptop, ARM, Linux, Embed]
category: 'Laptop'
draft: false 
lang: 'zh_TW'
---

聯想 Yoga Slim 7x 筆電採用驍龍 X Elite 晶片，相容 Arm V9 指令集，4nm製程。爲12核心，採用經典的 Big.Little 大小核心設計，最高時脈爲 4.2GHz，提供42MB的L2快取。GPU 則是 Adreno X1 繪圖卡，外掛 Fastconnect 7800 PCIe 無線網路卡，這個網路卡在主線核心下似乎不穩定，但是經過更換韌體後可以[改善問題](https://blog.cloudflare88.eu.org/posts/fix-broken-wifi-card-on-laptop/)。</br>
記憶體是 32GB LPDDR 5x SDRAM。</br>
</br>
和我曾經用過的 Apple MacBook Air 相比（不是講好了不宣傳 Apple 產品嗎），這晶片的最高能耗爲80W，一般使用時也有23W。屬於比較耗電的晶片（M1 晶片最高才20W功耗，平日使用也只有18W），當然效能也要比 M1 好上不少。在執行編譯 Linux 核心或者其他程式時，筆電的風扇會全速運轉， CPU 的溫度發熱到91度。平時運作下晶片的溫度則維持在40~50度，無需風扇，僅靠被動散熱就可以。相比其他筆電，Yoga Slim 7x 的 Linux 表現非常「安靜」，是個不錯的日用筆電。</br>
</br>
但是主線 Linux 的電源管理似乎依舊有些問題（例如不能像 Apple Silicon 晶片的筆電或者 PineBook 筆電一樣可以待機），導致待機時依舊會出現電力損耗嚴重的問題。雖然可以通過改用 `scmi-cpufreq` 調度器軟體（後來發現適用於絕大多數CPU的 `cpufreq-dt` 通用調度器似乎在我的筆電上不起作用）和降低熒幕亮度來改善，但是效果依舊不理想。導致筆電最多只能使用8小時就要充電一次，而不像 Mac 那樣充一次電就可以用好幾天甚至一週。</br>
</br>
因此，下面來研究驍龍筆電省電的策略。

# Yoga Slim 7x 的省電策略

 1.  目前 Yoga Slim 7x 的 Linux 發行版以 Ubuntu 和 Fedora 支援較爲最佳。他們普遍採用 GNOME 爲默認桌面環境，系統設定中有設定閒置後多久關閉熒幕和待機（Suspend）的選項，但是待機顯然是無法工作的，執行 `systemctl suspend`後，熒幕雖然熄滅，但是電腦依然是運行狀態，通過 `dmesg`看到，在執行待機命令後，馬上就「醒」了：

 ```yaml

[ 6178.014499] PM: suspend entry (deep)
[ 6178.097356] printk: Suspending console(s) (use no_console_suspend to debug)
[ 6178.123669] vhci_hcd vhci_hcd.0: suspend vhci_hcd
[ 6179.306822] PM: suspend exit
[ 6179.306911] PM: suspend entry (s2idle)
[ 6179.326507] printk: Suspending console(s) (use no_console_suspend to debug)
[ 6179.350392] vhci_hcd vhci_hcd.0: suspend vhci_hcd
[ 6180.575369] PM: suspend exit
```
雖然關閉熒幕有一定效果，但是依舊不夠省電。通過 `powertop` 檢視最耗電的系統元件，發現 Wi-Fi 網路卡和 ADSP，CDSP是最耗電的，其次是熒幕，可能因爲筆電採用OLED熒幕，而不是常見的IPS LCD，亮度更高，所以更耗電(?)</br>
2. 爲此，就需要安裝 PostmarketOS 提供的 「Tweaks」 APP（如果妳的發行版沒有打包，自己下載編譯），設定「Automatic suspend」的排程，設定使用電和充電時閒置多久就進入待機，該機制觸發後就會將筆電的排程改爲「Suspend」，Wi-Fi 和數據機（後者在CRD原型機上有內建）會停止，來節省電力，也可以降低筆電溫度。有些發行版會讓音樂服務依舊執行，也可以保證在待機時接到電話（雖然用筆電打電話比較蠢就是了），不過鬧鐘或計時器之類的應用可能會暫停。此時就需要修改桌面圖示檔，改用 `gnome-session-inhibit` 來執行應用，例如打開時鐘應用：

```bash
gnome-session-inhibit --inhibit suspend gnome-clock
```

# 給筆電 GPU 超頻（未成功）

雖然驍龍 X Elite 明確不支援超頻，但是常見的零售筆電上晶片的最大時脈是被降低的。因此就需要超頻，來獲得與原型機一致甚至超過原型機的效能。超頻/降頻都需要編譯自定核心，並修改設備樹原始碼。其中 GPU 可以超頻。

:::note[有趣的迷因圖]
當妳覺得驍龍 X Elite 零售筆電的 CPU，GPU 時脈不能滿足妳的需要而過度超頻時，妳的筆電:
<img src="/assets/ehentai/huh.png" width="65%">

_(啊...哈啊...要去了!...)_
:::

:::warning
超頻/降頻不受 Lenovo 官方支援，且可能會導致硬體損壞或執行不穩定，並且會導致保固丟失！
:::

關於修改設備樹部分可以參考 Danct12 的[給 PinePhone CPU 超頻/降頻](https://danct12.github.io/posts/2021-08-09-pinephone-cpu-overclocking/)文章。下面是我修改設備樹原始碼的方法（經過測試沒有成功）：

 - 在主線核心原始碼中，找到 `arch/arm64/boot/dts/qcom/x1e80100-lenovo-yoga-slim7x.dts` 檔案，這是筆電的設備樹原始碼，通過檢視檔案，發現引用了 `hamoa.dtsi` 這一晶片設備樹原始碼[^1]:
 ```c
 // SPDX-License-Identifier: BSD-3-Clause
/*
 * Copyright (c) 2023 Qualcomm Innovation Center, Inc. All rights reserved.
 */

/dts-v1/;

#include <dt-bindings/gpio/gpio.h>
#include <dt-bindings/input/gpio-keys.h>
#include <dt-bindings/phy/phy.h>
#include <dt-bindings/regulator/qcom,rpmh-regulator.h>

#include "hamoa.dtsi"
#include "hamoa-pmics.dtsi"

/ {
	model = "Lenovo Yoga Slim 7x";
	compatible = "lenovo,yoga-slim7x", "qcom,x1e80100";

	aliases {
		serial0 = &uart21;
		serial1 = &uart14;
	};

	chosen {
		stdout-path = "serial0:115200n8";
	};
    ...
```

 - 檢視 `hamoa.dtsi` 原始碼，檢索 `gpu` 段，這是關於GPU核心的定義：
 ```c
 gpu: gpu@3d00000 {
			compatible = "qcom,adreno-43050c01", "qcom,adreno";
			reg = <0x0 0x03d00000 0x0 0x40000>,
			      <0x0 0x03d9e000 0x0 0x1000>,
			      <0x0 0x03d61000 0x0 0x800>;

			reg-names = "kgsl_3d0_reg_memory",
				    "cx_mem",
				    "cx_dbgc";

			interrupts = <GIC_SPI 300 IRQ_TYPE_LEVEL_HIGH>;

			iommus = <&adreno_smmu 0 0x0>,
				 <&adreno_smmu 1 0x0>;

			operating-points-v2 = <&gpu_opp_table>;
    ...
```

 - 檢索 `gpu_opp_table` 段，這是GPU的時脈表。目前GPU的最大時脈爲1.5GHz，可以根據硬體情況增加新的頻率，修改爲2.0GHz或者更高（但需要注意供電問題）：
 ```c
 opp-2000000000 {
					opp-hz = /bits/ 64 <2000000000>;
					opp-level = <RPMH_REGULATOR_LEVEL_TURBO_L5>;
					opp-peak-kBps = <16500000>;
					qcom,opp-acd-level = <0xa82a5ffd>;
					opp-supported-hw = <0x03>;
				};

opp-1500000000 {
					opp-hz = /bits/ 64 <1500000000>;
					opp-level = <RPMH_REGULATOR_LEVEL_TURBO_L5>;
					opp-peak-kBps = <16500000>;
					qcom,opp-acd-level = <0xa82a5ffd>;
					opp-supported-hw = <0x03>;
				};

    ...
```
 - CPU 部分，因爲頻率調整是由系統控制處理器 (CPUCP) 透過 SCMI 協定來管理的 。Linux 核心並不直接控制硬體暫存器來升壓或升頻，而是向韌體發送請求。因此超頻可能比較困難，必要時可使用 `cpupower frequency-set` 指令來調整 CPU 頻率。
 - 之後，編譯，安裝核心，通過 `cat /sys/class/devfreq/3d00000.gpu/available_frequencies` 來檢視可用時脈：

 ```bash
 cat /sys/class/devfreq/3d00000.gpu/available_frequencies 
300000000 390000000 550000000 687000000 744000000 800000000 925000000 1000000000 1100000000 1175000000 1250000000
```
之後就可以通過 `echo "userspace" | sudo tee /sys/class/devfreq/3d000000.gpu/governor && sudo echo "frequency-number" > /sys/class/devfreq/3d00000.gpu/cur_freq` 來調整 GPU 的時脈。

# 調整溫控策略

Yoga Slim 7x 筆電的溫控可以通過軟體調整，調整不當可能會導致硬體損壞。[^2]</br>

 - 檢視目前 CPU 溫度：

 ```bash
  cat /sys/class/thermal/thermal_zone0/temp
44100
```
 - 檢視目前的溫控策略，會顯示2個等級：
```bash
grep . /sys/class/thermal/thermal_zone0/trip_point_*_temp
/sys/class/thermal/thermal_zone0/trip_point_0_temp:90000
/sys/class/thermal/thermal_zone0/trip_point_1_temp:115000
```
 - 檢視溫控等級，分爲「Hot」 「Critical」二個等級：
```bash
 grep . /sys/class/thermal/thermal_zone0/trip_point_*_type
/sys/class/thermal/thermal_zone0/trip_point_0_type:hot
/sys/class/thermal/thermal_zone0/trip_point_1_type:critical
```
- 修改溫控溫度，只需要使用 `echo` 命令鍵入數字修改對應的檔案即可。（重開機後失效）
```bash
echo 40000  > /sys/class/thermal/thermal_zone0/trip_point_0_temp
echo 100000 > /sys/class/thermal/thermal_zone0/trip_point_1_temp
```

[^1]:[hamoa.dtsi - qcom-laptops Linaro GitLab](https://gitlab.com/Linaro/arm64-laptops/linux/-/blob/qcom-laptops/arch/arm64/boot/dts/qcom/hamoa.dtsi)

[^2]:[PinePhone 的超頻，省電，溫控策略 - Ivon's Blog](https://ivonblog.com/posts/pinephone-thermal/)