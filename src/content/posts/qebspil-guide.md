---
title: 即使核心跑在 EL2 也沒關係，照樣可以聽音樂和使用虛擬機～ 驍龍裝置使用 qebspil EFI 驅動程式，讓系統 UEFI 韌體載入遠端處理器保証裝置硬體功能運作
published: 2026-07-06
description: '' 
image: 'assets/qebspil-results.png'
tags: [FOSS, Linux, ARM, Qualcomm, KVM]
category: 'Linux & Linux related'
draft: false
lang: 'zh_TW'
---

# 寫在前面

在[前面](https://blog.cloudflare88.eu.org/posts/alpine-on-kvm/)寫過講高通平臺如何利用 `slbounce` 讓 Linux 核心跑在 EL2 下，從而可以使用 Snapdragon X Elite 晶片的硬體虛擬化功能跑 Linux 或 Windows 虛擬機的教學。但是，因爲高通晶片的限制，Linux 核心跑在 EL2 之後， ADSP，CDSP 之類的遠端處理器都會噴掉，包括 USB，音訊的功能將無法使用。即使使用 `echo "start" > /sys/class/remoteproc/remoteprocN/state` 命令手動打開遠端處理器也不行。`dmesg` 會噴 `-22 EINVAL` 錯誤。</br>

之後我在使用 Q6A 單板電腦跑虛擬機的時候發現，同樣是 Snapdragon 平臺的 QCA6490 晶片跑 Armbian，遠端處理器卻在正常執行。進入 UEFI 韌體的設定選單發現韌體支援預載入遠端處理器，但是普通的筆電當然不會支援這個功能，畢竟驍龍筆電本身就是跑 Windows 系統的。韌體自然也是針對 Windows 作業系統的開機流程實作的。有沒有像 `slbounce` 那樣的 EFI 驅動程式可以預先初始化遠端處理器呢？</br>
</br>
今天 Piepaint 要來介紹的，就是高通平臺下預先載入遠端處理器的 EFI 驅動程式 -- `qebspil`。</br>

# `qebspil` 紹介

`qebspil`（Qualcomm Exit Boot Services Peripheral Image Loader）是由 Stephan 開發的一個 UEFI 驅動程式(UEFI boot driver)，在 UEFI EBS(`ExitBootServices()`) 階段之前（late boot 階段）啟動 Qualcomm 平台的遠端處理器(remote processors，如 ADSP/CDSP 之類)。 它讓 DSP 韌體能在作業系統無關的情況下早期載入，特別適合 EL2/虛擬化環境或不支援 DSP 啟動的 Linux 配置。</br>

::github{repo="stephan-gh/qebspil"}

關鍵特點如下：

 - 獨立於 OS：在 UEFI `ExitBootServices` 前執行，不依賴 Linux `remoteproc` 核心模組。
 - 安全性：依賴 TZ/PAS 進行韌體驗證，加載廠商數位簽章後的韌體。
 - 相容性：只在套用了 EL2 DTB overlay 裝置 DTB 的 boot flow 中啟動，保留標準 Linux 行為。

# 準備工作

首先，在網路搜尋「 UEFI Shell 」，找到相對應的 [GitHub 網址](https://github.com/pbatard/UEFI-Shell/releases)，下載檔案名爲 `shellaa64.efi` 的EFI應用程式，將其複製到 EFI系統分割中的 `/EFI/BOOT/` 目錄下。

::github{repo="pbatard/UEFI-Shell"}

如果妳使用的是 rEFInd 或者 `systemd-boot` 引導載入器，那麼它們會自動搜尋 UEFI shell 並將其添加到選單中，如果是 GRUB 使用者，可能還需要進行手動設定。</br>
然後，到 GitHub 上搜尋[「qebspil」](https://github.com/stephan-gh/qebspil/)，然後下載 `qebspil.efi` EFI驅動程式，將其複製到 EFI系統分割中。。同時，需要將啟動遠端處理器（ADSP、CDSP 等）的韌體檔案複製到 ESP 的頂層 `/firmware/` 目錄下，不同晶片平臺需要的遠端處理器韌體不同。可以使用 `find /sys/firmware/devicetree -name firmware-name -exec cat {} + | xargs -0n1` 指令檢視需要複製的韌體，在 Yoga Slim 7x 筆電上，需要複製 `adsp_dtbs.elf` `cdsp_dtbs.elf` `qcadsp8380.mbn` `qccdsp8380.mbn` 四個啓動 ADSP，CDSP 的韌體。關於 `qebspil` EFI 驅動程式預先啓動遠端處理器的機理比較複雜，Piepaint 我根據自己的理解與檢索程式原始碼和相關資料之後，將實作流程寫在下面，供專業讀者和開發人員進行參考：</br>

`qebspil` 的實作流程分爲五部分： `callback` 的建立與觸發；DTB 解析與 PIL 管理；韌體載入與準備；與 TZ/SCM 互動；與 Linux 核心的配合。</br>


## `callback` 的建立與觸發

 - 使用 `event_register_group_callback()` 檢視設備樹表(Device Tree Table)的變更[^1]；
 ```c
 ...
// main.c
status = event_register_group_callback(&EfiDtbTableGuid, &event, efi_dtb_changed);
if (EFI_ERROR(status)) return status;
return efi_dtb_changed();   // 立即執行一次
```
 - 當 Bootloader 載入設備樹後，呼叫 `efi_dtb_changed()`，將這一變數傳遞給 `dtb_enumerate_rprocs(dtb)` 來解析裝置的設備樹，並處理 DTB 中標記爲「正常(`status = "okay"`)」的遠端處理器。檢視設備樹中遠端處理器的 `compatible` 字串內容，匹配預先定義的 `pil_type`。爲了避免核心執行不穩定，`qebspil` 只會載入有 `qcom,broken-reset` 屬性的遠端處理器[^2]；

 ```c
 ...
 status = dtb_enumerate_rprocs(dtb);
	if (status == EFI_NOT_FOUND)
		return EFI_SUCCESS; /* No remoteprocs found */
	if (EFI_ERROR(status))
		return status;
    ...
```

 - 同時，在 `efi_dtb_changed()` 內部會註冊一個 Late EBS（`ExitBootServices`）事件 `efi_late_ebs`。這是 `qebspil` 的精妙之處，它使用 EDK2 的內部機制讓該 callback 在極晚的 TPL 級別執行，確保在 UEFI 轉交控制權給 Linux 核心的最後一刻，才真正執行 `pil_finish_all()` 來啟動遠端處理器。

 ```c
// event.c + main.c
if (!ebs_event) {
    status = event_register_late_ebs_callback(&ebs_event, efi_late_ebs);
    // 使用 EDK2 內部 hack 將 TPL 調低，讓 callback 盡量晚執行
}
```

## DTB 解析與 PIL 管理

 - 在 `dtb_enumerate_rprocs()` 中遍歷所有 `remoteproc*` 節點;
 - 匹配 `pil_type`（包含 compatible、PAS ID、proxy GUID 等）;
 - 支援多組件（DTB 擴充段 + 主要韌體），並限制全域最多可管理的遠端處理器裝置數量（目前 4 個）[^4];
 - 從 DTB 取得 `memory-region`、`firmware-name` 等屬性。

```c
// dtb.c 片段
ret = lkfdt_u32list_get(ctx->dtb, node, "memory-region", idx, &mem_phandle);
if (ret) return EFI_INVALID_PARAMETER;
// ... 取得 reserved-memory 資訊

fw_name = fdt_stringlist_get(ctx->dtb, node, "firmware-name", idx, NULL);
if (!fw_name) return EFI_INVALID_PARAMETER;
    ...

/* 枚舉裝置的遠端處理器 */

static EFI_STATUS dtb_enumerate_rproc(struct dtb_context *ctx, int node, struct pil *pil)
{
    for (enum pil_component c = 0; c < PIL_COMPONENTS; c++) {
        /* DTB 在 DTB 中排在後面，但在 enum 中排在前面 */
        int idx = PIL_COMPONENTS - c - 1;
        if (!pil_has_component(pil, c)) continue;
        status = dtb_load_pil_data(ctx, node, &pil->fw[c], idx);
        ...
    }
}

...

while ((node = fdt_next_node(dtb, node, NULL)) >= 0) {
    ...
    if (!name || strncmp(name, "remoteproc", sizeof("remoteproc") - 1))
        continue;
    if (!lkfdt_node_is_available(dtb, node))
        continue;
    if (!QEBSPIL_ALWAYS_START && !fdt_getprop(dtb, node, "qcom,broken-reset", NULL))
        continue;   // 預設只啟動標記 qcom,broken-reset 的 remoteproc
    ...
}
```

## 韌體載入與準備

 - 從 ESP 分割的 `/firmware/` 目錄讀取韌體(根據 DTB 中 `firmware-name` 定義的韌體路徑和韌體名稱而定)；
 - 載入 ELF 韌體(`*_dtbs.elf`)，利用 ELF 函式庫(`elf.h`)驗証 ELF header，Program headers，`PT_LOAD` 引數之類；
 - 準備 metadata（從 ELF 的 `PT_NULL` segments 提取，用於 PAS 驗證）[^3]；

 ```c
 ...
 EFI_STATUS fw_load_metadata(struct pil_fw *fw)
{
	const Elf32_Ehdr *ehdr = fw->elf_data;
	const Elf32_Phdr *phdr = fw->elf_data + ehdr->e_phoff;
	VOID *metadata = (VOID*)fw->metadata;
	UINT64 pos = 0;

	for (Elf32_Half i = 0; i < ehdr->e_phnum; i++, phdr++) {
		if (phdr->p_type != PT_NULL || phdr->p_filesz == 0)     // 複製到預分配的 metadata 記憶體
			continue;
		if ((pos + phdr->p_filesz) > MAX_METADATA_SIZE)
			return EFI_BUFFER_TOO_SMALL;

		CopyMem(metadata + pos, fw->elf_data + phdr->p_offset, phdr->p_filesz);
		pos += phdr->p_filesz;
	}

	if (pos == 0)
		return EFI_NOT_FOUND;

	WriteBackInvalidateDataCacheRange(metadata, MAX_METADATA_SIZE);		// 透過 WriteBackInvalidateDataCacheRange() 確保資料完整寫入實體 RAM。
	return EFI_SUCCESS;
}
...
```

 - `fw_prepare()`：分配 metadata 頁面與載入 ELF 資料。
 - `fw_load()`：將 `PT_LOAD` segments 複製到目標記憶體位址，並處理 cache 維護。


## 與 TZ/SCM 互動

 - 在準備好韌體與記憶體後，透過 Qualcomm SCM（Secure Channel Manager）通訊協定（`QCOM_SCM_PROTOCOL`）向 TrustZone 核心發起安全系統呼叫（Syscall）[^5]:
 1. `scm_pil_init()`：初始化 PIL（Peripheral Image Loader），傳 PAS ID + metadata;
 ```c
/* pil.c */
status = scm_pil_init(pil->type->id[c].full, fw->metadata);
		if (EFI_ERROR(status)) {
			Print(u"qebspil: Failed to init firmware for %a%a: %r (wrong firmware?)\n",
			      pil->type->compatible, pil_component_names[c], status);
			return status;
		}

/* scm.c */        
 EFI_STATUS scm_pil_init(UINT8 pas_id, EFI_PHYSICAL_ADDRESS metadata)
{
	UINT64 Parameters[SCM_MAX_NUM_PARAMETERS] = {
		pas_id,
		metadata,
	};
	UINT64 Results[SCM_MAX_NUM_RESULTS];

	return scm->ScmSipSysCall(scm, TZ_PIL_INIT_ID, TZ_PIL_INIT_ID_PARAM_ID, Parameters, Results);
}
```

 2. `scm_pil_mem_setup()`：鎖定並設定該遠端處理器的專屬安全記憶體區域，限制非安全環境的非法存取;
 ```c

/*scm.c*/
 EFI_STATUS scm_pil_mem_setup(UINT8 pas_id, EFI_PHYSICAL_ADDRESS addr, UINTN size)
{
	UINT64 Parameters[SCM_MAX_NUM_PARAMETERS] = {
		pas_id,     /* 指定 PAS ID，大小和在記憶體的地址 */
		addr,
		size,
	};
	UINT64 Results[SCM_MAX_NUM_RESULTS];

	return scm->ScmSipSysCall(scm, TZ_PIL_MEM_ID, TZ_PIL_MEM_ID_PARAM_ID, Parameters, Results);
}

/*pil.c*/
status = scm_pil_mem_setup(pil->type->id[c].full, fw->mem_addr, fw->mem_size);
		if (EFI_ERROR(status)) {
			Print(u"qebspil: Failed to setup memory area for %a%a: %r\n",
			      pil->type->compatible, pil_component_names[c], status);
			return status;
		}
	}

```

3. `scm_pil_start()`：驗證並用完整韌體(full firmware)再啓動遠端處理器（`TZ_PIL_AUTH_RESET_ID`），如果因爲韌體或 DTB 原因無法完成啟動，程式會執行狀態回溯 (Rollback)：關閉剛才已成功載入的部分完整版韌體元件，避免系統處於載入一半的異常狀態（注意：此時並不會重新啟動精簡版韌體，遠端處理器將保持停止狀態）。
```c

/*scm.c*/
EFI_STATUS scm_pil_start(UINT8 pas_id)
{
	UINT64 Parameters[SCM_MAX_NUM_PARAMETERS] = {
		pas_id,
	};
	UINT64 Results[SCM_MAX_NUM_RESULTS];

	return scm->ScmSipSysCall(scm, TZ_PIL_AUTH_RESET_ID, TZ_PIL_AUTH_RESET_ID_PARAM_ID, Parameters, Results);
}

/* pil.c */

/* Stop lite firmware in reverse order (full first, then DTB) */
	for (enum pil_component b = PIL_COMPONENTS; b > 0; b--) {
		if (!pil_has_component(pil, b - 1) || !pil->type->id[b - 1].lite)
			continue;

		/* Ignore return status since we don't know if lite was running */
		scm_pil_stop(pil->type->id[b - 1].lite);    // 因爲無法事先了解遠端處理器是否執行精簡版韌體，因此忽略返回的狀態變數
	}

	/* 錯誤處理 */

	for (enum pil_component c = 0; c < PIL_COMPONENTS; c++) {
		if (!pil_has_component(pil, c))
			continue;

		status = scm_pil_start(pil->type->id[c].full);
		if (EFI_ERROR(status)) {
			Print(u"qebspil: Failed to authenticate and start firmware for %a%a: %r\n",  /* 錯誤信息 */
			      pil->type->compatible, pil_component_names[c], status);

			/* Rollback：僅停止已成功啟動的 full firmware 元件 */
			for (enum pil_component b = c; b > 0; b--)
				if (pil_has_component(pil, b - 1))
					scm_pil_stop(pil->type->id[b - 1].full);

			return status;
		}
	}


```
 - 使用 Proxy Vote Protocol（`PIL_PROXY_PROTOCOL`）進行資源投票，強迫啟動相關的 Power Domain（電源域）與時脈，確保硬體周邊處於可用狀態（在 `pil_prepare()` 階段執行）。啟動前會先嘗試停止精簡版韌體(lite firmware)（若存在），但失敗時不會自動回退到 lite 版本，而是保持停止狀態並 rollback full firmware，避免半載狀態。


## 與 Linux 配合

`qebspil` 加載後，需要修補 Linux 核心的 `qcom_q6v5_pas.c` `remoteproc` 原始碼來添加遠端處理器 late attach / takeover 支援，修補後的 Linux 核心會自動接管預先啓動的遠端處理器。

# 修補 Linux 核心

即使使用 `qebspil` 驅動程式，ADSP，CDSP 依然會噴掉，因爲 Linux 核心的 `qcom_q6v5_pas.c` 驅動原始碼會重設遠端處理器的運行狀態，即使預先啓動後的遠端處理器也會被重設。因此需要修改核心這一驅動程式的原始碼。不過有一位開發者在他維護的 [Ubuntu 核心](https://github.com/sppidy/linux)原始碼中修補了這一驅動程式，雖然這是專爲 ASUS Zenbook A14 筆電而開發的核心，但是 Yoga Slim 7x 也同樣可以套用。下載原始碼之後鍵入 `make qcom_laptops.config ubuntu_x1e_defconfig defconfig` 套用核心的配置檔，鍵入 `make -j12` 開始編譯，等待五分鐘就可以了。</br>

對於其他支援 EL2 的裝置，如果主線核心沒有關於 `qcom_q6v5_pas` 的[相關 commit ](https://github.com/sppidy/linux/commit/434c518bbe754f3ba3dea4364e99ab44a224c453),則需要自己修補核心。</br>
在核心原始碼找到 `drivers/remoteproc/qcom_q6v5_pas.c` 原始碼，找到第824行，將程式碼修改爲下面的樣子，讓驅動程式支援「韌體已在 bootloader 載入並運行」的場景[^6]：

```c
// remoteproc/qcom_q6v5_pas.c
rproc->has_iommu = of_property_present(pdev->dev.of_node, "iommus");
	if (desc->auto_boot)
	//	rproc->auto_boot = RPROC_AUTO_BOOT_ATTACH_OR_START;		// 修改 auto_boot 旗標，允許框架檢查 firmware 是否可用，並決定是 restart 還是 attach 到已經 running 的遠端處理器。
		rproc->auto_boot = RPROC_AUTO_BOOT_RESTART_IF_FW_AVAILABLE;
	else
		rproc->auto_boot = RPROC_AUTO_BOOT_DISABLED;
	rproc_coredump_set_elf_info(rproc, ELFCLASS32, EM_NONE);
```

之後找到887~893行，刪去驅動對於遠端處理器的檢查，讓驅動程式即使 remoteproc 還沒完全上線也能繼續初始化（特別是讀取 SMP2P 狀態、加入 glink/smd/pdm subdev 等）：

```c
// remoteproc/qcom_q6v5_pas.c
...
  /* 移除驅動對 remoteproc 沒有 start ops 就退出的檢查，即使遠端處理器沒有完全啓動也可以被核心初始化，而不是一定要從頭啓動 */
  /*if (rproc->state == RPROC_OFFLINE && !ops->start) { */
	/*	dev_err(&pdev->dev, "reset broken and remoteproc not running during boot, exiting\n"); */
	/*	ret = 0; */
	/*	goto deinit_q6v5; */
	/*} */
  qcom_q6v5_read_smp2p_state(&pas->q6v5);
  qcom_add_glink_subdev(rproc, &pas->glink_subdev, desc->ssr_name);
	qcom_add_smd_subdev(rproc, &pas->smd_subdev);
	qcom_add_pdm_subdev(rproc, &pas->pdm_subdev);
  ...
```

這些改動讓驅動程式能接管（attach） 已經運行的 remote processor，而不是強制從頭 start 或 boot。

# 套用變更

安裝編譯的核心，重開機。通過 `dmesg` 檢視 ADSP 和 CDSP 相關的 log，應該會看到 `remoteproc: attached to adsp` 或類似的訊息。代表 Linux 成功接管了預先啓動的遠端處理器。如果想要使用虛擬機，需要向核心啓動引數添加 `id_aa64mmfr0.ecv=1` 引數來避免虛擬機導致裝置當機的問題。
```yaml
# dmesg | grep adsp
[   11.689397] remoteproc remoteproc0: adsp is available
[   11.694972] remoteproc remoteproc0: attaching to adsp
[   11.717887] remoteproc remoteproc0: remote processor adsp is now attached
[   11.845373] qcom,apr 6800000.remoteproc:glink-edge.adsp_apps.-1.-1: Adding APR/GPR dev: gprsvc:service:2:1
[   11.860349] qcom,apr 6800000.remoteproc:glink-edge.adsp_apps.-1.-1: Adding APR/GPR dev: gprsvc:service:2:2
```

使用 `cat /sys/class/remoteproc/remoteproc0/state` 命令檢視，也會看到遠端處理器是「`attached`」狀態。如果裝置支援音訊的話，通過 `aplay -l` 命令也可以檢視出音訊裝置了。</br>
至於硬體虛擬化是否啓用，通過 `ls /dev/kvm` 命令檢視就可以了，從 `dmesg` 檢視也會得到 KVM 和 GIC 相關的訊息：

```yaml
# dmesg | grep kvm
[    0.068668] kvm [1]: nv: 570 coarse grained trap handlers
[    0.068803] kvm [1]: nv: 710 fine grained trap handlers
[    0.068882] kvm [1]: IPA Size Limit: 44 bits
[    0.068893] kvm [1]: GICv4 support disabled
[    0.068895] kvm [1]: GICv3: no GICV resource entry
[    0.068898] kvm [1]: disabling GICv2 emulation
[    0.068913] kvm [1]: GIC system register CPU interface enabled
[    0.068919] kvm [1]: vgic interrupt IRQ9
[    0.068943] kvm [1]: Broken CNTVOFF_EL2, trapping virtual timer
[    0.068951] kvm [1]: VHE mode initialized successfully

# dmesg | grep EL2
[    0.000000] CPU features: detected: HCRX_EL2 register
[    0.000000] CPU features: detected: Broken CNTVOFF_EL2
[    0.011357] CPU: All CPU(s) started at EL2
[    0.068943] kvm [1]: Broken CNTVOFF_EL2, trapping virtual timer
```

:::tip
關於 `id_aa64mmfr0.ecv=1` 的底層小常識:</br>
在驍龍平台（特別是 X Elite 等新一代晶片）上，日誌中提示的 `Broken CNTVOFF_EL2` 代表硬體虛擬化計時器存在某些已知的硬體設計缺陷（Bugs）。添加 `id_aa64mmfr0.ecv=1` 參數是為了強制修正 Enhanced Counter Virtualization (ECV) 的特性宣告，引導核心正確處理計時器偏移量，從而徹底解決 KVM 在啟動虛擬機時，因為計時器陷阱（Trapping）導致整個主機直接當機（Kernel Panic）的陳年頑疾。
:::

透過 `qebspil` 驅動程式在引導階段的承上啟下，配合 Linux 核心的 Late Attach 補丁，我們成功在不破壞安全鏈的前提下，繞過了這些硬體層面的刻意限制。既可以利用「Secure Launch」讓核心跑在 EL2 便於存取硬體虛擬化功能，又可以保證依賴遠端處理器的大部分硬體功能正常運作。

[^1]:[main.c - qebspil on GitHub](https://github.com/stephan-gh/qebspil/blob/main/src/main.c)

[^2]:這一預設行爲可以在編譯時使用 `QEBSPIL_ALWAYS_START=1` 變數覆寫，無論 bootloader 裝載何種設備樹，總會在 late EBS 階段啓動裝置上的遠端處理器。

[^3]:[fw.c - qebspil on GitHub](https://github.com/stephan-gh/qebspil/blob/main/src/fw.c)

[^4]:[程式碼](https://github.com/stephan-gh/qebspil/blob/main/src/pil.c)中 `#define MAX_PIL_NUM		4` 對於變數 `MAX_PIL_NUM` 的定義限制的是系統中最多能枚舉多少個遠端處理器裝置（例如 SC8280XP 平臺有 ADSP、CDSP、WPSS、MPSS 遠端處理器，上限為4個）

[^5]:[pil.c & scm.c - qebspil on GitHub](https://github.com/stephan-gh/qebspil/blob/main/src/pil.c)

[^6]:[remoteproc: qcom_q6v5_pas: Attach running remoteproc if firmware is missing](https://github.com/sppidy/linux/commit/434c518bbe754f3ba3dea4364e99ab44a224c453)


