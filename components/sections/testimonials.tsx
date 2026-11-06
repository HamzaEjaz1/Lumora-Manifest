import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section } from "@/components/section";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <Section labelledBy="notes-title">
      <Reveal>
        <Eyebrow id="notes-title">{t("eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-4xl font-normal tracking-tight text-white text-balance sm:text-6xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-pink-muted">{t("disclaimer")}</p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {siteConfig.testimonials.map((item) => (
          <figure key={item.name} className="glass-card flex h-full flex-col p-7">
            <blockquote className="text-lg font-light leading-relaxed text-cream">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="text-cream">{item.name}</span>
              <span className="text-pink-muted"> · {item.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
