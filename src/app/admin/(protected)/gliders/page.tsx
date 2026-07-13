import Link from "next/link";
import { Plus, Pencil, Minus, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { inputCls } from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { StatusPill } from "@/components/StatusPill";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { btnPrimary } from "@/components/admin/ui";
import { adjustStock, deleteGlider } from "./actions";

export const dynamic = "force-dynamic";

const statusFilters = [
  { value: "semua", label: "Semua" },
  { value: "tersedia", label: "Tersedia" },
  { value: "dipesan", label: "Dipesan" },
  { value: "terjual", label: "Terjual" },
];

export default async function AdminGlidersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "semua" } = await searchParams;
  const all = await prisma.glider.findMany({
    orderBy: { createdAt: "desc" },
  });

  const query = q.trim().toLowerCase();
  const gliders = all.filter((g) => {
    if (status !== "semua" && g.status !== status) return false;
    if (query && !`${g.name} ${g.morph}`.toLowerCase().includes(query))
      return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Sugar Glider
          </h1>
          <p className="mt-1 text-sm text-muted">
            Kelola katalog: tambah, ubah, atau hapus glider.
          </p>
        </div>
        <Link href="/admin/gliders/baru" className={btnPrimary}>
          <Plus className="h-4 w-4" />
          Tambah Glider
        </Link>
      </div>

      {/* Pencarian & filter */}
      <form action="/admin/gliders" className="mt-5 flex gap-2">
        <input type="hidden" name="status" value={status} />
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari nama atau morph…"
            className={`${inputCls} mt-0 pl-10`}
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Cari
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {statusFilters.map((f) => (
          <Link
            key={f.value}
            href={`/admin/gliders?status=${f.value}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              status === f.value
                ? "bg-brand text-white shadow-sm"
                : "border border-line bg-surface text-muted hover:border-brand hover:text-brand-strong"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Morph</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Stok</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Unggulan</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {gliders.map((g) => (
                <tr key={g.id} className="border-b border-line/60 last:border-0">
                  <td className="px-5 py-3.5 font-semibold">{g.name}</td>
                  <td className="px-5 py-3.5">{g.morph}</td>
                  <td className="px-5 py-3.5">{formatPrice(g.price)}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5">
                      <form action={adjustStock.bind(null, g.id, -1)}>
                        <button
                          type="submit"
                          aria-label={`Kurangi stok ${g.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand-strong"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </form>
                      <span className={`w-7 text-center font-bold ${g.stock === 0 ? "text-red-500" : ""}`}>
                        {g.stock}
                      </span>
                      <form action={adjustStock.bind(null, g.id, 1)}>
                        <button
                          type="submit"
                          aria-label={`Tambah stok ${g.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand-strong"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </form>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={g.status} />
                  </td>
                  <td className="px-5 py-3.5">{g.featured ? "⭐" : "—"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/gliders/${g.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <form action={deleteGlider.bind(null, g.id)}>
                        <DeleteButton label={g.name} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {gliders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted">
                    Belum ada glider. Klik “Tambah Glider” untuk memulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
