import type { MetadataRoute } from "next";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "http://localhost:300";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // mengizinkan semua bot/crawler(mesin pencari data otomatis browser) mengcrawl web kita
      allow: "/", // mengizinkan bot/crawler mengcrawling data dimulai dari path /
      disallow: "/admin/", // menolak bot/crawler mesin pencari untuk mengcrawling data saat pathname dimulai dari /admin
    },

    sitemap: baseURL + "/" + "sitemap.xml",
  };
}
