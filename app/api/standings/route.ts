import { NextResponse } from "next/server";
import { cachedJson } from "@/lib/api-cache";

// Caché persistente: en dev 24h para no recargar en cada HMR, en prod 15 min.
const STANDINGS_TTL = { dev: 24 * 3600, prod: 900 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seasonUuid = searchParams.get("seasonUuid");
  const categoryUuid = searchParams.get("categoryUuid");

  if (!seasonUuid || !categoryUuid) {
    return NextResponse.json(
      { error: "Missing required parameters: seasonUuid and categoryUuid" },
      { status: 400 }
    );
  }

  const apiUrl = `https://api.motogp.pulselive.com/motogp/v1/results/standings?seasonUuid=${seasonUuid}&categoryUuid=${categoryUuid}`;

  try {
    const data = await cachedJson(
      `standings:${seasonUuid}:${categoryUuid}`,
      STANDINGS_TTL,
      async () => {
        const response = await fetch(apiUrl, {
          next: { revalidate: 900 },
        });

        if (!response.ok) {
          throw new Error(`MotoGP API responded with status: ${response.status}`);
        }

        return response.json();
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching MotoGP standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings from MotoGP API" },
      { status: 500 }
    );
  }
}
