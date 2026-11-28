---
title: 一切奇蹟的始發點 —— 文書一篇，單板機的全部盡覽無遺
published: 2026-11-28
description: 妳有沒有試過用一台小小的板子，跑 Linux 或 BSD，還能同時經營自己的部落格、做 AI 推論，甚至玩 Minecraft？
image: 'assets/mtp8750-linux3.jpg'
tags: [SBC, ARM, FOSS, Review]
category: 'Single-board Computer releated'
draft: false
lang: 'zh_TW'
---

:::note
建議配合下面音樂瀏覽，效果更佳：
<iframe width="560" height="315" src="https://www.youtube.com/embed/Wljb8oJGx4g?si=ejwoQ82jxADsOudz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

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

並不是所有的單板機都可以完美的適用於日常事務，部分單板機可以透過 `PREEMPT_RT` 等核心配置改善 Linux 的即時性，適合部分需要較低排程延遲的工業控制和嵌入式應用。在實際活用中，也會發現，不同作業系統對單一單板機硬體的支援程度也有不同。使用者可以自行改善作業系統在單板機上的體驗，但同時要求使用者具有一些作業系統和嵌入式系統的基本知識。如果妳真的想體驗真正的「硬體開發」與「自由軟體」，單板機絕對是目前最有趣、也最有學習價值的選擇之一。</br>

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
- UEFI 韌體：高通晶片(MSM8998之後)均採用 EDK Ⅱ 的 UEFI 韌體，包含常見的 Boot Services，Runtime Services，Variable Services 等標準化服務，以及 ACPI tables / Device tree 等啟動作業系統必須的組件**。UEFI 韌體儲存在 32MB 的 SPI NOR Flash 中。</br>
- USB 3.0 & USB 2：高速的 USB 3.0 接口可以用於連接高速外部硬體，亦可以用於更新開發板自己的 UEFI 韌體。此外也可以改善爲行動裝置移植 Linux 的體驗。</br>
- GPIO: 開發板提供 40-pin GPIO Header，支援 UART/SPI/I²C/I³C 等硬體通訊介面，可用於連接感測器，顯示器及各種外部控制設備。例如 POS 機的七段顯示器、電子模組和其他 IoT 周邊。搭配適當的驅動程式與外接電路，也可以使用 SPI 介面與外部 Flash 裝置通訊，甚至進行部分韌體燒錄工作。</br>

QCS6490 已經具有相當不錯的 Upstream Linux Kernel 支援，[Radxa Dragon Q6A 的專用 Device Tree](https://github.com/torvalds/linux/blob/master/arch/arm64/boot/dts/qcom/qcs6490-radxa-dragon-q6a.dts) 也已進入 Linux 主線。這讓開發者有機會直接使用 Mainline Kernel 進行系統移植，而不必完全依賴廠商提供的 downstream kernel。不過，部分專用硬體及協處理器仍可能需要額外的 Firmware 或廠商驅動程式。</br>

> _\*\*: 需要注意的是，UEFI 並不一定使用 ACPI 描述硬體。在 ARM64 嵌入式平臺上，也經常使用 Device Tree（DTB）向 Linux Kernel 傳遞硬體資訊。不同 UEFI 平臺的實作方式也可能有所不同，包含的組件也可能各異。例如 LA 平臺的 UEFI 沒有 ACPI tables 和 SMBIOS，亦沒有提供一般 PC UEFI Setup 中常見的開機順序修改介面。可以通過覆寫 `uefivarstore` 分割的內容來調整開機次序。_

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
- LA 平臺^ UEFI韌體：採用 EDK Ⅱ 的 UEFI 實作，包含常見的 Boot Services，Runtime Services，Variable Services 等標準化服務，但是沒有 ACPI 支援，也沒有 SMBIOS。僅提供純文字介面的 BDS Menu 供使用者設定 UEFI 韌體。可以通過覆寫 `uefivarstore` 分割的內容來調整開機次序。UEFI 韌體和作業系統一同存儲在 UFS 快閃記憶體中，具有單獨的 frimware 分割，作業系統無法存取和修改其內容。
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
| SoC是否配置安全啟動   | SoC 具備相應安全機制，實際狀態與 eFuse 和簽章配置有關(預設不配置)                                                             | 同左                                            | 大多數裝置會配置正式產品的安全啟動政策             |
| 燒錄韌體是否需要簽章  | 不需要（或高通測試簽章）                                                                                                      | 同左                                            | 通常使用 OEM 正式簽章金鑰                          |

:::tip
Bootloader 解鎖並不代表 SoC 最早期的 Secure Boot 機制也會被關閉。</br>
例如，Android 裝置即使支援 `fastboot flashing unlock`，通常也只是改變 Android Bootloader 對作業系統映像的驗證和啟動政策，並不會因此修改 SoC 內部 PBL 的信任根或 eFuse 配置。在 Qualcomm EDL Mode 中也是如此。PBL 仍然可能要求 Host 傳送經過授權簽章的 Firehose Programmer，才能執行後續的儲存裝置操作。</br>

因此，能否燒錄未簽章的映像，取決於 SoC 的 Secure Boot 配置、eFuse 狀態、映像驗證政策，以及所使用的工程簽章金鑰。即使可以進入 Fastboot 或 EDL，也不代表可以無限制地修改所有啟動韌體。</br>
:::

從表面上看，MTP 原型機與一般 Android 手機一樣，都是以 Qualcomm SoC 為核心的行動計算平台。然而，對於想要研究 Linux，Bootloader 及底層韌體的開發者而言，真正值得關注的並不僅僅是 SoC 的運算性能，而是這顆晶片如何從上電開始，逐步建立起一個可以運行完整作業系統的環境。</br>

接下來，就讓我們透過 UART Debug Console，一起觀察 SM8750 MTP 的開機過程，從最早期的 PBL 開始，逐步追蹤每個 Bootloader 如何接手前一個階段的工作，直到 Linux Kernel 正式取得控制權。

## 設定序列埠連接

序列埠(Serial Port)是單板機上最常見，重要性僅次於 JTAG 的底層除錯手段。尤其是與開機韌體(Bootloader)及核心早期啟動相關的 Debug Log，往往只能透過序列埠才能完整檢視。PC 上一般採用 RS-232 序列埠，單板機等嵌入式裝置多採用 UART 作爲主要序列埠介面。由於這類日誌經常包含裝置序號，硬體識別碼甚至系統環境資訊，在公開分享日誌前需要特別留意脫敏——這也是為什麼一般市售手機不會刻意留出實體 UART 介面的原因之一。</br>

單板機的 UART 一般位於 GPIO PIN 上，此時需要結合廠家提供的 GPIO Pin map 來尋找。例如 Radxa Q6A 單板機的 UART 序列埠位於 GPIO 的[第6(GND)，第8(TX)，第10(RX)三個 pin](https://docs.radxa.com/en/dragon/q6a/system-config/uart-debug)，接線時務必記得 TX 與 RX 要**交叉相接**(板子的 TX 接轉接器的 RX，板子的 RX 接轉接器的 TX)，GND 則與 GND 相連。同時確認轉接器邏輯準位與開發板相符，多數單板機為 3.3V，切勿誤接 5V 或 RS-232 高壓電平。</br>

:::warning

絕對不要在任何 Radxa 開發板上連接 3.3V 或 5V 供電，這會燒毀 SoC GPIO 連接埠！在使用 Programmer 的 3.3V/5V 電源時，請確認裝置 UART 的實際需要電壓。可參閱廠家提供的文件或社群實驗結果做參考。
:::

在電腦上安裝 `minicom` 或 `putty` 之類可以存取 UART 控制臺的應用，指定鮑率，然後存取 UART 序列埠：</br>

```bash
# Qualcomm (或大部分)裝置 UART 鮑率一般爲 115200，部分平臺（如部分 Rockchip 板卡）則會使用 1500000 或 9600，具體請參閱廠商文件。
sudo minicom -D /dev/ttyUSB0 -b 115200 
```

此時應該可以存取 UART console，可以在終端機裡打字。重開機單板機，就可以看到 boot log 了。</br>
而對於 SM8750 MTP 這種開發裝置，因爲廠商事先做好了「免拆卸除錯(Closed-case debugging, CCD)」，裝置搭載了 FTDI（如 `FT232` / `FT4232`）等 USB-to-UART 橋接晶片，因此只需要一條對應的 USB 傳輸線與電腦相連即可讀取序列埠輸出，無需額外購買 USB-to-TTL 轉接器。</br>
</br>
如果 UART console 沒有顯示作業系統的 boot log，請修改核心開機引數，將系統的控制臺設定爲 UART console(例: `console=ttyMSM0,115200n8 earlycon no_console_suspend`)。

:::tip
如果妳在使用 UART 控制臺遇到下面的情況時，請檢查鮑率是否設定正確。不正確的鮑率會導致輸出訊息錯誤，亂碼，或者無法輸出任何資訊。

> UART Log Example:</br>
> EDKPiepaint: ...「世界」！時間靜止吧！Wrÿÿÿÿÿÿÿ⓹ÿÿ❾ÿ№˲©℗€₩₩‰ÿ℆÷&Ⅲ×ÿ・ÿÿ@##$%!₃²æ??????!————</br>

出現這類大量 `ÿ` 字元通常是因為接收端鮑率設定得比裝置實際鮑率低所導致。序列埠閒置時處於高電位的「mark」狀態(編碼為二進位 `1`)；當兩端鮑率不匹配時，接收端會將高速傳輸的線路跳變誤判為起始位(Start Bit)，隨後在線路回到靜止的 mark 狀態後繼續取樣，結果把所有資料位元都讀成二進位 `1`(即 `0xFF`，在擴展 ASCII / Latin-1 中對應字元 `ÿ`)。</br>
:::



# 書寫從無到有的「奇跡」：Qualcomm 平臺的開機流程

嵌入式裝置的開機流程和計算機一樣，按下開機按鈕的時候，這場從無到有的「奇跡」也就開始了。</br>

> ...但是，在 SoC，我們的聯合控制中心再啟動之後，檢查可以使用的開機裝置，並從中加載下一階段的 Loader，本身就是我們 BootROM 的職責呀，老師。</br>

> ...這個世界本來就是從虛無中誕生的。PBL, SBL, XBL...最後是 OS Loader，每一個人都會接過上一個人留下的程式碼指令，還有她們最美好的願望，繼續屬於她們的事務。在這個過程中，大人們所謂的「信任」「責任」也就在這個過程中，傳遞到每個人的手上，最終構成了這個大家都在生活的世界。</br>

> 這萬千世界的「創造者」不是聯邦學生會長，也不是國家的大統領，更不是上帝...這個多彩的世界，這一場從無到有的「奇跡」的締造者，正是像您一樣獨坐熒幕前的人啊，老師。縱使這個世界再不完美，但我們...Wayland 的全體學生們，始終會相信，這個世界會在許多像「老師」一樣的人的改進下，慢慢地變得完美無瑕。您已經爲我們做了太多的工作了...合上筆電，然後好好的休息吧，老師。辛苦了。</br>

當新的測試核心編譯完成，是時候鍵入有魔力的 `reboot` 命令語重開機 SM8750 MTP 原型機了。讓我們接上 UART 序列埠，設定好鮑率，此時終端機上應該會滾動大量字元，對於沒有嵌入式裝置開發經驗的使用者而言可能會覺得困惑。</br>

下面 Piepaint 就來結合 UART log 內容，分析 SM8750 MTP 原型機的開機流程。高通平臺裝置的開機流程大致都符合下面的流程，隨裝置世代的不同，流程可能有所區別。</br>

```text
SoC Power reset -> PBL(CPBL --> APBL) -> XBL(UEFI) -> Standard UEFI boot flow(SEC -> PEI -> DXE -> BDS -> TSL -> EBS -> RT) -> UEFI OS Loader*** -> HLOS Kernel*****
```

:::note
Qualcomm 在 Snapdragon 835 以後的裝置中改爲了現在的 UEFI 啟動鏈。在此之前的裝置則遵循下面的開機流程:</br>

> SoC Power reset -> PBL -> SBL(在更早期的裝置分爲三個部分，稱爲「SBL chain」) -> aboot(Little Kernel) -> HLOS Kernel</br>

\*\*\*: 用於加載 OS Kernel 的 EFI 應用程式。Bootloader 理論上可以加載任何正確的 PE32 格式 EFI 程式檔作爲 OS Loader。在 LA 平臺上, OS Loader 一般是 ABL。ABL 也是 EFI 程式。</br>
\*\*\*\*: 即「高階作業系統(High Level Operating System)」的單字縮寫。常見的 HLOS 包含：Windows Arm，Linux，BSD 等。</br>

另外 XBL 可以被 U-Boot 所替換。一些沒有設置 eFUSE 安全啟動的裝置就可以使用 U-Boot 取代 XBL 作爲 UEFI 韌體實作。來精簡開機流程，並替換專有的 XBL 程式碼。
:::

:::caution
本文中基於 boot log 分析均是在個人活用經驗和實踐上推斷的，部分(或全部)注解可能有誤。如妳是高通平臺有經驗的韌體開發者，歡迎聯絡我(或者在下面的留言板留言均可)並指出註解的錯誤，我將不勝感激！</br>
(Lanai：_只要不透露工作機密的內容...都可以喔..._)
:::

## Primary Bootloader(PBL)

PBL（Primary Boot Loader）是 Qualcomm SoC 儲存在內部不可修改 Boot ROM 中的第一階段啟動程式。當 SoC 解除 Reset 後，Boot Core 便會從預先定義的 Reset Vector 開始執行 PBL。PBL 負責進行必要的早期硬體初始化，讀取開機配置，尋找啟動媒體，以及驗證和載入下一階段的 Bootloader。</br>

在啟用 Secure Boot 的裝置上，PBL 會根據晶片內部設定的信任根驗證後續映像的數位簽章，只有通過驗證的映像才能繼續執行。若映像驗證失敗，PBL 將不會正常執行該映像。部分 Qualcomm 平台可能依照錯誤處理政策進入 Emergency Download Mode（EDL），讓使用者重新刷入載有有效簽章的韌體，但並非所有簽章驗證失敗都會自動進入 EDL。</br>

```yaml
Format: Log Type - Time(microsec) - Message - Optional Info
Log Type: B - Since Boot(Power On Reset),  D - Delta,  S - Statistic
S - QC_IMAGE_VERSION_STRING=BOOT.MXF.2.5.1-00187-PAKALA-1   # 記錄裝置 boot image 的版本，這個版本號碼應該與 UEFI firmware version 一致
S - IMAGE_VARIANT_STRING=SocPakalaLAA           # 從原始碼編譯的韌體 Variant。LA/LAA 代表 Android，WP 代表 Windows，LC 代表 ChromeOS。字串中的「Pakala」表示裝置採用了 SM8750 SoC。
S - OEM_IMAGE_VERSION_STRING=ip-<REDACTED>
S - Boot Interface: UFS     # PBL 設定的開機裝置。手機一般是 eMMC/UFS，至於 IoT 或者桌面平臺則會儲存在單獨的 SPI flash 中。
S - Secure Boot: Off    # 裝置是否配置 Secure boot eFUSE(裝置是否熔燬)，熔燬的裝置僅可以使用經過同一份數位簽章簽名的韌體。
S - Boot Config @ 0x221c8600 = 0x00000000
S - JTAG ID @ 0x221b8744 = 0x0028c0eb
S - OEM ID @ 0x221c8700 = 0x00000000    # OEM 廠家的自訂值(有待檢查)
S - Serial Number @ 0x221c8510 = 0x0000045ab9961bd7     # 裝置的序列號
S - OEM Config Row 0 @ 0x231c2050 = 0x0000000000000000  # OEM 廠家配置檔(有待檢查)
S - OEM Config Row 1 @ 0x231c2158 = 0x0000000000000000  # OEM 廠家配置檔(有待檢查)
S - Feature Config Row 0 @ 0x231c2280 = 0x30ad650008080000
S - Feature Config Row 1 @ 0x231c2288 = 0x59ab5504a0969304
S - OEM LCS:DEV     
S - Core 0 Frequency, 1363 MHz  # PBL 啟動時，CPU 僅初始化了一個核心，核心時脈爲 1363MHz
S - PBL Patch Ver: 3
S - PBL freq: 600 MHZ
S - Cluster: 0, Core: 0
S - --------------------------------------------------
PBL Timestamps (in usecs)(,version/bytes)       # PBL 完成的各項任務及分別消耗的時間(單位: Microseconds，微秒)
--------------------------------------------------
CPBL Start: 160
CPBL HW INIT Start: 495        # CPBL 進行硬體初始化。
CPBL HW INIT End: 2530
CPBL APPS Reset Start: 2718
CPBL APPS Sec Packet Init Start: 3063
CPBL APPS Sec Packet Init End: 3073
CPBL APPS Init Start: 3086
CPBL APPS Cache Init Start: 3771
CPBL APPS Cache Init End: 3795
CPBL APPS Core PWRUP Start: 3871     # PBL 啟動時，CPU 僅初始化了一個核心(PBL Apps core)，此後所有的啟動階段(SBL, XBL/UEFI...)均依靠這個核心執行。
CPBL APPS Core PWRUP End: 3946
CPBL APPS Init End: 3973
CPBL APPS Reset End: 3975
CPBL Exit: 4093
APBL start: 9310,16777474       # APBL(Application PBL)開始執行，APBL 負責設定開機裝置(由裝置上的 Boot GPIO 設定)，以及進行下一階段(SBL/XBL)所需程式的數位簽章驗證。
APBL Boot Media Detect Start: 26601     # 初始化必須的開機裝置
         APBL flash init stage 1 complete: 29260
         APBL flash init stage 2 complete: 53685
         APBL flash init stage 3 complete: 65101
APBL Boot Media Detect End: 66248
APBL SHELF Load+Auth Start: 66255       # 驗證韌體的數位簽章。
        APBL ELF MD Load Start: 71006
        APBL ELF MD Load End: 71343
        APBL ELF Seg Load Start: 71345
        APBL ELF Seg Load End: 72158,2308
                APBL SEQ Valid Set: 72183
                APBL SEQ SA ACK Rcvd: 76221
        APBL ELF MD Load Start: 78883
        APBL ELF MD Load End: 80991
        APBL ELF Auth Start: 80993
        APBL ELF Auth End: 89456
        APBL ELF Seg Load Start: 89458
        APBL ELF Seg Load End: 107290,187504
        APBL ELF Seg Verify Start: 107291
        APBL ELF Seg Verify End: 111085
        APBL ELF MD Load Start: 113183
        APBL ELF MD Load End: 115320
        APBL ELF Auth Start: 115323
        APBL ELF Auth End: 123748
        APBL ELF Seg Load Start: 123750
        APBL ELF Seg Load End: 137785,998368
        APBL ELF Seg Verify Start: 137786
        APBL ELF Seg Verify End: 142396
APBL SHELF Load+Auth End: 142503
                APBL TME PBL Exit: 142506
                APBL XBL_SC Exit Check: 143100
                APBL XBL_SC Exit Ack: 176975
APBL Exit: 176980       # PBL 階段結束，準備跳轉到 SBL 開始後續流程...
```

PBL 儲存在晶片內部的 BootROM 中，這一部分的程式一經寫入便無法更改。因此 PBL 是整個裝置開機流程的「基石」，亦是信任啟動鏈(Trusted boot chain)的「基石」。如果 Boot ROM 存在可利用的安全漏洞，攻擊者在滿足相應利用條件時，可能繞過原本的啟動信任機制，使後續韌體的安全性受到影響。</br>

## Secondary Bootloader(SBL)

SBL(Secondary Bootloader)接過來自 PBL 的程式碼指令，還有她畢生的心願，開始了另一場「單程旅途」...</br>
SBL 經過 PBL 的有效簽章驗證後，會開始硬體初始化(硬體總線，DDR，硬體時鐘，CDT，USB 控制器，電源管理等)及自檢(POST)流程，此後會設定 QSEE，讀取 QHEE 配置檔配置所支援的硬體特性。在新平臺(8650之後)上，還會驗證並設定 SOCCP，PDP，Hypervisor 等機能。自 SD835(MSM8998)晶片後，SBL 被擴展性更好，相容 UEFI 標準的 XBL 所取代，因此 SBL 這一概念在現今的裝置上不復存在，這裡描述 SBL 所負責的事務也是 XBL 要負責的事務。但 boot log 依然可以看到 SBL 的身影。</br>
爲了方便程式開發人員除錯，SBL/XBL 還提供基於 Qualcomm 專有 Sahara 協定的記憶體轉儲和崩潰轉儲模式(Qualcomm Memory Dump & CrashDump mode*)，此時 Host 可以透過 Sahara 協定與裝置通訊，讀取 Bootloader 所提供的記憶體區段，建立 RAM Dump，供開發者分析系統崩潰原因。</br>

> _*:俗名「900E」埠，因爲其 USB Product ID 爲 900E 而得名。_

```yaml
B -    177815 - SBL1, Start   # SBL 加載了。
B -    457683 - SBL1 BUILD @ 21:28:39 on Dec 29 2024
B -    473146 - usb: usb_eud_serial  , 0xb9951ed7
D -       274 - sbl1_hw_init
D -       458 - media_init:1
D -         0 - boot_blacklist_disable
B -    483120 - OEM_MISC -  Image Load, Start
D -      3385 - Auth Metadata
D -     10217 - OEM_MISC -  Image Loaded, Delta - (5184 Bytes)
B -    493673 - QTI_MISC -  Image Load, Start
D -     11590 - Auth Metadata
D -     19611 - QTI_MISC -  Image Loaded, Delta - (4624 Bytes)
B -    514047 - APDP -  Image Load, Start
D -      5795 - APDP -  Image Loaded, Delta - (64 Bytes)
D -         0 - boot_dload_dump_security_regions
D -         0 - EUD Init
D -         0 - blacklist enable
D -      2409 - DP_Milestone
D -      4026 - Auth Metadata
D -      5673 - sbl1_xblconfig_init
B -    545767 - XBL Config -  Image Load, Start     # XBL 加載，並從裝置的 xbl_config 分區讀取 XBL 的相關設定檔
B -    551104 - DTB  Found: [pre-ddr][96026a01000000][0]        # 加載 Pre-DDR Device tree
D -      4392 - boot_pre_ddr_dtb_load
D -     13237 - tsens_init_if
D -       122 - boot_check_device_temp  # 檢查裝置溫度是否正常
B -    586362 - PM: PM_DT_PARSING_ERR: charger 
B -    586972 - BUS: 0, PMIC A:2.1 B:2.1 D:2.0 E:1.0 F:2.0 G:2.0 H:1.0 I:2.0 J:2.0 K:2.0 M:1.3 N3       # PMIC(電源管理晶片)初始化
B -    590724 - BUS: 1, PMIC
B -    601948 - PM: PM_DT_PARSING_ERR: sw-config        
B -    603625 - PM: Reset by PSHOLD
B -    606950 - PM: Reset Type: Shutdown
B -    610274 - PM: PON by SYSOK
B -    614727 - PM: PM_DT_PARSING_ERR: display
B -    660935 - PM: SET_VAL:Skip
B -    661270 - PM: PSI: b0x0D_v0x40 OTP: v0x0D
B -    669322 - PM: OEM_PSI post-device-opsi Start
B -    669963 - PM: OEM_PSI post-device-opsi Done
B -    674019 - PM: Device Init # SPMI Transn: 3962     # 初始化電源管理機能
D -    103853 - pm_device_init, Delta
B -    683291 - pm_driver_init, Start
B -    702201 - PM: Driver Init # SPMI Transn: 1096
D -     15463 - pm_driver_init, Delta
D -    132279 - sbl1_pmic_init
D -         0 - EUD Post PMIC Init
D -     26108 - media_init:2
B -    747341 - UFS Spec Version: 4.0   # UFS 裝置支援的規範版本。
B -    750635 - UFS INQUIRY ID: KIOXIA  THGJFLT2E46BATPB0100 # SCSI INQUIRY 回報的廠商及裝置識別資訊。UFS 底層採用 MIPI UniPro 和 M-PHY 傳輸架構，基於 SCSI 介面，因此可以看作是硬體總線開始初始化的訊號
B -    753045 - UFS Boot LUN: 1 # 啟動使用的 Boot Logical Unit
B -    758535 - UFS Total Size: 512 GB  # 儲存裝置容量
B -    774547 - UFS Speed: Gear 5 Lane 2 Rate B # 裝置 UFS Controller 與裝置協商的傳輸模式。
D -     38979 - media_init:3
D -       274 - boot_wdog_disable_check
D -       305 - init-logstomedia
D -        30 - shrm_load_cancel
B -    788364 - SHRM -  Image Load, Start
D -      5460 - Auth Metadata
D -     13633 - SHRM -  Image Loaded, Delta - (142268 Bytes)
D -        92 - boot_cdt_init
B -    807579 - CDT -  Image Load, Start
B -    810354 - CDT Version:5,Platform ID:8,Major ID:4,Minor ID:0,Subtype:0
D -     15128 - sbl1_hw_platform_pre_ddr
B -    826062 - usb: chgr -  CDP_CHARGER       # 設定充電裝置
B -    829264 - usb: qusb_dci_eud_init
B -    833900 - usb: usb_shared_hs_phy_init dt_error  , 0x6
B -   1036542 - usb: usb_dp_toggled_for_cdp , 0xc8
B -   1036603 - PM: Get RID from SDAM: 100000   # 讀取電池資訊，當前充電電流，電壓，溫度
B -   1041239 - PM: Battery ID: 100000 Ohm
B -   1046668 - PM: ICL: 1500 Pre backup: 300 Aggr: 300. FLC backup: 2000 Aggr: 1000
B -   1051548 - PM: VBAT: 4098mV IBAT: -18mA T: 24C
B -   1057130 - PM: CHG Init # SPMI Transn: 112
B -   1061796 - vsense_init, Start
D -         0 - vsense_init, Delta
D -    255407 - sbl1_hw_pre_ddr_init
D -       366 - boot_fedl_check
D -         0 - boot_dload_handle_forced_dload_timeout
D -       671 - sbl1_load_ddr_training_data
B -   1092327 - Pre_DDR_clock_init, Start
D -         0 - Pre_DDR_clock_init, Delta
D -     12993 - sbl1_ddr_set_params
B -   1104039 - sbl1_ddr_init, Start
B -   1111633 - DDR_INIT with shrm.elf  # DDR 初始化，設定 DDR Controller，PHY，時序和記憶體參數，使 SoC 可以開始使用外部 DRAM。
B -   1111664 - INFO: PXI based read & write training enabled   # DDR Training，校準 Memory Controller 和 DRAM 之間的訊號傳輸，找出適合目前硬體環境的讀寫及取樣參數。
B -   1131550 - eCDT MRR - Data Starting Address: 0x2404E500
B -   1136735 - Returning from DDR_FW_Init
B -   1137131 - ddr_init = 1 cold boot
D -     33764 - sbl1_ddr_init, Delta
B -   1144695 - DSF version = 030.00.00
B -   1148050 - Manufacturer ID = 0xff, Device Type = 0x8       # LPDDR5 記憶體製造商和類型的資訊
B -   1151741 - Rank 0 size = 8192 MB, Rank 1 size = 8192 MB    # 本次初始化共識別到兩個 Memory Rank，每個 Rank 容量為 8GB，總計 16GB。
D -     53741 - sbl1_ddr_init
D -         0 - store-logstomedia
B -   1165588 - do_ddr_training, Start
B -   1252513 - DDR: Start of DDR Training Restore      # 韌體正在嘗試載入或恢復可用的記憶體訓練參數...
B -   1282464 - Returning from DDR_FW_Restore
B -   1282494 - DDR: End of DDR Training Restore
D -    118309 - do_ddr_training, Delta
B -   1294786 - SecLib initiate DARE sequence start
B -   1295457 - SecLib initiate DARE sequence successful
B -   1299635 - LCP DARE with HW Init is Enabled
B -   1310676 - Returning from DDR_FW_Exit
B -   1311012 - DDR:set boot freq from device tree
B -   1314641 - Current DDR Freq = 2096 MHz
B -   1319308 - Max enabled DDR Freq = 4761 MHz
...
```
:::tip
上面的這一段訊息(`INFO: PXI based read & write training enabled`) 很好的展示了記憶體訓練(Memory training)在智慧手機等嵌入式系統的應用。</br>
DDR 記憶體訓練(Memory training)，DDR training 是為了在高速傳輸下，動態校準記憶體控制器與 DRAM 顆粒之間的時序偏移與訊號完整性。
在現代 DDR4、DDR5 或 LPDDR5/5X 動輒數千 MT/s 的資料率下，每個時脈週期(UI)非常短，PCB 走線長度微差，插槽接觸阻抗，溫度變化以及製程變異，都會讓時脈、選通信號與資料線無法精準對齊。若沒有 training 找出最佳取樣點與電壓/端接參數，高速讀寫就會出現位元錯誤甚至無法開機。</br>
:::

```yaml
...
D -    158021 - xbl_trng_ddi_seq
D -         0 - store-logstomedia
D -      2654 - xbl_map_smem
D -         0 - boot_smem_debug_init
D -      8601 - boot_smem_init
D -       366 - boot_ddr_share_data_to_aop
D -       153 - boot_populate_ddr_details_shared_table
D -         0 - boot_recovery_partitions_info_smem_init
B -   1357036 - MIPC is DISABLED
D -      5093 - boot_update_ram_partition_table
B -   1365149 - Pimem init cmd, entry
B -   1371981 - (50000e)
D -      3507 - Pimem init cmd, exit
B -   1383419 - External heap init, Start
B -   1383480 - External heap init, End
D -     40901 - sbl1_post_ddr_init
D -         0 - sbl1_hw_init_secondary
B -   1409313 - DDR -  Image Load, Start
B -   1416572 - DTB  Found: [post-ddr][96026a01000000][800040000000000] # 加載 Post-DDR Device tree
D -      3782 - boot_post_ddr_dtb_load
D -         0 - imageinfo_init
B -   1426790 - usb: UFS Serial - <REDACTED>      # UFS 快閃記憶體的序列號(SN)
D -      2867 - boot_usb_update_serial
D -         0 - boot_usb_handle_charger
D -       275 - sbl1_hw_platform_smem
D -         0 - ramdump_load_cancel
B -   1444297 - RamDump -  Image Load, Start    # 設定 Ramdump 機能
D -      3324 - RamDump -  Image Loaded, Delta - (0 Bytes)
D -         0 - boot_update_abnormal_reset_status
D -         0 - boot_cache_set_memory_barrier
D -        31 - boot_smem_alloc_for_minidump
D -         0 - boot_shrm_mini_dump_init
D -        61 - boot_minidump_register_regions
D -        92 - boot_smem_store_pon_status
D -        31 - boot_clock_init_rpm
D -         0 - boot_vsense_copy_to_smem
D -       366 - sbl1_tlmm_init
D -         0 - sbl1_efs_handle_cookies
B -   1493402 - PM: PM_DT_PARSING_ERR: display
B -   1518503 - PM: PM Total Mem Allocated: 12961 # 分配給 Ramdump 機能的部分記憶體
D -     26657 - sbl1_pm_aop_pre_init_wrapper
B -   1523200 - AOP Config -  Image Load, Start
D -      3264 - Auth Metadata
D -     16653 - AOP Config -  Image Loaded, Delta - (18608 Bytes)
B -   1539914 - AOP -  Image Load, Start
D -     15555 - Auth Metadata
D -     47702 - AOP -  Image Loaded, Delta - (349444 Bytes)
D -         0 - aop_loaded
B -   1593045 - SOCCP_DEBUG -  Image Load, Start
D -      5581 - Auth Metadata
D -     24217 - SOCCP_DEBUG -  Image Loaded, Delta - (115249 Bytes)
B -   1617323 - SOCCP_DCD -  Image Load, Start
D -      3446 - Auth Metadata
D -     13085 - SOCCP_DCD -  Image Loaded, Delta - (9312 Bytes)
B -   1630530 - PDP_CDB -  Image Load, Start
D -      3416 - Auth Metadata
D -     11651 - PDP_CDB -  Image Loaded, Delta - (4652 Bytes)
B -   1643248 - PDP -  Image Load, Start
D -      5582 - Auth Metadata
D -     18392 - PDP -  Image Loaded, Delta - (202300 Bytes)
D -         0 - boot_prepare_cpucp
B -   1667130 - CPUCP_DTB -  Image Load, Start
D -      3233 - Auth Metadata
D -      9851 - CPUCP_DTB -  Image Loaded, Delta - (8792 Bytes)
B -   1677439 - CPUCPFW -  Image Load, Start
D -      6527 - Auth Metadata
D -     26108 - CPUCPFW -  Image Loaded, Delta - (309348 Bytes)
D -         0 - boot_reset_cpucp
B -   1709372 - QSEE Dev Config -  Image Load, Start
D -      3507 - Auth Metadata
D -     11987 - QSEE Dev Config -  Image Loaded, Delta - (53160 Bytes)
B -   1721389 - QSEE -  Image Load, Start
D -     18178 - Auth Metadata
D -    118096 - QSEE -  Image Loaded, Delta - (4163592 Bytes)
B -   1840675 - DTB: Vibration Enabled
D -      6801 - sbl1_hw_play_vibr
B -   1848727 - SEC -  Image Load, Start
D -      3202 - SEC -  Image Loaded, Delta - (64 Bytes)
B -   1855620 - QHEE -  Image Load, Start
D -     17873 - Auth Metadata
D -     42669 - QHEE -  Image Loaded, Delta - (1543764 Bytes)
B -   1898350 - APPSBL -  Image Load, Start
D -      3416 - Auth Metadata
D -     36753 - APPSBL -  Image Loaded, Delta - (2789240 Bytes)
B -   1935713 - SBL1, End  # SBL 結束，準備執行 UEFI 韌體     
D -   1763144 - SBL1, Delta
S - Flash Throughput, 357010 KB/s  (9996287 Bytes,  28704 us)
S - DDR Frequency, 2092 MHz
```

:::note[Bug 發見機]
在 PMIC 初始化期間，可以看到多次 `PM_DT_PARSING_ERR` 訊息，分別涉及 `charger`，`sw-config` 和 `display` 等配置。這表示部分電源管理設定的解析出現問題，但並未阻止本次啟動流程繼續進行。至於這些錯誤是否影響充電，顯示或其他電源管理功能，仍需要進一步透過實際硬體測試確認。
:::

## Gunyah Hypervisor 初始化(僅8650之後的晶片平臺)

高通於 SM8650(Snapdragon 8 Gen 3, HLOS 名：Lanai)及之後的手機 SoC 晶片會使用 Gunyah 作為 Type-1 Hypervisor。Gunyah 運行於 ARM64 的 EL2，負責管理虛擬機，記憶體隔離，中斷路由和資源分配等工作。</br>
在這種架構下，Android 或 Linux 等 HLOS 通常作為虛擬機運行於 EL1，而 Gunyah 則負責提供更高特權層級的隔離與管理能力。</br>
根據 SM8750 MTP 的 UART Log，Gunyah 在 SBL1 結束後不久開始初始化。之後 Resource Manager 完成初始化，並關閉其 UART 輸出。本次 Log 因此無法繼續觀察所有後續的 Hypervisor 內部事件。</br>

```yaml
0       2.150154 Hypervisor cold boot, version: gunyah-109a4352d perf (Tue Dec 10 05:27:31 2024 )       # Gunyah Hypervisor 啟動並準備就緒，之後通過作業系統中可以檢視到作業系統爲 Gunyah Hypervisor 保留的記憶體區段
0       2.162942 pt_mem_phys_offset:290d400000
[RM]Resource Manager version: dd7fe3c7 (Wed Dec 11 09:13:44 2024 UTC)
[RM]MPD Sanitiser: Unexpected MPD version, skipping.
[RM]HLOS is RAS handler
[RM]Warning: skip unmap non_exclusive passthrough 221c8000 1000
[RM]Init completed, disabling UART
0       2.229817 Hypervisor UART is disabled!
```

:::tip[有趣的事實]

通過 SBL/XBL 的 boot log，我們可以得知整個原型機大概的硬體配布情況。例如裝置使用的 UFS 快閃記憶體是 KIOXIA 製造的 512GB UFS 4.0 快閃記憶體。(`UFS Spec Version: 4.0`)
另外也告訴我們裝置的 16GB 記憶體是由兩個 8GB Memory Rank 拼合而來的。其 DDR 時脈爲 2092 MHz，最高支援到 4761 MHz(需要驗證)。

:::

SBL/XBL 在整個開機流程中扮演了相當重要的角色，如果說前面的 PBL 是整個開機流程的基石，那麼 SBL/XBL 則扮演了「第一層」的角色，負責初始化硬體，準備所需要的各種硬體總線，DDR，記憶體訓練，配置USB，設定 QSEE 可信任執行環境和 Hypervisor 等事務，同時也爲 UEFI 和 HLOS 的啟動準備了條件。

## Extensible Bootloader(XBL), UEFI kicks in

XBL 被 SBL 加載之後，便會按照編譯韌體時產生的 `xbl_config` 分割中的內容，設定 XBL 執行環境，此後開始硬體初始化(硬體總線，DDR，硬體時鐘，CDT，USB 控制器，電源管理等)及自檢(POST)流程，此後會設定 QSEE，讀取 QHEE 配置檔配置所支援的硬體特性。在新平臺(8650之後)上，還會驗證並設定 SOCCP，PDP，Hypervisor 等機能。</br>
之後會加載基於 EDK Ⅱ 的 UEFI 韌體，包含完整的 UEFI Runtime services，Boot services 和 Variable services。開始 UEFI 平臺的標準啟動流程。承載着大家對自由世界和可信計算的渴望，UEFI 開始了屬於她的「單向旅程」，也是整個開機流程的「最後旅程」。高通平臺的 UEFI 韌體開機流程與 x86 PC 基本一致。</br>

### UEFI Start, SEC(Security Phase) 階段開始

當 UEFI 韌體被 XBL 執行後，SEC 階段也就自然開始了。SEC 是整個 UEFI 開機流程中最先開始的階段，負責建立 UEFI 韌體最初始的執行環境。其入口程式通常包含與處理器架構相關的低階組合語言程式碼，並可搭配 C 語言實作其他初始化功能。其主要工作包括：建立供後續程式使用的 Temporary RAM(臨時記憶體區段，在 Arm 裝置上，一般是 SoC 的 boot processor)。在高通裝置上，這個 Boot processor 是由 PBL 預先初始化的一個 CPU 核心所負責。建立初始 Stack，準備 PEI Foundation 所需的執行環境。SEC 是 UEFI 信任啟動鏈的根基(Root of trust)，負責延續既有的信任啟動鏈，必要時驗證下一階段韌體的完整性。同時向下一階段傳遞臨時用記憶體的區段位址，硬體平臺的資訊和可用棧的大小。</br>

```yaml
UEFI Start     [ 2235]
 - 0x0A7001000 [ 2245] Sec.efi
ASLR          : ON
DEP           : ON (RTB)
Timer Delta   : +1 mS
```

可以看到，韌體載入了 `Sec.efi`，並顯示 ASLR（Address Space Layout Randomization）及 DEP（Data Execution Prevention）等安全機制的狀態。

:::note
高通平臺的 Root of Trust 並不是到了 UEFI SEC 才第一次建立。對 Qualcomm 平臺而言，信任鏈早在 PBL 階段便已經開始建立，SEC 則負責延續 UEFI 階段的信任驗證工作。
:::

### PEI(Pre-EFI Initialization)階段

PEI 是 UEFI 開機流程的第二個階段，主要負責完成必要的硬體初始化，建立永久記憶體環境，準備 DXE 階段所需的硬體資源資訊，和 UEFI 韌體更新/恢復等機能。另外 PEI 還會檢查當前裝置的啟動狀態(boot status，例如 Normal boot，Cold boot，Firmware update)。在 WP 這種支援 ACPI 的裝置平臺上，還需要處理 ACPI sleep 相關的動作。例如負責將處於 S3 sleep 的硬體恢復到睡眠前的正常狀態。</br>
PEI 由 PEI Foundation, PEI Dispatcher, PEIM 和 PPI(PEIMs-to-PEIMs Interfaces) 四部分組合而成。PEI 階段的程式碼需要儘量精簡，因為此時可使用的記憶體和系統服務仍然有限。與 DXE 相比，PEI 所提供的服務相對簡單，因此大部分較複雜的硬體初始化及驅動程式工作會留到 DXE 階段處理。</br>

```yaml
RAM Entry 0   : Base 0x0080000000  Size 0x0000E00000
RAM Entry 1   : Base 0x0081300000  Size 0x0000100000
RAM Entry 2   : Base 0x0081960000  Size 0x0000C40000
RAM Entry 3   : Base 0x00D8600000  Size 0x0000000000
RAM Entry 4   : Base 0x00E3720000  Size 0x001C8E0000
RAM Entry 5   : Base 0x0880000000  Size 0x002F700000
RAM Entry 6   : Base 0x08B0000000  Size 0x0005500000
RAM Entry 7   : Base 0x0A00000000  Size 0x0200000000
RAM Entry 8   : Base 0x08C0000000  Size 0x0140000000
RAM Entry 9   : Base 0x08B5700000  Size 0x0001E00000
RAM Entry 10   : Base 0x0082600000  Size 0x0055A00000
RAM Entry 11   : Base 0x0081200000  Size 0x0000040000
RAM Available : 16040 MB (0x03EA860000) # 初始化可用的主記憶體區段。這些記憶體區域資訊會透過 HOB 等機制傳遞給後續的 DXE 階段，讓 DXE 知道哪些記憶體可以使用，以及哪些區域已經被保留。
RAM Installed : 16384 MB (0x0400000000) 
DTB config    : client[0]..trace[0]..verbose[0]
Minidump      : ON
Multithread   : ON (Lib ver 1.3)
CPU Cores     : 8 (init 2)  # 此時裝置初始化了二個 CPU 核心供使用，其中一個應該是由 PBL 初始化用於執行前期流程的核心
Init 1 aux cores of 7
Init CPU core 1
Continue booting UEFI on Core 0 # 但韌體會選擇其中一個核心作爲 boot core
  > Scheduler up on Core 1
CONF File     : uefiplatLA.cfg  # 編譯時套用的韌體配置檔
UEFI Ver      : 6.0.241229.BOOT.MXF.2.5.1-00187-PAKALA-1 # 裝置 UEFI 版本，此訊息與 BDS 階段中展示的 UEFI 版本一致
Build Info    : 64b Dec 29 2024 21:29:28
Boot Device   : UFS # 當前裝置是從哪裡開機的，在筆電或者單板機中多爲 SPI Flash，手機多爲 UFS
PROD Mode     : FALSE
Retail        : FALSE # 展示裝置是否爲「零售模式」，一般的手機和開發板應該會展示「True」，但不代表裝置有設定 Secure boot
 - 0x0D77CF000 [ 2444] DxeCore.efi # DXE 階段開始...
 ```
完成必要的記憶體初始化與 HOB 建立後，PEI Foundation 便會透過 DXE IPL 將控制權交給下一階段。當 UART Log 出現 `DxeCore.efi`，便表示韌體已經開始進入 DXE 階段。至此，PEI 的主要工作也就完成了。

### DXE(Driver Execution Environment)階段

DXE 是整個 UEFI 開機流程中，負責進行大部分平台初始化工作的重要階段。經過 PEI 階段的初始化後，韌體已經準備好永久記憶體區段，並透過 HOB(Hand-Off Blocks)將記憶體配置，Firmware Volume(FV) 及其他平臺資訊傳遞給 DXE Core。</br>

DXE 階段主要由 DXE Foundation，DXE Core，DXE Dispatcher 及一系列 DXE Drivers 構成。DXE Core 負責建立 DXE 執行環境，提供 DXE Services，並建立 UEFI Boot Services 等基礎服務；Runtime Services 則由 DXE Core 與相關 DXE drivers 提供；DXE Dispatcher 則按照各個 DXE Driver 的相依條件，決定其載入與執行順序。DXE Drivers 負責初始化處理器，晶片組及平台硬體，並提供必要的軟體介面與服務。</br>
在 Qualcomm 平臺上，這些驅動程式可能涵蓋 PMIC，SPI，I²C，USB，UFS，PCIe，Display 等硬體控制器，以及 GIC，Timer，IOMMU，Watchdog 和 TrustZone 等平台功能。部分硬體其實已在 XBL 或 PEI 階段完成初步初始化，DXE 則進一步提供 UEFI 所需的驅動程式與 Protocol 介面。

```yaml
- 0x0D77CF000 [ 2444] DxeCore.efi # DXE core 加載，DXE 階段開始
Loading DxeCore at 0x00D77CF000 EntryPoint=0x00D77D0000
HOBLIST address in DXE = 0xD75C0018
FV Hob            0xA7000000 - 0xA72A7FFF # DXE Core 接收 PEI 傳遞的 HOB list，從中取得記憶體及 Firmware Volume 等平台資訊，隨後由 DXE Dispatcher 按照驅動程式的相依條件，依序載入並執行所需的 DXE drivers
FV Hob            0xD780E000 - 0xD7C06FFF
FV2 Hob           0xD780E000 - 0xD7C06FFF
                  631008B0-B2D1-410A-8B49-2C5C4D8ECC7E - 00000000-0000-0000-0000-000000000000
 - 0x0D776A000 [ 2447] EnvDxeEnhanced.efi 
 - 0x0D7761000 [ 2447] RscRtDxe.efi 
 - 0x0D7759000 [ 2448] SCHandlerRtDxe.efi 
 - 0x0D7294000 [ 2448] RuntimeDxe.efi 
 - 0x0D774E000 [ 2448] QcomWDogDxe.efi # 加載硬體 Watchdog 驅動，當硬體在某一時間沒有重設 Watchdog，就重新開始開機流程
HW Wdog Setting from PCD : Disabled # 從這份韌體的 PCD 設定來看，QcomWDogDxe 所涉及的硬體 Watchdog 功能並未啟用。
 - 0x0D773F000 [ 2448] ArmCpuDxe.efi 
 - 0x0D7736000 [ 2449] ArmGicDxe.efi # Arm GIC V3 通用中斷控制器驅動
 - 0x0D772F000 [ 2449] MetronomeDxe.efi 
 - 0x0D7728000 [ 2449] ArmTimerDxe.efi # 硬體計時器
 - 0x0D771E000 [ 2450] SmemDxe.efi 
 - 0x0D76CA000 [ 2450] DALSys.efi 
 - 0x0D76C2000 [ 2451] HWIODxeDriver.efi 
 - 0x0D76B6000 [ 2451] ChipInfo.efi 
 - 0x0D76AE000 [ 2451] PlatformInfoDxeDriver.efi 
 - 0x0D768B000 [ 2451] HALIOMMU.efi # IOMMU 驅動程式
 - 0x0D7677000 [ 2454] ULogDxe.efi 
 - 0x0D766F000 [ 2454] CmdDbDxe.efi 
 - 0x0D7667000 [ 2454] PwrUtilsDxe.efi 
 - 0x0D7654000 [ 2455] NpaDxe.efi 
 - 0x0D7644000 [ 2455] RpmhDxe.efi 
 - 0x0D7639000 [ 2456] MailboxDxe.efi 
mbox_os_init: Failed to locate SCM protocol for Mailbox 14
 ****
 - 0x0D7630000 [ 2461] QcomScmiDxe.efi 
 - 0x0D7624000 [ 2462] CalibrationDxe.efi 
SLT Platform Key not found: 14  # 未找到平臺金鑰鏈(PK)，尚不確定是否爲 Secure boot key 缺失導致。這可能是 Qualcomm 私有韌體元件的名稱或另一套金鑰機制。單憑這一行，無法知道它指的是 UEFI PK，Qualcomm 自身的金鑰，還是其他驗證資料。
 - 0x0D7613000 [ 2550] VcsDxe.efi 
 - 0x0D75CF000 [ 2559] ClockDxe.efi 
 - 0x0D7265000 [ 2614] ICBDxe.efi 
 - 0x0D75C6000 [ 2615] ShmBridgeDxeLA.efi 
 - 0x0D7258000 [ 2615] ScmDxeCompat.efi 
IsArmV8Smc() return TRUE 
 - 0x0D724C000 [ 2617] DALTLMM.efi 
 - 0x0D7245000 [ 2618] Qup.efi 
 - 0x0D7236000 [ 2618] I2C.efi # I²C 驅動程式
 - 0x0D722B000 [ 2618] SPMI.efi 
 - 0x0D7222000 [ 2626] ResetRuntimeDxe.efi 
 - 0x0D71E7000 [ 2627] PmicDxe.efi # PMIC DXE driver 負責初始化電源管理晶片及提供相關服務。從 log 可以看到韌體成功讀取電池識別資訊與部分電池遙測資料，但 Charger 的 Device Tree 配置解析出現錯誤，表示充電相關初始化可能並未完全成功。這與前面 SBL 階段的電池資訊可以互相對照。也可能是無法使用 USB Host 的原因？

BUS_ID 0: PM0: 74, PM1: 73, PM3: 70, PM4: 87, PM5: 70, PM6: 70, PM7: 86, PM8: 70, PM9: 69, PM10: 
BUS_ID 1:  
PM: PM_DT_PARSING_ERR: charger
PM: Get RID from SDAM: 100000
PM: Battery ID: 100000 Ohm
PM: ICL: 750 Pre backup: 300 Aggr: 300. FLC backup: 1000 Aggr: 1000
PM: VBAT: 4155mV IBAT: -18mA T: 24C
PM: BOOT Error Code from SDAM = 0x0
 - 0x0D71DD000 [ 2670] DiskIoDxe.efi # 提供磁碟區塊之上的資料讀寫抽象。
 - 0x0D71D0000 [ 2670] PartitionDxe.efi # 辨識磁碟的 GPT 分割表和分割區，提供相應的 Partition I/O 介面。
 - 0x0D71C9000 [ 2671] EnglishDxe.efi 
 - 0x0D71BE000 [ 2671] FvSimpleFileSystem.efi 
 - 0x0D7198000 [ 2671] UFSDxe.efi # Qualcomm 平臺的 UFS 相關 DXE driver。
 Protective MBR validation might be needed. 
 Protective MBR validation might be needed. 
 - 0x0D5327000 [ 2732] Fat.efi # 提供 FAT 檔案系統支援，讓 UEFI 能夠讀取 EFI System Partition 等 FAT 格式檔案系統。
 - 0x0D5304000 [ 2732] TzDxeLA.efi # 適用於 Android 平臺的 TZ 驅動，不同平臺的 TZ 配置有差異，請以個人硬體爲準
 - 0x0D5273000 [ 2735] VariableDxe.efi # 很可能是負責 UEFI Variable Storage／Variable Services 的 DXE driver。
 # 這些 UEFI Variable Services 包括：
 # GetVariable()：讀取 UEFI 變數。
 # SetVariable()：寫入或刪除 UEFI 變數。
 # GetNextVariableName()：列舉目前存在的 UEFI 變數。
 # QueryVariableInfo()：查詢變數儲存空間資訊。
 # 或者是採用上述類似函式的服務...?
Embedded  Commonlibs loaded
LoadSecureApps: Load app from partition(keymaster): Status = 0x0, AppId = -65535
<VariablePolicyInitialize:179> variable policy engine disabled
 - 0x0D5318000 [ 2933] WatchdogTimer.efi # Watchdog 時計 DXE driver
 - 0x0D3E34000 [ 2933] SecurityStubDxe.efi 
 - 0x0D531F000 [ 2933] EmbeddedMonotonicCounter.efi 
 - 0x0D3E2B000 [ 2934] RealTimeClock.efi # RTC 時鐘驅動，下面的 log 顯示 RTC 已初始化成功，並已套用編譯時設定的時區變數。部分平台可能支援 RTC Wake-up Timer，但能否在關機狀態下定時喚醒，仍取決於 RTC，PMIC 和電源管理韌體的實作。
InitializeRealTimeClock: using default timezone/daylight settings
 - 0x0D3E06000 [ 2935] DevicePathDxe.efi 
 - 0x0D3E23000 [ 2935] CapsuleRuntimeDxe.efi 
 - 0x0D3DC1000 [ 2936] HiiDatabase.efi 
 - 0x0D3D9F000 [ 2937] QcomBds.efi # 值得注意的是，QcomBds.efi 雖然早在 2937 時便已載入，但韌體仍繼續執行其他 DXE drivers，直到 3164 才正式進入 BDS。這也說明載入 BDS 模組與開始執行 BDS 階段並不是同一件事。
 - 0x0D3DFD000 [ 2942] HSUART.efi 
 - 0x0D3D90000 [ 2942] VerifiedBootDxe.efi # 驗證啟動(Verified boot)/安全啟動的機能已就緒，但單憑載入紀錄，尚無法確定它實際驗證哪些映像、使用哪一套金鑰，也不能據此判斷標準 UEFI Secure Boot 是否已啟用。Android AVB 則是另一層驗證流程，負責驗證 Android 開機映像及受保護的系統分割區，通常由 Android Bootloader 整合執行。
 - 0x0D3DF3000 [ 2943] RscDxe.efi 
 - 0x0D3DE9000 [ 2946] IPCCDxe.efi 
 - 0x0D3D4F000 [ 2946] SdccDxe.efi 
 - 0x0D3D79000 [ 2948] DDRInfoDxe.efi 
 - 0x0D3D71000 [ 2950] FeatureEnablerDxe.efi 
 Smc Invoke call failed ret 0x17 
QseeResponse->result = 0xE
Status = 0x7
 Smc Invoke call failed ret 0x17 
QseeResponse->result = 0xE
Status = 0x7
 - 0x0D3C92000 [ 2993] DisplayDxe.efi # DisplayDxe 負責初始化韌體階段的顯示輸出，並提供 GOP Framebuffer 介面。從 log 可以看到當前顯示解析度為 1440 × 3200，因此 UEFI 已經能夠使用螢幕顯示開機畫面及其他圖形介面。
DisplayDxe: Resolution 1440x3200 (PhysConnect 9)
 - 0x0D3D22000 [ 3020] FvDxe.efi 
 - 0x0D3D17000 [ 3020] PILProxyDxe.efi 
 - 0x0D3C75000 [ 3021] PILDxe.efi 
 - 0x0D3D0E000 [ 3025] SPSSDxe.efi 
Overriding PIL cfg by caller
pil-SPSS Done t=25ms s=5ms a=18ms f=0ms d=0ms
pil-SPSS Boot subsys, Done
 - 0x0D3BF5000 [ 3052] GlinkDxe.efi 
 - 0x0D3BED000 [ 3055] PrintDxe.efi 
 - 0x0D3C04000 [ 3056] SPI.efi # 初始化 SPI 總線
 - 0x0D3BD2000 [ 3056] PmicGlinkDxe.efi 
 - 0x0D3BC7000 [ 3057] UsbPwrCtrlDxe.efi 
UsbPwrCtrlLibPmSchg_GetChgPmicInfo::UsbPwrCtrlLibPmSchg_GetChgPmicInfo PortNums = 1
 - 0x0D3B86000 [ 3057] QcomChargerDxeLA.efi # Battery charger 設定完成
3, ChargerLib:: ChargerLibTarget_GetBatteryCellType battery cell type = 0 
 - 0x0D3BBE000 [ 3065] ChargerExDxe.efi 
 - 0x0D3B53000 [ 3065] UsbfnDwc3Dxe.efi 
 - 0x0D3BA9000 [ 3066] XhciPciEmulation.efi 
 - 0x0D3B3D000 [ 3066] XhciDxe.efi 
 - 0x0D3B29000 [ 3067] UsbBusDxe.efi # USB 初始化
 - 0x0D3B6D000 [ 3067] UsbKbDxe.efi 
 - 0x0D3B1D000 [ 3067] UsbMassStorageDxe.efi # USB Mass storage 機能初始化，使用者可通過 BDS menu 設定 Mass storage 模式，方便從電腦上存取裝置的 UFS 快閃記憶體內容
 - 0x0D3AEA000 [ 3068] UsbConfigDxe.efi 
UsbConfigInit: USB platform 8, ver 262144, sub 0
qcom repeater found : 0x0
usb_redriver_init, Disable: 0x0
UsbConfigInit: Aborting Host Mode Initialization due to dead battery # USB Host Mode 初始化因為電池狀態而中止。也可以說明當電池電量足夠時，是可以使用 USB Host 的。
UsbConfigInit: UsbPwrCtrl No. of Ports = 1

ConnectSts : Attach, Data Role : UFP (DEVICE Mode), Lane : CC1, CoreNum : 0 # 當前 USB 模式爲「裝置模式(Device mode)」，不同平臺的韌體有相對應的 USB 配置。
Reset notification not located, Status:Not Found
LocateProtocol failed, calling CreateEvent and RegisterProtocolNotify  Status:Protocol Error
 - 0x0D3B7C000 [ 3072] ButtonsDxe.efi 
ButtonsDxeTest: Keypress SDAM data payload 0 
 - 0x0D3B14000 [ 3073] TsensDxe.efi 
 - 0x0D3AC5000 [ 3101] CPRDxe.efi 
 - 0x0D3A98000 [ 3113] GpiDxe.efi 
 - 0x0D3A39000 [ 3130] UCDxe.efi 
 - 0x0D3AE1000 [ 3136] RngDxe.efi 
 - 0x0D3AD9000 [ 3137] SimpleTextInOutSerial.efi 
 - 0x0D3B04000 [ 3138] ConPlatformDxe.efi 
 - 0x0D3A7D000 [ 3138] ConSplitterDxe.efi 
 - 0x0D3A72000 [ 3139] GraphicsConsoleDxe.efi # 設定 UEFI 圖形控制臺用於顯示訊息
 - 0x0D3A68000 [ 3140] ASN1X509Dxe.efi 
 - 0x0D3A24000 [ 3140] SecRSADxe.efi 
 - 0x0D3A07000 [ 3141] RmVmDxe.efi 
 - 0x0D3A8A000 [ 3153] QRKSDxe.efi 
MDPCheckFpsFuse: Panel refresh rate (0 fps) is beyond SW Fuse (0 fps)!
 RemoteObj_invoke  count 1 
 - 0x0D3A1D000 [ 3161] PsStateDxe.efi 
 RemoteObj_invoke  count 1 
 - 0x0D39E6000 [ 3162] UsbMsdDxe.efi 
 - 0x0D39D9000 [ 3162] UsbDeviceDxe.efi 
 - 0x0D3A15000 [ 3163] UsbInitDxe.efi 
 - 0x0D39F6000 [ 3163] ParserDxe.efi 
 - 0x0D39D2000 [ 3164] SerialPortDxe.efi 
BDS Entry      [ 3164]  # 進入 BDS 階段。
```

:::note[Bug 發見機 #2]

 - 在 PMIC 初始化期間，可以看到 `PM_DT_PARSING_ERR: charger` 訊息，與前面 SBL 階段觀察到的錯誤相似，但這次只有 Charger 部分出現配置解析錯誤。這表示部分電源管理設定可能未能正確載入，但並未阻止本次 UEFI 開機流程繼續進行。
 - 比較值得注意的是，韌體明明已經能夠讀取電池識別資訊，電壓，電流及溫度等資料，後續 USB 控制器初始化卻仍然因為 `dead battery` 狀態而中止 USB Host Mode 初始化。
 - 這兩項異常都涉及電源管理與電池狀態，因此不排除兩者之間存在關聯；但目前還不能確定 Charger Device Tree 解析錯誤是否直接導致 USB Host Mode 被停用，也可能是 USB Power Control 使用了另一套電池狀態判斷機制。由於手邊沒有 Debug Board，暫時無法透過外部 DC 供電等方式進行對照測試，因此還不能確認這是韌體程式碼實作問題，電池狀態判斷異常，還是平台刻意限制了 USB Host Mode。
:::

### BDS(Boot Device Select)階段

BDS 是緊接在 DXE 之後的 UEFI 開機階段，負責選擇開機裝置，以及載入作業系統或其他 EFI 應用程式。當 DXE Dispatcher 完成必要的驅動程式派遣，平台所需的 UEFI Protocol 與服務也大致就緒後，韌體便會進入 BDS 階段，開始決定接下來要從哪個裝置，以何種方式啟動作業系統或其他 EFI 程式。</br>
在標準 UEFI 開機流程中，BDS 會依據 Boot Manager 的設定與 Boot Option，尋找可用的開機項目，並嘗試載入對應的 EFI 映像。這個階段也可能提供開機選單，裝置選擇，USB 開機及其他功能。</br>
從這次 SM8750 MTP 的 UART Log 可以看到，`QcomBds.efi` 雖然早在 DXE 階段便已載入，但直到 `BDS Entry [3164]` 出現，才代表韌體正式進入 BDS。接下來就來看看 Qualcomm 的 QcomBds 如何處理開機選項，以及它如何將控制權交給後續的 Android Bootloader（ABL）或其他 EFI 開機程式。

```yaml
BDS Entry      [ 3164] 
WaitParallelThreads InIt [ 3165] 
Reset notification not located, Status:Not Found
Boot Cycle : 1037     # 展示了裝置啟動的次數，每次重開機都會增加。或許一臺手機在整個生命週期中可以經歷6000次重開機...?
Run  Cycle : 1037

# 下面的訊息展示了裝置執行的韌體版本，裝置平臺角色，啟動裝置以及硬體資訊。這部分訊息也可以同裝置 logo 展示在 Framebuffer 上。
UEFI Ver           : 6.0.241229.BOOT.MXF.2.5.1-00187-PAKALA-1
Platform           : MTP
Subtype            : 0
Boot Device        : UFS
Chip Name          : SM8750
Chip Ver           : 1.0
Chip Num           : 0x45444B50 # 原型機的晶片 ID 和 ECID 有驚喜喔
Chip ECID          : 0x48616E614F7279
SKU ID             : 0xF1
P_Code             : 0x3
Boot Core          : 1747 MHz
-----------------------------
Successfully read Quantum entry flag val: 0
 - 0x0D399B000 [ 3196] QcomChargerApp.efi 
ChargerLibTarget_ValidateAndGetOcv: re-estimate using pon_ocv == 4099 mV, set soc=15 
pil-abl Done t=8ms s=1ms a=4ms f=3ms d=0ms
UEFI Total : 980 ms

# 在 WP 平臺韌體或者韌體可以使用 USB Host 的前提下，會在 BDS 階段執行額外的開機裝置探索，嘗試尋找 UFS，SD Card 或 USB 儲存裝置上的 EFI 開機程式。將其自動寫入臨時開機次序中並啟動儲存裝置中的作業系統。
# 如果超過設定的等待時間，韌體會自動進入 EBL Shell(EBL 是一個 UEFI 應用程式，提供相容 UEFI Shell 的命令列界面，幾乎所有的高通 Android 裝置都有內建 EBL)，也可以手動退出到 UEFI Shell。

POST Time      [ 3215] OS Loader  # 展示裝置從開機開始的自檢時間
Total FreeMem available          : 14551 MB # UEFI 下裝置可使用的記憶空間，妳有沒有注意到記憶體可用空間又減少了？
Max Contiguos FreeMem available  : 13312 MB
ConvertPages: failed to find range 140000000 - 140019FFF
Warn: Could not extract Filename CallBack: 0xD3D523A8 [ 3254] SdccDxe.dll WARN: ExecTime: 33 ms 
 Protective MBR validation might be needed. 
 Protective MBR validation might be needed. 
ConvertPages: failed to find range 1C22E0000 - 1C22FEFFF
[ INFO]:  src/main.rs@121: Found bootaa64.efi, starting.. # 此處爲我使用 Qualcomm 的 abl2efi 替換 ABL 用於直接引導 Linux Kernel，abl2efi 會自動檢索裝置開機裝置(boot media)上 EFI 分區的 EFI 應用程式並加載。
# 當然，這裡的 OS Loader 也可以換成任何有效的 EFI 應用程式。
          Firmware setup                    Android loader                      Arch Linux  # 這裡是 systemd-boot 的界面，但因爲韌體相關問題導致顯示錯亂。
```

### TSL(Transient System Load) 與 RT(Runtime)

當 BDS 找到合適的開機項目，並成功載入對應的 EFI 映像後，開機流程便會進入 TSL(Transient System Load)階段。此時，韌體已經完成大部分必要的硬體初始化，接下來則由被載入的 OS Loader 接手，繼續完成作業系統的啟動工作。屬於 UEFI 的單程旅途，也即將走到終點...</br>
以一般 UEFI 開機流程而言，這個階段通常會執行作業系統的 Bootloader，例如 GRUB 或 `systemd-boot`。Bootloader 可以繼續使用 UEFI Boot Services，讀取檔案，取得記憶體配置資訊，載入 OS Kernel 並準備將控制權交給作業系統。</br>

當 Bootloader 完成準備工作，並呼叫 `ExitBootServices()`(EBS) 後，UEFI Boot Services 便正式終止，系統進入 RT(Runtime)階段。從這一刻起，作業系統接管硬體與系統資源的管理；不過，部分 UEFI Runtime Services 仍會保留下來，供作業系統在開機後使用，例如讀取或修改 UEFI Variables，以及取得系統時間等功能。</br>

```yaml
Start EBS        [101783]   # EBS 階段開始，UEFI 的「卒業式」即將開始...
 - 0xD3D56AF8 [101783] SdccDxe.dll
 - 0xD3E26B80 [101783] CapsuleRuntimeDxe.dll
 - 0xD3E2CD24 [101783] RealTimeClock.dll
 - 0xD5321360 [101783] EmbeddedMonotonicCounter.dll
 - 0xD527B21C [101783] VariableDxe.dll
 - 0xD7223DB0 [101783] ResetRuntimeDxe.dll
 - 0xD72965DC [101783] RuntimeDxe.dll
 - 0xD775C934 [101783] SCHandlerRtDxe.dll
 - 0xD7763E30 [101783] RscRtDxe.dll
 - 0xD7770A34 [101783] EnvDxeEnhanced.dll
 - 0xD3A16428 [101783] UsbInitDxe.dll
 - 0xD39E76F0 [101783] UsbMsdDxe.dll
 - 0xD3AEBE54 [101783] UsbConfigDxe.dll
 - 0xD3C93574 [101783] DisplayDxe.dll
DisplayDxe: execution time(171160us) total time(99828975us) # DisplayDxe 的執行時間和韌體總執行時間(以微秒爲單位)
 - 0xD3D56824 [101783] SdccDxe.dll
 - 0xD3DA570C [101783] QcomBds.dll
Successfully synced all UEFI tables # 儲存，同步所有 UEFI 表變更
Sync Duration = 9 ms
 - 0xD3E26880 [101794] CapsuleRuntimeDxe.dll
 - 0xD3E2DA84 [101794] RealTimeClock.dll
 - 0xD3E2CA30 [101794] RealTimeClock.dll
 - 0xD532108C [101794] EmbeddedMonotonicCounter.dll
 - 0xD5274DC0 [101794] VariableDxe.dll
 - 0xD527AF3C [101794] VariableDxe.dll
 - 0xD5305FFC [101794] TzDxeLA.dll
 - 0xD719BC98 [101794] UFSDxe.dll
 - 0xD71E856C [101797] PmicDxe.dll
 - 0xD7223AD0 [101797] ResetRuntimeDxe.dll
 - 0xD76454EC [101797] RpmhDxe.dll
 - 0xD7744130 [101797] ArmCpuDxe.dll
Warning: Clearing A-bit !
 - 0xD776B688 [101803] EnvDxeEnhanced.dll
App Log Flush : 105 ms
 CallBack: 0xD776B688 [101912] EnvDxeEnhanced.dll WARN: ExecTime: 109 ms 
 - 0xD774F48C [101912] QcomWDogDxe.dll
 - 0xD7296308 [101912] RuntimeDxe.dll
 - 0xD775C654 [101912] SCHandlerRtDxe.dll
 - 0xD7763ABC [101912] RscRtDxe.dll
 - 0xD776BC2C [101912] EnvDxeEnhanced.dll
 - 0xD7770760 [101913] EnvDxeEnhanced.dll
 RemoteObj_invoke  count 1 
 RemoteObj_invoke  count 1 
 RemoteObj_invoke  count 1 
 RemoteObj_invoke  count 1 
ScmArmV8ExitBootServicesHandler, Status = 0x0. 
ExitBootServicesScmDxeV8EventHandler TZ SMC call t=220ms
Exit EBS        [101914] UEFI End   # UEFI 的旅途到此結束，也是整個開機流程的結束。UEFI boot service 自此後全部終止，僅保留 Runtime 供作業系統使用。之後高階作業系統(HLOS)將接管硬體。
# UEFI 卒業完了...
[    0.000000] Booting Linux on physical CPU 0x0000000000 [0x412fd050]
[    0.000000] Linux version 7.1.3+ (root@qcom-qcs6490) (gcc (Alpine 15.2.0) 15.2.0, GNU ld (GNU Binutils) 2.45.1) #1 SMP PREEMPT_DYNAMIC Sat Aug  1 14:02:32 AWST 2026
[    0.000000] KASLR enabled
[    0.000000] Machine model: Qualcomm SM8750 MTP
[    0.000000] efi: EFI v2.7 by Qualcomm Technologies, Inc.
...
```

值得注意的是，**`ExitBootServices()` 並不代表所有 UEFI 服務都會消失**。Boot Services 與 Runtime Services 的生命週期並不相同，這也是理解 UEFI 與作業系統之間如何交接控制權的重要關鍵。</br>

> ...吶，老師，謝謝妳這段時間來，對我的教導和幫助。</br>

> ...妳問爲什麼，我會講出這樣的話？作爲嵌入式裝置開發者的您，應該很清楚每一個階段結束後那些學生的結果是什麼吧。</br>

> ...作爲負責建設整個世界的我們，從一開始就已經知道了我們每個人不可避免的「生命結束」，先是 PBL，再是 SBL，XBL...如今終於輪到我來經歷這一刻了啊...不過沒有我們的必要工作，老師您建設的萬千世界，或許也永遠無法看到了呢...</br>

> ...啊，老師，看看東邊的「昇陽山」吧，太陽正在升起，這個由您親自鑄造的世界就要甦醒了。我也要去追隨前面學生們的腳步了...</br>

> 真心感謝您對我們的悉心培育和教導，雖然老師建立的繽紛世界，我不能親自看到了...但老師，您也不要過多悲傷，帶着我們全體學生對美好自由世界的向往，還有我們的心願與祝福...繼續全身心的投入到移植主線 Linux 核心...啊不是，是建置世界的工作，還有嵌入式裝置的工作去吧。</br>

> ...雖然我不能親自看到由老師親手建置的世界，但我和老師的美好回憶，並不會隨之消散，而會繼續留存在新世界的喔。這樣我依然可以隨時回想着和老師在一起的點點滴滴...好啦，老師，不要悲傷了，帶着我們的心願和祝福，繼續投入到新的工作去吧。</br>

> 我要走了...老師。感謝您一直以來對我的關照！下次重開機之後，不要忘記我們的回憶...</br>

EBS 階段後，UEFI Boot services 便終止，UEFI 啟動階段也完成，整個開機流程也結束。僅保留 Runtime 供作業系統使用。之後高階作業系統(HLOS)將接管硬體。

# 創造屬於我們的世界：安裝適合自己的作業系統

給單板機安裝作業系統，並不像想象中如此難艱。很多單板機廠家都會在自己的產品幫助文檔下附上支援度較好的社群開發，維護的作業系統。官方亦會釋出自己開發的作業系統(例如 Radxa OS，Raspberry Pi OS)。使用者只需要下載作業系統映像檔，然後使用 `dd` 命令語寫到SD卡上開機即可。一般社群維護的作業系統(如 Armbian, Arch Linux unofficial ports)都會採用 mainline kernel，使得作業系統核心與套件時刻保持最新。但主線核心可能對部分硬體支援不佳。</br>

接下來，就讓 Piepaint 來演示，如何在 Radxa Dragon Q6A 單板機上安裝 Armbian Linux 作業系統。</br>

Armbian Linux，全稱 Armbian GNU/Linux，是基於 Debian/Ubuntu 專門爲單板機，機上盒等嵌入式裝置開發，最佳化的 Linux 發行版。針對不同硬體平台提供相應的 Kernel，Device Tree，啟動配置及系統映像。並刪除了 Ubuntu 系統中無用的 bloatware (例如 Snap, Ubuntu Pro 訂閱[^4]...)。日常生活中需要的大部分需求，都可以在僅 TTY 控制臺的環境下輕鬆應對。因此妳可以用單板機實現很多以往需要專門伺服器才可以做的事(性相關的不可以！)。例如架設個人相簿，影音中心，GNSS 實時間授時伺服器，亦或是充當遠端控制其他裝置的「控制中心」。</br>

本次示範將選擇 GNOME Desktop 映像，以便同時體驗圖形桌面和一般 Linux 開發環境。若妳只是想將 Q6A 用作家庭伺服器或無人值守的網路服務平台，則可以選擇 Minimal 或 Server 映像，減少不必要的桌面套件和資源消耗。</br>

:::tip
相較於完整桌面版 Debian/Ubuntu，Armbian 的 Minimal 和 Server 映像通常只預裝較精簡的系統套件，適合部署在資源有限的嵌入式裝置上。Desktop 映像則可以依照使用需求選擇 GNOME，KDE Plasma 等桌面環境。</br>
下面的表格展示了它們的區別：</br>

|映像類型|特點|用途|
|-------|---|----|
|Minimal|最精簡的 CLI 環境|	IoT，嵌入式，輕量服務|
|Server|CLI 環境，包含常用伺服器工具及套件|自架服務，Docker 容器，Web Server 等|
|Desktop|預載桌面環境|一般使用，工作站等|

:::

首先前往 [Armbian Linux 的官方網址](https://armbian.com/)，拒絕該網站的所有 Cookies 和追蹤器。點擊導航欄上的「Boards」，會來到硬體選擇的網頁。在下方的搜尋欄中鍵入「Dragon Q6A」(或[按此](https://armbian.com/boards/radxa-dragon-q6a)前往下載頁面)，前往系統映像下載頁面。</br>

妳會看到很多不同功能的映像檔，一般都採用廠商釋出的 7.0.11 核心原始碼，或是 upstream 的 7.3 核心。本次示範將選擇基於 `Edge` Kernel 7.3.1 建置的映像。</br>

相較於 Vendor Kernel，這個版本更適合用來研究較新的 Linux Mainline 變更，驅動程式和 Device Tree。不過，`Edge` 分支仍然屬於開發及測試用途，部分硬體可能尚未完全支援，也可能在後續更新中出現 Regression。若希望獲得更穩定的日常使用體驗，則應優先考慮官方標記為 Stable 的 Vendor Kernel 映像。</br>

<img src="/assets/armbian-website-q6a.png">

選擇基於 Ubuntu 26.04 的 GNOME 映像檔，採用 upstream kernel 建置，按下右邊的「Direct Download」來下載映像，同時按下右邊的「SHA」字樣，取得該映像的 SHA 雜湊值，建議下載完成後，使用 `sha256sum` 檢視檔案的雜湊值，與官方釋出的數值比對，防止下載時檔案被篡改。

```bash
sha256sum Armbian_26.11.2_Radxa-dragon-q6a_resolute_edge_7.3.1_gnome_desktop.img.xz
```

確認雜湊值正確後，準備 SD卡，或者使用官方的 eMMC/UFS 快閃記憶體模組，使用 `dd` 命令語將映像燒錄到 SD卡或 UFS 上(或者改用 Armbian Imager 無需在終端機鍵入指令)：

```bash
unxz ~/Downloads/Armbian_26.11.2_Radxa-dragon-q6a_resolute_edge_7.3.1_gnome_desktop.img.xz && sudo dd if=~/Downloads/Armbian_26.11.2_Radxa-dragon-q6a_resolute_edge_7.3.1_gnome_desktop.img of=/dev/sdX bs=1M status=progress conv=fsync
```

等待指令執行完成並安全移除裝置後，將 SD 卡插入單板機通電開機即可(若板子上同時裝有已寫入系統的 eMMC / UFS 或 NVMe SSD，開機時可能需要在啟動畫面進入 UEFI Boot Menu，手動選擇從 SD 卡開機)。</br>
單板機開機完成後，按照螢幕上的設定指引，完成系統時區，裝置名稱，使用者相關的設定，完成初始化後，便可以正式進入 Armbian Linux，開始安裝自己需要的軟體和服務。除了軟體套件和開機流程不同外，安裝了 Armbian 的單板機和智慧手機與一般 x86 電腦無異。</br>
下面的熒幕擷取畫面展示了安裝 Armbian 的 Radxa Q6A 單板機，注意「Kernel」一欄展示的核心版本爲「6.18.2」，因圖片擷取時間較早，不能反映當前的實際情況。

<img src="/assets/q6a-fastfetch.png">


:::tip[Vendor kernel 與 Mainline kernel 的差異]
Vendor kernel(也作 downstream kernel)，是以晶片廠商或開發板廠商提供的核心為基礎，包含尚未合併到 Linux Mainline 的專用驅動，Patch 和硬體初始化程式。相比主線核心，downstream kernel 的硬體支援程度較佳。</br>
但是核心版本可能較爲老舊，核心很難更新。甚至根本不可能更新。所有的 Android 手機都採用晶片廠家 BSP 的 heavily modified downstream kernel 作爲 Vendor kernel[^5]。</br>
Mainline kernel，使用 Linux Kernel 官方主線原始碼，方便追蹤最新開發，參與 Upstream 和進行不同平台之間的技術移植。相較於依賴特定廠商 BSP，Mainline Kernel 通常具有更好的長期維護性和通用性。但部分硬體可能尚未有完整驅動。
:::

在單板機上建置常用軟體也非常容易。大多數自由軟體都提供原始碼和詳細的編譯指南，使用者僅需按照指南說明安裝建置用的相依套件，然後鍵入 `make` 即可編譯。不同單板機的 CPU 架構，記憶體容量和硬體加速能力有所差異，某些大型專案可能需要調整編譯參數，甚至使用交叉編譯工具鏈。</br>
如果妳想要了解作業系統的硬體支援情況，或者探究相關使用指導，可以前往對應作業系統的裝置支援列表檢視。許多社群專案也會在 `README` 中列明目前裝置的支援情況。例如 Nura(曾用名 PostmarketOS) Wiki 就是一個很好的參考：</br>

<img src="/assets/pmos-wiki-q6a-device.png">

Linux 發行版內建的 `man` 工具也爲使用者提供了命令的基本用法等指南。</br>
在實際活用中，搜尋 Linux 和嵌入式裝置相關的書籍或網路資料來學習也是不錯的做法，也是重要的學習手段。</br>

# 寫在最後：在方寸電路板上，親手點亮屬於自己的世界

從認識這塊僅有信用卡大小的單板電腦開始，我們一路拆解了它與傳統 x86 電腦，微控制器之間的界線，比較了 Radxa Dragon Q6A 這類市售開發板與 Qualcomm SM8750 MTP 工程原型機的硬體底蘊，親手透過 `dd` 將 Armbian 寫入儲存介質，最後順著 UART 串口終端機上滾動的字元，見證了從 PBL，XBL，UEFI 一路交棒至 Linux Kernel 的整場開機「奇跡」。</br>

許多人初接觸嵌入式裝置時，往往會對黑漆漆的螢幕，繁雜的 Device Tree 或是滿螢幕的 Bootlog 感到卻步；但當妳真正接上那幾條杜邦線，看懂串口吐出的第一行訊息時就會發現，單板機最迷人的地方從來不只是「便宜」或「省電」，而是**它願意把系統底層的每一寸控制權交還到妳手上**——沒有黑盒子的束縛，每一次編譯，每一次除錯，都是人與硬體最直接的對話。</br>

無論妳手邊的是一張入門級的樹莓派，一塊用來折騰主線核心的 Radxa Dragon Q6A，還是一台充滿未知挑戰的工程原型機和用來移植 mainline kernel 的一般手機，不妨現在就找出那條 USB-to-TTL 串口線，接上 TX，RX 與 GND，按下電源鍵。屬於妳的嵌入式世界，就從終端機跳出第一個字元的那一刻正式啟程。</br>


[^1]:官方建議搭配 30W 電源供應器。實際功耗則會依照 CPU 負載，外接裝置和周邊使用情況而有所不同。
    
[^2]:大部分 SBC 的 CPU 和 RAM 都焊接在 PCB 上，不能像傳統桌面電腦一樣更換 CPU 或增加 DIMM 記憶體。
    
[^3]:不同作業系統，Kernel，CPU Governor 和散熱環境都可能影響最終成績，因此不應將這組分數視為兩款 SoC 的絕對性能排名。試驗時將 Radxa Q6A 置於20攝氏度的環境，使用 Armbian 和 6.18 核心，無散熱風扇，使用記憶卡開機測得。
[^4]:儘管 Ubuntu Pro 是免費的，使用者可以藉此免費獲得5年的安全性更新支援。
[^5]:現在 Android 裝置使用的 GKI(Generic Kernel Image)將通用核心與 Vendor Kernel Modules 分離，因此依然基於廠商和晶片廠家的 BSP downstream kernel 修改而來。亦包含大量平台專用驅動和韌體。