---
title: 當 Linux 遇上 Qualcomm X Elite，在讚嘆其強悍的性能時，請不要忘記它依然處於高度實驗性階段...
published: 2025-09-16
description: 我或許是世界第一個在聯想 YOGA Air 14S 驍龍版筆電上安裝並測試Linux的用戶，但我對 Qualcomm X Elite 的第一印象，並不像很多人想像的那樣好。
image: 'assets/yoga-air-14s.jpg'
tags: [Qualcomm, XElite, ARM, Linux]
category: 'Linux'
draft: false 
lang: 'zh_TW'
---
我一直都對採用ARM晶片的筆記本電腦有着濃厚的興趣。不僅僅是因爲CPU與衆不同，更是因爲被RISC晶片的優秀能耗比所驚豔，在優越的性能表現下，卻又有着長久的續航能力。這是普通x86架構的筆電所無法企及的。然而，因爲一個小小的意外，我與這臺筆電的故事，便從此開始了。

:::warning[中國大陸的閱讀者請注意]
本文包含部分（或全部包含）政治類話題，以及一些其它具有爭議性的，或者因爲當地的內容審查政策而不予通過的內容。儘管本部落格已被GFW所封鎖，但部分專業讀者仍有能力訪問本部落格。在此鄭重提醒：**如果您是[極端愛國主義者，或者具有排外主義立場的人，亦或是熱衷於在網路上攻擊異議人士的人](https://zh.wikipedia.org/zh-tw/%E5%B0%8F%E7%B2%89%E7%B4%85)，請立即關閉本網站**！！！
:::

## 我爲什麼選擇 Qualcomm X Elite？
我最早看到有關驍龍版筆電的消息是在2020年，那時候我還在唸初中二年級，因爲COVID-19的全球流行，我便在家中上網課。在一個偶然的機會下，我在網路上找到了一加6T安裝Windows 11 ARM的教學影片，在當時這個影片給了我一個極大的震撼，我無法相信，一個婦孺皆知的常識“手機因爲與個人電腦（PC）的CPU架構不同，是無法執行常見的 Windows 11 和 Linux 作業系統的”在這個教學影片中被完全地推翻了。也是從那時，我第一次知道了 Windows還有 ARM 的版本。以及一系列關於 Windows on ARM 設備的技術性知識。其中影片中提到現在手機安裝 Windows 作業系統的驅動程式，大多是由搭載 Windows ARM 的筆電、工程機、平板電腦等設備的驅動程式提取或簡單修改而來的。我便在網路上檢索有關 Windows on ARM 的設備，結果發現市面上竟然真的有這樣的筆電！它們採用高通驍龍SoC，使用eMMC或者UFS快閃記憶體作爲內置硬碟，並且支援硬體虛擬化，還內建數據機，方便在沒有無線網路的地方，使用4G上網來連接到網際網路。</br>

雖然驍龍本非常吸引我，但是本着“能用就不要買新”的原則，父母一直不同意給我買驍龍本，我只好繼續用我父親的華碩 K50IE筆記本，來自2010年，使用雙核 Core 2 Duo處理器的筆電，外附輝達GeForce 310M GPU。直到初四那年，我考上了高中，又想盡辦法說服了我的父親，但是我父親認爲驍龍本不過是什麼低端筆電，想要給我購入一臺華爲筆電。但我知道，x86超級本的性能並不好，很多超級本甚至只有內建GPU，其繪圖能力相當底下，最終我買了 MacBook Air，採用蘋果M1晶片，並同時也瞭解了Asahi Linux 專案正在開發爲M1晶片適配的 Linux 發行版。並一直用到現在，直到上週五，因爲一場大雨，我的筆電由於保管不當而導致熒幕受潮而不得不運到上海進行維修。在此期間我便沒有了筆電可用，翌日，父母便要我從我唸大學的青島市回家，並且帶着我去選購一臺新的筆電。我便藉此機會，把驍龍本的事情告訴了父親。他便疑惑的問我，什麼是“驍龍本”，我把我所知道的一切告訴了他。但是父親覺得不如選一臺x86超級本，因爲驍龍本在軟體上存在相容性問題，而且價格也比普通x86超級本高出許多，甚至可以用購買驍龍本的錢來買一臺極致性能的遊戲本。考慮到便攜性以及我過去五年來幾乎不再使用 Windows 作業系統，而以 Linux 系統爲主，父親也曾問我驍龍本是否有完善的 Linux 核心支援。我便把我所收集到的資料和相關專案給了他，最終我提着我的驍龍本回了家。

## 我對於驍龍本的印象

我所購買的設備是聯想的 YOGA Air 14S，雖然是個比較老的型號，但是其驍龍版在2024年上市，並不算是什麼老舊的東西。它配備了一個分辨率爲2944x1840的OLED屏幕，其重新整理頻率爲90Hz，支援觸控。以及驍龍 X1E80100，12核心的CPU。響應速度非常快。由於我需要做開發之用，我選擇了32GB的RAM，1TB的三星NVME高速固態硬碟。到手的時候，我發現它安裝的是 Windows 11 ARM 版，並且還預裝了廠商的軟體，我本想把整個硬碟抹掉重新安裝 Linux，但是考慮到 Windows on ARM 設備的韌體更新往往隨着Windows 更新而更新，我只好暫且保留它，在默認分出的500 GB 分割中，我決定安裝 Linux。

## 安裝 Linux

首先關閉 Windows 自帶的 Bitlocker 硬碟加密，然後重新啓動電腦，在開機時按下F2,以此進入 UEFI設定。選擇“安全”選項，之後關閉安全啓動，到目前唯一支援程度較爲良好的 Ubuntu 網站下載採用針對驍龍X Elite 處理器的自定核心的安裝映像，將其寫入USB隨身碟，插入電腦後啓動，進入Ubuntu安裝程式。根據安裝器指引完成安裝。但是不要高興的太早，因爲我們沒有需要的驅動程式......

## 修復驅動程式
正如你在 Live CD 中體驗的那樣，你會面臨沒有硬體加速、電池劑量器始終顯示0%，還有麥克風、攝像頭、聲音不工作的問題。對於後三者，已經有其他部分機型的解決方案，但是前面兩個問題是可以被解決的。在高通平臺上，除了需要必須的核心模組外，還需要相關的韌體，這樣在開機時，核心模組便能載入相關韌體，繼而驅動對應的韌體。在 Ubuntu中，有一個收錄了 X Elite 相關的硬體工具套件庫，裏面有一個腳本，它可以從 Windows 系統中提取韌體，並生成對應的 deb套件包，安裝後，便可解決驅動程式的問題。想要安裝這個腳本，只需要打開終端機，然後鍵入：

```bash
sudo apt update && sudo apt install qcom-firmware-extract
```

接著，在終端機中鍵入：

```bash
sudo qcom-firmware-extract
```

這個腳本會自動掛載 Windows所在的分割，並將 Windows 系統中的驅動程式提取出來，然後生成對應的 deb套件包，安裝後，便可解決驅動程式的問題。執行的結果如下：

```bash
Mounting Windows partition nvme0n1p3...
Extracting firmware from /tmp/fwfetch.ZTiJ47EF/mnt/Windows/System32/DriverStore/FileRepository
	adsp_dtbs.elf
	adspr.jsn
	adsps.jsn
	adspua.jsn
	battmgr.jsn
	cdsp_dtbs.elf
	cdspr.jsn
	qcadsp8380.mbn
	qccdsp8380.mbn
	qcdxkmsuc8380.mbn
	qcdxkmsucpurwa.mbn
Building package qcom-x1e-firmware-extracted-x1e80100-lenovo-83ed_20250916_arm64...
Installing qcom-x1e-firmware-extracted-x1e80100-lenovo-83ed_20250916_arm64...
update-initramfs: Generating /boot/initrd.img-6.17.0-8-qcom-x1e
W: Possible missing firmware /lib/firmware/apple/dfrmtfw-*.bin for built-in driver apple_z2
Using DTB: qcom/x1e80100-lenovo-yoga-slim7x.dtb
Installing /lib/firmware/6.17.0-8-qcom-x1e/device-tree/qcom/x1e80100-lenovo-yoga-slim7x.dtb into /boot/dtbs/6.17.0-8-qcom-x1e/qcom/x1e80100-lenovo-yoga-slim7x.dtb
Taking backup of x1e80100-lenovo-yoga-slim7x.dtb.
Installing new x1e80100-lenovo-yoga-slim7x.dtb.
System running in EFI mode, skipping.
update-initramfs: Generating /boot/initrd.img-6.16.0-27-qcom-x1e
W: Possible missing firmware /lib/firmware/apple/dfrmtfw-*.bin for built-in driver apple_z2
Using DTB: qcom/x1e80100-lenovo-yoga-slim7x.dtb
Installing /lib/firmware/6.16.0-27-qcom-x1e/device-tree/qcom/x1e80100-lenovo-yoga-slim7x.dtb into /boot/dtbs/6.16.0-27-qcom-x1e/qcom/x1e80100-lenovo-yoga-slim7x.dtb
Taking backup of x1e80100-lenovo-yoga-slim7x.dtb.
Installing new x1e80100-lenovo-yoga-slim7x.dtb.
Ignoring old or unknown version 6.16.0-27-qcom-x1e (latest is 6.17.0-8-qcom-x1e)
Done! Reboot to load the added firmware files. 
```
之後，重啓電腦，驅動程式便已經正常了。

## 嘗試啓用 KVM

根據已有消息，驍龍在PC平臺的處理器上並不會封鎖 KVM，而 ARM 平臺的處理器只有運行在 EL2 模式下才能啓用 KVM。因此我嘗試在 Ubuntu 25.04 上檢查是否開啓了KVM ， 但結果並不愉快：

```bash
ls /dev/kvm
/dev/kvm: No such file or directory
```
這表示 KVM 並未開啓。也就是說，Linux運行在 EL1模式下。我又查看了核心日誌：

```bash
sudo dmesg | egrep -i "EL2|kvm|hypervisor|gunyah"
[sudo] password for edkpiepaint: 
[    0.000000] OF: reserved mem: 0x0000000080000000..0x00000000807fffff (8192 KiB) nomap non-reusable gunyah-hyp@80000000
[    0.000000] CPU features: detected: HCRX_EL2 register
[    0.000000] CPU features: detected: Broken CNTVOFF_EL2
[    0.071971] kvm [1]: HYP mode not available
```
不難看出，韌體將一部分記憶體保留給了 Gunyah（Qualcomm 的 EL2 Hypervisor），核心也發現了CPU支援 EL2相關的特性，但核心提示 `HYP mode not available`，說明韌體將 EL2留給了 Gunyah，使得 Linux 無法在 EL2 模式執行 KVM host，無法啓用 KVM。于是我又想起了之前在工程機上使用 `[slbounce]` 來將CPU執行到 EL2模式下，然後加載其作爲驅動，從而使 Android 獲得了 EL2, 從而有了使用 KVM 的能力。通過同樣的方式，我下載了 `sltest` 工具，在UEFI Shell 中執行 `sltest` ，結果如下：

::github{repo="TravMurav/slbounce"}

```bash
sltest.efi tcblaunch.exe
```
然後，看到了代表成功進入 EL2 模式的綠色線亮起，就知道這個CPU 支援 EL2 模式了。

![EL2 Mode Activation](assets/efi-shell.jpg)

然後，到[這裏](https://code.launchpad.net/~ubuntu-concept/ubuntu/+source/linux/+git/oracular)下載一份支援 X1E80100 的主線核心，然後向配置文檔中添加下面幾行：

```bash
CONFIG_KVM_COMMON=y
CONFIG_HAVE_KVM_IRQCHIP=y
CONFIG_HAVE_KVM_IRQ_ROUTING=y
CONFIG_HAVE_KVM_DIRTY_RING=y
CONFIG_HAVE_KVM_DIRTY_RING_ACQ_REL=y
CONFIG_NEED_KVM_DIRTY_RING_WITH_BITMAP=y
CONFIG_KVM_MMIO=y
CONFIG_HAVE_KVM_MSI=y
CONFIG_HAVE_KVM_READONLY_MEM=y
CONFIG_HAVE_KVM_CPU_RELAX_INTERCEPT=y
CONFIG_KVM_VFIO=y
CONFIG_KVM_GENERIC_DIRTYLOG_READ_PROTECT=y
CONFIG_HAVE_KVM_IRQ_BYPASS=y
CONFIG_HAVE_KVM_VCPU_RUN_PID_CHANGE=y
CONFIG_KVM_XFER_TO_GUEST_WORK=y
CONFIG_KVM_GENERIC_HARDWARE_ENABLING=y
CONFIG_KVM_GENERIC_MMU_NOTIFIER=y
CONFIG_VIRTUALIZATION=y
CONFIG_KVM=y
CONFIG_NVHE_EL2_DEBUG=y
```
之後編譯核心並安裝，之後重新啓動到UEFI Shell，執行 `load slbounce.efi`後重新啓動，再生成對應的設備樹：

```bash
# Generate device tree
fdtoverlay \
	-i /boot/x1e80100-lenovo-yoga-slim-7x.dtb \
	-o /boot/x1e80100-lenovo-yoga-slim-7x-el2.dtb \
	./out/dtbo/x1e-el2.dtbo
```
然後重新配置`grub.cfg`:

```bash
menuentry 'Ubuntu, with Linux 6.14.0-rc7+' --class ubuntu --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-6.14.0-rc7+-advanced-6f3056d7-f77e-4d80-9a52-ce923e1d5fda' {
		recordfail
		load_video
		gfxmode $linux_gfx_mode
		insmod gzio
		if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
		insmod part_gpt
		insmod ext2
		search --no-floppy --fs-uuid --set=root 6f3056d7-f77e-4d80-9a52-ce923e1d5fda
		echo	'Loading Linux 6.14.0-rc7+ ...'
		linux	/boot/vmlinux-6.14.0-rc7+ root=UUID=6f3056d7-f77e-4d80-9a52-ce923e1d5fda ro  clk_ignore_unused pd_ignore_unused cma=128M efi=noruntime loglevel=7 console=tty0 snd-soc-x1e80100.i_accept_the_danger=1 id_aa64mmfr0.ecv=1 crashkernel=2G-4G:320M,4G-32G:512M,32G-64G:1024M,64G-128G:2048M,128G-:4096M
		initrd	/boot/initrd-vmlinux-6.14.0-rc7+
		echo	'Loading device tree blob...'
		devicetree	/boot/x1e80100-lenovo-yoga-slim7xel2.dtb
        }
```

那麼最後能否啓用KVM呢？結果是不行。這可能與韌體有關，畢竟 YOGA Slim 7x 的韌體更新後，有日誌明確寫出加入了 Linux EL2的支援。也只能等聯想後續韌體更新了。

## 結論

雖然 X Elite 上的 Linux 體驗有了一些改善，但是它依然屬於高度實驗性的平臺，許多功能都還沒有完全穩定。因此，在正式使用前，還是要多加小心。
