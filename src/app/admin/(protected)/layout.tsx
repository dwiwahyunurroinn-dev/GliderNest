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
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { BrandMark } from "@/components/BrandMark";
import { logout } from "./actions";

const menu = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/gliders", icon: PawPrint, label: "Sugar Glider" },
  { href: "/admin/pesanan", icon: PackageSearch, label: "Pesanan" },
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
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-surface p-5 md:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-2">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-soft ring-1 ring-line">
            <BrandMark logoUrl={settings.logoUrl} className="h-8 w-8" fallback="mascot" />
          </span>
          <span>
            <span className="block font-[family-name:var(--font-display)] font-semibold">
              {settings.siteName}
            </span>
            <span className="block text-xs font-medium text-muted">Panel Admin</span>
          </span>
        </Link>

        <nav className="mt-8 flex-1 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-brand-soft hover:text-brand-strong"
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
            className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-brand-soft hover:text-brand-strong"
          >
            <ExternalLink className="h-4.5 w-4.5" />
            Lihat Website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4.5 w-4.5" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        {/* Bar navigasi mobile */}
        <div className="sticky top-0 z-40 flex items-center gap-1 overflow-x-auto border-b border-line bg-surface px-3 py-2 md:hidden">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-muted hover:bg-brand-soft hover:text-brand-strong"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
          <form action={logout} className="shrink-0">
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-red-500"
            >
              <LogOut className="h-3.5 w-3.5" />
              Keluar
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-5xl p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
