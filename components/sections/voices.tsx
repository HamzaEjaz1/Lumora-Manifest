"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { marketing } from "@/config/marketing";

const gradients = [
  "linear-gradient(135deg, #f3b7cc, #e7c4a8)",
  "linear-gradient(135deg, #d9c7f2, #f3c2d4)",
  "linear-gradient(135deg, #f6d2bf, #e7c9f0)",
  "linear-gradient(135deg, #c9d4f2, #f0c6d6)",
  "linear-gradient(135deg, #f0c9b4, #d8c6ef)",
];

export function Voices() {
  const t = useTranslations("page");
  const [selected, setSelected] = useState<string>(marketing.voices[0]?.id ?? "mine");

  return (
    <section id="voices" className="section-space" aria-labelledby="voices-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="rounded-[32px] border px-5 py-12 sm:px-10 sm:py-14" style={{ background: "var(--panel)", color: "var(--panel-text)", borderColor: "var(--border)" }}>
          <h2 id="voices-title" className="headline max-w-xl" style={{ color: "var(--panel-text)" }}>
            {t("voicesTitle")}
          </h2>
          <p className="mt-4 max-w-md text-base leading-normal" style={{ color: "var(--panel-muted)" }}>
            {t("voicesBody")}
          </p>
          <ul className="mt-10 divide-y divide-white/10" role="list">
            {marketing.voices.map((voice, index) => {
              const active = voice.id === selected;
              return (
                <li key={voice.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    className="flex w-full items-center gap-4 rounded-2xl px-3 py-4 text-start"
                    style={{ background: active ? "rgba(255,255,255,0.08)" : "transparent" }}
                    onClick={() => setSelected(voice.id)}
                  >
                    <span
                      aria-hidden
                      className="h-11 w-11 shrink-0 rounded-full"
                      style={{ background: gradients[index % gradients.length] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-medium">{t(`voiceCopy.${voice.id}.name`)}</span>
                      <span className="mt-0.5 block text-sm" style={{ color: "var(--panel-muted)" }}>
                        {t(`voiceCopy.${voice.id}.description`)}
                      </span>
                    </span>
                    <span className="flex h-8 items-end gap-[2px]" aria-hidden>
                      {[10, 16, 12, 18].map((height, bar) => (
                        <span
                          key={height}
                          className={active ? "wave-bar w-[3px] rounded-full bg-white" : "w-[3px] rounded-full bg-white/40"}
                          style={{ height, animationDelay: `${bar * 0.08}s` }}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
