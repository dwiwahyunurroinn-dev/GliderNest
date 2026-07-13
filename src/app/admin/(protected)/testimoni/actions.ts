"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

function revalidate() {
  revalidatePath("/");
  revalidatePath("/testimoni");
  revalidatePath("/admin/testimoni");
}

export async function createTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const rating = Math.min(5, Math.max(1, Number(formData.get("rating") ?? 5)));
  if (!name || !quote) return;

  await prisma.testimonial.create({
    data: { name, city, quote, rating, published: true },
  });
  await logActivity("Testimoni ditambahkan", `${name} (${city})`);
  revalidate();
}

export async function toggleTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) return;
  await prisma.testimonial.update({
    where: { id },
    data: { published: !t.published },
  });
  revalidate();
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const t = await prisma.testimonial.delete({ where: { id } });
  await logActivity("Testimoni dihapus", t.name);
  revalidate();
}
