import Link from "next/link";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import type { Settings } from "@/lib/settings";
import { waLink } from "@/lib/settings";
import { BrandMark } from "./BrandMark";
import { InstagramIcon } from "./icons";

const exploreLinks = [
  { href: "/sugar-glider", label: "Katalog Sugar Glider" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/blog", label: "Blog Edukasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/reseller", label: "Program Reseller" },
  { href: "/cara-memesan", label: "Cara Memesan" },
];

export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <footer className="mt-auto border-t border-line bg-gradient-to-b from-sky to-brand-soft/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-surface shadow-sm ring-1 ring-line">
              <BrandMark logoUrl={settings.logoUrl} className="h-9 w-9" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold">
              {settings.siteName}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {settings.description ||
              `${settings.siteName} — ${settings.tagline}. Seluruh glider kami hasil penangkaran yang legal dan etis.`}
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs font-medium text-muted">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            Berdiri sejak {settings.foundedYear} · {settings.address}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
            Jelajahi
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted transition-colors hover:text-brand-strong"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
            Hubungi Kami
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            <li>
              <a
                href={waLink(settings.whatsapp, `Halo ${settings.siteName}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-brand-strong"
              >
                <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${settings.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-brand-strong"
              >
                <InstagramIcon className="h-4 w-4 text-brand" /> @{settings.instagram}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 text-muted transition-colors hover:text-brand-strong"
              >
                <Mail className="h-4 w-4 text-brand" /> {settings.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted">
              <Clock className="h-4 w-4 text-brand" /> {settings.openHours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/70 py-5 text-center text-xs font-medium text-muted">
        © {new Date().getFullYear()} {settings.siteName}. Seluruh glider hasil
        penangkaran legal & etis ·{" "}
        <Link href="/admin" className="transition-colors hover:text-brand-strong">
          Admin
        </Link>
      </div>
    </footer>
  );
}
