import { NextResponse } from "next/server";
import connectDB        from "@/lib/mongodb";
import Salon            from "@/models/Salon";

export const runtime = "nodejs";

// ── GET /api/salons/cities — public ───────────────────────────────────────────

export async function GET() {
  try {
    await connectDB();

    const cities = await Salon.distinct("city", { isActive: true });
    cities.sort((a, b) => a.localeCompare(b, "en-IN"));

    return NextResponse.json(
      { cities },
      { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("GET /api/salons/cities:", err);
    return NextResponse.json({ error: "Failed to fetch cities." }, { status: 500 });
  }
}
