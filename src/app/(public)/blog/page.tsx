import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Edukasi Sugar Glider",
  description:
    "Artikel edukasi perawatan sugar glider: pakan, bonding, kandang, kesehatan, dan morph — ditulis dari pengalaman langsung di penangkaran.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Blog Edukasi"
          title="Belajar merawat glider dengan benar"
          description="Semua artikel ditulis dari protokol yang kami pakai sendiri di penangkaran — bukan sekadar teori."
        />
      </Reveal>

      {articles.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
          Belum ada artikel. Nantikan tulisan pertama kami!
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.id} delay={(i % 3) * 100}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5"
              >
                {article.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.coverUrl}
                    alt={article.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-brand-soft to-emerald-100">
                    <BookOpenCheck className="h-10 w-10 text-brand/50" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium text-muted">
                    {formatDate(article.createdAt)}
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug transition-colors group-hover:text-brand-strong">
                    {article.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Baca artikel
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
