---
title: 一切奇蹟的始發點 —— 文書一篇，單板機的全部盡覽無遺
published: 2026-11-19
description: 妳有沒有試過用一台小小的板子，跑 Linux 或 BSD，還能同時經營自己的部落格、做 AI 推論，甚至玩 Minecraft？
image: 'assets/mtp8750.jpg'
tags: [SBC, ARM, FOSS, Review]
category: 'Single-board Computer releated'
draft: false
lang: 'zh_TW'
---
妳有沒有想過，一個和信用卡大小相當的裝置，卻可以在上面跑 Linux 或 BSD，還可以經營自己的部落格，架設各種服務和容器，甚至在折騰一番後，還能透過 PCIe 通道外接獨立顯示卡來跑圖形運算或遊戲？這種「裝置」就是我們今天要介紹的硬體，也是最知名的嵌入式裝置：單板機。</br>

# 單板機紹介

單板電腦(Single-Board Computer，SBC)是一種將完整電腦系統所需的主要硬體元件整合在同一塊印刷電路板(PCB)上的計算設備。它通常包含處理器、記憶體、儲存介面、電源管理及各種 I/O 介面，能夠獨立運行完整的通用作業系統。與被用來執行單一程式或 RTOS 的裝置不同，後者被稱爲「單晶片*(Microcontroller, MCU)」內含中央處理器(CPU)，記憶體，時脈產生器與輸入輸出外設(GPIO，UART，ADC 等)全部嵌入一體。就像一顆「微型電腦晶片」，專為低功耗，低時延，即時任務而生。MCU 就像一顆專為低功耗，低延遲與即時任務而生的微型控制晶片，是精準控制硬體動作的「號誌機」。</br>

> _*:請不要把「單晶片(現在通常翻譯爲「微控制器」)」和「單晶片系統(SoC)」二者混爲一談。單晶片系統是一顆晶片整合處理器、GPU、NPU、記憶體控制器、無線電、DSP、電源管理與安全子系統等複雜功能，組成一個完整的小型電腦系統。體積雖小，功能卻接近「小型主機」，可跑完整作業系統(如 Linux、Android)，適合多工與網路任務。_

## 適宜人群

如果妳因爲近年來發現的 x86 平臺處理器的安全漏洞而產生個資隱憂，準備考慮換掉身邊的舊硬體。這些基於 Arm，RISC-V 的硬體可能就是妳的「下一個家」。單板電腦以其體積小巧，價格親民，硬體接口豐富等特點，常常受到嵌入式裝置初學者，自由軟體愛好者等一衆程式開發者的喜愛：</br>

- 嵌入式相關課程初學者：想學習 Arm 架構，Linux kernel，嵌入式軟體/硬體開發等。</br>
- 自由軟體愛好者/駭客：追求完整的軟硬體主導權和個資安全，架設各種服務(SearXNG 搜尋引擎，家庭媒體中心，NAS，NextCloud 雲端硬碟/辦公套件，Immich 相簿)，運營網站(低功耗伺服器，個人部落格)等。</br>
- AI 與虛擬化愛好者： 嘗試執行量化 LLM、容器、虛擬機和其他邊緣運算應用，但實際能力仍取決於記憶體容量、運算加速器及軟體支援。</br>
- 開發者：upstream Linux 移植，程式開發，Arm64 Build CI/CD，自動化測試用 runner 等。</br>
- 以及希望嘗試 Arm 架構和相關軟體生態環境的一般使用者。</br>

# 單板機的長短點

## 長點

<img src="/assets/houji-gcam-photo.jpg">

- 體積小，因爲單板機採用針對行動或嵌入式場景設計的低功耗 ARM / RISC-V SoC，待機與日常負載功耗極低。可以降低電費開支，亦可維持必須的效能。例如 Radxa Dragon Q6A 使用 12V USB-C PD 供電。[^1]遠低於一般桌機數百瓦的所需供電，x86 超級筆電的60~80W。</br>
- 單板機的購入成本通常低於自行組裝完整 PC，但仍須考慮電源供應器，儲存裝置，散熱器，機殼和其他周邊的額外費用。入門型 SBC 通常只需要數千元新臺幣即可入手，已經可以跑完整 Linux + Docker + NextCloud。</br>
- 開源程度高，部分 SBC 廠商會釋出 Linux Kernel，Bootloader 和 BSP 原始碼，讓使用者自行編譯與修改系統。但 SoC 的完整 Datasheet，硬體設計文件，以及 GPU，DSP，Modem 等部分韌體仍可能受到廠商授權或保密協議限制。</br>
- 生態豐富，一些知名的單板機廠家都會有數量龐大的社群。例如 Raspberry Pi, PINE64, Radxa 等有不少網路討論區。</br>
- 參考價值高，一些有名的開發套件(Development kits)，或者所搭載晶片的市佔率高，在軟體開發或者實驗方面就會有較高的參考價值。一些大學嵌入式課程，Arm64 Buildbot，CI/CD runner，LLM 伺服器(Llama.cpp + Ollama)的架設教學都以這些開發板為首選。</br>
- 學習價值高，可以直接接觸硬體底層相關的內容(bootloader，UART 序列埠，Device tree)，單板機硬體一般不設安全限制，可以使用自訂韌體與軟體，方便開發與除錯。相較於一般 PC，部分開發板也提供更容易使用的硬體除錯介面。</br>

## 短點

- 學習門檻高：ARM SBC 的硬體設計和啟動流程往往因 SoC 及廠商而異。使用者可能需要針對特定開發板調整 Device Tree，甚至自行編寫驅動程式。即使兩塊開發板採用相同 SoC，也不代表它們的 DTB 可以直接互換。</br>
- 在相同預算下，部分 SBC 的 CPU，GPU 和儲存效能可能不及二手 x86 Mini PC，而且擴充能力通常也比較有限[^2]。(大多開發板僅可使用 SD 卡或 eMMC 開機，部分高階開發板才配有 PCIe 連接埠，以供使用者安裝 PC 上的 M.2 固態碟)</br>
- 外設相容性不一定理想：部分 PC 常見的擴展卡，PCIe 顯示卡和 TPM 2.0 模組，可能因為缺少韌體支援，硬體介面或作業系統驅動程式而無法正常使用。例如，我曾經在 Radxa Dragon Q6A 上測試 PCIe 轉 SATA 擴展卡，雖然可以在 UEFI 韌體和作業系統中偵測到 PCIe 裝置，但仍無法透過該擴展卡連接的 SATA 硬碟正常開機。</br>
- 一些硬體缺乏社群支援：某些採用 Qualcomm，MediaTek 等行動 SoC 的工程平台，可能缺少完整公開文件和上游驅動程式。使用者往往需要自行研究廠商 BSP，甚至進行大量驅動與韌體移植工作。</br>
- OS 支援不一：有些開發板 Linux 支援極好(Raspberry Pi 4/5)，但有些 OS(如 Alpine Linux, Arch Linux Arm, BSD 等)或 upstream kernel 可能完全跑不通。</br>

### 為什麼我們依然選擇單板機？

並不是所有的單板機都可以完美的適用於日常事務，部分單板機可以透過 PREEMPT_RT 等核心配置改善 Linux 的即時性，適合部分需要較低排程延遲的工業控制和嵌入式應用。在實際活用中，也會發現，不同作業系統對單一單板機硬體的支援程度也有不同。使用者可以自行改善作業系統在單板機上的體驗，但同時要求使用者具有一些作業系統和嵌入式系統的基本知識。如果妳真的想體驗真正的「硬體開發」與「自由軟體」，單板機絕對是目前最有趣、也最有學習價值的選擇之一。</br>

學習單板機上的 Linux 移植，也能為日後研究 ARM 筆電及行動裝置的 Linux Porting 打下基礎。現今市面上的 ARM 筆電，例如 Apple Silicon MacBook, 搭載 Snapdragon 處理器的筆電，以及各種 Chromebook，乃至手機上的 mainline Linux 移植，都會涉及 Kernel Configuration，Device Tree，Hardware bring-up 等相似的開發流程，許多底層開發知識和工具也是共通的。</br>

例如下面的熒幕擷取畫面就是我自己給 Lenovo Yoga Slim 7x 筆電移植的 Arch Linux ARM，使用自己建置的 upstream kernel 開機:</br>

<img src="/assets/arch-linux-arm-hamoa.png">

# 選擇適合自己的單板機

Piepaint 用自己目前使用的 Radxa Dragon Q6A 開發板和正在移植 mainline Linux kernel 的 Qualcomm SM8750 MTP 原型機的硬體規格來舉例，爲大家詳細的解釋每一個參數的含義。</br>

## 開發板一番賞：Radxa Dragon Q6A 單板電腦

> 也可以參考：[Radxa Dragon Q6A 單板機評測](https://blog.cloudflare88.eu.org/posts/q6a-review/)

<img src="https://docs.radxa.com/en/img/dragon/q6a/dragon-q6a-view.webp">

- 系統晶片：Qualcomm Dragonwing QCS6490，這是 Qualcomm 爲 IoT 平臺設計的基於 Arm V8.2 指令集的64位元8核心 Arm 處理器，最大核心時脈 2.7GHz。採用 1+3+4 的三叢集架構。UnixBench 跑分試驗爲總 4327點[^3]，優於 [Raspberry Pi 5(總 3594點)](https://www.aqua-informatics.jp/?p=1056)。該晶片應該是基於行動裝置的 Snapdragon 778G+ 修改而來。已經有非常不錯的主線 Linux 核心支援，亦可以通過一些手段跑上 Windows 11 IoT。高通也釋出了 QCS6490 晶片相關的技術文檔，社群亦有許多不錯的專案供參考。</br>
  實際使用中，QCS6490 可以勝任大部分的開發和編譯工作。</br>
- 記憶體：12GB LPDDR5，12GB LPDDR5 記憶體對於 Linux Kernel 和 Buildroot 等大型專案的編譯相當有幫助。較大的記憶體容量允許系統同時執行更多 Compiler Jobs，減少因記憶體不足而使用 Swap 的情況。對於經常需要同時編譯多個 Kernel、建立交叉編譯工具鏈或執行容器的開發者而言，12GB 已經是一個相當實用的容量。</br>
- 可更換的 EMMC/UFS 模組，改用 UFS 這類使用 SCSI 命令集進行儲存裝置通訊的快閃記憶體能夠顯著改善單板機的 I/O 效能，但一般情況下，使用 eMMC 足以滿足對於硬碟要求不高的場景(例如日常使用)。高階使用者也可以設置 PXE 網路開機。</br>
- M.2 PCIe：板載 M.2 M-Key 2230 插槽，可用於安裝 NVMe SSD，提供比 UFS 更快的儲存效能。亦可安裝其它外部設備。可以根據使用需要添置擴展卡，以擴充單板機硬體機能。</br>
- UEFI 韌體：高通晶片(MSM8998之後)均採用 EDK II 的 UEFI 韌體，包含常見的 Boot Services，Runtime Services，Variable Services 等標準化服務，以及 ACPI tables / Device tree 等啓動作業系統必須的組件**。UEFI 韌體儲存在 32MB 的 SPI NOR Flash 中。</br>
- USB 3.0 & USB 2：高速的 USB 3.0 接口可以用於連接高速外部硬體，亦可以用於更新開發板自己的 UEFI 韌體。此外也可以改善爲行動裝置移植 Linux 的體驗。</br>
- GPIO:開發板提供 40-pin GPIO Header，支援 UART/SPI/I²C/I³C 等硬體通訊介面，可用於連接感測器，顯示器及各種外部控制設備。例如 POS 機的七段顯示器、電子模組和其他 IoT 周邊。搭配適當的驅動程式與外接電路，也可以使用 SPI 介面與外部 Flash 裝置通訊，甚至進行部分韌體燒錄工作。</br>

QCS6490 已經具有相當不錯的 Upstream Linux Kernel 支援，[Radxa Dragon Q6A 的專用 Device Tree](https://github.com/torvalds/linux/blob/master/arch/arm64/boot/dts/qcom/qcs6490-radxa-dragon-q6a.dts) 也已進入 Linux 主線。這讓開發者有機會直接使用 Mainline Kernel 進行系統移植，而不必完全依賴廠商提供的 downstream kernel。不過，部分專用硬體及協處理器仍可能需要額外的 Firmware 或廠商驅動程式。</br>

> _\*\*: 需要注意的是，UEFI 並不一定使用 ACPI 描述硬體。在 ARM64 嵌入式平臺上，也經常使用 Device Tree（DTB）向 Linux Kernel 傳遞硬體資訊。不同 UEFI 平臺的實作方式也可能有所不同，包含的組件也可能各異。例如 LA 平臺的 UEFI 沒有 ACPI tables 和 SMBIOS，亦不支援修改開機引導順序。更沒有提供一般 PC UEFI Setup 中常見的開機順序修改介面。_

## 行動裝置開發的「源泉」：SM8750 MTP 原型機

<img src="/assets/mtp8750-front-view-2.png">

雖然主線 Linux bring-up 的開發流程和底層知識是可以共通的，但是開發板和一般的行動裝置平臺依然有明顯的差異。</br>

:::note
SM8750 MTP 是 Qualcomm 行動 SoC 的工程驗證平台，主要面向 OEM，ODM，晶片合作夥伴及相關開發人員提供，並非一般零售市場的消費型 SBC。我所取得的樣機，其採購流程涉及 NDA 保密協議。一般使用者無法輕易獲得，部分裝置僅在少數愛好者之間流傳。因此這裡的「硬體規格」是根據[我的 Arch Linux Arm 移植專案](https://codeberg.org/EDKPiepaint/sm8750-mtp_alarm)中自己逆向研究的結果得知，且不同 MTP 裝置之間硬體有微小差別，因此僅供參考。
:::

- 系統晶片：Qualcomm Snapdragon SM8750，即 Snapdragon 8 Elite，於 2024 年推出的旗艦行動 SoC。採用第二代 Qualcomm Oryon 自研 CPU，基於 Arm 64-bit 指令集架構，使用 2+6 的雙叢集配置：2 個 Prime 核心最高 4.32 GHz，另外 6 個 Performance 核心最高 3.53 GHz。與前面介紹的 QCS6490 不同，SM8750 不再採用傳統的 Kryo CPU 命名架構，而是使用 Qualcomm 自行設計的 Oryon 微架構。這款 SoC 已有相當不錯的 Upstream Linux Kernel 基礎支援，尤其是 Qualcomm 在 Linux Kernel 中加入的 SM8750 SoC Device Tree，以及 MTP 和 QRD 的板級 Device Tree，對其他同平台手機的 Mainline Linux 移植具有很高的參考價值。
- 記憶體：16GB LPDDR5X，對於 Linux Kernel 和 Buildroot 等大型專案的編譯相當有幫助。較大的記憶體容量允許系統同時執行更多 Compiler Jobs，減少因記憶體不足而使用 Swap 的情況。在效能要求較低的日常使用中，則可以同時使用更多程式，降低因記憶體不足而觸發 OOM Killer 的機率。
- 512GB UFS 4.0：UFS 這類使用 SCSI 命令集進行儲存裝置通訊的快閃記憶體能夠顯著改善原型機的 I/O 效能，提升開機速度。其存取速度已經可以同 SATA3.0 或者 NVMe SSD 相比擬。實際使用時，較快的儲存裝置可以改善系統開機，應用程式載入，大型檔案讀寫，以及 IDE 等開發工具的啟動體驗。
- 多機能 Type-C USB 3.0：高速 USB Type-C 介面可用於連接各種外部設備，例如 USB Hub，外接儲存裝置，鍵盤和滑鼠。同時支援 DisplayPort Alt Mode，還可以搭配支援影像輸出的 USB-C Dock 或轉接器，將 MTP 連接到外接顯示器。
- LA 平臺^ UEFI韌體：採用 EDK II 的 UEFI 實作，包含常見的 Boot Services，Runtime Services，Variable Services 等標準化服務，但是沒有 ACPI 支援，也沒有 SMBIOS。亦無法調整開機次序。僅提供純文字介面的 BDS Menu 供使用者設定 UEFI 韌體。
- 1440 × 3120 解析度，最高 120Hz 更新率的 OLED 顯示面板：OLED 採用像素自發光技術，具有高對比度，純黑顯示及較好的色彩表現。由於每個像素可以獨立控制發光，顯示大量黑色內容時可能比傳統 LCD 更省電，但實際功耗仍取決於亮度、畫面內容及更新率。
- Dual SIM support, 5G 數據機：整合 Snapdragon X80 5G Modem-RF，支援 5G NR 等行動網路技術。相較於一般 SBC，行動 SoC 工程平台最大的特色之一，就是可以直接研究 Modem，RF，SIM 和行動網路相關子系統。實際可用的頻段和雙 SIM 功能仍取決於 MTP 的 RF 硬體配置，天線，SIM 介面及韌體。5G 數據機還可以讓使用者隨時隨地存取高速的網際網路連線，即使沒有 Wi-Fi，乙太網路也無妨。
- 支援外置 SD 卡: 提供外部 SD 卡儲存介面，可用於擴充容量，存放測試資料及建立獨立的測試系統。方便測試不同的 Linux Distribution 或 Kernel。</br>

> _^: 按照 UART Bootlog 和 BSP 中 bootloader 原始碼來看應該寫作「LAA 平臺」，這裡仍然使用較爲人知的「LA 平臺」稱呼。_

SM8750 MTP 是高通設計的硬體開發套件，不是市售消費手機。主要用於模組研發，數據機測試，驅動與 Android HAL 研發，相機ISP調校等偏向硬體和底層韌體的工作，亦可用於評估硬體效能之用。與同樣作爲原型機的QRD（**Q**ualcomm **R**eference **D**esign）不同，後者更接近完整的商用手機方案開發樣機。</br>
下面的表格可以體現二者與市售手機的不同：


| 項目                  | MTP                                                                                                                           | QRD                                             | 一般手機                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| 定位                  | 晶片底層研發平臺                                                                                                              | 接近市場量產的市售手機方案                      | 一般使用者的日常使用                               |
| 主要使用者            | 硬體/驅動/數據機工程師/手機OEM/ODM等                                                                                          | 手機OEM/ODM，產品工程研發                       | 一般使用者                                         |
| 功能重點              | 測數據機，供電，RF，相機，I/O，驅動                                                                                           | 整合 SoC，周邊及 Android 系統，作為產品設計參考 | 日常通訊，娛樂及應用程式，滿足絕大多數一般使用場景 |
| 外型                  | 多爲黑色外殼，有大量除錯用連接埠（如USB 2.0，UART，若是配合Debug Board還可以提供 JTAG 等），屏幕一般爲客製或直接使用QRD的熒幕 | 外觀接近正常手機（可整機）                      | 正常手機應該有的外形                               |
| 是否可解鎖 Bootloader | 幾乎都可開（原廠解鎖，無限制），便於寫測試程式                                                                                | 同左                                            | 取決於廠商                                         |
| 開發方向              | Bootloader, BSP, HAL, Modem, RF, PMIC, IC Validation                                                                          | Android 系統整合,產品功能驗證及量產設計         | 基本沒有                                           |
| 穩定度                | 以工程測試和硬體驗證為主，功能未必完整                                                                                        | 通常具有較高的硬體與系統整合程度                | 經過產品化驗證                                     |
| SoC是否配置安全啓動   | SoC 具備相應安全機制，實際狀態與 eFuse 和簽章配置有關(預設不配置)                                                             | 同左                                            | 大多數裝置會配置正式產品的安全啟動政策             |
| 燒錄韌體是否需要簽章  | 不需要（或高通測試簽章）                                                                                                      | 同左                                            | 通常使用 OEM 正式簽章金鑰                          |

:::tip
Bootloader 解鎖並不代表 SoC 最早期的 Secure Boot 機制也會被關閉。</br>
例如，Android 裝置即使支援 `fastboot flashing unlock`，通常也只是改變 Android Bootloader 對作業系統映像的驗證和啟動政策，並不會因此修改 SoC 內部 PBL 的信任根或 eFuse 配置。在 Qualcomm EDL Mode 中也是如此。PBL 仍然可能要求 Host 傳送經過授權簽章的 Firehose Programmer，才能執行後續的儲存裝置操作。</br>

因此，能否燒錄未簽章的映像，取決於 SoC 的 Secure Boot 配置、eFuse 狀態、映像驗證政策，以及所使用的工程簽章金鑰。即使可以進入 Fastboot 或 EDL，也不代表可以無限制地修改所有啟動韌體。</br>
:::

從表面上看，MTP 原型機與一般 Android 手機一樣，都是以 Qualcomm SoC 為核心的行動計算平台。然而，對於想要研究 Linux，Bootloader 及底層韌體的開發者而言，真正值得關注的並不僅僅是 SoC 的運算性能，而是這顆晶片如何從上電開始，逐步建立起一個可以運行完整作業系統的環境。</br>

接下來，就讓我們透過 UART Debug Console，一起觀察 SM8750 MTP 的開機過程，從最早期的 PBL 開始，逐步追蹤每個 Bootloader 如何接手前一個階段的工作，直到 Linux Kernel 正式取得控制權。

# 書寫從無到有的「奇跡」：Qualcomm 平臺的開機流程

嵌入式裝置的開機流程和計算機一樣，按下開機按鈕的時候，這場從無到有的「奇跡」也就開始了。</br>

> ...但是，在 SoC，我們的聯合控制中心再啓動之後，檢查可以使用的開機裝置，並從中加載下一階段的 Loader，本身就是我們 BootROM 的職責呀，老師。</br>

> ...這個世界本來就是從虛無中誕生的。PBL, SBL, XBL...最後是 OS Loader，每一個人都會接過上一個人留下的程式碼指令，還有他們最美好的願望，繼續屬於她們的事務。在這個過程中，大人們所謂的「信任」「責任」也就在這個過程中，傳遞到每個人的手上，最終構成了這個大家都在生活的世界。</br>

> 這萬千世界的「創造者」不是聯邦學生會長，也不是國家的大統領，更不是上帝...這個多彩的世界，這一場從無到有的「奇跡」的締造者，正是像您一樣獨坐熒幕前的人啊，老師。縱使這個世界再不完美，但我們...Wayland 的全體學生們，始終會相信，這個世界會在許多像「老師」一樣的人的改進下，慢慢地變得完美無瑕。您已經爲我們做了太多的工作了...合上筆電，然後好好的休息吧，老師。辛苦了。</br>

當新的測試核心編譯完成，是時候鍵入有魔力的 `reboot` 命令語重開機 SM8750 MTP 原型機了。讓我們接上 UART 序列埠，設定好鮑率，此時終端機上應該會滾動大量字元，對於沒有嵌入式裝置開發經驗的使用者而言可能會覺得困惑。</br>

下面 Piepaint 就來結合 UART log 內容，分析 SM8750 MTP 原型機的開機流程。高通平臺裝置的開機流程大致都符合下面的流程，隨裝置世代的不同，流程可能有所區別。</br>

```text
SoC Power reset -> PBL -> XBL(UEFI) -> Standard UEFI boot flow(SEC -> PEI -> DXE -> BDS -> TSL -> EBS -> RT) -> UEFI OS Loader*** -> HLOS Kernel*****
```

:::note
Qualcomm 在 Snapdragon 835 以後的裝置中改爲了現在的 UEFI 啓動鏈。在此之前的裝置則遵循下面的開機流程:</br>

> SoC Power reset -> PBL -> SBL(在更早期的裝置分爲三個部分，稱爲「SBL chain」) -> aboot(Little Kernel) -> HLOS Kernel</br>

\*\*\*: 用於加載 OS Kernel 的 EFI 應用程式。Bootloader 理論上可以加載任何正確的 PE32 格式 EFI 程式檔作爲 OS Loader。在 LA 平臺上, OS Loader 一般是 ABL。ABL 也是 EFI 程式。</br>
\*\*\*\*: 即「高階作業系統(High Level Operating System)」的單字縮寫。常見的 HLOS 包含：Windows Arm，Linux，BSD 等。</br>

另外 XBL 可以被 U-Boot 所替換。一些沒有設置 eFUSE 安全啓動的裝置就可以使用 U-Boot 取代 XBL 作爲 UEFI 韌體實作。來精簡開機流程，並替換專有的 XBL 程式碼。
:::

## Primary Bootloader(PBL)

## Secondary Bootloader(SBL)

## Extensible Bootloader(XBL), UEFI kicks in

# 創造屬於我們的世界：安裝適合自己的作業系統





[^1]: :官方建議搭配 30W 電源供應器。實際功耗則會依照 CPU 負載，外接裝置和周邊使用情況而有所不同。
    
[^2]: :大部分 SBC 的 CPU 和 RAM 都焊接在 PCB 上，不能像傳統桌面電腦一樣更換 CPU 或增加 DIMM 記憶體。
    
[^3]: :不同作業系統，Kernel，CPU Governor 和散熱環境都可能影響最終成績，因此不應將這組分數視為兩款 SoC 的絕對性能排名。試驗時將 Radxa Q6A 置於20攝氏度的環境，使用 Armbian 和 6.18 核心，無散熱風扇，使用記憶卡開機測得。
