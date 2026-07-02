import type { Metadata } from "next";
import {
  BadgePercent,
  Megaphone,
  GraduationCap,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { getSettings } from "@/lib/settings";
import { NatureScene } from "@/components/NatureScene";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Program Reseller",
  description:
    "Bergabung sebagai reseller resmi: harga khusus, prioritas stok joey, materi promosi, dan dukungan edukasi untuk pembeli Anda.",
};

const benefits = [
  {
    icon: BadgePercent,
    title: "Harga khusus reseller",
    description:
      "Margin sehat dengan harga di bawah katalog publik. Makin konsisten penjualan Anda, makin baik tier harganya.",
  },
  {
    icon: Megaphone,
    title: "Materi promosi siap pakai",
    description:
      "Foto, video, dan copywriting tiap joey kami siapkan — Anda tinggal posting ke pasar Anda.",
  },
  {
    icon: GraduationCap,
    title: "Dukungan edukasi pembeli",
    description:
      "Pembeli akhir Anda tetap kami dampingi di grup konsultasi. Reputasi Anda ikut terjaga.",
  },
  {
    icon: Truck,
    title: "Prioritas stok & pengiriman",
    description:
      "Reseller mendapat info joey baru lebih dulu sebelum masuk katalog publik, plus jalur pengiriman terjadwal.",
  },
];

const requirements = [
  "Berkomitmen menjual glider sehat dengan edukasi yang benar (bukan sekadar kejar volume).",
  "Punya kanal penjualan aktif: Instagram, TikTok, marketplace, atau komunitas lokal.",
  "Memahami dasar perawatan sugar glider — kami sediakan pelatihan singkatnya.",
  "Tidak menjual joey di bawah umur 2,5 bulan out of pouch.",
];

export default async function ResellerPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Program Reseller"
              title="Tumbuh bersama sebagai mitra resmi"
              description={`Jadikan ${settings.siteName} pemasok utama Anda. Kami urus kualitas dan edukasi — Anda fokus menjual dengan tenang.`}
            />
            <div className="mt-8">
              <WhatsAppCta
                whatsapp={settings.whatsapp}
                message={`Halo ${settings.siteName}, saya ingin mendaftar sebagai reseller. Boleh info syarat dan daftar harganya?`}
                label="Daftar Jadi Reseller"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative h-64 overflow-hidden rounded-[2rem] border border-line shadow-lg shadow-brand/10 lg:h-72">
            <NatureScene className="absolute inset-0 h-full w-full" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface/90 px-5 py-2 text-xs font-semibold text-brand-strong shadow-sm backdrop-blur">
              Mitra resmi — stok joey prioritas untuk Anda
            </span>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 100}>
            <div className="flex h-full gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {b.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 rounded-[2rem] border border-line bg-brand-soft/50 p-8 sm:p-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Syarat bergabung
          </h2>
          <p className="mt-2 text-sm text-muted">
            Kami selektif — karena setiap glider yang Anda jual membawa nama
            baik penangkaran ini juga.
          </p>
          <ul className="mt-6 space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                {req}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WhatsAppCta
              whatsapp={settings.whatsapp}
              message={`Halo ${settings.siteName}, saya memenuhi syarat reseller dan ingin mulai bermitra.`}
              label="Ajukan Kemitraan via WhatsApp"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
