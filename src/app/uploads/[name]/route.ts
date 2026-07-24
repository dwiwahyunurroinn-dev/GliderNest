import fs from "node:fs/promises";
import path from "node:path";

// Next.js `next start` TIDAK menyajikan file yang ditambahkan ke folder
// public/ setelah build (mis. foto yang diunggah admin saat website sudah
// online). Route handler ini membaca file dari public/uploads langsung dari
// disk saat diminta, sehingga foto unggahan tetap tampil di produksi.
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  // hanya izinkan nama file polos — cegah path traversal (../)
  if (!name || name.includes("/") || name.includes("\\") || name.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });

  const file = path.join(process.cwd(), "public", "uploads", name);
  try {
    const bytes = await fs.readFile(file);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
