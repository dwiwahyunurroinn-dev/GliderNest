"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function updateSettings(formData: FormData): Promise<void> {
  await requireAdmin();

  const [qrisUpload, logoUpload, mascotUpload] = await Promise.all([
    saveUpload(formData.get("qrisImage") as File | null),
    saveUpload(formData.get("logoImage") as File | null),
    saveUpload(formData.get("mascotImage") as File | null),
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
    ...(formData.get("resetLogo") === "on" ? { logoUrl: "" } : {}),
    ...(formData.get("resetMascot") === "on" ? { mascotUrl: "" } : {}),
  };

  await prisma.setting.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/", "layout");
  redirect("/admin/pengaturan?saved=1");
}
