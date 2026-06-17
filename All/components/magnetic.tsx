"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: React.ReactNode;
  /** Cuánto sigue el botón al cursor (0–1). Más alto = más imantado. */
  strength?: number;
  className?: string;
};

/**
 * Envoltorio que imanta su contenido hacia el cursor: al acercar el ratón,
 * el botón se desplaza suavemente hacia él y vuelve a su sitio con muelle al
 * salir. Desactivado en táctil y con prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * strength, y: y * strength });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
