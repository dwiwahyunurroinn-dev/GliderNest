import { gliderStatusLabel } from "@/lib/format";

const styles: Record<string, string> = {
  tersedia: "bg-emerald-100 text-emerald-800",
  dipesan: "bg-amber-100 text-amber-800",
  terjual: "bg-stone-200 text-stone-600",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? styles.terjual
      }`}
    >
      {gliderStatusLabel[status] ?? status}
    </span>
  );
}
