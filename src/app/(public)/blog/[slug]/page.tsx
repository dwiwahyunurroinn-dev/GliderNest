import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { currentTime, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Artikel tidak ditemukan" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article || !article.published || article.publishAt > currentTime()) notFound();

  const others = await prisma.article.findMany({
    where: { published: true, publishAt: { lte: currentTime() }, slug: { not: slug } },
    orderBy: { publishAt: "desc" },
    take: 2,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-strong"
      >
        <ArrowLeft className="h-4 w-4" />
        Semua artikel
      </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-brand">
        Edukasi · {formatDate(article.createdAt)}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{article.excerpt}</p>

      {article.coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverUrl}
          alt={article.title}
          className="mt-8 w-full rounded-3xl border border-line object-cover"
        />
      )}

      <div className="mt-8 space-y-5 border-t border-line pt-8">
        {article.content.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-foreground/85">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-brand-soft/60 p-6 text-center">
        <p className="font-semibold">Punya pertanyaan tentang topik ini?</p>
        <p className="mt-1 text-sm text-muted">
          Konsultasi perawatan gratis — bahkan jika glider Anda bukan dari kami.
        </p>
        <Link
          href="/kontak"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Hubungi Kami
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {others.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Artikel lainnya
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/blog/${o.slug}`}
                className="rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs text-muted">{formatDate(o.createdAt)}</p>
                <p className="mt-1.5 font-semibold leading-snug">{o.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
