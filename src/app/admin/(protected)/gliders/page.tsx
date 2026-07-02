import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { StatusPill } from "@/components/StatusPill";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { btnPrimary } from "@/components/admin/ui";
import { deleteGlider } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGlidersPage() {
  const gliders = await prisma.glider.findMany({
    orderBy: { createdAt: "desc" },
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

      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Morph</th>
                <th className="px-5 py-3">Harga</th>
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
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
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
