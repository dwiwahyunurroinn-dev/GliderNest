/**
 * "Gigi" — maskot GliderNest. Digambar manual sebagai SVG vektor agar tajam
 * di semua ukuran. Mata berkedip & ekor bergoyang via CSS (globals.css);
 * set `animated={false}` untuk versi statis (mis. di footer/ikon kecil).
 */
export function Mascot({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      {/* ekor */}
      <path
        className={animated ? "mascot-tail" : undefined}
        d="M158 196 C196 202 216 180 212 150 C210 134 198 126 186 132 C176 137 178 150 188 152 C196 154 198 162 192 170 C184 181 170 186 154 184 Z"
        fill="#3d5247"
      />
      {/* membran meluncur (seperti jubah) */}
      <path
        d="M52 128 C20 148 16 186 44 198 C58 176 60 152 70 138 Z"
        fill="#7fb69b"
      />
      <path
        d="M188 128 C220 148 224 186 196 198 C182 176 180 152 170 138 Z"
        fill="#7fb69b"
      />
      {/* badan */}
      <ellipse cx="120" cy="164" rx="52" ry="46" fill="#9db4a4" />
      {/* perut krem */}
      <ellipse cx="120" cy="174" rx="34" ry="30" fill="#f6f1e4" />
      {/* kaki */}
      <ellipse cx="94" cy="204" rx="12" ry="8" fill="#3d5247" />
      <ellipse cx="146" cy="204" rx="12" ry="8" fill="#3d5247" />
      {/* tangan memegang daun */}
      <ellipse cx="76" cy="168" rx="10" ry="8" fill="#8aa392" />
      <ellipse cx="164" cy="168" rx="10" ry="8" fill="#8aa392" />
      {/* daun kecil di tangan */}
      <path
        d="M164 160 C176 146 194 144 200 152 C194 162 178 166 166 164 Z"
        fill="#2f8f5b"
      />
      <path d="M167 162 C178 155 190 152 197 153" stroke="#1e5c3c" strokeWidth="1.6" fill="none" />
      {/* telinga */}
      <path d="M66 52 C58 22 84 16 96 38 C90 50 78 56 66 52 Z" fill="#9db4a4" />
      <path d="M174 52 C182 22 156 16 144 38 C150 50 162 56 174 52 Z" fill="#9db4a4" />
      <path d="M72 48 C68 30 84 26 92 40 C87 47 79 51 72 48 Z" fill="#e9c1b4" />
      <path d="M168 48 C172 30 156 26 148 40 C153 47 161 51 168 48 Z" fill="#e9c1b4" />
      {/* kepala */}
      <circle cx="120" cy="92" r="54" fill="#aec3b3" />
      {/* garis khas di dahi */}
      <path
        d="M114 40 C118 36 122 36 126 40 L124 66 C122 70 118 70 116 66 Z"
        fill="#3d5247"
      />
      {/* area wajah krem */}
      <ellipse cx="120" cy="104" rx="40" ry="32" fill="#f6f1e4" />
      {/* mata besar */}
      <g className={animated ? "mascot-eye" : undefined}>
        <circle cx="98" cy="92" r="15" fill="#142319" />
        <circle cx="103" cy="87" r="5" fill="#ffffff" />
        <circle cx="94" cy="97" r="2.5" fill="#ffffff" opacity="0.85" />
      </g>
      <g className={animated ? "mascot-eye" : undefined}>
        <circle cx="142" cy="92" r="15" fill="#142319" />
        <circle cx="147" cy="87" r="5" fill="#ffffff" />
        <circle cx="138" cy="97" r="2.5" fill="#ffffff" opacity="0.85" />
      </g>
      {/* hidung & mulut */}
      <ellipse cx="120" cy="108" rx="6" ry="4.5" fill="#d98a80" />
      <path
        d="M120 112 C120 118 114 120 110 118 M120 112 C120 118 126 120 130 118"
        stroke="#3d5247"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* pipi merona */}
      <ellipse cx="88" cy="110" rx="8" ry="5" fill="#e9b7ab" opacity="0.7" />
      <ellipse cx="152" cy="110" rx="8" ry="5" fill="#e9b7ab" opacity="0.7" />
    </svg>
  );
}
