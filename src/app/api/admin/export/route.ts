import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { orderStatusLabel, paymentMethodLabel } from "@/lib/format";
import { resolvePeriod, type PeriodKey } from "@/lib/reports";

/**
 * Ekspor data ke CSV (dibuka mulus di Excel/Google Sheets).
 * /api/admin/export?jenis=pesanan|stok&periode=30|90|bulan|tahun|semua
 */
export async function GET(request: Request) {
  if (!(await getSession())) {
    return new Response("Tidak diizinkan — silakan login admin.", { status: 401 });
  }

  const url = new URL(request.url);
  const jenis = url.searchParams.get("jenis") ?? "pesanan";
  const periodeRaw = url.searchParams.get("periode") ?? "semua";
  const periode: PeriodKey = (
    ["30", "90", "bulan", "tahun", "semua"] as PeriodKey[]
  ).includes(periodeRaw as PeriodKey)
    ? (periodeRaw as PeriodKey)
    : "semua";
  const { start } = resolvePeriod(periode);

  // titik koma = pemisah kolom yang dikenali Excel berbahasa Indonesia
  const sep = ";";
  const esc = (v: string | number) =>
    `"${String(v).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  const tgl = (d: Date) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);

  let rows: string[];
  let filename: string;

  if (jenis === "stok") {
    const logs = await prisma.stockLog.findMany({
      where: start ? { createdAt: { gte: start } } : {},
      orderBy: { createdAt: "desc" },
      include: { glider: { select: { name: true, morph: true } } },
    });
    rows = [
      ["Tanggal", "Glider", "Morph", "Jenis", "Perubahan", "Keterangan"]
        .map(esc)
        .join(sep),
      ...logs.map((l) =>
        [
          tgl(l.createdAt),
          l.glider?.name ?? "-",
          l.glider?.morph ?? "-",
          l.type,
          l.change,
          l.note,
        ]
          .map(esc)
          .join(sep)
      ),
    ];
    filename = `stok-${periode}`;
  } else {
    const orders = await prisma.order.findMany({
      where: start ? { createdAt: { gte: start } } : {},
      orderBy: { createdAt: "desc" },
    });
    rows = [
      [
        "Kode",
        "Tanggal",
        "Pembeli",
        "No HP",
        "Alamat",
        "Glider",
        "Metode Pembayaran",
        "Status",
        "Jumlah (Rp)",
      ]
        .map(esc)
        .join(sep),
      ...orders.map((o) =>
        [
          o.code,
          tgl(o.createdAt),
          o.customerName,
          o.phone,
          o.address,
          o.gliderName,
          paymentMethodLabel[o.paymentMethod] ?? o.paymentMethod,
          orderStatusLabel[o.status] ?? o.status,
          o.amount,
        ]
          .map(esc)
          .join(sep)
      ),
    ];
    filename = `pesanan-${periode}`;
  }

  // BOM agar Excel membaca huruf Indonesia (é, dsb.) dengan benar
  const csv = "﻿" + rows.join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="glidernest-${filename}-${stamp}.csv"`,
    },
  });
}
