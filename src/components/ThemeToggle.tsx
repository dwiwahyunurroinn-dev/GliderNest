"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Saklar tema terang/gelap; pilihan disimpan di localStorage. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "dark"
  );

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("gn-theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={dark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-brand hover:text-brand-strong ${className}`}
    >
      {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}
