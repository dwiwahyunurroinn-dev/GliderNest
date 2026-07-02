import Link from "next/link";
import {
  LayoutDashboard,
  PawPrint,
  BookOpenText,
  Images,
  Quote,
  PackageSearch,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { Mascot } from "@/components/Mascot";
import { logout } from "./actions";

const menu = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/gliders", icon: PawPrint, label: "Sugar Glider" },
  { href: "/admin/pesanan", icon: PackageSearch, label: "Pesanan" },
  { href: "/admin/artikel", icon: BookOpenText, label: "Artikel Blog" },
  { href: "/admin/galeri", icon: Images, label: "Galeri" },
  { href: "/admin/testimoni", icon: Quote, label: "Testimoni" },
  { href: "/admin/pengaturan", icon: Settings, label: "Pengaturan" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-night p-5 text-emerald-50 md:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Mascot className="h-8 w-8" animated={false} />
          </span>
          <span>
            <span className="block font-[family-name:var(--font-display)] font-semibold text-white">
              GliderNest
            </span>
            <span className="block text-xs text-emerald-100/50">Panel Admin</span>
          </span>
        </Link>

        <nav className="mt-8 flex-1 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-emerald-100/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-emerald-100/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4.5 w-4.5" />
            Lihat Website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
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
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-red-600"
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
