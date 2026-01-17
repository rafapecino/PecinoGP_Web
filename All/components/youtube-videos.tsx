"use client"

import Image from "next/image"
import Link from "next/link"
import { YouTubeVideo, getVideoUrl, formatDate } from "@/lib/youtube-service"
import { Star } from "lucide-react"

interface YouTubeVideosProps {
  videos: YouTubeVideo[];
  specialVideoId?: string | null;
}

export function YouTubeVideos({ videos, specialVideoId }: YouTubeVideosProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {videos.map((video) => {
        const isSpecial = video.id === specialVideoId;
        return (
          <Link
            key={video.id}
            href={getVideoUrl(video.id)}
            target="_blank"
            rel="noopener noreferrer"
            className={`card-racing overflow-hidden hover:border-accent transition-colors group cursor-pointer ${isSpecial ? 'border-2 border-yellow-500 shadow-lg shadow-yellow-500/20' : ''}`}
          >
            <div className="relative w-full h-48 overflow-hidden bg-secondary">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {isSpecial && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>1000 Vídeos</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-90 group-hover:opacity-100">
                <div className="bg-red-600 hover:bg-red-700 rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.3 4.29A1.25 1.25 0 0 0 4 5.37v9.26a1.25 1.25 0 0 0 1.9 1.08l7.67-4.63a1.25 1.25 0 0 0 0-2.16L6.3 4.29Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {video.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                <span className="flex items-center gap-1">
                  📅 {formatDate(video.publishedAt)}
                </span>
                <span className="text-accent font-semibold">Ver →</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
