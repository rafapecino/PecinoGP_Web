"use client";

import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { SplitHeadline } from "@/All/components/split-headline";
import { ScrollHint } from "@/All/components/scroll-hint";
import { HeroUnderline } from "@/All/components/hero-underline";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const ThreeBackground = dynamic(
  () => import("@/All/components/three-background"),
  { ssr: false },
);
import {
  Mail,
  Send,
  Youtube,
  Instagram,
  Handshake,
  MessageSquare,
  Newspaper,
  ArrowUpRight,
  Check,
} from "lucide-react";

const CONTACT_EMAIL = "gppecino@gmail.com";

const REASONS = [
  {
    id: "colaboracion",
    label: "Colaboración",
    description: "Marcas, equipos o creadores que quieran sumar fuerzas.",
    icon: Handshake,
  },
  {
    id: "pregunta",
    label: "Pregunta o Sugerencia",
    description: "Dudas, ideas para vídeos o feedback de la comunidad.",
    icon: MessageSquare,
  },
  {
    id: "prensa",
    label: "Prensa y Medios",
    description: "Entrevistas, acreditaciones o uso de contenido.",
    icon: Newspaper,
  },
] as const;

type ReasonId = (typeof REASONS)[number]["id"];

export default function ContactoPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const [reason, setReason] = useState<ReasonId>("colaboracion");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const reasonLabel = useMemo(
    () => REASONS.find((r) => r.id === reason)?.label ?? "Contacto",
    [reason],
  );

  const isValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const finalSubject = subject.trim()
      ? `[${reasonLabel}] ${subject.trim()}`
      : `[${reasonLabel}] Nuevo mensaje desde PecinoGP`;

    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Motivo: ${reasonLabel}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      finalSubject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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
        {/* --- CINEMATIC HERO --- */}
        <section className="relative py-20 md:py-44 flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 z-0 scale-110"
          >
            <Image
              src="/hero-stats-bg.png"
              alt="Fondo Contacto"
              fill
              className="object-cover opacity-30 grayscale saturate-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </motion.div>

          {/* Fondo 3D (three.js): campo de partículas con parallax de ratón */}
          <ThreeBackground className="z-[1] opacity-70" density={700} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-7xl mx-auto px-4 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Línea directa con el box
              </span>
            </motion.div>

            <SplitHeadline
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              HABLEMOS <br />
              <span className="text-red-600">DE MOTOGP</span>
            </SplitHeadline>

            <HeroUnderline />

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic"
            >
              ¿Colaboración, idea para un vídeo o una duda? Escríbenos. Cada
              mensaje lo lee el equipo de PecinoGP.
            </motion.p>
          </motion.div>

          <ScrollHint />
        </section>

        {/* --- REASON CARDS --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REASONS.map((r, i) => {
                const Icon = r.icon;
                const active = reason === r.id;
                return (
                  <motion.button
                    key={r.id}
                    type="button"
                    onClick={() => setReason(r.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group relative text-left p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
                      active
                        ? "bg-red-600/10 border-red-600/40 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl transition-opacity ${
                        active
                          ? "bg-red-600/20 opacity-100"
                          : "bg-red-600/10 opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`inline-flex p-3 rounded-2xl border mb-6 transition-colors ${
                          active
                            ? "bg-red-600/20 border-red-600/40 text-red-500"
                            : "bg-white/5 border-white/10 text-white/60 group-hover:text-white"
                        }`}
                      >
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">
                        {r.label}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {r.description}
                      </p>
                      {active && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-red-500">
                          <Check size={12} /> Seleccionado
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- FORM + INFO --- */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* --- FORM --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
                  <Send className="text-red-600" size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                    Envíanos un Mensaje
                  </h2>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest italic">
                    Respondemos en 24-48h
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                    >
                      Nombre *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                  >
                    Asunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={`Ej. "${reasonLabel} con PecinoGP"`}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-red-600/60 focus:ring-2 focus:ring-red-600/20 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-white/40 leading-relaxed max-w-md">
                    Al enviar se abrirá tu cliente de correo con el mensaje
                    listo para mandar a{" "}
                    <span className="text-red-500 font-bold">
                      {CONTACT_EMAIL}
                    </span>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={!isValid}
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed text-white font-black py-4 px-8 rounded-2xl overflow-hidden transition-all duration-500 enabled:hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)] enabled:hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-enabled:group-hover:animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-2 italic tracking-tighter uppercase text-sm">
                      {sent ? (
                        <>
                          <Check size={18} /> Enviado
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Enviar Mensaje
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-green-600/10 border border-green-600/30"
                  >
                    <Check
                      className="text-green-500 shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-sm text-green-200/80 leading-relaxed">
                      Hemos abierto tu cliente de correo. Si no se ha abierto,
                      escríbenos directamente a{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-green-400 font-bold underline"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* --- INFO SIDEBAR --- */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32 self-start space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
                  <Mail className="text-red-600" size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                    Otras Vías
                  </h2>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest italic">
                    Estamos en la parrilla
                  </p>
                </div>
              </div>

              {/* Email card */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-600/40 hover:bg-red-600/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                    Email
                  </p>
                  <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                    {CONTACT_EMAIL}
                  </p>
                </div>
                <ArrowUpRight
                  className="text-white/30 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  size={18}
                />
              </a>

              {/* Social cards */}
              <Link
                href="https://www.youtube.com/@pecinogp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-600/40 hover:bg-red-600/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500">
                  <Youtube size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                    YouTube
                  </p>
                  <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                    @PecinoGP
                  </p>
                </div>
                <ArrowUpRight
                  className="text-white/30 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  size={18}
                />
              </Link>

              <Link
                href="https://www.instagram.com/pecinogp/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-600/40 hover:bg-red-600/5 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500">
                  <Instagram size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                    Instagram
                  </p>
                  <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                    @pecinogp
                  </p>
                </div>
                <ArrowUpRight
                  className="text-white/30 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  size={18}
                />
              </Link>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-600/10 to-transparent border border-red-600/20">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
                  Tiempo de respuesta
                </p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Solemos responder entre 24 y 48 horas laborables. En fines de
                  semana de GP puede tardar un poco más.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
