# 🚀 Panduan Deploy GliderNest di aaPanel

GliderNest adalah aplikasi **Next.js (Node.js)** — bukan web PHP biasa. Jadi di
aaPanel kita tidak cukup "upload file", tapi menjalankannya sebagai **aplikasi
Node.js** yang dijaga oleh **PM2**, lalu Apache/Nginx bertugas meneruskan
pengunjung ke aplikasi tersebut (reverse proxy).

> ✅ Kabar baik: database (SQLite) dan foto upload tersimpan sebagai **file di
> disk server**, jadi cocok untuk VPS + aaPanel. Data tidak akan hilang selama
> server hidup. (Ini sebabnya aaPanel/VPS lebih cocok daripada Vercel.)

Spesifikasi server Anda (4 core, 4 GB RAM, disk 57 GB) sudah lebih dari cukup.

---

## Ringkasan alur (gambaran besar)

```
Pengunjung → Domain → Apache/Nginx (port 80/443) → reverse proxy → Node.js (port 3000)
```

Langkahnya: **① pasang Node.js → ② ambil kode → ③ install & build → ④ jalankan
dengan PM2 → ⑤ arahkan domain (reverse proxy) → ⑥ pasang SSL.**

---

## ① Pasang Node.js di aaPanel

1. Masuk aaPanel → menu **App Store**.
2. Cari **"Node.js version manager"** (atau **"PM2 Manager"**) → **Install**.
3. Setelah terpasang, buka aplikasinya → **Install a Node version** →
   pilih **Node 22 (LTS)** → Install.

> Node 22 direkomendasikan karena Next.js 16 butuh Node versi baru.

---

## ② Ambil kode proyek ke server

Cara termudah: lewat **Terminal** aaPanel (menu **Terminal** di sidebar).

```bash
# masuk ke folder web aaPanel
cd /www/wwwroot

# ambil kode dari GitHub Anda
git clone https://github.com/dwiwahyunurroinn-dev/glidernest.git
cd glidernest

# pakai branch yang berisi versi final
git checkout claude/sugar-glider-ecommerce-site-sx1fck
```

> Kalau repo Anda privat, GitHub akan minta username + **Personal Access Token**
> (bukan password biasa). Atau, alternatifnya, upload folder proyek dalam bentuk
> `.zip` lewat menu **Files** lalu extract.

---

## ③ Buat file .env, install, dan build

Masih di Terminal, di dalam folder `glidernest`:

```bash
# 1) buat file konfigurasi rahasia
cp .env.example .env

# 2) buat AUTH_SECRET acak yang kuat, lalu catat hasilnya
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Buka file `.env` (lewat menu **Files** atau `nano .env`) dan isi:

```env
# WAJIB diganti — ini password login /admin
ADMIN_PASSWORD=BuatPasswordKuatAndaSendiri

# tempel hasil acak dari perintah di atas
AUTH_SECRET=xxxxxxxxxxxxxxxx_hasil_acak_tadi

# domain final Anda (untuk SEO & sitemap)
SITE_URL=https://domain-anda.com
```

Lalu jalankan (pakai path lengkap Node dari aaPanel bila `npm` tidak dikenali —
lihat catatan di bawah):

```bash
# install semua kebutuhan
npm install

# siapkan database + isi data awal (hanya perlu sekali)
npm run setup

# build versi produksi (agak lama, tunggu sampai selesai)
npm run build
```

> 💡 **Kalau muncul `npm: command not found`:** Node dari aaPanel biasanya ada di
> path seperti `/www/server/nodejs/v22.x.x/bin`. Tambahkan ke PATH:
> ```bash
> export PATH=/www/server/nodejs/v22.x.x/bin:$PATH
> ```
> (sesuaikan `v22.x.x` dengan versi yang tampil di PM2 Manager).

---

## ④ Jalankan dengan PM2 (agar tetap hidup 24 jam)

**Cara lewat tampilan PM2 Manager (disarankan):**

1. Buka **PM2 Manager** → **Add Project**.
2. Isi:
   - **Project directory:** `/www/wwwroot/glidernest`
   - **Startup file / Run command:** `npm start`
     (atau **Script:** `start`)
   - **Project name:** `glidernest`
   - **Port:** `3000`
3. Klik **Submit / Run**. Status harus **online (hijau)**.

**Atau lewat Terminal:**

```bash
npm install -g pm2         # bila pm2 belum ada
pm2 start npm --name glidernest -- start
pm2 save                   # ingat aplikasi ini saat server restart
pm2 startup                # ikuti perintah yang muncul
```

Cek jalan atau tidak:

```bash
pm2 status
curl http://127.0.0.1:3000    # harus keluar kode HTML
```

---

## ⑤ Arahkan domain ke aplikasi (Reverse Proxy)

1. Pastikan domain Anda sudah diarahkan (A record) ke IP server ini.
2. aaPanel → **Website** → **Add site**:
   - **Domain:** `domain-anda.com`
   - Tipe PHP boleh apa saja (tidak dipakai) — buat site kosong dulu.
3. Klik site tersebut → tab **Reverse Proxy** → **Add reverse proxy**:
   - **Target URL:** `http://127.0.0.1:3000`
   - **Send Domain:** `$host`
   - Simpan.

Sekarang buka `http://domain-anda.com` — website GliderNest harus tampil. 🎉

---

## ⑥ Pasang SSL (HTTPS gratis)

1. Di site yang sama → tab **SSL** → **Let's Encrypt**.
2. Centang domain → **Apply**.
3. Aktifkan **Force HTTPS**.

Selesai — situs Anda kini aman di `https://`.

---

## 🔄 Cara update website nanti (setelah ada perubahan kode)

```bash
cd /www/wwwroot/glidernest
git pull
npm install
npm run build
pm2 restart glidernest
```

> Database (`prisma/dev.db`) dan foto (`public/uploads`) **tidak** ikut terhapus
> saat update — aman.

---

## 🛟 Kalau ada masalah

| Gejala | Cek ini |
|---|---|
| Halaman "502 Bad Gateway" | Aplikasi Node mati → `pm2 status`, `pm2 restart glidernest`, lihat `pm2 logs glidernest` |
| `npm: command not found` | Set PATH ke folder Node (lihat catatan langkah ③) |
| Build gagal / kehabisan memori | Jarang di 4 GB, tapi bisa tambah swap lewat aaPanel |
| Login /admin gagal | Cek `ADMIN_PASSWORD` di `.env`, lalu `pm2 restart glidernest` |
| Domain belum tampil | Pastikan A record domain sudah mengarah ke IP server & reverse proxy ke `127.0.0.1:3000` |

---

## 📦 Yang penting diingat

- **Backup rutin** file `prisma/dev.db` (isi seluruh data) dan folder
  `public/uploads` (semua foto). Bisa lewat menu **Cron** aaPanel untuk backup
  otomatis.
- Jangan lupa **ganti `ADMIN_PASSWORD`** dan **isi `AUTH_SECRET`** sebelum online.
