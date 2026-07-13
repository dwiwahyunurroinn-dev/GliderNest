import type { Article } from "@/generated/prisma/client";
import { toDatetimeLocal } from "@/lib/format";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/ImageInput";

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
        <ImageInput id="cover" name="cover" aspect={16 / 9} />
        {article?.coverUrl && (
          <div className="mt-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverUrl}
              alt={article.title}
              className="h-20 w-32 rounded-2xl border border-line object-cover"
            />
            <span className="text-xs text-muted">Sampul saat ini</span>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex items-center gap-2.5 text-sm font-medium">
          <input
            type="checkbox"
            name="published"
            defaultChecked={article ? article.published : true}
            className="h-4 w-4 accent-[var(--brand)]"
          />
          Terbitkan (hapus centang = simpan sebagai draf)
        </label>
        <div>
          <label htmlFor="publishAt" className={labelCls}>
            Jadwal terbit{" "}
            <span className="font-normal text-muted">
              (isi waktu di masa depan untuk menjadwalkan; artikel tampil
              otomatis saat waktunya tiba)
            </span>
          </label>
          <input
            id="publishAt"
            name="publishAt"
            type="datetime-local"
            defaultValue={article ? toDatetimeLocal(article.publishAt) : undefined}
            className={inputCls}
          />
        </div>
      </div>

      <button type="submit" className={btnPrimary}>
        {article ? "Simpan Perubahan" : "Terbitkan Artikel"}
      </button>
    </form>
  );
}
