"use client";

import { useRef, useState } from "react";
import { video } from "@/lib/content";
import s from "./e.module.css";

export function Recap() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => {
    setPlaying(true);
    ref.current?.play().catch(() => {});
  };
  return (
    <div className={s.recap} data-playing={playing ? "1" : undefined}>
      <video
        ref={ref}
        src={video.recap.src}
        poster={video.recap.poster}
        controls={playing}
        playsInline
        preload="none"
        width={1280}
        height={720}
      />
      {!playing && (
        <button type="button" className={s.recapPlay} onClick={play} aria-label={`Play ${video.recap.label}`}>
          <span className={s.recapIcon} aria-hidden="true">
            <svg viewBox="0 0 12 14" width="12" height="14"><path d="M0 0l12 7-12 7z" fill="currentColor" /></svg>
          </span>
          <span className={s.mono}>Play {video.recap.duration}</span>
        </button>
      )}
    </div>
  );
}
