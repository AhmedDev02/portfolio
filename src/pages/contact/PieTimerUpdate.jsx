import { useEffect, useMemo, useRef, useState } from "react";
import { MdTimer } from "react-icons/md";
import { useThemeContext } from "../../hooks/useThemeContext";
import { RiTimerLine } from "react-icons/ri";
export default function PieTimerUpdate({
  durationSec = 60,
  autoStart = true,
  size = 96,
  strokeWidth = 10,
  onComplete,
}) {
  const [remaining, setRemaining] = useState(durationSec);
  const [running, setRunning] = useState(autoStart);
  const { theme } = useThemeContext();
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  useEffect(() => {
    // Reset remaining if duration changes
    setRemaining(durationSec);
  }, [durationSec]);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const deltaMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      setRemaining((prev) => {
        const next = Math.max(0, prev - deltaMs / 1000);
        if (next === 0) {
          // stop at zero
          setRunning(false);
          onComplete?.();
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [running, onComplete]);

  const progress = useMemo(() => {
    // 1 -> full time remaining, 0 -> finished
    return durationSec <= 0 ? 0 : remaining / durationSec;
  }, [remaining, durationSec]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // We draw a full circle and "hide" part of it via dashoffset
  const dashOffset = circumference * (1 - progress);

  const totalSeconds = Math.max(0, Math.floor(remaining));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Cap display at 23:59:59
  const displayHours = Math.min(hours, 23);

  const label = `${String(displayHours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
      }}
      aria-label={`Timer ${label}`}
      role="timer"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          opacity="0.15"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          // Start from top (12 o'clock)
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: running ? "none" : "stroke-dashoffset 150ms" }}
        />
      </svg>

      {/* Center label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontFamily: "ui-sans-serif, system-ui",
          fontWeight: 600,
          fontSize: Math.max(12, Math.floor(size * 0.18)),
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {totalSeconds === 0 ? (
          theme === "dark" ? (
            <RiTimerLine className="text-2xl" />
          ) : (
            <MdTimer className="text-2xl" />
          )
        ) : (
          label
        )}
      </div>
    </div>
  );
}
