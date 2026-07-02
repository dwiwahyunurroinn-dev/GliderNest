"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/sugar-glider", label: "Sugar Glider" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/blog", label: "Blog" },
  { href: "/galeri", label: "Galeri" },
  { href: "/reseller", label: "Reseller" },
  { href: "/cara-memesan", label: "Cara Pesan" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader({
  siteName,
  logoUrl,
}: {
  siteName: string;
  logoUrl?: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-soft ring-1 ring-line">
            <BrandMark logoUrl={logoUrl} className="h-8 w-8" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            {siteName}
          </span>
        </Link>

        {/* Navigasi desktop; di HP/tablet navigasi pindah ke bar bawah */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-soft text-brand-strong"
                    : "text-muted hover:bg-brand-soft/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/pesan"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-brand px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
          >
            <ShoppingBag className="h-4 w-4" />
            Pesan Sekarang
          </Link>
          <ThemeToggle className="ml-2" />
        </nav>

        <ThemeToggle className="xl:hidden" />
      </div>
    </header>
  );
}
