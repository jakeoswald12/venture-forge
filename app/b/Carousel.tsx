"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Carousel({ children, label, trackClassName = "", className = "", offset = 0 }: { children: React.ReactNode; label: string; trackClassName?: string; className?: string; offset?: number }) {
  const track = useRef<HTMLUListElement | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (offset) {
      const first = el.firstElementChild as HTMLElement | null;
      if (first) el.scrollLeft = first.offsetWidth * offset;
    }
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [offset, update]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`${styles.carousel} ${className}`} role="group" aria-label={label}>
      <ul ref={track} className={`${styles.track} ${trackClassName}`} tabIndex={0}>
        {children}
      </ul>
      <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => move(-1)} disabled={edge.start} aria-label="Previous">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M10 2.5 4.5 8 10 13.5" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
      </button>
      <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => move(1)} disabled={edge.end} aria-label="Next">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 2.5 11.5 8 6 13.5" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
      </button>
    </div>
  );
}
