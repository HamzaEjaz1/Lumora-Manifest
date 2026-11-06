import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal-document";
import { absoluteUrl } from "@/config/site";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
    alternates: { canonical: absoluteUrl(params.locale, "/terms") },
  };
}

export default async function TermsPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <LegalDocument
        title={t("termsTitle")}
        description={t("termsDescription")}
        sectionsKey="termsSections"
      />
    </main>
  );
}
