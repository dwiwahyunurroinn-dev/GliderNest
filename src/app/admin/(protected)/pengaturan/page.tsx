import { CheckCircle2, Save } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/ImageInput";
import { updateSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSettings(), searchParams]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Pengaturan Website
      </h1>
      <p className="mt-1 text-sm text-muted">
        Identitas bisnis, kontak, lokasi maps, dan informasi pembayaran.
      </p>

      {saved && (
        <p className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3 text-sm font-semibold text-brand-strong">
          <CheckCircle2 className="h-4 w-4" />
          Pengaturan berhasil disimpan.
        </p>
      )}

      <form action={updateSettings} className="mt-6 space-y-8">
        <section className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-semibold">Identitas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="siteName" className={labelCls}>Nama website</label>
              <input id="siteName" name="siteName" defaultValue={settings.siteName} className={inputCls} />
            </div>
            <div>
              <label htmlFor="tagline" className={labelCls}>Tagline</label>
              <input id="tagline" name="tagline" defaultValue={settings.tagline} className={inputCls} />
            </div>
            <div>
              <label htmlFor="foundedYear" className={labelCls}>Tahun berdiri</label>
              <input
                id="foundedYear"
                name="foundedYear"
                type="number"
                defaultValue={settings.foundedYear}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className={labelCls}>Deskripsi singkat</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={settings.description}
              className={inputCls}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-semibold">Logo & Maskot</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="logoImage" className={labelCls}>
                Logo website{" "}
                <span className="font-normal text-muted">
                  (tampil di header & footer; disarankan persegi/bulat)
                </span>
              </label>
              <ImageInput id="logoImage" name="logoImage" previewHeight="h-32" />
              {settings.logoUrl ? (
                <div className="mt-3 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings.logoUrl}
                    alt="Logo"
                    className="h-16 w-16 rounded-full border border-line object-cover"
                  />
                  <label className="flex items-center gap-2 text-xs font-medium text-red-600">
                    <input type="checkbox" name="resetLogo" className="h-3.5 w-3.5 accent-red-600" />
                    Hapus & kembalikan ke ikon bawaan
                  </label>
                </div>
              ) : (
                <p className="mt-1.5 text-xs text-muted">
                  Belum ada logo — saat ini memakai ikon bawaan.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="mascotImage" className={labelCls}>
                Gambar maskot{" "}
                <span className="font-normal text-muted">
                  (opsional — saat ini halaman publik tampil tanpa maskot;
                  gambar disimpan untuk kebutuhan mendatang)
                </span>
              </label>
              <ImageInput id="mascotImage" name="mascotImage" previewHeight="h-32" />
              {settings.mascotUrl ? (
                <div className="mt-3 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings.mascotUrl}
                    alt="Maskot"
                    className="h-16 w-16 rounded-2xl border border-line object-contain"
                  />
                  <label className="flex items-center gap-2 text-xs font-medium text-red-600">
                    <input type="checkbox" name="resetMascot" className="h-3.5 w-3.5 accent-red-600" />
                    Hapus & kembalikan ke maskot bawaan
                  </label>
                </div>
              ) : (
                <p className="mt-1.5 text-xs text-muted">
                  Belum ada gambar maskot tersimpan.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-semibold">Kontak & Lokasi</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="whatsapp" className={labelCls}>
                Nomor WhatsApp{" "}
                <span className="font-normal text-muted">(format 628xxx)</span>
              </label>
              <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} className={inputCls} />
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>Email</label>
              <input id="email" name="email" type="email" defaultValue={settings.email} className={inputCls} />
            </div>
            <div>
              <label htmlFor="instagram" className={labelCls}>
                Instagram <span className="font-normal text-muted">(tanpa @)</span>
              </label>
              <input id="instagram" name="instagram" defaultValue={settings.instagram} className={inputCls} />
            </div>
            <div>
              <label htmlFor="openHours" className={labelCls}>Jam operasional</label>
              <input id="openHours" name="openHours" defaultValue={settings.openHours} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="address" className={labelCls}>Alamat</label>
            <input id="address" name="address" defaultValue={settings.address} className={inputCls} />
          </div>
          <div>
            <label htmlFor="mapsEmbedUrl" className={labelCls}>
              Link embed Google Maps
            </label>
            <input
              id="mapsEmbedUrl"
              name="mapsEmbedUrl"
              defaultValue={settings.mapsEmbedUrl}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className={inputCls}
            />
            <p className="mt-1.5 text-xs text-muted">
              Cara mendapatkan: buka Google Maps → cari lokasi Anda → Bagikan →
              “Sematkan peta” → salin nilai yang ada di dalam src=&quot;...&quot;.
              Peta akan tampil otomatis di halaman Kontak.
            </p>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h2 className="font-semibold">Pembayaran</h2>
          <div>
            <label htmlFor="qrisImage" className={labelCls}>
              Gambar QRIS{" "}
              <span className="font-normal text-muted">
                {settings.qrisImageUrl
                  ? "(kosongkan jika tidak ingin mengganti)"
                  : "(unggah gambar kode QR dari penyedia QRIS Anda)"}
              </span>
            </label>
            <ImageInput id="qrisImage" name="qrisImage" previewHeight="h-56" />
            {settings.qrisImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.qrisImageUrl}
                alt="QRIS"
                className="mt-3 h-40 w-40 rounded-2xl border border-line object-contain"
              />
            )}
          </div>
          <div>
            <label htmlFor="bankAccounts" className={labelCls}>
              Rekening bank{" "}
              <span className="font-normal text-muted">
                (satu per baris, format: BANK|NOMOR|ATAS NAMA)
              </span>
            </label>
            <textarea
              id="bankAccounts"
              name="bankAccounts"
              rows={3}
              defaultValue={settings.bankAccounts}
              placeholder={"BCA|1234567890|GliderNest\nBRI|0987654321|GliderNest"}
              className={`${inputCls} font-mono`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="danaNumber" className={labelCls}>Nomor DANA</label>
              <input id="danaNumber" name="danaNumber" defaultValue={settings.danaNumber} className={inputCls} />
            </div>
            <div>
              <label htmlFor="danaName" className={labelCls}>Nama akun DANA</label>
              <input id="danaName" name="danaName" defaultValue={settings.danaName} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="codArea" className={labelCls}>
              Area layanan COD{" "}
              <span className="font-normal text-muted">
                (kosongkan jika tidak melayani COD)
              </span>
            </label>
            <input
              id="codArea"
              name="codArea"
              defaultValue={settings.codArea}
              placeholder="Sleman, Kota Yogyakarta, dan Bantul"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="rekberInfo" className={labelCls}>
              Jasa rekber yang didukung{" "}
              <span className="font-normal text-muted">(satu per baris)</span>
            </label>
            <textarea
              id="rekberInfo"
              name="rekberInfo"
              rows={3}
              defaultValue={settings.rekberInfo}
              placeholder={"Rekber Tokopedia/Shopee (checkout via marketplace)\nRekberID\nAdmin grup komunitas sugar glider"}
              className={inputCls}
            />
          </div>
        </section>

        <button type="submit" className={btnPrimary}>
          <Save className="h-4 w-4" />
          Simpan Semua Pengaturan
        </button>
      </form>
    </div>
  );
}
