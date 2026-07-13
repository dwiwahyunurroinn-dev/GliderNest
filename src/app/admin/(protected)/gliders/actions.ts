"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { saveUpload } from "@/lib/upload";
import { slugify } from "@/lib/format";

function parseGliderForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    morph: String(formData.get("morph") ?? "").trim(),
    sex: String(formData.get("sex") ?? "jantan"),
    ageMonths: Number(formData.get("ageMonths") ?? 0),
    price: Number(formData.get("price") ?? 0),
    status: String(formData.get("status") ?? "tersedia"),
    stock: Math.max(0, Number(formData.get("stock") ?? 1)),
    description: String(formData.get("description") ?? "").trim(),
    lineage: String(formData.get("lineage") ?? "").trim(),
    traits: String(formData.get("traits") ?? "").trim(),
    featured: formData.get("featured") === "on",
    sireId: String(formData.get("sireId") ?? "") || null,
    damId: String(formData.get("damId") ?? "") || null,
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/sugar-glider");
  revalidatePath("/admin/gliders");
}

export async function createGlider(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseGliderForm(formData);
  const imageUrl = await saveUpload(formData.get("image") as File | null);
  const base = slugify(`${data.name}-${data.morph}`) || `glider-${Date.now()}`;
  const taken = await prisma.glider.findUnique({ where: { slug: base } });
  const slug = taken ? `${base}-${Date.now().toString(36)}` : base;

  const created = await prisma.glider.create({ data: { ...data, slug, imageUrl } });
  if (created.stock > 0) {
    await prisma.stockLog.create({
      data: {
        gliderId: created.id,
        change: created.stock,
        type: "masuk",
        note: "Stok awal listing",
      },
    });
  }
  await logActivity("Glider ditambahkan", `${data.name} (${data.morph}) — stok ${data.stock}`);
  revalidate();
  redirect("/admin/gliders");
}

export async function updateGlider(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseGliderForm(formData);
  const imageUrl = await saveUpload(formData.get("image") as File | null);

  const before = await prisma.glider.findUnique({ where: { id } });
  await prisma.glider.update({
    where: { id },
    data: imageUrl ? { ...data, imageUrl } : data,
  });
  // Catat selisih stok agar laporan "stok masuk" tetap akurat.
  if (before && before.stock !== data.stock) {
    const diff = data.stock - before.stock;
    await prisma.stockLog.create({
      data: {
        gliderId: id,
        change: diff,
        type: diff > 0 ? "masuk" : "keluar",
        note: "Penyesuaian stok dari form edit",
      },
    });
  }
  await logActivity("Glider diubah", `${data.name} (${data.morph})`);
  revalidate();
  redirect("/admin/gliders");
}

/** Tambah/kurangi stok cepat dari tabel daftar glider. */
export async function adjustStock(id: string, delta: number): Promise<void> {
  await requireAdmin();
  const glider = await prisma.glider.findUnique({ where: { id } });
  if (!glider) return;
  const newStock = Math.max(0, glider.stock + delta);
  if (newStock === glider.stock) return;

  await prisma.glider.update({
    where: { id },
    data: {
      stock: newStock,
      // stok kembali tersedia -> buka listing; stok habis -> tandai terjual
      status: newStock > 0 ? "tersedia" : glider.status === "tersedia" ? "terjual" : glider.status,
    },
  });
  await prisma.stockLog.create({
    data: {
      gliderId: id,
      change: newStock - glider.stock,
      type: delta > 0 ? "masuk" : "keluar",
      note: delta > 0 ? "Penambahan stok manual" : "Pengurangan stok manual",
    },
  });
  await logActivity("Stok disesuaikan", `${glider.name}: ${glider.stock} → ${newStock}`);
  revalidate();
}

export async function deleteGlider(id: string): Promise<void> {
  await requireAdmin();
  const g = await prisma.glider.delete({ where: { id } });
  await logActivity("Glider dihapus", `${g.name} (${g.morph})`);
  revalidate();
}
