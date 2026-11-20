"use client";

import { useState } from "react";
import { audiences } from "@/lib/content";
import s from "./c.module.css";

const images = ["/photos/conversation-two-men.jpg", "/photos/founders-laptops.jpg", "/photos/networking-three-men.jpg"];

export default function Audiences() {
  const [active, setActive] = useState(0);
  return (
    <div className={s.tabs} data-reveal>
      <div className={s.tabList} role="tablist" aria-label="Who it is for">
        {audiences.map((a, i) => (
          <button
            key={a.title}
            type="button"
            role="tab"
            id={`c-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`c-panel-${i}`}
            className={s.tab}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {a.title}
          </button>
        ))}
      </div>
      <div className={s.tabMedia}>
        {images.map((src, i) => (
          <img key={src} src={src} alt="" width={1100} height={733} loading="lazy" data-active={active === i ? "" : undefined} />
        ))}
      </div>
      <div className={s.tabPanels}>
        {audiences.map((a, i) => (
          <div
            key={a.title}
            role="tabpanel"
            id={`c-panel-${i}`}
            aria-labelledby={`c-tab-${i}`}
            className={s.tabPanel}
            data-active={active === i ? "" : undefined}
          >
            <p>{a.body}</p>
            <a className={s.chipLink} href={a.href} target="_blank" rel="noreferrer" tabIndex={active === i ? 0 : -1}>
              {a.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
