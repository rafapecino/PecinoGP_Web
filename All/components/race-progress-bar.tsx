"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de progreso de carrera: línea roja fija en el borde superior que
 * crece con el scroll, suavizada con física de muelle. Global (layout).
 */
export function RaceProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-red-700 via-red-500 to-red-600 shadow-[0_0_12px_rgba(220,38,38,0.7)] will-change-transform"
    />
  );
}
