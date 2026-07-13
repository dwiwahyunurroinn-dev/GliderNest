import { prisma } from "./db";

export type PeriodKey = "30" | "90" | "bulan" | "tahun" | "semua";

export const periodLabels: Record<PeriodKey, string> = {
  "30": "30 hari terakhir",
  "90": "90 hari terakhir",
  bulan: "Bulan ini",
  tahun: "Tahun ini",
  semua: "Sepanjang waktu",
};

export function resolvePeriod(key: PeriodKey): {
  start: Date | null;
  prevStart: Date | null;
} {
  const now = new Date();
  switch (key) {
    case "30": {
      const start = new Date(now.getTime() - 30 * 86400000);
      return { start, prevStart: new Date(now.getTime() - 60 * 86400000) };
    }
    case "90": {
      const start = new Date(now.getTime() - 90 * 86400000);
      return { start, prevStart: new Date(now.getTime() - 180 * 86400000) };
    }
    case "bulan": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        start,
        prevStart: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      };
    }
    case "tahun": {
      const start = new Date(now.getFullYear(), 0, 1);
      return { start, prevStart: new Date(now.getFullYear() - 1, 0, 1) };
    }
    default:
      return { start: null, prevStart: null };
  }
}

export interface PeriodStats {
  soldCount: number;
  revenue: number;
  newOrders: number;
  stockIn: number;
  expenses: number;
  profit: number;
}

async function statsBetween(start: Date | null, end: Date | null): Promise<PeriodStats> {
  const range = (field: "createdAt" | "updatedAt") =>
    start || end
      ? { [field]: { ...(start ? { gte: start } : {}), ...(end ? { lt: end } : {}) } }
      : {};

  const dateRange =
    start || end
      ? { date: { ...(start ? { gte: start } : {}), ...(end ? { lt: end } : {}) } }
      : {};

  const [sold, newOrders, stockIn, spent] = await Promise.all([
    prisma.order.aggregate({
      where: { status: "selesai", ...range("updatedAt") },
      _count: true,
      _sum: { amount: true },
    }),
    prisma.order.count({ where: { ...range("createdAt") } }),
    prisma.stockLog.aggregate({
      where: { type: "masuk", ...range("createdAt") },
      _sum: { change: true },
    }),
    prisma.expense.aggregate({
      where: dateRange,
      _sum: { amount: true },
    }),
  ]);

  const revenue = sold._sum.amount ?? 0;
  const expenses = spent._sum.amount ?? 0;
  return {
    soldCount: sold._count,
    revenue,
    newOrders,
    stockIn: stockIn._sum.change ?? 0,
    expenses,
    profit: revenue - expenses,
  };
}

/** Rincian pengeluaran per kategori dalam satu periode. */
export async function getExpenseBreakdown(
  key: PeriodKey
): Promise<{ category: string; total: number }[]> {
  const { start } = resolvePeriod(key);
  const grouped = await prisma.expense.groupBy({
    by: ["category"],
    where: start ? { date: { gte: start } } : {},
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  });
  return grouped.map((g) => ({
    category: g.category,
    total: g._sum.amount ?? 0,
  }));
}

/** Statistik periode terpilih + pembanding periode sebelumnya (untuk % pertumbuhan). */
export async function getPeriodReport(key: PeriodKey): Promise<{
  current: PeriodStats;
  previous: PeriodStats | null;
}> {
  const { start, prevStart } = resolvePeriod(key);
  const current = await statsBetween(start, null);
  const previous =
    start && prevStart ? await statsBetween(prevStart, start) : null;
  return { current, previous };
}

/** Pendapatan (pesanan selesai) per bulan untuk n bulan terakhir. */
export async function getMonthlyRevenue(months = 6): Promise<
  { label: string; value: number }[]
> {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  const orders = await prisma.order.findMany({
    where: { status: "selesai", updatedAt: { gte: from } },
    select: { amount: true, updatedAt: true },
  });

  const buckets: { label: string; value: number; y: number; m: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      label: d.toLocaleDateString("id-ID", { month: "short" }),
      value: 0,
      y: d.getFullYear(),
      m: d.getMonth(),
    });
  }
  for (const o of orders) {
    const b = buckets.find(
      (x) => x.y === o.updatedAt.getFullYear() && x.m === o.updatedAt.getMonth()
    );
    if (b) b.value += o.amount;
  }
  return buckets.map(({ label, value }) => ({ label, value }));
}

export function growthPercent(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 100);
}
