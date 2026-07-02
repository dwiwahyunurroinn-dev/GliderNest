"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Cetak / Simpan PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-strong print:hidden"
    >
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
