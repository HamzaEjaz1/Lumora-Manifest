import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Figtree, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { absoluteUrl, ogLocales, siteConfig } from "@/config/site";
import { isLocale, isRtl, routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-display",
});

type LocaleParams = { params: { locale: string } };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F3F1",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  const languages = Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(locale)]));

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: {
      canonical: absoluteUrl(params.locale),
      languages,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(params.locale),
      title: t("ogTitle"),
      description: t("description"),
      siteName: siteConfig.name,
      locale: ogLocales[params.locale] ?? "en_US",
      images: [{ url: "/Logo.jpeg", alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("description"),
      images: ["/Logo.jpeg"],
    },
    icons: { icon: "/Logo.jpeg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  if (!isLocale(params.locale)) notFound();

  setRequestLocale(params.locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale: params.locale, namespace: "a11y" });
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" });

  return (
    <html
      lang={params.locale}
      dir={isRtl(params.locale) ? "rtl" : "ltr"}
      className={`${inter.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans antialiased">
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(function(){try{var k="lumora-theme";var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"#12100f":"#F5F3F1")}catch(e){}})();`}
        </Script>
        <Providers locale={params.locale} messages={messages}>
          <JsonLd description={meta("description")} />
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
          >
            {t("skip")}
          </a>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
