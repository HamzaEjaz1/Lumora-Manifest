"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
  const nav = useTranslations("nav");
  const t = useTranslations("page");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1100) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
      <div className="nav-bar mx-auto w-full max-w-7xl px-4 sm:px-8">
        <a href={homeHref(locale, pathname)} className="min-w-0 shrink" aria-label={a11y("logo")} onClick={() => setOpen(false)}>
          <Wordmark caps />
        </a>
        <nav aria-label={a11y("primaryNav")} className="nav-links nav-desktop">
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
        <div className="nav-tools">
          <LanguageSwitcher />
          <ThemeToggle />
          <a href={sectionHref(locale, pathname, "download")} className="btn btn-primary h-10 px-4 text-sm">
            {t("getApp")}
          </a>
        </div>
        <div className="nav-burger items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{open ? nav("closeMenu") : nav("openMenu")}</span>
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={open ? "nav-menu is-open" : "nav-menu"}>
        <nav aria-label={a11y("primaryNav")} className="flex flex-col">
          {links.map((link) => (
            <a
              key={link.id}
              href={sectionHref(locale, pathname, link.id)}
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <LanguageSwitcher />
        </div>
        <a
          href={sectionHref(locale, pathname, "download")}
          className="btn btn-primary mt-4 w-full"
          onClick={() => setOpen(false)}
        >
          {t("getApp")}
        </a>
      </div>
    </header>
  );
}
