import Link from "next/link";
import { CalendarHeart, Baby, XCircle, Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate, toDatetimeLocal } from "@/lib/format";
import { countdownLabel, estimateBirth, estimateOop } from "@/lib/breeding";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { createBreeding, deleteBreeding, markBorn, markFailed } from "./actions";

export const dynamic = "force-dynamic";

const statusBadge: Record<string, string> = {
  berjalan: "bg-amber-100 text-amber-800",
  lahir: "bg-emerald-100 text-emerald-800",
  gagal: "bg-stone-200 text-stone-600",
};

export default async function AdminBreedingPage() {
  const [parents, pairs] = await Promise.all([
    prisma.parent.findMany({ orderBy: { name: "asc" } }),
    prisma.breeding.findMany({
      orderBy: [{ status: "asc" }, { pairedAt: "desc" }],
      include: { sire: true, dam: true },
    }),
  ]);
  const sires = parents.filter((p) => p.sex === "jantan");
  const dams = parents.filter((p) => p.sex === "betina");
  const todayInput = toDatetimeLocal(new Date()).slice(0, 10);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Kalender Breeding
      </h1>
      <p className="mt-1 text-sm text-muted">
        Catat tanggal pasangan dikawinkan — perkiraan lahir (±16 hari) dan
        keluar kantung/OOP (±86 hari) dihitung otomatis, dan pengingatnya
        muncul di halaman Hari Ini.
      </p>

      {sires.length === 0 || dams.length === 0 ? (
        <p className="mt-6 rounded-3xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          Untuk mulai, daftarkan minimal satu indukan jantan dan satu betina di{" "}
          <Link href="/admin/indukan" className="font-semibold text-brand hover:text-brand-strong">
            menu Indukan & Silsilah
          </Link>
          .
        </p>
      ) : (
        <form
          action={createBreeding}
          className="mt-6 space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label htmlFor="sireId" className={labelCls}>Indukan jantan</label>
              <select id="sireId" name="sireId" required className={inputCls}>
                {sires.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.morph})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="damId" className={labelCls}>Indukan betina</label>
              <select id="damId" name="damId" required className={inputCls}>
                {dams.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.morph})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pairedAt" className={labelCls}>Tanggal dikawinkan</label>
              <input
                id="pairedAt"
                name="pairedAt"
                type="date"
                required
                defaultValue={todayInput}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="note" className={labelCls}>
                Catatan <span className="font-normal text-muted">(opsional)</span>
              </label>
              <input id="note" name="note" className={inputCls} />
            </div>
          </div>
          <button type="submit" className={btnPrimary}>
            <Plus className="h-4 w-4" />
            Catat Pasangan
          </button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {pairs.map((b) => {
          const birth = estimateBirth(b.pairedAt);
          const oop = estimateOop(b.pairedAt);
          return (
            <div key={b.id} className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-bold">
                    <CalendarHeart className="h-4.5 w-4.5 text-brand" />
                    {b.sire.name} × {b.dam.name}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${statusBadge[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Dikawinkan {formatDate(b.pairedAt)}
                    {b.note && ` · ${b.note}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {b.status === "berjalan" && (
                    <>
                      <form action={markBorn.bind(null, b.id)} className="flex items-center gap-1.5">
                        <input
                          name="joeyCount"
                          type="number"
                          min={1}
                          max={4}
                          defaultValue={1}
                          aria-label="Jumlah joey"
                          className="w-16 rounded-full border border-line bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-brand"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                        >
                          <Baby className="h-3.5 w-3.5" />
                          Lahir
                        </button>
                      </form>
                      <form action={markFailed.bind(null, b.id)}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-muted transition-colors hover:border-red-400 hover:text-red-500"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Gagal
                        </button>
                      </form>
                    </>
                  )}
                  <form action={deleteBreeding.bind(null, b.id)}>
                    <DeleteButton label="catatan breeding ini" />
                  </form>
                </div>
              </div>

              {b.status === "berjalan" && (
                <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Perkiraan lahir
                    </p>
                    <p className="mt-0.5 font-semibold">
                      {formatDate(birth)}{" "}
                      <span className="text-sm font-bold text-brand-strong">
                        ({countdownLabel(birth)})
                      </span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-background px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Perkiraan keluar kantung (OOP)
                    </p>
                    <p className="mt-0.5 font-semibold">
                      {formatDate(oop)}{" "}
                      <span className="text-sm font-bold text-brand-strong">
                        ({countdownLabel(oop)})
                      </span>
                    </p>
                  </div>
                </div>
              )}
              {b.status === "lahir" && b.bornAt && (
                <p className="mt-3 border-t border-line pt-3 text-sm">
                  🎉 <strong>{b.joeyCount} joey</strong> lahir {formatDate(b.bornAt)} —
                  perkiraan siap listing:{" "}
                  <strong>
                    {formatDate(new Date(b.bornAt.getTime() + 75 * 86400000))}
                  </strong>{" "}
                  (±2,5 bulan OOP)
                </p>
              )}
            </div>
          );
        })}
        {pairs.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada pasangan breeding tercatat.
          </p>
        )}
      </div>
    </div>
  );
}
