import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole, AlertCircle, ShieldCheck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getActiveBackgroundUrl, getSettings } from "@/lib/settings";
import { BrandMark } from "@/components/BrandMark";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false },
};

import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/admin");
  const [{ error }, settings, backgroundUrl] = await Promise.all([
    searchParams,
    getSettings(),
    getActiveBackgroundUrl(),
  ]);

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Panel kiri: foto + identitas */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/35 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/95">
              <BrandMark logoUrl={settings.logoUrl} className="h-8 w-8" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              {settings.siteName}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            {settings.tagline}. Kelola katalog, pesanan, konten, dan laporan
            bisnis Anda dari satu tempat.
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs text-white/60">
            <ShieldCheck className="h-4 w-4" />
            Area terbatas — hanya untuk pengelola {settings.siteName}
          </p>
        </div>
      </div>

      {/* Panel kanan: form login */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft">
            <LockKeyhole className="h-6 w-6 text-brand" />
          </span>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
            Masuk ke Panel Admin
          </h1>
          <p className="mt-2 text-sm text-muted">
            Masukkan password admin untuk melanjutkan.
          </p>

          {error && (
            <p className="mt-6 flex items-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Password salah, silakan coba lagi.
            </p>
          )}

          <form action={login} className="mt-8">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password admin
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              placeholder="••••••••••"
              className="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm outline-none transition-colors focus:border-brand"
            />
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-strong"
            >
              Masuk
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted">
            Password bawaan <code className="rounded bg-brand-soft px-1.5 py-0.5">glidernest123</code>{" "}
            — ubah lewat ADMIN_PASSWORD di file .env
          </p>
        </div>
      </div>
    </div>
  );
}
