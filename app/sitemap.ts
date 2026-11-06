import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";

const paths = ["", "/terms", "/privacy", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date("2026-11-06"),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, absoluteUrl(item, path)]),
        ),
      },
    })),
  );
}

export const dynamic = "force-static";
