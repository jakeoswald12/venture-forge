"use client";

import { useEffect, useRef } from "react";
import s from "./e.module.css";

// Scroll and pointer driven motion. Everything stays visible if this never runs.
export function Fx() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(`.${s.root}`);
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    root.classList.add(s.js);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "1";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const parallax = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-fill]")).map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>("[data-w]")),
      lit: 0,
    }));

    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, dirty = true;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const frame = () => {
      const vh = window.innerHeight;
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      if (hero) {
        hero.style.setProperty("--mx", mx.toFixed(4));
        hero.style.setProperty("--my", my.toFixed(4));
      }
      if (dirty) {
        dirty = false;
        if (hero) hero.style.setProperty("--sy", clamp(window.scrollY / vh, 0, 1.5).toFixed(4));
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
          el.style.setProperty("--p", p.toFixed(4));
        }
        for (const f of fills) {
          const r = f.el.getBoundingClientRect();
          const p = clamp((vh * 0.88 - r.top) / (vh * 0.5 + r.height), 0, 1);
          const n = Math.round(p * f.words.length);
          if (n > f.lit) {
            for (let i = f.lit; i < n; i++) f.words[i].dataset.on = "1";
            f.lit = n;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    const onScroll = () => { dirty = true; };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      root.classList.remove(s.js);
    };
  }, []);

  return <span ref={ref} hidden />;
}
