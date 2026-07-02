import fs from "node:fs/promises";
import path from "node:path";

/** Simpan file upload ke public/uploads dan kembalikan path publiknya. */
export async function saveUpload(file: File | null): Promise<string> {
  if (!file || file.size === 0 || typeof file === "string") return "";
  const bytes = Buffer.from(await file.arrayBuffer());
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const name = `${Date.now()}-${safe}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}
