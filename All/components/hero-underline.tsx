"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

/**
 * Racing line: subrayado SVG que se dibuja a trazo (anime.js, strokeDashoffset)
 * bajo el titular del hero, tras la entrada del SplitHeadline.
 * Respeta prefers-reduced-motion (aparece ya dibujada).
 */
export function HeroUnderline({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDashoffset = `${len}`;
    const anim = anime({
      targets: path,
      strokeDashoffset: [len, 0],
      duration: 1100,
      delay: 850,
      easing: "easeInOutQuart",
    });
    return () => anim.pause();
  }, []);

  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      aria-hidden
      className={`mx-auto -mt-3 md:-mt-5 mb-7 w-[200px] md:w-[300px] ${className}`}
    >
      <path
        ref={pathRef}
        d="M6 16 C 80 6, 240 4, 314 12"
        stroke="#dc2626"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(220,38,38,0.6))" }}
      />
    </svg>
  );
}
