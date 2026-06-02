"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Distancia de desplazamiento vertical (px). Intensidad intermedia por defecto. */
  y?: number;
  delay?: number;
  duration?: number;
  /** Si >0, anima los hijos directos en cascada en vez del bloque entero. */
  stagger?: number;
  /** Punto de disparo de ScrollTrigger. */
  start?: string;
};

/**
 * Reveal con GSAP ScrollTrigger: el contenido entra con fade + slide + escala
 * ligera al aparecer en el viewport. Reutilizable en toda la web para dar una
 * sensación de scroll coherente sin reescribir cada sección a mano.
 * Respeta "prefers-reduced-motion".
 */
export function Reveal({
  children,
  className,
  y = 60,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const targets = stagger > 0 ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        scale: 0.98,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
