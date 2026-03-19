"use client"

import Image from "next/image";
import Link from "next/link"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Logo } from "./logo"
import { LiveStream } from "@/lib/youtube-service"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/analisis-gp", label: "Análisis GP" },
  { href: "/calendario", label: "Calendario" },
  { href: "/clasificacion", label: "Clasificación" },
  { href: "/el-paddock", label: "El Paddock" },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [liveInfo, setLiveInfo] = useState<LiveStream>({ isLive: false });
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        const res = await fetch('/api/live');
        if (res.ok) {
          const status: LiveStream = await res.json();
          setLiveInfo(status);
        }
      } catch (error) {
        console.error("Error fetching live status from API route:", error);
      }
    }

    fetchLiveStatus();
    const interval = setInterval(fetchLiveStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "py-3 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          : "py-6 md:py-14 bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between transition-all duration-500">
          <Link href="/" className="shrink-0 active:scale-95 transition-transform duration-300">
            <Logo size={scrolled ? "xs" : "sm"} className="md:scale-125 origin-left transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-2 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300 italic"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-px h-6 bg-white/10 mx-2" />
            {liveInfo.isLive ? (
              <a
                href={`https://www.youtube.com/watch?v=${liveInfo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-red-600 text-white font-black italic px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                <span className="text-[10px] uppercase tracking-widest hidden sm:inline">EN DIRECTO</span>
                <span className="text-[10px] uppercase tracking-widest inline sm:hidden">LIVE</span>
              </a>
            ) : (
              <a
                href="https://www.youtube.com/channel/UCSvr3yH2NkqlAHfuRDphz4g"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center transition-all duration-300 hover:scale-125 active:scale-95"
              >
                <Image
                  src="/YouTube_Logo/Digital/01 Full Color/yt_logo_fullcolor_white_digital.png"
                  alt="YouTube Logo"
                  width={80}
                  height={20}
                  className="opacity-60 group-hover:opacity-100 transition-opacity hidden sm:block"
                />
                <div className="sm:hidden text-white/60 group-hover:text-red-600 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 28 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M27.3733 3.033C27.0433 1.841 26.0913 0.889 24.9 0.559C22.7163 0 14.0003 0 14.0003 0C14.0003 0 5.28433 0 3.10033 0.559C1.90833 0.889 0.957333 1.841 0.627333 3.033C0.0683334 5.217 0 9.8 0 9.8S0.0683334 14.383 0.627333 16.567C0.957333 17.759 1.90833 18.711 3.10033 19.041C5.28433 19.6 14.0003 19.6 14.0003 19.6C14.0003 19.6 22.7163 19.6 24.9003 19.041C26.0923 18.711 27.0433 17.759 27.3733 16.567C27.9323 14.383 28.0003 9.8 28.0003 9.8S27.9323 5.217 27.3733 3.033ZM11.2003 14V5.6L18.4803 9.8L11.2003 14Z" />
                  </svg>
                </div>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="xl:hidden py-8 px-4 border-t border-white/5 bg-black/95 backdrop-blur-3xl space-y-4 overflow-hidden"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-black italic uppercase tracking-widest text-white/70 hover:text-red-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 flex justify-center">
                {liveInfo.isLive ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${liveInfo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-red-600 text-white font-black italic px-8 py-4 rounded-2xl animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                  >
                    <span className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                    <span>EN DIRECTO</span>
                  </a>
                ) : (
                  <a
                    href="https://www.youtube.com/channel/UCSvr3yH2NkqlAHfuRDphz4g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 text-white/40 hover:text-red-600 transition-colors"
                  >
                    <svg
                      className="w-12 h-12"
                      viewBox="0 0 28 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M27.3733 3.033C27.0433 1.841 26.0913 0.889 24.9 0.559C22.7163 0 14.0003 0 14.0003 0C14.0003 0 5.28433 0 3.10033 0.559C1.90833 0.889 0.957333 1.841 0.627333 3.033C0.0683334 5.217 0 9.8 0 9.8S0.0683334 14.383 0.627333 16.567C0.957333 17.759 1.90833 18.711 3.10033 19.041C5.28433 19.6 14.0003 19.6 14.0003 19.6C14.0003 19.6 22.7163 19.6 24.9003 19.041C26.0923 18.711 27.0433 17.759 27.3733 16.567C27.9323 14.383 28.0003 9.8 28.0003 9.8S27.9323 5.217 27.3733 3.033ZM11.2003 14V5.6L18.4803 9.8L11.2003 14Z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
