---
title: EasyEffects 軟體紹介 -- 調整 Linux 電腦 EQ，拯救破爛喇叭
published: 2026-07-01
description: 如果妳的裝置喇叭在 Linux 下表現不好，又不想外接喇叭，妳應該試試「EasyEffects」增強音質...
image: 'assets/easyeffects-preview.png'
tags: [FOSS, Linux, Audio]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

今天 Piepaint 要來介紹的軟體是「EasyEffects」，用於調整 Linux 裝置的 EQ，讓 Linux 下的音樂鑑賞也能媲美 Windows 杜比音效。

# EasyEffects 軟體紹介

[Easy Effects(以前叫「PulseEffects」)](https://github.com/wwmm/easyeffects) 是 Wellington Wallace 開發的開源音效軟體，內建多種等化器(EQ)，壓縮器，增益，混響效果，可以有效改善 Linux 裝置喇叭，麥克風的聽感和音質。妳可以使用預先設定好的設定檔(Presets) 匯入，改善裝置音質，即使不會調整等化器參數也無所謂。</br>
早期版本使用 GTK 作爲程式 UI 介面，現在採用 QT 實作了。

# 安裝 EasyEffects 軟體

PulseEffects 以前支援 PulseAudio，更新後改爲僅支援 Pipewire。目前 Arch Linux 和 Fedora 都應該使用 Pipewire 音訊伺服器了，如果妳仍然使用 PulseAudio，請安裝 Pipewire 相關套件，從 PulseAudio 轉換到 Pipewire。轉換完成後，在終端機執行 `pactl info` 檢視 「Server name」是否出現「Pipewire」:

```bash
hamoa@fedora ~ » pactl info                          
Server String: /run/user/1000/pulse/native
Library Protocol Version: 35
Server Protocol Version: 35
Is Local: yes
Client Index: 305
Tile Size: 65472
User Name: hamoa
Host Name: fedora
Server Name: PulseAudio (on PipeWire 1.6.7)         # 正在使用 Pipewire 音訊伺服器
Server Version: 15.0.0
Default Sample Specification: float32le 2ch 48000Hz
Default Channel Map: front-left,front-right
Default Sink: alsa_output.platform-sound.HiFi__Speaker__sink
Default Source: alsa_input.platform-sound.HiFi__Mic__source
Cookie: dadd:7a4c
```

確認系統使用 Pipewire 後，就可以通過 Flatpak 或 Fedora DNF 套件庫 `dnf install easyeffects` 安裝 EasyEffects 了。

```bash
flatpak install flathub com.github.wwmm.easyeffects
```

# 匯入音效組態

EasyEffects 雖然功能很多，可是不熟悉做音樂的人根本不懂要調節哪些選項。對新手而言，最好的方法是匯入別人設定好的預設檔進行試驗，然後根據個人喜好進行調整。</br>

<img src="/assets/easyeffects-app.png">

[EasyEffects Wiki](https://github.com/wwmm/easyeffects/wiki/Community-presets) 有列出很多範本，選擇個人喜歡的，從 GitHub 下載 `.json` 檔案。</br>
</br>
之後開啓 EasyEffects，點選左下「Presets」， 再點選「Import presets file」，匯入下載的 `.json` 檔。然後載入要使用的設定檔即可。

<img src="/assets/easyeffects-app-guide.png">

我推薦 [JackHack96 製作的 「Loundness + Autogain」](https://github.com/JackHack96/EasyEffects-Presets)，對音質不好的筆電喇叭效果很不錯，聲音變大，細節變多。</br>

也可以自訂設定檔，只需點選「Add effects」，添加妳想要的增益效果，調整參數，匯出當前設定檔就可以了。</br>

之後，再次點選「Presets」，點選「Autoload」，選擇默認音訊裝置，再選擇要套用的設定檔來設定自動套用的組態。</br>

最後，點選右上角的「進階選項」，打開「Preferences」，勾選「Autostart on login」設定 Easyeffects 隨使用者登入後自動啓動。

# 調整音效

啓用音效後，EasyEffects 就會展示正在播放音樂的應用程式了，如不想要當前程式套用音效，可以勾選「Exclude」將程式排除在外。

<img src="/assets/easyeffects-player.png">

點選「Output」面板，自由調整音效效果。

<img src="/assets/easyeffects-effects.png">


# 後記

Piepaint 認爲 EasyEffect 對於筆電和手持裝置非常有用，例如我手上的 Lenovo Yoga Slim 7x 喇叭成爲了廠商 cost-down 的對象，外放音樂音量非常小，乾巴巴的，有種塑料感，低音效果不如之前用的 MacBook Air 好。雖說我有 JBL 藍牙音響了，不過我不想帶着一組喇叭到處走啊...</br>
在安裝 EasyEffects 之後，雖然不如 Windows 11 Arm 下的杜比音效那麼不錯，卻足以提升我的喇叭音量，音質也有所改善。筆電外放音樂也更加「悅耳」了一些。