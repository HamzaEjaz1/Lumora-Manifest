"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { cn, readStrings } from "@/lib/utils";

export type PhoneScreen =
  | "home"
  | "play"
  | "read"
  | "favorites"
  | "profile"
  | "share"
  | "onboarding"
  | "dream"
  | "record";

export function PhoneMockup({
  screen,
  className,
}: {
  screen: PhoneScreen;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-[250px] max-w-full", className)} aria-hidden>
      <div className="rounded-[36px] border border-white/15 bg-[#14060d] p-2.5">
        <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-[#2A0F1C]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
          <ScreenView screen={screen} />
        </div>
      </div>
    </div>
  );
}

function ScreenView({ screen }: { screen: PhoneScreen }) {
  const t = useTranslations("phone");
  const demo = useTranslations("demo");
  const voice = useTranslations("voice");
  const story = demo("stories.love.title");
  const line = demo("stories.love.lines.0");
  const nextLine = demo("stories.love.lines.1");

  return (
    <div className="flex h-full flex-col px-4 pb-4 pt-10 text-cream">
      {screen === "home" ? <Home t={t} story={story} money={demo("stories.money.title")} /> : null}
      {screen === "play" ? <Play t={t} story={story} line={line} /> : null}
      {screen === "read" ? <Read t={t} story={story} line={line} nextLine={nextLine} /> : null}
      {screen === "favorites" ? (
        <Favorites
          t={t}
          story={story}
          family={demo("stories.family.title")}
          health={demo("stories.health.title")}
        />
      ) : null}
      {screen === "profile" ? <Profile t={t} /> : null}
      {screen === "share" ? <Share t={t} line={line} /> : null}
      {screen === "onboarding" ? <Onboarding t={t} /> : null}
      {screen === "dream" ? <Dream t={t} /> : null}
      {screen === "record" ? <Record consent={voice("consent")} title={t("recordTitle")} /> : null}
    </div>
  );
}

function Home({
  t,
  story,
  money,
}: {
  t: ReturnType<typeof useTranslations<"phone">>;
  story: string;
  money: string;
}) {
  const chips = readStrings(t.raw("chips"));
  return (
    <>
      <p className="text-[11px] text-pink-muted">{t("greeting")}</p>
      <p className="mt-1 text-2xl font-light">{t("you")}</p>
      <div className="mt-5 rounded-2xl border bg-white/5 p-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-pink">{t("continue")}</p>
        <p className="mt-2 text-sm">{story}</p>
        <p className="mt-2 text-[10px] text-pink-muted">{t("minutes")}</p>
      </div>
      <div className="mt-4 flex gap-2">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full border px-2.5 py-1 text-[10px]">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[11px]">
        <span>{t("tonight")}</span>
        <span className="text-pink">{t("seeAll")}</span>
      </div>
      <div className="mt-3 space-y-2">
        <Row title={story} meta={t("minutes")} />
        <Row title={money} meta="9 min" />
      </div>
    </>
  );
}

function Play({
  t,
  story,
  line,
}: {
  t: ReturnType<typeof useTranslations<"phone">>;
  story: string;
  line: string;
}) {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <p className="text-[10px] uppercase tracking-[0.18em] text-pink">{t("nowPlaying")}</p>
      <p className="mt-3 text-lg font-light leading-snug">{story}</p>
      <div className="mt-8 h-28 w-28 rounded-full border border-pink/50 bg-[radial-gradient(circle_at_30%_30%,rgba(255,79,160,0.55),transparent_60%)]" />
      <p className="mt-8 px-2 text-[11px] leading-relaxed text-pink-muted">{line}</p>
      <div className="mt-auto h-1 w-full rounded-full bg-white/10">
        <div className="h-full w-1/3 rounded-full bg-pink" />
      </div>
      <div className="mt-4 h-12 w-12 rounded-full bg-pink" />
    </div>
  );
}

function Read({
  t,
  story,
  line,
  nextLine,
}: {
  t: ReturnType<typeof useTranslations<"phone">>;
  story: string;
  line: string;
  nextLine: string;
}) {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.18em] text-pink">{t("readAlong")}</p>
      <p className="mt-3 text-lg font-light">{story}</p>
      <p className="mt-6 text-[13px] leading-relaxed text-cream">{line}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-pink-muted/50">{nextLine}</p>
      <div className="mt-auto rounded-2xl border bg-white/5 p-3 text-start text-[11px]">
        {t("nowPlaying")} · {t("minutes")}
      </div>
    </>
  );
}

function Favorites({
  t,
  story,
  family,
  health,
}: {
  t: ReturnType<typeof useTranslations<"phone">>;
  story: string;
  family: string;
  health: string;
}) {
  return (
    <>
      <p className="text-2xl font-light">{t("saved")}</p>
      <div className="mt-5 space-y-2">
        <Row title={story} meta={t("minutes")} />
        <Row title={family} meta="8 min" />
        <Row title={health} meta="11 min" />
      </div>
    </>
  );
}

function Profile({ t }: { t: ReturnType<typeof useTranslations<"phone">> }) {
  return (
    <>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border text-lg">
        L
      </div>
      <p className="mt-3 text-center text-xl font-light">{t("you")}</p>
      <div className="mt-6 rounded-2xl border bg-white/5 p-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-pink">{t("myVoice")}</p>
        <p className="mt-2 text-sm">{t("recordingCount")}</p>
      </div>
      <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-pink-muted">
        {t("myVoice")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {siteConfig.presetVoices.map((voice) => (
          <span key={voice} className="rounded-full border px-2.5 py-1 text-[10px]">
            {voice}
          </span>
        ))}
      </div>
    </>
  );
}

function Share({
  t,
  line,
}: {
  t: ReturnType<typeof useTranslations<"phone">>;
  line: string;
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-2xl font-light">{t("shareCard")}</p>
      <div className="mt-5 flex flex-1 flex-col justify-between rounded-[24px] border bg-[radial-gradient(circle_at_80%_0%,rgba(255,79,160,0.45),transparent_45%),#3D0A26] p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-pink">LUMORA Manifest</p>
        <p className="text-sm font-light leading-relaxed">{line}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-pink-muted">
        <span className="rounded-full border py-2">Story</span>
        <span className="rounded-full border py-2">Image</span>
        <span className="rounded-full border py-2">Link</span>
      </div>
    </div>
  );
}

function Onboarding({ t }: { t: ReturnType<typeof useTranslations<"phone">> }) {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.18em] text-pink">{t("step")}</p>
      <div className="mt-3 h-1 rounded-full bg-white/10">
        <div className="h-full w-[32%] rounded-full bg-pink" />
      </div>
      <p className="mt-8 text-2xl font-light leading-snug">{t("question")}</p>
      <div className="mt-6 rounded-2xl border px-3 py-3 text-sm text-pink-muted">{t("you")}</div>
      <div className="mt-auto rounded-full bg-pink py-3 text-center text-sm font-medium text-[#2A0F1C]">
        {t("next")}
      </div>
    </>
  );
}

function Dream({ t }: { t: ReturnType<typeof useTranslations<"phone">> }) {
  return (
    <>
      <p className="text-2xl font-light">{t("dream")}</p>
      <p className="mt-6 text-[10px] uppercase tracking-[0.16em] text-pink">{t("cities")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Lisbon", "Kyoto", "Cape Town"].map((city) => (
          <span key={city} className="rounded-full border px-2.5 py-1 text-[10px]">
            {city}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border bg-white/5 p-3 text-sm leading-relaxed">
        {t("homeLine")}
      </div>
    </>
  );
}

function Record({ title, consent }: { title: string; consent: string }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-2xl font-light">{title}</p>
      <div className="mt-8 flex h-16 items-end justify-center gap-1">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            className="w-1 rounded-full bg-pink"
            style={{ height: `${30 + ((index * 17) % 70)}%` }}
          />
        ))}
      </div>
      <p className="mt-6 text-[11px] leading-relaxed text-pink-muted">{consent}</p>
      <div className="mt-auto h-14 w-14 self-center rounded-full bg-pink-hot" />
    </div>
  );
}

function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-white/5 px-3 py-2.5">
      <span className="truncate text-[11px]">{title}</span>
      <span className="shrink-0 text-[10px] text-pink-muted">{meta}</span>
    </div>
  );
}
