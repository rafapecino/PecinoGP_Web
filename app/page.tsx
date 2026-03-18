"use client";
import { Footer } from "@/All/components/footer";
import Header from "@/All/components/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getChannelStats, getLatestVideos, getVideosByIds, YouTubeChannel, YouTubeVideo } from "@/lib/youtube-data";
import { YouTubeStats } from "@/All/components/youtube-stats";
import { YouTubeVideos } from "@/All/components/youtube-videos";
import { LatestVideo } from "@/All/components/latest-video";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronRight, Youtube, Star } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<{
    channelStats: YouTubeChannel | null;
    latestVideo: YouTubeVideo[];
    featuredVideos: YouTubeVideo[];
  }>({
    channelStats: null,
    latestVideo: [],
    featuredVideos: [],
  });
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    async function fetchData() {
      const stats = await getChannelStats();
      const latest = await getLatestVideos(1);
      const featuredVideoIds = ['EhRz4obCadU', 'b15kGQHfMwI', 'eCPrCjpQC2c'];
      const featured = await getVideosByIds(featuredVideoIds);

      setData({
        channelStats: stats,
        latestVideo: latest,
        featuredVideos: featured,
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  const getVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

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

      <main className="">
        {/* --- CINEMATIC HERO --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-125">
            <Image
              src="/motogp-race-moment---index-.jpg"
              alt="Fondo de carrera de MotoGP"
              fill
              className="object-cover opacity-60 contrast-125 saturate-150"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-6xl mx-auto px-4 text-center md:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="flex flex-col items-center md:items-start text-center md:text-left pb-16 md:pb-24">
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
                <div className="w-10 h-1 bg-red-600 rounded-full" />
                <span className="text-red-500 font-black uppercase tracking-[0.4em] text-xs">PecinoGP Oficial</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter leading-[0.85] mb-8"
                style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
              >
                PASIÓN <br /> <span className="text-red-600">AL LÍMITE</span>
              </motion.h1>

              {/* Removiendo párrafo solicitado */}

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
                <Link
                  href={data.latestVideo.length > 0 ? getVideoUrl(data.latestVideo[0].id) : "#"}
                  className="group relative inline-flex items-center justify-center bg-red-600 text-white font-black py-5 px-10 rounded-2xl text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-3 italic">
                    <Play className="fill-white" size={24} /> VER ÚLTIMO ANÁLISIS
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
                <Link
                  href="/analisis-gp"
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white font-black py-5 px-10 rounded-2xl text-xl hover:bg-white hover:text-black transition-all hover:scale-105"
                >
                  <span className="flex items-center gap-3 italic">
                    HISTORIAL DE GP <ChevronRight size={24} />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="hidden lg:block relative group h-[500px] w-full"
            >
              <div className="absolute -inset-4 bg-red-600/20 rounded-[40px] blur-3xl group-hover:bg-red-600/30 transition-all"></div>
              <div className="relative h-full w-full bg-slate-900/60 backdrop-blur-3xl rounded-[32px] border border-white/10 p-12 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src="/hero-stats-bg.png"
                    alt="Stats Background"
                    fill
                    className="object-cover opacity-70 scale-105 group-hover:scale-115 transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-transparent to-black/80" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="flex items-center gap-2 mb-10 translate-y-0 group-hover:-translate-y-1 transition-transform">
                    <div className="w-8 h-1 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,1)]" />
                    <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">PecinoGP Insight</span>
                  </div>

                  {data.channelStats && (
                    <div className="space-y-12">
                      <div className="flex flex-col group/item">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Fanáticos Reales</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-7xl md:text-9xl font-black text-white italic tracking-tighter leading-none [text-shadow:0_15px_30px_rgba(0,0,0,0.5)]">
                            {Math.floor(Number(data.channelStats.subscriberCount) / 1000)}K
                          </span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 mt-6 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: "88%" }} transition={{ duration: 2, ease: "circOut" }} className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Contenido</span>
                          <span className="text-4xl font-black text-white italic tracking-tighter">{data.channelStats.videoCount} <span className="text-xs text-red-500 not-italic ml-1">VÍDEOS</span></span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Impacto</span>
                          <span className="text-4xl font-black text-white italic tracking-tighter">
                            {Math.floor(Number(data.channelStats.viewCount) / 1000000)}M <span className="text-xs text-red-500 not-italic ml-1">VISTAS</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* --- STATS SECTION --- */}
        {/* Se movieron las estadísticas al hero */}

        {/* --- LATEST VIDEO --- */}
        <section className="px-4 py-24 md:py-32 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[120px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[120px] -z-10" />
              <LatestVideo latestVideo={data.latestVideo[0] || null} />
            </motion.div>
          </div>
        </section>

        {/* --- FEATURED VIDEOS --- */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-secondary/10 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-red-600 rounded-full" />
                  <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">Contenido Curado</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">LO MEJOR DE <span className="text-red-600">2026</span></h2>
              </div>
              <Link href="/analisis-gp" className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black py-3 px-8 rounded-xl hover:bg-red-600 transition-all tracking-wider text-sm uppercase italic">
                VER TODOS LOS ANÁLISIS <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-2xl" />)}
              </div>
            ) : (
              <YouTubeVideos videos={data.featuredVideos} specialVideoId={data.featuredVideos.length > 0 ? data.featuredVideos[0].id : null} />
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
