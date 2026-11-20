"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

// Content is visible by default. Only elements below the fold are hidden after mount,
// then revealed on intersection.
export default function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    const t = window.setTimeout(() => { el.dataset.reveal = "shown"; }, 6000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </Comp>
  );
}
