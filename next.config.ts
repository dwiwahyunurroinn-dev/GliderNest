import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Izinkan membuka dev server dari perangkat lain di jaringan yang sama
  // (mis. HP via http://192.168.x.x:3000). Tanpa ini Next 16 memblokir
  // aset JavaScript untuk permintaan lintas-origin saat development.
  allowedDevOrigins: [
    "192.168.*.*",
    "192.168.*",
    "10.*.*.*",
    "172.16.*.*",
    "*.local",
    // izinkan akses lewat Cloudflare Tunnel sementara (demo publik)
    "*.trycloudflare.com",
  ],
  experimental: {
    serverActions: {
      // upload foto dari admin bisa melebihi batas bawaan 1MB
      bodySizeLimit: "8mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // cegah website dibungkus iframe situs lain (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // cegah browser menebak-nebak tipe file (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // jangan bocorkan URL lengkap saat pengunjung klik link keluar
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // matikan akses sensor yang tidak dipakai website ini
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/gliders",
        destination: "/sugar-glider",
        permanent: true,
      },
      {
        source: "/gliders/:slug",
        destination: "/sugar-glider/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
