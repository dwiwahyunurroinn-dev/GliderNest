"use client";

import { useRef } from "react";
import { RealisticGlider } from "./RealisticGlider";

/**
 * Adegan maskot meluncur di hero:
 * - jalur terbang melengkung dengan banking 3D (keyframes glide-flight)
 * - membran bergetar, ekor mengayun, mata berkedip
 * - seluruh adegan miring mengikuti posisi kursor (perspektif 3D)
 * - bayangan di "tanah" mengikuti posisi terbang
 */
export function HeroGlider({
  mascotUrl,
  className = "",
}: {
  mascotUrl?: string;
  className?: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 16}deg) rotateX(${-py * 12}deg)`;
  }

  function handleLeave() {
    const el = sceneRef.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  }

  return (
    <div
      className={`relative ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ perspective: "1100px" }}
    >
      <div
        ref={sceneRef}
        className="relative h-full w-full transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* lingkaran cahaya lembut */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-shimmer rounded-full bg-gradient-to-br from-brand-soft via-white to-gold-soft blur-xl" />

        {/* maskot terbang */}
        <div className="glider-flight absolute inset-0 flex items-center justify-center">
          {mascotUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mascotUrl}
              alt="Maskot sugar glider"
              className="h-64 w-64 object-contain drop-shadow-2xl sm:h-72 sm:w-72"
            />
          ) : (
            <RealisticGlider className="h-72 w-72 drop-shadow-2xl sm:h-80 sm:w-80" />
          )}
        </div>

        {/* bayangan di tanah */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center">
          <div className="glider-shadow h-7 w-52 rounded-full bg-brand/35 blur-lg" />
        </div>
      </div>
    </div>
  );
}
