import type { Metadata } from "next";
import { Mail, MapPin, Clock, Plus } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { getSettings } from "@/lib/settings";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kontak & FAQ",
  description:
    "Hubungi kami via WhatsApp, Instagram, atau email — dan temukan jawaban pertanyaan yang paling sering diajukan seputar adopsi sugar glider.",
};

const faqs = [
  {
    question: "Apakah sugar glider legal dipelihara di Indonesia?",
    answer:
      "Ya. Sugar glider hasil penangkaran (captive-bred) legal dipelihara. Semua glider kami lahir di penangkaran, bukan tangkapan alam, dan disertai keterangan asal-usul.",
  },
  {
    question: "Umur berapa joey siap diadopsi?",
    answer:
      "Kami melepas joey minimal usia 2,5–3 bulan out of pouch (OOP), saat sudah lepas sapih penuh dan makan mandiri. Melepas lebih awal berisiko bagi kesehatan joey.",
  },
  {
    question: "Apakah ada garansi kesehatan?",
    answer:
      "Ada. Setiap adopsi disertai garansi kesehatan 7 hari serta rekam pakan dan berat badan. Jika ada indikasi masalah kesehatan bawaan, kami tangani atau ganti sesuai kesepakatan.",
  },
  {
    question: "Bisakah dikirim ke luar kota?",
    answer:
      "Bisa. Kami melayani pengiriman antar kota dengan kurir khusus hewan hidup yang berpengalaman, kandang transport aman, dan update perjalanan sampai tiba.",
  },
  {
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "QRIS (bisa dibayar dari aplikasi apa pun), transfer bank / m-banking, DANA, COD untuk area terdekat, dan rekber (rekening bersama) untuk transaksi jarak jauh yang paling aman. Instruksi lengkap muncul otomatis setelah Anda membuat pesanan di website.",
  },
  {
    question: "Apa saja yang saya dapat saat adopsi?",
    answer:
      "Joey sehat, kartu identitas (morph, tanggal OOP, silsilah), paket pakan awal, panduan perawatan tertulis, dan akses grup pendampingan seumur hidup.",
  },
];

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Kontak"
          title="Ngobrol dulu, adopsi kemudian"
          description="Jalur tercepat adalah WhatsApp — kami balas setiap hari pada jam operasional. Tidak ada pertanyaan yang terlalu sepele."
        />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-semibold">WhatsApp</h2>
            <p className="mt-2 text-sm text-muted">
              Respons tercepat untuk pertanyaan katalog, konsultasi, dan
              pemesanan.
            </p>
            <WhatsAppCta
              whatsapp={settings.whatsapp}
              message={`Halo ${settings.siteName}, saya ingin bertanya.`}
              label="Chat Sekarang"
              className="mt-4 w-full"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-semibold">Instagram</h2>
            <p className="mt-2 text-sm text-muted">
              Foto & video harian joey, indukan, dan aktivitas kandang.
            </p>
            <a
              href={`https://instagram.com/${settings.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
            >
              <InstagramIcon className="h-4 w-4" />@{settings.instagram}
            </a>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="h-full rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-semibold">Kunjungan & Email</h2>
            <p className="mt-2 flex items-start gap-2 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {settings.address} (kunjungan wajib janji temu)
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4 shrink-0" />
              {settings.openHours}
            </p>
            <a
              href={`mailto:${settings.email}`}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
            >
              <Mail className="h-4 w-4" />
              {settings.email}
            </a>
          </div>
        </Reveal>
      </div>

      {settings.mapsEmbedUrl && (
        <Reveal>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-line shadow-sm">
            <iframe
              src={settings.mapsEmbedUrl}
              title={`Lokasi ${settings.siteName}`}
              className="h-96 w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      )}

      <div className="mt-16">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
        </Reveal>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 60}>
              <details className="group rounded-3xl border border-line bg-surface p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
