import Link from "next/link";
import { Linkedin, Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-zinc-500">
              © 2026 Nils Heck · Built in Berlin
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/impressum"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Legal Notice
              </Link>
              <span className="text-zinc-700">·</span>
              <Link
                href="/datenschutz"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Right — Social Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/nilsheck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Nils43"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:nils.heck@code.berlin"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="E-Mail"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://x.com/nilsheck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="X / Twitter"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
