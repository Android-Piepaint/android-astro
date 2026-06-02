import { siteConfig } from "@/config";
import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
    const allPosts = await getSortedPosts();

    // 💡 1. 除錯用：在你的終端機 (Terminal) 中印出所有文章的 ID，幫助你檢查 ublog 的正確路徑
    console.log("=== 所有文章 ID 清單 ===");
    allPosts.forEach(p => console.log(`ID: ${p.id} | Slug: ${p.slug}`));
    console.log("======================");

    // 💡 2. 加強版尋找邏輯：不論大小寫、不論有沒有帶資料夾或副檔名，只要包含 "ublog" 就抓
    const ublogPage = allPosts.find((post) => {
        const idLower = (post.id || "").toLowerCase();
        const slugLower = (post.slug || "").toLowerCase();
        return idLower.includes("ublog") || slugLower.includes("ublog");
    });

    // 3. 如果真的還是找不到，輸出除錯資訊給瀏覽器看
    if (!ublogPage) {
        // 蒐集目前系統內有的文章 ID 字串，直接顯示在網頁上以便排查
        const availableIds = allPosts.map(p => p.id).join(", ") || "無任何文章";
        return rss({
            title: `${siteConfig.title} - 動態牆 (錯誤除錯)`,
            description: `系統內未找到包含 'ublog' 的檔案。目前可用的文章 ID 有: [${availableIds}]`,
            site: context.site ?? "https://blog.cloudflare88.eu.org/",
            items: [],
        });
    }

    const rawBody = typeof ublogPage.body === "string" ? ublogPage.body : String(ublogPage.body || "");

    // 4. 解析單一檔案內用 "## " (二級標題) 區隔的每一條動態
    // 支援匹配 "## 2026-06-02" 或 "## 任何文字"
    const rawItems = rawBody.split(/^##\s+/m).filter(Boolean);
    
    // 如果 Frontmatter 和第一個二級標題之間有雜訊，予以剔除
    if (!rawBody.trim().startsWith("##") && rawItems.length > 0) {
        rawItems.shift(); 
    }

    // 5. 封裝拆分後的動態項目
    const rssItems = rawItems.map((itemRaw, index) => {
        const lines = itemRaw.split("\n");
        const title = lines[0].trim() || `動態更新 #${index + 1}`;
        const contentMarkdown = lines.slice(1).join("\n").trim();

        // 企圖從標題解析出發布日期
        let pubDate = new Date();
        const dateMatch = title.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
        if (dateMatch) {
            pubDate = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]));
        } else {
            // 防呆：依序稍微扣除小時，確保 RSS 排序正確
            pubDate.setHours(pubDate.getHours() - index);
        }

        return {
            title: title,
            pubDate: pubDate,
            description: contentMarkdown.slice(0, 100) + (contentMarkdown.length > 100 ? "..." : ""),
            link: `/posts/${ublogPage.slug || 'ublog'}/`, // 自動對齊這篇文章在網站上的實際路由
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