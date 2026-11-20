"use client";

import { useEffect, useRef, useState } from "react";
import { brand, links, locations, nav } from "@/lib/content";
import { DOTS_PATH, MAP_H, MAP_W, project } from "./map";
import s from "./page.module.css";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`${s.wordmark} ${className}`} aria-label={brand.name} role="img">
      <span aria-hidden="true">Venture</span>
      <span aria-hidden="true">Forge</span>
    </span>
  );
}

/* Scroll reveals and smooth scrolling. Content stays visible when JS does not run. */
export function Effects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-a-root]");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && !reducedMotion()) {
      root.setAttribute("data-js", "");
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.setAttribute("data-in", "");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      items.forEach((el) => io!.observe(el));
    }

    let destroy: (() => void) | undefined;
    if (!reducedMotion()) {
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 }, lerp: 0.12 });
        destroy = () => lenis.destroy();
      });
    }
    return () => {
      io?.disconnect();
      destroy?.();
      root.removeAttribute("data-js");
    };
  }, []);
  return null;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${s.nav} ${scrolled || open ? s.navSolid : ""}`}>
      <div className={s.navInner}>
        <a href="#top" className={s.navLogo} onClick={() => setOpen(false)}>
          <Wordmark />
        </a>
        <nav className={s.navLinks} aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={s.navLink}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className={s.navButtons}>
          <a href={links.sponsor} className={`${s.btn} ${s.btnOutline} ${s.btnSm} ${s.navSponsor}`}>
            <span>Sponsor</span>
          </a>
          <a href={links.register} className={`${s.btn} ${s.btnSm}`}>
            <span>Register</span>
          </a>
          <button
            type="button"
            className={s.burger}
            aria-expanded={open}
            aria-controls="a-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open || undefined} />
          </button>
        </div>
      </div>
      <div id="a-menu" className={s.menu} data-open={open || undefined} hidden={!open}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <div className={s.menuButtons}>
          <a href={links.register} className={s.btn}>
            <span>Register</span>
          </a>
          <a href={links.applyToPitch} className={`${s.btn} ${s.btnOutline}`}>
            <span>Apply to pitch</span>
          </a>
          <a href={links.sponsor} className={`${s.btn} ${s.btnOutline}`}>
            <span>Sponsor</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reducedMotion()) ref.current?.pause();
  }, []);
  return (
    <video ref={ref} className={s.heroMedia} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
  );
}

export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m || reducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setN(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{n}</span>
      {suffix && <span aria-hidden="true" className={s.statSuffix}>{suffix}</span>}
    </span>
  );
}

const LABEL_SIDE: Record<string, string> = {
  austin: "br",
  "dallas-fort-worth": "l",
  birmingham: "br",
  "silicon-valley": "r",
  franklin: "tr",
};

const CARD_POS: Record<string, string> = {
  austin: "50% 60%",
  "dallas-fort-worth": "40% 50%",
  birmingham: "18% 50%",
};

export function Locations() {
  const [active, setActive] = useState<string | null>(null);
  const pts = locations.map((l) => ({ ...l, ...project(l.lng, l.lat) }));

  return (
    <>
      <div className={s.map} data-reveal>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={s.mapSvg} role="img" aria-label="Map of the United States showing the five Venture Forge locations">
          <path d={DOTS_PATH} className={s.mapDots} />
          {pts.map((p) => (
            <g key={p.slug} className={s.marker} data-active={active === p.slug || undefined} data-soon={p.status === "coming-soon" || undefined}>
              <circle cx={p.x} cy={p.y} r="15" className={s.markerPulse} />
              <circle cx={p.x} cy={p.y} r="9.5" className={s.markerRing} />
              <circle cx={p.x} cy={p.y} r="3.2" className={s.markerDot} />
            </g>
          ))}
        </svg>
        {pts.map((p) => (
          <a
            key={p.slug}
            href={`#loc-${p.slug}`}
            className={s.mapLabel}
            data-side={LABEL_SIDE[p.slug] ?? "r"}
            data-active={active === p.slug || undefined}
            style={{ left: `${(p.x / MAP_W) * 100}%`, top: `${(p.y / MAP_H) * 100}%` }}
            onMouseEnter={() => setActive(p.slug)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.slug)}
            onBlur={() => setActive(null)}
          >
            {p.city}
            {p.status === "coming-soon" && <small>Coming soon</small>}
          </a>
        ))}
      </div>

      <ul className={s.locGrid}>
        {pts.map((l, i) => (
          <li
            key={l.slug}
            id={`loc-${l.slug}`}
            className={`${s.card} ${s.locCard}`}
            data-active={active === l.slug || undefined}
            data-reveal
            style={{ ["--d" as string]: `${i * 80}ms` }}
            onMouseEnter={() => setActive(l.slug)}
            onMouseLeave={() => setActive(null)}
          >
            {l.photo ? (
              <img src={l.photo} alt="" width={1100} height={733} loading="lazy" className={s.cardImg} data-crop={l.slug === "birmingham" || undefined} style={{ objectPosition: CARD_POS[l.slug] }} />
            ) : (
              <span className={s.rings} aria-hidden="true" />
            )}
            <span className={s.cardShade} aria-hidden="true" />
            {l.status === "coming-soon" && <span className={s.soon}>Coming soon</span>}
            <div className={s.cardBody}>
              <p className={s.tag}>{l.state}</p>
              <h3 className={s.cardTitle}>{l.city}</h3>
              {l.dates && (
                <p className={s.locMeta}>
                  {l.dates}
                  <br />
                  {l.venue}
                </p>
              )}
              {l.formerly && <p className={s.locFormerly}>Formerly {l.formerly}</p>}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function RecapVideo({ src, poster, label, duration }: { src: string; poster: string; label: string; duration: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className={s.video} data-reveal>
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={playing}
        playsInline
        preload="none"
        width={1280}
        height={720}
        aria-label={label}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          type="button"
          className={s.videoPlay}
          aria-label={`Play ${label} (${duration})`}
          onClick={() => {
            setPlaying(true);
            ref.current?.play();
          }}
        >
          <span className={s.playIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span className={s.videoMeta}>{duration}</span>
        </button>
      )}
    </div>
  );
}
