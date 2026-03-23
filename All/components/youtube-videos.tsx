"use client"

import Image from "next/image"
import Link from "next/link"
import { YouTubeVideo, getVideoUrl, formatDate } from "@/lib/youtube-service"
import { Star, Play, Calendar, Youtube } from "lucide-react"

interface YouTubeVideosProps {
  videos: YouTubeVideo[];
  specialVideoId?: string | null;
  specialLabel?: string;
  showSeeMore?: boolean;
}

export function YouTubeVideos({ videos, specialVideoId, specialLabel = "EDICIÓN ESPECIAL", showSeeMore = false }: YouTubeVideosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
      {videos.map((video) => {
        const isSpecial = video.id === specialVideoId;
        return (
          <Link
            key={video.id}
            href={getVideoUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col bg-white/5 backdrop-blur-xl border rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
              isSpecial ? 'border-yellow-500/80 shadow-[0_0_30px_rgba(234,179,8,0.2)] ring-1 ring-inset ring-yellow-500/20' : 'border-white/10 hover:border-red-600/50'
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {isSpecial && (
                <div className={`${specialLabel === 'MÁS RECIENTE' ? 'bg-red-600' : 'bg-yellow-500'} text-white px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-xl animate-pulse absolute top-4 right-4 z-20`}>
                  <Star size={12} fill="currentColor" />
                  <span>{specialLabel}</span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]">
                  <Play className="fill-white text-white translate-x-0.5" size={24} />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={12} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {formatDate(video.publishedAt)}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-red-600" />
                  <span className="text-[9px] font-black text-gray-500 uppercase">
                    {video.isLive ? 'Directo' : 'Vídeo'}
                  </span>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black italic tracking-tighter text-white mb-4 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight uppercase">
                {video.title}
              </h3>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Ver ahora</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                  <Play size={12} className="fill-white text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </Link>
        )
      })}
      
      {showSeeMore && (
        <Link
          href="https://www.youtube.com/@PecinoGP"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/10"
        >
          <div className="text-center p-8">
            <div className="w-48 h-48 relative mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              <Image
                src="/insignia-member.png"
                alt="PecinoGP Member"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Ver más</h3>
          </div>
        </Link>
      )}
    </div>
  )
}
