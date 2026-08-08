"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

/**
 * Contador telemetría (anime.js): cuenta de 0 al valor al entrar en viewport,
 * con desaceleración easeOutExpo y formato es-ES. Respeta reduced-motion.
 */
export function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v: number) => Math.round(v).toLocaleString("es-ES");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.textContent = fmt(value);
      return;
    }

    el.textContent = "0";
    let anim: ReturnType<typeof anime> | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const obj = { v: 0 };
        anim = anime({
          targets: obj,
          v: value,
          duration,
          easing: "easeOutExpo",
          update: () => {
            el.textContent = fmt(obj.v);
          },
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [value, duration]);

  return <span ref={ref} className={`tabular-nums ${className}`} />;
}
