"use client";

import Header from "@/All/components/header";
import { QAndA } from "@/All/components/q-and-a";
import { QuickPoll } from "@/All/components/quick-poll";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/All/components/footer";
import { MessageSquare, Vote, Mail, ArrowUpRight, Handshake } from "lucide-react";

export default function ElPaddockPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

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
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    },
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <Header />

      <main>
        {/* --- CINEMATIC HERO --- */}
        <section className="relative py-16 md:py-48 flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-110">
            <Image
              src="/hero-stats-bg.png"
              alt="Paddock Background"
              fill
              className="object-cover opacity-30 grayscale saturate-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-7xl mx-auto px-4 text-center"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Zona de Interacción</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              EL <span className="text-red-600">PADDOCK</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic"
            >
              Tu espacio exclusivo para participar, preguntar y decidir el rumbo del contenido junto a Manuel Pecino.
            </motion.p>
          </motion.div>
        </section>

        {/* --- INTERACTIVE CONTENT --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          
          <div className="max-w-7xl mx-auto">
            {/* 
              Usamos flex-col para que en móvil la encuesta salga primero (order-1).
              En desktop (lg:grid), la encuesta va a la derecha (order-2) y el Q&A a la izquierda (order-1).
            */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-16 items-start">
              
              {/* --- ENCUESTA (Primero en móvil) --- */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
                    <Vote className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">La Encuesta</h2>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest italic">Vota y Decide</p>
                  </div>
                </div>
                <QuickPoll />
              </motion.div>

              {/* --- Q&A (Segundo en móvil) --- */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-full lg:col-span-2 order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
                    <MessageSquare className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Preguntas y Debate</h2>
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest italic">Interacción Directa</p>
                  </div>
                </div>
                <QAndA />
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- CONTACT CTA --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full -z-10" />

          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl p-8 md:p-16"
            >
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-600/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/10 blur-3xl rounded-full" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-1 bg-red-600 rounded-full" />
                    <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                      ¿Algo más que contarnos?
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] mb-6">
                    HABLEMOS <span className="text-red-600">EN PRIVADO</span>
                  </h2>

                  <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                    ¿Tienes una propuesta de colaboración, una pregunta que no
                    encaja en el debate público o quieres trabajar con el
                    equipo? Escríbenos directamente.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                      <div className="p-2.5 inline-flex rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 mb-3">
                        <Handshake size={18} />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                        Colaboraciones
                      </p>
                      <p className="text-sm text-white/80">
                        Marcas, equipos y creadores
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                      <div className="p-2.5 inline-flex rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 mb-3">
                        <Mail size={18} />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                        Atención directa
                      </p>
                      <p className="text-sm text-white/80">
                        Respondemos en 24-48h
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="group relative inline-flex items-center justify-between gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-black py-5 px-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-3 italic tracking-tighter uppercase text-base md:text-lg">
                      <Mail size={20} /> Ir a Contacto
                    </span>
                    <ArrowUpRight
                      className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      size={22}
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
