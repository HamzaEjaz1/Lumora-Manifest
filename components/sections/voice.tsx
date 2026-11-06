"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { Eyebrow, Section } from "@/components/section";
import { Waveform } from "@/components/waveform";
import { readStrings } from "@/lib/utils";

export function VoiceSection() {
  const t = useTranslations("voice");
  const checks = readStrings(t.raw("checks"));
  const [consent, setConsent] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  return (
    <Section id="voice" labelledBy="voice-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow id="voice-title">{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-4xl font-normal tracking-tight text-white text-balance sm:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pink-muted">{t("body")}</p>
          <p className="mt-4 text-base text-cream">{t("recordings")}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/40">{t("presetsLabel")}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siteConfig.presetVoices.map((voice) => (
              <li key={voice} className="rounded-full border px-3 py-1.5 text-sm text-cream">
                {voice}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-pink-muted">{t("presets")}</p>
        </Reveal>
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-lg font-medium text-cream">{t("checklistTitle")}</h3>
          <ul className="mt-5 space-y-3">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-pink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-cream">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-pink"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                if (!event.target.checked) setPreviewing(false);
              }}
            />
            <span>{t("consent")}</span>
          </label>
          <p className="mt-2 ps-7 text-sm text-pink-muted">{t("consentHint")}</p>
          <div className="mt-6">
            <Waveform active={previewing} label={t("waveform")} />
          </div>
          <button
            type="button"
            disabled={!consent}
            aria-pressed={previewing}
            className="mt-4 h-11 rounded-full bg-white px-5 text-sm font-medium text-black disabled:opacity-40"
            onClick={() => setPreviewing((value) => !value)}
          >
            {previewing ? t("stop") : t("preview")}
          </button>
        </div>
      </div>
    </Section>
  );
}
