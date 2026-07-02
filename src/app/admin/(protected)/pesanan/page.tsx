import Link from "next/link";
import { MessageCircle, FileText } from "lucide-react";
import { prisma } from "@/lib/db";
import {
  formatDate,
  formatPrice,
  orderStatusLabel,
  paymentMethodLabel,
} from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateOrderStatus, deleteOrder } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Pesanan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ubah status setelah pembayaran diverifikasi. Membatalkan pesanan otomatis
        mengembalikan glider ke status “tersedia”; menyelesaikan pesanan
        menandainya “terjual”.
      </p>

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="rounded-3xl border border-line bg-surface p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-lg font-bold text-brand-strong">
                  {o.code}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatDate(o.createdAt)} · {paymentMethodLabel[o.paymentMethod]}
                </p>
              </div>
              <div className="flex items-center gap-2">
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
                    href={`https://wa.me/${o.phone.replace(/^0/, "62").replace(/\D/g, "")}`}
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
          </div>
        ))}
        {orders.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada pesanan masuk.
          </p>
        )}
      </div>
    </div>
  );
}
