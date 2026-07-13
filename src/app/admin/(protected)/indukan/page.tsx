import Link from "next/link";
import { Plus, Pencil, Dna } from "lucide-react";
import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { btnPrimary } from "@/components/admin/ui";
import { deleteParent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminParentsPage() {
  const parents = await prisma.parent.findMany({
    orderBy: [{ sex: "asc" }, { name: "asc" }],
    include: { _count: { select: { sired: true, mothered: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Indukan & Silsilah
          </h1>
          <p className="mt-1 text-sm text-muted">
            Daftarkan indukan penangkaran Anda, lalu hubungkan tiap joey ke
            pasangan indukannya lewat form glider — silsilahnya otomatis tampil
            di halaman detail publik.
          </p>
        </div>
        <Link href="/admin/indukan/baru" className={btnPrimary}>
          <Plus className="h-4 w-4" />
          Tambah Indukan
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {parents.map((p) => {
          const anak = p._count.sired + p._count.mothered;
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-sm"
            >
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-16 w-16 shrink-0 rounded-2xl border border-line object-cover"
                />
              ) : (
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Dna className="h-7 w-7" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold">
                  {p.name}{" "}
                  <span className="text-sm font-normal text-muted">
                    ({p.sex === "jantan" ? "♂ Sire" : "♀ Dam"})
                  </span>
                </p>
                <p className="text-sm text-muted">
                  {p.morph}
                  {p.birthYear ? ` · lahir ${p.birthYear}` : ""}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-brand-strong">
                  {anak} anak tercatat
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Link
                  href={`/admin/indukan/${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <form action={deleteParent.bind(null, p.id)}>
                  <DeleteButton label={`indukan ${p.name}`} />
                </form>
              </div>
            </div>
          );
        })}
        {parents.length === 0 && (
          <p className="col-span-full rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada indukan terdaftar. Tambahkan indukan jantan & betina Anda
            untuk mulai mencatat silsilah.
          </p>
        )}
      </div>
    </div>
  );
}
