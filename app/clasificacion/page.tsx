"use client";
import { useState } from "react";
import Header from "@/All/components/header";
import { motion, AnimatePresence } from "framer-motion";
import ClassificationTable from "./components/classification-table";

type Category = "motogp" | "moto2" | "moto3";
type Year = "2025" | "2026";

export default function ClasificacionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("motogp");
  const [activeYear, setActiveYear] = useState<Year>("2025");

  return (
    <div className="min-h-screen bg-background text-foreground bg-black overflow-x-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/Motohp fondo, marc y peco.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-20 md:pt-28">
          <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 border-b border-white/10 bg-transparent">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-baseline space-x-4">
                <h1
                  className="text-4xl md:text-6xl font-black text-white italic tracking-tighter"
                  style={{ textShadow: "4px 4px 15px rgba(0, 0, 0, 0.9)" }}
                >
                  CLASIFICACIÓN
                </h1>
                <div className="flex items-baseline space-x-3">
                  {(["2025", "2026"] as Year[]).map((year) => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`relative text-2xl md:text-4xl font-black transition-all duration-300 ${
                        activeYear === year
                          ? "text-red-500 scale-110"
                          : "text-gray-600 hover:text-white"
                      }`}
                      style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}
                    >
                      {year}
                      {activeYear === year && (
                        <motion.div
                          layoutId="active-year-underline"
                          className="absolute -bottom-1 left-0 right-0 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-10">
                <div className="bg-white/5 backdrop-blur-md rounded-full p-1.5 flex shadow-2xl border border-white/10">
                  {(["motogp", "moto2", "moto3"] as Category[]).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-6 py-2.5 text-xs md:text-sm font-black rounded-full transition-all duration-300 uppercase tracking-widest ${
                        activeCategory === category
                          ? "text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {activeCategory === category && (
                        <motion.div
                          layoutId="active-category-pill"
                          className="absolute inset-0 bg-red-600 rounded-full shadow-lg"
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
