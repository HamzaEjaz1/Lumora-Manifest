"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels = ["en", "ru", "ar", "id", "es", "zh"] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("lang");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="inline-flex h-11 items-center rounded-full border px-4 text-sm"
        style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--surface)" }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <span className="hidden sm:inline">{t(locale as (typeof labels)[number])}</span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute end-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border p-1"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          {routing.locales.map((item) => (
            <li key={item} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={item === locale}
                className={cn(
                  "flex w-full rounded-2xl px-3 py-2 text-start text-sm hover:bg-[var(--surface)]",
                  item === locale && "bg-[var(--surface)]",
                )}
                onClick={() => choose(item)}
              >
                {t(item)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
