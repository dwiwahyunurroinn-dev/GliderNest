"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, waLink } from "@/lib/site";
import { GliderMark } from "./GliderMark";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/gliders", label: "Katalog" },
  { href: "/panduan", label: "Panduan Perawatan" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-brand-soft">
            <GliderMark className="h-6 w-6" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-soft text-brand-strong"
                    : "text-muted hover:bg-brand-soft/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={waLink("Halo GliderNest, saya ingin bertanya tentang adopsi sugar glider.")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            Chat WhatsApp
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-background px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-brand-soft"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={waLink("Halo GliderNest, saya ingin bertanya tentang adopsi sugar glider.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Chat WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
