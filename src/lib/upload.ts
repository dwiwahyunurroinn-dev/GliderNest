import fs from "node:fs/promises";
import path from "node:path";

// Hanya gambar yang boleh diunggah — mencegah file berbahaya (HTML/SVG
// berskrip, executable) tersaji dari folder publik.
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

/** Simpan file upload ke public/uploads dan kembalikan path publiknya. */
export async function saveUpload(file: File | null): Promise<string> {
  if (!file || file.size === 0 || typeof file === "string") return "";
  if (!ALLOWED.has(file.type) || file.size > MAX_BYTES) return "";

  const bytes = Buffer.from(await file.arrayBuffer());
  const base = file.name
    .replace(/\.[^.]*$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 60);
  // ekstensi ditentukan dari tipe MIME, bukan dari nama file
  const name = `${Date.now()}-${base || "gambar"}.${EXT[file.type]}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}
