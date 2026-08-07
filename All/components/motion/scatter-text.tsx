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

type ScatterTextProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Etiqueta a renderizar (h1 por defecto). */
  as?: ElementType;
  delay?: number;
  /** Radio máximo de dispersión inicial en px. */
  spread?: number;
  /** Si es true, espera a entrar en el viewport en vez de animar al cargar. */
  onScroll?: boolean;
};

/**
 * Titular "scatter": las letras arrancan dispersas por la pantalla, giradas y
 * desenfocadas, y se ensamblan de golpe en su sitio. Es el efecto de entrada
 * del hero de Animaster ("UN-COMMON COMPONENTS").
 *
 * A diferencia de <SplitHeadline/> (que sube las letras en cascada), aquí el
 * orden de llegada es aleatorio, lo que da una sensación mucho más física.
 * Respeta "prefers-reduced-motion": sin animación, texto directamente legible.
 */
export function ScatterText({
  children,
  className,
  style,
  as: Tag = "h1",
  delay = 0.2,
  spread = 220,
  onScroll = false,
}: ScatterTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(el, { type: "chars" });

      gsap.from(split.chars, {
        // Cada letra parte de un punto aleatorio alrededor de su posición final.
        x: () => gsap.utils.random(-spread, spread),
        y: () => gsap.utils.random(-spread * 0.6, spread * 0.6),
        rotate: () => gsap.utils.random(-70, 70),
        scale: () => gsap.utils.random(0.4, 1.8),
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.1,
        ease: "power4.out",
        delay,
        // El orden aleatorio es lo que hace que se "ensamble" en vez de barrer.
        stagger: { each: 0.022, from: "random" },
        ...(onScroll
          ? {
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }
          : {}),
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ perspective: "800px", ...style }}
    >
      {children}
    </Tag>
  );
}
