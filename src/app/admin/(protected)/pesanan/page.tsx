import Link from "next/link";
import { MessageCircle, FileText, Search, AlarmClock } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import {
  followupCutoff,
  formatDate,
  formatPrice,
  orderStatusLabel,
  paymentMethodLabel,
} from "@/lib/format";
import { formatWaPhone, waTemplates } from "@/lib/wa-templates";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls } from "@/components/admin/ui";
import { updateOrderStatus, deleteOrder } from "./actions";

export const dynamic = "force-dynamic";

const filters = [
  { value: "semua", label: "Semua" },
  { value: "followup", label: "⏰ Perlu Follow-up" },
  { value: "menunggu", label: "Menunggu" },
  { value: "diproses", label: "Diproses" },
  { value: "dikirim", label: "Dikirim" },
  { value: "selesai", label: "Selesai" },
  { value: "dibatalkan", label: "Dibatalkan" },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const [{ q = "", status = "semua" }, settings] = await Promise.all([
    searchParams,
    getSettings(),
  ]);
  const cutoff = followupCutoff();

  const all = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  const needsFollowup = (o: (typeof all)[number]) =>
    o.status === "menunggu" && o.createdAt < cutoff;

  const query = q.trim().toLowerCase();
  const orders = all.filter((o) => {
    if (status === "followup" && !needsFollowup(o)) return false;
    if (status !== "semua" && status !== "followup" && o.status !== status)
      return false;
    if (query) {
      const haystack =
        `${o.code} ${o.customerName} ${o.phone} ${o.gliderName}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const followupCount = all.filter(needsFollowup).length;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Pesanan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ubah status setelah pembayaran diverifikasi — stok & status glider
        tersinkron otomatis. Gunakan tombol balas cepat untuk WhatsApp pembeli
        tanpa mengetik ulang.
      </p>

      {followupCount > 0 && (
        <Link
          href="/admin/pesanan?status=followup"
          className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
        >
          <AlarmClock className="h-4 w-4" />
          {followupCount} pesanan menunggu pembayaran lebih dari 24 jam — perlu
          di-follow-up
        </Link>
      )}

      {/* Pencarian & filter */}
      <form action="/admin/pesanan" className="mt-5 flex gap-2">
        <input type="hidden" name="status" value={status} />
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari kode, nama, nomor HP, atau glider…"
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
        {filters.map((f) => (
          <Link
            key={f.value}
            href={`/admin/pesanan?status=${f.value}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
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

      <div className="mt-5 space-y-4">
        {orders.map((o) => {
          const stale = needsFollowup(o);
          const templates = waTemplates(o, settings.siteName);
          return (
            <div
              key={o.id}
              className={`rounded-3xl border bg-surface p-6 shadow-sm ${
                stale ? "border-red-300 ring-1 ring-red-200" : "border-line"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-lg font-bold text-brand-strong">
                    {o.code}
                    {stale && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 font-sans text-[11px] font-bold text-red-600">
                        <AlarmClock className="h-3 w-3" />
                        Follow-up!
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDate(o.createdAt)} · {paymentMethodLabel[o.paymentMethod]}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/pesan/${o.code}/invoice`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-muted transition-colors hover:border-brand hover:text-brand-strong"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Invoice
                  </Link>
                  <form
                    action={updateOrderStatus.bind(null, o.id)}
                    className="flex items-center gap-2"
                  >
                    <select
                      name="status"
                      defaultValue={o.status}
                      className="rounded-full border border-line bg-background px-3.5 py-2 text-xs font-semibold outline-none focus:border-brand"
                    >
                      {Object.entries(orderStatusLabel).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
                    >
                      Simpan
                    </button>
                  </form>
                  <form action={deleteOrder.bind(null, o.id)}>
                    <DeleteButton label={`pesanan ${o.code}`} />
                  </form>
                </div>
              </div>

              <dl className="mt-4 grid gap-x-8 gap-y-2 border-t border-line pt-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Pembeli</dt>
                  <dd className="font-semibold">{o.customerName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Glider</dt>
                  <dd className="font-semibold">{o.gliderName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${formatWaPhone(o.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-strong"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {o.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Total</dt>
                  <dd className="font-bold text-brand-strong">
                    {formatPrice(o.amount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3 sm:col-span-2">
                  <dt className="shrink-0 text-muted">Alamat</dt>
                  <dd className="text-right">{o.address}</dd>
                </div>
                {o.note && (
                  <div className="flex justify-between gap-3 sm:col-span-2">
                    <dt className="shrink-0 text-muted">Catatan</dt>
                    <dd className="text-right">{o.note}</dd>
                  </div>
                )}
              </dl>

              {/* Balas cepat WhatsApp */}
              {templates.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">
                    Balas cepat:
                  </span>
                  {templates.map((t) => (
                    <a
                      key={t.label}
                      href={`https://wa.me/${formatWaPhone(o.phone)}?text=${encodeURIComponent(t.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#22a75d]/10 px-3.5 py-1.5 text-xs font-semibold text-[#178a4c] transition-colors hover:bg-[#22a75d] hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {t.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {orders.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            {q || status !== "semua"
              ? "Tidak ada pesanan yang cocok dengan pencarian/filter ini."
              : "Belum ada pesanan masuk."}
          </p>
        )}
      </div>
    </div>
  );
}
