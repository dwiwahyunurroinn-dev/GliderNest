import Link from "next/link";
import {
  PawPrint,
  PackageSearch,
  Wallet,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice, orderStatusLabel } from "@/lib/format";
import { getMonthlyRevenue } from "@/lib/reports";
import { BarChart } from "@/components/admin/BarChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    revenueAll,
    soldAll,
    pendingOrders,
    stockAvailable,
    latestOrders,
    lowStock,
    monthly,
  ] = await Promise.all([
    prisma.order.aggregate({ where: { status: "selesai" }, _sum: { amount: true } }),
    prisma.order.count({ where: { status: "selesai" } }),
    prisma.order.count({ where: { status: "menunggu" } }),
    prisma.glider.aggregate({ where: { status: "tersedia" }, _sum: { stock: true } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.glider.findMany({
      where: { stock: 0, status: { not: "terjual" } },
      take: 4,
    }),
    getMonthlyRevenue(6),
  ]);

  const stats = [
    {
      icon: Wallet,
      label: "Total Pendapatan",
      value: formatPrice(revenueAll._sum.amount ?? 0),
      hint: "dari pesanan selesai",
      tint: "bg-emerald-500/15 text-emerald-600",
    },
    {
      icon: TrendingUp,
      label: "Glider Terjual",
      value: String(soldAll),
      hint: "pesanan selesai",
      tint: "bg-brand-soft text-brand-strong",
    },
    {
      icon: PackageSearch,
      label: "Pesanan Menunggu",
      value: String(pendingOrders),
      hint: "perlu ditindaklanjuti",
      tint: "bg-amber-500/15 text-amber-600",
    },
    {
      icon: PawPrint,
      label: "Stok Tersedia",
      value: `${stockAvailable._sum.stock ?? 0} ekor`,
      hint: "siap diadopsi",
      tint: "bg-sky-500/15 text-sky-600",
    },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ringkasan bisnis Anda hari ini.
      </p>

      {/* Kartu statistik gaya Materio */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.tint}`}>
                <s.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold leading-tight">{s.value}</p>
            <p className="mt-0.5 text-sm font-semibold">{s.label}</p>
            <p className="text-xs text-muted">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Grafik pendapatan */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Pendapatan 6 Bulan Terakhir</h2>
              <p className="text-xs text-muted">Dari pesanan berstatus selesai</p>
            </div>
            <Link
              href="/admin/laporan"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-strong"
            >
              Laporan lengkap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5">
            <BarChart
              data={monthly}
              formatValue={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : v > 0 ? `${Math.round(v / 1000)}rb` : "0"
              }
            />
          </div>
        </div>

        {/* Peringatan stok */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
            Stok Habis
          </h2>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              Semua listing aktif masih punya stok. 👍
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {lowStock.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/admin/gliders/${g.id}`}
                    className="flex items-center justify-between gap-2 rounded-xl bg-background px-4 py-3 text-sm transition-colors hover:bg-brand-soft"
                  >
                    <span className="font-semibold">{g.name}</span>
                    <span className="text-xs text-muted">{g.morph}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/admin/gliders"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-strong"
          >
            Kelola stok <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Pesanan terbaru */}
      <div className="mt-6 rounded-2xl border border-line bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-semibold">Pesanan terbaru</h2>
          <Link
            href="/admin/pesanan"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-strong"
          >
            Kelola semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {latestOrders.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted">
            Belum ada pesanan masuk.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">Kode</th>
                  <th className="px-6 py-3">Pembeli</th>
                  <th className="px-6 py-3">Glider</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((o) => (
                  <tr key={o.id} className="border-b border-line/60 last:border-0">
                    <td className="px-6 py-3.5 font-mono font-semibold">{o.code}</td>
                    <td className="px-6 py-3.5">{o.customerName}</td>
                    <td className="px-6 py-3.5">{o.gliderName}</td>
                    <td className="px-6 py-3.5">{formatPrice(o.amount)}</td>
                    <td className="px-6 py-3.5">
                      <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-strong">
                        {orderStatusLabel[o.status] ?? o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
