import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "../ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
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
        Tulis Artikel Baru
      </h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}
