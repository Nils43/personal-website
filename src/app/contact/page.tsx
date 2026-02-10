"use client";

import { useState } from "react";
import { Linkedin, Github, Mail, Twitter, ArrowUpRight, Calendar, Check, Copy } from "lucide-react";
import { useScrollAnimation } from "@/components/Animations";
import SpotlightCard from "@/components/SpotlightCard";

const contactLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "Best channel for professional inquiries",
    href: "https://www.linkedin.com/in/nilsheck",
    primary: true,
  },
  {
    icon: Mail,
    label: "E-Mail",
    description: "nils.heck@code.berlin",
    href: "mailto:nils.heck@code.berlin",
    primary: true,
  },
  {
    icon: Github,
    label: "GitHub",
    description: "My code, open source",
    href: "https://github.com/Nils43",
    primary: false,
  },
  {
    icon: Twitter,
    label: "X / Twitter",
    description: "Hot Takes & Quick Thoughts",
    href: "https://x.com/nilsheck",
    primary: false,
  },
];

export default function ContactPage() {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("nils.heck@code.berlin");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 pb-24">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Let&apos;s talk.
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
            Whether it&apos;s collaboration, feedback, an idea, or just a great
            conversation — I&apos;m always reachable. Best via LinkedIn or email.
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {contactLinks.map((link) =>
            link.label === "E-Mail" ? (
              <SpotlightCard key={link.label}>
                <button
                  onClick={copyEmail}
                  className="w-full flex items-start gap-4 p-6 text-left"
                >
                  <div className="p-3 rounded-xl bg-accent/10 text-accent transition-colors">
                    {copied ? <Check size={20} /> : <Mail size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {copied ? "Copied!" : "E-Mail"}
                      </h3>
                      <Copy
                        size={14}
                        className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </button>
              </SpotlightCard>
            ) : (
              <SpotlightCard key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-6"
                >
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      link.primary
                        ? "bg-accent/10 text-accent"
                        : "bg-zinc-800 text-zinc-400 group-hover:text-zinc-300"
                    }`}
                  >
                    <link.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{link.label}</h3>
                      <ArrowUpRight
                        size={14}
                        className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </a>
              </SpotlightCard>
            )
          )}
        </div>

        {/* Schedule CTA */}
        <div className="bg-dark-800 border border-zinc-800 rounded-2xl p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-accent">
            <Calendar size={20} />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            15 min for a coffee call?
          </h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            Pick a slot. No friction, no detours. Looking forward to the
            conversation.
          </p>
          <a
            href="https://calendar.app.google/rvDgSi8CoDK1cG8w6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
          >
            Book a slot
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Availability Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Currently open for conversations & projects
          </div>
        </div>
      </div>
    </div>
  );
}
