import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft">
        <Compass className="h-12 w-12 text-brand" strokeWidth={1.5} />
      </span>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-muted">
        Sepertinya halaman yang Anda cari sudah pindah atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
