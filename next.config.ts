import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
