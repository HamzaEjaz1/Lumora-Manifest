"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "lumora-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem(storageKey, next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#12100f" : "#F5F3F1");
    setDark(next === "dark");
  }

  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
      style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
    >
      <Moon className="theme-icon-moon h-4 w-4" aria-hidden />
      <Sun className="theme-icon-sun h-4 w-4" aria-hidden />
    </button>
  );
}
