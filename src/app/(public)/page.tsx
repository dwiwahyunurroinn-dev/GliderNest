import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  BookOpenCheck,
  Star,
  MessageCircle,
  ClipboardCheck,
  Video,
  Wallet,
  PackageCheck,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings, waLink } from "@/lib/settings";
import { formatDate } from "@/lib/format";
import { GliderCard } from "@/components/GliderCard";
import { Mascot } from "@/components/Mascot";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

const trustPoints = [
  {
    icon: Leaf,
    title: "100% Captive-Bred",
    description:
      "Seluruh glider lahir di penangkaran kami — bukan tangkapan alam. Etis, legal, dan lebih sehat.",
  },
  {
    icon: ClipboardCheck,
    title: "Silsilah Tercatat",
    description:
      "Setiap joey punya kartu identitas: morph, garis keturunan, tanggal out of pouch, dan riwayat pakan.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Kesehatan",
    description:
      "Garansi 7 hari pasca-adopsi plus rekomendasi dokter hewan eksotik di kota Anda.",
  },
  {
    icon: HeartHandshake,
    title: "Pendampingan Seumur Hidup",
    description:
      "Grup konsultasi khusus adopter: bonding, pakan, sampai persiapan breeding — kami dampingi terus.",
  },
];

const orderSteps = [
  {
    icon: MessageCircle,
    title: "Pilih & Konsultasi",
    description: "Pilih glider di katalog, lalu konsultasi gratis via WhatsApp.",
  },
  {
    icon: Video,
    title: "Video Verifikasi",
    description: "Kami kirim video kondisi terkini langsung dari kandang.",
  },
  {
    icon: Wallet,
    title: "Pembayaran Mudah",
    description: "QRIS, transfer bank / m-banking, atau DANA — bukti tertulis.",
  },
  {
    icon: PackageCheck,
    title: "Kirim & Dampingi",
    description: "Kurir hewan berpengalaman + grup pendampingan seumur hidup.",
  },
];

export default async function HomePage() {
  const [settings, featured, articles, testimonials, gallery, adopted] =
    await Promise.all([
      getSettings(),
      prisma.glider.findMany({
        where: { status: "tersedia" },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
      }),
      prisma.article.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
      prisma.order.count({ where: { status: "selesai" } }),
    ]);

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-night text-emerald-50">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 70% at 82% 18%, rgba(30,122,79,0.55), transparent), radial-gradient(45% 60% at 8% 88%, rgba(200,162,78,0.18), transparent)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-shimmer rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-100/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-100/80">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Peternakan aktif sejak {settings.foundedYear} · {settings.address}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                Sahabat kecil yang{" "}
                <span className="text-gold">meluncur</span> ke hati keluarga
                Anda.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-xl leading-relaxed text-emerald-100/70">
                {settings.siteName} membesarkan setiap joey dengan handling
                harian, nutrisi tercatat, dan pendampingan seumur hidup —
                supaya Anda memelihara dengan percaya diri sejak hari pertama.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sugar-glider"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-strong"
                >
                  Lihat Katalog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={waLink(
                    settings.whatsapp,
                    `Halo ${settings.siteName}, saya ingin konsultasi adopsi sugar glider.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-100/20 px-6 py-3.5 text-sm font-semibold text-emerald-50 transition-colors hover:border-gold hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi Gratis
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  ["150+", "Joey diadopsi"],
                  ["6", "Morph tersedia"],
                  [`${adopted >= 1 ? adopted : "100%"}`, adopted >= 1 ? "Pesanan selesai" : "Captive-bred"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="text-2xl font-semibold text-white">{value}</dt>
                    <dd className="mt-1 text-xs text-emerald-100/60">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative hidden items-center justify-center md:flex">
            <div className="absolute h-80 w-80 rounded-full bg-gradient-to-br from-brand/40 via-emerald-400/10 to-gold/20 blur-2xl" />
            <div className="animate-float relative">
              <Mascot className="h-80 w-80 drop-shadow-2xl" />
            </div>
            <span className="absolute -bottom-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-semibold text-emerald-50 backdrop-blur">
              Hai! Aku Gigi, maskot {settings.siteName} 🌿
            </span>
          </div>
        </div>
      </section>

      {/* ===== Poin kepercayaan ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={`Kenapa ${settings.siteName}`}
            title="Kredibilitas yang bisa Anda verifikasi"
            description="Membeli hewan peliharaan harus setransparan mungkin. Semua klaim di bawah bisa Anda cek langsung saat konsultasi atau kunjungan kandang."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <point.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Glider unggulan ===== */}
      <section className="border-y border-line bg-brand-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Katalog"
                title="Joey siap adopsi"
                description="Semua joey dilepas minimal usia 2,5 bulan out of pouch, lepas sapih penuh, dan terbiasa handling."
              />
              <Link
                href="/sugar-glider"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
              >
                Lihat semua
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((glider, i) => (
              <Reveal key={glider.id} delay={i * 120}>
                <GliderCard glider={glider} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cara memesan ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Cara Memesan"
              title="Empat langkah, semuanya transparan"
            />
            <Link
              href="/cara-memesan"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-strong"
            >
              Panduan lengkap
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <li className="relative h-full rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ===== Galeri marquee ===== */}
      {gallery.length > 0 && (
        <section className="overflow-hidden border-y border-line bg-surface py-10">
          <div className="marquee-track flex w-max gap-5">
            {[...gallery, ...gallery].map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href="/galeri"
                className="group relative block h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent px-4 pb-3 pt-8 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== Blog ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Blog Edukasi"
              title="Belajar dulu, adopsi kemudian"
              description="Artikel perawatan yang kami tulis dari pengalaman langsung di penangkaran."
            />
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
            >
              Semua artikel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={i * 120}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong">
                  <BookOpenCheck className="h-3.5 w-3.5" />
                  Edukasi
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug transition-colors group-hover:text-brand-strong">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted">
                  {formatDate(article.createdAt)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Testimoni ===== */}
      <section className="border-y border-line bg-night text-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                  Testimoni Adopter
                </p>
                <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Dipercaya keluarga glider di seluruh Indonesia
                </h2>
              </div>
              <Link
                href="/testimoni"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-white"
              >
                Semua testimoni
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 120}>
                <figure className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-emerald-100/80">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-white">
                    {t.name}
                    <span className="ml-2 font-normal text-emerald-100/50">
                      {t.city}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA akhir ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-brand-strong px-6 py-14 text-center text-white sm:px-12 md:py-20">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="animate-float-slow absolute -top-4 right-8 hidden md:block">
              <Mascot className="h-28 w-28 opacity-90" animated={false} />
            </div>
            <h2 className="relative mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Siap menyambut anggota keluarga baru?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-emerald-50/85">
              Konsultasi gratis dulu — kami bantu menilai kesiapan Anda dan
              memilih glider yang paling cocok, tanpa tekanan untuk membeli.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/pesan"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-strong shadow-lg transition-transform hover:scale-105"
              >
                Pesan Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink(
                  settings.whatsapp,
                  `Halo ${settings.siteName}, saya ingin konsultasi adopsi sugar glider.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
