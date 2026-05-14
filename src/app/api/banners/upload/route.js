import { NextResponse }       from "next/server";
import { auth }               from "@/lib/auth";
import { writeFile, mkdir }   from "fs/promises";
import path                   from "path";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB   = 10;

export async function POST(request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let formData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ error: "Invalid form data." }, { status: 400 }); }

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are allowed." }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: `File size must be under ${MAX_SIZE_MB}MB.` }, { status: 400 });
  }

  try {
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext      = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safe     = ext.replace(/[^a-z0-9]/g, "");
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safe}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/uploads/banners/${filename}` });
  } catch (err) {
    console.error("POST /api/banners/upload:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
