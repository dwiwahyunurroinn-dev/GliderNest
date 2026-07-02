import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GliderMark } from "@/components/GliderMark";
import { StatusPill } from "@/components/StatusPill";
import { WhatsAppCta } from "@/components/WhatsAppCta";
import { formatPrice, getAllGliders, getGliderBySlug } from "@/data/gliders";

export function generateStaticParams() {
  return getAllGliders().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const glider = getGliderBySlug(slug);
  if (!glider) return { title: "Glider tidak ditemukan" };
  return {
    title: `${glider.name} — ${glider.morph}`,
    description: glider.description,
  };
}

export default async function GliderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const glider = getGliderBySlug(slug);
  if (!glider) notFound();

  const [from, to] = glider.palette;
  const others = getAllGliders()
    .filter((g) => g.slug !== glider.slug && g.status === "tersedia")
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link
        href="/gliders"
        className="text-sm font-medium text-muted transition-colors hover:text-brand-strong"
      >
        ← Kembali ke katalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div
          className="flex h-80 items-center justify-center rounded-3xl border border-line sm:h-96"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <GliderMark className="h-44 w-44 text-night/70" />
        </div>

        <div>
          <StatusPill status={glider.status} />
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
            {glider.name}
          </h1>
          <p className="mt-1 text-lg text-muted">{glider.morph}</p>
          <p className="mt-4 text-3xl font-semibold text-brand-strong">
            {formatPrice(glider.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-5 text-sm">
            <div>
              <dt className="text-muted">Jenis kelamin</dt>
              <dd className="mt-0.5 font-semibold capitalize">{glider.sex}</dd>
            </div>
            <div>
              <dt className="text-muted">Umur</dt>
              <dd className="mt-0.5 font-semibold">{glider.ageMonths} bulan (OOP)</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Silsilah</dt>
              <dd className="mt-0.5 font-semibold">{glider.lineage}</dd>
            </div>
          </dl>

          <p className="mt-6 leading-relaxed text-muted">{glider.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {glider.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong"
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {glider.status === "tersedia" ? (
              <WhatsAppCta
                message={`Halo GliderNest, saya tertarik mengadopsi ${glider.name} (${glider.morph}, ${glider.sex}). Apakah masih tersedia?`}
                label={`Adopsi ${glider.name} via WhatsApp`}
              />
            ) : (
              <WhatsAppCta
                message={`Halo GliderNest, saya tertarik dengan glider seperti ${glider.name} (${glider.morph}). Apakah ada joey serupa atau waiting list?`}
                label="Tanya joey serupa / waiting list"
                variant="outline"
              />
            )}
          </div>

          <p className="mt-4 text-xs text-muted">
            Termasuk: kartu identitas & silsilah, paket pakan awal, panduan
            perawatan, garansi kesehatan 7 hari, dan grup pendampingan adopter.
          </p>
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Glider lain yang tersedia
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`/gliders/${g.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${g.palette[0]}, ${g.palette[1]})`,
                  }}
                >
                  <GliderMark className="h-10 w-10 text-night/70" />
                </span>
                <span>
                  <span className="block font-semibold">{g.name}</span>
                  <span className="block text-sm text-muted">
                    {g.morph} · {formatPrice(g.price)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
