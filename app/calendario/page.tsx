"use client";

import Header from "@/All/components/header";
import { RaceCalendar } from "@/All/components/race-calendar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Footer } from "@/All/components/footer";
import { Calendar, Flag, MapPin, ChevronRight } from "lucide-react";
import { SplitHeadline } from "@/All/components/split-headline";
import { Reveal } from "@/All/components/reveal";

import { getNextRace } from "@/lib/races";

export default function CalendarioPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const nextRaceData = getNextRace();

  const nextRace = nextRaceData || {
    gp: "Próxima Carrera",
    circuit: "TBD",
    dates: "TBD",
    countryCode: "un",
    round: "--",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <Header />

      <main>
        {/* --- NEXT RACE HERO --- */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 z-0 scale-110"
          >
            <Image
              src="/motogp-race-moment---index-.jpg"
              alt="Calendar Background"
              fill
              className="object-cover opacity-40 grayscale-[0.5]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-7xl mx-auto px-4 text-center pt-32"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Próxima Cita
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
              <span className="bg-red-600 text-white font-black italic px-4 py-1 text-sm rounded-sm">
                ROUND {nextRace.round}
              </span>
            </motion.div>

            <SplitHeadline
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              {nextRace.gp.split(" ").slice(2).join(" ").toUpperCase()}{" "}
              <span className="text-red-600">GP</span>
            </SplitHeadline>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/80 font-bold italic"
            >
              <div className="flex items-center gap-2">
                <Calendar className="text-red-600" size={20} />
                <span className="tracking-widest uppercase text-sm">
                  {nextRace.dates}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-red-600" size={20} />
                <span className="tracking-widest uppercase text-sm">
                  {nextRace.circuit}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>

        {/* --- FULL CALENDAR --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 relative bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
              <div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="w-6 h-1 bg-red-600 rounded-full" />
                  <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">
                    Temporada 2026
                  </span>
                </motion.div>
                <Reveal y={40}>
                  <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
                    CALENDARIO <span className="text-red-600">COMPLETO</span>
                  </h2>
                </Reveal>
              </div>
            </div>

            <RaceCalendar />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
