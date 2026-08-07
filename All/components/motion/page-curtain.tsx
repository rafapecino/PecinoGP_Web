"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Transición de página tipo cortina (la "page transition" de Animaster).
 *
 * Al cambiar de ruta, un panel negro con filo rojo barre la pantalla de abajo
 * arriba y se retira, revelando la página nueva. El panel es `fixed` y vive
 * fuera del flujo: no envuelve al contenido en un transform, así que no rompe
 * el header fijo ni la barra de progreso (que era el motivo por el que la
 * transición anterior se limitaba a un fundido de opacidad).
 */
export function PageCurtain() {
  const pathname = usePathname();

  return (
    <motion.div
      // La key fuerza a que la animación se reproduzca en cada navegación.
      key={pathname}
      aria-hidden
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      className="pointer-events-none fixed inset-0 z-[9998] bg-black motion-reduce:hidden"
    >
      {/* Filo rojo en el borde inferior del panel: el detalle que hace que se
          lea como una cortina y no como un simple bloque negro. */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600 shadow-[0_0_40px_12px_rgba(220,38,38,0.55)]" />
    </motion.div>
  );
}
