import type { CSSProperties } from "react";
import {
  audiences,
  brand,
  footer,
  format,
  keynote,
  links,
  locations,
  partnerNames,
  partners,
  photos,
  speakers,
  stats,
  strategy,
  video,
  vision,
} from "@/lib/content";
import { Carousel, HeroVideo, RecapVideo, RevealInit, StrategySticky } from "./Client";
import { Jank } from "./Jank";
import { Nav } from "./Nav";
import s from "./d.module.css";

const themeBySlug: Record<string, string> = {
  austin: s.themeEmber,
  "dallas-fort-worth": s.themeIndigo,
  birmingham: s.themeGreen,
  "silicon-valley": s.themePink,
  franklin: s.themeInk,
};

// Poster crops. Birmingham is zoomed to the panel so the old stage banner stays out of frame.
const posterStyle: Record<string, CSSProperties> = {
  austin: { objectPosition: "30% 50%" },
  "dallas-fort-worth": { objectPosition: "38% 50%" },
  birmingham: { objectPosition: "0% 50%", transform: "scale(1.5)", transformOrigin: "8% 62%" },
};

const strategyPhotos = ["/photos/conversation-two-men.jpg", "/photos/expo-crowd.jpg", "/photos/finalists-on-stage.jpg"];
const audiencePhotos = ["/photos/audience-listening.jpg", "/photos/founders-laptops.jpg", "/photos/networking-lanyards.jpg"];

const fanPhotos = [
  "/photos/ballroom-wide.jpg",
  "/photos/two-women-smiling.jpg",
  "/photos/speaker-podium.jpg",
  "/photos/handshake.jpg",
  "/photos/panel-stage-blue.jpg",
  "/photos/audience-smiling.jpg",
  "/photos/fireside-chat.jpg",
  "/photos/networking-three-men.jpg",
  "/photos/winners-on-stage.jpg",
  "/photos/lunch-table.jpg",
  "/photos/speaker-mic-dark.jpg",
  "/photos/two-women-laptop.jpg",
  "/photos/auditorium-wide.jpg",
  "/photos/conversation-two.jpg",
  "/photos/panel-four-men.jpg",
  "/photos/group-portrait.jpg",
];

const ringPhotos = [...photos.people, ...photos.stage.filter((p) => !p.includes("birmingham")), ...photos.wide, ...photos.groups];

const rings = [
  { r: 285, n: 14, size: 46, dur: 80, dir: 1 },
  { r: 440, n: 16, size: 78, dur: 120, dir: -1 },
  { r: 640, n: 20, size: 124, dur: 170, dir: 1 },
];

const dated = locations.filter((l) => l.dates && l.photo);

export default function Page() {
  let ringIndex = 0;
  return (
    <div className={s.root} id="top">
      <RevealInit />
      <Nav />

      <main>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroCopy}>
              <h1 className={s.heroTitle}>
                <Jank text={brand.tagline} seed={3} />
              </h1>
              <p className={s.heroSub}>Annual summits and pitch competitions for Christ-centered investors, founders, and business leaders.</p>
              <div className={s.heroCtas}>
                <a className={`${s.btn} ${s.btnWhite}`} href={links.register}>
                  Register
                </a>
                <a className={`${s.btn} ${s.btnGhost}`} href={links.applyToPitch}>
                  Apply to pitch
                </a>
              </div>
            </div>
            <div className={s.heroMedia}>
              <div className={s.heroCard}>
                <HeroVideo src={video.skyline.src} poster={video.skyline.poster} />
              </div>
              <ul className={s.heroChips}>
                {dated.map((l, i) => (
                  <li key={l.slug} style={{ "--i": i } as CSSProperties}>
                    <span className={s.chipThumb}>
                      <img src={l.photo} alt="" width={56} height={56} style={posterStyle[l.slug]} />
                    </span>
                    <a href="#locations" className={s.chipBubble}>
                      <b>{l.city}</b>
                      <span>{l.dates}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className={s.stats} aria-label="Venture Forge in numbers">
          <dl className={s.statsRow}>
            {stats.map((st) => (
              <div key={st.label} data-reveal>
                <dd>{st.value}</dd>
                <dt>{st.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Locations */}
        <section className={s.locations} id="locations">
          <h2 className={s.h2Center}>
            <Jank text="Locations" seed={5} />
          </h2>
          <div className={s.invites}>
            {locations.map((l) => {
              const full = Boolean(l.event);
              return (
                <article key={l.slug} className={`${s.invite} ${themeBySlug[l.slug]} ${full ? s.inviteFull : s.inviteSlim}`} data-reveal>
                  <header className={s.inviteHead}>
                    <h3>
                      <Jank text={l.city} seed={l.city.length} />
                    </h3>
                    <p>{l.state}</p>
                    {l.status === "coming-soon" && <span className={s.soon}>Coming soon</span>}
                  </header>
                  {full && l.photo && (
                    <div className={s.poster}>
                      <img src={l.photo} alt={`${l.city}`} width={1100} height={733} loading="lazy" style={posterStyle[l.slug]} />
                    </div>
                  )}
                  {full && (
                    <div className={s.inviteGlass}>
                      <p className={s.inviteEvent}>{l.event}</p>
                      <dl>
                        <div>
                          <dt>
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                            <span className={s.srOnly}>Dates</span>
                          </dt>
                          <dd>{l.dates}</dd>
                        </div>
                        <div>
                          <dt>
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.500 15.400 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="10.500" r="2.300" fill="currentColor" /></svg>
                            <span className={s.srOnly}>Venue</span>
                          </dt>
                          <dd>{l.venue}</dd>
                        </div>
                      </dl>
                      <p className={s.inviteNote}>{l.note}</p>
                      {l.formerly && <p className={s.inviteFormerly}>Formerly {l.formerly}</p>}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div className={s.centerCta}>
            <a className={`${s.btn} ${s.btnBlack}`} href={links.register}>
              Register
            </a>
          </div>
        </section>

        {/* Strategy */}
        <section className={s.strategy} id="strategy">
          <StrategySticky
            heading={
              <h2 className={s.h2}>
                <Jank text="Strategy" seed={7} />
              </h2>
            }
            steps={strategy.map((st, i) => ({ ...st, photo: strategyPhotos[i] }))}
          />
        </section>

        {/* Who it is for */}
        <section className={s.audiences} id="who">
          <h2 className={s.h2}>
            <Jank text="Who it is for" seed={9} />
          </h2>
          <div className={s.audienceGrid}>
            {audiences.map((a, i) => (
              <article key={a.title} className={s.audienceCard} data-reveal>
                <div className={s.audiencePhoto}>
                  <img src={audiencePhotos[i]} alt="" width={1100} height={733} loading="lazy" />
                </div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <a className={`${s.pill} ${i === 0 ? s.pillDark : s.pillOutline}`} href={a.href}>
                  {a.cta}
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h13M13 6.500 18.500 12 13 17.500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Format */}
        <section className={s.format} id="format">
          <h2 className={s.h2Center}>
            <Jank text="Format" seed={11} />
          </h2>
          <ol className={s.formatList}>
            {format.map((f) => (
              <li key={f.title} data-reveal>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Speakers */}
        <section className={s.speakers} id="speakers">
          <h2 className={s.h2Center}>
            <Jank text="2026 speakers" seed={13} />
          </h2>
          <Carousel label="2026 speakers">
            <article className={`${s.speakerCard} ${s.keynoteCard}`}>
              <p className={s.keynoteLabel}>{keynote.location}</p>
              <h3>{keynote.name}</h3>
              <p className={s.keynoteRole}>
                {keynote.role}, {keynote.org}
              </p>
              <p className={s.keynoteBio}>{keynote.bio}</p>
            </article>
            {speakers.map((sp) => (
              <article key={sp.name} className={s.speakerCard}>
                {sp.photo && <img src={sp.photo} alt={sp.name} width={700} height={700} loading="lazy" />}
                <div className={s.speakerGlass}>
                  <h3>{sp.name}</h3>
                  <p>
                    {sp.role}
                    <span aria-hidden="true"> · </span>
                    {sp.org}
                  </p>
                </div>
              </article>
            ))}
          </Carousel>
        </section>

        {/* Recap */}
        <section className={s.recap} id="recap">
          <h2 className={s.h2Center}>
            <Jank text={video.recap.label} seed={15} />
          </h2>
          <div data-reveal>
            <RecapVideo src={video.recap.src} poster={video.recap.poster} label={video.recap.label} duration={video.recap.duration} />
          </div>
        </section>

        {/* Photos */}
        <section className={s.photos} id="photos">
          <h2 className={s.h2}>
            <Jank text="Photos" seed={17} />
          </h2>
          <div className={s.fan} style={{ "--n": fanPhotos.length } as CSSProperties}>
            <div className={s.fanTrack}>
              {[...fanPhotos, ...fanPhotos].map((p, i) => (
                <div key={i} className={s.fanCard} style={{ "--i": i, zIndex: fanPhotos.length * 2 - i } as CSSProperties} aria-hidden={i >= fanPhotos.length}>
                  <img src={p} alt="" width={1100} height={733} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className={s.partners} id="partners">
          <h2 className={s.h2Center}>
            <Jank text="Partners" seed={19} />
          </h2>
          <ul className={s.partnerGrid}>
            {partners.map((p) => (
              <li key={p.name} data-reveal>
                <img src={p.logo} alt={p.name} width={240} height={96} loading="lazy" />
              </li>
            ))}
          </ul>
          <ul className={s.partnerNames}>
            {partnerNames.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className={s.centerCta}>
            <a className={`${s.pill} ${s.pillDark}`} href={links.sponsor}>
              Sponsor
            </a>
          </div>
        </section>

        {/* Vision */}
        <section className={s.vision} id="vision">
          <div className={s.visionCard} data-reveal>
            <h2 className={s.visionLabel}>
              <Jank text={vision.heading} seed={21} />
            </h2>
            <p className={s.visionQuote}>
              <Jank text={vision.quote} seed={23} />
            </p>
            <p className={s.visionBody}>{vision.body}</p>
          </div>
        </section>

        {/* Register */}
        <section className={s.orbit} aria-label="Register">
          <div className={s.orbitMask} aria-hidden="true">
          <div className={s.orbitStage}>
            {rings.map((ring, ri) => (
              <div key={ri} className={s.ring} style={{ "--dur": `${ring.dur}s`, "--dir": ring.dir } as CSSProperties}>
                {Array.from({ length: ring.n }).map((_, i) => {
                  const src = ringPhotos[ringIndex++ % ringPhotos.length];
                  const style = {
                    "--a": `${(360 / ring.n) * i}deg`,
                    "--r": `${ring.r}px`,
                    "--t": `${((i * 37 + ri * 11) % 28) - 14}deg`,
                    width: ring.size,
                    height: ring.size,
                  } as CSSProperties;
                  return (
                    <span key={i} style={style}>
                      <span>
                        <img src={src} alt="" width={ring.size} height={ring.size} loading="lazy" />
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          </div>
          <div className={s.orbitCenter}>
            <a className={s.bigPill} href={links.register}>
              <Jank text="Register" seed={25} />
            </a>
            <p>
              {locations[0].city}
              <br />
              {locations[0].dates}
            </p>
          </div>
        </section>
      </main>

      <footer className={s.footerWrap}>
        <div className={s.footer}>
          <div className={s.footerCols}>
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2>{col.title}</h2>
                <ul>
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a href={it.href}>{it.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <p className={s.footerLegal}>{footer.legal}</p>
          </div>
          <svg className={s.footerMark} viewBox="0 0 1000 170" role="img" aria-label="Venture Forge">
            <text x="0" y="128" textLength="1000" lengthAdjust="spacingAndGlyphs">
              venture forge
            </text>
          </svg>
        </div>
      </footer>
    </div>
  );
}
