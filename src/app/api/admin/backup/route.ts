import fs from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth";

/** Unduh salinan database (backup) — hanya untuk admin yang sudah login. */
export async function GET() {
  if (!(await getSession())) {
    return new Response("Tidak diizinkan — silakan login admin.", { status: 401 });
  }

  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  try {
    const data = await fs.readFile(dbPath);
    const stamp = new Date().toISOString().slice(0, 10);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="glidernest-backup-${stamp}.db"`,
      },
    });
  } catch {
    return new Response("File database tidak ditemukan.", { status: 404 });
  }
}
