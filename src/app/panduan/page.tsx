import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const metadata: Metadata = {
  title: "Panduan Perawatan Sugar Glider",
  description:
    "Panduan lengkap merawat sugar glider untuk pemula: kandang, pakan, bonding, kesehatan, dan kesalahan umum yang harus dihindari.",
};

const sections = [
  {
    title: "Kandang & lingkungan",
    points: [
      "Minimal 60×60×90 cm untuk sepasang — makin tinggi makin baik, karena glider memanjat dan meluncur.",
      "Tempatkan di ruangan bersuhu 24–28°C, jauh dari AC langsung, asap dapur, dan sinar matahari terik.",
      "Wajib ada sleeping pouch (kantong tidur), mainan foraging, dan wheel khusus glider (bukan wheel hamster berjeruji).",
      "Bersihkan alas kandang 2–3 hari sekali; hindari pembersih beraroma tajam.",
    ],
  },
  {
    title: "Pakan harian",
    points: [
      "Basis diet: bubur HPW/BML termodifikasi atau protokol setara — bukan hanya buah.",
      "Tambahkan buah & sayur segar bergantian (pepaya, apel tanpa biji, jagung manis, wortel).",
      "Protein serangga 2–3× seminggu: jangkrik atau ulat hongkong secukupnya.",
      "Hindari: cokelat, bawang, kafein, makanan asin/berbumbu, dan biji apel. Air bersih harus selalu tersedia.",
    ],
  },
  {
    title: "Bonding & sosialisasi",
    points: [
      "Minggu pertama: biarkan glider beradaptasi; dekati dengan suara lembut, jangan dipaksa dipegang.",
      "Gunakan bonding pouch yang dibawa beraktivitas 1–2 jam sehari agar glider hafal aroma Anda.",
      "Beri treat dari tangan (misal ulat hongkong) untuk membangun asosiasi positif.",
      "Glider adalah hewan koloni — idealnya dipelihara minimal berpasangan agar tidak stres dan depresi.",
    ],
  },
  {
    title: "Kesehatan & tanda bahaya",
    points: [
      "Timbang berat badan mingguan; penurunan drastis adalah alarm pertama.",
      "Waspadai: lemas di siang-malam, bulu kusam, kotoran cair >24 jam, atau kejang (indikasi kekurangan kalsium/HLP).",
      "Cari dokter hewan eksotik terdekat sebelum darurat terjadi — kami bantu rekomendasikan.",
      "Jangan pernah memberi obat manusia tanpa arahan dokter hewan.",
    ],
  },
  {
    title: "Kesalahan umum pemula",
    points: [
      "Membeli joey terlalu muda (di bawah 2,5 bulan OOP) — risiko kematian tinggi.",
      "Memberi pakan hanya buah manis — memicu obesitas dan kekurangan kalsium.",
      "Memelihara sendirian tanpa interaksi — glider bisa self-mutilation karena stres.",
      "Kandang kecil tanpa enrichment — glider butuh ruang gerak vertikal.",
    ],
  },
];

export default function PanduanPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Edukasi"
        title="Panduan perawatan sugar glider"
        description="Ringkasan protokol perawatan yang kami pakai sendiri di penangkaran. Setiap adopter menerima versi lengkapnya dalam bentuk dokumen tertulis."
      />

      <div className="mt-10 space-y-6">
        {sections.map((section, i) => (
          <section
            key={section.title}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <h2 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-sm text-brand-strong">
                {i + 1}
              </span>
              {section.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-night p-8 text-center text-stone-200">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
          Masih ragu atau punya pertanyaan?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-400">
          Konsultasi perawatan gratis, bahkan jika glider Anda bukan dari kami.
          Edukasi yang baik membuat semua glider hidup lebih sehat.
        </p>
        <WhatsAppCta
          message="Halo GliderNest, saya ingin konsultasi perawatan sugar glider."
          label="Konsultasi Perawatan"
          className="mt-6"
        />
      </div>
    </div>
  );
}
