import { Star, Plus, Eye, EyeOff } from "lucide-react";
import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import {
  createTestimonial,
  deleteTestimonial,
  toggleTestimonial,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Testimoni
      </h1>
      <p className="mt-1 text-sm text-muted">
        Tambahkan testimoni dari adopter dan atur mana yang tampil di website.
      </p>

      <form
        action={createTestimonial}
        className="mt-6 space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="name" className={labelCls}>Nama</label>
            <input id="name" name="name" required placeholder="Rani P." className={inputCls} />
          </div>
          <div>
            <label htmlFor="city" className={labelCls}>Kota</label>
            <input id="city" name="city" placeholder="Jakarta" className={inputCls} />
          </div>
          <div>
            <label htmlFor="rating" className={labelCls}>Rating (1–5)</label>
            <input
              id="rating"
              name="rating"
              type="number"
              min={1}
              max={5}
              defaultValue={5}
              className={inputCls}
            />
          </div>
        </div>
        <div>
          <label htmlFor="quote" className={labelCls}>Isi testimoni</label>
          <textarea id="quote" name="quote" rows={3} required className={inputCls} />
        </div>
        <button type="submit" className={btnPrimary}>
          <Plus className="h-4 w-4" />
          Tambah Testimoni
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`rounded-3xl border border-line bg-surface p-5 shadow-sm ${
              t.published ? "" : "opacity-60"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <p className="font-semibold">
                  {t.name}
                  {t.city && (
                    <span className="ml-2 text-sm font-normal text-muted">
                      {t.city}
                    </span>
                  )}
                </p>
                <span className="flex gap-0.5 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <form action={toggleTestimonial.bind(null, t.id)}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                  >
                    {t.published ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Sembunyikan
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Tampilkan
                      </>
                    )}
                  </button>
                </form>
                <form action={deleteTestimonial.bind(null, t.id)}>
                  <DeleteButton label={`testimoni dari ${t.name}`} />
                </form>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">“{t.quote}”</p>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada testimoni.
          </p>
        )}
      </div>
    </div>
  );
}
