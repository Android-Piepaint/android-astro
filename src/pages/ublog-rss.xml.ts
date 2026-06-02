import { siteConfig } from "@/config";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
    // 💡 1. 暴力搜尋：直接撈取 src/content/ 底下所有資料夾內名為 ublog.md 的檔案
    const modules = import.meta.glob("/src/content/**/random.md", { query: '?raw', import: 'default', eager: true });
    
    let rawBody = "";
    
    // 取得第一個匹配到的檔案內容
    for (const path in modules) {
        if (modules[path]) {
            rawBody = modules[path] as string;
            break;
        }
    }

    // 💡 2. 防呆除錯：如果連硬碟直接讀取都找不到檔案，回報實際的搜尋路徑
    if (!rawBody) {
        return rss({
            title: `${siteConfig.title} - 動態牆 (實體檔案錯誤)`,
            description: "在 src/content/ 及其子目錄下未找到任何名為 ublog.md 的實體檔案，請檢查檔案路徑與名稱是否正確。",
            site: context.site ?? "https://blog.cloudflare88.eu.org/",
            items: [],
        });
    }

    // 3. 移除 Frontmatter 區塊 (去掉頂部的 --- ... ---)
    const cleanMarkdown = rawBody.replace(/^---[\s\S]*?---/, "").trim();

    // 4. 依照 "## " (二級標題) 切分成多個動態項目
    const rawItems = cleanMarkdown.split(/^##\s+/m).filter(Boolean);

    // 5. 封裝拆分後的動態項目
    const rssItems = rawItems.map((itemRaw, index) => {
        const lines = itemRaw.split("\n");
        const title = lines[0].trim() || `動態更新 #${index + 1}`;
        const contentMarkdown = lines.slice(1).join("\n").trim();

        // 企圖從標題解析出發布日期 (例如 ## 2026-06-02)
        let pubDate = new Date();
        const dateMatch = title.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
        if (dateMatch) {
            pubDate = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]));
        } else {
            // 如果標題沒日期，依序扣除小時以確保 RSS 排序
            pubDate.setHours(pubDate.getHours() - index);
        }

        return {
            title: title,
            pubDate: pubDate,
            description: contentMarkdown.slice(0, 100) + (contentMarkdown.length > 100 ? "..." : ""),
            link: `/ublog/`, // 導向你的動態牆專屬渲染頁面
            content: sanitizeHtml(parser.render(contentMarkdown), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            }),
        };
    });

    return rss({
        title: `${siteConfig.title} - 動態牆`,
        description: siteConfig.subtitle || "微網誌與碎碎念動態流",
        site: context.site ?? "https://blog.cloudflare88.eu.org/",
        items: rssItems,
        customData: `<language>${siteConfig.lang}</language>`,
    });
}