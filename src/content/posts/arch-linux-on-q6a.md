---
title: Radxa Q6A 單板機改裝 Arch Linux Arm 安裝教學
published: 2026-09-05
description: ''
image: 'assets/pmos-q6a.png'
tags: [FOSS, ARM, Flashing, Embed]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

Q6A 單板機的 Linux 發行版支援有限，除了被 Radxa 贊助的 Armbian 之外，還有 PostmarketOS 

# Radxa Q6A 單板機紹介

> 請參閱 [Q6A 單板機紹介](https://blog.cloudflare88.eu.org/posts/q6a-review/)了解更多關於單板電腦的硬體資訊。

Radxa Q6A 是採用高通 Dragonwing QCS6490 ARM 晶片的單板機。相容 Arm V8 指令集，核心時脈2.7GHz。提供 GPIO，PCIe 等介面，用於連接多種外部裝置，可以滿足一般軟體/硬體開發者的開發，除錯需求。</br>
板底還附有 MIPI CSI/DSI，UFS/eMMC 模組接口，用於安裝熒幕和UFS/eMMC 快閃記憶體。</br>

