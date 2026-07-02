import { prisma } from "./db";

export type Settings = NonNullable<
  Awaited<ReturnType<typeof prisma.setting.findFirst>>
>;

export async function getSettings(): Promise<Settings> {
  const existing = await prisma.setting.findFirst();
  if (existing) return existing;
  return prisma.setting.create({ data: { id: 1 } });
}

export function waLink(whatsapp: string, message: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface BankAccount {
  bank: string;
  number: string;
  holder: string;
}

/** Parse baris "BANK|NOMOR|ATAS NAMA" dari pengaturan admin. */
export function parseBankAccounts(raw: string): BankAccount[] {
  return raw
    .split("\n")
    .map((line) => line.split("|").map((s) => s.trim()))
    .filter((parts) => parts.length >= 2 && parts[0] && parts[1])
    .map(([bank, number, holder]) => ({ bank, number, holder: holder ?? "" }));
}
