import Link from "next/link";
import { GliderMark } from "@/components/GliderMark";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <GliderMark className="h-24 w-24 text-line" />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-muted">
        Sepertinya glider yang Anda cari sudah meluncur ke tempat lain.
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
