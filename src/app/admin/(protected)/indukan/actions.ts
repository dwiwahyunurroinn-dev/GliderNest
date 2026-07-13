"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { saveUpload } from "@/lib/upload";

function parseParentForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    morph: String(formData.get("morph") ?? "").trim(),
    sex: String(formData.get("sex") ?? "jantan"),
    birthYear: Number(formData.get("birthYear") ?? 0) || 0,
    notes: String(formData.get("notes") ?? "").trim(),
  };
}

function revalidate() {
  revalidatePath("/admin/indukan");
  revalidatePath("/sugar-glider");
}

export async function createParent(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseParentForm(formData);
  const imageUrl = await saveUpload(formData.get("image") as File | null);
  await prisma.parent.create({ data: { ...data, imageUrl } });
  await logActivity("Indukan ditambahkan", `${data.name} (${data.morph}, ${data.sex})`);
  revalidate();
  redirect("/admin/indukan");
}

export async function updateParent(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseParentForm(formData);
  const imageUrl = await saveUpload(formData.get("image") as File | null);
  await prisma.parent.update({
    where: { id },
    data: imageUrl ? { ...data, imageUrl } : data,
  });
  await logActivity("Indukan diubah", data.name);
  revalidate();
  redirect("/admin/indukan");
}

export async function deleteParent(id: string): Promise<void> {
  await requireAdmin();
  const p = await prisma.parent.delete({ where: { id } });
  await logActivity("Indukan dihapus", p.name);
  revalidate();
}
