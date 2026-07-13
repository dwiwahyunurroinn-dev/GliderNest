import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Ketentuan pemesanan, pembayaran, garansi kesehatan, pengiriman, dan pembatalan.",
};

export default async function TermsPage() {
  const s = await getSettings();
  const sections = [
    {
      title: "Pemesanan",
      body: `Pesanan dibuat melalui form di website atau langsung via WhatsApp. Membuat pesanan belum menarik pembayaran apa pun — pesanan dianggap sah setelah pembayaran dikonfirmasi. Sebelum membayar, Anda berhak meminta video kondisi terkini joey atau video call langsung dari kandang.`,
    },
    {
      title: "Pembayaran",
      body: `Pembayaran hanya melalui kanal resmi yang tercantum pada halaman instruksi pesanan Anda: QRIS, rekening bank atas nama ${s.siteName}, DANA resmi, COD di area layanan, atau rekber. Kami tidak pernah meminta pembayaran ke rekening lain melalui telepon atau pesan pribadi — waspadai penipuan yang mengatasnamakan kami.`,
    },
    {
      title: "Garansi kesehatan",
      body: `Setiap adopsi disertai garansi kesehatan 7 hari sejak joey diterima, mencakup masalah kesehatan bawaan dari penangkaran. Garansi tidak berlaku untuk kelalaian perawatan (pakan tidak sesuai panduan, kandang tidak layak, atau kecelakaan). Klaim disampaikan via WhatsApp disertai foto/video kondisi joey.`,
    },
    {
      title: "Pengiriman",
      body: `Pengiriman antar kota menggunakan kurir khusus hewan hidup yang berpengalaman. Risiko perjalanan menjadi tanggung jawab kami sampai joey diterima dalam kondisi sehat. Pembeli wajib memastikan ada penerima di alamat tujuan pada jadwal yang disepakati.`,
    },
    {
      title: "Pembatalan & pengembalian dana",
      body: `Pembatalan sebelum pembayaran: bebas, tanpa biaya. Pembatalan setelah pembayaran namun sebelum pengiriman: dana dikembalikan penuh dikurangi biaya yang sudah timbul (mis. booking kurir). Setelah joey diterima, pembatalan tidak dapat dilakukan — namun garansi kesehatan tetap berlaku sesuai ketentuan di atas.`,
    },
    {
      title: "Etika & legalitas",
      body: `Seluruh sugar glider kami adalah hasil penangkaran (captive-bred), bukan tangkapan alam. Kami berhak menolak penjualan jika calon adopter dinilai belum siap memelihara (misal untuk hadiah impulsif tanpa persiapan kandang dan pakan).`,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Legal"
        title="Syarat & Ketentuan"
        description={`Aturan main yang jelas melindungi dua pihak — Anda sebagai adopter dan kami sebagai penangkar. Dengan membuat pesanan di ${s.siteName}, Anda menyetujui ketentuan berikut.`}
      />
      <div className="mt-10 space-y-6">
        {sections.map((sec, i) => (
          <section key={sec.title} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-semibold">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-strong">
                {i + 1}
              </span>
              {sec.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{sec.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted">
        Berlaku sejak dipublikasikan · {s.siteName}, {s.address} · Pertanyaan?
        Hubungi kami via WhatsApp {s.whatsapp.replace(/^62/, "0")}
      </p>
    </div>
  );
}
