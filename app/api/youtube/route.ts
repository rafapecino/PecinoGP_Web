import { NextResponse } from "next/server"

const API_KEYS = [
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  process.env.YOUTUBE_API_KEY_2 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3 || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_3,
].filter((k): k is string => typeof k === "string" && k.length > 10)

const CHANNEL_ID =
  process.env.YOUTUBE_CHANNEL_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

const FALLBACK_STATS = {
  subscriberCount: "67900",
  viewCount: "18458740",
  videoCount: "1204",
}

const REVALIDATE_SECONDS = 3600

async function fetchWithRotation(baseUrl: string): Promise<any | null> {
  for (let i = 0; i < API_KEYS.length; i++) {
    const url = `${baseUrl}&key=${API_KEYS[i]}`
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
      if (res.ok) return await res.json()
      if (res.status === 403) {
        console.warn(`[YT] Key #${i + 1} cuota agotada, probando siguiente...`)
        continue
      }
      throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      console.warn(`[YT] Key #${i + 1} fallo:`, (err as Error).message)
      continue
    }
  }
  return null
}

function parseIsoDurationSeconds(d: string): number {
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  return (
    parseInt(m[1] || "0") * 3600 +
    parseInt(m[2] || "0") * 60 +
    parseInt(m[3] || "0")
  )
}

function mapVideo(item: any) {
  return {
    id: item.id,
    title: item.snippet?.title || "",
    description: item.snippet?.description || "",
    thumbnail:
      item.snippet?.thumbnails?.maxres?.url ||
      item.snippet?.thumbnails?.high?.url ||
      item.snippet?.thumbnails?.default?.url ||
      `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
    publishedAt: item.snippet?.publishedAt || "",
    viewCount: item.statistics?.viewCount || "0",
    channelTitle: item.snippet?.channelTitle || "PecinoGP",
    isLive:
      !!item.liveStreamingDetails ||
      item.snippet?.liveBroadcastContent === "live",
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featuredIdsParam = searchParams.get("featured")
  const featuredIds = featuredIdsParam
    ? featuredIdsParam.split(",")
    : ["EhRz4obCadU", "b15kGQHfMwI", "eCPrCjpQC2c"]
  const maxLatest = parseInt(searchParams.get("max") || "6")

  if (!CHANNEL_ID || API_KEYS.length === 0) {
    return NextResponse.json({
      stats: FALLBACK_STATS,
      latestVideos: [],
      featuredVideos: [],
    })
  }

  // 1) Channel stats
  const statsData = await fetchWithRotation(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}`
  )
  const stats = statsData?.items?.[0]?.statistics
    ? {
        subscriberCount: statsData.items[0].statistics.subscriberCount,
        viewCount: statsData.items[0].statistics.viewCount,
        videoCount: statsData.items[0].statistics.videoCount,
      }
    : FALLBACK_STATS

  // 2) Latest videos (via uploads playlist)
  const playlistId = CHANNEL_ID.startsWith("UC")
    ? `UU${CHANNEL_ID.substring(2)}`
    : CHANNEL_ID

  const playlistData = await fetchWithRotation(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=snippet&maxResults=15`
  )

  let latestVideos: any[] = []
  if (playlistData?.items?.length) {
    const videoIds = playlistData.items
      .map((it: any) => it.snippet?.resourceId?.videoId)
      .filter(Boolean)

    if (videoIds.length) {
      const detailsData = await fetchWithRotation(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(",")}&part=contentDetails,snippet,statistics,liveStreamingDetails`
      )
      if (detailsData?.items) {
        latestVideos = detailsData.items
          .filter(
            (it: any) =>
              parseIsoDurationSeconds(it.contentDetails?.duration || "") > 120
          )
          .slice(0, maxLatest)
          .map(mapVideo)
      }
    }
  }

  // 3) Featured videos by IDs
  const featuredData = await fetchWithRotation(
    `https://www.googleapis.com/youtube/v3/videos?id=${featuredIds.join(",")}&part=snippet,statistics,liveStreamingDetails`
  )
  const featuredVideos = featuredData?.items?.map(mapVideo) || []

  return NextResponse.json(
    { stats, latestVideos, featuredVideos },
    {
      headers: {
        "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
      },
    }
  )
}
