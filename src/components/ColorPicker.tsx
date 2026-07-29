"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ColorPicker.module.css";

export type AccentColor = {
  hue: number;
  /** 0 = center of the wheel (light theme), 100 = edge (dark theme). */
  shade: number;
};

interface ColorPickerProps {
  value: AccentColor;
  onChange: (color: AccentColor) => void;
}

const WHEEL_SIZE = 160;

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function updateFromPointer(clientX: number, clientY: number) {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const rect = wheel.getBoundingClientRect();
    const radius = rect.width / 2;
    const dx = clientX - (rect.left + radius);
    const dy = clientY - (rect.top + radius);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), radius);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    // The wheel's conic-gradient starts red at the top (12 o'clock) and
    // sweeps clockwise, while atan2 measures from the right (3 o'clock).
    // Rotate by 90deg so the picked hue matches the color under the cursor.
    const hue = (angle + 90 + 360) % 360;

    onChange({
      hue: Math.round(hue),
      shade: Math.round((distance / radius) * 100),
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX, event.clientY);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    updateFromPointer(event.clientX, event.clientY);
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  const angleRad = ((value.hue - 90) * Math.PI) / 180;
  const knobRadius = (value.shade / 100) * (WHEEL_SIZE / 2);
  const knobX = WHEEL_SIZE / 2 + Math.cos(angleRad) * knobRadius;
  const knobY = WHEEL_SIZE / 2 + Math.sin(angleRad) * knobRadius;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.swatch}
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose accent color"
        aria-expanded={open}
      />
      {open && (
        <div className={styles.popover}>
          <div
            ref={wheelRef}
            className={styles.wheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div
              className={styles.knob}
              style={{ left: knobX, top: knobY }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
