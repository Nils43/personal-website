interface BlogPostContent {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categoryIcon: string;
  readingTime: string;
  date: string;
  featured?: boolean;
  content: string;
}

export const blogPosts: BlogPostContent[] = [
  {
    slug: "why-i-took-over-an-agency-at-23",
    title: "Why I Took Over an Agency at 23",
    excerpt:
      "I didn't have a business plan. I had a feeling. Here's what happened when I stopped overthinking and just started.",
    category: "founder",
    categoryLabel: "Founder Life",
    categoryIcon: "🔥",
    readingTime: "6 min",
    date: "2026-02-01",
    featured: true,
    content: `There's a moment that, if you're lucky, plays out exactly once in your life: someone offers you the keys to something real. Not a certificate. Not an introduction. The actual thing.

For me, that came in the form of a LinkedIn agency. The founder was moving on, the clients were there, and the systems — imperfect but functional — were waiting for someone to take care of them. I didn't have a business plan. I had a feeling.

## The Decision

Everyone around me had advice. "You're too young." "Wait until you finish uni." "Have you thought about the liability?" All fair points. But none of them addressed the actual question: *what would I learn by saying no?*

The answer was nothing. Absolutely nothing I couldn't also learn by saying yes, only faster.

## The First 90 Days

Those first three months were brutal in the best way. I inherited client relationships I had to earn from scratch. I redesigned workflows at 2 AM. I learned that "personal brand" is just a fancy word for "do people trust you?"

The biggest surprise? How little of it was about marketing tactics. It was about showing up. Being honest when things were messy. Telling a client "I don't know yet, but I'll figure it out" and then actually figuring it out.

## What I'd Tell My Past Self

Don't wait for the "right" moment. There isn't one. The readiness is a lie — you become ready by doing the thing. The business plan comes after the first crisis, not before.

And if someone offers you the keys? Take them. Even if your hands are shaking.`,
  },
  {
    slug: "750-founders-one-room",
    title: "750 Founders in One Room",
    excerpt:
      "We built the Young Founders Conference from zero. 750 people showed up. This is what I learned about events, energy and community.",
    category: "founder",
    categoryLabel: "Founder Life",
    categoryIcon: "🔥",
    readingTime: "8 min",
    date: "2026-01-15",
    featured: true,
    content: `Right before I walked on stage, someone grabbed my shoulder. "There's no more chairs. We're putting people in the hallway."

750 founders. One room. And six months ago, this conference was just a Notion doc with three bullet points.

## Starting from Zero

The Young Founders Conference started the way most good things do: with a naive question. "Why isn't there a big event for young founders in Germany?" We had the community — 1,500+ members in the Young Founders Network. We had the energy. What we didn't have was experience, sponsors, or a venue.

## What We Got Right

**Curation over scale.** We could have made it a generic startup event. Instead, we were brutal about the lineup. Every speaker had to be someone you'd actually want to grab coffee with afterward.

**Energy design.** This is the thing nobody talks about. The schedule, the room layout, the music between talks — it all shapes how people feel. We treated energy like a product feature.

**Community first, content second.** The breaks were longer than the talks. On purpose. Because the real value is in the conversations that happen in hallways, not on stage.

## What I Learned

Running a 750-person event at 23 teaches you one thing above all: nothing scales like trust. Our speakers said yes because they trusted us. Sponsors came on board because they'd seen our community. Attendees showed up because their friends told them to.

You can't hack trust. You can only build it. Slowly, consistently, honestly.`,
  },
  {
    slug: "linkedin-personal-branding-from-inside",
    title: "LinkedIn Personal Branding: What I've Learned Writing for Others",
    excerpt:
      "I ghostwrite LinkedIn content for founders and executives. Here's what actually works — and what everyone gets wrong.",
    category: "founder",
    categoryLabel: "Founder Life",
    categoryIcon: "🔥",
    readingTime: "7 min",
    date: "2025-11-10",
    content: `I run an agency that builds personal brands on LinkedIn. That means I've seen thousands of posts — the ones that went viral, the ones that flopped, and everything in between. Here's what I've learned.

## The Myth of the Perfect Post

Everyone thinks there's a formula. Hook + story + CTA = engagement. And sure, structure helps. But the posts that actually perform? They're the ones where someone says something they're slightly afraid to say.

## What Actually Works

**Specificity beats inspiration.** "I learned a lot" is forgettable. "I lost our biggest client on a Tuesday and rebuilt the pipeline by Friday" is not. Details make people lean in.

**Your opinion is the product.** Don't just share — argue for something. The best LinkedIn content is someone taking a clear position and defending it with their experience.

**Consistency compounds.** The founders I've seen grow fastest are not the best writers. They're the ones who post three times a week for six months without stopping.

## The Agency Perspective

What's fascinating about running an agency around this is how much it's really about psychology. Understanding what makes a founder unique is half the battle. The writing is the easy part. The hard part is getting someone to say what they actually think, not what they think the algorithm wants.

## My Advice

Start before you're ready. Post the thing that makes you uncomfortable. And for the love of all that is good, stop starting every post with "I'm thrilled to announce."`,
  },
  {
    slug: "building-an-energy-dashboard-with-ai",
    title: "Building an Energy Dashboard with AI",
    excerpt:
      "A side project that taught me more than a semester at uni. APIs, real-time data, and why energy transparency matters.",
    category: "tech",
    categoryLabel: "Tech & Building",
    categoryIcon: "🤖",
    readingTime: "6 min",
    date: "2025-11-25",
    content: `Sometimes the best way to learn a technology is to solve a problem you actually care about. For me, that was energy transparency.

## The Problem

Germany's energy grid is complex. Renewable generation fluctuates by the hour. Pricing changes constantly. And yet, most of the data is buried in government PDFs and utility company portals. I wanted to make it accessible.

## The Stack

I built the dashboard with Next.js, pulling real-time data from the ENTSO-E API and a couple of other public sources. The AI part came in for anomaly detection — using simple ML models to spot unusual consumption patterns and predict peak loads.

## What I Learned

**APIs are messy.** Real-world data isn't clean. The ENTSO-E API returns XML (yes, XML in 2025). Parsing, normalizing, and caching was half the project.

**Visualization is crucial.** The dashboard could calculate everything perfectly, but if the chart was confusing, it was useless. I spent more time on the UI than on the data pipeline.

**Side projects > coursework.** I learned more about system design, API integration, and deployment in this project than in any university module. Because the stakes felt real.

## The Takeaway

If you're studying CS or software engineering, build something with real-world data. It'll teach you things no textbook can.`,
  },
  {
    slug: "from-environmental-engineering-to-code",
    title: "From Environmental Engineering to Software Engineering",
    excerpt:
      "I switched degrees halfway through. Everyone thought I was crazy. Turns out it was the best decision I ever made.",
    category: "tech",
    categoryLabel: "Tech & Building",
    categoryIcon: "🤖",
    readingTime: "7 min",
    date: "2025-12-10",
    content: `Two years into my Environmental Engineering degree, I realized something: I didn't want to analyze problems. I wanted to build solutions.

## The Switch

Telling my parents was the hard part. Telling the university was paperwork. But the actual decision? That was easy once I was honest with myself.

I'd been coding on the side for a year. Building small tools, automating workflows, tinkering with APIs. Every time I sat down to write code, I lost track of time. Every time I opened my thermodynamics textbook, I lost the will to live.

## Why CODE University

CODE is different. No lectures. No exams. Just projects — real ones, with real stakes. You learn by building. The curriculum is a framework, not a cage. That's exactly what I needed.

## What I Kept from Environmental Engineering

Not nothing. The systems thinking. Understanding how complex networks interact. The sense that technology should serve the planet, not just shareholders. That stayed with me.

## The Advice I'd Give

If you're in the wrong degree and you know it — switch. The sunk cost fallacy will eat years of your life. The "right" path is the one where you do your best work, and you can feel that in your body.

Don't optimize for the resume. Optimize for the energy.`,
  },
  {
    slug: "shipping-my-first-app",
    title: "What I Learned Shipping My First App to the App Store",
    excerpt:
      "From idea to App Store in 3 months as a solo dev. The mistakes, the breakthroughs, and why shipping beats perfecting.",
    category: "tech",
    categoryLabel: "Tech & Building",
    categoryIcon: "🤖",
    readingTime: "5 min",
    date: "2025-10-20",
    content: `I built Globy — a travel buddy matching app — in three months, solo. Designed it, coded it, shipped it to the App Store. Here's what happened.

## The Idea

Ever wanted to find someone to travel with who actually matches your vibe? Same budget, same pace, same taste in food? That's Globy. Simple concept. Surprisingly complex execution.

## The Build

I used Swift and SwiftUI. My first real mobile app. I'd done web development before, but native iOS was a different beast. The learning curve was steep, but that's the point.

The matching algorithm was the fun part — combining travel preferences, dates, and personality indicators into a compatibility score. The App Store review process was the not-fun part.

## The Mistakes

**Over-engineering early.** I spent two weeks building a feature nobody asked for. Classic. The first version should have been embarrassingly simple.

**Underestimating design.** Developers think UX is a nice-to-have. Users think it's everything. I redesigned the onboarding flow three times.

**Not launching sooner.** The app was "ready" at month two. I spent another month polishing things nobody noticed.

## The Lesson

Ship the thing. Not tomorrow. Not when it's perfect. Now. Because the feedback you get from real users in one week is worth more than three months of solo iteration.

Globy didn't become the next Airbnb. But it made me a developer. And that's the real product.`,
  },
  {
    slug: "defence-tech-europe",
    title: "Defence Tech in Europe: Why Founders Should Pay Attention",
    excerpt:
      "Europe is waking up to the fact that security needs technology. Why this might be the most important sector of the decade.",
    category: "europe",
    categoryLabel: "Europe & Policy",
    categoryIcon: "🇪🇺",
    readingTime: "10 min",
    date: "2026-01-08",
    content: `Let's talk about the elephant in the European room: defence tech. For decades, the European startup scene has been allergic to anything military-adjacent. That's changing. Fast.

## The Context

The geopolitical shifts of the last few years have made one thing painfully clear: Europe cannot outsource its security. And modern security is not just tanks and treaties — it's software, satellites, AI, and cybersecurity.

## Why Founders Should Care

The European Defence Fund is deploying billions. NATO is actively seeking startup partnerships. And for the first time, European VCs are openly backing defence-adjacent companies.

This isn't about building weapons. It's about building the infrastructure that keeps democracies safe: communication systems, logistics optimization, threat detection, supply chain resilience.

## The Ethical Question

I know this is uncomfortable. It should be. Any founder entering this space needs to draw clear ethical lines. But avoiding the sector entirely because it's "icky" is a luxury we can no longer afford.

The alternative to European founders building defence tech isn't a world without it — it's a world where only others build it.

## The Opportunity

Dual-use technology is where the smartest founders will play. Space tech that serves both civilian and defence purposes. AI models that handle crisis logistics. Cybersecurity tools that protect both companies and nations.

Europe has the engineering talent. What it needs is founders willing to work on hard problems that matter.`,
  },
  {
    slug: "european-tech-sovereignty",
    title: "Can Europe Build Its Own Tech Future?",
    excerpt:
      "We have the talent, the capital is growing, and the urgency is obvious. So what's actually holding us back?",
    category: "europe",
    categoryLabel: "Europe & Policy",
    categoryIcon: "🇪🇺",
    readingTime: "8 min",
    date: "2025-12-01",
    content: `Every year, the same question makes the rounds at European tech conferences: "Can we compete with Silicon Valley?" And every year, the answer is the same: "We have the talent, we just need to…" followed by a list of things that never happen.

Let me try a different framing.

## The Real Question

It's not whether Europe *can* build great tech companies. We already do. It's whether we can build an ecosystem that retains its best founders and scales its best companies without them eventually moving to the US.

## What's Actually Working

**Talent is world-class.** European universities produce incredible engineers. The research happening in Berlin, Munich, Helsinki, Amsterdam, and Paris is globally competitive.

**Capital is growing.** European VC has tripled in the last decade. The late-stage gap is closing, slowly but visibly.

**Mission-driven founders.** European founders tend to care about more than equity. CleanTech, HealthTech, GovTech — the most ambitious European startups solve real problems.

## What's Holding Us Back

**Fragmented markets.** Selling in Europe means navigating 27 regulatory regimes. A startup in Ohio can access 330 million consumers with one product. A startup in Austria cannot.

**Risk aversion culture.** Failure is still stigmatized in most of Europe. Until we celebrate the founder who tried and failed as much as the one who exited for billions, we'll lag.

**Regulatory overreach.** The GDPR was necessary. The AI Act might be. But regulation designed by people who've never built anything tends to optimize for control, not innovation.

## My Take

Europe's tech future isn't about copying Silicon Valley. It's about building something better — slower maybe, but more sustainable, more equitable, more deeply rooted in values that matter.

But we need to move faster. The window is open. It won't stay open forever.`,
  },
  {
    slug: "10-bold-asks",
    title: "10 Bold Asks That Changed My Year",
    excerpt:
      "I reached out to 10 people I had no business contacting. Most replied. Some became mentors. Here's the playbook.",
    category: "thinking",
    categoryLabel: "Thinking Out Loud",
    categoryIcon: "💭",
    readingTime: "5 min",
    date: "2025-12-20",
    content: `In January 2025, I made a list. Ten people I admired. CEOs, investors, founders, thinkers. People who had absolutely no reason to reply to a 22-year-old from Stuttgart. I wrote to all of them. Here's what happened.

## The Rules

1. **Be specific.** Not "I'd love to pick your brain." Instead: "I'm building X, you did Y, I have one question about Z."
2. **Be short.** Three sentences max. If you can't explain what you want in three sentences, you don't know what you want.
3. **Be genuine.** Don't fake admiration. Don't name-drop. Just be real about why you're reaching out.

## The Results

- 10 messages sent
- 7 replies
- 4 calls booked
- 2 became ongoing mentors
- 1 led to a partnership

## The Takeaways

**People want to help.** This was the biggest surprise. The most successful people I contacted were often the fastest to respond. Turns out, busy people are decisive — they either say yes or no, quickly.

**The ask matters more than the pitch.** Nobody cares about your startup in a cold DM. They care about a well-framed question that shows you've done your homework.

**Follow up honestly.** When someone gives you advice and you act on it, tell them. That's how a one-time reply becomes an ongoing relationship.

## The Playbook

Make your list. Write the messages. Send them on a Monday morning. And accept that the worst possible outcome is silence — which is exactly where you started.`,
  },
  {
    slug: "what-building-community-taught-me",
    title: "What Building a Community of 2,000 Founders Taught Me About People",
    excerpt:
      "Communities aren't products. They're living things. Notes on trust, energy, and why most community efforts fail.",
    category: "thinking",
    categoryLabel: "Thinking Out Loud",
    categoryIcon: "💭",
    readingTime: "8 min",
    date: "2025-09-15",
    content: `The Young Founders Network has over 2,000 members now. We've hosted hundreds of events, connected thousands of founders, and built chapters across Germany. Here's what I've learned.

## Communities Are Not Products

You can't ship a community. You can't A/B test trust. You can't growth-hack belonging. I've seen dozens of "community platforms" fail because they treated human connection like a feature to be optimized.

## What Actually Makes a Community Work

**Shared identity, not shared interests.** "We're all young founders" is stronger than "we all like startups." Identity creates belonging. Interest creates mailing lists.

**Small before big.** Our Stuttgart chapter started with 12 people in a co-working space. That intimacy built trust faster than any 500-person event could. Scale the vibe before you scale the numbers.

**Give more than you take.** The members who get the most from YFN are the ones who give the most. We designed for contribution, not consumption. Your community should feel like a team, not an audience.

## Why Most Community Efforts Fail

**They start with a platform, not a purpose.** If your first step is buying a Slack workspace, you're already lost. Start with why these people need each other.

**They optimize for metrics.** Member count is vanity. What matters is: do people show up twice? Do they bring friends? Do they reach out to each other without prompting?

**They underestimate maintenance.** Community building is a marathon. The excitement fades after month three. The founders who stick with it are the ones who genuinely care about the people, not just the project.

## The Biggest Lesson

People don't join communities for content, or events, or networking. They join because they're looking for others like them. Your job is just to create the space where they can find each other.`,
  },
];

export function getPostBySlug(slug: string): BlogPostContent | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
