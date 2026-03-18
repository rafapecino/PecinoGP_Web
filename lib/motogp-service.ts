// MotoGP Data Service - Integración con la API oficial de MotoGP via Proxy
// Season and Category UUIDs

export const SEASONS = {
  "2025": "ae6c6f0d-c652-44f8-94aa-420fc5b3dab4",
  "2026": "e88b4e43-2209-47aa-8e83-0e0b1cedde6e",
};

export const CATEGORIES = {
  motogp: "e8c110ad-64aa-4e8e-8a86-f2f152f6a942",
  moto2: "549640b8-fd9c-4245-acfd-60e4bc38b25c",
  moto3: "954f7e65-2ef2-4423-b949-4961cc603e45",
};

export interface DriverStanding {
  pos: string;
  driverName: string;
  teamName: string;
  points: string;
  wins: string;
  podiums: string;
  countryCode: string;
  riderNumber: string;
  diffLeader?: string;
  lastUpdate?: string;
}

const FALLBACK_STANDINGS: DriverStanding[] = [
  { pos: "1", driverName: "M. Marquez", teamName: "Ducati", points: "545", wins: "11", podiums: "15", countryCode: "ES", riderNumber: "93" },
  { pos: "2", driverName: "A. Marquez", teamName: "Gresini Racing", points: "467", wins: "3", podiums: "12", countryCode: "ES", riderNumber: "73" },
  { pos: "3", driverName: "M. Bezzecchi", teamName: "Aprilia", points: "353", wins: "3", podiums: "9", countryCode: "IT", riderNumber: "72" },
  { pos: "4", driverName: "P. Acosta", teamName: "Red Bull KTM Factory Racing", points: "307", wins: "0", podiums: "5", countryCode: "ES", riderNumber: "37" },
  { pos: "5", driverName: "F. Bagnaia", teamName: "Ducati", points: "288", wins: "2", podiums: "8", countryCode: "IT", riderNumber: "63" },
];

const CACHE_KEY_PREFIX = "motogp_standings_";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function getDriverStandings(
  category: keyof typeof CATEGORIES = "motogp",
  year: keyof typeof SEASONS = "2026"
): Promise<DriverStanding[]> {
  const seasonUuid = SEASONS[year];
  const categoryUuid = CATEGORIES[category];

  if (!seasonUuid || !categoryUuid) {
    console.error("Invalid season or category");
    return FALLBACK_STANDINGS;
  }

  const cacheKey = `${CACHE_KEY_PREFIX}${year}_${category}`;
  
  // Check localStorage cache (client-side only)
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  try {
    const response = await fetch(`/api/standings?seasonUuid=${seasonUuid}&categoryUuid=${categoryUuid}`);
    
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }

    const rawData = await response.json();
    
    if (!rawData.classification || !Array.isArray(rawData.classification)) {
      throw new Error("Invalid API response structure");
    }

    const leaderPoints = rawData.classification.length > 0 ? rawData.classification[0].points : 0;
    const lastUpdate = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const processedData: DriverStanding[] = rawData.classification.map((item: any) => ({
      pos: item.position.toString(),
      driverName: item.rider.full_name,
      teamName: item.team.name,
      points: item.points.toString(),
      wins: (item.race_wins || 0).toString(),
      podiums: (item.podiums || 0).toString(),
      countryCode: item.rider.country?.iso || "ES",
      riderNumber: item.rider.number?.toString() || "",
      diffLeader: item.position === 1 ? "-" : `-${leaderPoints - item.points}`,
      lastUpdate: lastUpdate,
    }));

    // Save to cache (client-side only)
    if (typeof window !== "undefined") {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: processedData,
        timestamp: Date.now()
      }));
    }

    return processedData;
  } catch (error) {
    console.error("Error fetching MotoGP standings:", error);
    
    // Fallback logic
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        return JSON.parse(cached).data;
      }
    }
    
    return FALLBACK_STANDINGS;
  }
}
