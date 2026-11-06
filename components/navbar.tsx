"use client";

import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { usePathname } from "@/i18n/navigation";
import { homeHref, sectionHref } from "@/lib/utils";

const links = [
  { id: "stories", key: "navStories" },
  { id: "voices", key: "navVoices" },
  { id: "how", key: "navHow" },
  { id: "pricing", key: "navPricing" },
  { id: "faq", key: "navFaq" },
] as const;

export function Navbar() {
  const a11y = useTranslations("a11y");
  const t = useTranslations("page");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--bg) 82%, transparent)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href={homeHref(locale, pathname)} aria-label={a11y("logo")}>
          <Wordmark caps />
        </a>
        <nav aria-label={a11y("primaryNav")} className="nav-links items-center gap-7">
          {links.map((link) => (
            <a
              key={link.id}
              href={sectionHref(locale, pathname, link.id)}
              className="text-sm font-medium"
              style={{ color: "var(--muted)" }}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a href={sectionHref(locale, pathname, "download")} className="btn btn-primary h-10 px-4 text-sm">
            {t("getApp")}
          </a>
        </div>
      </div>
    </header>
  );
}
