---
title: 告別污濁不堪的Android——一加6T刷Arch Linux教學
published: 2025-05-25
description: ''
image: 'https://picx.zhimg.com/v2-9bbb5c2a2b8ee3d520474e35a125e70c_1440w.jpg?source=d16d100b'
tags: [Linux, Apple, FOSS, ARM, zhihu]
category: 'Linux'
draft: false
lang: 'zh_TW'
---

:::important
本文最早發佈於[知乎](https://zhuanlan.zhihu.com/p/709431221)，你現在看到的是從知乎複製的一份拷貝。
:::


# 寫在前面

如今在行動裝置方面，Android和iOS是市場佔有率最高的兩個作業系統，人們一般問的也都是關於這兩者的內容。大多數人對於Android的印象也僅僅停留在個大廠商的客製化UI（例如：MIUI、OneUI、ColorOS 等），只有一些熱衷於海外手機的使用者（或者是愛刷機的使用者），知道AOSP和一些類原生Android ROM。因爲Android是開放源代碼的基於Linux核心的作業系統，而因此誕生了衆多類原生Android項目。

但是，開源的Android，早已經成爲專有程式的天堂。專有軟體，也稱為非自由軟體，表示該軟體不尊重使用者和社群的自由。專有程式把開發者或著作權人的權力地位架在使用者之上。這種權力本源自不公不義。[^1]例如國內用戶人人皆知的GMS（Google框架）和GAPPS（Google自己推出的一系列應用），還有你能想到的其他應用，大多是封閉原始碼的專有程式。使用者的隱私就是被它們泄漏的。但是，Android系統結構複雜，要是以宏觀層面來看的話，就決不只是應用這般簡單。
大多數開發者應該知道Android的HAL（硬體抽象層）,它是對於底層硬體進行了包裝，向系統框架層提供調用驅動程式的接口。這是其他Linux發行版所沒有的。我們知道，對於Linux發行版而言，硬體驅動只能存在於核心中，並且可以從原始碼獲得（驅動的原始碼或者二進制文件）。但是到了Android下，就會有第二種選擇，這取決於廠家是否願意開放原始碼。一個智慧型手機上常見的硬體，如喇叭、相機、屏幕、GPU、指紋識別器和其它傳感器等的驅動，大多是存在且只存在於HAL中的，這也爲Linux的移植增加了難度（如果你給手機移植主線核心，你會發現，半數以上的硬體無法工作）。作爲使用者而言，你的隱私毫無保障，你被廠商隨時監控着、沒有任何自由，因爲你永遠無法知道原始碼裏的祕密！

![](https://pic3.zhimg.com/v2-38c4a2d4b72b79faf254e43974164e3e_1440w.jpg)

所以，這也就是今天的教學所要講的。如果你準備好了，那我們就開始吧！

# 主線核心的支援情況

一加6T，作爲發佈於2018年的手機，其軟體早已被官方宣佈終止支援。在2025年的今天，一個老舊的軟體是不可接受的——不僅核心老舊（4.14核心，發佈於2018年），還會因爲缺乏最新的補丁而使手機處於危險之中（一個借Linux核心漏洞來root Android手機的方法至今依舊可行，至於原因，大家都知道）。作爲一名自由軟體愛好者和熱衷於“與衆不同”的我，便開始了Linux手機之旅。這是一張硬體支援情況表，你可以參考：

- **已經支援的（基於postmarketOS)：**
- 屏幕
- 主線核心（5.15～6.15 ）
- 電池（電量顯示）
- 觸摸
- 3D加速繪圖
- 調制解調器
- 無線網路
- 聲音
- 藍牙
- 撥打電話（不能免提）和收發短信
- GPS
- 馬達、重力感應、光線感應、磁力傳感器
- 4G上網
- UART
- 手電筒
- 相機（但是Droidian支援它，儘管Droidian沒有採用主線核心）
- **不支援的：**
- Type-C雙向切換（忘了OTG這個過時的名詞吧）
- 快速充電

你是否還可以接受？如果可以，就繼續往下看吧……

# 準備工作

本次使用的Linux發行版是[Kupfer Linux（基於Arch Linux ARM）](https://kupfer.gitlab.io/)，其官方的構建工具是`kupferbootstrap`。按照[官方文檔](https://kupfer.gitlab.io/kupferbootstrap/main/)的指引，首先需要克隆kupferbootstrap的Git倉庫到本地：
```bash
git clone -b 鍵入分支名 https://gitlab.com/kupfer/kupferbootstrap 
```

根據文檔所寫（寫的很簡單，下次別寫了！），我們需要選擇分支。有`main`和`dev`分支可選。其中，`main`是穩定版，而`dev`是開發版，後者隨時都會有新的設備（連只可以開機的也算在內）和新的軟體出現，更新的頻次也更高，根據個人需要選擇即可。

在克隆完之後，我們進入kupferbootstrap的 目錄，通過這個命令來安裝所需依賴：

```bash
pip3 install -r requirements.txt 
sudo ln -s "$(pwd)/bin/kupferbootstrap" /usr/local/bin/
```
之後就可以直接鍵入kupferbootstrap來繼續工作了！

#  創建配置文件

使用`kupferbootstrap init` 來開始設備的初始化，前半部分沒什麼需要關注的，默認就可以了。

![](https://picx.zhimg.com/v2-ab5110cb8b831f23b0e86b593cfe5091_1440w.jpg)

如果你使用Arch Linux（或基於此的發行版），將`[wrapper]`下面的`“docker”`改爲`“none”`省去下載docker的時間。

![](https://pic3.zhimg.com/v2-03198269cb35227f3e607ee906c5ba12_1440w.jpg)

然後會要求你設定kupfer的Git存儲庫。保持默認即可，不用修改，改了也沒用。

![](https://pic2.zhimg.com/v2-ea49418266721cedaa1b6d5bbf0792d3_1440w.jpg)

之後是選擇分支和設定pacman下載數量，分支默認選dev,下載數量修改爲15,體驗極限速度。 之後是一些chroot、jumpdrive、快取目錄的設定，保持默認即可。

![](https://pic2.zhimg.com/v2-b1ac85578ac4a168332a1ed3d405239f_1440w.jpg)

當你看到這段文字時，代表着基本配置已經結束，鍵入“Y”開始進階配置。

![](https://pica.zhimg.com/v2-7a565ed74d22b54fe52aad45c3cd59a0_1440w.jpg)

鍵入配置名稱，可以直接默認：

![](https://pic2.zhimg.com/v2-033124da5060901cb182c528acf431a7_1440w.jpg)

設置配置的父配置，通常無須填寫：

![](https://pic2.zhimg.com/v2-57ba73157c59ca82d9d3163b2a8ecb33_1440w.jpg)

之後，`kupferbootstrap` 會要求你選擇設備，鍵入一加6T對應的`sdm845-oneplus-fajita` 即可；然後會來到桌面環境選擇（未列出的可以自行下載）。不同於Android，你有若干種選擇：

```bash
name: barebone            #僅控制檯可用
pkgbuild: Pkgbuild(flavour-barebone,'main/flavour-barebone',1.0-1,'cross')
description: ultra minimal installation - nothing included #最精簡的一種！
flavour_info: None

name: debug-shell        #除錯shell
pkgbuild: Pkgbuild(flavour-debug-shell,'main/flavour-debug-shell',1.0-1,'cross')
description: Opens a telnet server over usb in the initramfs - useful for debugging
flavour_info: None

>>> name: gnome          #GNOME桌面環境
>>> pkgbuild: Pkgbuild(flavour-gnome,'main/flavour-gnome',1.0-1,'cross')
>>> description: The gtk-based GNOME desktop environment
>>> flavour_info: None
>>> 
>>> Currently selected by profile "default"

name: gnome-minimal
pkgbuild: Pkgbuild(flavour-gnome-minimal,'main/flavour-gnome-minimal',1.0-2,'cross')
description: The gtk-based GNOME desktop environment (minimal edition) #同上的精簡版
flavour_info: None

name: gnome-mobile     #行動版GNOME
pkgbuild: Pkgbuild(flavour-gnome-mobile,'gnome_mobile/flavour-gnome-mobile',1.0-2,'cross')
description: The gtk-based GNOME desktop environment
flavour_info: None

name: gnome-mobile-minimal
pkgbuild: Pkgbuild(flavour-gnome-mobile-minimal,'gnome_mobile/flavour-gnome-mobile-minimal',1.0-1,'cross')
description: The gtk-based GNOME desktop environment (minimal edition)     #同上的精簡版
flavour_info: None

name: phosh      #基於GNOME的適合手機的桌面環境
pkgbuild: Pkgbuild(flavour-phosh,'phosh/flavour-phosh',0.1-4,'cross')
description: The gtk-based Phosh (Phone Shell) environment
flavour_info: None

name: phosh-minimal
pkgbuild: Pkgbuild(flavour-phosh-minimal,'phosh/flavour-phosh-minimal',0.1-5,'cross')
description: The gtk-based Phosh (Phone Shell) environment (minimal edition)   # #同上的精簡版
flavour_info: None

name: plasma-mobile         #KDE移動版
pkgbuild: Pkgbuild(flavour-plasma-mobile,'plasma_mobile/flavour-plasma-mobile',5.26-4,'cross')
description: The Qt-based Plasma Mobile desktop environment
flavour_info: None

name: plasma-mobile-minimal
pkgbuild: Pkgbuild(flavour-plasma-mobile-minimal,'plasma_mobile/flavour-plasma-mobile-minimal',5.26-5,'cross')
description: The Qt-based Plasma Mobile desktop environment (minimal edition)   #同上的精簡版
flavour_info: None
```

根據個人喜好選擇即可。

之後，`kupferbootstrap`會詢問我們希望添加的軟體，由於Kupfer是個非常精簡的Linux發行版， 因此有幾個軟體是必需安裝的，比如`nano`、`htop`。

![](https://pic4.zhimg.com/v2-6d3d824cb2cc8d7ddc40999678b93147_1440w.jpg)

# 製作鏡像

:::note
從這一步開始，我們需要有一個通往歐洲的VPN，因爲[默認的鏡像源會禁止非歐盟地區的使用者](https://gitlab.com/kupfer/kupferbootstrap/-/issues/27)連接！
:::

鍵入`kupferbootstrap image build`就可以開始構建了（可以修改`kupferbootstrap`的`constants.py`中的`ALARM_REPOS`和`BASE_DISTROS`的軟體源地址，但是不生效)。</br>
若你有VPN的加持，完成整個過程應該不是問題……

真的是這樣嗎？

不出意外的話，你一定會遇到“無法下載mkbootimg-git的原始碼“的錯誤，這是因爲PKGBUILD中下載的分支已經被移除。方法是找到[Google Git](https://android.googlesource.com/platform/system/tools/mkbootimg)中最新的分支”[c45163bf1cdb731e3bdd90d69d54c8e92004d673](https://android.googlesource.com/platform/system/tools/mkbootimg/+/refs/heads/main/)“修改（如果Git有更新，找到最新的提交，複製其序列號）PKGBUILD即可。

![](https://pica.zhimg.com/v2-018e082757f56c08eae7e9b85dbcdfea_1440w.jpg)

整個構建過程需要23分鐘的時間。在全部完工後，前往~/.cache/kupfer/images目錄下，就可以找到你的映像了！

# 刷寫映像

如果你沒有任何意外，完成了整個構建過程，就可以準備刷機了。對於絕大多數Android手機而言，解鎖是一個非常簡單的過程，只需要一個命令就可解決：

```bash
fastboot flashing unlock
```

…… 但是，許多Android設備卻是“暴君”。它們通過修改Bootloader中的一些命令，來刪除常見的"`flashing unlock`" "`oem unlock`"命令，讓它們失效，從而讓解鎖不再可行。不僅如此，像是Vivo、OPPO 等廠商還通過修改核心使得設備即使解鎖也無法使用第三方作業系統……這無疑是軟體“獨裁”的表現。臣服於誘惑之下已經空前地普及，時至今日反倒成為標準作法。三星手機在解鎖後，部分功能將永遠無法使用；一直違反GPL的小米在推出HyperOS之後，不但修改了解鎖規定，要求使用者在自己的“小米社群”中賬戶等級達到5級，並完成答題才可以解鎖，這種奇怪的行爲實在是讓人不解。而且要求使用者在他們的伺服器上註冊賬號和提供手機號，作爲想要換取自由的代價！在最近，小米也不再釋出修改的Linux核心原始碼。[^2]看來，自由之路依舊漫長，奮鬥仍舊不能停止……

再把目光轉向到映像上來。我們已經有了製作好的映像包，現在就可以通過fastboot來刷入它們了：

```bash
刷入根文件系統：
fastboot flash -S 100M  userdata /path/to/rootfs 
刷入核心：
fastboot flash boot /path/to/boot.img
```

在刷入啓動映像時會遇到Volume is full錯誤，怎麼回事？不要害怕，仔細查看一下映像大小：

![Kupfer的啓動映像。](https://pic3.zhimg.com/v2-e7fc69d5a4d84db5b08d2c4337658ac0_1440w.jpg)

![postmarketOS的啓動映像。](https://pic2.zhimg.com/v2-54a628b58c162c47fbed57fab90cf6e5_1440w.jpg)

大小竟然不正確！那要怎麼刷呢？

別慌，此時我們需要通過`mkbootimg`（使用`pacman -S android-tools`來安裝它）來手動創建一個映像，先掛載這個啓動映像，複製出裏面的兩個文件：一個是Gzip壓縮的Image.gz核心映像，另一個是位於dtb中的設備樹文件，把它們複製到其他位置即可：

![啓動映像包括的，一個Gzip壓縮的核心、一個Initramfs映像和設備樹文件夾。](https://pic1.zhimg.com/v2-75c751d4ef517628d6440b5000bba726_1440w.jpg)

![設備樹文件。](https://pic1.zhimg.com/v2-def6eb49c864e9f0d4fec86fc51bdf06_1440w.jpg)

然後，使用mkbootimg來生成映像：

```bash
 cat Image.gz sdm845-oneplus-fajita.dtb > Image.gz-dtb && mv Image.gz-dtb zImage
  sudo mkbootimg --kernel zImage --cmdline "loglevel=7" --ramdisk /run/media/{你的用戶名}/kupfer_boot/initramfs-linux.img --base 0x00000000 --kernel_offset 0x00008000 --tags_offset 0x00000100 --pagesize 4096 --id -o boot_new.img
```

然後，將它刷入boot分區，清除dtbo分區後，按下START來啓動！

![一加6T，後面是我的小米平板5](https://pic4.zhimg.com/v2-f40f054e69c3ac73d8489892ae2fdd91_1440w.jpg)

# 後記

目前來看，刷了Arch Linux的一加6T的續航表現良好。從原來postmarketOS的6個小時，到現在的13個小時（均爲從100%開始計算）有了較大的提升。至於軟體方面，他採用6.14的核心，是支援最好的一代，時刻保持最新的軟體和最新的來自上游的核心補丁讓我的手機保持着輕快又安全。我也可以實現一些超越手機的功能，比如搭建“當個創世神”的伺服器，開設自己的博客一類。衆多寫在信息技術教科書中的、早已成爲常識的“手機不能運行Windows”“手機無法運行Linux發行版、無法建設伺服器”的各種“不可能”，在自由軟體的幫助，以及各路開發者的努力下，正在逐漸變成“可能”。也許你會說：“我又不做這些‘高科技’工作，我也不使用社交軟體，只是用來打電話，有必要接觸這些‘自由軟體’和‘專有軟體’嗎？”或者“那些擔心隱私洩露的人，你們到底在怕什麼？不做虧心事，不怕鬼敲門！身正不怕影子斜”之類的話。我認爲，你可以不必在乎概念，但是我可以保證一點：使用自由軟體對於你是“百利而無一害”的，它不會有任何侵犯你隱私的的行爲，畢竟原始碼都可以被檢查到，誰敢往裏面藏“私貨”呢？請記住：專有軟體，也稱為非自由軟體，表示該軟體不尊重使用者和社群的自由。專有程式把開發者或著作權人的權力地位架在使用者之上。避禍之道就是堅持使用自由（尊重自由的）軟體。因為自由軟體是由使用者自主掌控，因此能對惡意的軟體功能起相當大的保護效果。專有軟體所作的惡果，早已數不勝數，就連日常出行的交通工具也無法倖免[^3]。

因此，早日使用自由軟體，才能獲得自由。

最後，這裡是EDKPiepaint，登出，祝你有個美好的一天！



[^1]:[GNU對於專有軟體的定義](https://www.gnu.org/proprietary/proprietary.zh-tw.html)
[^2]:[同樣是GNU的報道](https://www.gnu.org/proprietary/proprietary-tyrants.html#top)
[^3]:[爲了阻止第三方維修，波蘭的火車製造商在火車裏植入DRM](https://badcyber.com/dieselgate-but-for-trains-some-heavyweight-hardware-hacking/)