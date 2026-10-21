---
title: Libre NT 作業系統體驗 ~ 世上第一個 ReactOS 發行版，支援轉譯 x86 Windows 應用程式
published: 2026-10-18
description: Libre NT 作業系統體驗，支援 x86, Arm, PowerPC 和 RISC-V 的自由 Windows 實作
image: 'assets/libre-nt-vm.png'
tags: [FOSS, ReactOS, ARM, KVM, Windows]
category: 'ReactOS, Libre NT & Windows related'
draft: false
lang: 'zh_TW'
---

繼 ReactOS 之後，又一個開放原始碼的相容 Windows 的作業系統，支援 x86. Arm. PowerPC 和 RISC-V 等多種硬體架構！我終於可以毫無隱憂的使用 Windows 了...(?)</br>

# Libre NT 作業系統紹介

[Libre NT](https://libernt.com/)專案是一個 ReactOS 發行版。該專案由 ahmedarif193 開發。根據專案 `README` 的說法來看，Libre NT 是以相容 Windows 11 和 NT kernel 爲目標開發，並同時支援 x86, Arm, RISC-V 和 PowerPC，亦提供轉譯 x86 應用程式的能力。專案成立於 2026年9月30日，僅僅只有2週。因此硬體支援有限，x86 除外的硬體僅支援 Rasperry Pi 4 & 5, 還有 QEMU。不過 Arm 映像檔似乎有問題，KVM 開不起來，只能改用效能較慢的 QEMU TCG 模擬。</br>

# Libre NT 硬體支援資訊

目前 Libre NT 官方支援的裝置僅有 QEMU KVM，Rasperry Pi 4 & 5 和 Banana Pi BPI-F3 RISC-V 單板電腦。x86 裝置僅有 LattePanda MU 單板電腦支援。若裝置可以使用 ReactOS 的映像開機，那該裝置理應可以使用 Libre NT 釋出的映像檔直接開機檢視裝置硬體的運作情況。例如 [Thinkpad x280](https://github.com/ahmedarif193/LiberNT/issues/19)。</br>

# Libre NT 體驗

因爲身邊缺乏可以支援 Libre NT 開機的裝置，只好通過 QEMU 來體驗。</br>
目前 Libre NT 沒有 installer 安裝作業系統到硬碟，僅能下載釋出的 `img` 映像檔，然後裝載到虛擬機器中去。</br>
如果想要安裝在自己的裝置上，把隨身碟插入裝置，然後用 `dd` 命令將映像寫到隨身碟中去。雖然是相容 Windows 的作業系統，但也可以使用 `dd` 命令燒錄映像，不需要像 Windows 一樣需要藉助類似 `WoeUSB` 之類的程式燒錄。</br>
</br>
因爲官方釋出的 Arm64 映像檔在我的筆電上有開機後無畫面的問題，只好改用 x86 架構的映像檔跑。不過 Snapdragon X Elite 的 CPU 效能足夠強，即使轉譯 x86 架構的系統跑也絲毫不會感到慢，而一般的 x86 筆電通過 QEMU TCG 跑 Arm 系統卻就像在放投影片一樣了。</br>
</br>
通過 `qemu-img resize` 命令語將映像檔空間擴充到 32GiB，然後打開「Virt Manager」。虛擬機架構選擇「x86_64」；虛擬化方式選擇「QEMU TCG」，使用 Libre NT 映像檔作爲虛擬硬碟開機。</br>

<img src="/assets/ros-first.png">

默認安裝之後的系統就是這樣，除了系統內建的工具程式和基於 `winget` 套件管理員的 `RosGet` 之外，沒有任何第三方軟體。系統默認以「User」使用者登入，沒有密碼。如果擔心個資隱憂，可以使用 `net user username * /add` 命令語建立新的使用者。如果覺得虛擬機使用不太順暢，可以安裝 Virtio 虛擬機驅動程式來改善。Libre NT 可以吃到虛擬機的 OpenGL 加速。</br>
</br>

## 系統體驗

比起上游 ReactOS 而言，Libre NT 的 GUI 換成了重新開發的 `DWM` 。不要認爲它和 Linux 的視窗管理員有關係，`DWM` 在 UI 設計上有點像是 Windows 11 和 Windows 10 的結合體。因爲是基於 ReactOS 的發行版，因此原來 Windows 和 ReactOS 的設計思想都可以在這個作業系統上看到。包括登錄編輯程式，模仿 WinUI3 的任務管理員，幾乎所有人都熟悉的「C槽」「D槽」等等。</br>

<img src="/assets/libre-nt-new-taskmgr.png">

Libre NT 的 `explorer`(檔案總管)與現在的 Windows 11 和 ReactOS 不同。Libre NT 棄用了控制台和登錄編輯程式的入口，而是直接內建於檔案總管中。目前版本的 Libre NT 檔案總管還不像 Windows 11 那樣支援多標籤頁。</br>

<img src="/assets/libre-nt-explorer.png">

至於系統自帶軟體則是基於 Wine 專案的組件修改而來。程式相容性可以向前相容到 Windows 2000。在 Arm 裝置則會使用 WoW64, ARM64EC 和 FEX emulator 用於轉譯 non-native 程式。</br>

## 軟體安裝

Libre NT 的軟體安裝方法大致同 Windows 10 之後的 Windows 版本。當然系統也提供類似於 GNOME software 的軟體中心(都是自由軟體了，也就沒有「軟體商店」的概念了)，裡面收錄各式各樣的軟體。可直接檢索軟體名稱或對應類別來安裝，當然也可以從 Google 上自己抓，只是安全性無法保證而已。</br>
另外，如果妳偏好 Linux 的套件管理員，Libre NT 也提供 `rosget` 套件管理員，方便 Linux 使用者適應 Libre NT 的軟體環境。</br>

## 中文言語和輸入法

Libre NT 同它的上游 ReactOS 一樣，支援簡體中文和正體中文。然而系統並未內建中文輸入法，需要使用者自行安裝。</br>
我使用 [Rime 中州韻輸入法](https://rime.im/download/)，支援注音，拼音，倉頡等輸入方式。使用正體中文作爲系統語言時，可能會遇到部分漢字顯示爲方框，亂碼等問題，可以安裝其它支援中文的字體來解決。</br>

# 後記

使用 Libre NT 最不便的是在網路上搜尋資料時，常常會給我返還一個 Windows 核心相關的 Powershell 指令稿，其 GitHub 專案也叫[Libre NT](https://github.com/thepanoc95/LibreNT)，還有 Libre hardware monitor。不過現在 DuckduckGo 已經補正了這個問題。</br>
另外，ReactOS 和 Libre NT 這兩個作業系統的關注度比起 Windows 而言也要小很多。尤其是 ReactOS，其 Arm64 映像檔甚至無法在 QEMU 上開機...由此看來，Libre NT 更多的是爲熟悉 Windows 系統，但討厭專有軟體的使用者設計的。如果對自由軟體需求一般，甚至也不在意自己個資安全和隱私的人，還是繼續使用 Windows 吧。對於在乎個人隱私的人，使用 Linux 會比使用 Libre NT 要好吧...</br>