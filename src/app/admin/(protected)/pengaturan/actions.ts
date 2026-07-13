"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { checkPassword, hashPassword, requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { saveUpload } from "@/lib/upload";

export async function updateSettings(formData: FormData): Promise<void> {
  await requireAdmin();

  const [qrisUpload, logoUpload, mascotUpload, faviconUpload] =
    await Promise.all([
      saveUpload(formData.get("qrisImage") as File | null),
      saveUpload(formData.get("logoImage") as File | null),
      saveUpload(formData.get("mascotImage") as File | null),
      saveUpload(formData.get("faviconImage") as File | null),
    ]);

  const data = {
    siteName: String(formData.get("siteName") ?? "").trim() || "GliderNest",
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").replace(/\D/g, ""),
    email: String(formData.get("email") ?? "").trim(),
    instagram: String(formData.get("instagram") ?? "").trim().replace(/^@/, ""),
    address: String(formData.get("address") ?? "").trim(),
    openHours: String(formData.get("openHours") ?? "").trim(),
    mapsEmbedUrl: String(formData.get("mapsEmbedUrl") ?? "").trim(),
    bankAccounts: String(formData.get("bankAccounts") ?? "").trim(),
    danaNumber: String(formData.get("danaNumber") ?? "").trim(),
    danaName: String(formData.get("danaName") ?? "").trim(),
    codArea: String(formData.get("codArea") ?? "").trim(),
    rekberInfo: String(formData.get("rekberInfo") ?? "").trim(),
    foundedYear: Number(formData.get("foundedYear") ?? 2019) || 2019,
    ...(qrisUpload ? { qrisImageUrl: qrisUpload } : {}),
    ...(logoUpload ? { logoUrl: logoUpload } : {}),
    ...(mascotUpload ? { mascotUrl: mascotUpload } : {}),
    ...(faviconUpload ? { faviconUrl: faviconUpload } : {}),
    ...(formData.get("resetLogo") === "on" ? { logoUrl: "" } : {}),
    ...(formData.get("resetMascot") === "on" ? { mascotUrl: "" } : {}),
    ...(formData.get("resetFavicon") === "on" ? { faviconUrl: "" } : {}),
  };

  await prisma.setting.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  await logActivity("Pengaturan website disimpan");
  revalidatePath("/", "layout");
  redirect("/admin/pengaturan?saved=1");
}

/** Ganti password admin dari panel — tersimpan sebagai hash di database. */
export async function changeAdminPassword(formData: FormData): Promise<void> {
  await requireAdmin();

  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!(await checkPassword(current))) {
    redirect("/admin/pengaturan?pw=salah#keamanan");
  }
  if (next.length < 8) {
    redirect("/admin/pengaturan?pw=pendek#keamanan");
  }
  if (next !== confirm) {
    redirect("/admin/pengaturan?pw=beda#keamanan");
  }

  await prisma.setting.upsert({
    where: { id: 1 },
    update: { adminPasswordHash: hashPassword(next) },
    create: { id: 1, adminPasswordHash: hashPassword(next) },
  });

  await logActivity("Password admin diganti");
  revalidatePath("/admin", "layout");
  redirect("/admin/pengaturan?pw=ok#keamanan");
}
