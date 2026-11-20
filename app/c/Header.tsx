"use client";

import { useEffect, useState } from "react";
import { brand, links, nav } from "@/lib/content";
import s from "./c.module.css";

export default function Header() {
  const [tone, setTone] = useState("dark");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      let t = "dark";
      document.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 44 && r.bottom > 44) t = el.dataset.tone || "dark";
      });
      setTone(t);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={s.header}
        data-header-tone={open ? "dark" : tone}
        data-hidden={hidden && !open ? "" : undefined}
      >
        <button
          type="button"
          className={s.menuBtn}
          aria-expanded={open}
          aria-controls="c-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          data-open={open ? "" : undefined}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
        <a href="#top" className={s.wordmark} aria-label={brand.name} onClick={() => setOpen(false)}>
          Venture Forge
        </a>
        <a href={links.register} className={s.headerCta} target="_blank" rel="noreferrer">
          Register
        </a>
      </header>
      <div id="c-menu" className={s.menu} data-open={open ? "" : undefined} aria-hidden={!open}>
        <nav aria-label="Menu">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.menuFoot}>
          <a href={links.register} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Register</a>
          <a href={links.applyToPitch} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Apply to pitch</a>
          <a href={links.sponsor} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Sponsor</a>
        </div>
      </div>
    </>
  );
}
