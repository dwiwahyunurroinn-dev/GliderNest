/**
 * Siluet sugar glider sederhana sebagai placeholder visual.
 * Ganti dengan foto asli glider Anda di kemudian hari (next/image).
 */
export function GliderMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* badan */}
      <ellipse cx="60" cy="72" rx="26" ry="30" />
      {/* kepala */}
      <circle cx="60" cy="38" r="18" />
      {/* telinga */}
      <path d="M44 28 C40 12, 52 14, 52 24 Z" />
      <path d="M76 28 C80 12, 68 14, 68 24 Z" />
      {/* membran gliding */}
      <path d="M34 60 C18 70, 16 92, 30 98 C36 88, 38 74, 42 66 Z" opacity="0.7" />
      <path d="M86 60 C102 70, 104 92, 90 98 C84 88, 82 74, 78 66 Z" opacity="0.7" />
      {/* ekor */}
      <path d="M60 100 C60 112, 78 116, 88 108 C80 108, 70 104, 68 96 Z" opacity="0.85" />
      {/* mata */}
      <circle cx="53" cy="36" r="4.5" fill="var(--background)" />
      <circle cx="67" cy="36" r="4.5" fill="var(--background)" />
    </svg>
  );
}
