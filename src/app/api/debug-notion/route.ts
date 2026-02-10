import { NextResponse } from "next/server";
import { getNotionPosts } from "@/lib/notion";

export async function GET() {
  try {
    const token = process.env.NOTION_TOKEN ? "SET" : "MISSING";
    const dbId = process.env.NOTION_DATABASE_ID ? "SET" : "MISSING";
    
    const posts = await getNotionPosts();
    
    return NextResponse.json({
      env: { NOTION_TOKEN: token, NOTION_DATABASE_ID: dbId },
      postsCount: posts.length,
      posts: posts.map(p => ({ slug: p.slug, title: p.title })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
