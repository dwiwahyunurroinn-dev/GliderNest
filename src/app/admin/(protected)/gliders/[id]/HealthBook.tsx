import { HeartPulse, Plus, Scale } from "lucide-react";
import type { HealthRecord } from "@/generated/prisma/client";
import { formatDate, toDatetimeLocal } from "@/lib/format";
import { BarChart } from "@/components/admin/BarChart";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { addHealthRecord, deleteHealthRecord } from "../actions";

/** Buku kesehatan per glider: form catat + grafik berat + riwayat. */
export function HealthBook({
  gliderId,
  records,
}: {
  gliderId: string;
  records: HealthRecord[];
}) {
  const weighed = records
    .filter((r) => r.weightGram > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const chartData = weighed.slice(-8).map((r) => ({
    label: new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "2-digit" }).format(r.date),
    value: r.weightGram,
  }));
  const todayInput = toDatetimeLocal(new Date()).slice(0, 10);

  return (
    <section className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <h2 className="flex items-center gap-2 font-semibold">
        <HeartPulse className="h-4.5 w-4.5 text-brand" />
        Buku Kesehatan
      </h2>
      <p className="mt-1 text-sm text-muted">
        Catat berat badan dan kondisi rutin. Grafik pertumbuhan otomatis tampil
        di halaman publik glider ini — bukti perawatan yang menaikkan
        kepercayaan pembeli.
      </p>

      <form
        action={addHealthRecord.bind(null, gliderId)}
        className="mt-5 grid gap-4 sm:grid-cols-[auto_auto_1fr_auto] sm:items-end"
      >
        <div>
          <label htmlFor="hb-date" className={labelCls}>Tanggal</label>
          <input
            id="hb-date"
            name="date"
            type="date"
            required
            defaultValue={todayInput}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="hb-weight" className={labelCls}>
            Berat (gram)
          </label>
          <input
            id="hb-weight"
            name="weightGram"
            type="number"
            min={0}
            placeholder="85"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="hb-note" className={labelCls}>
            Catatan <span className="font-normal text-muted">(kondisi, obat, pakan)</span>
          </label>
          <input id="hb-note" name="note" placeholder="Sehat, aktif, makan lahap" className={inputCls} />
        </div>
        <button type="submit" className={`${btnPrimary} justify-center`}>
          <Plus className="h-4 w-4" />
          Catat
        </button>
      </form>

      {chartData.length >= 2 && (
        <div className="mt-6 rounded-2xl bg-background p-4">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
            <Scale className="h-3.5 w-3.5" />
            Grafik berat badan (gram)
          </p>
          <div className="mt-3">
            <BarChart data={chartData} height={120} formatValue={(v) => `${v}g`} />
          </div>
        </div>
      )}

      {records.length > 0 ? (
        <ul className="mt-5 divide-y divide-line/70">
          {records
            .slice()
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="shrink-0 font-semibold">{formatDate(r.date)}</span>
                <span className="min-w-0 flex-1 truncate text-muted">
                  {r.weightGram > 0 && (
                    <strong className="mr-2 text-brand-strong">{r.weightGram}g</strong>
                  )}
                  {r.note}
                </span>
                <form action={deleteHealthRecord.bind(null, gliderId, r.id)}>
                  <DeleteButton label="catatan ini" />
                </form>
              </li>
            ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted">Belum ada catatan.</p>
      )}
    </section>
  );
}
