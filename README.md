# GliderNest 🌙

Website e-commerce & branding untuk peternakan sugar glider. Dibangun dengan
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, berbahasa
Indonesia, dengan alur pemesanan via WhatsApp dan skema database yang sudah
disiapkan untuk PostgreSQL.

## Halaman

| Rute | Isi |
| --- | --- |
| `/` | Hero, poin kredibilitas, joey unggulan, proses adopsi, testimoni |
| `/gliders` | Katalog dengan filter status (tersedia / dipesan / terjual) |
| `/gliders/[slug]` | Detail glider: morph, umur, silsilah, harga, CTA WhatsApp |
| `/tentang` | Profil & standar penangkaran (halaman kredibilitas utama) |
| `/panduan` | Panduan perawatan — konten edukasi sekaligus SEO |
| `/kontak` | Kontak + FAQ |

SEO bawaan: metadata per halaman, Open Graph, `sitemap.xml`, `robots.txt`.

## Menjalankan di Arch Linux

```bash
# Node.js LTS (disarankan) — atau pakai nvm/fnm dari AUR untuk multi-versi
sudo pacman -S nodejs-lts-jod npm

git clone https://github.com/dwiwahyunurroinn-dev/GliderNest.git
cd GliderNest
npm install
npm run dev        # buka http://localhost:3000
```

Perintah lain: `npm run build` (produksi), `npm run lint`.

## Konfigurasi bisnis

Semua identitas bisnis ada di satu file: [`src/lib/site.ts`](src/lib/site.ts)
— ganti nomor WhatsApp, email, Instagram, alamat, dan tahun berdiri di sana.
Data glider ada di [`src/data/gliders.ts`](src/data/gliders.ts), testimoni dan
FAQ di [`src/data/content.ts`](src/data/content.ts).

Foto asli glider tinggal menggantikan komponen `GliderMark` (placeholder SVG)
dengan `next/image` ketika foto sudah siap.

## Arsitektur data: sekarang vs jangka panjang

**Fase 1 (sekarang):** konten disimpan sebagai file TypeScript statis.
Situs 100% statis (SSG) — cepat, gratis di-hosting, tanpa server database.
Untuk katalog berukuran puluhan ekor, ini pilihan paling tepat.

**Fase 2 (saat katalog membesar / butuh admin panel):** migrasi ke
**PostgreSQL + Prisma**. Skemanya sudah disiapkan di
[`prisma/schema.prisma`](prisma/schema.prisma) dan strukturnya identik dengan
tipe di `src/lib/types.ts`, jadi migrasinya hanya mengganti implementasi
fungsi di `src/data/gliders.ts` dengan query Prisma — halaman tidak berubah.

Rekomendasi penyedia PostgreSQL managed (keduanya modern, punya free tier,
dan sehat untuk jangka panjang):

- **Neon** — serverless Postgres, branching database, pas dengan Vercel.
- **Supabase** — Postgres + auth + storage foto + dashboard admin bawaan;
  cocok jika nanti ingin panel admin tanpa banyak koding.

Langkah aktivasi tertulis di komentar atas `prisma/schema.prisma`.

**Fase 3 (opsional):** pembayaran online via **Midtrans/Xendit**, panel admin
(mis. Supabase Studio atau route `/admin` dengan auth), dan upload foto ke
storage (Supabase Storage / Cloudflare R2).

## Deployment

Paling sederhana: **Vercel** (pembuat Next.js) — hubungkan repo GitHub ini,
otomatis deploy tiap push. Alternatif: Cloudflare Pages atau Netlify.
