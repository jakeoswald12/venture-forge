"use client";

import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Scroll-driven effects: reveal on intersection, per-element progress variables.
export default function Fx() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-c-root]");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.setAttribute("data-js", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const through = Array.from(root.querySelectorAll<HTMLElement>("[data-p]"));
    const enter = Array.from(root.querySelectorAll<HTMLElement>("[data-enter]"));
    const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-fill]"));
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const max = new WeakMap<HTMLElement, number>();
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      if (hero) hero.style.setProperty("--hp", clamp(window.scrollY / hero.offsetHeight).toFixed(3));
      for (const el of through) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        el.style.setProperty("--p", clamp((vh - r.top) / (vh + r.height)).toFixed(3));
      }
      for (const el of enter) {
        const r = el.getBoundingClientRect();
        if (r.top > vh + 200) continue;
        el.style.setProperty("--p", clamp((vh - r.top) / (vh * 0.75)).toFixed(3));
      }
      for (const el of fills) {
        const r = el.getBoundingClientRect();
        const p = clamp((vh * 0.92 - r.top) / (r.height + vh * 0.42));
        const m = Math.max(p, max.get(el) ?? 0);
        max.set(el, m);
        el.style.setProperty("--pm", m.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.removeAttribute("data-js");
    };
  }, []);
  return null;
}
