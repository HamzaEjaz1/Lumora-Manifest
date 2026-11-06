import { getTranslations } from "next-intl/server";
import { readPairs } from "@/lib/utils";

export async function HowItWorks() {
  const t = await getTranslations("page");
  const steps = readPairs(t.raw("steps"));

  return (
    <section id="how" className="section-space" aria-labelledby="how-title">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 id="how-title" className="headline max-w-3xl">
          {t("howTitle")}
        </h2>
        <ol className="mt-12 grid gap-10 border-t pt-10 md:grid-cols-4" style={{ borderColor: "var(--border)" }}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm" style={{ color: "var(--accent-text)" }}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-normal tracking-tight">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
