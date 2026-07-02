import Link from "next/link";
import { GliderCard } from "@/components/GliderCard";
import { GliderMark } from "@/components/GliderMark";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";
import { adoptionSteps, testimonials, trustPoints } from "@/data/content";
import { getAvailableGliders } from "@/data/gliders";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getAvailableGliders().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-stone-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 80% at 80% 20%, rgba(180,83,9,0.5), transparent), radial-gradient(40% 60% at 10% 90%, rgba(54,83,20,0.4), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Peternakan aktif sejak {site.foundedYear} · {site.address}
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Sugar glider sehat, silsilah jelas,{" "}
              <span className="text-amber-400">dari penangkaran etis.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-stone-300">
              {site.name} membesarkan setiap joey dengan handling harian,
              nutrisi tercatat, dan pendampingan seumur hidup untuk adopter —
              supaya Anda memelihara dengan percaya diri sejak hari pertama.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gliders"
                className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Lihat Katalog Glider
              </Link>
              <WhatsAppCta
                message="Halo GliderNest, saya ingin konsultasi adopsi sugar glider."
                label="Konsultasi Gratis"
                variant="outline"
                className="border-stone-600 bg-transparent text-stone-200 hover:border-amber-400 hover:text-amber-300"
              />
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-stone-800 pt-6">
              {[
                ["150+", "Joey diadopsi"],
                ["6", "Morph tersedia"],
                ["100%", "Captive-bred"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-semibold text-white">{value}</dt>
                  <dd className="mt-1 text-xs text-stone-400">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400/70 to-amber-700/60">
              <GliderMark className="h-52 w-52 text-night" />
              <span className="absolute -bottom-3 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-lg">
                Aktif di malam hari, menggemaskan sepanjang hari 🌙
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          eyebrow="Kenapa GliderNest"
          title="Kredibilitas yang bisa Anda verifikasi"
          description="Kami percaya membeli hewan peliharaan harus setransparan mungkin. Semua klaim di bawah bisa Anda cek langsung saat konsultasi."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <div
              key={point.title}
              className="rounded-2xl border border-line bg-surface p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-lg font-semibold text-brand-strong">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured gliders */}
      <section className="border-y border-line bg-brand-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Katalog"
              title="Joey siap adopsi"
              description="Semua joey dilepas minimal usia 2,5 bulan out of pouch, lepas sapih penuh, dan terbiasa handling."
            />
            <Link
              href="/gliders"
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((glider) => (
              <GliderCard key={glider.slug} glider={glider} />
            ))}
          </div>
        </div>
      </section>

      {/* Adoption steps */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          eyebrow="Proses Adopsi"
          title="Empat langkah, semuanya transparan"
        />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {adoptionSteps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-line bg-surface p-6 shadow-sm"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-night text-stone-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Testimoni Adopter
          </p>
          <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Dipercaya keluarga glider di seluruh Indonesia
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6"
              >
                <blockquote className="text-sm leading-relaxed text-stone-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-white">
                  {t.name}
                  <span className="ml-2 font-normal text-stone-500">{t.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-strong px-6 py-12 text-center text-white sm:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Siap menyambut anggota keluarga baru?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-amber-100">
            Konsultasi gratis dulu — kami bantu menilai kesiapan Anda dan
            memilih glider yang paling cocok, tanpa tekanan untuk membeli.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppCta
              message="Halo GliderNest, saya ingin konsultasi adopsi sugar glider."
              label="Mulai Konsultasi"
              variant="outline"
              className="border-transparent bg-white text-brand-strong hover:bg-amber-50 hover:text-brand-strong"
            />
            <Link
              href="/panduan"
              className="inline-flex items-center rounded-full border border-amber-200/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Baca Panduan Perawatan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
