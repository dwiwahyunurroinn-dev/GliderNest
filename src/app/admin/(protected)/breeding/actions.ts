"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

function revalidate() {
  revalidatePath("/admin/breeding");
  revalidatePath("/admin/hari-ini");
}

export async function createBreeding(formData: FormData): Promise<void> {
  await requireAdmin();
  const sireId = String(formData.get("sireId") ?? "");
  const damId = String(formData.get("damId") ?? "");
  const rawDate = String(formData.get("pairedAt") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  if (!sireId || !damId) return;

  const pairedAt = rawDate ? new Date(`${rawDate}T12:00:00`) : new Date();
  const pair = await prisma.breeding.create({
    data: {
      sireId,
      damId,
      pairedAt: isNaN(pairedAt.getTime()) ? new Date() : pairedAt,
      note,
    },
    include: { sire: true, dam: true },
  });
  await logActivity(
    "Pasangan breeding dicatat",
    `${pair.sire.name} × ${pair.dam.name}`
  );
  revalidate();
}

export async function markBorn(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const joeyCount = Math.max(0, Number(formData.get("joeyCount") ?? 1));
  const pair = await prisma.breeding.update({
    where: { id },
    data: { status: "lahir", joeyCount, bornAt: new Date() },
    include: { sire: true, dam: true },
  });
  await logActivity(
    "Joey lahir 🎉",
    `${pair.sire.name} × ${pair.dam.name} — ${joeyCount} joey`
  );
  await prisma.notification.create({
    data: {
      title: "Joey lahir 🎉",
      message: `Pasangan ${pair.sire.name} × ${pair.dam.name}: ${joeyCount} joey. Perkiraan siap listing ±2,5 bulan lagi.`,
      link: "/admin/breeding",
    },
  });
  revalidate();
}

export async function markFailed(id: string): Promise<void> {
  await requireAdmin();
  const pair = await prisma.breeding.update({
    where: { id },
    data: { status: "gagal" },
    include: { sire: true, dam: true },
  });
  await logActivity(
    "Breeding ditandai gagal",
    `${pair.sire.name} × ${pair.dam.name}`
  );
  revalidate();
}

export async function deleteBreeding(id: string): Promise<void> {
  await requireAdmin();
  const pair = await prisma.breeding.delete({
    where: { id },
    include: { sire: true, dam: true },
  });
  await logActivity(
    "Catatan breeding dihapus",
    `${pair.sire.name} × ${pair.dam.name}`
  );
  revalidate();
}
