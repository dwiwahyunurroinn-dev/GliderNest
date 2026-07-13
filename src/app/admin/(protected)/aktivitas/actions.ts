"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function clearActivityLog(): Promise<void> {
  await requireAdmin();
  await prisma.activityLog.deleteMany({});
  revalidatePath("/admin/aktivitas");
}
