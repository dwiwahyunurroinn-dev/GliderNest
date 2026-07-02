import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import {
  formatDate,
  formatPrice,
  orderStatusLabel,
  paymentMethodLabel,
} from "@/lib/format";
import { BrandMark } from "@/components/BrandMark";
import { InvoiceActions } from "@/components/InvoiceActions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false },
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const [order, settings] = await Promise.all([
    prisma.order.findUnique({ where: { code: code.toUpperCase() } }),
    getSettings(),
  ]);
  if (!order) notFound();

  const paid = ["diproses", "dikirim", "selesai"].includes(order.status);
  const phoneDisplay = settings.whatsapp.replace(/^62/, "0");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <div className="mb-6 space-y-4 print:hidden">
        <Link
          href={`/pesan/${order.code}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-strong"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke detail pesanan
        </Link>
        <InvoiceActions code={order.code} />
      </div>

      {/* Lembar invoice */}
      <div
        id="invoice-sheet"
        className="rounded-3xl border border-line bg-white p-6 text-[#1b2a41] shadow-sm sm:p-10 print:rounded-none print:border-0 print:p-6 print:shadow-none"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
              <BrandMark logoUrl={settings.logoUrl} className="h-9 w-9" />
            </span>
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-bold">
                {settings.siteName}
              </p>
              <p className="text-xs text-slate-500">
                {settings.address} · WA {phoneDisplay}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tracking-tight">INVOICE</p>
            <p className="font-mono text-sm font-semibold text-slate-600">
              INV-{order.code}
            </p>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                paid
                  ? "bg-emerald-100 text-emerald-700"
                  : order.status === "dibatalkan"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-700"
              }`}
            >
              {paid
                ? "LUNAS"
                : order.status === "dibatalkan"
                  ? "DIBATALKAN"
                  : "BELUM DIBAYAR"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Ditagihkan kepada
            </p>
            <p className="mt-1.5 font-bold">{order.customerName}</p>
            <p className="text-sm text-slate-600">{order.phone}</p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">
              {order.address}
            </p>
          </div>
          <div className="sm:text-right">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between gap-6 sm:justify-end">
                <dt className="text-slate-500">Tanggal pesanan</dt>
                <dd className="font-semibold">{formatDate(order.createdAt)}</dd>
              </div>
              <div className="flex justify-between gap-6 sm:justify-end">
                <dt className="text-slate-500">Metode pembayaran</dt>
                <dd className="font-semibold">
                  {paymentMethodLabel[order.paymentMethod]}
                </dd>
              </div>
              <div className="flex justify-between gap-6 sm:justify-end">
                <dt className="text-slate-500">Status pesanan</dt>
                <dd className="font-semibold">
                  {orderStatusLabel[order.status] ?? order.status}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-y border-slate-200 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="py-3">Deskripsi</th>
              <th className="py-3 text-center">Jumlah</th>
              <th className="py-3 text-right">Harga</th>
              <th className="py-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="py-4">
                <p className="font-semibold">Sugar Glider — {order.gliderName}</p>
                <p className="text-xs text-slate-500">
                  Termasuk kartu identitas & silsilah, paket pakan awal,
                  panduan perawatan, garansi kesehatan 7 hari.
                </p>
              </td>
              <td className="py-4 text-center">1 ekor</td>
              <td className="py-4 text-right">{formatPrice(order.amount)}</td>
              <td className="py-4 text-right font-semibold">
                {formatPrice(order.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} />
              <td className="py-4 text-right text-base font-bold">Total</td>
              <td className="py-4 text-right text-base font-bold">
                {formatPrice(order.amount)}
              </td>
            </tr>
          </tfoot>
        </table>
        </div>

        {order.note && (
          <p className="mt-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
            <strong>Catatan pembeli:</strong> {order.note}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-slate-200 pt-6">
          <p className="max-w-sm text-xs leading-relaxed text-slate-500">
            Pembayaran hanya ke akun resmi yang tercantum pada halaman
            instruksi pesanan. Simpan invoice ini sebagai bukti transaksi Anda
            dengan {settings.siteName}.
          </p>
          <div className="text-center text-sm">
            <p className="text-slate-500">Hormat kami,</p>
            <p className="mt-10 font-bold">{settings.siteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
