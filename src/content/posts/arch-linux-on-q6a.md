---
title: Radxa Q6A 單板機改裝 Arch Linux Arm 安裝教學
published: 2026-09-05
description: ''
image: 'assets/alarm-q6a.png'
tags: [FOSS, ARM, Flashing, Embed]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

Q6A 單板機的 Linux 發行版支援有限，除了被 Radxa 贊助的 Armbian 之外，還有 PostmarketOS 這種基於 Musl 的發行版。不過，所有的「Linux 發行版」就是核心和自定的 Rootfs 的組合，所以更換 Linux 發行版也非常容易。</br>

我使用時間最長的是 Arch Linux 和以 Arch Linux 爲基礎的發行版，所以我要嘗試在這臺單板電腦上安裝 Arch Linux Arm。</br>

# Radxa Q6A 單板機紹介

> 請參閱 [Q6A 單板機紹介](https://blog.cloudflare88.eu.org/posts/q6a-review/)了解更多關於單板電腦的硬體資訊。

Radxa Q6A 是採用高通 Dragonwing QCS6490(HLOS名：Kodiak) ARM 晶片的單板機。相容 Arm V8 指令集，核心時脈2.7GHz。提供 GPIO，PCIe 等介面，用於連接多種外部裝置，可以滿足一般軟體/硬體開發者的開發，除錯需求。</br>
板底還附有 MIPI CSI/DSI，UFS/eMMC 模組接口，用於安裝熒幕和UFS/eMMC 快閃記憶體。</br>

# Arch Linux Arm 紹介

Arch Linux Arm 是基於 Arch Linux 再開發的社群發行版。與官方僅支援 x86 架構處理器不同，Arch Linux Arm 是專門針對 Arm 32位元/64位元 處理器優化的客製化版本。類似的 Arch Linux ports 還有 [ArchPOWER](https://archlinuxpower.org/)，Arch Linux 32 之類。</br>

# 安裝新系統的方法

Q6A 單板機支援 USB，eMMC，SD Card，網路，還有 NVME SSD 開機。所以我可以非常方便的實作「多重開機」，在 USB 隨身碟安裝一個系統，把下載的 Arch Linux Arm rootfs 壓縮檔解壓縮到 SSD，通過 `chroot` 方式安裝和設定 Arch Linux。</br>

## 寫入發行版映像到 USB 隨身碟

 - 到支援良好的 [Armbian](https://armbian.com/boards/radxa-dragon-q6a)下載 Q6A 單板機的映像，建議選擇 GNOME 版；</br>
 - 鍵入以下命令語將映像寫進隨身碟:
```bash
unxz /path/to/Armbian_26.8.1_Radxa-dragon-q6a_resolute_current_6.18.2_gnome_desktop.img.xz && sudo dd if=/path/to/Armbian_26.8.1_Radxa-dragon-q6a_resolute_current_6.18.2_gnome_desktop.img of=/dev/sdx bs=1M status=progress conv=fsync
```

 - 重開機單板電腦，開機時按住 `F12`，在「Boot menu」選擇自己的隨身碟，從隨身碟開機。進入 Armbian 系統後，按照螢幕上的指引完成使用者設定；</br>
 - 用 Armbian 自帶的 Chrome(是專有軟體，但是臨時利用也無妨)瀏覽器下載 [Arch Linux Arm 的 Rootfs tarball (64 位元 Arm)](http://os.archlinuxarm.org/os/ArchLinuxARM-aarch64-latest.tar.gz)，如果沒有網路就用隨身碟傳。 </br>

## 對 SSD 分區

> 如果妳使用的是 eMMC/UFS 快閃記憶體，也可以參考本章內容。

使用 `lsblk` 檢視裝置上所有的 block devices，名爲 `/dev/nvme0n1` 的裝置就是要安裝 Arch Linux 的硬碟。

```bash
# lsblk -e7
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
mmcblk0      179:0    0  58.2G  0 disk 
├─mmcblk0p1  179:1    0   260M  0 part 
└─mmcblk0p2  179:2    0    58G  0 part 
mmcblk0boot0 179:8    0     4M  1 disk 
mmcblk0boot1 179:16   0     4M  1 disk 
mmcblk1      179:24   0 238.8G  0 disk 
├─mmcblk1p1  179:25   0   487M  0 part 
└─mmcblk1p2  179:26   0 238.3G  0 part 
zram0        253:0    0     8G  0 disk [SWAP]
nvme0n1      259:0    0 931.5G  0 disk 
├─nvme0n1p1  259:1    0   512M  0 part /boot
├─nvme0n1p2  259:2    0 922.6G  0 part /
└─nvme0n1p3  259:3    0   7.5G  0 part [SWAP]
```

- 打開終端機，鍵入 `sudo gparted /dev/nvme0n1` ，然後刪去硬碟上所有的分區。</br>

```bash
# sudo parted /dev/nvme0n1
GNU Parted 3.7
Using /dev/nvme0n1
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) p                                                                
Model: KINGSTON SNV3SM31T0 (nvme)
Disk /dev/nvme0n1: 1000GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags: 

Number  Start   End    Size    File system     Name  Flags
 1      1049kB  538MB  537MB   fat32                 boot, esp
 2      538MB   991GB  991GB   ext4
 3      991GB   999GB  8000MB  linux-swap(v1)        swap

(parted) rm 3
(parted) rm 2
(parted) rm 1
(parted) exit
```                                                                 


- 使用 `gparted` 建立 GPT 分割表；

 ```bash 
 (parted) mklabel gpt
 ```
鍵入 `print`，「Partition table(分割表)」應該會顯示爲 `gpt`，表示裝置正在使用 GPT 分割表。</br>

- 接着鍵入 `mkpart` 命令語，建立 EFI 分割，根分割`(/)`。 `parted` 會問妳要建立的分區大小，標籤，採用的檔案系統等問題。根據自身需要修改；

```bash
 # 下面爲建立 EFI 分割和根分割的範例
(parted) mkpart
Partition name?  []?  # 分區名稱
File system type?  [ext2] fat32     # 使用的檔案系統
Start? 1049kB    # 分割的起始和終止大小，默認單位爲 MB
End? 512MB
...
Partition name?  []?  
File system type?  [ext2] ext4     
Start? 512MB    
End? 999GB
(parted) print
Model: KINGSTON SNV3SM31T0 (nvme)
Disk /dev/nvme0n1: 1000GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags: 

Number  Start   End    Size    File system     Name  Flags
 1      1049kB  512MB  511MB   fat32                 
 2      512MB   999GB  999GB   ext4

```

鍵入 `set 1 esp on` 命令語設定 EFI 分區的標籤，從而讓 UEFI 韌體可以發現並從該硬碟啓動。</br>

- 最後鍵入 `mkfs.fat -F32 /dev/nvme0n1p1` `mkfs.ext4 /dev/nvme0n1p2` 命令格式化硬碟的 EFI 分割和根分割。SSD 就準備就緒了。</br>

# 安裝 Arch Linux ARM

- 將 SSD 掛載到 `/mnt` 目錄下，便於通過 `chroot` 配置系統；

```bash
sudo mount /dev/nvme0n1p2 /mnt

sudo mount /dev/nvme0n1p1 /boot
```

- 將 Arch Linux Arm 的 tarball 解壓縮到 SSD：

```bash
sudo bsdtar -xpf ArchLinuxARM-aarch64-latest.tar.gz -C /mnt
```

- 掛載重要的分割，進入 Arch Linux `chroot` 環境：

```bash
sudo cd /mnt
sudo mount -t proc /proc proc/
sudo mount -t sysfs /sys sys/
sudo mount --rbind /dev dev/
sudo cp /run/systemd/resolv/resolv.conf etc/resolv.conf
sudo chroot /mnt /mnt/bin/bash
```

- 設定 `pacman` 金鑰鏈：

```bash
pacman-key --init
pacman-key --populate archlinuxarm
```

- 補正 `fstab` (分割 UUID 可通過 `blkid` 命令檢視，下方爲範例):

```bash
# nano /etc/fstab

# Static information about the filesystems.
# See fstab(5) for details.

# <file system> <dir> <type> <options> <dump> <pass>
UUID=6CCE-BACE  /boot   vfat    defaults        0       2
UUID=aa747e0b-6d33-446d-aa59-b4a12125f2f8       /       ext4    defaults,commit=120,noatime,discard
UUID=50778b09-503d-4736-bc04-c6816ea6a284       none    swap    defaults,pri=80 0       0
```

 - 安裝 `linux-aarch64` 核心和韌體：

```bash
 pacman -S linux-aarch64 linux-firmware linux-firmware-qcom
```

 - 安裝 `grub` 開機載入器：

 ```bash
 pacman -S grub efibootmgr
 grub-install --target=arm64-efi --efi-directory=/boot
 grub-mkconfig -o /boot/grub/grub.cfg
 ```

 - 爲了提升訪問速度，用 `nano` 編輯 `/etc/pacman.d/mirrorlist` ，取消註解台灣國內的鏡像；

 ```bash
 nano /etc/pacman.d/mirrorlist
 pacman -Syy
 ```
 - 設定時區：

```bash
 ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime
 hwclock --systohc
```

 - 設定系統語言爲正體中文*(或者直接使用英語)：
```bash
nano /etc/locale.gen
locale-gen
echo "LANG=zh_TW.UTF-8 UTF-8" >> /etc/locale.conf
# 需要安裝 noto-fonts 套件才可以避免中文漢字展示爲亂碼或方塊的情況
pacman -S noto-fonts-cjk
```
> _*:在安裝桌面環境與中文字體前，請不要設定系統語言。由於 TTY 控制臺不支援 Unicode 字元，中文漢字將顯示爲方塊。_

之後就可以重開機到剛剛安裝的 Arch Linux 中了。沒有任何多餘的軟體，開機直接進入 TTY 控制臺。鍵入用戶名 `alarm` ，默認密碼 `alarm` 登入系統，開始配置自己的 Arch Linux 吧！</br>
</br>