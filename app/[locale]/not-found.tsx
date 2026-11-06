import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="content" tabIndex={-1} className="outline-none">
        <Container className="pb-28 pt-16">
        <h1 className="max-w-xl text-4xl font-light tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 max-w-lg text-lg" style={{ color: "var(--muted)" }}>
          {t("body")}
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          {t("cta")}
        </Link>
      </Container>
    </main>
  );
}
