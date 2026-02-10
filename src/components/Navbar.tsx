"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Linkedin, Github, Mail, Command, MapPin, Coffee, Moon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

function getTimezoneStatus(city = "Berlin") {
  const now = new Date();
  const berlin = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
  const hour = berlin.getHours();
  const day = berlin.getDay(); // 0=Sun, 6=Sat

  if (day === 0 || day === 6) {
    return { text: `Off duty · ${city}`, color: "yellow", icon: "coffee" as const };
  } else if (hour >= 9 && hour < 18) {
    return { text: `Working · ${city}`, color: "green", icon: "pin" as const };
  } else if (hour >= 18 && hour < 23) {
    return { text: `${city} · Evening`, color: "yellow", icon: "coffee" as const };
  } else {
    return { text: `${city} · Offline`, color: "zinc", icon: "moon" as const };
  }
}

function useAutoStatus() {
  const [status, setStatus] = useState({ text: "Berlin", color: "green", icon: "pin" as "pin" | "coffee" | "moon" });

  useEffect(() => {
    let mounted = true;

    const fetchLocation = async () => {
      try {
        const res = await fetch("/api/location", { cache: "no-store" });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!mounted) return;

        const city = data.city || "Berlin";
        // Use fetched city name with timezone-based activity status
        setStatus(getTimezoneStatus(city));
      } catch {
        // API unavailable — fall back to timezone with default city
        if (mounted) setStatus(getTimezoneStatus("Berlin"));
      }
    };

    // Initial fetch + timezone update
    fetchLocation();

    // Re-fetch location every 5 minutes, update activity every minute
    const locationInterval = setInterval(fetchLocation, 5 * 60 * 1000);
    const activityInterval = setInterval(() => {
      // Just refresh the activity part (working/evening/offline)
      setStatus((prev) => {
        const city = prev.text.replace(/^(Working|Off duty|Off duty) · /, "").replace(/ · (Evening|Offline)$/, "");
        return getTimezoneStatus(city);
      });
    }, 60000);

    return () => {
      mounted = false;
      clearInterval(locationInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return status;
}

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const status = useAutoStatus();

  const statusColors = {
    green: {
      bg: "bg-green-500/10 border-green-500/20 text-green-400",
      dot: "bg-green-400",
    },
    yellow: {
      bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      dot: "bg-yellow-400",
    },
    zinc: {
      bg: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400",
      dot: "bg-zinc-400",
    },
  };
  const sc = statusColors[status.color as keyof typeof statusColors];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo + Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white hover:text-accent transition-colors"
          >
            Nils Heck
          </Link>
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${sc.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${status.color === "green" ? "animate-pulse" : ""}`} />
            {status.icon === "pin" && <MapPin size={10} />}
            {status.icon === "coffee" && <Coffee size={10} />}
            {status.icon === "moon" && <Moon size={10} />}
            {status.text}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="w-px h-5 bg-zinc-700" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                );
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-500 bg-dark-800 border border-zinc-700 rounded-lg hover:border-zinc-600 hover:text-zinc-400 transition-colors"
              title="Command Palette"
            >
              <Command size={12} />
              <span>K</span>
            </button>
            <a
              href="https://www.linkedin.com/in/nilsheck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Nils43"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:nils.heck@code.berlin"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="E-Mail"
            >
              <Mail size={18} />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-zinc-800 my-2" />
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/nilsheck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Nils43"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:nils.heck@code.berlin"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
