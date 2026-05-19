"use client";

import { CalendarIcon, MapPin, ChevronRight, Flag } from "lucide-react";
import { motion } from "framer-motion";

import { getRacesWithStatus } from "@/lib/races";

export function RaceCalendar() {
    const statusOrder = { next: 0, upcoming: 1, completed: 2 };
    const races = getRacesWithStatus().sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
    );
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
    };

    return (
        <motion.div 
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
        >
            {races.map((race, index) => {
                const isNext = race.status === "next";
                const isCompleted = race.status === "completed";

                return (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`group relative flex items-center p-4 md:p-6 rounded-[20px] md:rounded-[24px] border transition-all duration-500 overflow-hidden ${
                            isNext 
                                ? "bg-red-600/10 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.1)] scale-[1.02] z-10" 
                                : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10"
                        } ${isCompleted ? "opacity-40 grayscale" : ""}`}
                    >
                        {isNext && (
                            <div className="absolute top-0 right-0 py-1 px-3 bg-red-600 text-[8px] font-black italic tracking-[0.2em] text-white uppercase rounded-bl-lg">
                                PRÓXIMO EVENTO
                            </div>
                        )}

                        <div className="flex-shrink-0 mr-4 md:mr-6">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-white/5 border border-white/5 group-hover:border-red-600/30 transition-all overflow-hidden">
                                <img
                                    src={`https://flagcdn.com/w80/${race.countryCode}.png`}
                                    alt={`${race.gp} flag`}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between flex-grow gap-3 md:gap-4 overflow-hidden">
                            <div className="min-w-0">
                                <h3 className={`text-base md:text-xl font-black italic tracking-tighter truncate transition-colors ${isNext ? 'text-red-500' : 'text-white'}`}>
                                    {race.gp.toUpperCase()}
                                </h3>
                                <div className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5 md:mt-1 italic truncate">
                                    <MapPin size={8} className="text-red-600 shrink-0" />
                                    {race.circuit}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 py-1.5 md:py-2 px-3 md:px-4 rounded-lg md:rounded-xl font-black italic tracking-widest text-[9px] md:text-[11px] whitespace-nowrap ${
                                    isNext ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]" : "bg-white/5 text-white/60"
                                }`}>
                                    <CalendarIcon size={10} className={isNext ? "text-white" : "text-red-600"} />
                                    {race.dates.toUpperCase()}
                                </div>
                                <ChevronRight className={`hidden md:block transition-all ${isNext ? 'text-red-600 opacity-100 translate-x-1' : 'text-white/10 opacity-0 group-hover:opacity-40'}`} />
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
