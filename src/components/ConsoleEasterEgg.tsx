"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = [
      "color: #3B82F6",
      "font-size: 16px",
      "font-weight: bold",
      "padding: 8px 0",
    ].join(";");

    const subtitleStyles = [
      "color: #A1A1AA",
      "font-size: 12px",
      "padding: 4px 0",
    ].join(";");

    console.log(
      "%c👋 Hey, you found the console!",
      styles
    );
    console.log(
      "%cI'm Nils — if you're reading this, you're probably a developer.",
      subtitleStyles
    );
    console.log(
      "%cLet's connect: nils.heck@code.berlin",
      subtitleStyles
    );
    console.log(
      "%c⌘K opens the command palette — try it!",
      subtitleStyles
    );
  }, []);

  return null;
}
