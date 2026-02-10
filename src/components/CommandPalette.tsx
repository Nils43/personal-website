"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Briefcase,
  BookOpen,
  MessageCircle,
  Linkedin,
  Github,
  Mail,
  Calendar,
  Command,
  ArrowRight,
  FileText,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "social" | "legal";
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Home",
      description: "Back to the start",
      icon: <Home size={18} />,
      action: () => { router.push("/"); close(); },
      category: "navigation",
    },
    {
      id: "projects",
      label: "Projects",
      description: "What I build",
      icon: <Briefcase size={18} />,
      action: () => { router.push("/projects"); close(); },
      category: "navigation",
    },
    {
      id: "blog",
      label: "Blog",
      description: "What I think",
      icon: <BookOpen size={18} />,
      action: () => { router.push("/blog"); close(); },
      category: "navigation",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Let's talk",
      icon: <MessageCircle size={18} />,
      action: () => { router.push("/contact"); close(); },
      category: "navigation",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "linkedin.com/in/nilsheck",
      icon: <Linkedin size={18} />,
      action: () => { window.open("https://www.linkedin.com/in/nilsheck", "_blank"); close(); },
      category: "social",
    },
    {
      id: "github",
      label: "GitHub",
      description: "github.com/Nils43",
      icon: <Github size={18} />,
      action: () => { window.open("https://github.com/Nils43", "_blank"); close(); },
      category: "social",
    },
    {
      id: "email",
      label: "Email",
      description: "nils.heck@code.berlin",
      icon: <Mail size={18} />,
      action: () => { window.open("mailto:nils.heck@code.berlin"); close(); },
      category: "social",
    },
    {
      id: "schedule",
      label: "Book a call",
      description: "15 min coffee chat",
      icon: <Calendar size={18} />,
      action: () => { window.open("https://calendar.app.google/rvDgSi8CoDK1cG8w6", "_blank"); close(); },
      category: "social",
    },
    {
      id: "impressum",
      label: "Legal Notice",
      description: "Impressum",
      icon: <FileText size={18} />,
      action: () => { router.push("/impressum"); close(); },
      category: "legal",
    },
    {
      id: "datenschutz",
      label: "Privacy Policy",
      description: "Datenschutz",
      icon: <FileText size={18} />,
      action: () => { router.push("/datenschutz"); close(); },
      category: "legal",
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase())
  );

  // Group by category
  const grouped = {
    navigation: filtered.filter((c) => c.category === "navigation"),
    social: filtered.filter((c) => c.category === "social"),
    legal: filtered.filter((c) => c.category === "legal"),
  };

  const flatFiltered = [...grouped.navigation, ...grouped.social, ...grouped.legal];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Arrow keys + Enter
  useEffect(() => {
    if (!open) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        e.preventDefault();
        flatFiltered[selectedIndex].action();
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [open, selectedIndex, flatFiltered]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg mx-4 bg-dark-800 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800">
          <Search size={18} className="text-zinc-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to..."
            className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-zinc-500 bg-dark-900 border border-zinc-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {flatFiltered.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-zinc-500">
              No results found.
            </p>
          )}

          {grouped.navigation.length > 0 && (
            <div>
              <p className="px-5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
                Pages
              </p>
              {grouped.navigation.map((cmd) => {
                runningIndex++;
                const idx = runningIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                      selectedIndex === idx
                        ? "bg-accent/10 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className={selectedIndex === idx ? "text-accent" : ""}>{cmd.icon}</span>
                    <span className="flex-1">
                      <span className="text-sm font-medium">{cmd.label}</span>
                      {cmd.description && (
                        <span className="text-xs text-zinc-500 ml-2">{cmd.description}</span>
                      )}
                    </span>
                    {selectedIndex === idx && <ArrowRight size={14} className="text-accent" />}
                  </button>
                );
              })}
            </div>
          )}

          {grouped.social.length > 0 && (
            <div>
              <p className="px-5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-600 mt-1">
                Connect
              </p>
              {grouped.social.map((cmd) => {
                runningIndex++;
                const idx = runningIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                      selectedIndex === idx
                        ? "bg-accent/10 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className={selectedIndex === idx ? "text-accent" : ""}>{cmd.icon}</span>
                    <span className="flex-1">
                      <span className="text-sm font-medium">{cmd.label}</span>
                      {cmd.description && (
                        <span className="text-xs text-zinc-500 ml-2">{cmd.description}</span>
                      )}
                    </span>
                    {selectedIndex === idx && <ArrowRight size={14} className="text-accent" />}
                  </button>
                );
              })}
            </div>
          )}

          {grouped.legal.length > 0 && (
            <div>
              <p className="px-5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-600 mt-1">
                Legal
              </p>
              {grouped.legal.map((cmd) => {
                runningIndex++;
                const idx = runningIndex;
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                      selectedIndex === idx
                        ? "bg-accent/10 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className={selectedIndex === idx ? "text-accent" : ""}>{cmd.icon}</span>
                    <span className="flex-1">
                      <span className="text-sm font-medium">{cmd.label}</span>
                      {cmd.description && (
                        <span className="text-xs text-zinc-500 ml-2">{cmd.description}</span>
                      )}
                    </span>
                    {selectedIndex === idx && <ArrowRight size={14} className="text-accent" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-zinc-800 text-[11px] text-zinc-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-dark-900 border border-zinc-700 rounded text-[10px]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-dark-900 border border-zinc-700 rounded text-[10px]">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command size={10} />
            <span>K to toggle</span>
          </span>
        </div>
      </div>
    </div>
  );
}
