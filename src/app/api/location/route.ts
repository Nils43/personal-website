import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "edge";

interface LocationData {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  updatedAt: string;
}

// GET — read current location
export async function GET() {
  try {
    const location = await kv.get<LocationData>("nils-location");
    if (!location) {
      return NextResponse.json({ city: "Berlin", country: "Germany", fallback: true });
    }
    // If older than 4 hours, mark as stale but still return
    const age = Date.now() - new Date(location.updatedAt).getTime();
    const stale = age > 4 * 60 * 60 * 1000;
    return NextResponse.json({ ...location, stale });
  } catch {
    // KV not configured (local dev) — return fallback
    return NextResponse.json({ city: "Berlin", country: "Germany", fallback: true });
  }
}

// POST — update location (from iOS Shortcut)
export async function POST(request: Request) {
  try {
    const secret = request.headers.get("x-location-secret");
    if (secret !== process.env.LOCATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { city, country, lat, lng } = body;

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const data: LocationData = {
      city,
      country: country || "",
      lat,
      lng,
      updatedAt: new Date().toISOString(),
    };

    await kv.set("nils-location", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}
