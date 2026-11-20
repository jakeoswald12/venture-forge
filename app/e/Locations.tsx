"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { locations } from "@/lib/content";
import type { Location } from "@/lib/content";
import { MAP_H, MAP_W, coords, dotsPath, project } from "./geo";
import s from "./e.module.css";

// Label placement per marker: [dx, dy, anchor]
const LABEL: Record<string, [number, number, "start" | "end"]> = {
  austin: [-18, 26, "end"],
  "dallas-fort-worth": [-18, -14, "end"],
  birmingham: [20, 22, "start"],
  "silicon-valley": [20, 5, "start"],
  franklin: [20, -6, "start"],
};
const RATIO: Record<string, string> = {
  austin: "1 / 1.12",
  "dallas-fort-worth": "1 / 1",
  birmingham: "1 / 1.2",
  "silicon-valley": "1 / 0.82",
  franklin: "1 / 0.82",
};

function Card({ l, active, setActive }: { l: Location; active: boolean; setActive: (v: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const soon = l.status === "coming-soon";
  const more = l.note || l.formerly;
  return (
    <article
      id={`location-${l.slug}`}
      className={s.card}
      data-active={active ? "1" : undefined}
      onMouseEnter={() => setActive(l.slug)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(l.slug)}
      onBlur={() => setActive(null)}
      data-reveal
    >
      <div className={`${s.tile} ${soon ? s.tileLime : ""}`} style={{ aspectRatio: RATIO[l.slug] }}>
        {l.photo ? (
          <img
            src={l.photo}
            alt={`${l.city}, ${l.state}`}
            width={900}
            height={900}
            loading="lazy"
            style={l.slug === "birmingham" ? { objectPosition: "0% 50%" } : undefined}
          />
        ) : (
          <div className={s.tileBlank}>
            <span className={s.tilePin} data-soon={soon ? "1" : undefined} aria-hidden="true" />
            <span className={s.mono}>{coords(l.lat, l.lng)}</span>
          </div>
        )}
        {more && (
          <>
            <div className={s.tileMore} data-open={open ? "1" : undefined} id={`more-${l.slug}`} aria-hidden={!open}>
              {l.event && <p className={s.h4}>{l.event}</p>}
              {l.note && <p>{l.note}</p>}
              {l.formerly && <p className={s.mono}>Formerly {l.formerly}</p>}
            </div>
            <button
              type="button"
              className={s.plus}
              data-open={open ? "1" : undefined}
              aria-expanded={open}
              aria-controls={`more-${l.slug}`}
              aria-label={open ? `Hide details for ${l.city}` : `Show details for ${l.city}`}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
                <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </button>
          </>
        )}
      </div>
      <h3 className={s.h4}>{l.city}</h3>
      <p className={s.mono}>{l.state}</p>
      {(l.dates || l.venue || soon) && (
        <p className={`${s.mono} ${s.cardMeta}`}>
          {soon && <span className={s.tag}>Coming soon</span>}
          {l.dates && <span>{l.dates}</span>}
          {l.venue && <span>{l.venue}</span>}
        </p>
      )}
    </article>
  );
}

export function Locations() {
  const [active, setActive] = useState<string | null>(null);
  const cols = [
    [locations[0], locations[2], locations[4]],
    [locations[1], locations[3]],
  ];
  return (
    <div className={s.locGrid}>
      <div className={s.mapWrap}>
        <svg className={s.map} viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Map of the United States showing the five Venture Forge locations">
          <path d={dotsPath} className={s.mapDots} />
          {locations.map((l, i) => {
            const [x, y] = project(l.lat, l.lng);
            const [dx, dy, anchor] = LABEL[l.slug] ?? [18, 5, "start"];
            const soon = l.status === "coming-soon";
            return (
              <a
                key={l.slug}
                href={`#location-${l.slug}`}
                className={s.marker}
                data-active={active === l.slug ? "1" : undefined}
                data-soon={soon ? "1" : undefined}
                style={{ "--i": i } as CSSProperties}
                onMouseEnter={() => setActive(l.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(l.slug)}
                onBlur={() => setActive(null)}
              >
                <circle cx={x} cy={y} r="30" className={s.markerHit} />
                <circle cx={x} cy={y} r="15" className={s.markerHalo} />
                <circle cx={x} cy={y} r="5.5" className={s.markerDot} />
                <text x={x + dx} y={y + dy} textAnchor={anchor} className={s.markerLabel}>
                  {l.city.toUpperCase()}
                </text>
                {soon && (
                  <text x={x + dx} y={y + dy} dy="-1.35em" textAnchor={anchor} className={`${s.markerLabel} ${s.markerSoon}`}>
                    COMING SOON
                  </text>
                )}
              </a>
            );
          })}
        </svg>
        <ol className={s.locList}>
          {locations.map((l, i) => (
            <li key={l.slug}>
              <a
                href={`#location-${l.slug}`}
                data-active={active === l.slug ? "1" : undefined}
                onMouseEnter={() => setActive(l.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(l.slug)}
                onBlur={() => setActive(null)}
              >
                <span className={s.mono}>0{i + 1}</span>
                <span className={s.h4}>{l.city}</span>
                <span className={`${s.mono} ${s.gray}`}>{l.state}</span>
                <span className={s.mono}>{l.status === "coming-soon" ? "Coming soon" : l.dates ?? ""}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className={s.locCards}>
        {cols.map((col, i) => (
          <div key={i} className={s.locCol}>
            {col.map((l) => (
              <Card key={l.slug} l={l} active={active === l.slug} setActive={setActive} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
