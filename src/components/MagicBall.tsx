"use client";

import { useRef, useState } from "react";
import styles from "./MagicBall.module.css";
import { answers, ui, type Locale } from "@/lib/answers";

const SHAKE_DURATION_MS = 650;

export default function MagicBall() {
  const [locale, setLocale] = useState<Locale>("ru");
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
    <main className={styles.page}>
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
    </main>
  );
}
