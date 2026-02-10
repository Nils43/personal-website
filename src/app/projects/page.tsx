"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/components/Animations";
import SpotlightCard from "@/components/SpotlightCard";

interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  status: "active" | "completed" | "coming-soon";
  bullets: string[];
  achievement?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: "agentur",
    title: "Personal Branding Agency",
    tagline: "I build the voices that are changing LinkedIn.",
    role: "Founder & CEO",
    period: "2026 – Present",
    status: "active",
    bullets: [
      "Agency around one idea: founders should own their narrative",
      "Personal branding for founders and executives who want to be heard, not just seen",
      "One proprietary playbook. One operating system."
    ],
  },
  {
    id: "yfn",
    title: "Young Founders Network (YFN)",
    tagline: "1500+ founders. One community. From founders for founders.",
    role: "Board Member, Partnerships",
    period: "2024 – Present",
    status: "active",
    bullets: [
      "Leading partnerships at Germany's biggest founder community for under-25s",
      "EU Commission hackathon & EUpreneur campaign – bridging founders and policy",
      "Former Berlin & Stuttgart chapter lead – built Stuttgart from zero",
      
    ],
  
  },
  
  {
    id: "app",
    title: "Globy - My first app",
    tagline: "My first product. Built, launched, learned.",
    role: "Solo Developer",
    period: "2024",
    status: "completed",
    bullets: [
      "Ever wanted to find the right travel buddy? I built an app for that.",
      "Designed, coded and shipped it to the App Store – solo, start to finish",
      "My first real product. The best classroom I've ever had.",
    ],
  },
  
];

function StatusBadge({ status }: { status: Project["status"] }) {
  const config = {
    active: {
      label: "Active",
      classes: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    completed: {
      label: "Completed",
      classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    },
    "coming-soon": {
      label: "Coming Soon",
      classes: "bg-accent/10 text-accent border-accent/20",
    },
  };
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.classes}`}
    >
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse" />
      )}
      {c.label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SpotlightCard
      className={expanded ? "glow" : ""}
    >
      {/* Header — always visible (Bela-style overview) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-zinc-400 text-sm italic">
              &ldquo;{project.tagline}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>{project.role}</span>
              <span>·</span>
              <span>{project.period}</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors mt-1">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>

      {/* Expanded details (Sam-style depth) */}
      {expanded && (
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 space-y-4 animate-fade-in">
          <div className="h-px bg-zinc-800" />
          <ul className="space-y-2">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
          {project.achievement && (
            <div className="line-accent pl-4 py-2">
              <p className="text-sm text-accent font-medium">
                {project.achievement}
              </p>
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors font-medium"
            >
              View Project
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      )}
    </SpotlightCard>
  );
}

export default function ProjectsPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="pt-32 pb-24">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            What I build
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            I don&apos;t just talk — I ship. These are the projects that drive me.
            Click for the full story.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm">
            More projects coming. Stay tuned.
          </p>
        </div>
      </div>
    </div>
  );
}
