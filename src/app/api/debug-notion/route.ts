import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!token || !dbId) {
    return NextResponse.json({ error: "Missing env vars", token: !!token, dbId: !!dbId });
  }

  try {
    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Published", checkbox: { equals: true } },
    });

    const pages = response.results.map((page: any) => {
      const props = page.properties;
      return Object.fromEntries(
        Object.entries(props).map(([k, v]: [string, any]) => {
          if (v.type === "title") return [k, v.title.map((t: any) => t.plain_text).join("")];
          if (v.type === "rich_text") return [k, v.rich_text.map((t: any) => t.plain_text).join("")];
          if (v.type === "select") return [k, v.select?.name ?? null];
          if (v.type === "checkbox") return [k, v.checkbox];
          if (v.type === "date") return [k, v.date?.start ?? null];
          return [k, v.type];
        })
      );
    });

    return NextResponse.json({ count: pages.length, pages });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({ error: message, stack }, { status: 500 });
  }
}
