"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("fadeOut");
    }
  }, [children, displayChildren]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        transitionStage === "fadeIn"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      }`}
      onTransitionEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayChildren(children);
          setTransitionStage("fadeIn");
        }
      }}
    >
      {displayChildren}
    </div>
  );
}
