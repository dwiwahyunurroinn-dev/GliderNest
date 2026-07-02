"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const validStatuses = ["menunggu", "diproses", "dikirim", "selesai", "dibatalkan"];

export async function updateOrderStatus(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const status = String(formData.get("status") ?? "");
  if (!validStatuses.includes(status)) return;

  const order = await prisma.order.update({ where: { id }, data: { status } });

  // Sinkronkan status glider dengan status pesanannya.
  if (order.gliderId) {
    if (status === "dibatalkan") {
      await prisma.glider.update({
        where: { id: order.gliderId },
        data: { status: "tersedia" },
      });
    } else if (status === "selesai") {
      await prisma.glider.update({
        where: { id: order.gliderId },
        data: { status: "terjual" },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/sugar-glider");
  revalidatePath("/admin/pesanan");
}

export async function deleteOrder(id: string): Promise<void> {
  await requireAdmin();
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/pesanan");
}
