"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { readStrings } from "@/lib/utils";

const storyIds = ["love", "money", "family", "career", "health"] as const;

const DURATION = 16;

function clock(seconds: number) {
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export function StoryStage() {
  const t = useTranslations("page");
  const stories = storyIds.map((id) => ({
    id,
    category: t(`categories.${id}`),
    title: t(`stories.${id}.title`),
    lines: readStrings(t.raw(`stories.${id}.lines`)),
  }));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [ownVoice, setOwnVoice] = useState(false);
  const tablist = useId();
  const story = stories[index] ?? stories[0];
  const lineIndex = Math.min(
    story.lines.length - 1,
    Math.floor((time / DURATION) * story.lines.length),
  );

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setTime((current) => {
        const next = current + delta;
        if (next >= DURATION) {
          setPlaying(false);
          return DURATION;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  function select(next: number) {
    setIndex(next);
    setTime(0);
    setPlaying(false);
  }

  function onTabKey(event: KeyboardEvent, current: number) {
    const last = stories.length - 1;
    let next = current;
    if (event.key === "ArrowRight") next = Math.min(last, current + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, current - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    select(next);
    document.getElementById(`${tablist}-${stories[next]?.id}`)?.focus();
  }

  return (
    <section aria-label={t("previewLabel")} className="pb-4">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="wash-a rounded-[32px] p-3 sm:p-6">
          <div className="panel p-5 sm:p-8">
            <div
              role="tablist"
              aria-label={t("categoryLabel")}
              className="flex gap-2 overflow-x-auto pb-3"
            >
              {stories.map((item, itemIndex) => {
                const selected = itemIndex === index;
                return (
                  <button
                    key={item.id}
                    id={`${tablist}-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    className="shrink-0 rounded-full border px-4 py-2 text-sm"
                    style={{
                      borderColor: "var(--border)",
                      background: selected ? "var(--text)" : "transparent",
                      color: selected ? "var(--bg)" : "var(--muted)",
                    }}
                    onClick={() => select(itemIndex)}
                    onKeyDown={(event) => onTabKey(event, itemIndex)}
                  >
                    {item.category}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
              {story.title}
              <span className="mx-2">·</span>
              {ownVoice ? t("yourVoice") : t("defaultVoice")}
            </p>
            <div className="mt-4 space-y-2" aria-live="polite">
              {story.lines.map((line, lineNumber) => (
                <p
                  key={line}
                  className="text-base leading-snug"
                  style={{
                    color: lineNumber === lineIndex ? "var(--text)" : "var(--muted)",
                    fontWeight: lineNumber === lineIndex ? 500 : 400,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex h-12 items-end justify-between gap-[2px] overflow-hidden" aria-hidden>
              {Array.from({ length: 36 }, (_, bar) => (
                <span
                  key={bar}
                  className={playing ? "wave-bar w-[3px] max-w-[3px] flex-1 rounded-full" : "w-[3px] max-w-[3px] flex-1 rounded-full"}
                  style={{
                    height: `${10 + ((bar * 13) % 28)}px`,
                    background: "var(--text)",
                    opacity: playing ? 0.85 : 0.28,
                    animationDelay: `${(bar % 9) * 0.07}s`,
                    transform: playing ? undefined : "scaleY(0.45)",
                  }}
                />
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="btn btn-primary h-12 w-12 shrink-0 rounded-full p-0"
                aria-pressed={playing}
                aria-label={playing ? t("pause") : t("play")}
                onClick={() => {
                  if (time >= DURATION) setTime(0);
                  setPlaying((value) => !value);
                }}
              >
                {playing ? "❚❚" : "▶"}
              </button>
              <div className="min-w-0 flex-1">
                <label className="sr-only" htmlFor="story-progress">
                  {t("progress")}
                </label>
                <input
                  id="story-progress"
                  type="range"
                  min={0}
                  max={DURATION}
                  step={0.1}
                  value={time}
                  aria-valuemin={0}
                  aria-valuemax={DURATION}
                  aria-valuenow={Math.round(time)}
                  aria-valuetext={`${clock(time)} of ${clock(DURATION)}`}
                  onChange={(event) => setTime(Number(event.target.value))}
                  className="story-progress w-full cursor-pointer"
                  style={{
                    accentColor: "var(--accent)",
                    background: `linear-gradient(to right, var(--accent) ${(time / DURATION) * 100}%, var(--border) ${(time / DURATION) * 100}%)`,
                  }}
                />
                <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  {clock(time)} / {clock(DURATION)} · {t("simulated")}
                </p>
              </div>
              <div
                role="group"
                aria-label={t("narrator")}
                className="flex w-full flex-wrap justify-center rounded-full p-1 sm:inline-flex sm:w-auto"
                style={{ background: "var(--surface)" }}
              >
                <button
                  type="button"
                  aria-pressed={!ownVoice}
                  className="min-h-11 flex-1 rounded-full px-3 py-2 text-sm"
                  style={{
                    background: ownVoice ? "transparent" : "var(--card)",
                    color: "var(--text)",
                  }}
                  onClick={() => setOwnVoice(false)}
                >
                  {t("defaultVoice")}
                </button>
                <button
                  type="button"
                  aria-pressed={ownVoice}
                  className="min-h-11 flex-1 rounded-full px-3 py-2 text-sm"
                  style={{
                    background: ownVoice ? "var(--card)" : "transparent",
                    color: "var(--text)",
                  }}
                  onClick={() => setOwnVoice(true)}
                >
                  {t("yourVoice")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {stories.map((item) => {
            const storyIndex = stories.findIndex((story) => story.id === item.id);
            const selected = storyIndex === index;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  className="rounded-full border px-4 py-2 text-sm"
                  style={{
                    borderColor: selected ? "var(--text)" : "var(--border)",
                    color: "var(--text)",
                    background: "transparent",
                  }}
                  onClick={() => select(Math.max(0, storyIndex))}
                >
                  {item.category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
