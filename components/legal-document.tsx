import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { readPairs } from "@/lib/utils";

export function LegalDocument({
  title,
  description,
  sectionsKey,
}: {
  title: string;
  description: string;
  sectionsKey: "termsSections" | "privacySections";
}) {
  const t = useTranslations("legal");
  const sections = readPairs(t.raw(sectionsKey));

  return (
    <article className="pb-24 pt-16">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm underline-offset-4 hover:underline" style={{ color: "var(--muted)" }}>
          {t("back")}
        </Link>
        <h1 className="mt-6 text-4xl font-light tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
          {description}
        </p>
        <p className="mt-6 rounded-[24px] border px-4 py-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--surface)" }}>
          {t("draft")}
        </p>
        <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
          {t("updatedLabel")}: {t("updated")}
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-light">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-base">
          <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline underline-offset-4">
            {siteConfig.links.supportEmail}
          </a>
        </p>
      </Container>
    </article>
  );
}
