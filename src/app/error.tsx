"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

/** Halaman error ramah — menggantikan tampilan error teknis bawaan. */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-4xl">
        😵‍💫
      </span>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold">
        Ups, ada gangguan sebentar
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Terjadi kesalahan tak terduga di halaman ini. Coba muat ulang — biasanya
        langsung pulih. Jika terus terjadi, hubungi kami via WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          <RefreshCw className="h-4 w-4" />
          Muat Ulang
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-strong"
        >
          <Home className="h-4 w-4" />
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}
