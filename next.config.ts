import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/bs8bk8kq/image/upload/**')],
  },
};

export default nextConfig;
