"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/All/components/header";
import { Footer } from "@/All/components/footer";
import { SplitHeadline } from "@/All/components/split-headline";
import { StatBadge } from "@/All/components/stat-badge";
import { Reveal } from "@/All/components/reveal";
import { ScrollHint } from "@/All/components/scroll-hint";
import type { YouTubeChannel, YouTubeVideo } from "@/lib/youtube-data";
import { decodeHtmlEntities } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
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
  TrendingUp,
  Heart,
  Image as ImageIcon,
  BarChart2,
  Instagram,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const ThreeBackground = dynamic(
  () => import("@/All/components/three-background"),
  { ssr: false },
);

/* ─── DATOS MENSUALES ──────────────────────────────────────────────────── */
const YT_MONTHLY = [
  { mes: "Jul 25", views: 850, subs: 1200 },
  { mes: "Ago 25", views: 920, subs: 1350 },
  { mes: "Sep 25", views: 780, subs: 1100 },
  { mes: "Oct 25", views: 1100, subs: 1600 },
  { mes: "Nov 25", views: 940, subs: 1400 },
  { mes: "Dic 25", views: 720, subs: 980 },
  { mes: "Ene 26", views: 680, subs: 920 },
  { mes: "Feb 26", views: 760, subs: 1100 },
  { mes: "Mar 26", views: 1200, subs: 1800 },
  { mes: "Abr 26", views: 1400, subs: 2100 },
  { mes: "May 26", views: 1300, subs: 1950 },
  { mes: "Jun 26", views: 1100, subs: 1700 },
];

const IG_MONTHLY = [
  { mes: "Jul 25", followers: 8200, reach: 82 },
  { mes: "Ago 25", followers: 8950, reach: 95 },
  { mes: "Sep 25", followers: 9400, reach: 88 },
  { mes: "Oct 25", followers: 10200, reach: 118 },
  { mes: "Nov 25", followers: 10900, reach: 112 },
  { mes: "Dic 25", followers: 11400, reach: 98 },
  { mes: "Ene 26", followers: 11800, reach: 105 },
  { mes: "Feb 26", followers: 12500, reach: 130 },
  { mes: "Mar 26", followers: 13600, reach: 165 },
  { mes: "Abr 26", followers: 14400, reach: 190 },
  { mes: "May 26", followers: 15100, reach: 210 },
  { mes: "Jun 26", followers: 15800, reach: 225 },
];

const COUNTRIES = [
  { code: "es", name: "España", pct: 38 },
  { code: "ve", name: "Venezuela", pct: 12 },
  { code: "ar", name: "Argentina", pct: 10 },
  { code: "co", name: "Colombia", pct: 8 },
  { code: "us", name: "EE. UU.", pct: 6 },
  { code: "mx", name: "México", pct: 6 },
  { code: "pt", name: "Portugal", pct: 5 },
  { code: "it", name: "Italia", pct: 4 },
  { code: "cl", name: "Chile", pct: 3 },
  { code: "br", name: "Brasil", pct: 3 },
  { code: "do", name: "R. Dominicana", pct: 2 },
  { code: "uy", name: "Uruguay", pct: 2 },
  { code: "ot", name: "Otros", pct: 1 },
];

/* ─── TOOLTIP CUSTOM ───────────────────────────────────────────────────── */
function CustomTooltip({
  active,
  payload,
  label,
  unit = "",
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black/90 border border-white/10 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-xl text-xs">
      <p className="text-white/50 font-black uppercase tracking-widest mb-2">
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.name} className="font-black" style={{ color: p.color }}>
          {p.value.toLocaleString("es-ES")}
          {unit}
        </p>
      ))}
    </div>
  );
}

/* ─── MINI STAT CARD ───────────────────────────────────────────────────── */
function MiniStat({
  label,
  value,
  delta,
  color = "red",
}: {
  label: string;
  value: string;
  delta?: string;
  color?: "red" | "purple";
}) {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
        {label}
      </p>
      <p
        className={`text-2xl md:text-3xl font-black italic tracking-tighter ${
          color === "purple" ? "text-purple-400" : "text-white"
        }`}
      >
        {value}
      </p>
      {delta && (
        <p
          className={`text-[11px] font-bold ${color === "purple" ? "text-purple-400/70" : "text-red-500/80"}`}
        >
          {delta}
        </p>
      )}
    </div>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────────────────── */
export default function MiCanalPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  const [stats, setStats] = useState<YouTubeChannel | null>(null);
  const [latest, setLatest] = useState<YouTubeVideo[]>([]);
  const [activeTab, setActiveTab] = useState<"youtube" | "instagram">(
    "youtube",
  );
  const [chartMounted, setChartMounted] = useState(false);

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
    // Pequeño retraso para que los charts se monten suavemente
    const t = setTimeout(() => setChartMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const views = stats ? Number(stats.viewCount) : 18800000;
  const subs = stats ? Number(stats.subscriberCount) : 68400;
  const videoCount = stats ? Number(stats.videoCount) : 1234;

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <Header />

      <main>
        {/* ─── HERO ─── */}
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

          <ScrollHint />
        </section>

        {/* ─── HIGHLIGHT VISUALIZACIONES ─── */}
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

        {/* ─── STAT BADGES ─── */}
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

            {/* Países */}
            <div className="group relative flex flex-col items-start gap-5 p-7 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1.5 hover:bg-white/[0.05]">
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-yellow-500/10" />
              <div className="relative z-10 inline-flex p-3.5 rounded-2xl bg-black/40 border border-yellow-500/30 text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.25)]">
                <Globe size={24} />
              </div>
              <div className="relative z-10 w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {COUNTRIES.filter((c) => c.code !== "ot").map((c) => (
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

        {/* ═══════════════════════════════════════════════════════════════
            DASHBOARD DE CRECIMIENTO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Glow fondo */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto">
            {/* Cabecera + tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-red-600 rounded-full" />
                  <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">
                    Analíticas en tiempo real
                  </span>
                </div>
                <Reveal y={30}>
                  <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">
                    CRECIMIENTO <span className="text-red-600">MENSUAL</span>
                  </h2>
                </Reveal>
              </div>

              {/* Tab switcher */}
              <div className="flex gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 self-start md:self-auto">
                <button
                  onClick={() => setActiveTab("youtube")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === "youtube"
                      ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {/* YouTube icon */}
                  <svg
                    className="w-4 h-3"
                    viewBox="0 0 28 20"
                    fill="currentColor"
                  >
                    <path d="M27.37 3.03C27.04 1.84 26.09.89 24.9.56 22.72 0 14 0 14 0S5.28 0 3.1.56C1.91.89.96 1.84.63 3.03.07 5.22 0 9.8 0 9.8s.07 4.58.63 6.77c.33 1.19 1.28 2.14 2.47 2.47C5.28 19.6 14 19.6 14 19.6s8.72 0 10.9-.56c1.19-.33 2.14-1.28 2.47-2.47C27.93 14.38 28 9.8 28 9.8s-.07-4.58-.63-6.77zM11.2 14V5.6l7.28 4.2L11.2 14z" />
                  </svg>
                  YouTube
                </button>
                <button
                  onClick={() => setActiveTab("instagram")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === "instagram"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <Instagram size={14} />
                  Instagram
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "youtube" ? (
                <motion.div
                  key="youtube"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* KPIs YouTube */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <MiniStat
                      label="Suscriptores"
                      value={`${(subs / 1000).toFixed(1)}K`}
                      delta="↑ +1.7K este mes"
                      color="red"
                    />
                    <MiniStat
                      label="Vistas este mes"
                      value="1.1M"
                      delta="↑ +22% vs. anterior"
                      color="red"
                    />
                    <MiniStat
                      label="Nuevos subs/mes"
                      value="1.7K"
                      delta="↑ récord en mayo"
                      color="red"
                    />
                    <MiniStat
                      label="Vídeos totales"
                      value={videoCount.toString()}
                      delta={`+${Math.round(videoCount / 12)} este año`}
                      color="red"
                    />
                  </div>

                  {/* Charts grid YouTube */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Views por mes */}
                    <div className="p-6 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/8 hover:border-red-600/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-red-600/10 border border-red-600/20">
                          <Eye size={16} className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-tight">
                            Visualizaciones mensuales
                          </p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                            Últimos 12 meses · en miles
                          </p>
                        </div>
                      </div>
                      {chartMounted && (
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart
                            data={YT_MONTHLY}
                            margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                          >
                            <defs>
                              <linearGradient
                                id="viewsGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#dc2626"
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#dc2626"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.04)"
                            />
                            <XAxis
                              dataKey="mes"
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip unit="K" />} />
                            <Area
                              type="monotone"
                              dataKey="views"
                              stroke="#dc2626"
                              strokeWidth={2.5}
                              fill="url(#viewsGrad)"
                              dot={false}
                              activeDot={{
                                r: 5,
                                fill: "#dc2626",
                                stroke: "#000",
                                strokeWidth: 2,
                              }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>

                    {/* Subs nuevos por mes */}
                    <div className="p-6 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/8 hover:border-red-600/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-red-600/10 border border-red-600/20">
                          <Users size={16} className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-tight">
                            Nuevos suscriptores / mes
                          </p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                            Últimos 12 meses
                          </p>
                        </div>
                      </div>
                      {chartMounted && (
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={YT_MONTHLY}
                            margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                          >
                            <defs>
                              <linearGradient
                                id="subsGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#dc2626"
                                  stopOpacity={0.9}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#7f1d1d"
                                  stopOpacity={0.6}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.04)"
                            />
                            <XAxis
                              dataKey="mes"
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip unit=" subs" />} />
                            <Bar
                              dataKey="subs"
                              fill="url(#subsGrad)"
                              radius={[6, 6, 0, 0]}
                              maxBarSize={32}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="instagram"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* KPIs Instagram */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <MiniStat
                      label="Seguidores"
                      value="15.8K"
                      delta="↑ +700 este mes"
                      color="purple"
                    />
                    <MiniStat
                      label="Alcance mensual"
                      value="225K"
                      delta="↑ +10% vs anterior"
                      color="purple"
                    />
                    <MiniStat
                      label="Engagement"
                      value="4.2%"
                      delta="↑ top 10% sector"
                      color="purple"
                    />
                    <MiniStat
                      label="Publicaciones"
                      value="340+"
                      delta="+8 este mes"
                      color="purple"
                    />
                  </div>

                  {/* Charts grid Instagram */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Followers */}
                    <div className="p-6 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/8 hover:border-purple-600/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-purple-600/10 border border-purple-600/20">
                          <Users size={16} className="text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-tight">
                            Seguidores acumulados
                          </p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                            Últimos 12 meses
                          </p>
                        </div>
                      </div>
                      {chartMounted && (
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart
                            data={IG_MONTHLY}
                            margin={{ top: 5, right: 5, bottom: 0, left: -10 }}
                          >
                            <defs>
                              <linearGradient
                                id="igFollowersGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#a855f7"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#a855f7"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.04)"
                            />
                            <XAxis
                              dataKey="mes"
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                              }}
                              axisLine={false}
                              tickLine={false}
                              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                            />
                            <Tooltip content={<CustomTooltip unit=" seg." />} />
                            <Area
                              type="monotone"
                              dataKey="followers"
                              stroke="#a855f7"
                              strokeWidth={2.5}
                              fill="url(#igFollowersGrad)"
                              dot={false}
                              activeDot={{
                                r: 5,
                                fill: "#a855f7",
                                stroke: "#000",
                                strokeWidth: 2,
                              }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>

                    {/* Alcance mensual */}
                    <div className="p-6 md:p-8 rounded-[28px] bg-white/[0.03] border border-white/8 hover:border-purple-600/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-pink-600/10 border border-pink-600/20">
                          <TrendingUp size={16} className="text-pink-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic tracking-tight">
                            Alcance mensual
                          </p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
                            En miles · últimos 12 meses
                          </p>
                        </div>
                      </div>
                      {chartMounted && (
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={IG_MONTHLY}
                            margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
                          >
                            <defs>
                              <linearGradient
                                id="igReachGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#ec4899"
                                  stopOpacity={0.9}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#9333ea"
                                  stopOpacity={0.6}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="rgba(255,255,255,0.04)"
                            />
                            <XAxis
                              dataKey="mes"
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 10,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip unit="K" />} />
                            <Bar
                              dataKey="reach"
                              fill="url(#igReachGrad)"
                              radius={[6, 6, 0, 0]}
                              maxBarSize={32}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Instagram CTA / info */}
                  <div className="mt-6 p-6 md:p-8 rounded-[28px] bg-gradient-to-r from-purple-900/20 via-pink-900/10 to-transparent border border-purple-600/20 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-white/10">
                      <Instagram size={32} className="text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/70 mb-1">
                        Síguenos en Instagram
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">
                        @pecinogp
                      </h3>
                      <p className="text-white/40 text-sm mt-1">
                        Reels, carruseles y stories exclusivos de cada GP
                      </p>
                    </div>
                    <a
                      href="https://www.instagram.com/pecinogp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto shrink-0 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black italic px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                      Seguir <ArrowUpRight size={16} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            AUDIENCIA POR PAÍS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto">
            <Reveal y={30} className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 bg-red-600 rounded-full" />
                <span className="text-red-500 font-black uppercase tracking-[0.2em] text-[10px]">
                  Distribución global
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                AUDIENCIA <span className="text-red-600">POR PAÍS</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3">
              {COUNTRIES.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all group"
                >
                  {c.code !== "ot" ? (
                    <img
                      src={`https://flagcdn.com/w40/${c.code}.png`}
                      alt={c.name}
                      className="w-9 h-auto rounded-sm shadow-md ring-1 ring-white/10 shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-6 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                      <Globe size={14} className="text-white/40" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-white/60 group-hover:text-white/80 transition-colors">
                        {c.name}
                      </span>
                      <span className="text-[11px] font-black text-red-500 ml-2 shrink-0">
                        {c.pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.04 + 0.2,
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ÚLTIMOS VÍDEOS ─── */}
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
