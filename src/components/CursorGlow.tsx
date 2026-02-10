"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9999] w-[500px] h-[500px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
