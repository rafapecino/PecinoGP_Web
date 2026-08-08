import { NextResponse } from "next/server";
import { getInstagramStats } from "@/lib/instagram-data";

// Render dinámico: no depende de la Graph API en tiempo de build.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getInstagramStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[api/instagram] Error:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las estadísticas de Instagram." },
      { status: 500 },
    );
  }
}
