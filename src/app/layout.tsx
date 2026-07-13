import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/settings";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://glidernest.id"),
    // favicon bisa diganti dari Admin → Pengaturan → Logo & Maskot
    icons: { icon: s.faviconUrl || "/favicon.ico" },
    title: {
      default: `${s.siteName} — ${s.tagline}`,
      template: `%s — ${s.siteName}`,
    },
    description:
      s.description ||
      `${s.siteName} adalah peternakan sugar glider captive-bred yang mengutamakan kesehatan, silsilah jelas, dan edukasi perawatan.`,
    openGraph: {
      title: `${s.siteName} — ${s.tagline}`,
      description: s.description,
      siteName: s.siteName,
      locale: "id_ID",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('gn-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
