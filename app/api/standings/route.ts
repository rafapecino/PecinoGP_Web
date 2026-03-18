import { NextResponse } from "next/server";

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
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Cache on server for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`MotoGP API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching MotoGP standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings from MotoGP API" },
      { status: 500 }
    );
  }
}
