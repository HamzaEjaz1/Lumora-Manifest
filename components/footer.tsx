"use client";

import { useLocale, useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Wordmark } from "@/components/wordmark";
import { siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { homeHref, sectionHref } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("footer");
  const page = useTranslations("page");
  const locale = useLocale();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const hash = (id: string) => sectionHref(locale, pathname, id);

  return (
    <footer className="border-t py-16" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <a href={homeHref(locale, pathname)} className="inline-flex">
            <Wordmark />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {page("subhead")}
          </p>
        </div>
        <FooterColumn title={page("footerProduct")}>
          <a href={hash("stories")}>{page("navStories")}</a>
          <a href={hash("voices")}>{page("navVoices")}</a>
          <a href={hash("how")}>{page("navHow")}</a>
          <a href={hash("pricing")}>{page("navPricing")}</a>
        </FooterColumn>
        <FooterColumn title={page("footerSupport")}>
          <Link href="/support">{page("footerHelp")}</Link>
          <a href={`mailto:${siteConfig.links.supportEmail}`}>{siteConfig.links.supportEmail}</a>
        </FooterColumn>
        <FooterColumn title={page("footerLegal")}>
          <Link href="/terms">{page("terms")}</Link>
          <Link href="/privacy">{page("privacyLink")}</Link>
          <div className="pt-2">
            <LanguageSwitcher />
          </div>
        </FooterColumn>
      </div>
      <div className="mx-auto mt-12 w-full max-w-7xl px-5 text-sm sm:px-8" style={{ color: "var(--muted)" }}>
        <p>
          © {year} {siteConfig.name}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {title}
      </p>
      <div className="mt-4 flex flex-col gap-3 text-sm [&_a:hover]:underline">{children}</div>
    </div>
  );
}
