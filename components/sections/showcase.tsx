"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Container } from "@/components/container";
import { PhoneMockup, type PhoneScreen } from "@/components/phone-mockup";
import { Eyebrow } from "@/components/section";

const screens: { id: PhoneScreen; key: "home" | "play" | "read" | "favorites" | "profile" | "share" }[] =
  [
    { id: "home", key: "home" },
    { id: "play", key: "play" },
    { id: "read", key: "read" },
    { id: "favorites", key: "favorites" },
    { id: "profile", key: "profile" },
    { id: "share", key: "share" },
  ];

export function Showcase() {
  const t = useTranslations("showcase");
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  function measure() {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = Math.abs(el.scrollLeft);
    setEdges({ start: left < 8, end: left > max - 8 });
  }

  function scrollByDir(direction: number) {
    const el = scroller.current;
    if (!el) return;
    const rtl = document.documentElement.dir === "rtl";
    const delta = el.clientWidth * 0.8 * direction * (rtl ? -1 : 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="relative py-24 md:py-36" aria-labelledby="showcase-title">
      <div className="relative z-10">
        <Container className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow id="showcase-title">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-4xl font-normal tracking-tight text-white text-balance sm:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-lg text-lg text-pink-muted">{t("subtitle")}</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-cream disabled:opacity-30"
              aria-label={t("prev")}
              disabled={edges.start}
              onClick={() => scrollByDir(-1)}
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-cream disabled:opacity-30"
              aria-label={t("next")}
              disabled={edges.end}
              onClick={() => scrollByDir(1)}
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </Container>
        <div
          ref={scroller}
          onScroll={measure}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8"
        >
          {screens.map((screen) => (
            <figure key={screen.id} className="w-[250px] shrink-0 snap-center">
              <PhoneMockup screen={screen.id} />
              <figcaption className="mt-4 text-center text-sm text-cream">
                {t(`screens.${screen.key}`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
