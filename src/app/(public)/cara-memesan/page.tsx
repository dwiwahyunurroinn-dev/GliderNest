import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Video,
  Wallet,
  PackageCheck,
  QrCode,
  Landmark,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { getSettings } from "@/lib/settings";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cara Memesan",
  description:
    "Panduan lengkap memesan sugar glider: pilih di katalog, verifikasi via video, bayar dengan QRIS/m-banking/DANA, dan terima joey dengan pendampingan.",
};

const steps = [
  {
    icon: MessageCircle,
    title: "Pilih glider & isi form pemesanan",
    description:
      "Buka katalog, pilih joey yang Anda suka, lalu klik \"Pesan Sekarang\" dan isi data diri Anda. Bisa juga langsung chat WhatsApp jika ingin konsultasi dulu — gratis dan tanpa tekanan.",
  },
  {
    icon: Video,
    title: "Verifikasi kondisi via video",
    description:
      "Sebelum membayar, kami kirim video kondisi terkini joey — atau video call langsung dari kandang. Anda juga menerima rekam pakan dan berat badannya.",
  },
  {
    icon: Wallet,
    title: "Lakukan pembayaran",
    description:
      "Setelah pesanan dibuat, Anda menerima kode pesanan dan instruksi pembayaran: scan QRIS, transfer bank / m-banking, atau DANA. Kirim bukti bayar via WhatsApp dengan menyertakan kode pesanan.",
  },
  {
    icon: PackageCheck,
    title: "Pengiriman & pendampingan",
    description:
      "Joey dikirim dengan kurir khusus hewan berpengalaman (atau bisa dijemput langsung). Setelah tiba, Anda diundang ke grup pendampingan adopter seumur hidup.",
  },
];

export default async function HowToOrderPage() {
  const settings = await getSettings();

  const paymentMethods = [
    {
      icon: QrCode,
      title: "QRIS",
      description:
        "Scan satu kode QR dari aplikasi apa pun: GoPay, OVO, DANA, ShopeePay, LinkAja, atau m-banking.",
    },
    {
      icon: Landmark,
      title: "Transfer Bank / M-Banking",
      description:
        "Transfer manual ke rekening resmi kami melalui ATM, m-banking, atau internet banking.",
    },
    {
      icon: Smartphone,
      title: "DANA / E-Wallet",
      description:
        "Kirim langsung ke nomor e-wallet resmi atas nama penangkaran — bukan rekening pribadi tak terverifikasi.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Panduan"
          title="Bagaimana cara memesan sugar glider?"
          description="Prosesnya sederhana dan transparan — dari memilih joey sampai ia tiba di rumah Anda."
        />
      </Reveal>

      <ol className="mt-12 space-y-6">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 100}>
            <li className="flex gap-5 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/20">
                  <step.icon className="h-5 w-5" />
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-line" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand">
                  Langkah {i + 1}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="mt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Metode pembayaran yang tersedia
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {paymentMethods.map((m) => (
              <div
                key={m.title}
                className="rounded-3xl border border-line bg-surface p-5 text-center shadow-sm"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{m.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-gold-soft px-5 py-4 text-xs leading-relaxed text-foreground/80">
            <strong>Penting:</strong> pembayaran hanya ke rekening/akun resmi
            yang tercantum pada halaman instruksi pesanan Anda. Kami tidak
            pernah meminta pembayaran ke rekening lain via telepon.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-14 flex flex-col items-center gap-4 rounded-[2rem] bg-night p-10 text-center text-emerald-50">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Sudah siap? Yuk mulai!
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/sugar-glider"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-strong transition-transform hover:scale-105"
            >
              Buka Katalog
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppCta
              whatsapp={settings.whatsapp}
              message={`Halo ${settings.siteName}, saya ingin dibantu memesan sugar glider.`}
              label="Tanya Dulu via WA"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:border-gold hover:text-gold"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
