import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { formatPrice, morphGradient, splitTraits } from "@/lib/format";
import { PawPrint } from "lucide-react";
import { StatusPill } from "@/components/StatusPill";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const glider = await prisma.glider.findUnique({ where: { slug } });
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
  const [glider, settings] = await Promise.all([
    prisma.glider.findUnique({ where: { slug } }),
    getSettings(),
  ]);
  if (!glider) notFound();

  const [from, to] = morphGradient(glider.morph);
  const others = await prisma.glider.findMany({
    where: { slug: { not: glider.slug }, status: "tersedia" },
    take: 3,
  });

  // Data terstruktur produk agar tampil kaya di hasil pencarian Google.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Sugar Glider ${glider.morph} — ${glider.name}`,
    description: glider.description,
    ...(glider.imageUrl ? { image: glider.imageUrl } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: glider.price,
      availability:
        glider.status === "tersedia" && glider.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Link
        href="/sugar-glider"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-strong"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke katalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div
          className="flex h-80 items-center justify-center overflow-hidden rounded-[2rem] border border-line sm:h-[26rem]"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {glider.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={glider.imageUrl}
              alt={`${glider.name} — sugar glider ${glider.morph}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex flex-col items-center gap-3 text-brand-strong/50">
              <PawPrint className="h-24 w-24" strokeWidth={1.5} />
              <span className="text-sm font-semibold">Foto segera diunggah</span>
            </span>
          )}
        </div>

        <div>
          <StatusPill status={glider.status} />
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
            {glider.name}
          </h1>
          <p className="mt-1 text-lg text-muted">{glider.morph}</p>
          <p className="mt-4 text-3xl font-bold text-brand-strong">
            {formatPrice(glider.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-3xl border border-line bg-surface p-5 text-sm">
            <div>
              <dt className="text-muted">Jenis kelamin</dt>
              <dd className="mt-0.5 font-semibold capitalize">{glider.sex}</dd>
            </div>
            <div>
              <dt className="text-muted">Umur</dt>
              <dd className="mt-0.5 font-semibold">
                {glider.ageMonths} bulan (OOP)
              </dd>
            </div>
            <div>
              <dt className="text-muted">Stok</dt>
              <dd className="mt-0.5 font-semibold">
                {glider.stock > 0 ? `${glider.stock} ekor` : "Habis"}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">Silsilah</dt>
              <dd className="mt-0.5 font-semibold">{glider.lineage}</dd>
            </div>
          </dl>

          <p className="mt-6 leading-relaxed text-muted">{glider.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {splitTraits(glider.traits).map((trait) => (
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
              <>
                <Link
                  href={`/pesan?glider=${glider.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Pesan {glider.name} Sekarang
                </Link>
                <WhatsAppCta
                  whatsapp={settings.whatsapp}
                  message={`Halo ${settings.siteName}, saya ingin bertanya tentang ${glider.name} (${glider.morph}, ${glider.sex}).`}
                  label="Tanya Dulu"
                  variant="outline"
                />
              </>
            ) : (
              <WhatsAppCta
                whatsapp={settings.whatsapp}
                message={`Halo ${settings.siteName}, saya tertarik dengan glider seperti ${glider.name} (${glider.morph}). Apakah ada joey serupa atau waiting list?`}
                label="Tanya joey serupa / waiting list"
                variant="outline"
              />
            )}
          </div>

          <p className="mt-5 flex items-start gap-2 text-xs text-muted">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
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
            {others.map((g) => {
              const [f, t] = morphGradient(g.morph);
              return (
                <Link
                  key={g.id}
                  href={`/sugar-glider/${g.slug}`}
                  className="group flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${f}, ${t})` }}
                  >
                    {g.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={g.imageUrl}
                        alt={g.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PawPrint className="h-8 w-8 text-brand-strong/50" strokeWidth={1.5} />
                    )}
                  </span>
                  <span>
                    <span className="block font-semibold">{g.name}</span>
                    <span className="block text-sm text-muted">
                      {g.morph} · {formatPrice(g.price)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
