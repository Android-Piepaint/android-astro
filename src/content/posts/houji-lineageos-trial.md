---
title: Xiaomi 14 刷 Lineage OS + Root，改善 SM8650 發熱高耗電問題
published: 2026-06-26
description: 被小米放生了，就只好刷機了~
image: 'assets/houji-bg.png'
tags: [FOSS, Android, Flashing, ARM]
category: 'Android related'
draft: false
lang: 'zh_TW'
---

將 Xiaomi 14 (機型代號：Houji)改裝 Lineage OS 23.2，並取得 Root 權限，安裝三方調校器改善 SM8650 發熱問題。</br>
所有 SM8650 機型(包括 MTP，QRD 原型機)使用者均可參考。妳可以選擇維持 HyperOS 原廠韌體，並取得 Root 權限；或者改裝 Lineage OS 23.2，再取得 Root 權限。</br>

# 刷機理由

原本是家人一直在用的 Xiaomi 14 ，系統是 HyperOS 3.0. 覺得原廠韌體還可以再用一陣子，但是火龍8650 晶片發熱是在太嚴重了，燙手還吃掉續航力。</br>
雖說解鎖之後 Root 安裝模組就可以緩解，不過我習慣使用乾淨的 Android 系統和自由軟體，所以一次性做到底。</br>

Xiaomi 14 刷機的特色如下：

 - 繼續獲得 Android 系統和安全性更新，目前是 Android 16；
 - 刷機後仍可使用部分原廠功能，例如 Display P3, Ultra HDR；
 - 可降低熒幕解析度更省電；
 - DRM 等級是 L1,不會噴掉；
 - 解鎖後部分 App 過不了 Play Integrity

 想要進一步控制功耗，可以使用 Scene 4 和第三方模組改善。</br>
 至於系統介面變化，因爲很早就在用 Lineage OS，因此沒有什麼新變化。</br>

# 解開 Bootloader

Xiaomi 14 市面販售的型號有 23127PN0CC, 23127PN0CG 兩種。其中前者爲中國大陸版，後者爲全球版。目前兩者均[無法方便的解鎖](https://mlgmxyysd.github.io/android-bootloader-kernel-source/#%E5%B0%8F%E7%B1%B3-xiaomi)[^1]。 </br>

但是，HyperOS 3.1 的 GPU 驅動程式存在一個漏洞。使用者可藉助這個漏洞取得臨時 Root 權限，獲得 SElinux 寬容模式，之後就可以寫入 ABL 工程版韌體，將 bootloader 解鎖相關變數寫入 UEFI NVRAM 達到解鎖的目的。</br>

到[這裏](https://github.com/Linuxoid-cn/Mi8G3-Unlocker)下載一份 Xiaomi 14 的解鎖檔案合集，其中包括了 Xiaomi 14 的測試用韌體。</br>
之後電腦安裝 ADB 和 Fastboot 套件，主流的 Linux 發行版都有收。</br>
</br>
解開下載的檔案，找到 `exploit` 檔案，將執行漏洞用的程式藉助 `adb push` 傳到手機 `/data/tmp` 目錄下，執行 Payload 即可。如果執行不成功，就多嘗試幾次。直到 SELinux 爲 Permissive。之後鍵入 `su` 就可以獲得臨時 Root 權限了。具體的解鎖流程可以根據原專案中 Windows 指令稿的流程進行。需要注意的是刷完測試用韌體和解鎖用分割表後，可能會無法開機。需要重新刷一遍原廠韌體才可以開機，此時再通過 `fastboot oem device-info` 指令檢視，應該會看到 `Device unlocked: Yes` 裝置已經解鎖了。</br>

解鎖之後手機就會重開機，之後再通過 `adb reboot bootloader` 重新回到 Fastboot 模式。手機熒幕會展示橙色的 `FASTBOOT` 畫面，現在就可以開始刷機了。</br>

# 刷入 Lineage OS 

到[這裏](https://drive.google.com/file/d/1PEDM7Ojz1GMu8hopTJMMn6tx-bhcE4FS/view)下載 Xiaomi 14 的 Lineage OS ROM，之後[下載](https://github.com/ssut/payload-dumper-go) `payload-dumper` 用於解開 ROM 檔案，取出 `recovery.img` `init_boot.img` 二映像檔。</br>

先把手機開機到 Fastboot 模式，解開 ROM 壓縮檔。把 `payload-dumper` 程式丟到解壓縮之後的 ROM 資料夾，在資料夾所在的目錄開終端機，鍵入 `./payload-dumper-go ` 隨後丟入 ROM 的 `Payload.bin` 檔案，就可以解開 ROM 分割映像檔案了。之後鍵入 `fastboot flash recovery` 命令寫入 Lineage OS Recovery 映像。</br>

之後重開機到 Recovery，選擇 「Wipe data」，或者藉助 ADB 命令執行 `recovery --wipe-data` 命令來清除使用者資料。清除完成後使用「Apply update」 選單，使用 `adb sideload < ROM 壓縮檔目錄>` 開始刷機。如果想要使用 GAPPS，我推薦 [MindTheGapps](https://mindthegapps.com/)。 刷 GAPPS 之前需要再次清除使用者資料。刷機完成後使用 `adb reboot` 或點選「Reboot system now」 重開機。</br>

目前的 Lineage OS 沒有臉孔解鎖的功能，僅支援使用 PIN 和指紋辨識解鎖。</br>
</br>

<img src="/assets/lineage-home.png" width="50%">


# 安裝 Google 相機，改善錄影體驗

雖然我拒用任何專有軟體和間諜程式，但因此緣由導致手機用着反不如 Linux 手機，連最基本的需求都無法達成的話...倒不如暫時「妥協」，接受部分專有軟體的存在吧？雖然 Google 相機是專有軟體，但不可否認攝影效果確實不錯。</br>
想要使用 Google 相機，裝置上必須載有 Google 服務套件。當然我是一定不會使用 Google 的任何服務，所以我改用 MicroG 取代專有的 Google 服務套件。雖然不使用 MicroG 也可以，但是 Gcam 開啓之後會跑出煩人的訊息，警示妳這部裝置不支援 Google 服務。</br>

使用 DuckduckGo 檢索「Google Camera Hub」，選擇適合妳的相機應用程式下載。我使用的是由 [BigKaka 開發維護的 AGC Google 相機修改版](https://www.celsoazevedo.com/files/android/google-camera/dev-BigKaka/f/dl97/),安裝後授予除去位置資訊的所有權限即可。我個人測試認爲照片要比原廠相機拍攝要好一些(文章的圖片就是我用 Google 相機拍攝的)，因爲 Lineage OS 的 HDR 實作有問題，使用支援 HDR 的相簿檢視 HDR 圖片時會出現畫面亮度變暗的問題。</br>

<img src="/assets/houji-gcam.png">

<img src="/assets/houji-gcam2.png">


可供調節的選項非常多，當然，偷走妳隱私的可能性就更大了。</br>

<img src="/assets/houji-gcam-photo.jpg">



# 取得 Root 權限

手機上安裝 KernelSU，將解開的 `init_boot` 映像用 KernelSU 修補。KMI 選擇 `Android14-6.1`，之後刷入修補的 `init_boot` 映像開機，取得 Root 權限。</br>

# 解決 SM8650 發熱，改善續航

實在是想不到2026年還要通過修改系統 API 的方式來改善手機效能...上次我用這種做法還是在 Coolpad C106 改裝 Lineage OS 18.1 之後裝 Kernel Auditor 降低 SD652 核心時脈省電來着... SD652 雖然不如 SD615 那樣發熱又噴續航，但是也好不到哪裏去。沒辦法，誰讓 SM8650 體質有問題，雖然比 SD888 有改善，但是廠商調校又不好。我沒有能力改造手機散熱，就只好從軟體下手...看來鳳梨*的火熱還需要丟進冷藏庫才可以解決XD。</br>

> _*「鳳梨」是 SM8650 晶片 HLOS 代號「Pineapple」的翻譯。_

Uperf 是由 yc9559 開發的第三方 Android 系統調校器，能夠根據裝置的使用場景而設定參數控制裝置效能。但是原版本似乎已經停止開發，只好[改用 Fork 後的版本繼續使用](https://github.com/yinwanxi/Uperf-Game-Turbo)。不知道爲什麼，開發者非常喜歡在 Release 頁面放大量色圖...也好。刷機的時候尻一發，體驗不一樣的心情也不錯。</br>

::github{repo="yinwanxi/Uperf-Game-Turbo"}


之後通過 KernelSU 安裝模組，重開機，到 `/sdcard/Android/yc/` 目錄，修改 `cur_powermode.txt` 爲 `powersave` 省電模式，就可以改善發熱問題了。還可以配合 Scene App 爲每一個應用設定唯一的配置檔，在需要使用吃 CPU 的應用(例如相機，遊戲應用)才會提高CPU核心時脈，平時就限制核心最大時脈。</br>

或者改用 [AZenth](https://github.com/Liliya2727/AZenith) 調校，在應用中設定全域 CPU 最大時脈，降低 CPU 時脈，改善電池效能。

::github{repo="Liliya2727/AZenith"}


<img src="/assets/azenth-app.png" width="50%">

這樣一番修改下，熒幕亮着的續航時間能從6小時改善到10小時吧。
