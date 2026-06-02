"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll global con Lenis, sincronizado con el ticker de GSAP.
 * Esta sincronización es la que permite que los efectos de scroll de GSAP
 * (pin, scrub en el hero) vayan perfectamente acoplados a la inercia de Lenis.
 * Respeta "prefers-reduced-motion" para accesibilidad.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Si el usuario pidió menos movimiento, no activamos el smooth scroll.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Lenis avisa a ScrollTrigger en cada scroll para que recalcule.
    lenis.on("scroll", ScrollTrigger.update);

    // El ticker de GSAP conduce a Lenis (un único RAF para todo).
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
