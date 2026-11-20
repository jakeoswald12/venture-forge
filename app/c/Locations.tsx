"use client";

import { useState } from "react";
import { locations } from "@/lib/content";
import { DOTS, MAP_H, MAP_W, project } from "./map";
import s from "./c.module.css";

const labelSide: Record<string, "left" | "right"> = {
  austin: "left",
  "dallas-fort-worth": "right",
  birmingham: "right",
  "silicon-valley": "right",
  franklin: "left",
};

export default function Locations() {
  const [active, setActive] = useState(locations[0].slug);
  return (
    <div className={s.locGrid}>
      <div className={s.map} data-reveal>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Map of the United States showing the five Venture Forge locations">
          <path d={DOTS} className={s.mapDots} />
        </svg>
        {locations.map((l) => {
          const [x, y] = project(l.lng, l.lat);
          return (
            <button
              key={l.slug}
              type="button"
              className={s.pin}
              data-active={active === l.slug ? "" : undefined}
              data-soon={l.status === "coming-soon" ? "" : undefined}
              data-side={labelSide[l.slug] ?? "right"}
              style={{ left: `${((x / MAP_W) * 100).toFixed(2)}%`, top: `${((y / MAP_H) * 100).toFixed(2)}%` }}
              onMouseEnter={() => setActive(l.slug)}
              onFocus={() => setActive(l.slug)}
              onClick={() => setActive(l.slug)}
              aria-label={l.city}
            >
              <span className={s.pinDot} />
              <span className={s.pinLabel}>{l.city}</span>
            </button>
          );
        })}
      </div>
      <ul className={s.locList}>
        {locations.map((l) => (
          <li
            key={l.slug}
            className={s.locRow}
            data-active={active === l.slug ? "" : undefined}
            onMouseEnter={() => setActive(l.slug)}
            data-reveal
          >
            <div className={s.locHead}>
              <h3>{l.city}</h3>
              <p>{l.state}</p>
            </div>
            <div className={s.locBody}>
              {l.status === "coming-soon" ? (
                <span className={s.chip}>Coming soon</span>
              ) : l.event ? (
                <>
                  <p className={s.locEvent}>{l.event}</p>
                  <p>{l.dates}</p>
                  <p>{l.venue}</p>
                  {l.note && <p className={s.locNote}>{l.note}</p>}
                  {l.formerly && <p className={s.locNote}>Formerly {l.formerly}</p>}
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
