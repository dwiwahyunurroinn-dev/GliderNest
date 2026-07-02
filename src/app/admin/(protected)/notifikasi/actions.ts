"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function markAllRead(): Promise<void> {
  await requireAdmin();
  await prisma.notification.updateMany({
    where: { read: false },
    data: { read: true },
  });
  revalidatePath("/admin", "layout");
}

export async function deleteAllNotifications(): Promise<void> {
  await requireAdmin();
  await prisma.notification.deleteMany({});
  revalidatePath("/admin", "layout");
}
