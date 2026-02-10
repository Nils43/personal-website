import { getNotionPosts } from "@/lib/notion";
import BlogPageClient from "@/components/BlogPageClient";
import type { BlogPost } from "@/components/BlogPageClient";

export const revalidate = 60; // ISR — re-fetch from Notion every 60s

// Static fallback posts (used when Notion is not configured)
const staticPosts: BlogPost[] = [
  {
    slug: "why-i-took-over-an-agency-at-23",
    title: "Why I Took Over an Agency at 23",
    excerpt: "I didn't have a business plan. I had a feeling. Here's what happened when I stopped overthinking and just started.",
    category: "founder",
    readingTime: "6 min",
    date: "2026-02-01",
    featured: true,
  },
  {
    slug: "750-founders-one-room",
    title: "750 Founders in One Room",
    excerpt: "We built the Young Founders Conference from zero. 750 people showed up. This is what I learned about events, energy and community.",
    category: "founder",
    readingTime: "8 min",
    date: "2026-01-15",
    featured: true,
  },
  {
    slug: "linkedin-personal-branding-from-inside",
    title: "LinkedIn Personal Branding: What I've Learned Writing for Others",
    excerpt: "I ghostwrite LinkedIn content for founders and executives. Here's what actually works — and what everyone gets wrong.",
    category: "founder",
    readingTime: "7 min",
    date: "2025-11-10",
  },
  {
    slug: "building-an-energy-dashboard-with-ai",
    title: "Building an Energy Dashboard with AI",
    excerpt: "A side project that taught me more than a semester at uni. APIs, real-time data, and why energy transparency matters.",
    category: "tech",
    readingTime: "6 min",
    date: "2025-11-25",
  },
  {
    slug: "from-environmental-engineering-to-code",
    title: "From Environmental Engineering to Software Engineering",
    excerpt: "I switched degrees halfway through. Everyone thought I was crazy. Turns out it was the best decision I ever made.",
    category: "tech",
    readingTime: "7 min",
    date: "2025-12-10",
  },
  {
    slug: "shipping-my-first-app",
    title: "What I Learned Shipping My First App to the App Store",
    excerpt: "From idea to App Store in 3 months as a solo dev. The mistakes, the breakthroughs, and why shipping beats perfecting.",
    category: "tech",
    readingTime: "5 min",
    date: "2025-10-20",
  },
  // ── Europe & Policy ──
  {
    slug: "defence-tech-europe",
    title: "Defence Tech in Europe: Why Founders Should Pay Attention",
    excerpt: "Europe is waking up to the fact that security needs technology. Why this might be the most important sector of the decade.",
    category: "europe",
    readingTime: "10 min",
    date: "2026-01-08",
  },
  {
    slug: "european-tech-sovereignty",
    title: "Can Europe Build Its Own Tech Future?",
    excerpt: "We have the talent, the capital is growing, and the urgency is obvious. So what's actually holding us back?",
    category: "europe",
    readingTime: "8 min",
    date: "2025-12-01",
  },
  {
    slug: "10-bold-asks",
    title: "10 Bold Asks That Changed My Year",
    excerpt: "I reached out to 10 people I had no business contacting. Most replied. Some became mentors. Here's the playbook.",
    category: "thinking",
    readingTime: "5 min",
    date: "2025-12-20",
  },
  {
    slug: "what-building-community-taught-me",
    title: "What Building a Community of 2,000 Founders Taught Me About People",
    excerpt: "Communities aren't products. They're living things. Notes on trust, energy, and why most community efforts fail.",
    category: "thinking",
    readingTime: "8 min",
    date: "2025-09-15",
  },
];

export default async function BlogPage() {
  // Try fetching from Notion first
  const notionPosts = await getNotionPosts();

  // Use Notion posts if available, otherwise fall back to static data
  const posts: BlogPost[] =
    notionPosts.length > 0
      ? notionPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          readingTime: p.readingTime,
          date: p.date,
          featured: p.featured,
        }))
      : staticPosts;

  return <BlogPageClient posts={posts} />;
}
