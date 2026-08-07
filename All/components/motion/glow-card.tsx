"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tarjeta con borde de gradiente cónico giratorio + foco de luz que sigue al
 * ratón. Combina los dos efectos de tarjeta de Skiper UI: el borde tipo
 * "Apple AI gradient" y el brillo que persigue al cursor.
 *
 * El giro del borde se hace con una propiedad CSS registrada (--glow-angle,
 * declarada en globals.css), así que la anima el compositor y no cuesta JS.
 * El foco se actualiza escribiendo variables CSS en el propio nodo, sin
 * provocar re-renders de React.
 */
export function GlowCard({
  children,
  className = "",
  /** Intensidad del borde: "soft" para tarjetas normales, "strong" para la destacada. */
  intensity = "soft",
  /** Deja solo el foco del ratón, sin el borde giratorio. */
  spotlightOnly = false,
}: {
  children: ReactNode;
  className?: string;
  intensity?: "soft" | "strong";
  spotlightOnly?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", "1");
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--spot", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-intensity={intensity}
      className={`glow-card relative isolate rounded-[28px] ${
        spotlightOnly ? "" : "glow-card--rotating"
      } ${className}`}
    >
      {/* Foco de luz bajo el contenido: se enciende al entrar el cursor. */}
      <span
        aria-hidden
        className="glow-card__spot pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
