"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Cinta de texto infinita que reacciona al scroll (el "horizontal text reveal"
 * de Skiper UI). Además de moverse sola, al hacer scroll acelera y cambia de
 * sentido según hacia dónde te muevas: es el detalle que hace que parezca viva
 * en vez de un bucle CSS.
 *
 * El contenido se duplica para que el bucle sea continuo; la copia va oculta
 * a lectores de pantalla.
 */
export function Marquee({
  children,
  /** Segundos que tarda una vuelta completa. Menos = más rápido. */
  speed = 24,
  /** Sentido base: -1 hacia la izquierda, 1 hacia la derecha. */
  direction = -1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  direction?: -1 | 1;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const track = el.querySelector<HTMLElement>(".marquee__track");
      if (!track) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Recorremos el 50% porque el contenido está duplicado: al llegar ahí
      // la segunda copia está exactamente donde arrancó la primera.
      const tween = gsap.to(track, {
        xPercent: direction * 50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      // El scroll empuja la cinta: acelera y puede invertir el sentido.
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3);
          gsap.to(tween, {
            timeScale: (self.direction === 1 ? 1 : -1) * boost,
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`marquee relative overflow-hidden ${className}`}>
      <div className="marquee__track flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
      {/* Difuminado en los bordes para que el texto no se corte en seco. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}
