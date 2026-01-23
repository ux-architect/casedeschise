import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/images/4sefwx29/production/**'
    },
  ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
