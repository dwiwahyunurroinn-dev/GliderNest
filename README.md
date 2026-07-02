# GliderNest 🌿

Website e-commerce & branding untuk peternakan sugar glider — lengkap dengan
**panel admin**, **database**, **sistem pemesanan**, maskot, dan tema hijau
premium. Dibangun dengan Next.js 16 (App Router) + TypeScript + Tailwind CSS
v4 + Prisma (SQLite).

## Cara menjalankan (Arch Linux)

```bash
git clone https://github.com/dwiwahyunurroinn-dev/GliderNest.git
cd GliderNest
git checkout claude/sugar-glider-ecommerce-site-sx1fck

npm install     # install semua dependensi
npm run setup   # buat database + isi data contoh (cukup sekali)
npm run dev     # jalankan → buka http://localhost:3000
```

Jika sudah pernah clone, cukup: `git pull`, lalu `npm install && npm run setup`
sekali, kemudian `npm run dev` seperti biasa.

## Halaman publik

| Rute | Isi |
| --- | --- |
| `/` | Beranda: hero + maskot, keunggulan, joey unggulan, galeri berjalan, blog, testimoni |
| `/sugar-glider` | Katalog dengan filter status + halaman detail per glider |
| `/blog` | Blog edukasi (artikel dikelola dari admin) |
| `/galeri` | Galeri foto (dikelola dari admin) |
| `/testimoni` | Testimoni adopter (dikelola dari admin) |
| `/reseller` | Program reseller: benefit & syarat kemitraan |
| `/cara-memesan` | Panduan memesan + metode pembayaran |
| `/pesan` | **Form pemesanan** → kode pesanan + instruksi pembayaran (QRIS / transfer / DANA) |
| `/kontak` | Kontak, Google Maps, dan FAQ |

## Panel admin — `/admin`

Password bawaan: **`glidernest123`** (ganti lewat file `.env`, lihat
`.env.example`).

- **Dashboard** — statistik & pesanan terbaru
- **CRUD Sugar Glider** — tambah/edit/hapus, upload foto, tandai unggulan
- **Pesanan** — ubah status (menunggu → diproses → dikirim → selesai / batal);
  status glider ikut tersinkron otomatis
- **CRUD Artikel** — tulis konten blog edukasi
- **CRUD Galeri** — unggah/hapus foto
- **CRUD Testimoni** — tambah, tampilkan/sembunyikan, hapus
- **Pengaturan Website** — nama situs, WhatsApp, Instagram, alamat,
  **link embed Google Maps**, gambar **QRIS**, rekening bank, nomor DANA

## Tentang pembayaran

Pesanan tercatat di database dan pembeli langsung menerima instruksi
pembayaran sesuai metode yang dipilih (QRIS / transfer bank / DANA) beserta
kode pesanan, lalu konfirmasi bukti bayar via WhatsApp. Gambar QRIS dan nomor
rekening diatur sendiri di **Admin → Pengaturan**.

Integrasi pembayaran otomatis (Midtrans/Xendit) bisa ditambahkan nanti setelah
memiliki akun merchant — struktur `Order` di database sudah siap untuk itu.

## Database

- **Sekarang:** SQLite (file `prisma/dev.db`) — nol instalasi, cocok untuk
  pengembangan lokal. Skema di `prisma/schema.prisma`, data contoh di
  `prisma/seed.ts`.
- **Produksi nanti:** ganti ke PostgreSQL (Neon/Supabase) dengan mengganti
  provider datasource + driver adapter; halaman tidak perlu diubah karena
  semua akses lewat Prisma. Upload foto juga perlu dipindah ke storage
  (Supabase Storage / Cloudflare R2) saat deploy ke platform serverless.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Mode pengembangan (http://localhost:3000) |
| `npm run setup` | Buat/perbarui database + data contoh |
| `npm run build` / `npm start` | Build & jalankan versi produksi |
| `npm run lint` | Cek kualitas kode |
