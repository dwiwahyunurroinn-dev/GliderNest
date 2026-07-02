import type { Metadata } from "next";
import { Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimoni Adopter",
  description:
    "Cerita dan pengalaman para adopter sugar glider dari seluruh Indonesia.",
};

export default async function TestimonialPage() {
  const [testimonials, settings] = await Promise.all([
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    }),
    getSettings(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Testimoni"
          title="Cerita dari keluarga glider"
          description="Kepercayaan tidak bisa dibeli — ia dibangun dari pengalaman nyata para adopter kami."
        />
      </Reveal>

      <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 80}>
            <figure className="break-inside-avoid rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {t.name}
                <span className="ml-2 font-normal text-muted">{t.city}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 rounded-[2rem] border border-line bg-gradient-to-br from-brand-soft via-sky to-gold-soft p-8 text-center sm:p-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          Sudah adopsi dari kami?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Bagikan pengalaman Anda — ceritanya membantu calon adopter lain
          mengambil keputusan yang tepat.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppCta
            whatsapp={settings.whatsapp}
            message={`Halo ${settings.siteName}, saya ingin mengirim testimoni pengalaman adopsi saya.`}
            label="Kirim Testimoni"
          />
        </div>
      </div>
    </div>
  );
}
