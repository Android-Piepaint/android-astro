---
title: 不要讓軟體安裝「污名化」—— 反對 Google 強制驗証開發者身份，禁止 Android 自由安裝第三方軟體
published: 2026-06-03
updated: 2026-06-03
description: 我的手機，我說了算。這本該是理所當然的事，不應該成為一種奢求。
image: 'assets/your-phones-nolonger-belongs-to-you.png'
tags: [FOSS, Android, Thoughts, Misc]
category: 'FOSS & FOSS related'
draft: false
lang: 'zh_TW'
---

(寫於 2026年5月3日)</br>

> _Android 一直就是戴着「開放」的僞裝，實際是充滿專有軟體的「間諜程式」。如今的 Android 終於撕開了它「開放」的僞裝，露出了「間諜軟體」的真面目。_ </br>
>   —— EDKPiepaint，寫於2019年3月3日

未來，所有 Android 手機將無法自由地安裝軟體！</br>
從2026年9月開始，Google 將實施「[Android Developer Verification](https://developer.android.com/developer-verification?hl=zh-tw)」政策，強制驗証開發者資證，這會影響到使用者安裝 APK 的權利。</br>
請支援這一維護消費者合法權益的自由軟體運動！[保持 Android 開放](https://keepandroidopen.org/zh-TW/)

# 作爲一般使用者：安裝軟體的權利將會受到嚴格限制，妳的財產，卻由不得妳

Android 作爲目前行動裝置上最受歡迎的基於 Linux 的作業系統，同時也是嵌入式作業系統，被廣泛應用在智慧型手機、手錶以及工業裝置。可以說，有熒幕的地方，就一定會有 Android 的存在。</br>
而 Android 不同於 iOS 的地方，莫過於可以自由的安裝應用程式。雖然 Google Play 商店（Android Market）從 Android 2.2 就被加入成爲 Google 官方下發應用程式的方法，但是並沒有任何規定要求使用者必須從應用程式商店
安裝應用，下載應用。開發者也可以從個人的網站或者 GitHub 等分發自己的 APK 檔案，讓使用者下載和安裝。</br>
但是，Google 爲了所謂的「安全性」考量，正在逐步限制並破壞 Android 「開放」的一面。從9月之後，以後開發者分發 APK，都必須要向 Google 提交包含個人敏感身份的資料，並對 APK 進行數位簽名後才可以安裝。若 APK 沒有數位簽章，
就會被禁止安裝，恐怕也不會像中國廠商那樣，連「我已知曉風險，繼續安裝」的選擇都不會給予！</br>
不過，需要指出的一點是：**Google 目前沒有限制使用者安裝應用的權力**，只是給安裝流程多上了一把鎖，確認 APK 是安全的，並且有人爲此承擔可能帶來的後果。雖然身份驗證很簡單，但不是所有人都想被 Google 控制，所謂的「身份驗證」本就是侵犯個人隱私權的行爲。
應用上架 Play store 需要驗証就算了，爲什麼連個人安裝 APK 檔案也要管呢？</br>
不要認爲只有新手機會受到影響，這個政策應該會通過GMS進行遠端下發。因爲所有手機都會有GMS內建，所以只要 Google 更新文件，就可以強制阻擋安裝 APK 檔案（個人猜測，目前沒有資料可以佐証）。即使妳買了沒有GMS的中國大陸手機，搞不好也可能被國家反詐中心禁止安裝第三方應用。</br>
這個政策施行下去，到時候，只有degoogle無GMS的Android系統才能自由安裝APK了，例如LineageOS和GrapheneOS，這類手機品牌市佔率不高。況且對自由世界的Android用戶來說，很多APP都依賴GMS才能運作，脫離GMS服務是很不切實際的選擇。</br>
因此世界各地，許多開發者和使用者們擔憂 Google 破壞 Android 「開放」的一面，發起了「[保持 Android 開放](https://keepandroidopen.org/zh-TW/)」的自由軟體運動。上述網頁裡面有反對Google驗證開發者身份請願書(change.org)可以簽名。並羅列了各國的發聲管道（包含中國以及中國大陸），可以與立法機關聯絡，呼籲他們關注此事。</br>

> 只有使用者與開發者默許，他們的邪惡計劃才會得逞。

鑑於部分使用者可能無法理解，我用幾個例子來簡單的描述這一政策實行之後的影響：

 - 過去，如果妳在網路上看到一個獨立開發者寫的實用小工具（例如：去廣告插件、長輩用的簡易啟動器、或是校園社團自製的選課 App），妳只需要下載 APK 就能使用。</br>

    未來的限制： 這些「非職業」開發者可能因為不想向 Google 提交個人身分證件、家庭住址或電話，而被迫停止分發軟體。</br>

    妳的處境： 妳將無法再使用那些極具創意、但開發者不想「實名制」的軟體。Android 將變成一個只有「大公司」才能分發軟體的平臺，那些充滿生命力的民間小工具將會慢慢絕跡。</br>

 - 很多人手中都有一些已經停止更新，但在新機上依然能跑的老 App，或者是從舊手機備份出來的 APK 檔。它們或許承載着妳的美好回憶，或許記錄了妳與家人的點點滴滴，亦或許是妳最喜歡的遊戲...... </br>

    未來的限制： 這些老舊的 APK 檔案並沒有經過符合 2026 年新標準的「數位簽章」。一旦系統強制要求驗證，這些承載回憶或特定功能的軟體將會被系統直接攔截。</br>

    妳的處境： 即使妳擁有軟體檔案，妳的手機也會告訴妳「來源無法驗證，禁止安裝」。妳對自己購買的硬體失去了控制權，無法決定要跑什麼軟體，這就像買了車卻被原廠鎖死只能開在某些路段一樣。</br>

 - 目前我們安裝第三方 APK 時，系統會跳出「不安全」的警告，但通常會有一個「仍要安裝」的選項。</br>

    未來的限制： 隨著驗證政策收緊，Google 可能會取消這個「逃生門」。系統將不再信任未簽名的 APK，甚至連點擊安裝的機會都不給妳。</br>

    妳的處境： 妳與手機之間的關係從「主僕」變成了「監護人與被監護者」。Google 成了那位過度保護的家長，它幫妳決定了什麼是危險的，甚至剝奪了妳「承擔風險」的自由。</br>

 - Android 曾經最自豪的功能就是「安裝應用程式」，即不需要透過官方商店，就能直接安裝 APK。</br>

    未來的限制： Google 正在透過技術手段，讓安裝變得極度困難。這不僅僅是彈出一個警告窗口，而是從系統底層拒絕執行「未經過中心化驗證」的代碼。</br>

    妳的處境： 表面上「安裝第三方應用」的開關還在，但實際上，妳下載回來的 APK 如果沒有經過 Google 認可的數位簽章，那個開關就是個擺設。這標誌著 Android 從一個 **「通用運算裝置」轉型為一個「受控的數位終端」**。妳不再是手機的主人，妳只是租用這台機器使用權的租客。</br>

# 不容樂觀的現況：Google 依舊「初心不改」，堅決實行驗証開發者資證的政策

到目前爲止，Google 依舊沒有放棄這一政策。</br>
根據 Google 在 [Android Developers Blog](https://android-developers.googleblog.com/2026/03/android-developer-verification.html) 的解釋，Android 17之後，安裝APK要在開發人員選項開啟，看完一系列警告確認你不是被詐騙，等待24小時後重開機，通過生物驗證（指紋或掃臉），才能安裝APK。並且會有選項讓你要開放7天或者永久開放。這個過程只要做一次就可以了。</br>

<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhspfxHEJXusQIuuaK5xbfTJHHpsHcXglbGs1kIK-R288TG9Y8zlTujkQ2JfSAjwxhPbyWqZlZSdCo6twkcD1oj7n30Adce7FG0-0LmF-tVMvkEJd_5CQ3TfRVhTM4A0pUfpTw-7AJxj0TYyAqm2IeHqSmKv5PuCWw5yrhBSzxsjec3Hszrog0wMrJUhVQ/s1920/260318_ADV%20flow%20chart_v5.png">

另外，針對不想交出自己資料的開發者或是「業餘開發者」，Google 推出了受限開發者帳號(limited distribution account)，不用繳交身份證件就能註冊。透過這種方式簽署的APK可以通過 Android 的新驗證機制。但是最多只能安裝在20台裝置上。如果妳不想做這些流程，妳就只能藉助 ADB 安裝 APK 了。</br>
</br>

第三方 ROM 會不會受到 Google 政策的影響呢？</br>

Graphene OS 開發者在 [Twitter 明確表示他們不會加入這一功能](https://x.com/GrapheneOS/status/2034957604682621229)：</br>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">GrapheneOS will remain usable by anyone around the world without requiring personal information, identification or an account. GrapheneOS and our services will remain available internationally. If GrapheneOS devices can&#39;t be sold in a region due to their regulations, so be it.</p>&mdash; GrapheneOS (@GrapheneOS) <a href="https://x.com/GrapheneOS/status/2034957604682621229?ref_src=twsrc%5Etfw">March 20, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script> 

根據這篇Reddit討論：[Will LineageOS be affected by the Android lockdown in September?](https://www.reddit.com/r/LineageOS/comments/1tu0qlx/will_lineageos_be_affected_by_the_android/) LineageOS 維護者表示他們打包的 GAPPS 套件 MindTheGapps 將不會加入驗證APK開發者的功能。</br>

另外，使用者也可以通過 `anyapk` 這一 [GitHub 專案](https://github.com/sam1am/anyapk)來安裝 Apk，方法是通過 Shizuku 中介，藉助 `ADB install` 方法來安裝未經簽章驗證的應用。不過 Google 很可能在未來的 Android 版本修復 Shizuku 自己給自己 ADB 的 loophole，之後 ADB 都需要只能通過電腦執行。

::github{repo="sam1am/anyapk"}

# 安裝應用是消費者的合法權利，一步也不能退讓

> 那些放棄重要自由以換取一點點暫時安全的人，既不配享受安全，也不配擁有自由。</br>
> --- [Ivon](https://ivonblog.com/posts/keep-android-open/#3-%e5%81%b4%e8%bc%89apk%e6%98%af%e5%90%88%e6%b3%95%e6%ac%8a%e5%88%a9%e4%b8%80%e6%ad%a5%e9%83%bd%e4%b8%8d%e6%87%89%e8%a9%b2%e9%80%80%e8%ae%93) 

</br>

> **프라이버시(privacy)의 夢, 人權이 保障된 곳.**</br>
> _滿懷(守護)隱私的希望，數位人權得到保障_</br>
> --- [준비, 시작, 플래싱! -- ‘Blue Archive’ 중국(中國) 서버 대운동회(大運動會) 주제곡 ‘출발 준비(出發 準備)!’를 FOSS가 패러디한 버전 (한국어 버전)]((https://blog.cloudflare88.eu.org/posts/ready-set-flash-korean/)) ，EDK Piepaint 씀

Google把安裝APK的按鈕，跟OEM解鎖放在一起，把它當作刷機一樣洪水猛獸的存在。總之就是加上諸多限制，警告使用者。</br>
Google 未來將強制驗証開發者資證，連手動安裝應用也要管，否則不許安裝。但是，安裝應用是妳本來就該有的權利。到目前爲止，我沒有檢索到哪個人因爲在自己的 Android 手機上安裝了應用而被送進監獄的消息。妳的手機，妳說了算。不要覺得這個想法非常幼稚，因爲事情本就如此！妳的手機本就是妳說了算，這是完全合法的行爲，而不應該成爲某個公司或者別人施捨與妳的「恩賜」。除了妳自己，沒有人能夠規定妳應該對妳的手機做什麼。</br>
不可否認，Google 或是任何科技巨頭在推動這些政策時，總是披著「保護用戶安全」的華麗外衣。他們會告訴妳：手動安裝（Sideloading）是惡意軟體的溫床，是詐騙的源頭。</br>
但我們必須看清這背後的邏輯謬誤：安全與自由並非零和遊戲。 提供安全預警、掃描已知威脅是企業的服務義務，但將「預警」升級為「禁令」，則是對用戶智商的冒犯。如果我們因為擔心交通事故而交出駕駛權，將方向盤鎖死在只能開往「官方指定目的地」的軌道上，那這部車還屬於妳嗎？</br>

當妳付了幾萬塊台幣買下一支手機時，這份買賣契約應當包含對該硬體的所有處置權。然而，現在的科技廠商正試圖透過軟體更新，將用戶從「擁有者」降級為「租借者」。

- 誰才是主人？ 如果一個裝置不能執行主人命令它執行的程式碼，那麼這個裝置本質上就不受主人控制。

> _在我的記憶中，這一成不變的世界_</br>
> _是由專有軟體組成的「圍牆花園」_</br>
> </br>
> </br>
> _我們一起奔向那自由的彼方_</br>
> _和專有軟體道過「來日見」後永不再見面_</br>
> —— [刷機進行式 (Feat. Pakala Oryon) —— 根據 May'n 的 《人生進行形》的 FOSS 改編](https://blog.cloudflare88.eu.org/posts/flash-continous-tense/)

- 牆內的花園： 他們試圖建立一個「圍牆花園」，只有經過他們審核、抽成、認可的內容才能進入。這不只是為了安全，更是為了壟斷分發管道與數據。</br>

我們承認，手動安裝應用確實存在風險。但作為一個成年人，我們有權利選擇承擔風險，並從中學習如何保護自己。</br>
自由從來不是免費的，它的代價是個人的警覺與責任，而不是轉身投向一個「數位家長」的懷抱尋求庇護。一旦我們退讓了這一步，默許了廠商可以隨意切斷我們安裝軟體的路徑，那麼未來他們就能以同樣的理由，決定我們能看什麼新聞、用什麼通訊軟體、甚至限制我們對裝置的維修權利。就像極權國家控制他們的人民一樣。</br>

# 污名化使用者：把「合法安裝」應用稱爲「側載」

把 Android 合法安裝應用的做法稱之爲「側載（Sideloading）」，本身就是一種蔑稱。這種把使用者的完全正確且合法的行爲「污名化」，是典型的「話語權操弄」和「數位心理暗示」做法。這種行爲，在「文化大革命」和「八九民運」期間早就屢見不鮮。這隱含了妳們這樣做，是在幹壞事，用不正當手段安裝軟體的意含。Apple 對開放側載的態度也是如此，認為開放使用者自由安裝APP太危險了。這種行為，實則是作為自由之敵。似乎總有人認為，透過官方以外管道的安裝軟體，就是要破解軟體，安裝盜版，或是使用違法APP，而且隨著高風險。刻意營造出一種「不走正門、翻牆而入」的偷偷摸摸感。它暗示了 Google Play 商店才是唯一的「正門」，而使用者直接運行自己下載的安裝檔案，則變成了某種帶有風險、非正規、甚至帶有「叛逆」色彩的旁門左道。
但是，事實真的如此嗎？

 - 安裝就是安裝，沒有正偏之分： 在個人電腦（PC）上，我們下載 `.exe` 或 `.dmg` 檔案並安裝，這叫「安裝軟體」；在 Linux 上我們編譯原始碼，這叫「部署」。為什麼到了手機上，同樣的動作就變成了貶義的「側載」？

 - 預設「惡意」的假定： 當廠商使用「側載」這個詞時，他們在潛意識裡已經將使用者標籤化為「不懂保護自己的弱者」或是「潛在的破壞者」。他們試圖讓妳相信，如果妳不透過他們的審核機制，妳就是在冒險，妳就是行為不檢。

 - 消解所有權的本質： 這種語言羞辱的最終目的，是為了讓使用者忘記一個基本事實——**作業系統是為使用者服務的工具，而不是廠商圈養用戶的圍欄**。 他們試圖透過改變稱呼，讓原本理所當然的「權利」，在公眾認知中退化成一種需要被嚴格管控的「例外」。</br>

 我們必須拒絕使用「側載」這個帶有偏見的詞彙。這不是側載，這是 **「自主安裝」**，是任何一個嵌入式系統或者通用計算裝置（General-purpose computer）最基本、最核心的功能。

如果我們接受了他們的語言邏輯，我們就已經在心理上交出了手機的主控權。我們必須大聲地告訴這些科技巨頭：我安裝我自己擁有的軟體，這叫行使權利，不叫「側載」。

