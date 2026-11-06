import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function homeHref(locale: string, pathname: string) {
  if (pathname === "/") return "#top";
  return locale === "en" ? "/" : `/${locale}`;
}

export function sectionHref(locale: string, pathname: string, id: string) {
  if (pathname === "/") return `#${id}`;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/#${id}`;
}

export function readStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function readPairs(value: unknown): { title: string; body: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    if (typeof record.title !== "string" || typeof record.body !== "string") return [];
    return [{ title: record.title, body: record.body }];
  });
}

export function readFaqs(value: unknown): { q: string; a: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    if (typeof record.q !== "string" || typeof record.a !== "string") return [];
    return [{ q: record.q, a: record.a }];
  });
}
