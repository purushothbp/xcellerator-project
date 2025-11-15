"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const activeTheme = mounted
    ? ((theme ?? resolvedTheme ?? "light") as ThemeMode)
    : "light";
  const isLight = activeTheme === "light";
  const Icon = isLight ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle theme"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
