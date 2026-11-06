import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("page");

  return (
    <section className="px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
      <p
        className="mx-auto inline-flex items-center gap-2 rounded-full border px-2 py-1 pe-3 text-sm"
        style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--muted)" }}
      >
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          {t("new")}
        </span>
        {t("badge")}
      </p>
      <h1 className="display mx-auto mt-6 max-w-4xl">
        {t("headline1")}
        <br />
        {t("headline2")}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-normal" style={{ color: "var(--muted)" }}>
        {t("subhead")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="#download" className="btn btn-primary w-full sm:w-auto">
          {t("getApp")}
        </a>
        <a href="#how" className="btn btn-secondary w-full sm:w-auto">
          {t("howLink")}
        </a>
      </div>
    </section>
  );
}
