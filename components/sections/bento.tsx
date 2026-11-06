import { getTranslations } from "next-intl/server";
import { marketing } from "@/config/marketing";
import { readPairs, readStrings } from "@/lib/utils";

export async function Bento() {
  const t = await getTranslations("page");
  const features = readPairs(t.raw("features"));
  const lines = readStrings(t.raw("stories.love.lines"));
  const saved = [t("stories.love.title"), t("stories.money.title")];

  return (
    <section id="stories" className="section-space">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 className="headline max-w-3xl">{t("bentoTitle")}</h2>
        <div className="bento mt-12">
          {marketing.features.map((feature, index) => {
            const copy = features[index];
            return (
              <article
                key={feature.mock}
                className={`${feature.span === 4 ? "span-4" : "span-2"} wash-${feature.wash} flex min-h-[320px] flex-col justify-between rounded-[28px] border p-5 sm:p-6`}
                style={{ borderColor: "var(--border)" }}
              >
                <Mock
                  kind={feature.mock}
                  evening={t("mocks.evening")}
                  continueLabel={t("mocks.continue")}
                  nowReading={t("mocks.nowReading")}
                  ready={t("mocks.ready")}
                  line={lines[0] ?? ""}
                  nextLine={lines[1] ?? ""}
                  readLine={t("mocks.readLine")}
                  cardLine={t("mocks.cardLine")}
                  saved={saved}
                />
                <div>
                  <h3 className="text-xl font-normal tracking-tight">{copy?.title}</h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                    {copy?.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Mock({
  kind,
  evening,
  continueLabel,
  nowReading,
  ready,
  line,
  nextLine,
  readLine,
  cardLine,
  saved,
}: {
  kind: (typeof marketing.features)[number]["mock"];
  evening: string;
  continueLabel: string;
  nowReading: string;
  ready: string;
  line: string;
  nextLine: string;
  readLine: string;
  cardLine: string;
  saved: string[];
}) {
  if (kind === "phone") {
    return (
      <div className="phone-mock mx-auto mb-6 w-[168px] rounded-[28px] border bg-[var(--card)] p-2 shadow-[var(--shadow)]" style={{ borderColor: "var(--border)" }}>
        <div className="rounded-[22px] px-3 pb-4 pt-3" style={{ background: "var(--surface)" }}>
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full" style={{ background: "var(--border)" }} />
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            {evening}
          </p>
          <p className="mt-1 text-sm">{continueLabel}</p>
          <div className="wash-a mt-3 h-14 rounded-2xl" />
          <div className="mt-3 h-8 rounded-full" style={{ background: "var(--button)" }} />
        </div>
      </div>
    );
  }

  if (kind === "lines") {
    return (
      <div className="panel mb-8 max-w-md p-4">
        <p className="text-sm">{line}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          {nextLine}
        </p>
      </div>
    );
  }

  if (kind === "read") {
    return (
      <div className="panel mb-8 p-4">
        <p className="text-xs" style={{ color: "var(--accent-text)" }}>
          {nowReading}
        </p>
        <p className="mt-2 text-sm">{readLine}</p>
      </div>
    );
  }

  if (kind === "card") {
    return (
      <div className="panel mb-8 max-w-xs p-5">
        <p className="text-lg font-light leading-snug">{cardLine}</p>
        <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
          LUMORA Manifest
        </p>
      </div>
    );
  }

  if (kind === "daily") {
    return (
      <div className="panel mb-8 flex max-w-sm items-center gap-3 p-4">
        <span className="h-2 w-16 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
          <span className="block h-full w-2/3 rounded-full" style={{ background: "var(--accent)" }} />
        </span>
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          {ready}
        </span>
      </div>
    );
  }

  return (
    <ul className="panel mb-8 max-w-xs space-y-2 p-4 text-sm">
      <li>{saved[0]}</li>
      <li style={{ color: "var(--muted)" }}>{saved[1]}</li>
    </ul>
  );
}
