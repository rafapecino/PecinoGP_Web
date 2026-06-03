"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { SplitHeadline } from "@/All/components/split-headline";
import { getNextRace, races } from "@/lib/races";
import { getDriverStandings, type DriverStanding } from "@/lib/motogp-service";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Flag,
  ChevronRight,
  Trophy,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ThreeBackground = dynamic(
  () => import("@/All/components/three-background"),
  { ssr: false },
);

type Category = "motogp" | "moto2" | "moto3";

const CATEGORY_LABELS: Record<Category, string> = {
  motogp: "MotoGP",
  moto2: "Moto2",
  moto3: "Moto3",
};

const PODIUM_STYLES = [
  {
    ring: "border-yellow-500/40",
    badge: "bg-yellow-500 text-black",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.25)]",
  },
  {
    ring: "border-gray-300/30",
    badge: "bg-gray-300 text-black",
    glow: "shadow-[0_0_25px_rgba(209,213,219,0.2)]",
  },
  {
    ring: "border-orange-700/40",
    badge: "bg-orange-700 text-white",
    glow: "shadow-[0_0_25px_rgba(194,65,12,0.25)]",
  },
];

export default function CampeonatoPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const nextSectionRef = useRef<HTMLDivElement>(null);
  const nextCardRef = useRef<HTMLDivElement>(null);

  const nextRace = getNextRace() || {
    gp: "Próxima Carrera",
    circuit: "Por confirmar",
    dates: "TBD",
    countryCode: "un",
    endDate: "",
    round: "--",
    status: "next" as const,
  };

  // Total de carreras de la temporada para el contador "ROUND 09/22".
  const totalRounds = String(races.length).padStart(2, "0");

  const [category, setCategory] = useState<Category>("motogp");
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getDriverStandings(category, "2026")
      .then((data) => {
        if (active) setStandings(data.slice(0, 3));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category]);

  // --- Animaciones GSAP: entrada de la tarjeta de Próximo GP + parallax ---
  useGSAP(
    () => {
      const card = nextCardRef.current;
      const section = nextSectionRef.current;
      if (!card || !section) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Entrada cinematográfica de la tarjeta al entrar en pantalla (una vez).
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 82%", once: true },
      });
      tl.from(card, {
        y: 90,
        scale: 0.92,
        rotateX: 10,
        autoAlpha: 0,
        transformPerspective: 1200,
        transformOrigin: "center top",
        duration: 1,
        ease: "power3.out",
      }).from(
        card.querySelectorAll(".gp-stagger"),
        {
          y: 26,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Parallax: el resplandor rojo se mueve más lento que el scroll.
      gsap.to(".gp-parallax", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: nextSectionRef },
  );

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <Header />

      <main>
        {/* --- HERO --- */}
        <section className="relative py-20 md:py-44 flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 z-0 scale-110"
          >
            <Image
              src="/motogp-race-moment---index-.jpg"
              alt="Campeonato del mundo de MotoGP"
              fill
              className="object-cover opacity-40 grayscale-[0.3]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </motion.div>

          {/* Fondo 3D (three.js): campo de partículas con parallax de ratón */}
          <ThreeBackground className="z-[1] opacity-70" density={700} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Mundial 2026
              </span>
              <div className="w-8 h-1 bg-red-600 rounded-full" />
            </div>

            <SplitHeadline
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              CAMPEONATO
            </SplitHeadline>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic">
              El próximo Gran Premio y la clasificación del mundial, en un
              vistazo.
            </p>
          </div>
        </section>

        {/* --- PRÓXIMO GP --- */}
        <section
          ref={nextSectionRef}
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">
                Próxima cita
              </span>
            </div>

            <div
              ref={nextCardRef}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl p-8 md:p-12 will-change-transform"
            >
              <div className="gp-parallax absolute -top-24 -right-24 w-80 h-80 bg-red-600/15 blur-3xl rounded-full" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="gp-stagger flex items-center gap-4 mb-6">
                    <span className="bg-red-600 text-white font-black italic px-4 py-1 text-sm rounded-sm">
                      ROUND {nextRace.round}/{totalRounds}
                    </span>
                    <img
                      src={`https://flagcdn.com/w80/${nextRace.countryCode.toLowerCase()}.png`}
                      alt={nextRace.countryCode}
                      className="h-7 w-auto rounded shadow-lg"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>

                  <h3 className="gp-stagger text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] mb-6">
                    {nextRace.gp}
                  </h3>

                  <div className="gp-stagger flex flex-col gap-3 text-white/80 font-bold italic">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-red-600 shrink-0" size={20} />
                      <span className="tracking-widest uppercase text-sm">
                        {nextRace.dates}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-red-600 shrink-0" size={20} />
                      <span className="tracking-wide text-sm">
                        {nextRace.circuit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gp-stagger flex flex-col items-stretch lg:items-end gap-4">
                  <div className="hidden lg:flex items-center justify-center w-28 h-28 rounded-full bg-red-600/10 border border-red-600/20 self-end">
                    <Flag className="text-red-500" size={44} />
                  </div>
                  <Link
                    href="/calendario"
                    className="group relative inline-flex items-center justify-between gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-black py-5 px-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-3 italic tracking-tighter uppercase text-base md:text-lg">
                      <Calendar size={20} /> Ver calendario completo
                    </span>
                    <ChevronRight
                      className="relative z-10 group-hover:translate-x-1 transition-transform"
                      size={22}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TOP 3 CLASIFICACIÓN --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-secondary/10 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-red-600 rounded-full" />
                  <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">
                    Mundial 2026 · Top 3
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter flex items-center gap-4">
                  <Trophy
                    className="text-yellow-500 hidden sm:block"
                    size={44}
                  />
                  EL <span className="text-red-600">PÓDIUM</span>
                </h2>
              </div>

              {/* Selector de categoría */}
              <div className="bg-black/40 backdrop-blur-2xl rounded-2xl p-2 flex shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 self-start">
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`relative px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-black rounded-xl transition-all duration-500 uppercase tracking-[0.2em] outline-none ${
                      category === cat
                        ? "text-white"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {category === cat && (
                      <motion.div
                        layoutId="active-category-campeonato"
                        className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {CATEGORY_LABELS[cat]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top 3 */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-44 rounded-[28px] bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {standings.map((rider, i) => {
                  const style = PODIUM_STYLES[i] ?? PODIUM_STYLES[2];
                  return (
                    <motion.div
                      key={`${category}-${rider.pos}-${rider.driverName}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className={`relative overflow-hidden rounded-[28px] bg-white/[0.03] border ${style.ring} ${style.glow} p-7 backdrop-blur-xl`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl ${style.badge} flex items-center justify-center font-black italic text-xl`}
                        >
                          {rider.pos}
                        </div>
                        {i === 0 && (
                          <Award className="text-yellow-500" size={28} />
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={`https://flagcdn.com/w40/${rider.countryCode.toLowerCase()}.png`}
                          alt={rider.countryCode}
                          className="w-7 h-auto rounded-sm shadow-md"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        <span className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded font-mono">
                          #{rider.riderNumber}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-tight">
                        {rider.driverName}
                      </h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium mt-1 mb-5">
                        {rider.teamName}
                      </p>

                      <div className="flex items-baseline gap-1.5 border-t border-white/10 pt-4">
                        <span className="text-4xl font-black italic tracking-tighter text-white">
                          {rider.points}
                        </span>
                        <span className="text-xs text-red-500 font-black not-italic">
                          PTS
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <Link
                href="/clasificacion"
                className="group relative inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-black py-4 px-10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-red-600 hover:border-red-600 active:scale-95 italic tracking-tighter uppercase"
              >
                Ver clasificación completa
                <ChevronRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
