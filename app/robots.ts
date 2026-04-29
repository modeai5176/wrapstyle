import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://wrapstyle.co/sitemap.xml",
    host: "https://wrapstyle.co",
  };
}
