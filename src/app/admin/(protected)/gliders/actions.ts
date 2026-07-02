"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
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
    description: String(formData.get("description") ?? "").trim(),
    lineage: String(formData.get("lineage") ?? "").trim(),
    traits: String(formData.get("traits") ?? "").trim(),
    featured: formData.get("featured") === "on",
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

  await prisma.glider.create({ data: { ...data, slug, imageUrl } });
  revalidate();
  redirect("/admin/gliders");
}

export async function updateGlider(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseGliderForm(formData);
  const imageUrl = await saveUpload(formData.get("image") as File | null);

  await prisma.glider.update({
    where: { id },
    data: imageUrl ? { ...data, imageUrl } : data,
  });
  revalidate();
  redirect("/admin/gliders");
}

export async function deleteGlider(id: string): Promise<void> {
  await requireAdmin();
  await prisma.glider.delete({ where: { id } });
  revalidate();
}
