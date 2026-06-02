"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

type SplitHeadlineProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

/**
 * Titular que se ensambla letra a letra al cargar (SplitText), con una ligera
 * rotación 3D. Es el efecto "firma" del hero, encapsulado para reutilizarlo en
 * los titulares de toda la web de forma consistente.
 * Respeta "prefers-reduced-motion".
 */
export function SplitHeadline({
  children,
  className,
  style,
  delay = 0.2,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const split = new SplitText(el, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        rotateX: -50,
        stagger: 0.035,
        duration: 0.9,
        ease: "power4.out",
        delay,
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <h1
      ref={ref}
      className={className}
      style={{ perspective: "600px", ...style }}
    >
      {children}
    </h1>
  );
}
