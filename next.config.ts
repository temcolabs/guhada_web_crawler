import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    unoptimized: true,
    // remotePatterns: [
    //   { protocol: "https", hostname: "okimg.okmall.com", pathname: "/**" },
    //   { protocol: "https", hostname: "okst.okmall.com", pathname: "/**" },
    //   { protocol: "https", hostname: "*", pathname: "/**" },
    // ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
