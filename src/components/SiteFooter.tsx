import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { GliderMark } from "./GliderMark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-night text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-white">
            <GliderMark className="h-8 w-8 text-brand-soft" />
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold">
              {site.name}
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400">
            {site.description}
          </p>
          <p className="mt-4 text-xs text-stone-500">
            Berdiri sejak {site.foundedYear} · {site.address}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Jelajahi
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/gliders" className="hover:text-white">Katalog Glider</Link></li>
            <li><Link href="/panduan" className="hover:text-white">Panduan Perawatan</Link></li>
            <li><Link href="/tentang" className="hover:text-white">Tentang Peternakan</Link></li>
            <li><Link href="/kontak" className="hover:text-white">Kontak & FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Hubungi Kami
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={waLink("Halo GliderNest!")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram @{site.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="text-stone-500">{site.openHours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {site.name}. Seluruh glider kami hasil penangkaran yang legal dan etis.
      </div>
    </footer>
  );
}
