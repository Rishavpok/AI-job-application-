import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    // Make sure this is NOT set to true (it skips errors)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
