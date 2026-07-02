import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppCta } from "@/components/WhatsAppCta";
import { trustPoints } from "@/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Kenali ${site.name}: peternakan sugar glider captive-bred yang berdiri sejak ${site.foundedYear}, mengutamakan kesehatan, etika penangkaran, dan edukasi adopter.`,
};

const commitments = [
  {
    title: "Standar kandang & nutrisi",
    body: "Kandang koloni luas dengan enrichment, suhu terjaga, dan diet berbasis protokol yang diakui komunitas glider (HPW/BML termodifikasi) — bukan sekadar buah dan kacang. Rekam pakan tiap joey kami dokumentasikan.",
  },
  {
    title: "Breeding yang bertanggung jawab",
    body: "Indukan dirotasi dengan masa istirahat cukup, tidak dikawinkan sedarah, dan pensiun pada umur yang layak. Kami membatasi jumlah litter demi kualitas, bukan kuantitas.",
  },
  {
    title: "Edukasi sebelum adopsi",
    body: "Kami menolak adopsi impulsif. Setiap calon adopter kami ajak diskusi soal komitmen 10–15 tahun umur glider, kebutuhan koloni, dan biaya perawatan — sebelum bicara harga.",
  },
  {
    title: "Transparansi penuh",
    body: "Video call langsung dari kandang, dokumen silsilah, dan testimoni adopter yang bisa dihubungi. Kredibilitas kami dibangun dari bukti, bukan klaim.",
  },
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Tentang Kami"
        title={`Cerita di balik ${site.name}`}
        description={`Berawal dari sepasang glider peliharaan pada ${site.foundedYear}, kini ${site.name} menjadi penangkaran kecil yang fokus pada kualitas: joey sehat, adopter teredukasi, dan penangkaran yang etis.`}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-night p-8 text-stone-200 lg:col-span-2">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Misi kami sederhana
          </h2>
          <p className="mt-4 leading-relaxed text-stone-300">
            Sugar glider adalah hewan sosial berumur panjang yang sering dibeli
            impulsif lalu ditelantarkan. Kami ingin mengubah itu: setiap joey
            dari {site.name} pulang ke rumah yang sudah siap — pemiliknya paham
            pakan, bonding, dan komitmen jangka panjangnya.
          </p>
          <p className="mt-4 leading-relaxed text-stone-300">
            Karena itu kami tidak hanya menjual. Kami mendampingi. Grup adopter
            kami aktif setiap hari untuk konsultasi, dan garansi kesehatan kami
            tertulis di setiap adopsi.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-800 pt-6 text-center">
            {[
              ["150+", "Joey diadopsi"],
              [`${new Date().getFullYear() - site.foundedYear}+ th`, "Pengalaman"],
              ["0", "Tangkapan alam"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-semibold text-amber-400">{value}</dt>
                <dd className="mt-1 text-xs text-stone-400">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col justify-between rounded-3xl border border-line bg-brand-soft/60 p-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Kunjungi kandang kami
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Kami membuka kunjungan terjadwal di {site.address}. Lihat sendiri
              kondisi kandang, indukan, dan cara kami merawat joey — atau minta
              video call kapan saja.
            </p>
          </div>
          <WhatsAppCta
            message="Halo GliderNest, saya ingin menjadwalkan kunjungan / video call kandang."
            label="Jadwalkan Kunjungan"
            className="mt-6"
          />
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="Standar Kami"
          title="Komitmen yang kami pegang"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {commitments.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Jaminan" title="Yang Anda dapat di setiap adopsi" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
