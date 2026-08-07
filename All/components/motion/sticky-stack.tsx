"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Baraja de tarjetas apiladas por scroll ("scroll with fade effect" de Skiper
 * UI): cada tarjeta se queda pegada arriba y la siguiente la cubre mientras la
 * de debajo encoge y se apaga. Da profundidad sin necesitar pin manual.
 *
 * El sticky lo hace CSS; GSAP solo se encarga del escalado/opacidad, así que
 * en móvil (donde desactivamos el efecto) las tarjetas quedan en una columna
 * normal y perfectamente usable.
 */
export function StickyStack({
  children,
  className = "",
  /** Separación vertical entre tarjetas apiladas (px). */
  offset = 24,
}: {
  children: ReactNode[];
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const mm = gsap.matchMedia();
      // Solo en escritorio: en táctil el sticky encadenado marea y alarga
      // muchísimo la página.
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".sticky-stack__card",
          el,
        );

        cards.forEach((card, i) => {
          // La última no se encoge: es la que queda a la vista al final.
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.35,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top+=120",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="sticky-stack__card lg:sticky will-change-transform"
          style={{ top: `calc(8rem + ${i * offset}px)`, zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
