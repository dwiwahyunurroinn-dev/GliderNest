import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
};

export default async function PrivacyPage() {
  const s = await getSettings();
  const sections = [
    {
      title: "Data yang kami kumpulkan",
      body: `Saat Anda membuat pesanan, kami menyimpan nama, nomor WhatsApp, dan alamat pengiriman yang Anda isi di form pemesanan. Data ini semata-mata untuk memproses pesanan Anda: verifikasi, komunikasi, pembuatan invoice, dan pengiriman. Kami tidak mengumpulkan data lain secara diam-diam.`,
    },
    {
      title: "Bagaimana data digunakan",
      body: `Data Anda hanya digunakan oleh ${s.siteName} untuk keperluan transaksi dan layanan purna-adopsi (grup pendampingan, garansi kesehatan). Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga mana pun, kecuali kurir pengiriman yang membutuhkan nama, nomor telepon, dan alamat untuk mengantar pesanan.`,
    },
    {
      title: "Penyimpanan & keamanan",
      body: `Data tersimpan di sistem kami dengan akses terbatas hanya untuk pengelola. Halaman admin dilindungi kata sandi, dan kami melakukan pencadangan (backup) berkala untuk mencegah kehilangan data.`,
    },
    {
      title: "Hak Anda",
      body: `Anda berhak meminta salinan, koreksi, atau penghapusan data pribadi Anda kapan saja. Hubungi kami via WhatsApp di ${s.whatsapp.replace(/^62/, "0")} atau email ${s.email} — kami proses maksimal 7 hari kerja.`,
    },
    {
      title: "Cookie & pelacakan",
      body: `Website ini hanya menggunakan penyimpanan lokal browser untuk preferensi tampilan (tema terang/gelap) dan cookie sesi untuk login admin. Tidak ada pelacakan iklan pihak ketiga.`,
    },
    {
      title: "Perubahan kebijakan",
      body: `Kebijakan ini dapat diperbarui sewaktu-waktu mengikuti perkembangan layanan. Versi terbaru selalu tersedia di halaman ini.`,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Legal"
        title="Kebijakan Privasi"
        description={`Kepercayaan Anda adalah aset terbesar ${s.siteName}. Berikut cara kami memperlakukan data pribadi Anda — ditulis sederhana, tanpa bahasa hukum yang berbelit.`}
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
        Berlaku sejak dipublikasikan · {s.siteName}, {s.address}
      </p>
    </div>
  );
}
