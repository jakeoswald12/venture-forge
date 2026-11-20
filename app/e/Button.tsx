import type { CSSProperties } from "react";
import s from "./e.module.css";

type Props = { href: string; label: string; variant?: "lime" | "black" | "white"; className?: string };

export function Button({ href, label, variant = "lime", className }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${s.btn} ${s[`btn_${variant}`]} ${className ?? ""}`}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className={s.btnInner}>
        <span className={s.chars} aria-hidden="true">
          {Array.from(label).map((c, i) => (
            <span key={i} style={{ "--index": i } as CSSProperties}>
              {c === " " ? " " : c}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}
