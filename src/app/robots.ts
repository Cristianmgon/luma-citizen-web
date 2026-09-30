import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/verificador", "/radar", "/educacion", "/terminos"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://lumaprotect.app/sitemap.xml",
  };
}
