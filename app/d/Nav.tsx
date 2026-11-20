"use client";

import { useEffect, useState } from "react";
import { links, nav } from "@/lib/content";
import s from "./d.module.css";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.navWrap}>
      <div className={s.nav}>
        <a href="#top" className={s.wordmark} aria-label="Venture Forge">
          venture forge
        </a>
        <nav className={s.navLinks} aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className={s.navCtas}>
          <a className={`${s.pill} ${s.pillDark}`} href={links.register}>
            Register
          </a>
          <a className={`${s.pill} ${s.pillLight} ${s.navSecond}`} href={links.applyToPitch}>
            Apply to pitch
          </a>
          <button
            type="button"
            className={s.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="d-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open} />
          </button>
        </div>
      </div>
      <div id="d-menu" className={s.menu} data-open={open} hidden={!open}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <a href={links.applyToPitch}>Apply to pitch</a>
        <a href={links.sponsor}>Sponsor</a>
      </div>
    </header>
  );
}
