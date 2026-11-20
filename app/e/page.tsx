import type { CSSProperties } from "react";
import {
  audiences, brand, footer, format, keynote, links, nav, partnerNames, partners, speakers, stats, strategy, video, vision,
} from "@/lib/content";
import { Button } from "./Button";
import { Fx } from "./Fx";
import { Locations } from "./Locations";
import { Recap } from "./Recap";
import s from "./e.module.css";

type Tile = { src: string; alt: string; l: number; t: number; w: number; ar: number; d: number; z?: number; m?: [number, number, number]; video?: boolean };

// l/t in % of the hero, w in vw, ar = height / width, d = depth. m = [left %, top %, width vw] on mobile.
const heroTiles: Tile[] = [
  { src: "/photos/fireside-chat.jpg", alt: "Fireside chat on stage", l: 36, t: 4, w: 11.5, ar: 0.9, d: 1, m: [27, 16, 27] },
  { src: "/photos/two-women-smiling.jpg", alt: "Two attendees smiling", l: 29, t: 16, w: 9.2, ar: 0.72, d: 1.6, z: 2, m: [48, 22, 24] },
  { src: "/photos/speaker-podium.jpg", alt: "Speaker at the podium", l: 62.5, t: 11, w: 7.6, ar: 1.12, d: 0.7 },
  { src: "/photos/handshake.jpg", alt: "Attendees shaking hands", l: 90, t: 5, w: 6, ar: 0.72, d: 0.5, m: [84, 27, 16] },
  { src: "/photos/panel-two-men.jpg", alt: "Panel conversation", l: -1.5, t: 21, w: 8, ar: 1.2, d: 1.2, m: [8, 11, 19] },
  { src: "/photos/conversation-two.jpg", alt: "Two attendees in conversation", l: 7.5, t: 48, w: 5.2, ar: 0.82, d: 0.4 },
  { src: video.skyline.src, alt: "Austin skyline", l: 80, t: 28, w: 13, ar: 1.1, d: 1.4, video: true },
  { src: "/photos/networking-lanyards.jpg", alt: "Attendees networking", l: 97, t: 61, w: 5, ar: 0.9, d: 0.6 },
  { src: "/photos/audience-smiling.jpg", alt: "Audience during a session", l: 16, t: 70, w: 10.5, ar: 0.9, d: 1.3, m: [-3, 68, 28] },
  { src: "/photos/lunch-table.jpg", alt: "Lunch table", l: 29, t: 67, w: 6, ar: 0.86, d: 0.5, m: [56, 58, 12] },
  { src: "/photos/winners-on-stage.jpg", alt: "Pitch competition winners on stage", l: 70, t: 76, w: 15, ar: 0.72, d: 1.5, m: [52, 71, 36] },
  { src: "/photos/two-women-greeting.jpg", alt: "Two attendees greeting", l: 47.5, t: 74, w: 6, ar: 1, d: 0.8 },
];

const aboutCards = [
  { photo: "/photos/ballroom-wide.jpg", alt: "Summit ballroom", stat: stats[3], ar: "1 / 1" },
  { photo: "/photos/finalists-on-stage.jpg", alt: "Pitch finalists on stage", stat: stats[1], ar: "1 / 1" },
  { photo: "/photos/panel-four-men.jpg", alt: "Panel discussion", stat: stats[2], ar: "1 / 1" },
];

const formatPhotos = ["/photos/banquet-wide.jpg", "/photos/founders-laptops.jpg", "/photos/panel-stage-blue.jpg", "/photos/networking-three-men.jpg"];

const tall = new Set(["Brett Ender & Harry Gray", "Derek Welborn", "Scott Harris"]);
const speakerRatios = ["1 / 1.15", "1 / 1", "1 / 1.2", "1 / 1.08", "1 / 0.95"];

const gallery: { src: string; alt: string; ar: string }[] = [
  { src: "/photos/auditorium-wide.jpg", alt: "Auditorium during a keynote", ar: "1 / 0.72" },
  { src: "/photos/speaker-woman-stage.jpg", alt: "Speaker on stage", ar: "1 / 1.1" },
  { src: "/photos/group-portrait.jpg", alt: "Group portrait", ar: "1 / 0.8" },
  { src: "/photos/table-conversation.jpg", alt: "Conversation at a table", ar: "1 / 1.15" },
  { src: "/photos/expo-crowd.jpg", alt: "Expo floor", ar: "1 / 0.9" },
  { src: "/photos/speaker-blue-screen.jpg", alt: "Speaker presenting", ar: "1 / 0.7" },
  { src: "/photos/audience-taking-notes.jpg", alt: "Audience taking notes", ar: "1 / 1.2" },
  { src: "/photos/panel-four-stage.jpg", alt: "Panel on stage", ar: "1 / 0.72" },
  { src: "/photos/networking-handshake-2.jpg", alt: "Attendees meeting", ar: "1 / 0.7" },
  { src: "/photos/two-women-laptop.jpg", alt: "Two attendees at a laptop", ar: "1 / 1" },
  { src: "/photos/one-on-one-meeting.jpg", alt: "One on one meeting", ar: "1 / 0.75" },
  { src: "/photos/auditorium-audience.jpg", alt: "Audience in the auditorium", ar: "1 / 1.1" },
  { src: "/photos/conversation-two-men.jpg", alt: "Two attendees talking", ar: "1 / 0.8" },
  { src: "/photos/audience-listening.jpg", alt: "Audience listening", ar: "1 / 0.72" },
  { src: "/photos/speaker-dark-room.jpg", alt: "Speaker addressing the room", ar: "1 / 1" },
  { src: "/photos/panel-bright-room.jpg", alt: "Panel in session", ar: "1 / 0.9" },
];

const footerPhotos = ["/photos/speaker-podium.jpg", "/photos/two-women-smiling.jpg", "/photos/handshake.jpg", "/photos/fireside-chat.jpg", "/photos/audience-smiling.jpg"];

function columns<T>(items: T[], n: number): T[][] {
  const out: T[][] = Array.from({ length: n }, () => []);
  items.forEach((it, i) => out[i % n].push(it));
  return out;
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w>
          {w}{" "}
        </span>
      ))}
    </>
  );
}

function Wordmark({ className }: { className?: string }) {
  return <span className={`${s.wordmark} ${className ?? ""}`}>Venture Forge</span>;
}

export default function Page() {
  const speakerCols = columns([{ keynote: true as const }, ...speakers.map((sp) => ({ keynote: false as const, sp }))], 4);
  const galleryCols = columns(gallery, 4);
  const [tagA, tagB] = brand.tagline.split(". ");

  return (
    <div className={s.root} id="top">
      <Fx />

      <header className={s.bar}>
        <a href="#top" className={s.barBrand} aria-label="Venture Forge, back to top">
          <Wordmark />
        </a>
        <nav className={s.barNav} aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={`${s.mono} ${s.barLink}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <Button href={links.register} label="Register" variant="lime" />
      </header>

      <main>
        <section className={s.hero} data-hero>
          <div className={s.heroTiles} aria-hidden="true">
            {heroTiles.map((t, i) => (
              <div
                key={t.src}
                className={`${s.heroTile} ${t.m ? "" : s.heroTileDesk}`}
                style={{
                  "--l": `${t.l}%`, "--t": `${t.t}%`, "--w": `${t.w}vw`, "--d": t.d, "--i": i, "--ar": `1 / ${t.ar}`,
                  ...(t.m ? { "--ml": `${t.m[0]}%`, "--mt": `${t.m[1]}%`, "--mw": `${t.m[2]}vw` } : {}),
                  zIndex: t.z,
                } as CSSProperties}
              >
                <div className={s.heroTileIn}>
                  {t.video ? (
                    <video src={t.src} poster={video.skyline.poster} autoPlay muted loop playsInline preload="metadata" />
                  ) : (
                    <img src={t.src} alt="" width={440} height={440} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <h1 className={s.heroTitle}>
            <span>{tagA}.</span> <span>{tagB}</span>
          </h1>
          <p className={`${s.mono} ${s.heroSide}`}>{brand.short}</p>
          <a href="#about" className={s.heroScroll}>
            <span className={s.mono}>Scroll</span>
            <span className={s.heroScrollBtn} aria-hidden="true">
              <svg viewBox="0 0 18 10" width="18" height="10"><path d="M1 1l8 8 8-8" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </span>
          </a>
        </section>

        <section className={s.about} id="about">
          <p className={s.aboutText} data-fill>
            <Words text={brand.description} />
          </p>
          <div className={s.aboutCards}>
            {aboutCards.map((c) => (
              <article key={c.photo} className={s.card} data-reveal>
                <div className={s.tile} style={{ aspectRatio: c.ar }}>
                  <img src={c.photo} alt={c.alt} width={700} height={700} loading="lazy" />
                </div>
                <h3 className={s.h4}>{c.stat.value}</h3>
                <p className={s.mono}>{c.stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={s.panel} id="locations">
          <h2 className={s.panelTitle} data-reveal>Locations</h2>
          <Locations />
        </section>

        <section className={s.strategy} id="strategy">
          <div className={s.strategyIn}>
            <h2 className={s.h1}>Strategy</h2>
            <ol className={s.strategyList}>
              {strategy.map((it, i) => (
                <li key={it.title} data-reveal>
                  <span className={s.mono}>0{i + 1}</span>
                  <h3 className={s.h3}>{it.title}</h3>
                  <p>{it.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.section} id="who">
          <h2 className={s.h1} data-reveal>Who it is for</h2>
          <div className={s.audiences}>
            {audiences.map((a, i) => (
              <article key={a.title} className={s.audience} data-reveal style={{ "--i": i } as CSSProperties}>
                <span className={s.mono}>0{i + 1}</span>
                <h3 className={s.h2}>{a.title}</h3>
                <p>{a.body}</p>
                <Button href={a.href} label={a.cta} variant={i === 0 ? "lime" : "black"} />
              </article>
            ))}
          </div>
        </section>

        <section className={s.section} id="format">
          <h2 className={s.h1} data-reveal>Format</h2>
          <ol className={s.format}>
            {format.map((f, i) => (
              <li key={f.title} data-reveal>
                <span className={s.mono}>0{i + 1}</span>
                <h3 className={s.h2}>{f.title}</h3>
                <p>{f.body}</p>
                <div className={s.formatImg}>
                  <img src={formatPhotos[i]} alt="" width={440} height={300} loading="lazy" />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.panel} id="speakers">
          <h2 className={s.panelTitle} data-reveal>2026 speakers</h2>
          <div className={s.masonry}>
            {speakerCols.map((col, ci) => (
              <div key={ci} className={s.masonryCol} data-parallax style={{ "--c": ci } as CSSProperties}>
                {col.map((it, i) =>
                  it.keynote ? (
                    <article key="keynote" className={s.card} data-reveal>
                      <div className={`${s.tile} ${s.tileLime} ${s.keynote}`}>
                        <span className={s.mono}>{keynote.location}</span>
                        <p className={s.h2}>{keynote.bio}</p>
                      </div>
                      <h3 className={s.h4}>{keynote.name}</h3>
                      <p className={s.mono}>{keynote.org}</p>
                      <p className={`${s.mono} ${s.gray}`}>{keynote.role}</p>
                    </article>
                  ) : (
                    <article key={it.sp.name} className={s.card} data-reveal>
                      <div
                        className={s.tile}
                        style={{ aspectRatio: tall.has(it.sp.name) ? "1 / 1.3" : it.sp.name === "Joel Trammell" ? "1 / 0.82" : speakerRatios[(ci * 2 + i) % speakerRatios.length] }}
                      >
                        <img src={it.sp.photo} alt={it.sp.name} width={700} height={700} loading="lazy" style={{ objectPosition: "50% 20%" }} />
                      </div>
                      <h3 className={s.h4}>{it.sp.name}</h3>
                      <p className={s.mono}>{it.sp.org}</p>
                      {it.sp.role && <p className={`${s.mono} ${s.gray}`}>{it.sp.role}</p>}
                    </article>
                  ),
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={s.section} id="recap">
          <h2 className={s.h1} data-reveal>{video.recap.label}</h2>
          <div data-reveal>
            <Recap />
          </div>
          <div className={`${s.masonry} ${s.gallery}`}>
            {galleryCols.map((col, ci) => (
              <div key={ci} className={s.masonryCol} data-parallax style={{ "--c": ci } as CSSProperties}>
                {col.map((g) => (
                  <div key={g.src} className={s.tile} style={{ aspectRatio: g.ar }} data-reveal>
                    <img src={g.src} alt={g.alt} width={700} height={500} loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={`${s.section} ${s.vision}`} id="vision">
          <h2 className={s.h1} data-reveal>{vision.heading}</h2>
          <p className={s.visionText} data-fill>
            <Words text={vision.body} />
          </p>
        </section>

        <section className={s.quote} aria-label="Quote">
          <blockquote className={s.h3}>{vision.quote}</blockquote>
        </section>

        <section className={s.section} id="partners">
          <h2 className={s.h1} data-reveal>Partners</h2>
          <ul className={s.partners}>
            {partners.map((p) => (
              <li key={p.name} className={s.partner} data-reveal>
                <img src={p.logo} alt={p.name} width={320} height={140} loading="lazy" />
              </li>
            ))}
            <li className={`${s.partner} ${s.partnerCta}`} data-reveal>
              <Button href={links.sponsor} label="Sponsor" variant="lime" />
            </li>
          </ul>
          <ul className={`${s.mono} ${s.partnerNames}`} data-reveal>
            {partnerNames.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerTop}>
          {footer.columns.map((col) => (
            <div key={col.title} className={s.footerCol}>
              <h2 className={`${s.mono} ${s.gray}`}>{col.title}</h2>
              <ul>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href.startsWith("http") ? it.href : col.title === "Locations" ? `#location-${slug(it.label)}` : it.href}
                      {...(it.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={s.footerCol}>
            <h2 className={`${s.mono} ${s.gray}`}>Sections</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div className={s.footerCta}>
            <Button href={links.register} label="Register" variant="lime" />
          </div>
        </div>
        <div className={s.footerMark} aria-hidden="true">
          <span>Venture F</span>
          <span className={s.footerO}>
            {footerPhotos.map((p, i) => (
              <img key={p} src={p} alt="" width={300} height={300} loading="lazy" style={{ "--i": i } as CSSProperties} />
            ))}
          </span>
          <span>rge</span>
        </div>
        <div className={s.footerBottom}>
          <p className={s.mono}>{footer.legal}</p>
          <p className={s.mono}>{brand.short}</p>
        </div>
      </footer>
    </div>
  );
}

function slug(city: string) {
  return city.toLowerCase().replace(/[–\s]+/g, "-");
}
