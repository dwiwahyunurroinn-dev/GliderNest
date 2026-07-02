import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { btnPrimary } from "@/components/admin/ui";
import { deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Artikel Blog
          </h1>
          <p className="mt-1 text-sm text-muted">
            Konten edukasi untuk membangun kredibilitas dan SEO.
          </p>
        </div>
        <Link href="/admin/artikel/baru" className={btnPrimary}>
          <Plus className="h-4 w-4" />
          Tulis Artikel
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {articles.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-surface px-6 py-4 shadow-sm"
          >
            <div className="min-w-0">
              <p className="font-semibold">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted">
                {formatDate(a.createdAt)} ·{" "}
                {a.published ? (
                  <span className="font-semibold text-brand">Terbit</span>
                ) : (
                  <span className="font-semibold text-amber-600">Draf</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href={`/admin/artikel/${a.id}`}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
              <form action={deleteArticle.bind(null, a.id)}>
                <DeleteButton label={`artikel "${a.title}"`} />
              </form>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada artikel.
          </p>
        )}
      </div>
    </div>
  );
}
