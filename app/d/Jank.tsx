import type { CSSProperties } from "react";
import s from "./d.module.css";

// Display type with slightly uneven letters. Deterministic, so server and client match.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function Jank({ text: raw, seed = 1 }: { text: string; seed?: number }) {
  const text = raw.replace(/'/g, "\u2019");
  let n = seed * 17;
  return (
    <span className={s.jank}>
      <span className={s.srOnly}>{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <span key={wi}>
            <span className={s.jankWord}>
              {Array.from(word).map((ch, ci) => {
                n += 1;
                const a = rand(n);
                const b = rand(n + 0.5);
                const c = rand(n + 0.25);
                const style = {
                  "--jy": `${((a - 0.5) * 0.05).toFixed(3)}em`,
                  "--jr": `${((b - 0.5) * 2.4).toFixed(2)}deg`,
                  "--js": (0.965 + c * 0.07).toFixed(3),
                } as CSSProperties;
                return (
                  <span key={ci} className={s.jankChar} style={style}>
                    {ch}
                  </span>
                );
              })}
            </span>{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
