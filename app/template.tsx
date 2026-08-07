"use client";

import { motion } from "framer-motion";
import { PageCurtain } from "@/All/components/motion/page-curtain";

/**
 * Transición de página: una cortina negra con filo rojo se retira hacia arriba
 * mientras el contenido entra con un fundido.
 *
 * El contenido sigue animándose solo con opacity (sin transform/filter) para
 * no romper los position: fixed del header y la barra de progreso; el
 * movimiento lo aporta la cortina, que va aparte en un contenedor fijo.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageCurtain />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
