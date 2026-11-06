import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal-document";
import { absoluteUrl } from "@/config/site";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: { canonical: absoluteUrl(params.locale, "/privacy") },
  };
}

export default async function PrivacyPage({ params }: Props) {
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <LegalDocument
        title={t("privacyTitle")}
        description={t("privacyDescription")}
        sectionsKey="privacySections"
      />
    </main>
  );
}
