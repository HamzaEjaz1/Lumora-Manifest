"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const storyScale = 8;

function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: siteConfig.pricing.currency,
  }).format(amount);
}

export function Pricing() {
  const t = useTranslations("page");
  const plans = siteConfig.pricing.plans;
  const initial = plans.find((plan) => plan.featured)?.id ?? plans[0].id;
  const [selectedId, setSelectedId] = useState<string>(initial);
  const [highlight, setHighlight] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const selected = plans.find((plan) => plan.id === selectedId) ?? plans[0];
  const priceLabel = `${money(selected.amount)}/${selected.interval}`;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[aria-checked="true"]');
      if (!active) return;
      setHighlight({ top: active.offsetTop, height: active.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selectedId]);

  function choose(id: string, shouldFocus = false) {
    setSelectedId(id);
    if (!shouldFocus) return;
    requestAnimationFrame(() => document.getElementById(`${labelId}-${id}`)?.focus());
  }

  function onKeyDown(event: KeyboardEvent) {
    const index = plans.findIndex((plan) => plan.id === selected.id);
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(plans.length - 1, index + 1);
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = plans.length - 1;
    else return;
    event.preventDefault();
    const plan = plans[next];
    if (plan) choose(plan.id, true);
  }

  return (
    <section id="pricing" className="section-space" aria-labelledby="pricing-title">
      <div className="mx-auto w-full max-w-xl px-5 sm:px-8">
        <h2 id="pricing-title" className="headline text-center">
          {t("pricingTitle")}
        </h2>

        <div
          ref={listRef}
          className="relative mt-10 space-y-2 rounded-[28px] p-2"
          style={{ background: "var(--surface)" }}
          role="radiogroup"
          aria-label={t("pricingTitle")}
          onKeyDown={onKeyDown}
        >
          <span
            aria-hidden
            className="plan-highlight pointer-events-none absolute inset-x-2 rounded-[22px] border-2"
            style={{
              top: highlight.top,
              height: highlight.height,
              opacity: highlight.height ? 1 : 0,
              borderColor: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 8%, var(--card))",
              boxShadow: "0 10px 30px rgba(194, 24, 91, 0.08)",
            }}
          />
          {plans.map((plan) => {
            const active = plan.id === selected.id;
            return (
              <button
                key={plan.id}
                id={`${labelId}-${plan.id}`}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                className={`relative flex w-full items-start gap-4 rounded-[22px] px-4 py-4 text-start transition-colors duration-200 ${active ? "" : "hover:bg-[var(--card)]"}`}
                onClick={() => choose(plan.id)}
              >
                <span
                  aria-hidden
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-200"
                  style={{ borderColor: active ? "var(--accent)" : "var(--border)", background: "var(--card)" }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full transition-transform duration-200"
                    style={{
                      background: "var(--accent)",
                      transform: active ? "scale(1)" : "scale(0)",
                    }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-base font-medium">{plan.name}</span>
                    <span className="shrink-0 text-sm">
                      {money(plan.amount)}/{plan.interval}
                    </span>
                  </span>
                  {plan.featured ? (
                    <span
                      className="mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                    >
                      {t("bestValue")}
                    </span>
                  ) : null}
                  <span className="mt-1 block text-sm" style={{ color: "var(--muted)" }}>
                    {plan.storiesPerDay} {t("storiesDaily")}
                  </span>
                  <span className="mt-3 flex gap-1" aria-hidden>
                    {Array.from({ length: storyScale }, (_, mark) => (
                      <span
                        key={mark}
                        className="h-1.5 flex-1 rounded-full"
                        style={{
                          background: mark < plan.storiesPerDay ? "var(--accent)" : "var(--border)",
                          opacity: active || mark < plan.storiesPerDay ? 1 : 0.45,
                          transition: "background 0.25s ease, opacity 0.25s ease",
                          transitionDelay: active ? `${mark * 25}ms` : "0ms",
                        }}
                      />
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="panel mt-4 px-5 py-5 text-center" aria-live="polite">
          <p key={selected.id} className="plan-swap text-base font-medium">
            {selected.name} · {priceLabel}
          </p>
          <a className="btn btn-primary mt-4 w-full" href={siteConfig.links.appStore} rel="noreferrer">
            <span key={selected.cta} className="plan-swap">
              {t("continueWith")} {selected.cta}
            </span>
          </a>
          <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
            {t("renews")}
          </p>
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm underline underline-offset-4">
          <a href={siteConfig.links.appStore} rel="noreferrer">
            {t("restore")}
          </a>
          <Link href="/terms">{t("terms")}</Link>
          <Link href="/privacy">{t("privacyLink")}</Link>
        </p>
      </div>
    </section>
  );
}
