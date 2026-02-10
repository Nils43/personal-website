"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Tag, ArrowRight, Mail } from "lucide-react";
import { useScrollAnimation } from "@/components/Animations";

const categories = [
  { id: "all", label: "All", icon: "✨" },
  { id: "founder", label: "Founder Life", icon: "🔥" },
  { id: "tech", label: "Tech & Building", icon: "🤖" },
  { id: "europe", label: "Europe & Policy", icon: "🇪🇺" },
  { id: "thinking", label: "Thinking Out Loud", icon: "💭" },
];

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  // ── Founder Life ──
  {
    slug: "why-i-took-over-an-agency-at-23",
    title: "Why I Took Over an Agency at 23",
    excerpt:
      "I didn't have a business plan. I had a feeling. Here's what happened when I stopped overthinking and just started.",
    category: "founder",
    readingTime: "6 min",
    date: "2026-02-01",
    featured: true,
  },
  {
    slug: "750-founders-one-room",
    title: "750 Founders in One Room",
    excerpt:
      "We built the Young Founders Conference from zero. 750 people showed up. This is what I learned about events, energy and community.",
    category: "founder",
    readingTime: "8 min",
    date: "2026-01-15",
    featured: true,
  },
  {
    slug: "linkedin-personal-branding-from-inside",
    title: "LinkedIn Personal Branding: What I've Learned Writing for Others",
    excerpt:
      "I ghostwrite LinkedIn content for founders and executives. Here's what actually works — and what everyone gets wrong.",
    category: "founder",
    readingTime: "7 min",
    date: "2025-11-10",
  },
  // ── Tech & Building ──
  {
    slug: "building-an-energy-dashboard-with-ai",
    title: "Building an Energy Dashboard with AI",
    excerpt:
      "A side project that taught me more than a semester at uni. APIs, real-time data, and why energy transparency matters.",
    category: "tech",
    readingTime: "6 min",
    date: "2025-11-25",
  },
  {
    slug: "from-environmental-engineering-to-code",
    title: "From Environmental Engineering to Software Engineering",
    excerpt:
      "I switched degrees halfway through. Everyone thought I was crazy. Turns out it was the best decision I ever made.",
    category: "tech",
    readingTime: "7 min",
    date: "2025-12-10",
  },
  {
    slug: "shipping-my-first-app",
    title: "What I Learned Shipping My First App to the App Store",
    excerpt:
      "From idea to App Store in 3 months as a solo dev. The mistakes, the breakthroughs, and why shipping beats perfecting.",
    category: "tech",
    readingTime: "5 min",
    date: "2025-10-20",
  },
  // ── Europe & Policy ──
  {
    slug: "defence-tech-europe",
    title: "Defence Tech in Europe: Why Founders Should Pay Attention",
    excerpt:
      "Europe is waking up to the fact that security needs technology. Why this might be the most important sector of the decade.",
    category: "europe",
    readingTime: "10 min",
    date: "2026-01-08",
  },
  {
    slug: "european-tech-sovereignty",
    title: "Can Europe Build Its Own Tech Future?",
    excerpt:
      "We have the talent, the capital is growing, and the urgency is obvious. So what's actually holding us back?",
    category: "europe",
    readingTime: "8 min",
    date: "2025-12-01",
  },
  // ── Thinking Out Loud ──
  {
    slug: "10-bold-asks",
    title: "10 Bold Asks That Changed My Year",
    excerpt:
      "I reached out to 10 people I had no business contacting. Most replied. Some became mentors. Here's the playbook.",
    category: "thinking",
    readingTime: "5 min",
    date: "2025-12-20",
  },
  {
    slug: "what-building-community-taught-me",
    title: "What Building a Community of 2,000 Founders Taught Me About People",
    excerpt:
      "Communities aren't products. They're living things. Notes on trust, energy, and why most community efforts fail.",
    category: "thinking",
    readingTime: "8 min",
    date: "2025-09-15",
  },
];

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

function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-gradient-to-br from-accent/10 via-dark-800 to-dark-800 border border-zinc-800 rounded-2xl p-8 sm:p-10">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={20} className="text-accent" />
        <h3 className="text-lg font-bold">Newsletter</h3>
      </div>
      <p className="text-zinc-400 text-sm mb-6 max-w-md">
        I write about tech, building companies, and Europe. No spam. Once a month.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: Connect to newsletter service
          alert("Coming soon! Thanks for your interest.");
          setEmail("");
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-dark-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default function BlogPage() {
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

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>
    </div>
  );
}
