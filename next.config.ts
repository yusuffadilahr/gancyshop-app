import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const cspHeaders = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://ik.imagekit.io data: blob:;
  font-src 'self';
  connect-src 'self' ws://localhost:8000 ${baseUrl};
  frame-src 'self';
  frame-ancestor 'self';
`

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'ik.imagekit.io',
        protocol: 'https',
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeaders.replace(/\s{2,}/g, " ").trim(),
          }
        ],
      },
    ];
  },
};

export default nextConfig;
