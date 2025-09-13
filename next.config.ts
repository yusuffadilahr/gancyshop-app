import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "http://localhost:3000";

const baseUrlApi = isProduction
  ? process.env.NEXT_PUBLIC_DOMAIN_API
  : "http://localhost:8000";

const cspHeaders = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://ik.imagekit.io data: blob:;
  font-src 'self';
  connect-src 'self' ws://localhost:8000 ${baseUrl} ${baseUrlApi};
  frame-src 'self';
`;

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? true : false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeaders.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
