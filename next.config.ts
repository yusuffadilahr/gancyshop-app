import type { NextConfig } from "next";

const cspHeaders = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://ik.imagekit.io data:;
  font-src 'self';
  connect-src 'self';
  frame-src 'none';
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
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeaders,
          }
        ],
      },
    ];
  },
};

export default nextConfig;
