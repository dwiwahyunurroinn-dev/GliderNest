import Link from "next/link";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { InstagramIcon } from "./icons";
import type { Settings } from "@/lib/settings";
import { waLink } from "@/lib/settings";
import { BrandMark } from "./BrandMark";

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
    <footer className="mt-auto bg-night text-emerald-100/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 text-white">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <BrandMark logoUrl={settings.logoUrl} className="h-9 w-9" />
            </span>
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold">
              {settings.siteName}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            {settings.description ||
              `${settings.siteName} — ${settings.tagline}. Seluruh glider kami hasil penangkaran yang legal dan etis.`}
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs text-emerald-100/50">
            <MapPin className="h-3.5 w-3.5" />
            Berdiri sejak {settings.foundedYear} · {settings.address}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/40">
            Jelajahi
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/40">
            Hubungi Kami
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={waLink(settings.whatsapp, `Halo ${settings.siteName}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${settings.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" /> @{settings.instagram}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" /> {settings.email}
              </a>
            </li>
            <li className="flex items-center gap-2 text-emerald-100/50">
              <Clock className="h-4 w-4" /> {settings.openHours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-emerald-100/40">
        © {new Date().getFullYear()} {settings.siteName}. Seluruh glider hasil
        penangkaran legal & etis ·{" "}
        <Link href="/admin" className="transition-colors hover:text-white">
          Admin
        </Link>
      </div>
    </footer>
  );
}
