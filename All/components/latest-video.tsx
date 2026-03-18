import { YouTubeVideo, getVideoEmbedUrl } from "@/lib/youtube-service";
import { decodeHtmlEntities } from "@/lib/utils";
import { Play } from "lucide-react";

export function LatestVideo({ latestVideo }: { latestVideo: YouTubeVideo | null }) {
  
  if (!latestVideo || latestVideo.error) {
    return (
      <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
        <h2 className="text-2xl font-black italic text-red-600 mb-4 uppercase tracking-tighter">
          Error al Cargar Contenido
        </h2>
        <p className="text-gray-400 font-medium">
          {latestVideo?.description || "No se pudo conectar con el canal de YouTube."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full group">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red-500 italic">Último Análisis Disponible</h2>
      </div>
      
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 md:p-10 shadow-2xl transition-all duration-500 group-hover:border-red-600/30">
        <div className="relative w-full overflow-hidden rounded-[32px] aspect-video shadow-2xl group-hover:shadow-red-600/10 transition-shadow duration-500">
          <iframe
            src={getVideoEmbedUrl(latestVideo.id)}
            title={decodeHtmlEntities(latestVideo.title)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full grayscale-[0.2] transition-all group-hover:grayscale-0"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[32px] z-10" />
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter text-white leading-tight mb-4 group-hover:text-red-500 transition-colors">
            {decodeHtmlEntities(latestVideo.title)}
          </h3>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Play size={14} className="fill-gray-500" /> PECINOGP MOTOGP2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
