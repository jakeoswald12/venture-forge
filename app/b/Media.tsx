"use client";

import { useEffect, useRef, useState } from "react";
import { video } from "@/lib/content";
import styles from "./page.module.css";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    v.play().catch(() => {});
  }, []);
  return (
    <video ref={ref} className={styles.heroMedia} src={video.skyline.src} poster={video.skyline.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
  );
}

export function RecapVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const start = () => {
    setPlaying(true);
    const v = ref.current;
    if (v) { v.play().catch(() => {}); v.focus(); }
  };
  return (
    <div className={styles.recap}>
      <video ref={ref} className={styles.recapVideo} src={video.recap.src} poster={video.recap.poster} controls={playing} playsInline preload="none" aria-label={video.recap.label} />
      {!playing && (
        <button type="button" className={styles.recapCover} onClick={start} aria-label={`Play ${video.recap.label}`}>
          <span className={styles.recapTitle}>{video.recap.label}</span>
          <span className={`${styles.btn} ${styles.btnLight}`}>
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M2 1v10l9-5z" fill="currentColor" /></svg>
            Play
          </span>
          <span className={styles.recapMeta}>{video.recap.duration}</span>
        </button>
      )}
    </div>
  );
}
