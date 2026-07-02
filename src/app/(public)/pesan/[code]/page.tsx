import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Copy,
  QrCode,
  Landmark,
  Smartphone,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings, parseBankAccounts } from "@/lib/settings";
import { formatPrice, orderStatusLabel, paymentMethodLabel } from "@/lib/format";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Instruksi Pembayaran",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const [order, settings] = await Promise.all([
    prisma.order.findUnique({ where: { code: code.toUpperCase() } }),
    getSettings(),
  ]);
  if (!order) notFound();

  const banks = parseBankAccounts(settings.bankAccounts);
  const confirmMessage = `Halo ${settings.siteName}, saya sudah/akan membayar pesanan ${order.code} (${order.gliderName}) sebesar ${formatPrice(order.amount)} via ${paymentMethodLabel[order.paymentMethod]}. Berikut bukti pembayarannya.`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
          <CheckCircle2 className="h-8 w-8 text-brand" />
        </span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
          Pesanan berhasil dibuat!
        </h1>
        <p className="mt-2 text-muted">
          Simpan kode pesanan Anda dan selesaikan pembayaran di bawah ini.
        </p>
      </div>

      <div className="mt-8 rounded-[2rem] border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Kode Pesanan
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-brand-strong">
              {order.code}
            </p>
          </div>
          <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
            {orderStatusLabel[order.status] ?? order.status}
          </span>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Sugar glider</dt>
            <dd className="font-semibold">{order.gliderName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Atas nama</dt>
            <dd className="font-semibold">{order.customerName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Metode</dt>
            <dd className="font-semibold">
              {paymentMethodLabel[order.paymentMethod]}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-line pt-3 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-bold text-brand-strong">
              {formatPrice(order.amount)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Instruksi per metode */}
      <div className="mt-6 rounded-[2rem] border border-line bg-surface p-6 shadow-sm sm:p-8">
        {order.paymentMethod === "qris" && (
          <div className="text-center">
            <h2 className="flex items-center justify-center gap-2 font-semibold">
              <QrCode className="h-5 w-5 text-brand" /> Scan QRIS
            </h2>
            {settings.qrisImageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.qrisImageUrl}
                  alt={`Kode QRIS ${settings.siteName}`}
                  className="mx-auto mt-5 w-64 rounded-2xl border border-line"
                />
                <p className="mt-4 text-sm text-muted">
                  Scan dari aplikasi apa pun: GoPay, OVO, DANA, ShopeePay, atau
                  m-banking — lalu masukkan nominal{" "}
                  <strong className="text-foreground">
                    {formatPrice(order.amount)}
                  </strong>
                  .
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Kode QRIS akan kami kirim langsung via WhatsApp — klik tombol
                konfirmasi di bawah.
              </p>
            )}
          </div>
        )}

        {order.paymentMethod === "transfer" && (
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <Landmark className="h-5 w-5 text-brand" /> Transfer ke rekening
              resmi
            </h2>
            {banks.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {banks.map((b) => (
                  <li
                    key={`${b.bank}-${b.number}`}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-background px-5 py-4"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-brand">
                        {b.bank}
                      </p>
                      <p className="mt-0.5 font-mono text-lg font-semibold">
                        {b.number}
                      </p>
                      {b.holder && (
                        <p className="text-xs text-muted">a.n. {b.holder}</p>
                      )}
                    </div>
                    <Copy className="h-4 w-4 text-muted" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Nomor rekening akan kami kirim via WhatsApp — klik tombol
                konfirmasi di bawah.
              </p>
            )}
            <p className="mt-4 text-sm text-muted">
              Transfer tepat{" "}
              <strong className="text-foreground">
                {formatPrice(order.amount)}
              </strong>{" "}
              lalu simpan bukti transfernya.
            </p>
          </div>
        )}

        {order.paymentMethod === "dana" && (
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <Smartphone className="h-5 w-5 text-brand" /> Kirim via DANA
            </h2>
            {settings.danaNumber ? (
              <div className="mt-4 rounded-2xl bg-background px-5 py-4">
                <p className="font-mono text-lg font-semibold">
                  {settings.danaNumber}
                </p>
                {settings.danaName && (
                  <p className="text-xs text-muted">a.n. {settings.danaName}</p>
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Nomor DANA akan kami kirim via WhatsApp — klik tombol konfirmasi
                di bawah.
              </p>
            )}
            <p className="mt-4 text-sm text-muted">
              Kirim tepat{" "}
              <strong className="text-foreground">
                {formatPrice(order.amount)}
              </strong>{" "}
              lalu screenshot bukti pengirimannya.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-[2rem] bg-night p-6 text-center text-emerald-50 sm:p-8">
        <p className="font-semibold text-white">
          Langkah terakhir: konfirmasi via WhatsApp
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-emerald-100/70">
          Kirim bukti pembayaran beserta kode pesanan{" "}
          <strong className="text-gold">{order.code}</strong> agar kami segera
          memproses pengiriman joey Anda.
        </p>
        <div className="mt-5 flex justify-center">
          <WhatsAppCta
            whatsapp={settings.whatsapp}
            message={confirmMessage}
            label="Konfirmasi Pembayaran"
          />
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Halaman ini bisa dibuka kembali kapan saja di{" "}
        <span className="font-mono">/pesan/{order.code}</span>. Pembayaran hanya
        ke akun resmi yang tercantum di halaman ini.
      </p>
    </div>
  );
}
