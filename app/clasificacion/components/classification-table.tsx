"use client";

import { useEffect, useState, useCallback } from "react";
import { getDriverStandings, DriverStanding, CATEGORIES, SEASONS } from "@/lib/motogp-service";
import { Skeleton } from "@/All/components/ui/skeleton";
import { RefreshCcw, Clock, Award, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClassificationTableProps {
  category: keyof typeof CATEGORIES;
  year: keyof typeof SEASONS;
}

const getTeamColor = (teamName: string) => {
  const lowerTeamName = teamName.toLowerCase();
  if (lowerTeamName.includes("ducati lenovo")) return "border-l-red-600";
  if (lowerTeamName.includes("prima pramac") || lowerTeamName.includes("pramac racing")) return "border-l-purple-600";
  if (lowerTeamName.includes("monster energy yamaha") || lowerTeamName.includes("yamaha")) return "border-l-blue-800";
  if (lowerTeamName.includes("repsol honda")) return "border-l-orange-600";
  if (lowerTeamName.includes("aprilia racing")) return "border-l-black";
  if (lowerTeamName.includes("red bull ktm factory") || lowerTeamName.includes("red bull ktm tech3")) return "border-l-orange-500";
  if (lowerTeamName.includes("trackhouse racing")) return "border-l-blue-700";
  if (lowerTeamName.includes("pertamina enduro vr46") || lowerTeamName.includes("vr46")) return "border-l-yellow-400";
  if (lowerTeamName.includes("lcr honda")) return "border-l-green-600";
  if (lowerTeamName.includes("gresini racing")) return "border-l-sky-400";
  if (lowerTeamName.includes("ducati")) return "border-l-red-600";
  if (lowerTeamName.includes("honda")) return "border-l-orange-700";
  if (lowerTeamName.includes("ktm")) return "border-l-orange-500";
  if (lowerTeamName.includes("aprilia")) return "border-l-black";
  return "border-l-gray-600";
};

const getTeamBgColor = (teamName: string) => {
  const lowerTeamName = teamName.toLowerCase();
  if (lowerTeamName.includes("ducati lenovo")) return "bg-red-600";
  if (lowerTeamName.includes("prima pramac") || lowerTeamName.includes("pramac racing")) return "bg-purple-600";
  if (lowerTeamName.includes("monster energy yamaha") || lowerTeamName.includes("yamaha")) return "bg-blue-800";
  if (lowerTeamName.includes("repsol honda")) return "bg-orange-600";
  if (lowerTeamName.includes("aprilia racing")) return "bg-black";
  if (lowerTeamName.includes("red bull ktm factory") || lowerTeamName.includes("red bull ktm tech3")) return "bg-orange-500";
  if (lowerTeamName.includes("trackhouse racing")) return "bg-blue-700";
  if (lowerTeamName.includes("pertamina enduro vr46") || lowerTeamName.includes("vr46")) return "bg-yellow-400";
  if (lowerTeamName.includes("lcr honda")) return "bg-green-600";
  if (lowerTeamName.includes("gresini racing")) return "bg-sky-400";
  if (lowerTeamName.includes("ducati")) return "bg-red-600";
  if (lowerTeamName.includes("honda")) return "bg-orange-700";
  if (lowerTeamName.includes("ktm")) return "bg-orange-500";
  if (lowerTeamName.includes("aprilia")) return "bg-black";
  return "bg-gray-600";
};

const TableSkeleton = () => (
  <div className="w-full">
    <div className="p-4 bg-secondary/50">
      <Skeleton className="h-6 w-full" />
    </div>
    {[...Array(10)].map((_, i) => (
      <div key={i} className="flex items-center justify-between p-4 border-t border-border/50">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    ))}
  </div>
);

export default function ClassificationTable({ category, year }: ClassificationTableProps) {
  const [data, setData] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = useCallback(async (isAutoRefresh = false) => {
    if (isAutoRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const standings = await getDriverStandings(category, year);
      setData(standings);
      if (standings.length > 0 && standings[0].lastUpdate) {
        setLastUpdate(standings[0].lastUpdate);
      }
    } catch (error) {
      console.error("Error updating standings:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category, year]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(true);
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="bg-secondary/30 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
        <TableSkeleton />
      </div>
    );
  }

  const leaderPoints = data.length > 0 && data[0].points ? Number(data[0].points) : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-muted-foreground px-2">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Última actualización: {lastUpdate || "--:--"}</span>
        </div>
        {refreshing && (
          <div className="flex items-center gap-1 text-red-500 animate-pulse">
            <RefreshCcw className="w-3 h-3 animate-spin" />
            <span>Actualizando...</span>
          </div>
        )}
      </div>

      <div className="bg-secondary/30 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-1.5 py-3 w-8 md:w-16 text-center text-[8px] md:text-xs font-bold uppercase tracking-wider text-gray-400">Pos.</th>
                <th className="px-2 py-3 text-[8px] md:text-xs font-bold uppercase tracking-wider text-gray-400">Piloto</th>
                <th className="p-4 hidden lg:table-cell text-xs font-bold uppercase tracking-wider text-gray-400">Equipo</th>
                <th className="p-4 hidden sm:table-cell text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Dif.</th>
                <th className="px-2 py-3 w-16 md:w-32 text-right text-[8px] md:text-xs font-bold uppercase tracking-wider text-gray-400">Puntos</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {data.map((piloto, index) => {
                  const pilotPoints = Number(piloto.points);
                  const pointsPercentage = leaderPoints > 0 ? (pilotPoints / leaderPoints) * 100 : 0;
                  const isLeader = index === 0;

                  return (
                    <motion.tr
                      key={`${piloto.pos}-${piloto.driverName}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className={`group border-t border-border/50 transition-colors ${getTeamColor(
                        piloto.teamName
                      )} border-l-4 relative overflow-hidden`}
                    >
                      {isLeader && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none hidden md:block" />
                      )}
                      
                      <td className="px-1 py-3 text-center font-black text-xs md:text-xl italic text-white/90">
                        <div className="flex flex-col items-center justify-center">
                          {isLeader ? (
                            <Award className="hidden md:block w-4 h-4 text-yellow-500 mb-0.5" />
                          ) : (
                            <span className="hidden md:block opacity-0 w-4 h-4 mb-0.5" />
                          )}
                          {piloto.pos}
                        </div>
                      </td>
                      
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1.5 md:gap-4">
                          <div className="relative shrink-0">
                            <img 
                              src={`https://flagcdn.com/w40/${piloto.countryCode.toLowerCase()}.png`}
                              alt={piloto.countryCode}
                              className="w-3 md:w-6 h-auto rounded-sm shadow-md transition-transform group-hover:scale-110"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            {isLeader && (
                              <div className="absolute -inset-0.5 rounded-sm bg-yellow-500/20 animate-pulse hidden md:block" />
                            )}
                          </div>
                          
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-start gap-1 md:gap-2">
                              <span className={`font-black text-[10px] md:text-lg tracking-tighter uppercase italic leading-tight ${isLeader ? 'text-white md:text-yellow-500' : 'text-white'}`}>
                                {piloto.driverName}
                              </span>
                              <span className="text-[6px] md:text-[10px] bg-white/10 text-white/60 px-0.5 md:px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5">
                                #{piloto.riderNumber}
                              </span>
                            </div>
                            <span className="text-[6px] md:text-[10px] text-muted-foreground uppercase tracking-widest font-medium leading-tight mt-0.5">
                              {piloto.teamName}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                          {piloto.teamName}
                        </span>
                      </td>
                      
                      <td className="p-4 hidden sm:table-cell text-right">
                        <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-black uppercase tracking-tighter ${piloto.diffLeader === '-' ? 'text-gray-500' : 'text-red-500'}`}>
                            {piloto.diffLeader === '-' ? 'LID' : piloto.diffLeader}
                          </span>
                          <TrendingUp className={`w-3 h-3 ${piloto.diffLeader === '-' ? 'text-gray-700' : 'text-red-900/50'}`} />
                        </div>
                      </td>
                      
                      <td className="px-2 py-3 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-baseline gap-0.5 md:gap-1">
                            <span className="font-black text-sm md:text-2xl italic text-white tracking-tighter">{piloto.points}</span>
                            <span className="text-[6px] md:text-[10px] text-gray-500 font-bold">PTS</span>
                          </div>
                          <div className="w-8 md:w-24 bg-white/5 rounded-full h-0.5 md:h-1.5 overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pointsPercentage}%` }}
                              transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                              className={`${getTeamBgColor(
                                piloto.teamName
                              )} h-full rounded-full shadow-[0_0_5px_rgba(255,255,255,0.1)]`}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
