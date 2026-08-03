# 🍥Fuwari

[Astro](https://astro.build)로 構築된 靜寂 블로그 템플릿입니다.

[**🖥️미리보기 (Vercel)**](https://fuwari.vercel.app)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
[**📦Old Hexo Version**](https://github.com/saicaca/hexo-theme-vivia)

> README 버전: `2024-04-07`

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 特徵

- [x] [Astro](https://astro.build) 및 [Tailwind CSS](https://tailwindcss.com)로 구축됨
- [x] 부드러운 動畵(동화) 및 페이지 轉換(전환)
- [x] 라이트 모드 / 다크 모드
- [x] 使用者 定義(정의) 가능한 테마 색상 및 배너
- [x] 反應式 디자인
- [ ] 댓글
- [x] 檢索
- [ ] 目次
## 🚀 使用하는 方法

1. 이 템플릿에서 [새 貯藏所를 生成](https://github.com/saicaca/fuwari/generate)하거나 이 貯藏所를 포크하세요.
2. 블로그를 로컬에서 編輯하려면 貯藏所를 複製하고 `pnpm install` 및 `pnpm add sharp`를 實行하여 종속성을 設置하세요.  
   - 아직 [pnpm](https://pnpm.io)을 設置하지 않았다면 `npm install -g pnpm`을 實行하여 [pnpm](https://pnpm.io)을 設置하세요.
3. 블로그를 使用者 定義하려면 `src/config.ts` 構成 파일을 編輯하세요.
4. `pnpm new-post <filename>`을 實行하여 새 揭示物을 만들고 `src/content/posts/`에서 編輯하세요.
5. [가이드](https://docs.astro.build/en/guides/deploy/)에 따라 블로그를 Vercel, Netlify, GitHub Pages 等에 配布하세요. 配布하기 前에 `astro.config.mjs`에서 사이트 構成을 編輯해야 합니다.

## ⚙️ 揭示物의 머리말 設定

```yaml
---
title: 내 첫 블로그 揭示物
published: 2023-09-09
description: 내 새로운 Astro 블로그의 첫 번째 揭示物입니다!
image: /images/cover.jpg
tags: [푸, 바, 오]
category: 앞-끝
draft: false
---
```

## 🧞 命令語

다음 命令語는 프로젝트 최상단, 端末機에서 入力합니다:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | 종속성을 設置합니다.                            |
| `pnpm dev`                          | `localhost:4321`에서 로컬 開發 서버를 始作합니다.      |
| `pnpm build`                        | `./dist/`에 프로덕션 사이트를 構築합니다.         |
| `pnpm preview`                      | 配布하기 前에 로컬에서 빌드 미리보기     |
| `pnpm new-post <filename>`          | 新揭示物과 템플릿 生成합니다.                               |
| `pnpm astro ...`                    | `astro add`, `astro check`와 같은 CLI 命令語 實行 |
| `pnpm astro --help`                 | Astro CLI를 使用協助(협조)                     |
