import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BottomNav } from "@/components/BottomNav";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  // Data terstruktur (JSON-LD) untuk mesin pencari: profil toko/peternakan.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: settings.siteName,
    description:
      settings.description ||
      `${settings.siteName} — ${settings.tagline}. Peternakan sugar glider captive-bred.`,
    telephone: `+${settings.whatsapp}`,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressCountry: "ID",
    },
    foundingDate: String(settings.foundedYear),
    sameAs: [`https://instagram.com/${settings.instagram}`],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // ganti "<" agar isi pengaturan tidak bisa menutup tag script (XSS)
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader siteName={settings.siteName} logoUrl={settings.logoUrl} />
      {/* padding bawah di HP/tablet memberi ruang untuk bar navigasi bawah */}
      <main className="flex-1 pb-20 xl:pb-0">{children}</main>
      <SiteFooter settings={settings} />
      <FloatingWhatsApp whatsapp={settings.whatsapp} siteName={settings.siteName} />
      <BottomNav />
    </>
  );
}
