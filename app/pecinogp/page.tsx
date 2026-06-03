"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { SplitHeadline } from "@/All/components/split-headline";
import { StatBadge } from "@/All/components/stat-badge";
import { Reveal } from "@/All/components/reveal";
import type { YouTubeChannel, YouTubeVideo } from "@/lib/youtube-data";
import { decodeHtmlEntities } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Users,
  Film,
  Globe,
  Play,
  ChevronRight,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
const ThreeBackground = dynamic(
  () => import("@/All/components/three-background"),
  { ssr: false },
);

export default function MiCanalPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const [stats, setStats] = useState<YouTubeChannel | null>(null);
  const [latest, setLatest] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/youtube?max=3").then((r) => r.json());
        setStats(res.stats || null);
        setLatest(res.latestVideos || []);
      } catch (err) {
        console.error("Error cargando datos del canal:", err);
      }
    }
    load();
  }, []);

  const views = stats ? Number(stats.viewCount) : 18800000;
  const subs = stats ? Number(stats.subscriberCount) : 68400;
  const videoCount = stats ? Number(stats.videoCount) : 1234;

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
              src="/hero-stats-bg.png"
              alt="Estadísticas del canal PecinoGP"
              fill
              className="object-cover opacity-30 grayscale saturate-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </motion.div>

          {/* Fondo 3D (three.js): campo de partículas con parallax de ratón */}
          <ThreeBackground className="z-[1] opacity-70" density={700} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                El canal oficial
              </span>
              <div className="w-8 h-1 bg-red-600 rounded-full" />
            </div>

            <SplitHeadline
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
            >
              EL <span className="text-red-600">CANAL</span>
            </SplitHeadline>

            <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-medium italic">
              Años de pasión por MotoGP convertidos en números. Esto es lo que
              la comunidad de PecinoGP ha construido.
            </p>
          </div>
        </section>

        {/* --- HIGHLIGHT VISUALIZACIONES --- */}
        <section className="px-4 sm:px-6 lg:px-8 pb-4 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          <Reveal
            className="max-w-5xl mx-auto text-center pt-16 md:pt-20"
            y={40}
          >
            <p className="text-white/50 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
              El canal ha conseguido
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
              {views.toLocaleString("es-ES")}{" "}
              <span className="text-red-600">visualizaciones</span>
            </h2>
          </Reveal>
        </section>

        {/* --- STAT BADGES --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <StatBadge
              value={views / 1_000_000}
              suffix="M"
              decimals={1}
              label="Visualizaciones"
              icon={Eye}
              accent="red"
            />
            <StatBadge
              value={subs / 1000}
              suffix="K"
              decimals={1}
              label="Suscriptores"
              icon={Users}
              accent="gold"
            />
            <StatBadge
              value={videoCount}
              label="Vídeos publicados"
              icon={Film}
              accent="red"
            />
            {/* Países donde más se sigue MotoGP */}
            <div className="group relative flex flex-col items-start gap-5 p-7 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1.5 hover:bg-white/[0.05]">
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-yellow-500/10" />

              <div className="relative z-10 inline-flex p-3.5 rounded-2xl bg-black/40 border border-yellow-500/30 text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.25)]">
                <Globe size={24} />
              </div>

              <div className="relative z-10 w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { code: "es", name: "España" },
                    { code: "it", name: "Italia" },
                    { code: "id", name: "Indonesia" },
                    { code: "ar", name: "Argentina" },
                    { code: "mx", name: "México" },
                    { code: "ve", name: "Venezuela" },
                    { code: "co", name: "Colombia" },
                    { code: "pe", name: "Perú" },
                    { code: "cl", name: "Chile" },
                    { code: "us", name: "Estados Unidos" },
                    { code: "de", name: "Alemania" },
                    { code: "br", name: "Brasil" },
                  ].map((c) => (
                    <img
                      key={c.code}
                      src={`https://flagcdn.com/w40/${c.code}.png`}
                      alt={c.name}
                      title={c.name}
                      loading="lazy"
                      className="w-8 h-auto rounded-sm shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                    />
                  ))}
                </div>
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/50">
                  Países que nos ven
                </p>
                <p className="mt-1 text-[10px] text-white/30 font-medium">
                  Audiencia repartida por todo el mundo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ÚLTIMOS VÍDEOS --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-secondary/10 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-red-600 rounded-full" />
                  <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">
                    Recién salido del box
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
                  ÚLTIMOS <span className="text-red-600">VÍDEOS</span>
                </h2>
              </div>
              <Link
                href="/analisis-gp"
                className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black py-3 px-8 rounded-xl hover:bg-red-600 transition-all tracking-wider text-sm uppercase italic"
              >
                Ver todos los vídeos{" "}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {(latest.length > 0
                ? latest.slice(0, 3)
                : [null, null, null]
              ).map((video, i) => (
                <Link
                  key={video?.id ?? i}
                  href="/analisis-gp"
                  className="group relative flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-white/5">
                    {video ? (
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 animate-pulse bg-white/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    {i === 0 && (
                      <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-xl animate-pulse uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Nuevo
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Play
                          className="fill-white text-white translate-x-0.5"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {video ? (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar size={12} className="text-red-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {new Date(video.publishedAt).toLocaleDateString(
                              "es-ES",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black italic tracking-tighter text-white mb-4 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight uppercase">
                          {decodeHtmlEntities(video.title)}
                        </h3>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                        <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
                      </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                        Ver en el archivo
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="text-white/30 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
