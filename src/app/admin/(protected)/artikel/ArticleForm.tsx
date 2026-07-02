import type { Article } from "@/generated/prisma/client";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";

export function ArticleForm({
  article,
  action,
}: {
  article?: Article;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="mt-6 space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="title" className={labelCls}>Judul</label>
        <input id="title" name="title" required defaultValue={article?.title} className={inputCls} />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelCls}>
          Ringkasan <span className="font-normal text-muted">(muncul di daftar artikel)</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          required
          defaultValue={article?.excerpt}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="content" className={labelCls}>
          Isi artikel{" "}
          <span className="font-normal text-muted">
            (pisahkan paragraf dengan baris kosong)
          </span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={14}
          required
          defaultValue={article?.content}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cover" className={labelCls}>
          Gambar sampul{" "}
          <span className="font-normal text-muted">
            {article?.coverUrl ? "(kosongkan jika tidak ingin mengganti)" : "(opsional)"}
          </span>
        </label>
        <input id="cover" name="cover" type="file" accept="image/*" className={inputCls} />
        {article?.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverUrl}
            alt={article.title}
            className="mt-3 h-28 w-44 rounded-2xl border border-line object-cover"
          />
        )}
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article ? article.published : true}
          className="h-4 w-4 accent-[var(--brand)]"
        />
        Terbitkan (tampil di website)
      </label>

      <button type="submit" className={btnPrimary}>
        {article ? "Simpan Perubahan" : "Terbitkan Artikel"}
      </button>
    </form>
  );
}
