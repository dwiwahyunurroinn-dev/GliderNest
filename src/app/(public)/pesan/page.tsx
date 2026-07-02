import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  QrCode,
  Landmark,
  Smartphone,
  ShoppingBag,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { createOrder } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Form Pemesanan",
  description:
    "Pesan sugar glider pilihan Anda — isi data diri, pilih metode pembayaran (QRIS, m-banking, DANA), dan terima instruksi otomatis.",
};

const errorMessages: Record<string, string> = {
  lengkapi: "Mohon lengkapi nama, nomor WhatsApp, dan alamat Anda.",
  metode: "Metode pembayaran tidak valid, silakan pilih ulang.",
  "tidak-tersedia":
    "Maaf, glider tersebut sudah tidak tersedia. Silakan pilih glider lain.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ glider?: string; error?: string }>;
}) {
  const [{ glider: selectedSlug, error }, available, settings] =
    await Promise.all([
      searchParams,
      prisma.glider.findMany({
        where: { status: "tersedia" },
        orderBy: { price: "asc" },
      }),
      getSettings(),
    ]);

  const paymentOptions = [
    { value: "qris", icon: QrCode, label: "QRIS", hint: "Scan dari aplikasi apa pun" },
    { value: "transfer", icon: Landmark, label: "Transfer Bank", hint: "ATM / m-banking" },
    { value: "dana", icon: Smartphone, label: "DANA", hint: "Kirim ke nomor e-wallet" },
    {
      value: "cod",
      icon: HandCoins,
      label: "COD",
      hint: settings.codArea
        ? `Bayar di tempat — area ${settings.codArea}`
        : "Bayar di tempat (area terdekat)",
    },
    {
      value: "rekber",
      icon: ShieldCheck,
      label: "Rekber",
      hint: "Rekening bersama — paling aman",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Pemesanan"
          title="Form pemesanan sugar glider"
          description="Isi data di bawah — setelah dikirim Anda langsung menerima kode pesanan dan instruksi pembayaran sesuai metode yang dipilih."
        />
      </Reveal>

      {error && (
        <p className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessages[error] ?? "Terjadi kesalahan, silakan coba lagi."}
        </p>
      )}

      {available.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-10 text-center">
          <p className="font-semibold">Semua joey sedang habis 🥲</p>
          <p className="mt-2 text-sm text-muted">
            Hubungi kami via WhatsApp untuk masuk waiting list joey berikutnya.
          </p>
          <Link
            href="/kontak"
            className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-strong"
          >
            Hubungi Kami
          </Link>
        </div>
      ) : (
        <Reveal delay={100}>
          <form
            action={createOrder}
            className="mt-10 space-y-6 rounded-[2rem] border border-line bg-surface p-6 shadow-sm sm:p-9"
          >
            <div>
              <label htmlFor="glider" className="text-sm font-semibold">
                Pilih sugar glider
              </label>
              <select
                id="glider"
                name="glider"
                required
                defaultValue={selectedSlug ?? ""}
                className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
              >
                <option value="" disabled>
                  — Pilih dari katalog yang tersedia —
                </option>
                {available.map((g) => (
                  <option key={g.slug} value={g.slug}>
                    {g.name} · {g.morph} · {formatPrice(g.price)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold">
                  Nama lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Nama Anda"
                  className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold">
                  Nomor WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-semibold">
                Alamat pengiriman
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                placeholder="Alamat lengkap termasuk kota & kecamatan"
                className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
              />
            </div>

            <div>
              <span className="text-sm font-semibold">Metode pembayaran</span>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {paymentOptions.map((opt, i) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-line bg-background p-4 text-center transition-all has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:checked]:shadow-sm"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      defaultChecked={i === 0}
                      className="sr-only"
                    />
                    <opt.icon className="h-6 w-6 text-brand" />
                    <span className="text-sm font-semibold">{opt.label}</span>
                    <span className="text-xs text-muted">{opt.hint}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="note" className="text-sm font-semibold">
                Catatan (opsional)
              </label>
              <textarea
                id="note"
                name="note"
                rows={2}
                placeholder="Pertanyaan atau permintaan khusus"
                className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-strong"
            >
              <ShoppingBag className="h-4 w-4" />
              Buat Pesanan & Lihat Instruksi Pembayaran
            </button>
            <p className="text-center text-xs text-muted">
              Dengan memesan, Anda menyetujui proses verifikasi via WhatsApp
              sebelum pengiriman. Belum ada pembayaran yang ditarik pada tahap
              ini.
            </p>
          </form>
        </Reveal>
      )}
    </div>
  );
}
