import type { GliderStatus } from "@/lib/types";

const styles: Record<GliderStatus, string> = {
  tersedia: "bg-emerald-100 text-emerald-800",
  dipesan: "bg-amber-100 text-amber-800",
  terjual: "bg-stone-200 text-stone-600",
};

const labels: Record<GliderStatus, string> = {
  tersedia: "Tersedia",
  dipesan: "Dipesan",
  terjual: "Terjual",
};

export function StatusPill({ status }: { status: GliderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
