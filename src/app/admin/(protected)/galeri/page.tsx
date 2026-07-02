import { ImagePlus } from "lucide-react";
import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { createGalleryItem, deleteGalleryItem } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Galeri
      </h1>
      <p className="mt-1 text-sm text-muted">
        Unggah foto joey, kandang, dan aktivitas — foto tampil di beranda dan
        halaman galeri.
      </p>

      <form
        action={createGalleryItem}
        className="mt-6 grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <div>
          <label htmlFor="title" className={labelCls}>Judul foto</label>
          <input
            id="title"
            name="title"
            required
            placeholder="Joey Leucistic usia 3 bulan"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="image" className={labelCls}>File foto</label>
          <input id="image" name="image" type="file" accept="image/*" required className={inputCls} />
        </div>
        <button type="submit" className={`${btnPrimary} justify-center`}>
          <ImagePlus className="h-4 w-4" />
          Unggah
        </button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.id}
            className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-44 w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="truncate text-sm font-medium">{item.title}</span>
              <form action={deleteGalleryItem.bind(null, item.id)}>
                <DeleteButton label="foto ini" />
              </form>
            </figcaption>
          </figure>
        ))}
        {items.length === 0 && (
          <p className="col-span-full rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Galeri masih kosong.
          </p>
        )}
      </div>
    </div>
  );
}
