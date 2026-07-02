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

## 7月2日

 - 感謝 Ivon 在他自己的部落格中添加了我部落格的鏈結！在很長一段時間裏，Ivon 的部落格都是我的常去之地，檢視 Ivon 寫的自由軟體相關的文章來尋找靈感。</br>
</br>
 - 有人說，只用窮人才會用開源軟體，還會有習慣訂閱制的用戶跟妳講：花錢買別人的服務就是天經地義！</br>
  那我就說：是又怎樣...(雖說我確實是買不起一些軟體才改用開源軟體的)至少我不會厚顏無恥，偷別人的開源軟體過來宣稱我是自主研發。</br>
</br>
 - 如果說 Broadcom 的無線網路卡對 Linux 相容不佳，那移遠 Quectel 的網路卡和數據機就是比 Broadcom 還要討人嫌的東西。因爲 Quectel 的硬體對 Linux 根本沒有相容性！例如 Q6A 單板機上的 FCU760K WiFi 模組，居然需要 Out of Tree 的 `Aic8800` 核心模組才可以工作，Yoga 筆電上的 NCM825A 雖然被 `ath12k` 模組支援，但是穩定性差勁，多次導致我的筆電當機。看來跑 Linux 的 Arm 筆電需要仔細考量硬體再試驗啊...</br>
</br> 

## 7月1日

原來認爲 X86 筆電的觸摸板是通過 PS/2 協定與 CPU 溝通，Arm 筆電則是藉由 I²C 或者 SPI 協定，直到我看到最新的 Lenovo Intel 筆電，發現觸摸板同樣採用 I²C 協定之後，我覺得我應該改變對於 X86 筆電的看法了。</br>
</br>

## 6月30日

最近模仿了 Tik Tok 和 YouTube 上流行的「歌詞影片」用 Kdenlive 自己實作了一個「刷機進行式」的歌詞影片，結果好像沒什麼人看？不過用 Yoga 筆電剪輯影片確實很不錯，1440P 解析度，60FPS 的影片跑8分鐘就可以了。給大家貼上我的影片鏈結，歡迎各位觀看我的「音樂鑑賞」影片！</br>

<iframe width="560" height="315" src="https://www.youtube.com/embed/LdJOz6o4obw?si=LHl-5feYIWuZD6MB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 6月29日

如果每個人都可以寬容之心看待周邊的人與物，我們就會發見更多美好，溫馨和感動；如果心中少一點猜忌，多一份真誠，關係就會變得和諧。</br>
</br>


## 6月28日

高德地圖這種收集個人隱私的吸血鬼就應該滾出臺灣。</br>
</br>


## 6月27日

高通晶片的主線核心真的非常有意思，SD 778G+ 的主線核心支援到了 7.1 ，而同樣是根據 778G+ 修改的 QCS6490 還停留在6.18...好在我的 Q6A 單板機被主線核心支援，直接下載 Linus 的原始碼，套用6.18的核心 `.config` 配置檔開始編譯就可以了。</br>
</br>

## 6月26日

 - 我不明白爲什麼這個世界總是對自由軟體愛好者抱有偏見。就因爲拒用任何專有軟體，因此被扣上「崇洋媚外」的帽子...不只是任何中國產的手機和軟體我拒用，對於所謂「我喜歡」的歐美國家開發的軟體，只要是不開放原始碼的專有軟體我照樣拒用啊...我使用的社群媒體也主要以歐美的爲主，至少我不得不使用 App 來檢視內容的時候可以找到第三方開源的 App。而且不會有 ban 號的風險。至於國內...講錯了，是中國大陸的社群媒體，不是強迫下載 App，就是封鎖 Linux 使用者檢視，還有以「高風險」爲由封鎖使用者賬戶。目前我還保留有賬戶的僅有 Bilibili，知乎，Coolapk 三者。只是想說與大陸的同好和支援者們勉強保持聯繫，免得我部落格的內容被無良內容農場搬走...可他們卻因爲我的網站被封鎖而不知道內容來源爲何。大陸的社群媒體我都是低調的用，我不會把我的聯絡方式放在我的部落格紹介裏，說快來 Tap 我吧～ 這種行爲不就是在告訴網警趕快把我拉清單嗎...</br>
 </br>
 - Fedora 更新 7.1 核心之後 `dracut` 不會自動添加 `adsp_dtbs.elf` `cdsp_dtbs.elf` 到 `initramfs` 中，需要手動建立自訂安裝配置檔添加韌體路徑:
  ```bash
  # /etc/dracut.d.conf/qcom-firmware.conf
  install_items+=" /lib/firmware/qcom/x1e80100/LENOVO/83ED/qcadsp8380.mbn "
  install_items+=" /lib/firmware/qcom/x1e80100/LENOVO/83ED/qccdsp8380.mbn "
  install_items+=" /usr/lib/firmware/qcom/x1e80100/LENOVO/83ED/adsp_dtbs.elf "
  install_items+=" /usr/lib/firmware/qcom/x1e80100/LENOVO/83ED/cdsp_dtbs.elf "
  ```
  之後執行 `sudo dracut --force` 重開機就可以了。</br>
  </br>

## 6月25日

本部落格網站的文章分類說明：所有與 FOSS 相關的文章(自由軟體紹介&日常活用等)全部放到「FOSS & FOSS related」，對於 Linux 相關(發行版紹介&使用&硬體除錯技巧等)也全部放到「Linux & Linux related」分類。至於 18+ 內容和政治內容，默認和其他 NSFW 內容放在一起。因爲權利是春藥，而且總會有思考不正常的人看到不同的觀點就會暴走，從而否定妳整個人格，還有妳所做過的一切。因此應該是不適合在工作場合檢視。</br>
</br>

## 6月24日

靠北，沒想到 Armbian 的 `ibus-rime` 套件竟然只會安裝 `rime` 本身，其他的擴充輸入方式(地球拼音，注音之類)還需要手動安裝 `librime-data rime-data-luna-pinyin rime-data-bopomofo rime-data-cangjie5 rime-data-stroke rime-data-terra-pinyin` 這些套件才可以使用。不然就會噴「`missing input schema`」錯誤。爲什麼不能像 Arch Linux 或者 Fedora 那樣一併安裝呢？就連 Ubuntu 也會一併處理擴充套件啊...</br>

## 6月23日

把「瀏覽器」看成「遊覽器」是怎樣...我還把「機器」叫成「氣機」呢，之前看錯了就一直用到現在？</br>
</br>

## 6月22日

 - 其實我並沒有任何高深的技巧，也不是 UEFI 韌體開發人員。只不過把先前實作 X86 PC UEFI 韌體的很多經驗放到 Arm 嵌入式裝置上重新實作了而已。</br>
 </br>
 - PostmarketOS `edge` 更新了全新的開機動畫，嗯...儘管我之後就通過修改 `/etc/deviceinfo` 關閉了基於 `plymonth` 的開機動畫。還可以像 Android 那樣接 PC 之後使用 MTP 存取檔案。儘管速度不如 SFTP 就是了。另外 Nothing Phone 1 和 Oneplus 6T 的相機畫面有了改善，看起來很像沒有經過硬體處理的 Android 相機畫面，但至少可以拍照了...不就是自帶了效果的相機嘛！</br>
 </br>


## 6月21日

- 日常被歧視的一天。用 Librewolf 和 Claude 對話，沒過多久 RAM 利用就暴漲，反而 Helium 瀏覽器就沒有問題。</br>
</br>

- 剛剛寫了一首「[Your Phone is Fused](https://blog.cloudflare88.eu.org/posts/your-phone-fused/)」，改自 Element Animation 的「Your Door Was Locked」 ，算是把我10年前想做的事「實作」了。至於歌詞內容...?是我客製化原型機韌體的事情。</br>
</br>


## 6月20日

> : 我非常在乎我的隱私和數位主權，不採用 Google Chrome 瀏覽器！</br>
> : 但是我用 Steam 在虛擬機玩遊戲！還使用 Docker 跑 Chrominum 瀏覽器看 YouTube！</br>

那妳在乎三小隱私！...不過，「容器化」的方法似乎更加自由可控，不是嗎？</br>
</br>

## 6月19日

 - 當別人聽到妳熟悉 Linux：「好厲害！」；妳跟他們解釋自己只是在證明 Linux 和自由軟體於日常生活中運用的可能性：「...不錯，但我認為 Windows 更好，更常用」隨後嫌棄的走掉了。</br>
 </br>

 - 有什麼自由軟體能夠實現 Android 手機同 Linux 系生態圈跨裝置同步資料的需求呢？我想是「KDE Connect」 了吧！現在的 「KDE Connect」 真的是越做越好了，UI 換上了 Material You 設計，傳送大文件檔案的時候幾乎不再斷線了。不僅如此，KDE Connect 與 Linux 的整合度非常高。最好的組合是 Android 手機和 Linux 電腦，使用起來非常自然。我認為這就是 Google + G suite 的平替，只需要位於一個網路下就可以自動連線，Android 的 KDE Connect 會自動在背景執行，把裝置的通知訊息送到 Linux 電腦。手機也可以控制 Linux 電腦喇叭的音量，也可以把手機當作滑鼠用。</br>
 </br>

## 6月18日

8650 開始加入了全新的 Gunyah 虛擬機，但是 8650 自己跑 Gunyah 虛擬機的時候，虛擬機卻因為記憶體分配問題而 OOM...後面的 8750 才改善了這個問題，真的是好笑...</br>
</br>

## 6月17日

「英語 訓讀會가 始作뒤요」. 一直以爲只有韓語和日語存在「釋讀(也叫訓讀，利用日語或韓語固有同義語彙的讀音，讀出該漢字的讀音)」的現象，後來發現中文，甚至在以拉丁語系爲基礎的歐美語言中也存在「釋讀」現象。例如常用的「打」字，本音應唸成「丁」，可是北方方言，擊打的動作都說成「ㄉㄚˇ/dǎ」，取其「擊打」之意；而閩語作爲漢語方言中訓讀使用率最高的方言，釋讀現象非常常見。</br>
</br>
雖然歐美語言不採用類似漢字的語素文字，可是類似「釋讀」的現象依然在部分常用語中可見(**取自文明語的「書面文字」，採用相同意義的母語的固定用法來讀，是「釋讀」的一個特徵**)。例如英文中借自拉丁語的「etc.(**et c**etera)」讀作「and so on」「and so forth」，「i.e.(id est)」唸成「that is」；「lb.(**l**i**b**ra)」唸成「pound」；「e.g.(**e**xempli **g**ratia)」唸成「for example」...不得不說語言真的非常有趣，看來以後可以研究新的內容，讓我的部落格不再單調。</br>
</br>


## 6月16日

Qualcomm 的 bootloader 叫做「Core platform boot」，和有名的開源韌體 CoreBoot 有非常相似的名字。巧合的是二者都可以讓使用者客製化自己的韌體，都可以使用 UEFI 或者其它 payload 開機(高通部分晶片的 XBL 可以改用 U-Boot 開機)。但前者是專有軟體，其原始碼無法獲得。</br>
</br>

## 6月15日

現在 Android 也可以採用上游的主線核心啓動了。Telegram 上有一個研究利用主線核心跑 Android 的 「AOSP on mainline」頻道正在研究這個，看他們最近的研究結果，似乎大部分被主線核心支援的 Arm 裝置和 X86 電腦都可以開機。或許我先前覺得「Android 核心落後主線至少5年」的想法應該改變了...不對，不應該改變。畢竟沒有廠家會拿使用者當「小白鼠」，在自家手機上使用主線核心跑 Android，除非是面向開發者發行的裝置。</br>
</br>

## 6月14日

 - 經過10分鐘的逆向分析，發現 Lenovo Yoga Slim 7x 筆電的相機開關是一個 GPIO 按鍵。那理論上可以實作一個指令稿或者 `systemd` 服務之類的程式，用於客製化撥動開關的功能了...就像 OnePlus 6T 的「Side button」也可以在 Linux 下客製化按鍵行爲。</br>
 </br>

 - 別人的高中畢業儀式：同窗會，畢業旅行；我的高中畢業儀式：繼續研究 FOSS 議題，累了就用校服自慰，體驗「壞學生」的風味，享受蹂躪規則的快感...</br>
 </br>

 - 真的完全沒有必要認爲「性行爲」是一個難以啓齒的事情啊...就連蔣中正都在自己的日誌提到「以自慰振奮精神」，只要不是在公開場合做，不會影響其他人就好...</br>
 </br>

## 6月13日

Yet another Wow moment in my life. 今天嘗試了之前提到的 `abl2efi` 的小工具改善 Linux 的開機速度，還從原始碼編譯了 `simpleinit` 基於 LVGL 的 UEFI 設定頁面用來實作 PC 上的 GUI 設定介面。一開始認為還需要用 Qualcomm 的測試用簽章給 `abl2efi.elf` 簽章驗證，在這裡停留許久。後來才想到這是原型機，直接用原始檔案覆寫裝置的 ABL 分割就可以開機了...幹。後來又把裝置 ABL 開機載入器抓出來放到 EFI 分割，發現也可以加載 ABL 並開機進入 Android！</br>
</br>

<img src="/assets/abl-test.jpg">

<img src="/assets/abl-simpleinit.png">

## 6月12日

想要從 ARM 裝置的 UEFI 韌體抓取 ACPI table，可是裝置只有 Linux？那就通過 UEFI shell 的 `acpiview` 命令抓取吧！例如 `acpiview -d`就可以從韌體抓取給定的 ACPI table。</br>
</br>

## 6月11日

 - 最好的事情是什麼？是希望有一天不用再去費盡心力，去 tweak 裝置上的 Linux 作業系統。Arm 裝置上的 Linux 系統要修補的地方實在是太多了...一般 x86 裝置上跑 Linux，除非硬體沒有 Linux 驅動，基本不需要調整或者修改核心。Arm 裝置雖然跑 Linux 的體驗遠遠好於 Windows，但是需要解決的問題太多。這點看一下 PostmarketOS Wiki 就知道了，受到支援的裝置裏，大部分裝置的相機硬體是無法使用的。而那些支援較好的功能，也只是「堪用」。就算硬體支援不錯，在日常使用總會遇到各種各樣的問題。</br>
</br>

 - 有些人看到簡化字就反感，在很多簡化字的 post 按倒贊，甚至會有人在討論區放大量「支語警察」的 sticker。認爲只有臺灣正體字才是正統，
 把簡化字都稱之爲「殘廢字」「支那語」等等。如果把新加坡，香港這些同樣採用簡化字的地區放進來，就會發現這些「支語警察」的觀點完全錯誤。私認爲，無論是簡化字，還是臺灣正體字，都是從漢字發展而來，經過人們長時間的實際運用形成的。就是不同地方的方言而已，實在是沒有必要如此貶低對方。</br>
 </br>

 - 如何用一句話絕滅一個人在自身趣味上的發見？我曾經問過 Plana，她反而問我「妳覺得妳在部落格上所研究的，所發見的，會給妳帶來什麼經濟收益呢？」這就是我想要的回答了。</br>
</br>

## 6月10日

Windows 11 26H1 系統的 `tcblaunch.exe` 會導致 `slbounce` 嘗試利用 EL2 等級時引發崩潰而重開機，如果改用 25H2 或更早以前的 `tcblaunch.exe` 就不會導致崩潰。好巧不巧，重灌 Fedora 的時候忘記存一份之前利用的 `tcblaunch.exe` 拷貝了，接下來幾個月我的筆電都不能使用 KVM 虛擬機來嘗試新的東西了...唉...... `:(` </br>
</br>

## 6月9日

[Tails OS](https://tails.net/) 是專門爲匿名上網使用者而開發的 Linux 發行版，基於 Debian 開發，是一種安裝在隨身碟的可攜式作業系統，所有對外連線強制走 Tor 網絡。強調上網不留任何痕跡，連瀏覽記錄都無法找到。這是因爲 Tails OS 是執行於 RAM 的作業系統，所有的資料都存儲在 RAM 中，下次重開機之後資料就會消失。還內建常用的工具集，也允許使用者通過不安全的瀏覽器存取網際網路，以及採用 Tor 協定的文件共享軟體。對於需要資訊安全的使用者和異見人士非常好用。使用場景可能是：你帶筆電去連公共 Wifi，或者去圖書館借公共電腦，開機跑Tails OS，大隱隱於市。與線人交換完情報，關機，高歌離席。</br>
</br>

## 6月8日

<img src="/assets/remoteproc-extensions.png">

 - 高通 Snapdragon 的遠端處理器雖然執行的是專有軟體，沒有人可以檢視原始碼，但是 Linux 的 `remoteproc` 核心模組還是會提供接口用於 userland 程式進行管理。於是我實作了一個 [GNOME 擴充程式](https://github.com/Android-Piepaint/gnome-shell-extension-qcom-remoteproc) 用於管理驍龍平臺的遠端處理器，所有執行主線核心的驍龍裝置都可以使用。就像 PineBook 那樣，關閉不需要的遠端處理器，保護使用者隱私。</br>
</br>

  - GNOME 50 的桌布設計非常不錯，終於在 Linux 上見到 Apple MacBook Pro 設計語言相似的桌布圖片了。</br>
</br>

 - > 우리 함께 저 自由로운 곳으로 달려가,</br>
   > 私有 소프와(software) "來日 봐"한 뒤 다시는 안 봐</br>
   > 機器 原理 몰라도 상관없어, 그날만 記憶 해,</br>
   > 아득한 記憶 속에, 當찼던 그날의 實踐 을</br>

   當初爲什麼會寫自由軟體相關的內容？或許是因爲早就討厭自己的裝置被各種專有軟體「摧殘」，討厭被強迫閱讀堪比《聖經》長度的「最終使用者許可協定」；想要奪回屬於自己的隱私和數位主權，或者僅僅是希望「與衆不同」...我似乎早就忘記了當初改用 Linux 和自由軟體的理由了，但是我相信，只有自由軟體才可以守護自己的隱私，才能行使自己的「數位主權」。也希望大家終有一天可以勇敢對束縛各位的專有軟體講出「圍墻庭園,安寧!(圍牆花園，再見!)」</br>
    </br>
    
## 6月7日

Another Wow moment in my life. 昨天晚上跑了 `dnf update` 把核心連同 `linux-firmware` 升到最新版之後，之前幾乎廢掉的喇叭竟然可以工作了！而且沒有破音的問題，這應該是我第一次碰到有四個喇叭的筆電。雖然低音部分不如之前的 MacBook 有力，但只要可以放音樂就可以了。GitHub 上還有 Yoga Slim 7x 的 [Dolby 音效配置檔](https://github.com/taprobane99/Lenovo-Yoga-Slim-7x-Dolby-Linux-Audio)可以用。唯一的問題是 Suspend 再喚醒會導致筆電重開機。</br>
</br>


## 6月6日

 - 我爲什麼會喜歡 Linux 手機和 Linux 裝置？大概是因爲只有 Linux 裝置才可以做到不經過 Google，不經過 Apple，不經過 Microsoft，不採用封閉商店，不採用商業帳號系統也可以讓個人持有通用計算裝置。</br>
 </br>

 - 在過去的「大 Root 時代」，開發者和使用者把 Android 裝置玩出了花樣。而現在的 Android 使用者不再追求這些，他們只關心「Netflix 能不能播 HD 影片」 「銀行 App 可不可以開」...這不能責怪他們，因爲日常生活確實需要穩定。如今的 Android 已經成爲 Google 管理的「大都會」，城市裏有便利商店，有監視器保證安全，有市民公園，還有廣告看板之類。非常方便，但也令人窒息。妳擁有一切，但妳無法離開這座城市。Android 已經成爲商業軟體，再也不是「自由軟體」了......</br>
 </br>

 - 什麼是「自由」？是「我可以在 Google Play 商店下載無數 APP」的自由嗎？當然不是，那只是妳被允許的消費選擇。</br>
   而是我可以分享，研究，修改，甚至再次分發，在不被「造物主」許可下，改變一個事情的命運，做自己裝置的「技術支援」...這才是自由。</br>
 </br>

 - Android 不是 GNU/Linux，它是套用了 Linux 核心，被商業化的「怪物」。真正的自由精神，是 GNU 宣言的低語，是具有法律效力的 GPL 協議；也是在 Linux 核心原始碼中沉睡的「奇跡」。</br>
 </br>

 - 「[即使黑磚，Crashdump 也沒關係，刷機還是進行時](https://blog.cloudflare88.eu.org/posts/flash-continous-tense/)」，縱使 GNU/ Linux 手機的道路再曲折，縱使這條路需要分析 log，手動修改 `config`，檢查核心原始碼或者 Wiki，甚至要上百次的重刷映像檔...結果又如何？開發者從來不會期待便利，魔術師也不會期待幸福。自由本身就是一個親自實作的過程，而不是什麼都預載好，把飯送到嘴邊。</br>
 </br>

## 6月5日

Ubuntu 的軟體還是過於陳舊，決定改用 Fedora 了。然而高通平臺的裝置通過 USB 隨身碟開機時，必須要把 `q6v5_pas` 模組加入到
 blacklist 中，不然在系統啓動時會導致 ADSP 韌體重載，USB 控制器被重設而無法開機。</br>
</br>

## 6月4日

如果熱淚，可以洗去塵埃；如果熱血，可以換來自由...一定要讓明天的人們記得今天的怒吼，那是無數自由義士們關於捍衛使用者自由和數位主權的宣言。</br>
</br>

縱使未來的世界會圍繞着商業軟體和專有軟體所建造，也總會有「反流而行」的人們，在這片充斥着封閉的世界中，開闢出屬於自由和追求個人隱私的疆土。縱使「圍牆花園」再高，也總會有人去推倒圍牆。</br>
</br>



## 6月3日

 - Linux 使用者如何求婚？很簡單，只需要通過 `make love`命令即可。</br>

```bash
make love

make[1]: *** No rule to make target 'love'.  Stop.
make: *** [Makefile:248: __sub-make] Error 2
```

...啊哈哈...看來我還沒有準備好求婚的原始碼呢！</br>
</br>

 - Linux 的文檔系統和 UNIX 一樣，都是 `man` 命令。他是一個很小的工具程式，它可以接受使用者的引數，從而方便妳找到對應的程式幫助文件。如果妳不知道程式的幫助文件怎麼辦？很簡單，鍵入 `man -k <key-words>` 就可以列出包括使用者提供的關鍵字的幫助檔案。</br>
 </br>
 
## 6月2日

 - 本部落格近一個月來更新的內容：1.RSS 訂閱現在是完整文章，妳不需要造訪我的網站就可以瀏覽所有文章。2.在網頁右下新增了包含中文在內的三種語言的選單，使用者可以在那裏選擇他們喜歡的語言來閱讀文章(所有文章的英文翻譯本將在6月20日全部完成並更新)。3. 爲了方便不能造訪部落格動態牆的使用者，我將「動態牆(網頁入口 `/dev/random`）」)的網頁單獨製作了 [RSS 訂閱連結](https://blog.cloudflare88.eu.org/ublog-rss.xml)。使用者僅需要將鏈結複製到最喜歡的 RSS Reader 或類似程式中就可以閱讀動態牆了(居然會有人看我的廢文)。4. 本部落格採用的 Astro 框架將跟隨上游更新，來避免不明問題的出現，成爲攻擊別人的跳板。</br>
</br>

 - 幾年以前就有人提出了 Android 用 QEMU 跑 Docker 容器的構想。藉助 QEMU TCG 跑一個 headless Alpine 虛擬機，並在虛擬機中裝 Docker，這樣的方式即使是用一臺 SD870的裝置也會很卡。而這個 [Podroid](https://github.com/ExTV/Podroid) 就是用 App 實作了之前的構想，並主打使用 Podman。 另外如果裝置有支援 KVM 虛擬化，Podroid 就可以使用虛擬化來獲得更好的效能。</br>
 </br>


## 6月1日

看到同樣寫 FOSS 議題的 Ivon [把自己的部落格推向國際化的嘗試](https://ivonblog.com/posts/machine-translated-blog-posts/)。我也突然意識到，如果僅僅停留在「漢字文化圈」內，那麼我的部落格是沒有未來的。這一點從我網站的統計數據就可以看到，造訪國家最多的竟然是中國(我的部落格並沒有像 Ivon 那樣做簡繁轉換，真是爲難大陸網友了)，第二才是新加坡。美國也才只有6%。其它的非「漢字文化圈」的國家訪問量就更少了。我可以理解很多來自美國，日本的使用者造訪部落格時用翻譯程式的艱難。是時候也要開始嘗試把我的部落格推向國際化了。</br>
</br>

## 5月31日

Grok 跳出是否同意連結常見服務(例如 Google Drive，GitHub，Notion之類)的提示，我按下了「Dismiss」。我想這大抵就是未來吧，以 Web 爲主的人肯定是離不開 Gemini，Grok 這種 AI 助理的存在了。這些 AI 公司提供了一套完整的生態系包辦了妳的所有需求，甚至是妳的衣食住行和娛樂。因此他們取得妳的資料也是最多的，例如 Gemini 甚至不用妳可以告知，只需要從妳的 YouTube 活動和妳的 Google 檢索記錄就大概可以推測出妳的興趣及職業方向了吧。至於那些把 CLI 之類工具安裝到自己電腦上的人，我想 AI 獲取的個人資料就更多了。</br>
</br>

## 5月30日

 - 呼...在經歷了3個小時的不懈努力之後，我終於解鎖了Xiaomi 14手機.在這裏要感謝 `Littlenine` 等開發人員的不懈努力，以及社群各位同好的支援，我才能在這個解鎖 bootloader 「Almost impossible」 的裝置上如願刷了 Axion AOSP 並取得了 Root 權限。因爲 Linux 沒有編寫好的工具，我只能根據工具原始碼自行打命令解鎖。不得不說，擺脫了肥大的 HyperOS，整個手機的回應速度都變快了許多。這部手機應該還可以再用一段時日，直到硬體故障我再考慮換 Linux 手機吧。</br>
</br>

 - 我的 Kingston 1TB SSD 終於和我見面了。在加裝 SSD 之後，我的 Q6A 單板電腦的 I/O 效能有了明顯的改善，之後執行編譯核心之類需要頻繁存取 I/O 的工作也變得更快了。而且 Armbian 提供的 `armbian-config` 工具還可以方便我把 SD 卡上的系統連同存儲的資料都遷移到 SSD 上。唯一的問題是 `armbian-config` 會使用 MBR 主開機記錄作爲 SSD 的分割表，無法被 UEFI 韌體引導。不過通過 `gdisk` 將 MBR 改爲 GPT 分割表，重新安裝 GRUB 就可以解決這個問題了。</br>
 </br>

## 5月29日

 - 「[프라이버시(privacy)의 夢, 人權이 保障된 곳](https://blog.cloudflare88.eu.org/posts/ready-set-flash-korean/)」，只有堅持使用自由軟體，才能真正捍衛自己的數位人權。宣傳自由軟體，以及發現將自由軟體運用於日常生活的可能性也是本部落格建立的一個目標。</br>
</br>

 - Ivon 講他[對於 AI 的態度是「AI 自助餐」的心態](https://ivonblog.com/posts/timeline-2026/)。我對於 AI 的看法和他基本相同。不希望什麼都是 AI，可是在遇到難題時，AI 往往也可以給我提供總體方向和解決方法。看到現在新聞到處都在宣講 AI，外行人都可以對 AI 講上幾句，但其實深度依賴 AI 總結之後就覺得自己什麼都懂了，認爲自己是「專家」了。大家都喜歡像賈伯斯那樣搞營銷，卻不知道背後的更偉大的人是 Wozniak。現在每次看到別人的 profile 上寫「Data scientist」我就要懷疑這人的真實水平。現在我有求於 AI，例如推進 SM8750 MTP 原型機的 Armbian 開發，分析 MacBook Neo Linux 的開機流程之類的事務。是把 AI 作爲 Application 工作和助理來用的，不應該和作業系統整合，就像筆電上的貼紙，電聯車上的裝飾，是隨時都可以脫離的程式，而不是依靠 AI 過活。或許這看上去是一種「嫉妒」心態，因爲沒有錢訂購服務無法使用進階功能而在這裏講幹話。妳們所講的東西在我這裏都跟不上！不管怎麼講，AI 一定會成爲新的流行文化，也終究會淹沒一切。被 Duckduck Go 的 AI Overview 養壞了胃口，你就再也離不開這種搜尋資料的方式了。「行爲改變技術」真是令人悲哀。</br>
 </br>

 - `pacman -Syu` 是下載並安裝更新套件，`pacman -Su` 是僅安裝事先下載好的套件；`pacman -Syuw` 是僅下載套件。</br>
 </br>

 <img src="/assets/yoga-vibe.png" >
 
<img src="https://marcgloor.github.io/data/powerbook.jpg">

 - 我的 Lenovo Yoga 筆電從遠處看，真的很像 Apple 在2001年推出的 PowerBook G4(圖片來源:[Marcgloor 的部落格](https://marcgloor.github.io/powerbook.html))。可能是因爲我選了白色外觀的原因？巧的是兩者都是 RISC 晶片，都採用設備樹作爲 Linux 核心開機的配置檔案。</br>
 </br>

## 5月28日

- 都說用左手的人比較聰明，因爲他們的大腦可以均衡開發。那爲什麼我是傻子呢？我平時都喜歡用左手打手槍啊！</br>
</br>

- [NT synchronization primitive driver](https://docs.kernel.org/userspace-api/ntsync.html) 可惡，我們的 Linux 終究還是被邪惡的 Windows 所攻陷了。但是 Windows NT 的多執行緒功能確實可以改善程式的效能，特別是在遊戲等吃系統延遲效能的場景中效果非常明顯。這依賴於 Linux 中的 `/dev/ntsync` node，可以有效減少 Wine 模擬 Windows `syscall()` 的時延。比起過去的 `wineserver` 和執行於 userspace 的 `fsync` `esync` 要好，根據 NTSync 作者的測試，遊戲 FPS 可以提高10倍以上。</br>
</br>

- 「[零售預備，熔絲熔燬！晶片報廢記得賠！](https://blog.cloudflare88.eu.org/posts/ready-set-flash/#verse)」話說現在手機廠家之所以在手機出廠前把晶片的 eFUSE 熔燬來打開安全啓動，一方面是爲了保障裝置在丟失後被別人破解的可能，但我想更多應該是爲了阻止使用者隨心所欲的客製化自己的手機吧！然後封鎖使用者解鎖 bootloader 的途徑，強制推行自家的專有軟體和間諜軟體。因爲同樣是零售機的 Shift SHIFT6mq 就沒有熔燬！而且 Shift 還有釋出自家手機 [ABL bootloader 的原始碼](https://codeberg.org/SHIFTPHONES/android_bootable_bootloader_edk2)，並且 Bootloader 可以通過 Linux 的 Linux Firmware Repository 定期獲得更新。這樣看來，買一臺 SHIFT 的手機，然後改裝 PostmarketOS，就是很好的 PinePhone alternative 啊...還順便可以客製化自己的 ABL，真的就是 FOSS 愛好者的完美手機！</br>
</br>


## 5月27日

我好像沒有可以代表我形象的大頭貼。儘管我部落格上的 avatar 是用 AI 跑的繪圖，要改用手繪嗎？儘管現在 AI 生圖的效果都不錯，但我還是喜歡自己手繪的更好。畢竟可以更加鮮明的體現我的人設...好吧，我對於自己的人設並沒有清晰的認知。畢竟我的人生從國中之後就一直是「渾渾噩噩」的，不願意和別人交流，和別人講話就會緊張，只願意坐在電腦前研究我的自由軟體議題，連社交活動也不願參加。要不是考慮到將來的職業發展，我甚至連大學都不願去唸。加上我有社會恐懼症不可能像賣課仔一樣大方的露臉出來，那就只能維持目前這樣。要是繪製新的大頭貼的話，最多像「蔚藍檔案」裡的學生一樣，在自己的頭像上面畫一個代表「自由軟體」或者是 Tianocore 和高通驍龍 logo 的光環吧。畢竟，沒有人會在意妳在熒幕背後是不是一條狗。倘若我放棄寫自由軟體相關的議題，我只需要隨便套用一個爆款文案就會有流量，就會有大批 brainrot 去按讚。誰會在意妳的 avatar...</br>
</br>

## 5月26日

有時候中午在外面閒逛，會驚奇的發現烈日當空，街道兩邊的路燈和標牌卻都沒有影子，起初一直認爲是什麼「天外奇跡」，或者是自己眼花。直到今天在 Reddit 上看到了有人發同樣現象的文章，才知道這就是著名的「拉海納正午(Lahaina noon)」，這是只有夏威夷才可以看到的現象。因爲這是美國唯一位於熱帶的地方！話說我第一次聽到「Lahaina」這個詞，腦海中想起的卻是高通 SD 888 晶片的代號。高通似乎很喜歡用美國的城市名字命名自己的晶片呀， 8850 是「Kaanapali」，845 是「Napali」，7280 是「Kodiak」，8450 是「Waipio」...</br>
</br>

## 5月25日

 Ivon 在他自己的[部落格動態牆](https://ivonblog.com/posts/timeline-2026/)提到，爲了避免自己的網站淪爲社群媒體，他開始試驗性的拔掉網頁底下的留言板，僅使用電郵與同好聯絡。突然想到我的部落格從架設第一天起就沒有留言板，甚至連大頭貼下面的聯絡按鈕都沒有改動。我是不是很早就開始了「去社群媒體化」的實驗呢...?不僅如此，YouTube 上的留言我也很少去翻看。只有在網站上架設了 Google Analytics 來檢視網站的訪問情況。</br>
 </br>


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

昨天看了我的 YouTube 頻道，發現我的訂閱者又增加了10位，現在有了30位訂閱者了。其中最近發佈的 8750 MTP 原型機跑主線核心和 Armbian 的影片留言還挺多的。不過大家似乎不知道高通所設計的原型機呢，明明影片標題就寫着「ported to Qualcomm SM8750 MTP」，留言還有人問這是什麼裝置，看來原型機還是不如市面上常見的零售機常見（一本正經的講廢話）。</br>


難怪我認識的一位高通原型機開發者在她自己的 Telegram 頻道中，會因某些使用者問道「Global or China」之類的話而生氣，之後講「If you don't know what it is, you don't need to know」這種話。雖然可以理解這種現象（原型機很難見到，也不能通過正常手段買到），但是還是好好笑呀! `xD`

