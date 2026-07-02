export const site = {
  name: "GliderNest",
  tagline: "Peternakan Sugar Glider Terpercaya",
  description:
    "GliderNest adalah peternakan sugar glider (captive-bred) yang mengutamakan kesehatan, silsilah jelas, dan edukasi perawatan. Adopsi sugar glider sehat dengan garansi dan pendampingan seumur hidup.",
  url: "https://glidernest.id",
  // Ganti dengan nomor WhatsApp bisnis Anda (format internasional tanpa +)
  whatsapp: "6281234567890",
  email: "halo@glidernest.id",
  instagram: "glidernest.id",
  address: "Sleman, Yogyakarta, Indonesia",
  openHours: "Setiap hari, 09.00–20.00 WIB",
  foundedYear: 2019,
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
