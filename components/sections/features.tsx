import {
  AudioLines,
  Bookmark,
  BookOpen,
  Heart,
  Languages,
  Share2,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section } from "@/components/section";
import { readPairs } from "@/lib/utils";

const icons = [Heart, BookOpen, AudioLines, Bookmark, Share2, Languages, Sparkles];

export function Features() {
  const t = useTranslations("features");
  const items = readPairs(t.raw("items"));

  return (
    <Section id="stories" labelledBy="stories-title">
      <Reveal>
        <Eyebrow id="stories-title">{t("eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-4xl font-normal tracking-tight text-white text-balance sm:text-6xl">
          {t("title")}
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <Reveal key={item.title} delay={Math.min(index, 4) * 0.05}>
              <FeatureCard
                icon={<Icon className="h-5 w-5" aria-hidden />}
                title={item.title}
                body={item.body}
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
