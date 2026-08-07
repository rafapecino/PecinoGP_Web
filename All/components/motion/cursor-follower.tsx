"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Cursor personalizado con inercia (efecto "mouse tracker" de Animaster).
 *
 * Son dos piezas: un punto que va pegado al ratón y un anillo que le persigue
 * con retardo. Al pasar por encima de cualquier enlace, botón o elemento con
 * `data-cursor`, el anillo crece y se tiñe de rojo; sobre elementos con
 * `data-cursor="view"` además muestra la etiqueta correspondiente.
 *
 * Solo se activa en punteros finos (ratón) y si el usuario no ha pedido
 * menos movimiento: en móvil/táctil no se monta nada.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Solo a partir de aquí ocultamos el puntero del sistema: si algo falla
    // antes, el usuario conserva su cursor de siempre.
    document.documentElement.classList.add("has-custom-cursor");

    // quickTo da una interpolación continua: el punto casi instantáneo y el
    // anillo con bastante más retardo, que es lo que produce la sensación
    // de inercia del vídeo.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
    };
    const hide = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor]';

    const onMove = (e: PointerEvent) => {
      show();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as Element | null)?.closest?.(
        INTERACTIVE,
      ) as HTMLElement | null;

      if (target) {
        const text = target.dataset.cursorLabel ?? "";
        gsap.to(ring, {
          scale: text ? 2.6 : 1.9,
          borderColor: "rgba(220,38,38,0.9)",
          backgroundColor: "rgba(220,38,38,0.12)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.35, duration: 0.3, ease: "power3.out" });
        if (label.textContent !== text) label.textContent = text;
        gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255,255,255,0.35)",
          backgroundColor: "rgba(255,255,255,0)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      }
    };

    const onDown = () =>
      gsap.to(ring, { scale: 0.8, duration: 0.18, ease: "power2.out" });
    const onUp = () =>
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-white/35 opacity-0 will-change-transform flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="text-[7px] font-black uppercase tracking-[0.15em] text-white opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-red-600 opacity-0 will-change-transform"
      />
    </div>
  );
}
