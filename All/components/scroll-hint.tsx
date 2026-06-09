"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ScrollHintProps = {
  label?: string;
  className?: string;
};

/**
 * Indicador sutil de "desliza hacia abajo" para los heroes. Rebota suavemente
 * y se desvanece a medida que el usuario hace scroll (primeros ~200px).
 * Se ancla abajo-centro del hero (el <section> debe ser position: relative).
 * pointer-events-none para no bloquear clics.
 */
export function ScrollHint({
  label = "Desliza",
  className = "",
}: ScrollHintProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className={`pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 ${className}`}
    >
      <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.25)]"
      >
        <ChevronDown size={18} />
      </motion.div>
    </motion.div>
  );
}
