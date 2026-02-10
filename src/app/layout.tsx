import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nilsheck.com"),
  title: "Nils Heck — Builder. Founder. Future Thinker.",
  description:
    "Founder, connector, deep tech enthusiast. I build companies, bring founders together, and work at the intersection of technology and policy.",
  keywords: [
    "Nils Heck",
    "Founder",
    "Young Founders Network",
    "LinkedIn Agency",
    "Berlin",
    "Startup",
    "Deep Tech",
  ],
  authors: [{ name: "Nils Heck" }],
  openGraph: {
    title: "Nils Heck — Builder. Founder. Future Thinker.",
    description:
      "Founder, connector, deep tech enthusiast. I build companies, bring founders together, and work at the intersection of technology and policy.",
    url: "https://nilsheck.com",
    siteName: "Nils Heck",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nils Heck — Builder. Founder. Future Thinker.",
    description:
      "Founder, connector, deep tech enthusiast. I build companies, bring founders together, and work at the intersection of technology and policy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-dark-900 text-white antialiased`}
      >
        <ScrollProgress />
        <CursorGlow />
        <ConsoleEasterEgg />
        <Navbar />
        <CommandPalette />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
