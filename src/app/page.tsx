"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, BookOpen, Zap } from "lucide-react";
import { useScrollAnimation } from "@/components/Animations";
import DotGrid from "@/components/DotGrid";
import SpotlightCard from "@/components/SpotlightCard";

function useTypewriter(text: string, speed = 80, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  if (hour >= 18 && hour < 22) return "Good evening";
  return "Hey, night owl";
}

/* ─────────────────────────── HERO ─────────────────────────── */
function HeroSection() {
  const [greeting, setGreeting] = useState("Hey");
  useEffect(() => { setGreeting(getGreeting()); }, []);
  const heroPhrase = `${greeting}, I'm Nils.`;
  const { displayed: heroText, done: heroDone } = useTypewriter(heroPhrase, 70, 300);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated dot grid */}
      <DotGrid />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-dark-700 border border-zinc-800">
              <Image
                src="/me.jpeg"
                alt="Nils Heck"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />
              {/* Decorative border glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              <Zap size={14} />
              Open for conversations
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {heroText.includes("Nils") ? (
                <>
                  {heroText.replace("Nils.", "")}
                  <span className="gradient-text">{heroText.slice(heroText.indexOf("Nils"))}</span>
                </>
              ) : (
                heroText
              )}
              {!heroDone && <span className="animate-pulse text-accent">|</span>}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-lg">
              I build startups, write code and connect founders. I believe great
              companies are built at the intersection of technology, community
              and the courage to do things differently.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
              >
                What I build
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-medium rounded-xl transition-all duration-200 hover:bg-zinc-800/50"
              >
                Let&apos;s talk
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SCROLLING KEYWORDS ─────────────────── */
function ScrollingKeywords() {
  const keywords = [
    "Startups",
    "AI",
    "Community Building",
    "Builder",
    "CleanTech",
    "LinkedIn",
    "Personal Branding",
    "Storyteller",
    "Europe",
    "Software Engineering",
    
  ];
  const scrollItems = [...keywords, ...keywords];

  return (
    <section className="py-8 border-y border-zinc-800/50 overflow-hidden">
      <div className="logo-scroll-container">
        <div className="flex animate-logo-scroll gap-6 w-max">
          {scrollItems.map((word, i) => (
            <span
              key={i}
              className="flex-shrink-0 text-sm font-medium text-zinc-500 flex items-center gap-6"
            >
              {word}
              <span className="text-zinc-700">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── ABOUT SECTION ─────────────────────── */
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const quickFacts = [
    { icon: "📍", label: "Based in", value: "Berlin" },
    { icon: "🎓", label: "Studying", value: "Software Engineering @ CODE" },
    { icon: "🔨", label: "Building", value: "Agency · YFN" },
    { icon: "🧠", label: "Interested in", value: "AI · Tech · Community" },
  ];

  return (
    <section className="py-24 sm:py-32" id="about">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Who I am
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed text-base sm:text-lg">
              <p>
                I grew up in Stuttgart, moved to Berlin and somewhere along the
                way started building things. First side projects, then teams,
                then actual companies and networks.
              </p>
              <p>
                Right now I run my own agency and serve on the
                board of the{" "}
                <span className="text-white font-medium">
                  Young Founders Network
                </span>
                , Germany&apos;s largest community for founders under 25. On the
                side I study Software Engineering at CODE University and try to
                figure out how Europe can stay competitive in tech.
              </p>
              <p className="text-zinc-300">
                Most of my thinking revolves around AI – not just the technology, but how it will fundamentally change the way we work, build and think
              </p>
            </div>
          </div>

          {/* Quick Facts — 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-dark-800 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                Quick Facts
              </h3>
              <div className="space-y-3">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start gap-3 py-2 border-b border-zinc-800/50 last:border-0"
                  >
                    <span className="text-base mt-0.5">{fact.icon}</span>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide">
                        {fact.label}
                      </p>
                      <p className="text-sm text-zinc-200 font-medium">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── INTERACTIVE TOUCHES ──────────────────── */
function InteractiveSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Bookshelf */}
          <SpotlightCard>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-accent" />
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  Bookshelf
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Zero to One", author: "Peter Thiel", reading: true },
                  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", reading: false },
                  { title: "Blitzscaling", author: "Reid Hoffman", reading: false },
                  { title: "The Lean Startup", author: "Eric Ries", reading: false },
                  { title: "Principles", author: "Ray Dalio", reading: false },
                ].map((book) => (
                  <div key={book.title} className="flex items-center gap-3 py-1.5 border-b border-zinc-800/50 last:border-0">
                    <span className="text-base">{book.reading ? "📖" : "📕"}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${book.reading ? "text-white" : "text-zinc-400"}`}>{book.title}</p>
                      <p className="text-xs text-zinc-600">{book.author}</p>
                    </div>
                    {book.reading && (
                      <span className="text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full flex-shrink-0">Reading</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Location — real map */}
          <SpotlightCard>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-accent" />
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  Location
                </span>
              </div>
              <p className="text-white font-semibold text-lg">Berlin, Germany</p>
              <p className="text-zinc-500 text-sm mt-1">
                52.52°N, 13.405°E
              </p>
              <div className="mt-4 h-32 rounded-lg overflow-hidden border border-zinc-800/50">
                <iframe
                  title="Berlin Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=13.25%2C52.45%2C13.55%2C52.58&layer=mapnik&marker=52.52%2C13.405"
                  className="w-full h-full border-0 grayscale brightness-75 contrast-125"
                  loading="lazy"
                />
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── CTA SECTION ──────────────────── */
function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-accent/10 via-dark-800 to-dark-800 border border-zinc-800 p-12 sm:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 relative z-10">
            Let&apos;s talk.
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-8 relative z-10">
            Whether it&apos;s collaboration, feedback, or just a great conversation
            — I&apos;m always reachable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
            >
              Get in touch
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── HOME PAGE ──────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollingKeywords />
      <AboutSection />
      <InteractiveSection />
      <CTASection />
    </>
  );
}
