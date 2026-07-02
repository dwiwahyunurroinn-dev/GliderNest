import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ArticleForm } from "../ArticleForm";
import { updateArticle } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <Link
        href="/admin/artikel"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-strong"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Edit Artikel
      </h1>
      <ArticleForm article={article} action={updateArticle.bind(null, article.id)} />
    </div>
  );
}
