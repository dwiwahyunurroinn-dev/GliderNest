"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";
import { slugify } from "@/lib/format";

function parseArticleForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    published: formData.get("published") === "on",
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/artikel");
}

export async function createArticle(formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseArticleForm(formData);
  const coverUrl = await saveUpload(formData.get("cover") as File | null);
  const base = slugify(data.title) || `artikel-${Date.now()}`;
  const taken = await prisma.article.findUnique({ where: { slug: base } });
  const slug = taken ? `${base}-${Date.now().toString(36)}` : base;

  await prisma.article.create({ data: { ...data, slug, coverUrl } });
  revalidate();
  redirect("/admin/artikel");
}

export async function updateArticle(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const data = parseArticleForm(formData);
  const coverUrl = await saveUpload(formData.get("cover") as File | null);

  await prisma.article.update({
    where: { id },
    data: coverUrl ? { ...data, coverUrl } : data,
  });
  revalidate();
  redirect("/admin/artikel");
}

export async function deleteArticle(id: string): Promise<void> {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidate();
}
