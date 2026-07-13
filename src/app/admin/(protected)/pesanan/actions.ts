"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

const validStatuses = ["menunggu", "diproses", "dikirim", "selesai", "dibatalkan"];

export async function updateOrderStatus(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const status = String(formData.get("status") ?? "");
  if (!validStatuses.includes(status)) return;

  const before = await prisma.order.findUnique({ where: { id } });
  if (!before || before.status === status) return;

  const order = await prisma.order.update({ where: { id }, data: { status } });

  if (order.gliderId) {
    const glider = await prisma.glider.findUnique({ where: { id: order.gliderId } });
    if (glider) {
      // Pembatalan: kembalikan stok (+1) dan buka lagi listing-nya.
      if (status === "dibatalkan" && before.status !== "dibatalkan") {
        await prisma.glider.update({
          where: { id: glider.id },
          data: { stock: glider.stock + 1, status: "tersedia" },
        });
        await prisma.stockLog.create({
          data: {
            gliderId: glider.id,
            change: 1,
            type: "masuk",
            note: `Pembatalan pesanan ${order.code}`,
          },
        });
      }
      // Diaktifkan lagi dari status batal: kurangi stok kembali.
      else if (before.status === "dibatalkan" && status !== "dibatalkan") {
        const newStock = Math.max(0, glider.stock - 1);
        await prisma.glider.update({
          where: { id: glider.id },
          data: {
            stock: newStock,
            status: newStock === 0 ? "dipesan" : glider.status,
          },
        });
        await prisma.stockLog.create({
          data: {
            gliderId: glider.id,
            change: -1,
            type: "keluar",
            note: `Pesanan ${order.code} diaktifkan kembali`,
          },
        });
      }
      // Selesai: jika stok listing sudah habis, tandai terjual.
      if (status === "selesai") {
        const fresh = await prisma.glider.findUnique({ where: { id: glider.id } });
        if (fresh && fresh.stock === 0) {
          await prisma.glider.update({
            where: { id: glider.id },
            data: { status: "terjual" },
          });
        }
      }
    }
  }

  await logActivity("Status pesanan diubah", `${order.code}: ${before.status} → ${status}`);
  revalidatePath("/");
  revalidatePath("/sugar-glider");
  revalidatePath("/admin/pesanan");
}

export async function deleteOrder(id: string): Promise<void> {
  await requireAdmin();
  const o = await prisma.order.delete({ where: { id } });
  await logActivity("Pesanan dihapus", `${o.code} — ${o.customerName}`);
  revalidatePath("/admin/pesanan");
}
