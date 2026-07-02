import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { GliderCard } from "@/components/GliderCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog Sugar Glider",
  description:
    "Katalog sugar glider siap adopsi: Classic Grey, White Face Blond, Mosaic, Leucistic, Platinum, dan Cremeino. Sehat, silsilah tercatat, garansi kesehatan.",
};

const filters = [
  { value: "semua", label: "Semua" },
  { value: "tersedia", label: "Tersedia" },
  { value: "dipesan", label: "Dipesan" },
  { value: "terjual", label: "Terjual" },
];

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = filters.find((f) => f.value === status)?.value ?? "semua";
  const gliders = await prisma.glider.findMany({
    where: active === "semua" ? {} : { status: active },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Katalog"
          title="Sugar glider kami"
          description="Setiap joey disertai kartu identitas, rekam pakan & berat badan, dan garansi kesehatan 7 hari. Klik kartu untuk melihat detail dan silsilahnya."
        />
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={
              f.value === "semua"
                ? "/sugar-glider"
                : `/sugar-glider?status=${f.value}`
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === f.value
                ? "bg-night text-white"
                : "border border-line bg-surface text-muted hover:border-brand hover:text-brand-strong"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {gliders.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
          Belum ada glider pada kategori ini. Hubungi kami via WhatsApp untuk
          waiting list joey berikutnya.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gliders.map((glider, i) => (
            <Reveal key={glider.id} delay={(i % 3) * 100}>
              <GliderCard glider={glider} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
