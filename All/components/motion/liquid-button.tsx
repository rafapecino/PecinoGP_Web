"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

/**
 * Botón "líquido": un gradiente cónico que gira despacio dentro del botón y,
 * al pasar el ratón, un halo que se desplaza siguiendo al cursor. Es la
 * versión sin WebGL del "liquid metal button" de Vengeance UI — mismo
 * resultado visual, cero coste de shader y sin romper nada en móvil.
 *
 * Se apoya en las clases `.liquid-btn*` de globals.css.
 */
export function LiquidButton({
  children,
  href,
  external = false,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--bx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--by", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const inner = (
    <>
      {/* Capa metálica giratoria. */}
      <span aria-hidden className="liquid-btn__metal" />
      {/* Halo que persigue al cursor. */}
      <span aria-hidden className="liquid-btn__sheen" />
      <span className="relative z-10 flex items-center gap-3 italic uppercase tracking-tighter">
        {children}
      </span>
    </>
  );

  const classes = `liquid-btn group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 px-10 py-5 text-lg font-black text-white transition-transform duration-300 hover:scale-[1.04] active:scale-95 ${className}`;

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onPointerMove={onMove}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onPointerMove={onMove}
      onClick={onClick}
      className={classes}
    >
      {inner}
    </button>
  );
}
