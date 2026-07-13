import Link from "next/link";
import { ReceiptText, Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import {
  expenseCategories,
  expenseCategoryLabel,
  formatDate,
  formatPrice,
  toDatetimeLocal,
} from "@/lib/format";
import { resolvePeriod, periodLabels, type PeriodKey } from "@/lib/reports";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { createExpense, deleteExpense } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminExpensesPage({
  searchParams,
}: {
  searchParams: Promise<{ periode?: string }>;
}) {
  const { periode } = await searchParams;
  const key: PeriodKey = (
    ["30", "90", "bulan", "tahun", "semua"] as PeriodKey[]
  ).includes(periode as PeriodKey)
    ? (periode as PeriodKey)
    : "bulan";
  const { start } = resolvePeriod(key);

  const expenses = await prisma.expense.findMany({
    where: start ? { date: { gte: start } } : {},
    orderBy: { date: "desc" },
  });
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const todayInput = toDatetimeLocal(new Date()).slice(0, 10);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Pengeluaran
      </h1>
      <p className="mt-1 text-sm text-muted">
        Catat semua biaya usaha — pakan, kandang, kurir, listrik — supaya
        Laporan bisa menghitung <strong>laba bersih</strong> sungguhan, bukan
        sekadar omzet.
      </p>

      {/* Form tambah */}
      <form
        action={createExpense}
        className="mt-6 space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor="date" className={labelCls}>Tanggal</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={todayInput}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="category" className={labelCls}>Kategori</label>
            <select id="category" name="category" className={inputCls}>
              {expenseCategories.map((c) => (
                <option key={c} value={c}>
                  {expenseCategoryLabel[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className={labelCls}>Keterangan</label>
            <input
              id="description"
              name="description"
              required
              placeholder="Beli jangkrik 1kg"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="amount" className={labelCls}>Jumlah (Rp)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min={1}
              required
              placeholder="50000"
              className={inputCls}
            />
          </div>
        </div>
        <button type="submit" className={btnPrimary}>
          <Plus className="h-4 w-4" />
          Catat Pengeluaran
        </button>
      </form>

      {/* Filter periode + total */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(periodLabels) as PeriodKey[]).map((k) => (
            <Link
              key={k}
              href={`/admin/pengeluaran?periode=${k}`}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                key === k
                  ? "bg-brand text-white shadow-sm"
                  : "border border-line bg-surface text-muted hover:border-brand hover:text-brand-strong"
              }`}
            >
              {periodLabels[k]}
            </Link>
          ))}
        </div>
        <p className="text-sm font-bold">
          Total: <span className="text-red-500">{formatPrice(total)}</span>
        </p>
      </div>

      {/* Daftar */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
        {expenses.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted">
            Belum ada pengeluaran tercatat pada periode ini.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3">Kategori</th>
                  <th className="px-5 py-3">Keterangan</th>
                  <th className="px-5 py-3 text-right">Jumlah</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id} className="border-b border-line/60 last:border-0">
                    <td className="px-5 py-3.5">{formatDate(e.date)}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-strong">
                        <ReceiptText className="h-3 w-3" />
                        {expenseCategoryLabel[e.category] ?? e.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">{e.description}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-red-500">
                      −{formatPrice(e.amount)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <form action={deleteExpense.bind(null, e.id)}>
                        <DeleteButton label={`pengeluaran "${e.description}"`} />
                      </form>
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
