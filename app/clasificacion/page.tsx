"use client";
import { useState } from "react";
import Header from "@/All/components/header";
import { motion, AnimatePresence } from "framer-motion";
import ClassificationTable from "./components/classification-table";

type Category = "motogp" | "moto2" | "moto3";
type Year = "2025" | "2026";

export default function ClasificacionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("motogp");
  const [activeYear, setActiveYear] = useState<Year>("2026");

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-red-600 selection:text-white">
      <div
        className="fixed inset-0 z-0 scale-105"
        style={{
          backgroundImage: "url('/Motohp fondo, marc y peco.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) saturate(1.2) contrast(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-24 md:pt-32">
          <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-16 border-b border-white/5 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-red-600 rounded-full" />
                    <span className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Temporada Oficial</span>
                  </div>
                  <div className="flex items-baseline space-x-6">
                    <h1
                      className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 italic tracking-tighter leading-none"
                      style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}
                    >
                      MOTO<span className="text-red-600">GP</span>
                    </h1>
                    <div className="flex items-baseline space-x-2 md:space-x-4">
                      {(["2025", "2026"] as Year[]).map((year) => (
                        <button
                          key={year}
                          onClick={() => setActiveYear(year)}
                          className={`relative text-2xl sm:text-3xl md:text-5xl font-black transition-all duration-500 outline-none ${
                            activeYear === year
                              ? "text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                              : "text-white/20 hover:text-white/40"
                          }`}
                        >
                          {year}
                          {activeYear === year && (
                            <motion.div
                              layoutId="active-year-glow"
                              className="absolute -inset-2 bg-red-600/10 blur-xl rounded-full -z-10"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 font-medium tracking-wide max-w-lg mt-2 text-sm md:text-base border-l border-red-600/30 pl-4">
                    Resultados en directo y clasificación oficial del campeonato del mundo de motociclismo.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-12">
                <div className="bg-black/40 backdrop-blur-2xl rounded-2xl p-2 flex shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                  {(["motogp", "moto2", "moto3"] as Category[]).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-4 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-black rounded-xl transition-all duration-500 uppercase tracking-[0.2em] outline-none ${
                        activeCategory === category
                          ? "text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {activeCategory === category && (
                        <motion.div
                          layoutId="active-category-box"
                          className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeYear}-${activeCategory}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ClassificationTable category={activeCategory} year={activeYear} />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
