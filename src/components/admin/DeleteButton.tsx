"use client";

import { Trash2 } from "lucide-react";

/** Tombol hapus dengan konfirmasi, dipakai di dalam <form action={...}>. */
export function DeleteButton({ label = "item ini" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`Yakin ingin menghapus ${label}? Tindakan ini tidak bisa dibatalkan.`)) {
          e.preventDefault();
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Hapus
    </button>
  );
}
