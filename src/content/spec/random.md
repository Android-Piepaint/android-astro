---
title: 動態牆
description: ''
image: 'assets/mtp8750-front-view.jpg'
tags: [ublog]
category: 'ublog'
draft: false
lang: 'en'
---

# 動態牆

<img src="/assets/mtp8750-front-view-2.png" >

這是我用於記錄簡單想法的地方，與首頁的長篇文章不同，這裏的部分內容可能會成爲新的文章。</br>
</br>
這裏的微部落格充滿着各種觀點，尚未經過打磨。他們反映着我的思考和對於理論的理解：有反應時事，有靈光隨想，有政治論議，亦有生活感悟。可能冒犯到所有人，因此這裏的一切僅代表我個人意見，請酌情閱讀。</br>

> Parrhesia (παρρησία)，即只說真話不欺瞞，有負面的後果也在所不惜。說真話不只是言論自由，真理顯現也符合大眾利益，更是公民義務。唯有對自己誠實才能讓我們解脫。

# 2026 年動態牆

## 5月24日

 - Toby Fox 在他的大學時期就開始思考新的遊戲作品內容，最後寫出了無數電玩愛好者公認的「神作」Undertale（地域傳說）。我是不是也要學習他，開發出一個以 Undertale 爲靈感的開源冒險遊戲？不過遊戲角色和劇情我還沒有想好...遊戲名稱暫定爲「FOSSTALE」，大概講的是一位開發者從污濁不堪的 Windows 世界逃離，卻不小心踏入 Arm Linux 世界，並和這片自由土地上的人們開始的一系列冒險和羈絆，最終這位開發者接受了自由軟體的理念，成爲一名 FOSS enthusiast 的故事。不過，要是真的做出遊戲來，會有人去遊玩嗎？</br>
 至於遊戲進程，和 Undertale 一樣，分爲和平線路，絕滅線路，和一般線路。只是這裏的「絕滅」指的是玩家講對應的人物角色「解除安裝」（畢竟 UNIX 中一切皆檔案），使得這個人從遊戲世界中永遠消失...</br>
 至於像 Sans 那樣檢定玩家行爲的角色我還沒有決定要給她什麼名字...或許「`littlehana`」比較不錯？</br>
 </br>

  - > Remember what I told, no matter where I go. I never leave your shadow, you'll never be alone.</br>
    > Even whether season changes, even where we old. Remember what I told, you'll find the way back home. </br>

    顯然這首歌並不是給 Android 和 iOS 這二個系統所寫的，因爲嘗試在 Android 上執行 `cd /home` 命令會得到 `/home: inaccessible or not found` 的錯誤，而 iOS 的 `/home` 是指向 `/var/mobile` 目錄的檔案連結，不是真正的 `/home` 目錄。所以，Android 和 iOS 使用者永遠無法找到自己的「家」了~ `xD`</br>
</br>

 - 或許我應該像 FlashTeens 那樣，把自己的 Minecraft 地圖架設成伺服器之後讓其他鐵路迷進來一起建造地鐵和高速鐵路，還能夠加快地圖的整體建設，順便減輕自己的工作量... 另外，目前「拿維鐵路」全線的路線圖以及開設的車站也已經定好了，歡迎大家爲車站設計提供建議！</br>
## 5月23日

我之前一直都搞錯了我的 Lenovo Yoga Slim 7x 筆電的內建 PCIE 網路卡型號，因爲核心 `lspci` 命令展示的裝置名是 Fastconnect 7800，導致我很長一段時間裏認爲這是高通自家網路卡。到 Google 爬到一張不知名的[圖紙](https://blog.cloudflare88.eu.org/_astro/yoga-datasheet.CCssOcjz_v66nT.webp)看了才發現用的是 Quectel NCM825A 網路卡，無論是樣張還是我自己拆解筆電後看到的裝置都完全一致。原來我很早就接觸了 Quectel 家的產品呀...難怪驅動程式不穩定。之後我就把所有寫驍龍筆電的文章中提到網路卡的部分全部修改了。</br>
那，之前寫的 8750 MTP 原型機的文章是否也有錯誤呢？或許有吧...目前沒有圖紙也很難確定。不過大家不用擔心就是了，如果發現了錯誤，我會立即修正的。(雖然訪問部落格的人都很少就是了)</br>

## 5月22日

 - 很多人爲了存取AI廠商的更多進階功能，常常會自願掏錢，還要把自己結賬的賬單po到社交媒體，覺得自己剛完成一件很厲害的事情一樣。還有人建議我訂 Claude, Super Grok 這些計劃爲我 8750 MTP 原型機移植 Armbian 的專案助力。</br>
但是我怎麼可能會爲這些專有軟體甚至是間諜軟體付錢呢！花錢解鎖進階玩法，然後心甘情願的把自己的對話記錄交給AI公司處理，還要在自己的電腦上安裝諸如「Gemini CLI」「Cloude CLI」之類的工具，在幫助自己繼續移植工作的同時順便交出自己的一切？雖然 AI 確實幫助了我不少，但是不要忘記這些AI Assistant 都是商業閉源軟體，絕不應該支援這些閉源軟體掠奪使用者的資料。更不應該把他們安裝在自己的裝置上。至於離線版 LLM 則相對好一些。</br>
</br>

<img src="/assets/pakala-chan.png" >

 - 妳可千萬不要變得像我[一樣](https://blog.cloudflare88.eu.org/assets/pakala-chan.png)，520情人節跟 Pakala 一起過啊(圖片由 Gemini 製作)... _P.S. 高通可不會讓你輕鬆的買到他們四萬美金的原型機喔。_

## 5月21日

 - 對於 Reddit 上關於 degoogle 的討論，有人指出可以使用中國產的 Android 手機，因爲中國的 Android 手機沒有 GMS，即使被一些「忠於政府」的中國企業洩露個人資料也不必擔心，只要不是洩露給美國就好。這種想法，和那些逃出中國的反賊所想的觀點「不謀而合」，都認爲萬一發生資料洩露，只要資料不要洩露給本國政府或者企業，就不會有什麼大礙。只是那些「degoogle 同好會」主張用 Huawei，小米之類的中國產手機，而後者則是主張用 iPhone，Pixel 之類手機。因爲美國是比較民主的一方，資料交給他們沒有關係。</br>
在我看來無論是主張用中國產 Android 手機的「degoogle 同好會」，還是反賊的觀點都不能接受。專有軟體就是專有軟體，無論哪個國家的都一樣。就是會收集使用者的資料和隱私啊，那些「同好會」的人不過是從一捆專有軟體的集合跑到了另一個專有軟體的集合而已。想要做到徹底的 degoogle，就必須在日常使用的軟體中多使用自由軟體，不會依賴於某一方企業給出的方案。像是 Proton 雖然主張「維護使用者隱私」，但我覺得也不能完全相信。</br>
</br>
 - 昨天晚上檢視了我部落格從建立之日起所有 GitHub 上的 commits，不知不覺我的部落格就架設一年多了啊(2025年5月3日~2026年5月3日)...雖然我寫的文章也不多，只有56篇。至於訪問人次和閱讀量還暫不知情，不過能夠向同樣熱愛自由軟體的同好們展示屬於我自己的獨到見解和自由軟體於日常生活的實際運用，順便結識不少喜歡自由軟體或者原型機的同好，也非常開心了。或許我應該舉行一個同好會來慶祝一下我的部落格建立1周年？</br>
</br>

 - 自從前面幾星期升級了部落格的 Astro 框架之後，發現很多使用的功能都不能正常運作了。爲了避免部落格成爲被用於利用未知零日漏洞進行攻擊的「跳板」，我只好升級部落格的 Astro 框架版本，但是新的 Astro 6.3 框架不再爲內容物件產生 `slug` 屬性，改爲僅提供 `id` 屬性，使得部落格的文章無法正常檢視。我不得不重寫所有產生文章 URL 連結的程式碼，結果導致文章底部的導航欄和標籤頁無法訪問。之後又在 Gemini 的幫助下把這兩個廢了近3個月的功能修補好了，也一並修復了部落格的 RSS feed。話說現在還有人在使用 RSS 閱讀我部落格的文章嗎？

## 5月20日

一直在思考如何改善 Armbian Linux 在我的 SM8750 MTP 原型機上的開機流程。不想每次都要從 BDS Menu 進入 UEFI Shell 打指令手動開機(之前使用 `bcfg` 指令手動建立引導選項的方法在原型機上不生效，可以建立引導選項，但是建立的開機次序會在重開機後消失)，今天通過爬文找到一個[高通原型機愛好者/開發者的解法](https://kancy.life/2025/08/16/ABL2ESP/)。了解到了高通開發的 `abl2esp` [專案](https://github.com/qualcomm/abl2esp)，建立一個最基本的 ABL bootloader，可以在開機後檢索並執行位於內建 UFS 快閃記憶體的 EFI 應用程式。能夠執行 GRUB，`systemd-boot` 之類的系統開機載入器，甚至也可以通過 GRUB chainload 裝置原本的 ABL，保留使用 Android 的功能。或者直接替換成高通的 `fastboot.efi` [EFI 應用](https://github.com/qualcomm/fastboot.efi)，實作了簡單的 Fastboot 功能（`boot` `continue` `reboot`之類）。每次開機的時候通過 Fastboot 把 kernel 或者 EFI 應用傳進去，倒是有點像我之前在 SDM845 MTP 原型機的做法了。不過好像無法使用鍵盤輸入？至少可以改善開機流程了。

## 5月19日

Android 和 Linux 永遠無法分離。即使 Android 對於 Linux 核心的修改被上游拒絕接受，使得 Google 不得不維護自己的 downstream kernel 分支...但是 Android 應該總會有辦法共享常見的 GNU/Linux 的函式庫和程式資源。一開始是 `busybox` ,現在靠 Termux 和 LXC，未來會靠 pKVM/KVM...

## 5月18日

昨天看了我的 YouTube 頻道，發現我的訂閱者又增加了10位，現在有了30位訂閱者了。其中最近發佈的 8750 MTP 原型機跑主線核心和 Armbian 的影片評論還挺多的。不過大家似乎不知道高通所設計的原型機呢，明明影片標題就寫着「ported to Qualcomm SM8750 MTP」，評論還有人問這是什麼裝置，看來原型機還是不如市面上常見的零售機常見（一本正經的講廢話）。</br>


難怪我認識的一位高通原型機開發者在她自己的 Telegram 頻道中，會因某些使用者問道「Global or China」之類的話而生氣，之後講「If you don't know what it is, you don't need to know」這種話。雖然可以理解這種現象（原型機很難見到，也不能通過正常手段買到），但是還是好好笑呀! `xD`

