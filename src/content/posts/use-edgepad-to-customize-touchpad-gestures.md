---
title: 讓筆電觸控板機能多樣化——使用 Edgepad 自訂 Linux 筆電觸摸板邊緣手勢
published: 2026-10-12
description: 使用 Edgepad 客製觸摸板的手勢動作，媲美 macOS 的使用體驗！
image: 'assets/edgepad-demo.gif'
tags: [FOSS, Linux]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

在安裝了 Linux 作業系統的筆電上通過使用 Edgepad + 自訂配置檔，實現自訂 Wayland 協定下桌面環境的觸控板手勢動作，擴充觸摸板的機能。</br>

目前被 Linux 支援的桌面環境中，對於筆電觸摸板和觸摸螢幕支援比較好的應該是 GNOME 和 KDE Plasma。特別是 GNOME，對於觸摸板手勢的支援基本良好，在 Wayland 顯示協定下也不會有嚴重的問題。自GNOME 42之後支援良好，幾乎沒有bug了。只是相比支援客製化的 Plasma 桌面和其它允許使用者自由組裝桌面元件的視窗管理員而言，GNOME 默認的觸摸板手勢功能簡單。可也同樣有較強大的擴展能力。</br>
這篇文章要講的就是在 Linux 下使用 Edgepad 手勢自訂軟體，客製化觸摸板的邊緣手勢(Edge gestures)，從而擴充觸摸板的手勢功能。</br>

# Edgepad 軟體紹介

[Edgepad](https://github.com/assembledev/edgepad) 是由 assembledev 開發的開放原始碼的自由軟體，主要用 Rust 寫成，允許使用者通過自訂手勢來調整音量大小，熒幕亮度，以及執行自訂指令稿。根據專案的 `README` 檔案來看，任何採用 Wayland 顯示協定的桌面和 WM 都可以使用這一程式。目前該專案僅有釋出64位元 x86 的二進位檔，如果筆電是 Arm 或 RISC-V 架構的 CPU 還需要使用者自行從原始碼編譯才可以使用。</br>

# 系統需求

Edgepad 需要妳的 Linux 桌面環境支援 Wayland 顯示協定才可以使用，因爲僅有 Wayland 顯示協定支援手勢與多點觸摸等較新的 features。X Libre 和傳統 Xorg 不受支援。</br>
打開終端機，鍵入 `echo $XDG_SESSION_TYPE` 命令語來檢視當前使用的顯示協定。目前(2026年)主流的 Linux 發行版已全部遷移到 Wayland 顯示協定。儘管 Wayland 問題重重，也不要嫌棄牠，開發者們已經很辛苦的在解決各種問題了。即使問題，bug很多，也不要因此否定開發者曾經投入的努力。</br>

> 버그(Bug)와 誤謬로 傷處받았더라도,</br>
> 끝까지 責任지려 努力했던 그 마음 </br>

# 安裝

如果妳使用 x86 裝置，直接執行開發者給出的指令稿就可以了：</br>

```bash
curl -fsSL https://raw.githubusercontent.com/assembledev/edgepad/main/install.sh | sh
```

如果妳使用 Arm 筆電，就只能下載原始碼，然後自己編譯程式了。例如我在安裝了 Fedora Rawhide 的 Lenovo Yoga 筆電上編譯 Edgepad：</br>

```bash
sudo dnf install -y cargo gcc # 安裝相依套件
git clone https://github.com/assembledev/edgepad.git
cd edgepad
cargo build --release
sudo cp target/release/edgepad /usr/local/bin/edgepad
```

之後新增 udev rules 和 systemd 服務：</br>

```bash
# /etc/udev/ruled.d/70-edgepad.rules
SUBSYSTEM=="input", KERNEL=="event*", ENV{ID_INPUT_TOUCHPAD}=="1", TAG+="uaccess"
SUBSYSTEM=="misc", KERNEL=="uinput", TAG+="uaccess", OPTIONS+="static_node=uinput"
```

```bash
sudo cp packaging/edgepad.service ~/.config/systemd/user/edgepad.service
systemctl --user daemon-reload
```

最後複製示例 `edgepad.toml` 配置檔：</br>

```bash
mkdir -p ~/.config/edgepad/
cp examples/edgepad.toml.example ~/.config/edgepad/edgepad.toml.example
mv ~/.config/edgepad/edgepad.toml.example ~/.config/edgepad/edgepad.toml
systemctl --user enable --now edgepad.service # 讓 edgepad 套用新的配置檔
```

完成後重新啓動 `edgepad` 服務，打開終端機，鍵入 `edgepad doctor` 檢視配置檔和裝置設定是否正確。沒有任何謬誤(fail=0)就可以嘗試用手指滑動觸摸板左邊了，妳應該會看到 GNOME 通知列噴出許多 `volume-up` 或 `volume-down` 訊息代表設定完成且沒有任何錯誤。

```bash
edgepad doctor

Config  # 配置檔文法是否有謬誤
  ok    path       /home/hamoa/.config/edgepad/edgepad.toml
  ok    file       device auto, default edge width 10.0%, tap min 40ms, swipe min 2.0%, 5 gesture bindings, 1 slider
  ok    bindings   5 gesture bindings, 1 slider configured
  ok    zones      claiming left, top; passthrough right, bottom; widths: left 10.0%, right off, top 10.0%, bottom off
  ok    device     using auto

Actions
  ok    command    notify-send: 1 binding (top.double-tap)
                   path: /usr/bin/notify-send
  ok    command    ydotool: 6 bindings (left.tap, top.left, top.right, top.tap, left.up, left.down)
                   path: /usr/bin/ydotool

Device      # 硬體 device node 是否可被使用者存取
  ok    touchpad   /dev/input/event4 kind=touchpad name="hid-over-i2c 0488:1054 Touchpad" id=0488:1054 slots=0..=4 x=0..=3141 y=0..=1842
  ok    input      /dev/input/event4 can be opened by current user
  ok    uinput     /dev/uinput is readable and writable

Access # Udev 規則設定是否正確
  ok    udev tags  /dev/input/event4 and /dev/uinput have current udev tags seat,uaccess
  ok    acl        user hamoa has rw ACL on /dev/input/event4 and /dev/uinput

Session
  ok    seat       current session is active on a local seat
  ok    systemd    systemctl --user is available

Service
  warn  unit       edgepad.service is loaded=loaded active=inactive sub=dead

Summary
  ok=14 warn=1 fail=0
  result: usable with warnings
```

# 自訂手勢配置檔

按照 [Suckless 網站的哲學紹介](https://suckless.org/philosophy/)來看，`edgepad` 應該是針對已經有經驗的 Linux 使用者設計的，因此開發者給出的配置檔文法比較簡單也易於上手。</br>
設定好 systemd 服務之後，還需要記住觸摸板的四個「邊緣區域」：最上端(Top)，最下端(Buttom)，最左端(Left)和最右端(Right)。因爲自訂的手勢只有在觸摸板邊緣才可以正常使用，而不會影響正常使用。如果筆電觸摸板有[「Jumping cursor」的問題](https://wayland.freedesktop.org/libinput/doc/latest/touchpad-jumping-cursors.html)，那位於邊邊的手勢可能很難觸發。</br>

<img src="/assets/touchpad-edges.png">

使用 `nano` 打開 `~/.config/edgepad/edgepad.toml` 配置檔進行修改。妳會看到諸如「`sliders`」「`gesture`」之類的單字，它們的行爲也不盡相同。</br>

預設情況下，`edgepad` 支援如下使用者自訂的手勢[^1]：

 - 一般行爲(Gestures): 是一組由使用者定義的邊緣區域手勢。當使用者於對應區域做出手勢時，就執行對應的命令語。邊緣區域分爲最上端，最下端，最左端和最右端；手勢分爲向上滑動(up)，向下滑動(down)，向左滑動(left)，向右滑動(rignt)，點按(tap)和雙擊(double-tap)；
 - 虛擬滑桿(Sliders): 可以認爲是「向上滑動」和「向下滑動」二手勢的精細自訂。在執行滑動手勢的過程中，`edgepad` 會連續執行預先由使用者設定好的命令語。虛擬滑桿僅能在邊緣使用，每個邊緣僅可存在一個 slider；
 - 動作(Actions): Actions 並不是任何手勢，而是僅僅作爲執行程式之用的引數。因爲命令語並不會經由系統 shell 執行，因此 Linux 殼層的「pipe」和「I/O 重定向」之類 features 將不能使用，唯有呼叫 system shell 才可以執行。

 例如，下面的配置檔新增了一個位於最上端的向右滑動手勢，向使用者傳送一則通知訊息：</br>

 ```yaml
 [[gestures]]
zone = "top"
direction = "right" # 從最上端中間部分向右側滑動的手勢
action = ["notify-send", "edgepad", "國漢文混用體"]  # 使用 notify-send 命令傳送寫有「國漢文混用體」的通知訊息
```

新增一個 slider 用於調節音量大小(這將利用 GNOME 的 OSD 展示音量變化)：

```yaml
[[sliders]]
zone = "left" # 位於最左端
step = 0.04 # 設定步進大小，「步進」是手指操作時移動的距離，作為相應觸控板方向軸的一部分。設定值 0.04 表示每 4% 的行程走一步。步進值愈小，相同運動產生的「步數」愈多。
up = ["ydotool", "key", "115:1", "115:0"] # 使用 ydotool 虛擬按鍵綁定工具傳送「Volume up」按鍵 event
down = ["ydotool", "key", "114:1", "114:0"] # 傳送「Volume down」按鍵 event
```

[^1]: [Configuration - edgepad at GitHub](https://github.com/assembledev/edgepad/blob/main/docs/configuration.md)

需要注意配置檔中的 「`Actions`」 並不是任何手勢，而是僅僅作爲執行程式之用的引數。因爲命令語並不會經由系統 shell 執行，因此 Linux 殼層的「pipe」和「I/O 重定向」之類 features 將不能使用，唯有呼叫 system shell 才可以執行：

```yaml
action = ["sh", "-c", "date >> /tmp/date.lol"]  # 使用 sh 執行 date 命令，將返還的當前日期和時間作爲文字寫入 /tmp/date.lol 檔案
```

# 修改手勢敏感度

在使用觸摸板玩遊戲時，卻不小心調整了裝置音量，或者播放了最喜歡的音樂，或者制服的袖子太長碰到筆電觸摸板，導致了又一起列車追撞事故？[^2] 適當修改手勢的靈敏程度可以改善這個煩人的問題。</br>

`edgepad` 支援設定點按，雙擊和滑動手勢的時長，時延和移動距離來改善敏感度。</br>

|變數名稱|中文翻譯(非正確)|預設值|意味|
|-------|-------------|------|---|
|`tap_min_duration_ms`| 最短點按間隔 |40|點按手勢的最低持續間隔。將數值改爲 `0` 來使用快速點擊。|
|`tap_max_duration_ms`| 最大點按時間 |180|點按手勢的完成時間，超過這個時間的手勢會被忽略。|
|`swipe_min_distance`| 最低滑動距離 |0.02|定義滑動手勢的長度。此處的"0.02"代表觸摸板橫向和縱向長度的2%.|
|`double_tap_timeout_ms`| 雙擊間隔時間 |300|兩次點擊期間的時間長度。|
|`double_tap_max_distance`| 雙擊距離 |0.04|第一次點擊位置與第二次點擊位置之間的最大[歐氏距離](https://zh.wikipedia.org/zh-tw/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E8%B7%9D%E7%A6%BB)。[^3]| 


[^2]:本文作者經常搭乘臺北捷運系統，於2016年成爲鐵道迷。目前在 Linux 裝置上使用 OpenBVE 列車模擬程式駕駛鐵路電聯車，亦考慮設計自己的電聯車。
[^3]:具體的計算公式： 

$$
\begin{equation*}
\ d(x,y)= \sqrt[2]{(x_1-y_1)^2+(x_2-y_2)^2+...+(x_n-y_n)^2}
\end{equation*}
$$

如果有一個邊緣同時設定了雙擊和點按手勢，這兩個手勢也不會同時觸發。`edgepad` 會等待前者完成才會執行點按手勢綁定的動作。</br>

如果說給 Linux 系統裝視窗管理員就可以讓大部分人不會使用妳的電腦，那麼筆電改裝 Linux 用 WM 再使用 `edgepad` 自訂手勢就可以讓幾乎所有的人不會使用妳的筆電，久而久之別人遇到問題需要借用妳的筆電時，可能不會借妳的筆電臨時使用了。</br>

# 套用變更

只需要執行 `systemctl --user reload edgepad.service` 命令語即可。以後 `edgepad.toml` 文件變更後，皆需要執行此命令語重載 systemd 服務套用變更。如果配置檔文法不正確，`edgepad` 會繼續使用先前正確的配置檔，此時就需要藉助 `journalctl --user -u edgepad.service -b` 來檢視 `edgepad` 服務的 log，補正配置檔後再重試。</br>

# 後記

使用 `edgepad` 自訂筆電觸摸板手勢之後，可以通過手勢動作完成的機能更豐富了。我的 Lenovo Yoga Slim 7x 筆電鍵盤沒有管理媒體音檔的功能鍵位，自訂了觸摸板最上端手勢用於控制媒體檔案的播放，這樣就不需要在音樂 App 中手動切換上一首/下一首音樂。</br>

```yaml
[[gestures]]
zone = "top"
direction = "left"
action = ["ydotool", "key", "165:1", "165:0"]  # 上一首音樂


[[gestures]]
zone = "top"
direction = "right"
action = ["ydotool", "key", "163:1", "163:0"]  # 下一首音樂
```

不過一般 Windows 筆電的塑料觸摸板並不如 MacBook Air 的好用，平日裡這些手勢也因爲觸摸板的 bug 而很難觸發。因此自訂手勢的功能「聊勝於無」，就像電聯車車身的各種繽紛的塗裝一樣了。