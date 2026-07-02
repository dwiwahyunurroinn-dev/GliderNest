import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <SiteHeader siteName={settings.siteName} logoUrl={settings.logoUrl} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
      <FloatingWhatsApp whatsapp={settings.whatsapp} siteName={settings.siteName} />
    </>
  );
}
