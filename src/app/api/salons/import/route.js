import { NextResponse } from "next/server";
import { auth }         from "@/lib/auth";
import connectDB        from "@/lib/mongodb";
import Salon            from "@/models/Salon";
import { SalonCreateSchema } from "@/lib/schemas";

export const runtime = "nodejs";

const MAX_BYTES = 500_000; // 500 KB
const MAX_ROWS  = 300;

function csvLineSplit(line) {
  const fields = [];
  let field = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuote) {
      if (ch === '"' && line[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuote = false;
      else field += ch;
    } else {
      if (ch === '"') inQuote = true;
      else if (ch === ",") { fields.push(field); field = ""; }
      else field += ch;
    }
  }
  fields.push(field);
  return fields.map(f => f.trim());
}

function generateSalonId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "LSN-" + Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => chars[b % chars.length])
    .join("");
}

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart request." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file.size === "undefined") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large. Maximum allowed size is 500 KB.` },
      { status: 413 }
    );
  }

  const mime = file.type ?? "";
  if (mime && !["text/csv", "text/plain", "application/vnd.ms-excel", ""].includes(mime)) {
    return NextResponse.json({ error: "Only CSV files are accepted." }, { status: 415 });
  }

  let text;
  try {
    text = await file.text();
  } catch {
    return NextResponse.json({ error: "Could not read file." }, { status: 400 });
  }

  const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
  if (lines.length < 2) {
    return NextResponse.json({ error: "CSV has no data rows (only header or empty)." }, { status: 400 });
  }

  const dataLines = lines.slice(1); // skip header
  if (dataLines.length > MAX_ROWS) {
    return NextResponse.json(
      { error: `Too many rows. Maximum ${MAX_ROWS} rows per import.` },
      { status: 400 }
    );
  }

  // Parse and validate each row
  const EXPECTED_COLS = ["name","city","address","phone1","phone2","phone3","timing",
                         "googleMapUrl","salonTourUrl","bookAppointmentUrl","isActive"];
  const header = csvLineSplit(lines[0]).map(h => h.toLowerCase().replace(/\s/g, ""));
  if (!header.includes("name") || !header.includes("city") || !header.includes("address") || !header.includes("timing")) {
    return NextResponse.json(
      { error: "CSV must include columns: name, city, address, timing." },
      { status: 400 }
    );
  }

  const idx = {};
  EXPECTED_COLS.forEach(col => { idx[col] = header.indexOf(col); });

  const parsed = [];
  const rowErrors = [];

  for (let i = 0; i < dataLines.length; i++) {
    const cols = csvLineSplit(dataLines[i]);
    const rowNum = i + 2; // 1-based + header

    const phone1 = idx.phone1 >= 0 ? (cols[idx.phone1] ?? "") : "";
    const phone2 = idx.phone2 >= 0 ? (cols[idx.phone2] ?? "") : "";
    const phone3 = idx.phone3 >= 0 ? (cols[idx.phone3] ?? "") : "";
    const phones = [phone1, phone2, phone3].filter(Boolean);

    const raw = {
      name:               cols[idx.name]               ?? "",
      city:               cols[idx.city]               ?? "",
      address:            cols[idx.address]            ?? "",
      phones,
      timing:             idx.timing >= 0              ? (cols[idx.timing]             ?? "") : "",
      googleMapUrl:       idx.googleMapUrl >= 0        ? (cols[idx.googleMapUrl]       ?? "") : "",
      salonTourUrl:       idx.salonTourUrl >= 0        ? (cols[idx.salonTourUrl]       ?? "") : "",
      bookAppointmentUrl: idx.bookAppointmentUrl >= 0  ? (cols[idx.bookAppointmentUrl] ?? "") : "",
      isActive:           idx.isActive >= 0
        ? cols[idx.isActive]?.toLowerCase() !== "false"
        : true,
    };

    const result = SalonCreateSchema.safeParse(raw);
    if (!result.success) {
      rowErrors.push({ row: rowNum, error: result.error.issues[0]?.message ?? "Validation failed." });
    } else {
      parsed.push(result.data);
    }
  }

  if (parsed.length === 0) {
    return NextResponse.json(
      { inserted: 0, skipped: 0, errors: rowErrors },
      { status: 422 }
    );
  }

  try {
    await connectDB();

    // Duplicate check: find existing salons matching any name+city pair in one query
    const nameCityPairs = parsed.map(p => ({ name: { $regex: `^${p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" }, city: { $regex: `^${p.city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } }));
    const existing = await Salon.find({ $or: nameCityPairs }).select("name city").lean();

    const existingSet = new Set(
      existing.map(s => `${s.name.toLowerCase()}|${s.city.toLowerCase()}`)
    );

    const toInsert = [];
    const skippedDupes = [];

    for (const p of parsed) {
      const key = `${p.name.toLowerCase()}|${p.city.toLowerCase()}`;
      if (existingSet.has(key)) {
        skippedDupes.push(`"${p.name}" in ${p.city}`);
      } else {
        toInsert.push({ salonId: generateSalonId(), ...p });
      }
    }

    let inserted = 0;
    const insertErrors = [];

    if (toInsert.length > 0) {
      const result = await Salon.insertMany(toInsert, { ordered: false, rawResult: true });
      inserted = result.insertedCount ?? toInsert.length;

      // Catch partial failures (duplicate salonId — extremely rare)
      if (result.mongoose?.validationErrors?.length) {
        result.mongoose.validationErrors.forEach(e => insertErrors.push(e.message));
      }
    }

    return NextResponse.json(
      {
        inserted,
        skipped:    skippedDupes.length,
        skippedList: skippedDupes,
        errors:     [...rowErrors, ...insertErrors],
      },
      { status: 200 }
    );
  } catch (err) {
    // insertMany with ordered:false can throw BulkWriteError with partial results
    if (err.name === "MongoBulkWriteError") {
      const inserted = err.result?.insertedCount ?? 0;
      return NextResponse.json(
        { inserted, skipped: 0, errors: [err.message] },
        { status: 207 }
      );
    }
    console.error("POST /api/salons/import:", err);
    return NextResponse.json({ error: "Import failed. Please try again." }, { status: 500 });
  }
}
