import Link from "next/link";
import { Plus, Pencil, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { currentTime, formatDate } from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { btnPrimary, inputCls } from "@/components/admin/ui";
import { deleteArticle } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const all = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
  const query = q.trim().toLowerCase();
  const articles = query
    ? all.filter((a) => a.title.toLowerCase().includes(query))
    : all;

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

      <form action="/admin/artikel" className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari judul artikel…"
            className={`${inputCls} mt-0 pl-10`}
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Cari
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {articles.map((a) => (
          <div
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-surface px-6 py-4 shadow-sm"
          >
            <div className="min-w-0">
              <p className="font-semibold">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted">
                {formatDate(a.publishAt)} ·{" "}
                {!a.published ? (
                  <span className="font-semibold text-amber-600">Draf</span>
                ) : a.publishAt > currentTime() ? (
                  <span className="font-semibold text-sky-600">
                    Terjadwal ⏱
                  </span>
                ) : (
                  <span className="font-semibold text-brand">Tayang</span>
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
