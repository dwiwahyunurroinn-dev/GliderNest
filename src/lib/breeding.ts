/** Estimasi siklus breeding sugar glider (hitungan umum komunitas breeder). */

const DAY = 24 * 60 * 60 * 1000;
/** Masa kehamilan ± 16 hari setelah dikawinkan. */
export const GESTATION_DAYS = 16;
/** Joey keluar kantung (OOP) ± 70 hari setelah lahir → ±86 hari sejak kawin. */
export const OOP_DAYS = 86;

export function estimateBirth(pairedAt: Date): Date {
  return new Date(pairedAt.getTime() + GESTATION_DAYS * DAY);
}

export function estimateOop(pairedAt: Date): Date {
  return new Date(pairedAt.getTime() + OOP_DAYS * DAY);
}

/** Selisih hari dari sekarang (negatif = sudah lewat). */
export function daysUntil(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / DAY);
}

/** Label hitung mundur ramah: "3 hari lagi" / "hari ini" / "lewat 2 hari". */
export function countdownLabel(date: Date): string {
  const d = daysUntil(date);
  if (d > 0) return `${d} hari lagi`;
  if (d === 0) return "hari ini!";
  return `lewat ${Math.abs(d)} hari`;
}
