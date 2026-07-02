import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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
