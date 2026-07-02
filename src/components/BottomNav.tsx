"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  PawPrint,
  ShoppingBag,
  BookOpen,
  LayoutGrid,
  X,
  Users,
  Images,
  Quote,
  HandHeart,
  ListOrdered,
  Phone,
} from "lucide-react";

const mainItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/sugar-glider", icon: PawPrint, label: "Katalog" },
];

const rightItems = [{ href: "/blog", icon: BookOpen, label: "Blog" }];

const moreItems = [
  { href: "/tentang-kami", icon: Users, label: "Tentang Kami" },
  { href: "/galeri", icon: Images, label: "Galeri" },
  { href: "/testimoni", icon: Quote, label: "Testimoni" },
  { href: "/reseller", icon: HandHeart, label: "Reseller" },
  { href: "/cara-memesan", icon: ListOrdered, label: "Cara Pesan" },
  { href: "/kontak", icon: Phone, label: "Kontak" },
];

/** Navigasi bawah ala aplikasi untuk HP/tablet (desktop tetap menu atas). */
export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const moreActive = moreItems.some((i) => isActive(i.href));

  const itemCls = (active: boolean) =>
    `flex flex-col items-center gap-1 py-2 text-[11px] font-semibold transition-colors ${
      active ? "text-brand-strong" : "text-muted"
    }`;

  return (
    <>
      {/* Lembar "Lainnya" */}
      {moreOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-[2px] xl:hidden"
          />
          <div className="fixed inset-x-3 bottom-24 z-50 rounded-3xl border border-line bg-surface p-4 shadow-2xl xl:hidden">
            <div className="grid grid-cols-3 gap-2">
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 text-xs font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-brand-soft text-brand-strong"
                      : "text-muted hover:bg-brand-soft/60"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bar navigasi bawah */}
      <nav
        aria-label="Navigasi utama"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur-md xl:hidden print:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 items-end px-2">
          {mainItems.map((item) => (
            <Link key={item.href} href={item.href} className={itemCls(isActive(item.href))}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          {/* Tombol pesan menonjol di tengah */}
          <div className="relative flex justify-center">
            <Link
              href="/pesan"
              aria-label="Pesan Sekarang"
              className="-mt-6 mb-1 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/35 ring-4 ring-background transition-transform active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="mt-0.5 text-[9px] font-bold">Pesan</span>
            </Link>
          </div>

          {rightItems.map((item) => (
            <Link key={item.href} href={item.href} className={itemCls(isActive(item.href))}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className={itemCls(moreActive || moreOpen)}
          >
            {moreOpen ? <X className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
            Lainnya
          </button>
        </div>
      </nav>
    </>
  );
}
