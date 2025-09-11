import type { MetadataRoute } from "next";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseURL || "https://gancy.my.id",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: baseURL + "/" + "products",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
