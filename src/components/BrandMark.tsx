import { Mascot } from "./Mascot";

/** Logo situs: pakai gambar dari pengaturan admin, atau maskot bawaan. */
export function BrandMark({
  logoUrl,
  className = "",
}: {
  logoUrl?: string;
  className?: string;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt="Logo"
        className={`${className} rounded-full object-cover`}
      />
    );
  }
  return <Mascot className={className} animated={false} />;
}

/** Maskot besar (hero, halaman promosi): gambar kustom atau SVG bawaan. */
export function MascotDisplay({
  mascotUrl,
  className = "",
  animated = true,
}: {
  mascotUrl?: string;
  className?: string;
  animated?: boolean;
}) {
  if (mascotUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={mascotUrl}
        alt="Maskot"
        className={`${className} object-contain`}
      />
    );
  }
  return <Mascot className={className} animated={animated} />;
}
