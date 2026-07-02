import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole, AlertCircle } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Mascot } from "@/components/Mascot";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(50% 60% at 80% 10%, rgba(37,99,235,0.12), transparent), radial-gradient(40% 50% at 10% 90%, rgba(245,158,11,0.1), transparent), linear-gradient(180deg, #eef5ff, #f5f8ff)",
      }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div className="animate-float">
            <Mascot className="h-28 w-28 drop-shadow-xl" />
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
            Panel Admin
          </h1>
          <p className="mt-1 text-sm font-medium text-muted">
            Masuk untuk mengelola website Anda
          </p>
        </div>

        {error && (
          <p className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Password salah, silakan coba lagi.
          </p>
        )}

        <form
          action={login}
          className="mt-6 rounded-[2rem] border border-line bg-surface p-7 shadow-xl shadow-brand/10"
        >
          <label htmlFor="password" className="block text-sm font-semibold">
            Password admin
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
          />
          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-strong"
          >
            <LockKeyhole className="h-4 w-4" />
            Masuk
          </button>
          <p className="mt-4 text-center text-xs font-medium text-muted">
            Password bawaan: <code>glidernest123</code> — ubah lewat variabel
            ADMIN_PASSWORD di file .env
          </p>
        </form>
      </div>
    </div>
  );
}
