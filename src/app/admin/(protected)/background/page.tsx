import { ImagePlus, CheckCircle2, Circle } from "lucide-react";
import { prisma } from "@/lib/db";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ImageInput } from "@/components/admin/ImageInput";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import {
  createBackground,
  deleteBackground,
  setActiveBackground,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBackgroundPage() {
  const backgrounds = await prisma.background.findMany({
    orderBy: [{ active: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Background Website
      </h1>
      <p className="mt-1 text-sm text-muted">
        Kelola foto latar hero beranda dan kartu ilustrasi di halaman Tentang
        Kami & Reseller. Hanya satu background yang aktif — klik “Jadikan
        Aktif” untuk menggantinya. Disarankan foto lanskap minimal 1920px,
        sisi kiri tidak terlalu ramai agar teks tetap terbaca.
      </p>

      <form
        action={createBackground}
        className="mt-6 space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm"
      >
        <div>
          <label htmlFor="title" className={labelCls}>Nama background</label>
          <input
            id="title"
            name="title"
            required
            placeholder="Hutan pagi berkabut"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="image" className={labelCls}>File foto</label>
          <ImageInput id="image" name="image" required previewHeight="h-56" />
        </div>
        <label className="flex items-center gap-2.5 text-sm font-medium">
          <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-[var(--brand)]" />
          Langsung jadikan background aktif
        </label>
        <button type="submit" className={btnPrimary}>
          <ImagePlus className="h-4 w-4" />
          Unggah Background
        </button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {backgrounds.map((bg) => (
          <figure
            key={bg.id}
            className={`overflow-hidden rounded-3xl border bg-surface shadow-sm ${
              bg.active ? "border-brand ring-2 ring-brand/30" : "border-line"
            }`}
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bg.imageUrl}
                alt={bg.title}
                className="h-44 w-full object-cover"
              />
              {bg.active && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Aktif
                </span>
              )}
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="truncate text-sm font-semibold">{bg.title}</span>
              <span className="flex shrink-0 items-center gap-1">
                {!bg.active && (
                  <form action={setActiveBackground.bind(null, bg.id)}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                    >
                      <Circle className="h-3.5 w-3.5" />
                      Jadikan Aktif
                    </button>
                  </form>
                )}
                <form action={deleteBackground.bind(null, bg.id)}>
                  <DeleteButton label={`background "${bg.title}"`} />
                </form>
              </span>
            </figcaption>
          </figure>
        ))}
        {backgrounds.length === 0 && (
          <p className="col-span-full rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada background. Unggah foto pertama Anda — sebelum itu,
            website memakai foto bawaan.
          </p>
        )}
      </div>
    </div>
  );
}
