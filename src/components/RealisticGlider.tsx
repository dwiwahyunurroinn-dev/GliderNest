/**
 * Maskot sugar glider realistis dalam pose meluncur (patagium terbentang),
 * digambar vektor dengan gradasi bulu mengikuti anatomi aslinya: bulu abu,
 * garis punggung gelap dari hidung ke dahi, mata besar mengkilap, telinga
 * pink, perut krem, dan ekor panjang berujung gelap sebagai kemudi.
 *
 * Bagian tubuh dikelompokkan agar bisa dianimasikan terpisah (globals.css):
 * membran bergetar, ekor mengayun, lengan menyesuaikan angin, mata berkedip.
 */
export function RealisticGlider({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const cls = (name: string) => (animated ? name : undefined);
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="rg-body" cx="50%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#c9d0da" />
          <stop offset="55%" stopColor="#9aa3b1" />
          <stop offset="100%" stopColor="#707a89" />
        </radialGradient>
        <linearGradient id="rg-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cdd3dc" />
          <stop offset="70%" stopColor="#a3abb8" />
          <stop offset="100%" stopColor="#8a93a1" />
        </linearGradient>
        <radialGradient id="rg-belly" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#faf5e9" />
          <stop offset="100%" stopColor="#e6dbc2" />
        </radialGradient>
        <linearGradient id="rg-membrane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b3bac6" />
          <stop offset="80%" stopColor="#8b93a1" />
          <stop offset="100%" stopColor="#7b8391" />
        </linearGradient>
        <linearGradient id="rg-membrane-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3d4cb" />
          <stop offset="100%" stopColor="#e2b3a8" />
        </linearGradient>
        <linearGradient id="rg-tail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9aa2af" />
          <stop offset="60%" stopColor="#6d7582" />
          <stop offset="100%" stopColor="#3c424d" />
        </linearGradient>
        <radialGradient id="rg-eye" cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#5d4630" />
          <stop offset="45%" stopColor="#2c2117" />
          <stop offset="100%" stopColor="#150f0a" />
        </radialGradient>
        <linearGradient id="rg-stripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a404c" />
          <stop offset="100%" stopColor="#4b5260" />
        </linearGradient>
      </defs>

      {/* ===== ekor (kemudi) ===== */}
      <g className={cls("glider-tail")}>
        <path
          d="M266 342
             C 300 402, 350 440, 396 420
             C 424 407, 428 372, 406 358
             C 390 348, 370 354, 366 370
             C 363 383, 374 392, 386 388
             C 380 402, 352 400, 330 376
             C 310 354, 300 336, 292 322 Z"
          fill="url(#rg-tail)"
        />
        {/* ujung ekor lebih gelap */}
        <path
          d="M396 420 C 424 407, 428 372, 406 358 C 396 352, 384 353, 376 359 C 392 362, 404 374, 402 390 C 401 402, 394 412, 382 417 C 387 420, 392 421, 396 420 Z"
          fill="#2e333d"
        />
      </g>

      {/* ===== membran patagium kiri ===== */}
      <g className={cls("glider-membrane")}>
        <path
          d="M96 190 C 48 226, 40 292, 92 330 C 128 352, 162 356, 182 348
             C 168 316, 178 268, 206 232 C 178 210, 134 196, 96 190 Z"
          fill="url(#rg-membrane)"
        />
        {/* tepi bawah membran (kulit pink terlihat dari bawah) */}
        <path
          d="M92 330 C 128 352, 162 356, 182 348 C 176 336, 172 322, 172 308
             C 152 322, 118 328, 92 330 Z"
          fill="url(#rg-membrane-edge)"
        />
      </g>

      {/* ===== membran patagium kanan ===== */}
      <g className={cls("glider-membrane")}>
        <path
          d="M416 190 C 464 226, 472 292, 420 330 C 384 352, 350 356, 330 348
             C 344 316, 334 268, 306 232 C 334 210, 378 196, 416 190 Z"
          fill="url(#rg-membrane)"
        />
        <path
          d="M420 330 C 384 352, 350 356, 330 348 C 336 336, 340 322, 340 308
             C 360 322, 394 328, 420 330 Z"
          fill="url(#rg-membrane-edge)"
        />
      </g>

      {/* ===== lengan depan ===== */}
      <g className={cls("glider-limb")}>
        <path
          d="M212 214 C 168 198, 128 190, 98 192 C 88 193, 84 202, 92 208
             C 124 216, 164 228, 200 246 Z"
          fill="#8d96a4"
        />
        {/* jari tangan kiri */}
        <path
          d="M100 190 l-16 -10 m14 14 l-19 -4 m19 9 l-18 3"
          stroke="#e3b0a6"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g className={cls("glider-limb")}>
        <path
          d="M300 214 C 344 198, 384 190, 414 192 C 424 193, 428 202, 420 208
             C 388 216, 348 228, 312 246 Z"
          fill="#8d96a4"
        />
        <path
          d="M412 190 l16 -10 m-14 14 l19 -4 m-19 9 l18 3"
          stroke="#e3b0a6"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ===== kaki belakang ===== */}
      <path
        d="M226 322 C 202 336, 182 344, 168 346 C 158 348, 156 356, 164 360
           C 184 362, 214 352, 238 336 Z"
        fill="#828b99"
      />
      <path
        d="M286 322 C 310 336, 330 344, 344 346 C 354 348, 356 356, 348 360
           C 328 362, 298 352, 274 336 Z"
        fill="#828b99"
      />
      <path
        d="M166 346 l-14 8 m12 -2 l-16 2"
        stroke="#e3b0a6"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M346 346 l14 8 m-12 -2 l16 2"
        stroke="#e3b0a6"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ===== badan ===== */}
      <ellipse cx="256" cy="268" rx="64" ry="80" fill="url(#rg-body)" />
      {/* perut krem */}
      <ellipse cx="256" cy="286" rx="45" ry="60" fill="url(#rg-belly)" />
      {/* bayangan lembut sisi badan */}
      <path
        d="M196 240 C 188 280, 196 320, 220 344 C 200 320, 194 278, 202 242 Z"
        fill="#5f6774"
        opacity="0.45"
      />
      <path
        d="M316 240 C 324 280, 316 320, 292 344 C 312 320, 318 278, 310 242 Z"
        fill="#5f6774"
        opacity="0.45"
      />

      {/* ===== kepala ===== */}
      <g>
        {/* telinga */}
        <path
          d="M198 108 C 174 66, 182 40, 208 46 C 228 52, 238 78, 234 100 Z"
          fill="#98a1ae"
        />
        <path
          d="M204 100 C 190 70, 194 54, 210 58 C 222 62, 229 80, 226 96 Z"
          fill="#e6a9a2"
        />
        <path
          d="M314 108 C 338 66, 330 40, 304 46 C 284 52, 274 78, 278 100 Z"
          fill="#98a1ae"
        />
        <path
          d="M308 100 C 322 70, 318 54, 302 58 C 290 62, 283 80, 286 96 Z"
          fill="#e6a9a2"
        />

        {/* kepala */}
        <ellipse cx="256" cy="152" rx="68" ry="62" fill="url(#rg-head)" />
        {/* wajah krem */}
        <path
          d="M198 158 C 204 196, 232 214, 256 214 C 280 214, 308 196, 314 158
             C 300 178, 280 188, 256 188 C 232 188, 212 178, 198 158 Z"
          fill="#f4eedd"
        />
        <ellipse cx="256" cy="186" rx="40" ry="26" fill="url(#rg-belly)" />
        {/* patch krem di atas mata */}
        <ellipse cx="219" cy="120" rx="18" ry="12" fill="#e9e2cf" opacity="0.9" />
        <ellipse cx="293" cy="120" rx="18" ry="12" fill="#e9e2cf" opacity="0.9" />

        {/* garis khas gelap: hidung → dahi */}
        <path
          d="M249 176 C 247 148, 245 116, 240 94 C 246 88, 266 88, 272 94
             C 267 116, 265 148, 263 176 Z"
          fill="url(#rg-stripe)"
        />
        {/* garis gelap dari mata ke telinga */}
        <path
          d="M196 132 C 204 122, 214 118, 224 122 C 214 126, 205 132, 199 140 Z"
          fill="#4b5260"
          opacity="0.8"
        />
        <path
          d="M316 132 C 308 122, 298 118, 288 122 C 298 126, 307 132, 313 140 Z"
          fill="#4b5260"
          opacity="0.8"
        />

        {/* mata besar mengkilap */}
        <g className={cls("glider-eye")}>
          <circle cx="221" cy="150" r="24" fill="url(#rg-eye)" />
          <circle cx="221" cy="150" r="24" fill="none" stroke="#e9e2cf" strokeWidth="2.5" opacity="0.7" />
          <circle cx="229" cy="141" r="7.5" fill="#ffffff" opacity="0.95" />
          <circle cx="214" cy="157" r="3.2" fill="#ffffff" opacity="0.6" />
          <path d="M206 162 A 24 24 0 0 0 236 165" stroke="#7a5c3d" strokeWidth="2" fill="none" opacity="0.5" />
        </g>
        <g className={cls("glider-eye")}>
          <circle cx="291" cy="150" r="24" fill="url(#rg-eye)" />
          <circle cx="291" cy="150" r="24" fill="none" stroke="#e9e2cf" strokeWidth="2.5" opacity="0.7" />
          <circle cx="299" cy="141" r="7.5" fill="#ffffff" opacity="0.95" />
          <circle cx="284" cy="157" r="3.2" fill="#ffffff" opacity="0.6" />
          <path d="M276 162 A 24 24 0 0 0 306 165" stroke="#7a5c3d" strokeWidth="2" fill="none" opacity="0.5" />
        </g>

        {/* hidung & mulut */}
        <path
          d="M247 178 C 250 174, 262 174, 265 178 C 268 183, 263 190, 256 190 C 249 190, 244 183, 247 178 Z"
          fill="#d6858f"
        />
        <path d="M252 182 a2 2 0 1 0 0.1 0 M259 182 a2 2 0 1 0 0.1 0" fill="#a95f6b" />
        <path
          d="M256 190 C 256 196, 250 199, 246 197 M256 190 C 256 196, 262 199, 266 197"
          stroke="#6e5546"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* kumis */}
        <g stroke="#5a626f" strokeWidth="1.4" opacity="0.55" fill="none" strokeLinecap="round">
          <path d="M234 176 C 216 174, 202 176, 190 180" />
          <path d="M234 182 C 218 184, 206 188, 196 194" />
          <path d="M278 176 C 296 174, 310 176, 322 180" />
          <path d="M278 182 C 294 184, 306 188, 316 194" />
        </g>
      </g>

      {/* ===== tekstur bulu halus ===== */}
      <g stroke="#ffffff" strokeWidth="1.4" opacity="0.28" fill="none" strokeLinecap="round">
        <path d="M215 230 C 212 238, 211 246, 212 252" />
        <path d="M297 230 C 300 238, 301 246, 300 252" />
        <path d="M236 210 C 233 216, 232 222, 233 227" />
        <path d="M276 210 C 279 216, 280 222, 279 227" />
        <path d="M226 108 C 224 114, 224 119, 225 123" />
        <path d="M286 108 C 288 114, 288 119, 287 123" />
      </g>
      <g stroke="#525a67" strokeWidth="1.4" opacity="0.35" fill="none" strokeLinecap="round">
        <path d="M204 300 C 202 308, 202 316, 204 322" />
        <path d="M308 300 C 310 308, 310 316, 308 322" />
        <path d="M256 332 C 254 338, 254 342, 256 346" />
      </g>
    </svg>
  );
}
