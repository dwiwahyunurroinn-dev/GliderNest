import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";
import { faqs } from "@/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak & FAQ",
  description: `Hubungi ${site.name} via WhatsApp, Instagram, atau email. Temukan juga jawaban pertanyaan yang paling sering diajukan seputar adopsi sugar glider.`,
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Kontak"
        title="Ngobrol dulu, adopsi kemudian"
        description="Jalur tercepat adalah WhatsApp — kami balas setiap hari pada jam operasional. Tidak ada pertanyaan yang terlalu sepele."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">
            Respons tercepat untuk pertanyaan katalog, konsultasi, dan pemesanan.
          </p>
          <WhatsAppCta
            message="Halo GliderNest, saya ingin bertanya."
            label="Chat Sekarang"
            className="mt-4 w-full"
          />
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Instagram</h2>
          <p className="mt-2 text-sm text-muted">
            Foto & video harian joey, indukan, dan aktivitas kandang.
          </p>
          <a
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
          >
            @{site.instagram}
          </a>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Kunjungan & Email</h2>
          <p className="mt-2 text-sm text-muted">
            {site.address}
            <br />
            {site.openHours} (kunjungan wajib janji temu)
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
        />
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-line bg-surface p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="text-brand transition-transform group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
