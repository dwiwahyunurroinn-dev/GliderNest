import { PawPrint } from "lucide-react";
import { Mascot } from "./Mascot";

/**
 * Logo situs. Prioritas: logo yang diunggah admin → ikon bawaan.
 * `fallback="mascot"` hanya dipakai di panel admin (halaman publik tanpa
 * maskot sesuai arahan pemilik).
 */
export function BrandMark({
  logoUrl,
  className = "",
  fallback = "icon",
}: {
  logoUrl?: string;
  className?: string;
  fallback?: "icon" | "mascot";
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
  if (fallback === "mascot") {
    return <Mascot className={className} animated={false} />;
  }
  return <PawPrint className={`${className} p-1 text-brand`} strokeWidth={2} />;
}
