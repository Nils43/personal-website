"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/components/Animations";

const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "founder", label: "Founder Life", icon: "🔥" },
  { id: "tech", label: "Tech & Building", icon: "🤖" },
  { id: "europe", label: "Europe & Policy", icon: "🇪🇺" },
  { id: "thinking", label: "Thinking Out Loud", icon: "💭" },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  featured?: boolean;
}

function BlogCard({ post }: { post: BlogPost }) {
  const category = categories.find((c) => c.id === post.category);
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-dark-800 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 cursor-pointer h-full">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/50">
              <span>{category?.icon}</span>
              {category?.label}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime}
            </span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-1.5 text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read more
            <ArrowRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            What I think
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Essays, takes, and lessons learned from the world of tech,
            building companies, and Europe.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "bg-dark-800 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {activeCategory === "all" && (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {posts
              .filter((p) => p.featured)
              .map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
          </div>
        )}

        {/* All Posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filteredPosts
            .filter((p) => activeCategory !== "all" || !p.featured)
            .map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center mb-16">
          <p className="text-zinc-500 text-sm inline-flex items-center gap-2">
            <Tag size={14} />
            New articles published regularly. Stay tuned.
          </p>
        </div>

      </div>
    </div>
  );
}
