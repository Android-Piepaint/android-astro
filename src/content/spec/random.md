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

# 5月20日

一直在思考如何改善 Armbian Linux 在我的 SM8750 MTP 原型機上的開機流程。不想每次都要從 BDS Menu 進入 UEFI Shell 打指令手動開機(之前使用 `bcfg` 指令手動建立引導選項的方法在原型機上不生效，可以建立引導選項，但是無法開機)，今天通過爬文找到一個[高通原型機愛好者/開發者的解法](https://kancy.life/2025/08/16/ABL2ESP/)。了解到了高通開發的 `abl2esp` [專案](https://github.com/qualcomm/abl2esp)，建立一個最基本的 ABL bootloader，可以在開機後檢索並執行位於內建 UFS 快閃記憶體的 EFI 應用程式。能夠執行 GRUB，`systemd-boot` 之類的系統開機載入器，甚至也可以通過 GRUB chainload 裝置原本的 ABL，保留使用 Android 的功能。或者直接替換成高通的 `fastboot.efi` [EFI 應用](https://github.com/qualcomm/fastboot.efi)，實作了簡單的 Fastboot 功能（`boot` `continue` `reboot`之類）。每次開機的時候通過 Fastboot 把 kernel 或者 EFI 應用傳進去，倒是有點像我之前在 SDM845 MTP 原型機的做法了。不過好像無法使用鍵盤輸入？至少可以改善開機流程了。

# 5月19日

Android 和 Linux 永遠無法分離。即使 Android 對於 Linux 核心的修改被上游拒絕接受，使得 Google 不得不維護自己的 downstream kernel 分支...但是 Android 應該總會有辦法共享常見的 GNU/Linux 的函式庫和程式資源。一開始是 `busybox` ,現在靠 Termux 和 LXC，未來會靠 pKVM/KVM...

# 5月18日

昨天看了我的 YouTube 頻道，發現我的訂閱者又增加了10位，現在有了30位訂閱者了。其中最近發佈的 8750 MTP 原型機跑主線核心和 Armbian 的影片評論還挺多的。不過大家似乎不知道高通所設計的原型機呢，明明影片標題就寫着「ported to Qualcomm SM8750 MTP」，評論還有人問這是什麼裝置，看來原型機還是不如市面上常見的零售機常見（一本正經的講廢話）</br>


難怪我認識的一位高通原型機開發者在她自己的 Telegram 頻道中，會因某些使用者問道「Global or China」之類的話而生氣，之後講「If you don't know what it is, you don't need to know」這種話。雖然可以理解這種現象（原型機很難見到，也不能通過正常手段買到），但是還是好好笑呀! `xD`

