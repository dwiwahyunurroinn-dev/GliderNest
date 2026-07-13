import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  PackagePlus,
  Inbox,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  getMonthlyRevenue,
  getPeriodReport,
  growthPercent,
  periodLabels,
  type PeriodKey,
} from "@/lib/reports";
import { BarChart } from "@/components/admin/BarChart";

export const dynamic = "force-dynamic";

function Growth({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-xs font-medium text-muted">— tidak ada pembanding</span>;
  }
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold ${
        up ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
      {up ? "+" : ""}
      {value}% vs periode sebelumnya
    </span>
  );
}

export default async function AdminReportPage({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const { periode } = await searchParams;
  const key: PeriodKey = (
    ["30", "90", "bulan", "tahun", "semua"] as PeriodKey[]
  ).includes(periode as PeriodKey)
    ? (periode as PeriodKey)
    : "30";

  const [{ current, previous }, monthly] = await Promise.all([
    getPeriodReport(key),
    getMonthlyRevenue(6),
  ]);

  const cards = [
    {
      icon: Wallet,
      label: "Uang Masuk",
      value: formatPrice(current.revenue),
      growth: previous ? growthPercent(current.revenue, previous.revenue) : null,
      tint: "bg-emerald-500/15 text-emerald-600",
    },
    {
      icon: TrendingUp,
      label: "Sugar Glider Terjual",
      value: `${current.soldCount} ekor`,
      growth: previous ? growthPercent(current.soldCount, previous.soldCount) : null,
      tint: "bg-brand-soft text-brand-strong",
    },
    {
      icon: Inbox,
      label: "Pesanan Masuk",
      value: String(current.newOrders),
      growth: previous ? growthPercent(current.newOrders, previous.newOrders) : null,
      tint: "bg-amber-500/15 text-amber-600",
    },
    {
      icon: PackagePlus,
      label: "Stok Masuk",
      value: `${current.stockIn} ekor`,
      growth: previous ? growthPercent(current.stockIn, previous.stockIn) : null,
      tint: "bg-sky-500/15 text-sky-600",
    },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Laporan Pertumbuhan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Penjualan, uang masuk, dan pergerakan stok per periode — lengkap dengan
        perbandingan terhadap periode sebelumnya.
      </p>

      {/* Pemilih periode */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(periodLabels) as PeriodKey[]).map((k) => (
          <Link
            key={k}
            href={`/admin/laporan?periode=${k}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              key === k
                ? "bg-brand text-white shadow-md shadow-brand/25"
                : "border border-line bg-surface text-muted hover:border-brand hover:text-brand-strong"
            }`}
          >
            {periodLabels[k]}
          </Link>
        ))}
      </div>

      {/* Kartu metrik */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.tint}`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-bold leading-tight">{c.value}</p>
            <p className="mt-0.5 text-sm font-semibold">{c.label}</p>
            <p className="mt-1.5">
              <Growth value={c.growth} />
            </p>
          </div>
        ))}
      </div>

      {/* Grafik bulanan */}
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="font-semibold">Tren Pendapatan 6 Bulan Terakhir</h2>
        <p className="text-xs text-muted">
          Pendapatan dihitung saat pesanan berstatus selesai.
        </p>
        <div className="mt-5">
          <BarChart
            data={monthly}
            formatValue={(v) =>
              v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : v > 0 ? `${Math.round(v / 1000)}rb` : "0"
            }
          />
        </div>
      </div>

      {/* Ekspor untuk pembukuan */}
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="font-semibold">Ekspor untuk Pembukuan</h2>
        <p className="mt-1 text-xs text-muted">
          File CSV mengikuti periode terpilih ({periodLabels[key]}) — terbuka
          langsung di Excel atau Google Sheets.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`/api/admin/export?jenis=pesanan&periode=${key}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Ekspor Pesanan (CSV)
          </a>
          <a
            href={`/api/admin/export?jenis=stok&periode=${key}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Ekspor Log Stok (CSV)
          </a>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        Catatan: “Uang masuk” hanya menghitung pesanan berstatus{" "}
        <strong>Selesai</strong>. “Stok masuk” dihitung dari penambahan stok
        (stok awal listing, penambahan manual, penyesuaian, dan pembatalan
        pesanan).
      </p>
    </div>
  );
}
