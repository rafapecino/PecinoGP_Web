"use client";

import { useRef, type ComponentType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LucideProps } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StatBadgeProps = {
  /** Valor numérico final (se anima de 0 a este número al entrar en pantalla). */
  value: number;
  /** Sufijo tras el número: "M", "K", "h", "€"… */
  suffix?: string;
  /** Decimales a mostrar. */
  decimals?: number;
  label: string;
  icon: ComponentType<LucideProps>;
  /** Acento visual: rojo (marca) o dorado (insignia/logro). */
  accent?: "red" | "gold";
  /** Texto pequeño opcional bajo la etiqueta. */
  hint?: string;
};

/**
 * "Insignia" de estadística: tarjeta glass con icono iluminado y un número
 * grande que cuenta desde 0 al aparecer en el viewport. Sigue el lenguaje
 * visual de la web (negro, acento rojo/dorado, tipografía black itálica).
 * Respeta "prefers-reduced-motion".
 */
export function StatBadge({
  value,
  suffix = "",
  decimals = 0,
  label,
  icon: Icon,
  accent = "red",
  hint,
}: StatBadgeProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  const fmt = (n: number) =>
    n.toLocaleString("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        el.textContent = fmt(value);
        return;
      }

      const counter = { v: 0 };
      el.textContent = fmt(0);
      gsap.to(counter, {
        v: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = fmt(counter.v);
        },
      });
    },
    { scope: numRef, dependencies: [value] },
  );

  const accentText = accent === "gold" ? "text-yellow-400" : "text-red-500";
  const accentGlow =
    accent === "gold"
      ? "shadow-[0_0_25px_rgba(234,179,8,0.25)] border-yellow-500/30 text-yellow-400"
      : "shadow-[0_0_25px_rgba(220,38,38,0.25)] border-red-600/30 text-red-500";
  const haloColor = accent === "gold" ? "bg-yellow-500/10" : "bg-red-600/10";

  return (
    <div className="group relative flex flex-col items-start gap-5 p-7 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1.5 hover:bg-white/[0.05]">
      <div
        className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${haloColor}`}
      />

      <div
        className={`relative z-10 inline-flex p-3.5 rounded-2xl bg-black/40 border ${accentGlow}`}
      >
        <Icon size={24} />
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-1">
          <span
            ref={numRef}
            className="text-5xl md:text-6xl font-black italic tracking-tighter text-white leading-none [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {fmt(value)}
          </span>
          {suffix && (
            <span
              className={`text-2xl md:text-3xl font-black italic tracking-tighter ${accentText}`}
            >
              {suffix}
            </span>
          )}
        </div>
        <p className="mt-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
          {label}
        </p>
        {hint && (
          <p className="mt-1 text-[10px] text-white/30 font-medium">{hint}</p>
        )}
      </div>
    </div>
  );
}
