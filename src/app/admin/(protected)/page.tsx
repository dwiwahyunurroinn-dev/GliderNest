import Link from "next/link";
import {
  PawPrint,
  PackageSearch,
  BookOpenText,
  Quote,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice, orderStatusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [gliderCount, availableCount, pendingOrders, articleCount, testimonialCount, latestOrders] =
    await Promise.all([
      prisma.glider.count(),
      prisma.glider.count({ where: { status: "tersedia" } }),
      prisma.order.count({ where: { status: "menunggu" } }),
      prisma.article.count(),
      prisma.testimonial.count(),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ]);

  const stats = [
    {
      icon: PawPrint,
      label: "Sugar Glider",
      value: gliderCount,
      hint: `${availableCount} tersedia`,
      href: "/admin/gliders",
    },
    {
      icon: PackageSearch,
      label: "Pesanan Menunggu",
      value: pendingOrders,
      hint: "perlu ditindaklanjuti",
      href: "/admin/pesanan",
    },
    {
      icon: BookOpenText,
      label: "Artikel Blog",
      value: articleCount,
      hint: "konten edukasi",
      href: "/admin/artikel",
    },
    {
      icon: Quote,
      label: "Testimoni",
      value: testimonialCount,
      hint: "ulasan adopter",
      href: "/admin/testimoni",
    },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ringkasan kondisi website dan pesanan terbaru.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-3xl border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-3xl font-bold">{s.value}</p>
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-xs text-muted">{s.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-line bg-surface shadow-sm">
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
