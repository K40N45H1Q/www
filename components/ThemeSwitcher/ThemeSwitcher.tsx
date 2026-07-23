"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

const storageKey = "theme";
const themeTransitionDuration = 1500;
type Theme = "light" | "dark";

let themeTransitionTimeout: number | undefined;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function applyThemeWithTransition(theme: Theme) {
  window.clearTimeout(themeTransitionTimeout);
  document.documentElement.classList.add("theme-transitioning");
  applyTheme(theme);

  themeTransitionTimeout = window.setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, themeTransitionDuration);
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedTheme = window.localStorage.getItem(storageKey);
      const nextTheme =
        storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      setTheme(nextTheme);
      applyTheme(nextTheme);
      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    applyThemeWithTransition(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  }

  return (
    <button
      type="button"
      className={styles.themeSwitcher}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      disabled={!isReady}
    >
      <span className={styles.track} aria-hidden="true">
        <span
          className={`${styles.trackLabel} ${
            !isDark ? styles.trackLabelHidden : ""
          }`}
        >
          L
        </span>
        <span
          className={`${styles.trackLabel} ${
            isDark ? styles.trackLabelHidden : ""
          }`}
        >
          D
        </span>
        <span
          className={`${styles.thumb} ${isDark ? styles.thumbDark : ""}`}
        />
      </span>
    </button>
  );
}
