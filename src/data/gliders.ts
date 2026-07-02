import type { Glider } from "@/lib/types";

/**
 * Sumber data sementara (file statis). Struktur ini sengaja dibuat identik
 * dengan model `Glider` di prisma/schema.prisma agar migrasi ke PostgreSQL
 * nantinya hanya mengganti implementasi fungsi di bawah, bukan halaman.
 */
export const gliders: Glider[] = [
  {
    slug: "luna-white-face-blond",
    name: "Luna",
    morph: "White Face Blond",
    sex: "betina",
    ageMonths: 3,
    price: 1500000,
    status: "tersedia",
    description:
      "Luna adalah joey betina White Face Blond yang aktif dan mudah bonding. Sudah terbiasa handling harian sejak out of pouch, makan lahap, dan sangat responsif terhadap suara pemiliknya.",
    lineage: "Indukan WFB x Classic Grey, garis keturunan 3 generasi tercatat",
    palette: ["#fde8c8", "#d9a86b"],
    traits: ["Mudah bonding", "Handling harian", "Nafsu makan baik"],
  },
  {
    slug: "arto-classic-grey",
    name: "Arto",
    morph: "Classic Grey",
    sex: "jantan",
    ageMonths: 4,
    price: 850000,
    status: "tersedia",
    description:
      "Arto adalah jantan Classic Grey dengan garis punggung tegas dan tubuh proporsional. Cocok untuk pemula karena karakternya tenang dan tidak mudah crabbing.",
    lineage: "Indukan Classic Grey lokal, sehat 2 generasi",
    palette: ["#e5e0d8", "#8d8578"],
    traits: ["Karakter tenang", "Cocok pemula", "Postur bagus"],
  },
  {
    slug: "salju-leucistic",
    name: "Salju",
    morph: "Leucistic",
    sex: "betina",
    ageMonths: 3,
    price: 4500000,
    status: "tersedia",
    description:
      "Salju adalah betina Leucistic putih bersih bermata hitam. Morph langka dengan kualitas breeding, cocok untuk hobiis serius maupun calon breeder.",
    lineage: "Kedua indukan het Leucistic, silsilah 4 generasi tercatat",
    palette: ["#f7f5f1", "#c9c2b6"],
    traits: ["Morph langka", "Kualitas breeding", "Silsilah lengkap"],
  },
  {
    slug: "mozaik-mosaic",
    name: "Mozaik",
    morph: "Mosaic",
    sex: "jantan",
    ageMonths: 5,
    price: 3000000,
    status: "dipesan",
    description:
      "Mozaik memiliki pola putih unik di sekujur tubuh — tiap Mosaic polanya satu-satunya di dunia. Jinak, terbiasa bonding pouch, dan sudah kenal nama.",
    lineage: "Indukan Mosaic x White Face Blond",
    palette: ["#efe9df", "#a3906f"],
    traits: ["Pola unik", "Kenal nama", "Bonding pouch"],
  },
  {
    slug: "embun-platinum",
    name: "Embun",
    morph: "Platinum",
    sex: "betina",
    ageMonths: 4,
    price: 5500000,
    status: "tersedia",
    description:
      "Embun adalah betina Platinum berbulu perak lembut dengan garis punggung tipis. Salah satu morph paling dicari, dari pasangan indukan bersertifikat sehat.",
    lineage: "Indukan Platinum x Leucistic het, silsilah 4 generasi",
    palette: ["#eceef0", "#9aa3ad"],
    traits: ["Morph premium", "Bulu perak", "Indukan tersertifikasi"],
  },
  {
    slug: "kirana-cremeino",
    name: "Kirana",
    morph: "Cremeino",
    sex: "betina",
    ageMonths: 3,
    price: 4000000,
    status: "terjual",
    description:
      "Kirana adalah betina Cremeino berbulu krem hangat dengan mata ruby. Sudah diadopsi keluarga di Bandung — lihat galeri untuk joey Cremeino berikutnya.",
    lineage: "Indukan Cremeino x Classic het Cremeino",
    palette: ["#fdeedd", "#e0b28a"],
    traits: ["Mata ruby", "Bulu krem", "Sudah diadopsi"],
  },
];

export function getAllGliders(): Glider[] {
  return gliders;
}

export function getAvailableGliders(): Glider[] {
  return gliders.filter((g) => g.status === "tersedia");
}

export function getGliderBySlug(slug: string): Glider | undefined {
  return gliders.find((g) => g.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
