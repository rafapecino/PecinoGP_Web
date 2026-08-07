"use client";

import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

/**
 * Revelado por máscara línea a línea: cada renglón sube desde detrás de un
 * recorte invisible, como si el texto se descubriera por una rendija. Es el
 * "text reveal box" de Skiper UI, y es el efecto correcto para titulares de
 * sección (el scatter queda reservado para los hero).
 *
 * Respeta "prefers-reduced-motion": sin animación, texto visible desde el inicio.
 */
export function MaskReveal({
  children,
  className,
  style,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.12,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | null = null;
      let cancelled = false;

      // Partir por líneas depende de dónde caen los saltos, y eso cambia
      // cuando termina de cargar la tipografía. Si dividimos antes, las
      // líneas quedan mal cortadas: por eso esperamos a document.fonts.ready.
      document.fonts.ready.then(() => {
        if (cancelled) return;

        // mask: "lines" envuelve cada línea en un contenedor con overflow
        // hidden, que es lo que produce el recorte sin tocar el marcado.
        split = new SplitText(el, { type: "lines", mask: "lines" });

        gsap.from(split.lines, {
          yPercent: 115,
          opacity: 0,
          duration: 1,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start, once: true },
        });

        // Las alturas han cambiado al envolver las líneas: recalculamos para
        // que el resto de disparadores de la página no se descoloque.
        ScrollTrigger.refresh();
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
