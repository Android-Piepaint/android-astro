---
title: Bootloader 解鎖恥辱牆 -- 適合刷機的 Android 裝置，攜帶電話等，以及無法解鎖的裝置
published: 2026-07-25
description: 當解鎖 Bootloader 不再可能的時候，自由軟件、個人隱私與消費者權益就成爲了一句空話。
image: 'assets/mtp8750-front-view.jpg'
tags: [FOSS, Android, Thoughts, Misc]
category: 'FOSS & FOSS related'
draft: false
lang: 'zh_TW'
---
哪家的智慧手機值得買？除了考慮裝置處理器，快閃記憶體規格和記憶體大小以外，我還會關注另外一個「鮮有人知」的指標 —— 是否可以解鎖和受主線核心支援。</br>
如果手機可以解鎖刷機，甚至可以支援改裝 Linux 等自由軟體，支援自訂開機韌體，即使是貴得要命的 Nothing，Pixel，甚至 Qualcomm 等晶片廠自家的原型機我也會考慮。假如手機不支援解鎖，即使CP值再高的 Xiaomi，Samsung 我也不會買。</br>
</br>
至於 iPhone，Huawei 這種「監獄」裝置，我更不會購買。</br>

具體來講，「解鎖」是指裝置的 Bootloader 開機韌體允許使用者解鎖，且可以隨意載入任何相容該裝置的第三方作業系統(3rd party OS)，除非有漏洞可以繞開限制，不可以解鎖的裝置無法執行任何第三方作業系統和軟體。這種裝置也並不真正屬於妳。</br>

> I've been an user or been a developer,</br>
> I'm the person who just rent a brend new phone.</br>
> Adopted from _MTP Trouble -- A FOSS Parody of Trouble by Avicii_

我一般不會接受藉助漏洞方法或者 EDL 這種方式解鎖，除非真的有必要。AOSP 已經定義了非常標準的解鎖方法：**就是利用 `fastboot oem unlock` 或 `fastboot flashing unlock` 命令語來解鎖** ，沒有必要搞特規！！

裝置在解開 Bootloader 鎖之後，應該允許使用者改裝其他作業系統。</br>

# Bootloader 解鎖恥辱牆

哪些手機/裝置可以解鎖呢？ GitHub 上有一位同好整理了一份 [「Bootloader 解鎖恥辱牆」](https://github.com/zenfyrdev/bootloader-unlock-wall-of-shame/)，根據表中的「在乎使用者隱私」的廠家進行排除，再去挑裝置。</br>
專案的 README 有各種選擇/避開該廠家的理由。</br>
</br>

現在，就允許我結合個人使用經驗，用我的表格來解說：</br>


| 分類 | 代表含義                                                                                             | 品牌/裝置例子                                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A+   | 沒有 Bootloader 鎖或硬體安全啓動限制，使用者可以自訂裝置開機韌體，改裝 Linux 或者其他三方作業系統    | PINE64 PinePhone, Purism Librem 5, SHIFT SHIFT6mq, Qualcomm QRD/CRD/MTP/HDK 原型機, FuriLabs FLX1S 等                                                      |
| A    | 可支援解鎖，但有硬體安全啓動限制，使用者可以改裝 Linux 或其他作業系統                                | Nothing, Volla 等                                                                                                                                          |
| A-   | 同A，但是廠家不釋出核心原始碼，違反 GPL 協議                                                         | Cubot, Micromax, Teracube, Teclast 等                                                                                                                      |
| B    | 可支援解鎖，但需要申請，登入賬號，或依賴廠家網站/專有解鎖工具，其他同A                               | OnePlus, Google Nexus/Pixel, FairPhone 等                                                                                                                  |
| C    | 僅部分裝置支援解鎖，限制多，其解鎖政策反覆變動                                                       | Hisense/HMD, Nokia, Honor, HTC, LG, Motorola/Lenovo/NEC, OPPO/Realme, Oukitel, Xiaomi/Redmi/POCO, ZTE/nubia/Redmagic 等                                    |
| D    | 廠家不支援解鎖，使用者控制權幾乎沒有，只能藉助晶片/作業系統漏洞強制解開 Bootloader                   | Alcatel，Amazon，Asus，Cat，Coolpad，Doogee，Energizer，Huawei，Meizu，Panasonic，Samsung，Sharp，TCL/BlackBerry，Vivo/IQOO，Vsmart，各種 Windows Phone 等 |
| E    | 同D，解鎖後會有部分硬體/軟體功能不可使用，重新 lock 後也無法恢復，部分廠家的裝置解鎖後甚至會直接黑磚 | ZTE/Nubia, OnePlus, Google Nexus/Pixel, Samsung, Sony 等                                                                                                   |
| F    | 封閉的「圍牆花園」，完全無法客製化裝置                                                               | UniSoc, ASR Micro Electronics，各種廠家自訂嵌入式 Linux 裝置等                                                                                             |

看完 GitHub 上專案的紹介和我自己整理的表格之後，起碼妳現在知道半數以上的 Android 手機廠家的裝置都不值得買了。</br>

就務實考量來看，目前臺灣可以買到的主流手機廠牌，又可以解鎖 Bootloader 的，應該是 Nothing Phone，Google Pixel。當然追求 Linux 攜帶電話的使用者，可以考慮買 PinePhone 或者 FuriLabs 的 FLX1S 了。

# 即使解開 Bootloader 也不夠，「黃金籠」仍然是封閉使用者自由和隱私的籠子

> Long since, I’ve been used to, the golden cage,</br>
> Not even grasping, what “freedom” really means.</br>


即使可以解開 Bootloader，可以取得 Root 權限，仍然是不夠的。妳的裝置仍然被廠家控制着，原廠的系統軟體依然潛藏着不計其數的專有軟體，收集者妳的一切。</br>

原廠家必須按照 GPL v2 協定把裝置的 Linux 核心原始碼公開，提供完整的 source tree 和 Firmware blobs。確保使用者可以自行編譯出可用的作業系統，很多廠商至今仍只公開「部分」原始碼，或公開後卻故意缺漏關鍵 patch，導致社群無法建置可開機的核心。其他三方 ROM 開發，例如 Lineage OS，crDroid 之類，就是要利用原廠的核心和韌體檔案，才可以製作出來一般使用者可以日常使用的 ROM。 </br>
雖然會受到晶片廠家的 BSP 限制，但是一般廠家能提供5年以上系統和安全性修補程式更新是最好。還有優秀的加密措施，例如 Snapdragon 筆電上的 TPM，可以被利用產生隨機金鑰，配合 LUKS 加密硬碟防止資料被竊取。或是利用 EL2 來跑虛擬機，做到安全隔離也不錯。</br>
</br>
Locked Bootloader 並非是不好的，但是金鑰不能只給廠商握著。爲了解決 TEE 簽章在解開 Bootloader 後手機不可信的問題，裝置應該要能使用自訂 AVB 金鑰，使用自簽的金鑰啓動 Locked Bootloader 的手機。也就是說，手機允許在刷機之後回鎖 Bootloader 仍能開機。這樣的裝置只有 Google Pixel 和少數以「可修復、可自由」為賣點的品牌(Fairphone，Shift等)，Qualcomm MTP/QRD 原型機才可以支援這麼做。其餘大多數旗艦，無論跑多漂亮的 HyperOS, ColorOS, One UI，本質上仍是「可租用的黃金籠」。</br>
</br>
至於把手機改裝成 Linux 手機，解鎖 Bootloader 和廠家開放原始碼更是必須。解鎖 Bootloader 是打開籠子的第一道門。真正的自由，是能把裝置變成完全屬於自己的運算平台——無論是跑 Android 衍生 ROM、還是徹底換成 mainline Linux（postmarketOS, Mobian 等）。</br>
</br>

> We run together now, toward to the freedom where we seek,</br>
> Proprietary software that we waved final “Goodbye” and we will never meet.</br>


解鎖 Bootloader 從來不是終點。它只是證明：這台裝置還有機會屬於妳，而不是永遠屬於廠商。</br>
