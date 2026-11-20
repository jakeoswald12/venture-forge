"use client";

import { useRef, useState } from "react";
import { video } from "@/lib/content";
import s from "./c.module.css";

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

// Custom controls: the picture is scaled to hide the pillarbox bars, which would clip native controls.
export default function Recap() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(64);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      setStarted(true);
      void v.play();
    } else v.pause();
  };

  return (
    <div className={s.recapFrame}>
      <video
        ref={ref}
        src={video.recap.src}
        poster={video.recap.poster}
        preload="none"
        playsInline
        tabIndex={-1}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setStarted(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 64)}
      />
      {!started ? (
        <button type="button" className={s.recapPlay} aria-label={`Play ${video.recap.label}`} onClick={toggle}>
          <span className={s.playCircle} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
          <span className={s.recapMeta}>
            <span>{video.recap.label}</span>
            <span>{video.recap.duration}</span>
          </span>
        </button>
      ) : (
        <div className={s.recapBar}>
          <button type="button" onClick={toggle}>{playing ? "Pause" : "Play"}</button>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={time}
            aria-label="Seek"
            onChange={(e) => {
              const t = Number(e.target.value);
              setTime(t);
              if (ref.current) ref.current.currentTime = t;
            }}
          />
          <time>{fmt(time)} / {fmt(duration)}</time>
          <button
            type="button"
            aria-pressed={muted}
            onClick={() => {
              const m = !muted;
              setMuted(m);
              if (ref.current) ref.current.muted = m;
            }}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      )}
    </div>
  );
}
