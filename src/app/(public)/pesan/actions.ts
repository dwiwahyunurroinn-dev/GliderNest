"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

function generateOrderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "GN-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createOrder(formData: FormData): Promise<void> {
  const gliderSlug = String(formData.get("glider") ?? "");

  // Honeypot: kolom tersembunyi yang hanya diisi bot spam.
  if (String(formData.get("website") ?? "").trim() !== "") {
    redirect(`/pesan?glider=${gliderSlug}&error=lengkapi`);
  }

  // Batasi 5 pesanan per 10 menit per alamat IP.
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "tanpa-ip";
  if (!rateLimit(`order:${ip}`, 5, 10 * 60 * 1000)) {
    redirect(`/pesan?glider=${gliderSlug}&error=batas`);
  }

  const customerName = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const paymentMethod = String(formData.get("paymentMethod") ?? "qris");

  if (!customerName || !phone || !address) {
    redirect(`/pesan?glider=${gliderSlug}&error=lengkapi`);
  }
  if (!["qris", "transfer", "dana", "cod", "rekber"].includes(paymentMethod)) {
    redirect(`/pesan?glider=${gliderSlug}&error=metode`);
  }

  const glider = await prisma.glider.findUnique({ where: { slug: gliderSlug } });
  if (!glider || glider.status !== "tersedia" || glider.stock < 1) {
    redirect(`/pesan?error=tidak-tersedia`);
  }

  const order = await prisma.order.create({
    data: {
      code: generateOrderCode(),
      customerName,
      phone,
      address,
      note,
      paymentMethod,
      amount: glider.price,
      gliderId: glider.id,
      gliderName: `${glider.name} (${glider.morph})`,
    },
  });

  // Kurangi stok; jika habis, tandai listing "dipesan".
  const newStock = glider.stock - 1;
  await prisma.glider.update({
    where: { id: glider.id },
    data: { stock: newStock, status: newStock === 0 ? "dipesan" : "tersedia" },
  });
  await prisma.stockLog.create({
    data: {
      gliderId: glider.id,
      change: -1,
      type: "keluar",
      note: `Pesanan ${order.code}`,
    },
  });

  // Notifikasi untuk admin.
  await prisma.notification.create({
    data: {
      title: "Pesanan baru masuk",
      message: `${order.code} — ${order.gliderName} oleh ${customerName}`,
      link: "/admin/pesanan",
    },
  });
  if (newStock === 0) {
    await prisma.notification.create({
      data: {
        title: "Stok habis",
        message: `Stok ${glider.name} (${glider.morph}) habis setelah pesanan ${order.code}.`,
        link: "/admin/gliders",
      },
    });
  }

  redirect(`/pesan/${order.code}`);
}
