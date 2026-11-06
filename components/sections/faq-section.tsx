import { getTranslations } from "next-intl/server";
import { readFaqs } from "@/lib/utils";

export async function FaqSection() {
  const t = await getTranslations("page");
  const faqs = readFaqs(t.raw("faq"));

  return (
    <section id="faq" className="section-space" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <h2 id="faq-title" className="headline">
          {t("faqTitle")}
        </h2>
        <div className="mt-10 border-t" style={{ borderColor: "var(--border)" }}>
          {faqs.map((item) => (
            <details key={item.q} className="group border-b py-5" style={{ borderColor: "var(--border)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-normal">
                {item.q}
                <span aria-hidden className="text-2xl font-light leading-none transition group-open:rotate-45" style={{ color: "var(--muted)" }}>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-base leading-normal" style={{ color: "var(--muted)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
