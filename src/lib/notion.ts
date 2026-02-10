import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ── Client ──────────────────────────────────────────────
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

// ── Types ───────────────────────────────────────────────
export interface NotionPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categoryIcon: string;
  readingTime: string;
  date: string;
  featured: boolean;
}

const CATEGORY_MAP: Record<string, { label: string; icon: string }> = {
  founder: { label: "Founder Life", icon: "🔥" },
  tech: { label: "Tech & Building", icon: "🤖" },
  europe: { label: "Europe & Policy", icon: "🇪🇺" },
  thinking: { label: "Thinking Out Loud", icon: "💭" },
};

// ── Helpers ─────────────────────────────────────────────
function richTextToPlain(rt: RichTextItemResponse[]): string {
  return rt.map((t) => t.plain_text).join("");
}

function richTextToHtml(rt: RichTextItemResponse[]): string {
  return rt
    .map((t) => {
      let text = t.plain_text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      if (t.annotations.bold)
        text = `<strong class="text-white font-semibold">${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.annotations.strikethrough) text = `<s>${text}</s>`;
      if (t.annotations.code)
        text = `<code class="px-1.5 py-0.5 bg-dark-700 rounded text-accent text-sm">${text}</code>`;

      if (t.href)
        text = `<a href="${t.href}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">${text}</a>`;

      return text;
    })
    .join("");
}

// ── Fetch all posts from Notion database ────────────────
export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return []; // Not configured → fallback to static data
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const props = page.properties;

        const slug =
          props.Slug?.type === "rich_text"
            ? richTextToPlain(props.Slug.rich_text)
            : "";
        const title =
          props.Title?.type === "title"
            ? richTextToPlain(props.Title.title)
            : props.Name?.type === "title"
              ? richTextToPlain(props.Name.title)
              : "";
        const excerpt =
          props.Excerpt?.type === "rich_text"
            ? richTextToPlain(props.Excerpt.rich_text)
            : "";
        const category =
          props.Select?.type === "select"
            ? (props.Select.select?.name?.toLowerCase() ?? "thinking")
            : "thinking";
        const readingTime =
          props["Reading Time"]?.type === "rich_text"
            ? richTextToPlain(props["Reading Time"].rich_text)
            : "5 min";
        const date =
          props.Date?.type === "date"
            ? (props.Date.date?.start ?? new Date().toISOString().slice(0, 10))
            : new Date().toISOString().slice(0, 10);
        const featured =
          props.Featured?.type === "checkbox"
            ? (props.Featured.checkbox ?? false)
            : false;

        const cat = CATEGORY_MAP[category] ?? {
          label: category,
          icon: "💭",
        };

        return {
          slug,
          title,
          excerpt,
          category,
          categoryLabel: cat.label,
          categoryIcon: cat.icon,
          readingTime,
          date,
          featured,
        };
      })
      .filter((p) => p.slug && p.title);
  } catch (error) {
    console.error("Failed to fetch Notion posts:", error);
    return [];
  }
}

// ── Fetch page blocks and render to HTML ────────────────
export async function getNotionPostContent(slug: string): Promise<string | null> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return null;
  }

  try {
    // Find the page by slug
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Published", checkbox: { equals: true } },
        ],
      },
    });

    const page = response.results[0];
    if (!page) return null;

    // Fetch all blocks
    const blocks = await getAllBlocks(page.id);
    return blocksToHtml(blocks);
  } catch (error) {
    console.error("Failed to fetch Notion content:", error);
    return null;
  }
}

// ── Recursively fetch all blocks (handles pagination) ───
async function getAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(
      ...response.results.filter(
        (b): b is BlockObjectResponse => "type" in b
      )
    );

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

// ── Convert Notion blocks → styled HTML ─────────────────
function blocksToHtml(blocks: BlockObjectResponse[]): string {
  const parts: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    switch (block.type) {
      case "paragraph": {
        const text = richTextToHtml(block.paragraph.rich_text);
        if (text) {
          parts.push(`<p class="text-zinc-400 leading-relaxed text-lg">${text}</p>`);
        }
        break;
      }

      case "heading_1": {
        const text = richTextToHtml(block.heading_1.rich_text);
        parts.push(`<h1 class="text-3xl font-bold text-white mt-12 mb-6">${text}</h1>`);
        break;
      }

      case "heading_2": {
        const text = richTextToHtml(block.heading_2.rich_text);
        parts.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4">${text}</h2>`);
        break;
      }

      case "heading_3": {
        const text = richTextToHtml(block.heading_3.rich_text);
        parts.push(`<h3 class="text-xl font-bold text-white mt-8 mb-3">${text}</h3>`);
        break;
      }

      case "bulleted_list_item": {
        const items: string[] = [];
        while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
          const b = blocks[i] as BlockObjectResponse & { type: "bulleted_list_item" };
          items.push(`<li class="text-zinc-300 leading-relaxed">${richTextToHtml(b.bulleted_list_item.rich_text)}</li>`);
          i++;
        }
        parts.push(`<ul class="list-disc list-inside space-y-2 my-4 text-zinc-300">${items.join("")}</ul>`);
        continue; // skip i++ at end
      }

      case "numbered_list_item": {
        const items: string[] = [];
        while (i < blocks.length && blocks[i].type === "numbered_list_item") {
          const b = blocks[i] as BlockObjectResponse & { type: "numbered_list_item" };
          items.push(`<li class="text-zinc-300 leading-relaxed">${richTextToHtml(b.numbered_list_item.rich_text)}</li>`);
          i++;
        }
        parts.push(`<ol class="list-decimal list-inside space-y-2 my-4 text-zinc-300">${items.join("")}</ol>`);
        continue;
      }

      case "quote": {
        const text = richTextToHtml(block.quote.rich_text);
        parts.push(`<blockquote class="border-l-2 border-accent pl-4 my-6 text-zinc-300 italic text-lg">${text}</blockquote>`);
        break;
      }

      case "code": {
        const text = richTextToPlain(block.code.rich_text);
        const lang = block.code.language || "";
        parts.push(
          `<pre class="bg-dark-700 border border-zinc-800 rounded-xl p-4 my-6 overflow-x-auto"><code class="text-sm text-zinc-300">${text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>`
        );
        break;
      }

      case "divider":
        parts.push(`<hr class="border-zinc-800 my-8" />`);
        break;

      case "image": {
        const url =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.type === "file"
              ? block.image.file.url
              : "";
        const caption = block.image.caption
          ? richTextToPlain(block.image.caption)
          : "";
        if (url) {
          parts.push(
            `<figure class="my-8"><img src="${url}" alt="${caption}" class="rounded-xl w-full" loading="lazy" />${
              caption
                ? `<figcaption class="text-center text-sm text-zinc-500 mt-3">${caption}</figcaption>`
                : ""
            }</figure>`
          );
        }
        break;
      }

      case "callout": {
        const icon =
          block.callout.icon?.type === "emoji"
            ? block.callout.icon.emoji
            : "💡";
        const text = richTextToHtml(block.callout.rich_text);
        parts.push(
          `<div class="flex gap-3 p-4 my-6 bg-accent/5 border border-accent/20 rounded-xl"><span class="text-xl">${icon}</span><div class="text-zinc-300 leading-relaxed">${text}</div></div>`
        );
        break;
      }

      case "toggle": {
        const text = richTextToHtml(block.toggle.rich_text);
        parts.push(
          `<details class="my-4 p-4 bg-dark-700 border border-zinc-800 rounded-xl"><summary class="text-white font-medium cursor-pointer">${text}</summary></details>`
        );
        break;
      }

      case "bookmark": {
        const url = block.bookmark.url;
        parts.push(
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="block my-4 p-4 bg-dark-700 border border-zinc-800 rounded-xl text-accent hover:border-accent/40 transition-colors text-sm truncate">${url}</a>`
        );
        break;
      }

      default:
        // Unsupported block type — skip silently
        break;
    }

    i++;
  }

  return parts.join("\n");
}
