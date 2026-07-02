import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Utensils,
  HeartPulse,
  GraduationCap,
  Eye,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getActiveBackgroundUrl, getSettings } from "@/lib/settings";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali peternakan kami: penangkaran sugar glider captive-bred yang mengutamakan kesehatan, etika breeding, dan edukasi adopter.",
};

const commitments = [
  {
    icon: Home,
    title: "Standar kandang & lingkungan",
    body: "Kandang koloni luas dengan enrichment, suhu terjaga 24–28°C, dan rotasi kebersihan rutin. Glider kami hidup selayaknya di habitat — memanjat, meluncur, dan bersosialisasi.",
  },
  {
    icon: Utensils,
    title: "Nutrisi tercatat",
    body: "Diet berbasis protokol HPW/BML termodifikasi — bukan sekadar buah dan kacang. Rekam pakan dan berat badan tiap joey terdokumentasi dan bisa Anda minta.",
  },
  {
    icon: HeartPulse,
    title: "Breeding yang bertanggung jawab",
    body: "Indukan dirotasi dengan masa istirahat cukup, tidak dikawinkan sedarah, dan pensiun pada umur layak. Kami membatasi jumlah litter demi kualitas, bukan kuantitas.",
  },
  {
    icon: GraduationCap,
    title: "Edukasi sebelum adopsi",
    body: "Kami menolak adopsi impulsif. Setiap calon adopter kami ajak diskusi soal komitmen 10–15 tahun umur glider, kebutuhan koloni, dan biaya perawatan — sebelum bicara harga.",
  },
];

export default async function AboutPage() {
  const [settings, backgroundUrl, gliderCount, testimonialCount] =
    await Promise.all([
      getSettings(),
      getActiveBackgroundUrl(),
      prisma.glider.count(),
      prisma.testimonial.count({ where: { published: true } }),
    ]);
  const years = Math.max(1, new Date().getFullYear() - settings.foundedYear);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Tentang Kami"
              title={`Cerita di balik ${settings.siteName}`}
              description={`Berawal dari sepasang glider peliharaan pada ${settings.foundedYear}, kini ${settings.siteName} menjadi penangkaran kecil di ${settings.address} yang fokus pada kualitas: joey sehat, adopter teredukasi, dan penangkaran yang etis.`}
            />
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                [`${years}+ th`, "Pengalaman"],
                [`${gliderCount}`, "Glider di katalog"],
                [`${testimonialCount}+`, "Testimoni"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold text-brand-strong">{value}</dt>
                  <dd className="mt-1 text-xs text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative h-72 overflow-hidden rounded-[2rem] border border-line shadow-lg shadow-brand/10 lg:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backgroundUrl}
              alt="Hutan — habitat asli sugar glider"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-surface/90 px-5 py-2 text-xs font-semibold text-brand-strong shadow-sm backdrop-blur">
              Habitat asli sugar glider: hutan yang tenang 🌿
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-16 rounded-[2rem] border border-line bg-gradient-to-br from-brand-soft via-sky to-white p-8 shadow-sm sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-strong sm:text-3xl">
            Misi kami sederhana
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <p className="leading-relaxed text-foreground/80">
              Sugar glider adalah hewan sosial berumur panjang yang sering
              dibeli impulsif lalu ditelantarkan. Kami ingin mengubah itu:
              setiap joey dari {settings.siteName} pulang ke rumah yang sudah
              siap — pemiliknya paham pakan, bonding, dan komitmen jangka
              panjangnya.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Karena itu kami tidak hanya menjual. Kami mendampingi. Grup
              adopter kami aktif setiap hari untuk konsultasi, dan garansi
              kesehatan kami tertulis di setiap adopsi — bukan janji lisan.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Standar Kami"
            title="Komitmen yang kami pegang"
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="flex h-full gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="mt-16 grid items-center gap-8 rounded-[2rem] border border-line bg-brand-soft/50 p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl font-semibold">
              <Eye className="h-6 w-6 text-brand" />
              Transparansi penuh — buktikan sendiri
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Kami membuka kunjungan terjadwal ke kandang di {settings.address},
              atau video call langsung kapan pun Anda ragu. Lihat sendiri
              kondisi indukan, kebersihan kandang, dan cara kami merawat joey —
              kredibilitas kami dibangun dari bukti, bukan klaim.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppCta
              whatsapp={settings.whatsapp}
              message={`Halo ${settings.siteName}, saya ingin menjadwalkan kunjungan / video call kandang.`}
              label="Jadwalkan Kunjungan"
            />
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
            >
              Lihat Galeri
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
