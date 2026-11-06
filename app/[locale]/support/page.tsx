import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { SupportForm } from "@/components/support-form";
import { absoluteUrl, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: t("supportTitle"),
    description: t("supportDescription"),
    alternates: { canonical: absoluteUrl(params.locale, "/support") },
  };
}

export default async function SupportPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "support" });
  const legal = await getTranslations({ locale: params.locale, namespace: "legal" });

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <section className="pb-24 pt-16">
        <Container className="grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Link href="/" className="text-sm underline-offset-4 hover:underline" style={{ color: "var(--muted)" }}>
              {legal("back")}
            </Link>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "var(--accent-text)" }}>
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">{t("title")}</h1>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              {t("subtitle")}
            </p>
            <a
              href={`mailto:${siteConfig.links.supportEmail}`}
              className="mt-6 inline-flex text-sm underline underline-offset-4"
            >
              {siteConfig.links.supportEmail}
            </a>
          </div>
          <SupportForm />
        </Container>
      </section>
    </main>
  );
}
