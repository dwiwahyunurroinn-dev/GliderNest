"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

function revalidate() {
  revalidatePath("/");
  revalidatePath("/tentang-kami");
  revalidatePath("/reseller");
  revalidatePath("/admin/background");
}

export async function createBackground(formData: FormData): Promise<void> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const imageUrl = await saveUpload(formData.get("image") as File | null);
  if (!title || !imageUrl) return;

  const setActive = formData.get("active") === "on";
  if (setActive) {
    await prisma.background.updateMany({ data: { active: false } });
  }
  await prisma.background.create({
    data: { title, imageUrl, active: setActive },
  });
  revalidate();
}

export async function setActiveBackground(id: string): Promise<void> {
  await requireAdmin();
  await prisma.$transaction([
    prisma.background.updateMany({ data: { active: false } }),
    prisma.background.update({ where: { id }, data: { active: true } }),
  ]);
  revalidate();
}

export async function deleteBackground(id: string): Promise<void> {
  await requireAdmin();
  const deleted = await prisma.background.delete({ where: { id } });
  // Jika yang dihapus sedang aktif, aktifkan background terbaru yang tersisa.
  if (deleted.active) {
    const next = await prisma.background.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (next) {
      await prisma.background.update({
        where: { id: next.id },
        data: { active: true },
      });
    }
  }
  revalidate();
}
