import { getTranslations } from "next-intl/server";
import { StoreButtons } from "@/components/store-buttons";

export async function FinalCta() {
  const t = await getTranslations("page");

  return (
    <section id="download" className="px-5 pb-24 sm:px-8">
      <div className="wash-c mx-auto w-full max-w-7xl rounded-[32px] px-6 py-20 text-center sm:px-12 sm:py-28">
        <h2 className="display mx-auto max-w-3xl">
          {t("ctaTitle1")}
          <br />
          {t("ctaTitle2")}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-normal" style={{ color: "var(--muted)" }}>
          {t("ctaBody")}
        </p>
        <StoreButtons appStoreLabel={t("appStore")} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
