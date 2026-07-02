export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function splitTraits(traits: string): string[] {
  return traits.split(",").map((t) => t.trim()).filter(Boolean);
}

/** Gradien lembut untuk kartu glider tanpa foto, berdasarkan morph. */
export function morphGradient(morph: string): [string, string] {
  const palettes: Record<string, [string, string]> = {
    "classic grey": ["#e7ece7", "#9fae9f"],
    "white face blond": ["#f6ecd9", "#d5b98a"],
    leucistic: ["#f8f7f3", "#cfccc2"],
    mosaic: ["#eef0e9", "#aab89f"],
    platinum: ["#eef1f2", "#a8b4b8"],
    cremeino: ["#f9efe1", "#dfba90"],
  };
  return palettes[morph.toLowerCase()] ?? ["#e4f3e9", "#8fbfa4"];
}

export const gliderStatusLabel: Record<string, string> = {
  tersedia: "Tersedia",
  dipesan: "Dipesan",
  terjual: "Terjual",
};

export const orderStatusLabel: Record<string, string> = {
  menunggu: "Menunggu Pembayaran",
  diproses: "Diproses",
  dikirim: "Dikirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export const paymentMethodLabel: Record<string, string> = {
  qris: "QRIS",
  transfer: "Transfer Bank / M-Banking",
  dana: "DANA / E-Wallet",
  cod: "COD (Bayar di Tempat)",
  rekber: "Rekber (Rekening Bersama)",
};
