"use client";

import { useEffect, useState } from "react";
import { links, nav } from "@/lib/content";
import styles from "./page.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => { if (mq.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        <a href="#top" className={styles.wordmark} aria-label="Venture Forge" onClick={() => setOpen(false)}>
          Venture Forge
        </a>
        <nav className={styles.nav} aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={styles.navLink}>{n.label}</a>
          ))}
        </nav>
        <div className={styles.headerRight}>
          <a href={links.applyToPitch} className={`${styles.navLink} ${styles.navExtra}`}>Apply to pitch</a>
          <a href={links.register} className={`${styles.btn} ${styles.btnPrimary}`}>Register</a>
          <button type="button" className={styles.burger} aria-expanded={open} aria-controls="b-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <span data-open={open} />
          </button>
        </div>
      </div>
      <div id="b-menu" className={styles.menu} data-open={open} hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={styles.menuLink} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
        <div className={styles.menuActions}>
          <a href={links.register} className={`${styles.btn} ${styles.btnPrimary}`}>Register</a>
          <a href={links.applyToPitch} className={`${styles.btn} ${styles.btnSecondary}`}>Apply to pitch</a>
          <a href={links.sponsor} className={`${styles.btn} ${styles.btnSecondary}`}>Sponsor</a>
        </div>
      </div>
    </header>
  );
}
