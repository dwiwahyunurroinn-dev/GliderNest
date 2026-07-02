/**
 * Latar pemandangan alam bergaya flat modern dalam satu keluarga biru soft:
 * langit, awan yang bergeser pelan, perbukitan berlapis, hutan pinus dan
 * pepohonan, serta burung di kejauhan. Dipakai sebagai background hero dan
 * kartu ilustrasi.
 */
export function NatureScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9f2fd" />
          <stop offset="100%" stopColor="#f8fbff" />
        </linearGradient>
        <linearGradient id="ns-hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d3e4f8" />
          <stop offset="100%" stopColor="#c4daf4" />
        </linearGradient>
        <linearGradient id="ns-hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#a3c4ec" />
        </linearGradient>
        <linearGradient id="ns-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fb6e7" />
          <stop offset="100%" stopColor="#7da9e0" />
        </linearGradient>
      </defs>

      {/* langit */}
      <rect width="1440" height="640" fill="url(#ns-sky)" />

      {/* matahari lembut */}
      <circle cx="1150" cy="130" r="70" fill="#ffffff" opacity="0.75" />
      <circle cx="1150" cy="130" r="110" fill="#ffffff" opacity="0.3" />

      {/* awan bergeser pelan */}
      <g className="nature-cloud" fill="#ffffff" opacity="0.9">
        <ellipse cx="260" cy="110" rx="90" ry="26" />
        <ellipse cx="330" cy="92" rx="60" ry="20" />
        <ellipse cx="200" cy="94" rx="50" ry="18" />
      </g>
      <g className="nature-cloud-slow" fill="#ffffff" opacity="0.7">
        <ellipse cx="760" cy="70" rx="70" ry="20" />
        <ellipse cx="815" cy="56" rx="45" ry="15" />
        <ellipse cx="980" cy="180" rx="55" ry="15" />
      </g>

      {/* burung di kejauhan */}
      <g stroke="#7f9fca" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M520 150 q10 -10 20 0 q10 -10 20 0" />
        <path d="M600 120 q8 -8 16 0 q8 -8 16 0" />
        <path d="M470 190 q7 -7 14 0 q7 -7 14 0" />
      </g>

      {/* bukit jauh */}
      <path
        d="M0 400 C 180 320, 350 350, 520 380 C 700 412, 860 330, 1040 350 C 1200 368, 1330 330, 1440 350 L 1440 640 L 0 640 Z"
        fill="url(#ns-hill-far)"
      />

      {/* barisan hutan (pohon rimbun) di bukit jauh */}
      <g fill="#aecbf0">
        <circle cx="120" cy="392" r="26" />
        <circle cx="160" cy="382" r="32" />
        <circle cx="205" cy="392" r="24" />
        <circle cx="620" cy="400" r="28" />
        <circle cx="665" cy="390" r="34" />
        <circle cx="712" cy="400" r="25" />
        <circle cx="1245" cy="368" r="26" />
        <circle cx="1288" cy="358" r="30" />
        <circle cx="1330" cy="368" r="23" />
      </g>

      {/* bukit tengah */}
      <path
        d="M0 480 C 220 420, 420 470, 640 460 C 880 448, 1060 480, 1240 452 C 1330 438, 1400 448, 1440 456 L 1440 640 L 0 640 Z"
        fill="url(#ns-hill-mid)"
      />

      {/* pohon pinus di bukit tengah */}
      <g fill="#8db3e6">
        <path d="M300 462 l26 -66 l26 66 z M310 434 l16 -42 l16 42 z" />
        <path d="M355 470 l20 -50 l20 50 z" />
        <path d="M900 458 l24 -60 l24 60 z M909 434 l15 -38 l15 38 z" />
        <path d="M952 466 l18 -46 l18 46 z" />
        <path d="M1360 452 l22 -56 l22 56 z" />
      </g>
      {/* batang pinus */}
      <g fill="#7ba3dc">
        <rect x="322" y="458" width="8" height="16" rx="2" />
        <rect x="371" y="466" width="7" height="13" rx="2" />
        <rect x="920" y="454" width="8" height="15" rx="2" />
        <rect x="966" y="462" width="7" height="12" rx="2" />
        <rect x="1378" y="448" width="8" height="14" rx="2" />
      </g>

      {/* tanah depan */}
      <path
        d="M0 560 C 240 520, 480 556, 720 548 C 960 540, 1200 566, 1440 544 L 1440 640 L 0 640 Z"
        fill="url(#ns-ground)"
      />

      {/* pohon besar kiri-kanan di lapisan depan */}
      <g>
        <rect x="86" y="470" width="16" height="96" rx="6" fill="#6d99d6" />
        <circle cx="94" cy="440" r="52" fill="#7fa9e0" />
        <circle cx="58" cy="466" r="36" fill="#7fa9e0" />
        <circle cx="132" cy="464" r="38" fill="#7fa9e0" />
      </g>
      <g>
        <rect x="1322" y="486" width="14" height="84" rx="6" fill="#6d99d6" />
        <circle cx="1329" cy="458" r="44" fill="#7fa9e0" />
        <circle cx="1296" cy="482" r="30" fill="#7fa9e0" />
        <circle cx="1362" cy="480" r="32" fill="#7fa9e0" />
      </g>

      {/* semak kecil */}
      <g fill="#6d99d6" opacity="0.9">
        <ellipse cx="420" cy="572" rx="40" ry="16" />
        <ellipse cx="1080" cy="580" rx="48" ry="18" />
        <ellipse cx="760" cy="590" rx="36" ry="14" />
      </g>
    </svg>
  );
}
