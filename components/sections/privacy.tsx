import { getTranslations } from "next-intl/server";
import { readStrings } from "@/lib/utils";

export async function PrivacyBand() {
  const t = await getTranslations("page");
  const checks = readStrings(t.raw("checks"));

  return (
    <section className="section-space" aria-labelledby="privacy-title">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 id="privacy-title" className="headline">
            {t("privacyTitle")}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-normal" style={{ color: "var(--muted)" }}>
            {t("privacyBody")}
          </p>
        </div>
        <ul className="rounded-[28px] border p-6 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          {checks.map((item) => (
            <li key={item} className="flex items-start gap-3 border-b py-4 text-base last:border-b-0" style={{ borderColor: "var(--border)" }}>
              <span aria-hidden className="mt-0.5 text-lg" style={{ color: "var(--accent-text)" }}>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
