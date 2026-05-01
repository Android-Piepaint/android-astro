---
title: 新的高通 Gunyah，Mediatek 的 Genizone 虛擬機未必會成爲 Android 上的 Termux 殺手
published: 2026-05-01
description: 從實用性而言，採用硬體虛擬化技術的虛擬機效能肯定會比採用 `proot/chroot`，LXC，Docker 等容器技術的方案要好。但我認爲，採用硬體虛擬化的虛擬機，不見得會取代 Termux，成爲新的「殺手級」功能。
image: 'assets/mtp8750-front-view.jpg'
tags: [Thoughts, Misc, ARM, FOSS, Android]
category: 'FOSS & FOSS related'
draft: false
lang: 'zh_TW'
---

Android 16 之後，隨着虛擬化框架成爲新的功能，各大手機晶片廠商也紛紛從硬體上「重新」添加被棄用已久的虛擬化支援。從實用性而言，採用硬體虛擬化技術的虛擬機效能肯定會比採用 `proot/chroot`，LXC，Docker 等容器技術的方案要好。但我認爲，採用硬體虛擬化的虛擬機，不見得會取代 Termux，成爲新的「殺手級」功能。</br>

# 什麼是 Termux？

[Termux](https://termux.dev/en/)是一群開源軟體愛好者開發的終端模擬器，擁有自己的套件庫。採用 `APT` 作爲自己的套件管理員。使用者不需要 Root 自己的手機就可以完成很多 Linux 電腦上才可以做的事，還可以通過 `proot` 建立自己的 Linux 容器。

# 對於虛擬機的看法
> 採用硬體虛擬化的虛擬機，不見得會取代 Termux，成爲新的「殺手級」功能。

把玩了 Pixel 手機的 Debian Terminal，最近也有在 8750 MTP 原型機上刷 Android 16 開 Gunyah 虛擬機玩，所以得出這個結論。因爲其使用 AVF 框架來執行 Debian 虛擬機，是環境完整的 Linux，可以執行 Docker。對於高通平臺而言，雖不能執行完整的 KVM，但是在8650之後的平臺上加入了全新的EL2虛擬機方案，稱爲「Gunyah」，Mediatek 也有類似的做法，稱爲「Genizone」。可以通過 ChromeOS 的 `crosvm` 技術在手機上跑起 pKVM，用於安裝 Linux 虛擬機，甚至還可以裝 Windows on ARM。從而做到更多近似於 Linux 手機的體驗。</br>
</br>
吶，下面二幅圖就是我在8750原型機上藉助 `crosvm` 跑 pKVM 的嘗試以及「關於裝置」界面。虛擬機開機速度比較快，效率也非常高:</br>

<img src="/assets/screenshot/working-gunyah-vm.png" width="65%">

<img src="/assets/screenshot/prototype-specs.png" width="65%">

不過，若是開啓的虛擬機比較多，可能會導致裝置效能下降。使用執行虛擬機的軟體叫 [DroidVM](https://github.com/Droid-VM/)，由 BigfootACA 開發。同時也是 Windows on ARM 的開發者。可以使用 `crosvm` `qemu` 作爲後端管理虛擬機。這方面他們真的很厲害。</br>
想要實作 GPU 加速也不是沒有可能，但是效果可能不會很好。畢竟 Google 宣稱未來還將支援在 Android 上訪問 Linux GUI 程式，有點像 WSL。如果是這樣的話，就需要解決 Wayland 視窗在 Android 合成器上顯示的問題。至於跑 CLI 命令列程式，Termux 這種 userspace 的解決方案比較簡單高效。因爲 Termux 不需要虛擬化這種措施，所有的套件也都是針對 ARM 64位元指令集編譯的，因此不存在不相容的問題。除非應用不相容 Android 的 Bionic C 函式庫。就算臨時要開 SSH 的話，也是 Termux 最快。</br>
至於跑 `proot/chroot` 容器用 GPU 加速的話，Termux 也可用 Turnip/Freedreno，Panfrost/Lima，VirtGL 等圖形驅動實現。</br>

# 基於 userspace 的應用與採用「硬體虛擬化」的虛擬機相比，有什麼差異？

首先應該是執行位置不同了吧，Termux 應用執行於 userspace，位於 EL0，而虛擬機執行於系統 Hypervisior，位於 EL2.</br>
另外，整個技術架構完全不同。Termux 就是執行在 Android userland 的一個應用程式。直接執行 ARM 64位元 ELF 二進位檔，可以使用 Android 系統提供的資源，啓動速度快。I/O 延遲低，對於命令列的支援好，不使用任何虛擬化功能。</br>
Android 內建的終端機，和採用 `qemu kvm` `crosvm` 技術的虛擬機一樣，都是採用相容 KVM/pKVM 虛擬化與 VirtIO 技術的虛擬機。因此每次啓動這些應用，實際上就是在背景執行了新的 Linux 虛擬機。像是虛擬磁碟，網路，I/O 都需要藉助 VirtIO 存取和設定。至於 GPU，相機，USB等硬體界面則需要設定 Passthrough，或者根本禁止存取。會很難期待「隨時存取 shell」的體驗，但好處是具有完整的隔離性，更安全。除非程式有 VM escape 的行爲，不然不會對於裝置造成影響。比較適合教育市場，政府，企業之類，會對這些市場有很大幫助。</br>
在效能方面，如果需要對CPU，記憶體等要求高的工作（編譯程式碼之類），像 Termux 這種應用可以直接與裝置互動，不會像虛擬機那樣有負擔（雖然 Android 就是 Linux 跑了無數 Java 虛擬機就是了）。使用 GPU 雖然比較 hacky，但是至少可以用，延遲更低。

# 虛擬機對於裝置要求苛刻

虛擬機具有效能高，安全，方便設定的優點。但也要承認這一技術「最大的缺點」，就是對裝置要求太高。</br>
不要跟我講「所有相容 Arm V8 指令集的手機都支援硬體虛擬化」這種幹話。支援是一回事，廠商給不給你用又是一回事。雖然驍龍835之後的晶片，可以用[Windows 筆電的方法](https://github.com/TravMurav/slbounce)來讓作業系統跑在 EL2（Mediatek 更是有廣爲人知的晶片漏洞可以讓 Android 核心跑在 EL2），但僅適用於 MTP，QRD 之類CPU沒有熔燬的裝置，還需要修補韌體才可以。目前市場上在售的手機，除了 SHIFT6mq 以外，都有CPU熔燬，修改韌體的方法幾乎不可行。即使是8750這種支援 Gunyah 的平臺，配置虛擬機也不容易。</br>
首先你的裝置韌體必須有編譯 `pvmfw`，並且韌體有支援虛擬機的設定檔案，然後才可以在 Root 的裝置上執行 `crosvm` 跑 pKVM 虛擬機。像 Android 16 內建的終端機是無法執行的，因爲高通平臺不支援執行普通的 KVM 虛擬機，
如果裝置沒有編譯 `pvmfw`，但是韌體支援虛擬機設定，還可以通過移植其他支援 pKVM 的裝置的 `pvmfw` 來補回這一功能。這種做法必須要求手機可以解鎖 bootloader，如果連 bootloader 也解不開，那就不可能跑虛擬機了。</br>
另外，就算裝置支援虛擬機，如果裝置的記憶體或者空間不夠，在這種裝置上跑虛擬機的體驗就會很糟糕。畢竟虛擬機是比較吃硬體資源的，這對手機快閃記憶體的壽命與隨機讀寫速度都是極大的考驗。

# 結語

我想這些硬體虛擬機的方案，還有 Linux 終端機，更多爲 Android 平板 ChromeOS 化，或者是 Android 與 ChromeOS相結合的做法鋪路。這樣 AVF 這種虛擬機框架可以爲 ARM 晶片虛擬化提供統一的界面。但對於開發者和 Power users 來說，Termux 的價值不在於它是不是虛擬機，而是在於它能讓我們以最廉價、最快速、最無縫的方式，直接調度這台 ARM 設備的原始怪獸性能。只要廠商一天不開放 EL2 的完全控制權，這些內建的虛擬機就永遠只是精緻的盆景，無法取代 Termux 這種長在 Android 土壤上的解決方案。