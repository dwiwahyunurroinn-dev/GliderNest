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
  ],
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
