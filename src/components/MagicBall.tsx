"use client";

import { useRef, useState, type CSSProperties } from "react";
import styles from "./MagicBall.module.css";
import { answers, ui, type Locale } from "@/lib/answers";
import ColorPicker, { type AccentColor } from "./ColorPicker";

const SHAKE_DURATION_MS = 650;

// Default picked hue is the complement of the classic Magic 8 Ball blue,
// so the default triangle/window render as that same blue.
const DEFAULT_ACCENT: AccentColor = { hue: 37, shade: 100 };

// Lightness stops (%) for the neutral shell (page background + ball),
// from the light-theme end (wheel center) to the dark-theme end (wheel edge).
const PAGE_LIGHTNESS = { light: [92, 97, 99], dark: [11, 4, 2] };
const BALL_LIGHTNESS = { light: [82, 92, 97, 99], dark: [26, 12, 5, 1] };
const SHELL_SATURATION = 35;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function percentStops(light: number[], dark: number[], t: number) {
  return light.map((l, i) => `${lerp(l, dark[i], t).toFixed(1)}%`);
}

export default function MagicBall() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [isShaking, setIsShaking] = useState(false);
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [accent, setAccent] = useState<AccentColor>(DEFAULT_ACCENT);
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

  const themeT = accent.shade / 100;
  const [pageL1, pageL2, pageL3] = percentStops(
    PAGE_LIGHTNESS.light,
    PAGE_LIGHTNESS.dark,
    themeT
  );
  const [ballL1, ballL2, ballL3, ballL4] = percentStops(
    BALL_LIGHTNESS.light,
    BALL_LIGHTNESS.dark,
    themeT
  );

  // Keep text readable at every shade: push it far from the background's
  // own lightness instead of interpolating in step with it (which would
  // wash out to zero contrast around the midpoint).
  const bgLightness = lerp(PAGE_LIGHTNESS.light[0], PAGE_LIGHTNESS.dark[0], themeT);
  const fgLightness =
    bgLightness > 50 ? Math.max(5, bgLightness - 45) : Math.min(95, bgLightness + 45);

  const themeVars = {
    "--accent-h": accent.hue,
    "--accent-h-comp": (accent.hue + 180) % 360,
    "--shell-s": `${SHELL_SATURATION}%`,
    "--page-l1": pageL1,
    "--page-l2": pageL2,
    "--page-l3": pageL3,
    "--ball-l1": ballL1,
    "--ball-l2": ballL2,
    "--ball-l3": ballL3,
    "--ball-l4": ballL4,
    "--fg-l": `${fgLightness.toFixed(1)}%`,
  } as CSSProperties;

  return (
    <main className={styles.page} style={themeVars}>
      <div className={styles.topBar}>
        <ColorPicker value={accent} onChange={setAccent} />

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
