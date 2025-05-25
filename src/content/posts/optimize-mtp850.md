---
title: 我是如何優化我的 MTP850 工程機來實現正常使用的
published: 2025-05-03
description: 也許這就是在浪費時間？誰知道呢！
image: 'assets/sdm850-front-view.png'
tags: [Qualcomm, Android, MTP850, Flashing]
category: 'Android'
draft: false 
lang: 'zh_TW'
---
# 寫在前面

本人很早就對各種各樣的Android 設備有着濃厚的興致。自從我在初中時獲得了我父親的酷派Cool 1 手機後，一個偶然的機會，我打開了一個叫做“酷安”的應用，在上面發現了人們發佈的各式各樣的刷機教學，並成功刷入Pixel Experience Android 11 後，
我的刷機之路就從此開始了...... </br>
當然，這都是5年前的事情了。讓我們回到現在。我在今年2月初，在經過3天時間說服了父親之後，通過一個叫“鹹魚”的二手交易平臺（之前我在eBay上嘗試搜尋過，找不到有關高通工程機的商品）上購買了一臺高通MTP850（其實應該叫 MTP845）工程機。
經過3天的時間後，我收到了心念已久的 MTP850 工程機。是的，對於經常折騰工程機的人（還有那些因爲工作原因接觸到的）而言，這算不得什麼。但是，作爲一個普通消費者的我來說，卻是令人興奮的。可能沒有人能夠想象到開箱時的我有多麼開心了。</br>
當然，選擇 MTP850 的原因是因爲我有一部分845的BSP原始碼。至於我怎麼得到它們的，我不便說。但我承認，有關MTP850的事的“導火索"，應該與我發佈了有關我用於搭建部落格的 Oneplus 6T 相關的帖子相關（還因此結識了幾位志同道合之人）。

<div class="grid" markdown>

<img src="https://static.wikitide.net/gnugenshinwiki/0/03/My-fajita.png" width="100" >

<img src="https://static.wikitide.net/gnugenshinwiki/9/9f/Sdm850-front-view.png" width="100" >

<img src="https://static.wikitide.net/gnugenshinwiki/4/41/Sdm850-back.png" width="100" >

</div>




# 爲何選擇MTP850

我已經說過，一方面是因爲我有 MTP850 的BSP原始碼，另一方面是因爲它相對容易得到，畢竟你總可以在鹹魚上找到你想要的（我絕對沒有業配）！就在下單 MTP850 的前一天，我還發現了一個批發 MTP850 工程機的，價格只需300元（現在845工程機都按一千克賣了嗎）...... </br>
當然，我並沒有下單那一家。

# 準備工作

實際上，因爲我過於糟糕的技術，我的第一臺工程機在到手後不久就“黑磚”了。在嘗試多次修復後無果，我便再一次嘗試與家長談判，經過3個小時的“談判”後，我終於再一次獲得了3臺 MTP850 工程機（爲什麼是3臺？因爲出現了一點“小意外”）。這一次，我終於可以
大幹一場了... </br>
首先，下載一個你最喜歡的 [GSI 映像](https://github.com/TrebleDroid/treble_experimentations/wiki/Generic-System-Image-%28GSI%29-list)，我建議選用 Google 的 AOSP 14 GSI 和 Lineage 21 映像，因爲系統簡單，BUG 較少（才怪！）然後繼續閱讀： </br>
從這一步開始，根據工程機的情況（目前， 所有 MTP 工程機都分爲兩種平臺—— LA 與 WP），我們需要選擇合適的 GSI 映像刷機： </br>

| LA 平臺 Android 版本     | 可刷 GSI                                                                                                                                                                                                |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Android 8       | 你可以刷寫 “A/B分割” 的映像，最高支援 Android 11。                                                                                                                                                                                    |
| Android 9   |  同上。                                                                                                                                                                           |
| Android 10（你最常遇到的版本） | 同上，最高支援 Android 14 QPR1。                                                                                                                                                   |
| Android 11       | 同上 |
| Android 12        |  最高支援 Android 14（QPR2 理論可行，我沒有測試過）。                                                                                                                                                                             |

| WP 平臺    | 可刷 GSI                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 10.0.22621 或更高       | 無解。因爲 WP 平臺的 UEFI 只有 ACPI 支援，Linux 核心將無法啓動。且無法獲得 Android 的 EDL 恢復包（由於版權原因不可能有人分享的）。                                                                    |


我的三臺機就比較幸運：兩臺 Android 10 的，一臺 Android 12 的。在到手之後，自然是毫不猶豫的通過QFIL備份了所有韌體，以備不時之需。</br>
因爲這是工程機， 所以 Bootloader 已經解鎖（我懷疑它根本沒有鎖），自然就可以取得Root權限。但是這不是正常的手機，沒有刷機包可以下載，自然就無法獲取`boot`映像來進行修補。那要怎麼做才能獲得Root權限？
在一次簡單的系統探索後， 我發現這個 Android 構建是`userdebug` 版本，這就意味着它的 Shell 具有 Root 權限。所以，只需通過 Linux 的 `dd` 命令就可以導出某個分區的內容。我通過一系列 `adb` 命令，提取了 `boot` 映像：

```bash
adb root
restarting adbd as root
adb shell dd if=/dev/block/by-name/boot_a.img of=/sdcard/boot.img
```

之後，手機下載並安裝 [Magisk](https://github.com/topjohnwu/magisk/releases) 在應用程式中，選擇“安裝”，之後選擇“選擇並修補文件”，找到你的`boot.img` 所在目錄，然後將其拷貝到電腦上 ，手機重啓至fastboot，輸入以下命令：

```bash
fastboot flash boot_a /path/to/pagisk_patched-XXXXX.img
```
然後開機，你就取得了Root權限。

<img src="https://static.wikitide.net/gnugenshinwiki/9/94/Magisk-main.png" width="300" >


# 簡單體驗

我曾經認爲，高通的工程機系統想必會乾淨且流暢，但是直到我親自體驗後，發現我想多了。</br>
Android 10 雖然順暢，但是它的媒體組件有問題，系統內建的鈴聲壓根不會播放，讓我一度認爲我的硬體有問題。而 Android 12 最起碼媒體組件是正常的...... 但也好不到哪裏去。Android 12 上面，系統UI 卡噸、喇叭破音甚至當機進入Crushdump的現象都會發生。</br>
當然，我加入了Telegram 上關於MTP845的群組。並且從那裏獲取了自編譯的 Android 12 EDL 刷機包（`小小的數字9` 你猜我爲什麼會提她？）。刷入後依舊如此。</br>
所以，是時候切換到 GSI 了！刷寫GSI 映像的過程也十分簡單：

```bash
fastboot flash system /your/gsi/image.img
```
最後通過`fastboot -w `來恢復工廠設定，完成！

# 優化、優化、還是優化！

> V8兄弟們V8！真男人就要用ARM V8指令集！你看這是什麼東西？ 高通MTP845說的呢！（口水噴濺）
> 熔斷的手機我們不要！黑磚危險！


當我成功開機後，我的第一感覺不是無盡的興奮，而是UI卡噸、聲音頓挫，同樣的問題再次出現，彷彿它們註定要與這臺工程機爲伴。


<img src="https://static.wikitide.net/gnugenshinwiki/7/78/Trebuchet-los.png" width="300" >


但是，作爲一個5年的玩機歷史的我，怎能被這種問題打倒！於是，我立刻開始了系統調優工作。</br>
面對這種情況，我第一個想到的有同樣狀況的手機，是我的華爲Y9（2018），在刷了Android 14 後，也有同樣問題。這樣，我的解決方案就明朗了。


:::note
Magisk作者幾年前把內建的模組倉庫砍掉了，使用者得手動下載模組安裝。請不要從不信任的網站上下載模組。來路不明的模組也不要下載！一個惡意的Magisk 模組會使你的手機系統出現不可修復的錯誤，它們通常是致命的。
:::


 - 首先，下載著名的“YC調度” ，然後在Magisk應用，前往“Modules”，在此介面下，點擊上方的“Install from storage”，在安裝過程中，按下音量加來安装。這也會同時安裝“A-Soul遊戲優化”模組，完成後重新啓動，你會發現UI明顯順暢了很多。

 - 然後，下載[YAKT](https://github.com/NotZeetaa/YAKT)，以此來實現核心相關的優化，這也會同時修復聲音頓挫的問題。
 
 ::github{repo="yc9559/uperf"}

 ::github(repo="NotZeetaa/YAKT")

- 雖然可能有些多餘，但我建議安裝[Simple bootloop saver](https://github.com/Magisk-Modules-Alt-Repo/Simple_BootloopSaver)來防止Magisk模組出錯導致卡開機，從而導致一些奇怪的問題發生。

 - 然後，下載[Scene 4](https://github.com/ramabondanp/vtools_en/releases) 安裝並授予Root權限，雖然它是私有軟體，但是沒有比它更好的了（新版的軟體還有後門）。然後，點擊“功能”，選擇“Swap設置”，按照下圖調整即可：

<img src="https://static.wikitide.net/gnugenshinwiki/8/8b/Scene-Yay.png" width="300" >

<img src="https://static.wikitide.net/gnugenshinwiki/9/9f/Scene-Why.png" width="300" >


 - 修復聲音的方式很簡單，在“Phh Treble Settings” 找到“Qualcomm Features”啓用“Disable soundvolume effect" 即可。

 - 最後，確保你已經完成上述操作，然後重新啓動手機試試吧！

# 後記

經過了上述調優之後，這臺MTP850工程機的系統響應速度和順暢度都有了較大的提升，也算是一個可以正常使用的工程機了，也許可以拿去學校摸魚？誰知道呢......
