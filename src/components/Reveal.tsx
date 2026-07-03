"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "initial" | "hidden" | "shown";

/**
 * Memunculkan konten dengan animasi halus saat masuk viewport.
 * Tahan-gagal: konten dirender TERLIHAT sejak awal (server), lalu setelah
 * JavaScript aktif barulah elemen di bawah layar disembunyikan untuk
 * dianimasikan. Jika JS tidak jalan, semuanya tetap tampil normal.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("initial");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;
    // rAF: ukur posisi setelah paint, di luar fase render
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      // sudah terlihat di layar? biarkan tampil, tanpa animasi masuk
      if (rect.top < window.innerHeight * 0.92) {
        setPhase("shown");
        return;
      }
      setPhase("hidden");
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPhase("shown");
            observer?.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        phase === "hidden" ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
