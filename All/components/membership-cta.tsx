"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Youtube } from "lucide-react";
import { Magnetic } from "./magnetic";
import { trackEvent } from "@/lib/analytics";
import { MEMBERSHIP_LIVE } from "@/lib/seo";

/**
 * Llamada a la membresía para el resto de la web.
 *
 * /membresia es la página que vende, pero hasta ahora solo se llegaba a ella
 * por el menú del header: la página de conversión estaba montada y sin nadie
 * que llegara. Este componente es el que la alimenta desde la home, los vídeos
 * y El Paddock.
 *
 * Todos los CTA llevan al mismo sitio (`/membresia`, navegación interna) y no
 * directamente al alta de YouTube: el argumento de compra está en esa página, y
 * mandar a alguien al checkout sin haberlo leído convierte peor. La excepción
 * es la propia /membresia, que sí enlaza al alta.
 *
 * Cada uno manda `membership_cta_click` a GA4 con su `location`, así que en el
 * informe se puede ver qué superficie trae miembros y cuál no vale la pena.
 *
 * El texto vive aquí dentro, indexado por `location`, para que cada sitio que
 * lo use sea una línea y para poder afinar la copia sin ir página por página.
 */

type Location = "home" | "videos" | "paddock";

type Copy = {
  eyebrow: string;
  /** Primera línea del titular, en blanco. */
  title: string;
  /** Segunda línea, en rojo. Va en su propio renglón. */
  titleAccent: string;
  text: string;
  cta: string;
};

const COPY: Record<Location, Copy> = {
  home: {
    eyebrow: "Membresía del canal",
    title: "ESTO SE VE MEJOR",
    titleAccent: "DESDE DENTRO",
    text: MEMBERSHIP_LIVE
      ? "Directos cerrados tras cada carrera, vídeos que no ve nadie más, el noticiario cada 48 h por WhatsApp y el chat de miembros."
      : "Directos cerrados tras cada carrera, vídeos que no ve nadie más y el chat de miembros. Estamos ultimando los detalles.",
    cta: MEMBERSHIP_LIVE ? "Ver la membresía" : "Ver qué incluirá",
  },
  videos: {
    eyebrow: "Membresía del canal",
    title: "ESTOS VÍDEOS SON GRATIS.",
    titleAccent: "LOS QUE NO VES, NO.",
    text: MEMBERSHIP_LIVE
      ? "Todo el análisis del canal seguirá siendo público. Los vídeos que no se publican, los directos cerrados y el noticiario cada 48 h por WhatsApp están en PecinoGP Club."
      : "Todo el análisis del canal seguirá siendo público. Los vídeos que no se publicarán, los directos cerrados y el noticiario están en camino.",
    cta: MEMBERSHIP_LIVE ? "Ver la membresía" : "Ver qué incluirá",
  },
  paddock: {
    eyebrow: "Membresía del canal",
    title: "TU PREGUNTA",
    titleAccent: "PUEDE IR PRIMERO",
    text: MEMBERSHIP_LIVE
      ? "Los miembros tienen prioridad en las preguntas, eligen el tema de lo que se analiza y tienen su propio chat: La sobremesa."
      : "Los miembros tendrán prioridad en las preguntas, elegirán el tema de lo que se analiza y tendrán su propio chat.",
    cta: MEMBERSHIP_LIVE ? "Ver la membresía" : "Ver qué incluirá",
  },
};

/** Los dos niveles tal y como están dados de alta en YouTube Studio. */
const TIERS = [
  { name: "Grada PecinoGP", price: "3,99" },
  { name: "PecinoGP Club", price: "14,99" },
];

type Props = {
  location: Location;
  /**
   * `band` es una sección a todo el ancho, para el cierre de una página.
   * `inline` es una tarjeta más contenida, para meterla entre otros bloques.
   */
  variant?: "band" | "inline";
  className?: string;
};

export function MembershipCta({
  location,
  variant = "band",
  className = "",
}: Props) {
  const copy = COPY[location];

  const link = (
    <Link
      href="/membresia"
      onClick={() =>
        trackEvent("membership_cta_click", {
          location,
          variant: MEMBERSHIP_LIVE ? "join" : "notify",
        })
      }
      className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-black py-4 px-8 md:px-10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] border border-white/10"
    >
      <span className="relative z-10 flex items-center gap-3 italic tracking-tighter uppercase text-base md:text-lg">
        <Youtube size={20} /> {copy.cta}
        <ArrowUpRight
          size={20}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </span>
    </Link>
  );

  const eyebrow = (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-1 bg-red-600 rounded-full" />
      <span className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">
        {copy.eyebrow}
      </span>
    </div>
  );

  /* Los precios solo se enseñan cuando la membresía está abierta: anunciar el
     precio de algo que aún no se puede comprar es justo lo que evita el
     interruptor MEMBERSHIP_LIVE en el resto de la web. */
  const tiers = MEMBERSHIP_LIVE ? (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      {TIERS.map((tier, i) => (
        <div key={tier.name} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden className="text-white/20">
              ·
            </span>
          )}
          <span className="text-white/50 italic">
            <span className="text-white font-black not-italic">
              {tier.price} €
            </span>
            /mes · {tier.name}
          </span>
        </div>
      ))}
    </div>
  ) : null;

  if (variant === "inline") {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 ${className}`}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            {eyebrow}
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white leading-[0.95] mb-4">
              {copy.title} <br />
              <span className="text-red-600">{copy.titleAccent}</span>
            </h2>
            <p className="max-w-xl text-white/60 text-base leading-relaxed mb-5">
              {copy.text}
            </p>
            {tiers}
          </div>

          <Magnetic strength={0.35} className="shrink-0">
            {link}
          </Magnetic>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-32 border-y border-white/5 bg-secondary/10 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-transparent" />

      {/* El mismo resplandor que respira de la sección de colaboraciones, para
          que los dos cierres de página se lean como hermanos. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/15 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center"
      >
        <div className="flex items-center justify-center">{eyebrow}</div>

        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9] mb-8"
          style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
        >
          {copy.title} <br />
          <span className="text-red-600">{copy.titleAccent}</span>
        </h2>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic mb-8">
          {copy.text}
        </p>

        {tiers && <div className="flex justify-center mb-10">{tiers}</div>}

        <Magnetic strength={0.4}>{link}</Magnetic>
      </motion.div>
    </section>
  );
}
