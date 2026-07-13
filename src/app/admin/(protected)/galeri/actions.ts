"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { saveUpload } from "@/lib/upload";

function revalidate() {
  revalidatePath("/");
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
}

export async function createGalleryItem(formData: FormData): Promise<void> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const imageUrl = await saveUpload(formData.get("image") as File | null);
  if (!title || !imageUrl) return;

  await prisma.galleryItem.create({ data: { title, imageUrl } });
  await logActivity("Foto galeri ditambahkan", title);
  revalidate();
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await requireAdmin();
  const g = await prisma.galleryItem.delete({ where: { id } });
  await logActivity("Foto galeri dihapus", g.title);
  revalidate();
}
