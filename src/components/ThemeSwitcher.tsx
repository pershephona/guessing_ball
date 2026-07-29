"use client";

import styles from "./MagicBall.module.css";
import { THEME_IDS, themeNames, type ThemeId } from "@/lib/themes";

interface ThemeSwitcherProps {
  value: ThemeId;
  onChange: (theme: ThemeId) => void;
}

export default function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  return (
    <div className={styles.themeSwitch} role="group" aria-label="Theme">
      {THEME_IDS.map((id) => (
        <button
          key={id}
          type="button"
          className={`${styles.themeButton} ${
            value === id ? styles.themeButtonActive : ""
          }`}
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          aria-label={themeNames[id]}
        >
          {id}
        </button>
      ))}
    </div>
  );
}
