"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { formatPrice, expenseCategories } from "@/lib/format";

export async function createExpense(formData: FormData): Promise<void> {
  await requireAdmin();

  const rawDate = String(formData.get("date") ?? "").trim();
  const parsed = rawDate ? new Date(`${rawDate}T12:00:00`) : new Date();
  const category = String(formData.get("category") ?? "lainnya");
  const description = String(formData.get("description") ?? "").trim();
  const amount = Math.max(0, Number(formData.get("amount") ?? 0));
  if (!description || amount <= 0) return;

  await prisma.expense.create({
    data: {
      date: isNaN(parsed.getTime()) ? new Date() : parsed,
      category: (expenseCategories as readonly string[]).includes(category)
        ? category
        : "lainnya",
      description,
      amount,
    },
  });
  await logActivity("Pengeluaran dicatat", `${description} — ${formatPrice(amount)}`);
  revalidatePath("/admin/pengeluaran");
  revalidatePath("/admin/laporan");
}

export async function deleteExpense(id: string): Promise<void> {
  await requireAdmin();
  const e = await prisma.expense.delete({ where: { id } });
  await logActivity("Pengeluaran dihapus", `${e.description} — ${formatPrice(e.amount)}`);
  revalidatePath("/admin/pengeluaran");
  revalidatePath("/admin/laporan");
}
