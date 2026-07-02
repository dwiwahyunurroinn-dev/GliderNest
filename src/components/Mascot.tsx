import { RealisticGlider } from "./RealisticGlider";

/**
 * Maskot GliderNest — sugar glider realistis dalam pose meluncur.
 * Komponen ini membungkus RealisticGlider agar semua pemakaian lama
 * (header, footer, login, 404) otomatis memakai desain terbaru.
 */
export function Mascot({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return <RealisticGlider className={className} animated={animated} />;
}
