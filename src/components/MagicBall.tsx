"use client";

import { useRef, useState } from "react";
import styles from "./MagicBall.module.css";
import { answers, ui, type Locale } from "@/lib/answers";
import ThemeSwitcher from "./ThemeSwitcher";
import { type ThemeId } from "@/lib/themes";

const SHAKE_DURATION_MS = 650;

export default function MagicBall() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [theme, setTheme] = useState<ThemeId>(1);
  const [isShaking, setIsShaking] = useState(false);
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = ui[locale];
  const displayedText =
    answerIndex === null ? t.initial : answers[locale][answerIndex];

  function handleShake() {
    if (isShaking) return;

    setIsShaking(true);
    setAnswerIndex(null);

    timeoutRef.current = setTimeout(() => {
      setAnswerIndex(Math.floor(Math.random() * answers[locale].length));
      setIsShaking(false);
    }, SHAKE_DURATION_MS);
  }

  return (
    <main className={`${styles.page} ${styles[`theme${theme}`]}`}>
      <div className={styles.topBar}>
        <ThemeSwitcher value={theme} onChange={setTheme} />

        <div className={styles.langSwitch} role="group" aria-label="Language">
          {(["ru", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              className={`${styles.langButton} ${
                locale === code ? styles.langButtonActive : ""
              }`}
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      <button
        type="button"
        className={styles.ballButton}
        onClick={handleShake}
        disabled={isShaking}
        aria-live="polite"
        aria-label={displayedText}
      >
        <div
          className={`${styles.ball} ${isShaking ? styles.ballShaking : ""}`}
        >
          <div className={styles.window}>
            <div className={styles.triangle}>
              <span className={styles.answerText}>
                {isShaking ? "" : displayedText}
              </span>
            </div>
          </div>
        </div>
      </button>

      <p className={styles.hint}>{t.hint}</p>

      <a
        className={styles.footer}
        href="https://github.com/pershephona"
        target="_blank"
        rel="noopener noreferrer"
      >
        made by pershephona
      </a>
    </main>
  );
}
