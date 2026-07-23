# 📝 Panduan Edit Narasi & Konten Website GliderNest

Panduan ini menjelaskan **di mana Anda bisa mengubah teks/narasi** yang tampil
di website. Ada **dua cara**:

1. **Lewat Panel Admin** (paling mudah, tanpa ngoding) — untuk identitas bisnis,
   kontak, produk, artikel, dsb.
2. **Lewat file kode** (butuh VS Code) — untuk kalimat statis yang sudah
   "tertanam" di halaman, seperti judul hero, poin keunggulan, langkah pemesanan.

> 💡 **Aturan emas saat edit kode:** ubah **hanya tulisan di antara tanda kutip
> `"..."` atau di antara tag `>...<`**. Jangan menghapus tanda kurung, koma,
> kurung kurawal `{ }`, atau nama komponen. Kalau ragu, ubah satu kalimat,
> simpan, lalu lihat hasilnya.

---

## BAGIAN 1 — Yang bisa diubah dari PANEL ADMIN (tanpa ngoding)

Buka **`/admin`** → login → menu di bawah ini. Perubahan langsung tersimpan ke
database dan tampil di website. **Ini cara yang disarankan** untuk konten yang
sering berubah.

| Yang ingin diubah | Menu Admin |
|---|---|
| Nama website, tagline/slogan, logo, favicon, maskot | **Pengaturan** |
| Nomor WhatsApp, Instagram, email, alamat, jam buka, link Maps | **Pengaturan** |
| Metode bayar: QRIS, rekening bank, DANA, area COD, rekber | **Pengaturan** |
| Password admin (Keamanan) | **Pengaturan → Keamanan** |
| Katalog sugar glider (nama, morph, harga, foto, stok, deskripsi) | **Sugar Glider & Stok** |
| Indukan & silsilah/pedigree | **Indukan & Silsilah** |
| Artikel blog (judul, isi, jadwal terbit) | **Artikel Blog** |
| Foto galeri | **Galeri** |
| Testimoni pembeli | **Testimoni** |
| Gambar background halaman | **Background** |

👉 **Kalau yang ingin Anda ubah ada di tabel ini, cukup lewat panel admin —
tidak perlu menyentuh kode sama sekali.**

---

## BAGIAN 2 — Kalimat statis yang ada di FILE KODE

Kalimat berikut "menyatu" dengan desain halaman, jadi harus diubah lewat VS Code.
Semua file ada di folder **`src/app/(public)/`**.

### 🏠 Halaman Beranda
**File:** `src/app/(public)/page.tsx`

Berisi:
- Judul besar (hero) & sub-judulnya
- **4 poin keunggulan** — cari `const trustPoints` (mis. "100% Captive-Bred",
  "Silsilah Tercatat", "Garansi Kesehatan", "Pendampingan Seumur Hidup")
- **Langkah pemesanan** — cari `const orderSteps` ("Pilih & Konsultasi",
  "Video Verifikasi", "Pembayaran Fleksibel", "Kirim & Dampingi")
- Judul-judul bagian ("Glider lain yang tersedia", dll.)

### ℹ️ Tentang Kami
**File:** `src/app/(public)/tentang-kami/page.tsx`
Cerita/profil peternakan, visi-misi, nilai-nilai.

### 📞 Kontak & FAQ
**File:** `src/app/(public)/kontak/page.tsx`
Teks pengantar halaman kontak **dan daftar pertanyaan-jawaban (FAQ)**.
(Nomor WA, IG, alamat sendiri diambil otomatis dari **Pengaturan**.)

### 🛒 Cara Memesan
**File:** `src/app/(public)/cara-memesan/page.tsx`
Penjelasan langkah-langkah cara pemesanan.

### 🤝 Reseller
**File:** `src/app/(public)/reseller/page.tsx`
Keuntungan & syarat menjadi reseller.

### 🖼️ Galeri (teks pengantar)
**File:** `src/app/(public)/galeri/page.tsx`
Judul & deskripsi halaman galeri. (Fotonya dari menu **Galeri** admin.)

### 💬 Testimoni (teks pengantar)
**File:** `src/app/(public)/testimoni/page.tsx`
Judul & deskripsi halaman. (Isi testimoni dari menu **Testimoni** admin.)

### 📰 Blog (teks pengantar)
**File:** `src/app/(public)/blog/page.tsx` — judul & pengantar halaman daftar blog.
**File:** `src/app/(public)/blog/[slug]/page.tsx` — kerangka tampilan 1 artikel.
(Isi artikel sendiri dari menu **Artikel Blog** admin.)

### 🐿️ Katalog & Detail Glider (teks pengantar)
**File:** `src/app/(public)/sugar-glider/page.tsx` — judul & pengantar katalog.
**File:** `src/app/(public)/sugar-glider/[slug]/page.tsx` — kerangka halaman detail
(mis. kalimat garansi: "Termasuk: kartu identitas & silsilah, paket pakan awal…").
(Data tiap glider dari menu **Sugar Glider & Stok** admin.)

### 🧾 Halaman Pesan / Checkout / Invoice
- `src/app/(public)/pesan/page.tsx` — form pemesanan
- `src/app/(public)/pesan/[code]/page.tsx` — halaman status pesanan
- `src/app/(public)/pesan/[code]/invoice/page.tsx` — tampilan invoice

### 📜 Halaman Hukum
- `src/app/(public)/kebijakan-privasi/page.tsx` — Kebijakan Privasi
- `src/app/(public)/syarat-ketentuan/page.tsx` — Syarat & Ketentuan

---

## BAGIAN 3 — Teks lain yang berguna

### 💚 Template balasan WhatsApp cepat
**File:** `src/lib/wa-templates.ts`
Kalimat balasan WA otomatis per status pesanan (mis. konfirmasi bayar, "sudah
dikirim", follow-up). Ubah teks di antara tanda kutip untuk mengganti gaya bahasa.

### 🐣 Perhitungan estimasi breeding
**File:** `src/lib/breeding.ts`
Angka perkiraan (masa kandungan `GESTATION_DAYS`, keluar kantung `OOP_DAYS`).
Ubah hanya bila memang ingin menyesuaikan hitungan estimasi.

---

## 🔎 Cara cepat menemukan sebuah kalimat di VS Code

Kalau Anda melihat sebuah kalimat di website tapi tidak tahu file-nya:

1. Buka VS Code di folder proyek.
2. Tekan **`Ctrl` + `Shift` + `F`** (Windows/Linux) — kotak pencarian seluruh
   proyek.
3. Ketik sepotong kalimat yang Anda lihat, mis. `Sahabat kecil`.
4. Klik hasilnya → VS Code langsung membuka file & barisnya.
5. Ubah tulisannya, tekan **`Ctrl` + `S`** untuk simpan.

---

## ✅ Setelah mengedit kode

1. Simpan file (`Ctrl` + `S`).
2. Kalau server dev sedang jalan (`npm run dev`), halaman otomatis ter-refresh —
   cukup buka ulang browser.
3. Kalau sudah puas, **commit** perubahan agar tersimpan permanen:
   ```bash
   git add -A
   git commit -m "Perbarui narasi halaman"
   git push
   ```

> ⚠️ **Kalau setelah edit muncul error / halaman blank:** kemungkinan ada tanda
> kutip atau kurung yang tidak sengaja terhapus. Batalkan perubahan terakhir
> dengan `Ctrl` + `Z`, simpan lagi, lalu cek kembali.
