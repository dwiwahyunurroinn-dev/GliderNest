import Link from "next/link";
import {
  LayoutDashboard,
  PawPrint,
  BookOpenText,
  Images,
  Quote,
  PackageSearch,
  Wallpaper,
  Settings,
  LogOut,
  ExternalLink,
  Bell,
  BarChart3,
} from "lucide-react";
import { requireAdmin, usingDefaultCredentials } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logout } from "./actions";

const menu = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/gliders", icon: PawPrint, label: "Sugar Glider & Stok" },
  { href: "/admin/pesanan", icon: PackageSearch, label: "Pesanan" },
  { href: "/admin/laporan", icon: BarChart3, label: "Laporan" },
  { href: "/admin/artikel", icon: BookOpenText, label: "Artikel Blog" },
  { href: "/admin/galeri", icon: Images, label: "Galeri" },
  { href: "/admin/testimoni", icon: Quote, label: "Testimoni" },
  { href: "/admin/background", icon: Wallpaper, label: "Background" },
  { href: "/admin/pengaturan", icon: Settings, label: "Pengaturan" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const [settings, unreadCount] = await Promise.all([
    getSettings(),
    prisma.notification.count({ where: { read: false } }),
  ]);

  return (
    <div className="admin-shell flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface p-5 md:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-2">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-brand-soft ring-1 ring-line">
            <BrandMark logoUrl={settings.logoUrl} className="h-8 w-8" fallback="mascot" />
          </span>
          <span>
            <span className="block font-[family-name:var(--font-display)] font-semibold">
              {settings.siteName}
            </span>
            <span className="block text-xs font-medium text-muted">Panel Admin</span>
          </span>
        </Link>

        <nav className="mt-8 flex-1 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-brand-soft hover:text-brand-strong"
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-brand-soft hover:text-brand-strong"
          >
            <ExternalLink className="h-4.5 w-4.5" />
            Lihat Website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4.5 w-4.5" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            {/* menu mobile */}
            <nav className="flex items-center gap-1 overflow-x-auto md:hidden">
              {menu.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-brand-soft hover:text-brand-strong"
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label.split(" ")[0]}
                </Link>
              ))}
            </nav>
            <p className="hidden text-sm font-semibold text-muted md:block">
              Selamat bekerja 👋 Kelola {settings.siteName} dari sini.
            </p>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/notifikasi"
                aria-label={`Notifikasi${unreadCount > 0 ? ` (${unreadCount} belum dibaca)` : ""}`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-brand-strong"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
              <ThemeToggle />
            </div>
          </div>
          {/* baris menu mobile lanjutan */}
          <nav className="flex items-center gap-1 overflow-x-auto border-t border-line px-3 py-1.5 md:hidden">
            {menu.slice(4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-brand-soft hover:text-brand-strong"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label.split(" ")[0]}
              </Link>
            ))}
            <form action={logout} className="shrink-0">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-red-500"
              >
                <LogOut className="h-3.5 w-3.5" />
                Keluar
              </button>
            </form>
          </nav>
        </header>

        {usingDefaultCredentials() && (
          <p className="mx-5 mt-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800 sm:mx-8">
            ⚠ Anda masih memakai password/kunci bawaan. Sebelum website
            di-online-kan, buat file <code>.env</code> (contoh di{" "}
            <code>.env.example</code>) lalu isi ADMIN_PASSWORD dan AUTH_SECRET
            dengan nilai rahasia Anda sendiri, kemudian restart server.
          </p>
        )}
        <div className="mx-auto w-full max-w-6xl flex-1 p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
