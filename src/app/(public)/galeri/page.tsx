import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Galeri foto sugar glider, kandang, dan aktivitas harian di penangkaran kami.",
};

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Galeri"
          title="Kehidupan di penangkaran kami"
          description="Foto joey, indukan, kandang, dan aktivitas harian — transparansi adalah cara terbaik membangun kepercayaan."
        />
      </Reveal>

      {items.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
          Galeri masih kosong. Foto akan segera diunggah!
        </p>
      ) : (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 80}>
              <figure className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="px-5 py-4 text-sm font-medium">
                  {item.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
