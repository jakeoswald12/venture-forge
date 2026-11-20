"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import s from "./d.module.css";

/* Reveal on intersection. Content is visible by default; only elements that are
   below the fold when JS starts are hidden, then shown as they enter. */
export function RevealInit() {
  useEffect(() => {
    const root = document.querySelector(`.${s.root}`);
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "in";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.92) {
        el.dataset.reveal = "armed";
        io.observe(el);
      }
    }
    // Safety net: never leave anything hidden.
    const t = window.setTimeout(() => {
      for (const el of els) if (el.dataset.reveal === "armed") el.dataset.reveal = "in";
      io.disconnect();
    }, 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
  return null;
}

export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);
  return (
    <video ref={ref} className={s.heroVideo} src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" tabIndex={-1} />
  );
}

export function RecapVideo({ src, poster, label, duration }: { src: string; poster: string; label: string; duration: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (playing) ref.current?.play().catch(() => {});
  }, [playing]);
  return (
    <div className={s.recapFrame}>
      {playing ? (
        <video ref={ref} className={s.recapVideo} src={src} poster={poster} controls playsInline />
      ) : (
        <button type="button" className={s.recapPoster} onClick={() => setPlaying(true)} aria-label={`Play ${label} (${duration})`}>
          <img src={poster} alt="" width={1280} height={720} loading="lazy" />
          <span className={s.playPill}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
            </svg>
            <span>Play</span>
          </span>
          <span className={s.recapMeta}>{duration}</span>
        </button>
      )}
    </div>
  );
}

export function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 28 : 360;
    const n = Math.max(1, Math.floor(el.clientWidth / step));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step * n, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={s.carousel}>
      <div ref={ref} className={s.carouselTrack} role="group" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className={s.carouselNav}>
        <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Next">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

type Step = { title: string; body: string; photo: string };

export function StrategySticky({ steps, heading }: { steps: Step[]; heading: ReactNode }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.strategyGrid}>
      <div className={s.strategyHead}>{heading}</div>
      <div className={s.strategyDevice} aria-hidden="true">
        <div className={s.deviceFrame}>
          {steps.map((st, i) => (
            <img key={st.photo} src={st.photo} alt="" width={1100} height={733} loading="lazy" data-active={i === active} />
          ))}
          <div className={s.deviceDots}>
            {steps.map((st, i) => (
              <span key={st.title} data-active={i === active} />
            ))}
          </div>
        </div>
      </div>
      <ol className={s.strategyList}>
        {steps.map((st, i) => (
          <li
            key={st.title}
            data-i={i}
            data-active={i === active}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <img className={s.strategyInlinePhoto} src={st.photo} alt="" width={1100} height={733} loading="lazy" />
            <span className={s.strategyNum}>{String(i + 1).padStart(2, "0")}</span>
            <h3>{st.title}</h3>
            <p>{st.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
