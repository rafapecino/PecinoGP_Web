"use client";

import { useEffect, useState, useCallback } from "react";
import { getDriverStandings, DriverStanding, CATEGORIES, SEASONS } from "@/lib/motogp-service";
import { Skeleton } from "@/All/components/ui/skeleton";
import { RefreshCcw, Clock } from "lucide-react";

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
                <th className="p-4 w-16 text-center text-xs font-bold uppercase tracking-wider text-gray-400">Pos.</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400">Piloto</th>
                <th className="p-4 hidden md:table-cell text-xs font-bold uppercase tracking-wider text-gray-400">Equipo</th>
                <th className="p-4 hidden sm:table-cell text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Dif.</th>
                <th className="p-4 w-32 text-right text-xs font-bold uppercase tracking-wider text-gray-400">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((piloto) => {
                const pilotPoints = Number(piloto.points);
                const pointsPercentage = leaderPoints > 0 ? (pilotPoints / leaderPoints) * 100 : 0;

                return (
                  <tr
                    key={`${piloto.pos}-${piloto.driverName}`}
                    className={`border-t border-border/50 transition-colors hover:bg-white/5 ${getTeamColor(
                      piloto.teamName
                    )} border-l-4`}
                  >
                    <td className="p-4 text-center font-bold text-lg text-white">
                      {piloto.pos}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://flagcdn.com/w20/${piloto.countryCode.toLowerCase()}.png`}
                          alt={piloto.countryCode}
                          className="w-5 h-auto rounded-sm opacity-80"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                        <div className="flex flex-col">
                          <span className="text-primary font-bold text-base line-clamp-1">
                            {piloto.driverName}
                          </span>
                          <span className="text-[10px] sm:hidden text-muted-foreground uppercase tracking-tighter">
                            {piloto.teamName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-300">
                      {piloto.teamName}
                    </td>
                    <td className="p-4 hidden sm:table-cell text-right text-xs font-mono text-gray-500">
                      {piloto.diffLeader}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-lg font-bold text-white">{piloto.points}</span>
                        <div className="w-20 bg-gray-800 rounded-full h-1 mt-1 overflow-hidden">
                          <div
                            className={`${getTeamBgColor(
                              piloto.teamName
                            )} h-full rounded-full`}
                            style={{ width: `${pointsPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
