---
title: 關閉煩人的「自動鍵入」功能-- Linux 上採用 UDEV 規則和 Keyd 關閉滑鼠自動鍵入，並客製化按鈕行爲
published: 2026-03-24
description: ''
image: 'assets/i-refuse-to-give-a-name.png'
tags: [Customize, Thoughts, Mice]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

通過 Linux 的 `udev` 規則和 `keyd` 工具，我們可以客製化滑鼠按鈕行為，並關閉自動打字功能。

# 前言

最近在好朋友的介紹下，入手了一個中國產的滑鼠——「Inphic S6」，廠家宣稱這是第一支支援 AI Agent 的滑鼠，能夠實現語音聊天，AI生圖和簡報制作等功能。而且滑鼠還內建麥克風，聽上去還很不錯，但是我一向只使用 Linux 和自由軟體，對於其它無用的功能真的不感興趣。畢竟滑鼠的本質不過就是「指向裝置（Pointing device）」，無論外表再怎麼「光鮮亮麗」，最本質的地方依舊不會變。</br>
沒過幾天，包裹就送到了，打開看了裏面的使用指南後，不出意外的只支援 Windows 和 macOS 作業系統，連廠家釋出的驅動也只有 Windows 和 macOS 版。看來在他們眼裏，Linux 和其它UNIX系統一樣，都是「受人冷落的」過時產物......</br>
這顆滑鼠的外觀設計挺不錯的，白色的外殼，看上去就有「科技感」，有種獨特的韻味在。支援無線 USB 連結和藍牙連結，但是滑鼠的藍牙似乎有些問題，不能與我的 Surface Pro 5 鏈接，這是十分奇怪的事情。

# 令人困擾的問題

簡單使用之後，這顆滑鼠並沒有什麼問題。但是它有一個非常奇怪的行爲，只要在任何支援鍵入文字的應用（例如 Gedit，nano 之類）按住滑鼠中鍵或者左側的按鈕超過5秒，就會看到滑鼠自動在應用中留下一串網址:

```text
rWWW.INPHIC.CN/S6.HTML
/r
```

後來發現這是滑鼠驅動程式的下載網址。但是對於使用 Linux 的我來說，這就是完全沒有用處的「垃圾程式」。而且驅動程式閉源，妳永遠不知道廠家是否在程式中藏了「私貨」，或是在背景收集妳的資料。搞不好還有可能是「間諜程式」，還會方便政府定位妳的位置，方便進行監控「自由人士」呢！同時也帶來了麻煩，設想一下妳正在做着重要的簡報，或者回復一篇重要的電郵，因爲妳按下中鍵的時間稍微久了一點，滑鼠「好心」的幫妳鍵入了下載驅動程式的網址，而妳又沒有留意...可想而知會帶來怎麼樣的後果！所以就需要解決這個問題。

# 「自動打字」的機理

這並不是通過作業系統內建（或安裝）的軟體實作實現的，而是通過硬體預設的行爲。當妳將滑鼠插入電腦時，滑鼠會向系統回報自己是一個「複合裝置」而非「USB 滑鼠」（USB HID Device），這類滑鼠通常還會兼具鍵盤的「隱藏」功能。之後通過燒錄在 MCU 中的硬體宏（Macro）實現。當使用者按下滑鼠中鍵超過設定的時間後，就會執行設定好的程式碼，通過模擬鍵盤發送按鍵活動（event）實現「自動鍵入」的效果。</br>
正因爲韌體燒錄在 MCU 中，想要修改滑鼠韌體來改善這個問題幾乎是不可能的。安裝廠家的「間諜程式」是不可能的，因爲我堅持只使用自由（或尊重自由的）軟體！至少我使用的是 Linux 系統，比起 Windows 而言，解決這個問題會更具有靈活性。因爲 Linux 的輸入（input）實作在1990年代就非常成熟且穩定了，而且也可以方便的管理這些裝置。
# 偵測所有輸入裝置

我將滑鼠通過藍牙連線至電腦，儘管在我的電腦上，藍牙部分與網路卡一樣通過PCIe總線連結，但是藍牙裝置可不會通過PCIe連結到主機。滑鼠依然會通過藍牙的 HID 協定與主機溝通。並聲明了滑鼠和鍵盤二個角色，在這種情況下，通過檢視USB和PCIe裝置就不行了。好在我們還可以藉助核心自帶的 `sysfs` ，每個連結到這臺主機的輸入裝置都會被 Linux 核心記錄下來，因此我們總有辦法找到這個模擬「鍵盤」。</br>
打開終端機，鍵入 `cat /proc/bus/input/devices` 會看到返回了所有正在使用的裝置：

```yaml
#cat /proc/bus/input/devices
I: Bus=0019 Vendor=0001 Product=0001 Version=0100
N: Name="gpio-keys"
P: Phys=gpio-keys/input0
S: Sysfs=/devices/platform/gpio-keys/input/input0
U: Uniq=
H: Handlers=event0 
B: PROP=0
B: EV=21
B: SW=1

I: Bus=0018 Vendor=0488 Product=1054 Version=0100
N: Name="hid-over-i2c 0488:1054 Mouse"
P: Phys=3-002c
S: Sysfs=/devices/platform/soc@0/bc0000.geniqup/b80000.i2c/i2c-3/3-002c/0018:0488:1054.0001/input/input8
U: Uniq=
H: Handlers=mouse0 event1 
B: PROP=0
B: EV=17
B: KEY=70000 0 0 0 0
B: REL=903
B: MSC=10

I: Bus=0018 Vendor=0488 Product=1054 Version=0100
N: Name="hid-over-i2c 0488:1054 Touchpad"
P: Phys=3-002c
S: Sysfs=/devices/platform/soc@0/bc0000.geniqup/b80000.i2c/i2c-3/3-002c/0018:0488:1054.0001/input/input9
U: Uniq=
H: Handlers=mouse1 event2 
B: PROP=5
B: EV=1b
B: KEY=e520 10000 0 0 0 0
B: ABS=2e0800000000003
B: MSC=20

I: Bus=0018 Vendor=048d Product=8987 Version=0100
N: Name="hid-over-i2c 048D:8987"
P: Phys=3-003a
S: Sysfs=/devices/platform/soc@0/bc0000.geniqup/b80000.i2c/i2c-3/3-003a/0018:048D:8987.0003/input/input11
U: Uniq=
H: Handlers=sysrq rfkill kbd event5 leds 
B: PROP=0
B: EV=12001f
B: KEY=33eff 0 0 483ffff17aff32d bfd4444600000000 1 930c730b17c007 ffbe7bfad941dfff febeffdfffefffff fffffffffffffffe
B: REL=1040
B: ABS=100000000
B: MSC=10
B: LED=1f

I: Bus=0018 Vendor=27c6 Product=0123 Version=0100
N: Name="hid-over-i2c 27C6:0123"
P: Phys=2-0014
S: Sysfs=/devices/platform/soc@0/ac0000.geniqup/a80000.i2c/i2c-2/2-0014/0018:27C6:0123.0002/input/input12
U: Uniq=
H: Handlers=mouse2 event3 
B: PROP=2
B: EV=1b
B: KEY=400 0 0 0 0 0
B: ABS=260800000000003
B: MSC=20

I: Bus=0018 Vendor=27c6 Product=0123 Version=0100
N: Name="hid-over-i2c 27C6:0123 UNKNOWN"
P: Phys=2-0014
S: Sysfs=/devices/platform/soc@0/ac0000.geniqup/a80000.i2c/i2c-2/2-0014/0018:27C6:0123.0002/input/input13
U: Uniq=
H: Handlers=event4 
B: PROP=0
B: EV=9
B: ABS=10000000000

I: Bus=0000 Vendor=0000 Product=0000 Version=0000
N: Name="pmic_pwrkey"
P: Phys=pmic_pwrkey/input0
S: Sysfs=/devices/platform/soc@0/c400000.arbiter/spmi-0/0-00/c42d000.spmi:pmic@0:pon@1300/c42d000.spmi:pmic@0:pon@1300:pwrkey/input/input14
U: Uniq=
H: Handlers=kbd event6 
B: PROP=0
B: EV=3
B: KEY=10000000000000 0

I: Bus=0003 Vendor=0fac Product=0ade Version=0000
N: Name="keyd virtual keyboard"
P: Phys=
S: Sysfs=/devices/virtual/input/input15
U: Uniq=
H: Handlers=sysrq rfkill kbd event7 leds 
B: PROP=0
B: EV=120003
B: KEY=10000000000000 0 ffffffffffffff0f ffffffffffffffff ffffffffffffffff fffffffffffffffe
B: LED=1ff

I: Bus=0003 Vendor=0fac Product=1ade Version=0000
N: Name="keyd virtual pointer"
P: Phys=
S: Sysfs=/devices/virtual/input/input16
U: Uniq=
H: Handlers=mouse3 event8 js0 
B: PROP=0
B: EV=f
B: KEY=ff0000 0 0 0 0
B: REL=147
B: ABS=3

I: Bus=0005 Vendor=248a Product=61ab Version=0200
N: Name="inphic S6 Keyboard"
P: Phys=58:cd:c9:7f:41:94
S: Sysfs=/devices/virtual/misc/uhid/0005:248A:61AB.0004/input/input17
U: Uniq=d1:01:2d:7f:2c:21
H: Handlers=sysrq kbd event9 leds 
B: PROP=0
B: EV=12001f
B: KEY=33eff 0 0 483ffff17aff32d bfd4444600000000 1 130ff38b17c007 ffff7bfad9415fff febeffdfffefffff fffffffffffffffe
B: REL=1040
B: ABS=100000000
B: MSC=10
B: LED=1f

I: Bus=0005 Vendor=248a Product=61ab Version=0200
N: Name="inphic S6 Mouse"
P: Phys=58:cd:c9:7f:41:94
S: Sysfs=/devices/virtual/misc/uhid/0005:248A:61AB.0004/input/input18
U: Uniq=d1:01:2d:7f:2c:21
H: Handlers=mouse4 event10 
B: PROP=0
B: EV=17
B: KEY=70000 0 0 0 0
B: REL=903
B: MSC=10

I: Bus=0005 Vendor=248a Product=61ab Version=0200
N: Name="inphic S6"
P: Phys=58:cd:c9:7f:41:94
S: Sysfs=/devices/virtual/misc/uhid/0005:248A:61AB.0004/input/input19
U: Uniq=d1:01:2d:7f:2c:21
H: Handlers=event11 
B: PROP=0
B: EV=9
B: ABS=10000000000

```
不出意外，那個疑似「模擬鍵盤」的裝置 `inphic S6 Keyboard` 出現了。記下它的 `Vendor ID` 與 `Product ID`，用於編寫特定的 `udev` 規則來阻擋它的鍵盤功能。

# 編寫 UDEV 規則

之後就可以建立特定的 `udev` 規則，告訴核心忽略這個設備的活動：

```yaml
# nano /etc/udev/rules.d/99-block-inphic-kb.rules:

# 通過設備名稱匹配，禁用其鍵盤屬性
SUBSYSTEM=="input", ATTRS{name}=="inphic S6 Keyboard", ENV{ID_INPUT_KEYBOARD}=="1", ENV{LIBINPUT_IGNORE_DEVICE}="1"
```
之後重載 `udev` 規則：`sudo udevadm control --reload-rules && sudo udevadm trigger` 之後就可以解決自動鍵入的問題了。

## 對於 `keyd` 使用者

因爲我的筆電通過 `keyd` 工具將鍵盤上的 「Copliot Key」按鍵重新映射爲「右 Ctrl」鍵，所以雖然用 `udev` 阻擋了裝置鍵入，可是 `keyd` 依然會處理這個「鍵盤」的按鍵活動，並將其傳遞給系統。因此需要修改 `keyd` 的全局設定檔案 `/etc/keyd/default.conf` [^1]：

```yaml
# /etc/keyd/default.conf

[ids]
*
-248a:61ab

[main]

#（妳自己的按鍵定義）

[inphic S6 Keyboard]
# 這裡什麼都不寫
```

[^1]:[Recommended config -- keyd GitHub](https://github.com/rvaiya/keyd?tab=readme-ov-file#recommended-config)

之後，重載 `keyd` 服務，按住滑鼠中鍵測試，發現這一行爲消失了。

# 定義新的按鍵活動

既然「自動鍵入」的本質上是通過「模擬鍵盤」發送的按鍵活動實現的，那就可以通過將一系列快速的「按鍵序列」映射爲妳想要做的事（愛愛也可以喔），而 `keyd` 剛好就支援這個「序列映射」功能！</br>
針對這隻滑鼠建立新的配置文件(`/etc/keyd/inphic.conf`)：

```yaml
[ids]
248a:61ab

[main]
# 因爲這串網址是以「w」開頭，當鼠標嘗試發送 'w' 時，我們讓它執行別的操作
# 注意：這會導致該設備發出的所有 'w' 都失效，但因為這是鼠標模擬的鍵盤，
# 它平時根本不會發送 'w'，只有在觸發那個流氓功能時才會發送。

w = macro(layer(custom_action))  # 使用 keyd 的 macro（宏）功能來捕獲按鍵行爲

[custom_action]
# 當檢測到第一個 'w' 後，妳可以讓它執行一個命令
# 例如：切換桌面、打開計算器、甚至執行一個腳本
w = f12 
# 或者執行系統命令（需要配合 keyd 的 command 功能）
w = command(notify-send "滑鼠中鍵被長按了！")
```
![](assets/mouse-demo.png)

和支援自定義按鍵活動的滑鼠相比，這樣的效果並不好，而且按住中鍵的做法並不高效。但是這隻滑鼠並不能客製化韌體，所以用來玩一下也不錯。

