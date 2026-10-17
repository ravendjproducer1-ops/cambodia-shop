import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product image URLs are entered by admins; tighten this list for production.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
