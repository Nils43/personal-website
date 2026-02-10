import { blogPosts, getPostBySlug, getAllSlugs } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Nils Heck`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function parseMarkdown(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold text-white mt-10 mb-4">${block.slice(3)}</h2>`;
      }
      if (block.startsWith("### ")) {
        return `<h3 class="text-xl font-bold text-white mt-8 mb-3">${block.slice(4)}</h3>`;
      }
      // Process inline markdown
      let html = block
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-dark-700 rounded text-accent text-sm">$1</code>');

      // Handle numbered lists
      if (/^\d+\.\s/.test(html)) {
        const items = html
          .split("\n")
          .filter((l) => l.trim())
          .map((l) => `<li class="text-zinc-300 leading-relaxed">${l.replace(/^\d+\.\s*/, "")}</li>`)
          .join("");
        return `<ol class="list-decimal list-inside space-y-2 my-4 text-zinc-300">${items}</ol>`;
      }

      // Handle unordered lists
      if (html.startsWith("- ")) {
        const items = html
          .split("\n")
          .filter((l) => l.trim())
          .map(
            (l) =>
              `<li class="text-zinc-300 leading-relaxed">${l.replace(/^-\s*/, "")}</li>`
          )
          .join("");
        return `<ul class="list-disc list-inside space-y-2 my-4 text-zinc-300">${items}</ul>`;
      }

      return `<p class="text-zinc-400 leading-relaxed text-lg">${html}</p>`;
    })
    .join("\n");
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-xs">
              <span>{post.categoryIcon}</span>
              {post.categoryLabel}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 h-px bg-zinc-800" />
        </header>

        {/* Content */}
        <div
          className="space-y-4 [&>h2]:scroll-mt-24"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-zinc-500">
              Written by{" "}
              <span className="text-white font-medium">Nils Heck</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
              >
                More articles
              </Link>
              <span className="text-zinc-700">·</span>
              <Link
                href="/contact"
                className="text-sm text-accent hover:text-accent-light transition-colors font-medium"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
