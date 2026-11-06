import { setRequestLocale } from "next-intl/server";
import { StoryStage } from "@/components/story-stage";
import { Bento } from "@/components/sections/bento";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { PrivacyBand } from "@/components/sections/privacy";
import { Voices } from "@/components/sections/voices";

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      <Hero />
      <StoryStage />
      <Bento />
      <Voices />
      <HowItWorks />
      <PrivacyBand />
      <Pricing />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
