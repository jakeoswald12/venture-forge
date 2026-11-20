import {
  audiences, brand, footer, format, keynote, links, locations, nav, partnerNames, partners, speakers, stats, strategy, video, vision,
} from "@/lib/content";
import { CountUp, Effects, HeroVideo, Locations, Nav, RecapVideo, Wordmark } from "./client";
import s from "./page.module.css";

const [taglineA, taglineB] = brand.tagline.split(". ").map((t, i) => (i === 0 ? `${t}.` : t));

const strategyPhotos = ["/photos/founders-laptops.jpg", "/photos/expo-crowd.jpg", "/photos/finalists-on-stage.jpg"];
const strategyPos = ["50% 50%", "60% 50%", "50% 50%"];

const strip = [
  "/photos/ballroom-wide.jpg", "/photos/panel-stage-blue.jpg", "/photos/audience-smiling.jpg", "/photos/banquet-wide.jpg",
  "/photos/speaker-blue-screen.jpg", "/photos/table-conversation.jpg", "/photos/auditorium-wide.jpg", "/photos/panel-four-stage.jpg",
  "/photos/two-women-laptop.jpg", "/photos/conversation-two-men.jpg", "/photos/audience-taking-notes.jpg", "/photos/networking-lanyards.jpg",
];

const polaroids = [
  "/photos/handshake.jpg", "/photos/two-women-smiling.jpg", "/photos/group-portrait.jpg",
  "/photos/winners-on-stage.jpg", "/photos/lunch-table.jpg", "/photos/networking-three-men.jpg",
];

const upcoming = locations.filter((l) => l.dates);

function torn(seed: number, flip = false) {
  let x = seed;
  const rnd = () => ((x = (x * 9301 + 49297) % 233280), x / 233280);
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const y = 10 + rnd() * 9 + Math.sin(i / 7) * 4 + (rnd() > 0.9 ? rnd() * 8 : 0);
    pts.push(`${(i / 120) * 1440},${(flip ? 40 - y : y).toFixed(1)}`);
  }
  return flip ? `M0,0 L${pts.join(" L")} L1440,0 Z` : `M0,40 L${pts.join(" L")} L1440,40 Z`;
}

export default function Page() {
  return (
    <div className={s.root} data-a-root id="top">
      <Effects />
      <a href="#main" className={s.skip}>Skip to main content</a>
      <Nav />

      <main id="main">
        {/* Hero */}
        <section className={s.hero}>
          <HeroVideo src={video.skyline.src} poster={video.skyline.poster} />
          <span className={s.heroShade} aria-hidden="true" />
          <div className={`${s.container} ${s.heroInner}`}>
            <h1 className={s.h1}>
              {taglineA} <span className={s.gold}>{taglineB}</span>
            </h1>
            <div className={s.heroSide}>
              <p>{brand.description}</p>
              <a href={links.register} className={`${s.btn} ${s.btnLg}`}><span>Register</span></a>
            </div>
          </div>
          <div className={`${s.container} ${s.heroDates}`}>
            {upcoming.map((l) => (
              <a key={l.slug} href={`#loc-${l.slug}`}>
                <strong>{l.city}</strong>
                <span>{l.dates}</span>
              </a>
            ))}
          </div>
          <svg className={s.torn} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d={torn(7)} /></svg>
        </section>

        {/* Locations */}
        <section className={s.section} id="locations">
          <div className={s.container}>
            <h2 className={`${s.h2} ${s.center}`} data-reveal>Locations</h2>
            <Locations />
            <dl className={s.stats}>
              {stats.map((st, i) => (
                <div key={st.label} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <dd><CountUp value={st.value} /></dd>
                  <dt>{st.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Strategy */}
        <section className={s.section} id="strategy">
          <div className={s.container}>
            <h2 className={s.h2} data-reveal>Strategy</h2>
            <ul className={s.grid3}>
              {strategy.map((it, i) => (
                <li key={it.title} className={`${s.card} ${s.stratCard}`} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                  <img src={strategyPhotos[i]} alt="" width={1100} height={733} loading="lazy" className={s.cardImg} style={{ objectPosition: strategyPos[i] }} />
                  <span className={s.cardShade} aria-hidden="true" />
                  <div className={s.cardBody}>
                    <h3 className={s.cardTitle}>{it.title}</h3>
                    <p>{it.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who it is for */}
        <section className={s.section} id="who">
          <div className={s.container}>
            <h2 className={`${s.h2} ${s.center}`} data-reveal>Who it <span className={s.gold}>is for</span></h2>
            <ul className={s.grid3}>
              {audiences.map((a, i) => (
                <li key={a.title} className={s.panel} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }}>
                  <h3 className={s.panelTitle}>{a.title}</h3>
                  <p>{a.body}</p>
                  <a href={a.href} className={`${s.btn} ${s.btnOutline}`}><span>{a.cta}</span></a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Format */}
        <section className={s.section} id="format">
          <div className={`${s.container} ${s.split}`}>
            <div>
              <h2 className={s.h2} data-reveal>Format</h2>
              <ol className={s.formatList}>
                {format.map((f, i) => (
                  <li key={f.title} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
                    <span className={s.tag}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.splitMedia}>
              <div className={s.card} data-reveal>
                <img src="/photos/fireside-chat.jpg" alt="Two speakers in conversation on stage" width={1100} height={733} loading="lazy" className={s.cardImg} style={{ objectPosition: "45% 50%" }} />
              </div>
              <div className={s.card} data-reveal style={{ ["--d" as string]: "120ms" }}>
                <img src="/photos/speaker-mic-dark.jpg" alt="Panelist speaking into a microphone" width={1100} height={733} loading="lazy" className={s.cardImg} style={{ objectPosition: "35% 50%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Speakers */}
        <section className={s.section} id="speakers">
          <div className={s.container}>
            <h2 className={s.h2} data-reveal>2026 <span className={s.gold}>speakers</span></h2>
            <ul className={s.speakers}>
              {speakers.map((sp, i) => (
                <li key={sp.name} className={`${s.card} ${s.speaker}`} data-reveal style={{ ["--d" as string]: `${(i % 5) * 60}ms` }}>
                  {sp.photo && <img src={sp.photo} alt="" width={700} height={700} loading="lazy" className={s.cardImg} />}
                  <span className={s.cardShade} aria-hidden="true" />
                  <div className={s.speakerBody}>
                    <h3>{sp.name}</h3>
                    <p>{sp.role ? `${sp.role}, ${sp.org}` : sp.org}</p>
                  </div>
                </li>
              ))}
              <li className={`${s.card} ${s.keynote}`} data-reveal>
                <span className={s.rings} aria-hidden="true" />
                <div className={s.keynoteBody}>
                  <p className={s.tag}>{keynote.location}</p>
                  <h3 className={s.cardTitle}>{keynote.name}</h3>
                  <p>{keynote.role}, {keynote.org}. {keynote.bio}</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Recap */}
        <section className={s.section} id="recap">
          <div className={s.container}>
            <h2 className={`${s.h2} ${s.center}`} data-reveal>Austin 2026 <span className={s.gold}>recap</span></h2>
            <RecapVideo src={video.recap.src} poster={video.recap.poster} label={video.recap.label} duration={video.recap.duration} />
          </div>
          <div className={s.strip} aria-hidden="true">
            <div className={s.stripTrack}>
              {[...strip, ...strip].map((p, i) => (
                <img key={i} src={p} alt="" width={1100} height={733} decoding="async" />
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className={s.vision} id="vision">
          <svg className={s.tornTop} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d={torn(23, true)} /></svg>
          <div className={s.polaroids} aria-hidden="true">
            {polaroids.map((p, i) => (
              <span key={p} className={s.polaroid} data-i={i}>
                <img src={p} alt="" width={1100} height={733} loading="lazy" />
              </span>
            ))}
          </div>
          <div className={`${s.container} ${s.visionInner}`}>
            <h2 className={s.h2} data-reveal>{vision.heading}</h2>
            <p className={s.visionBody} data-reveal>{vision.body}</p>
            <p className={s.visionQuote} data-reveal>{vision.quote}</p>
            <div data-reveal><a href={links.register} className={`${s.btn} ${s.btnLg}`}><span>Register</span></a></div>
          </div>
          <svg className={s.torn} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d={torn(41)} /></svg>
        </section>

        {/* Partners */}
        <section className={s.section} id="partners">
          <div className={s.container}>
            <h2 className={`${s.h2} ${s.center}`} data-reveal>Partners</h2>
            <ul className={s.partners} data-reveal>
              {partners.map((p) => (
                <li key={p.name}>
                  <img src={p.logo} alt={p.name} width={200} height={80} loading="lazy" />
                </li>
              ))}
            </ul>
            <ul className={s.partnerNames} data-reveal>
              {partnerNames.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </section>

        {/* Register */}
        <section className={s.sectionTight} id="register">
          <div className={s.container}>
            <div className={s.cta} data-reveal>
              <Wordmark className={s.ctaMark} />
              <h2 className={s.h3}>Register</h2>
              <ul className={s.ctaDates}>
                {upcoming.map((l) => (
                  <li key={l.slug}>
                    <strong>{l.city}</strong>
                    <span>{l.dates}</span>
                    <span>{l.venue}</span>
                  </li>
                ))}
              </ul>
              <div className={s.ctaButtons}>
                <a href={links.register} className={`${s.btn} ${s.btnLg}`}><span>Register</span></a>
                <a href={links.applyToPitch} className={`${s.btn} ${s.btnLg} ${s.btnOutline}`}><span>Apply to pitch</span></a>
                <a href={links.sponsor} className={`${s.btn} ${s.btnLg} ${s.btnOutline}`}><span>Sponsor</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.container} ${s.footerInner}`}>
          <div className={s.footerBrand}>
            <a href="#top" aria-label="Back to top"><Wordmark /></a>
            <p>{footer.legal}</p>
          </div>
          <nav className={s.footerCols} aria-label="Footer">
            <div>
              <h2>Links</h2>
              <ul>{nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
            </div>
            {[...footer.columns].reverse().map((c) => (
              <div key={c.title}>
                <h2>{c.title}</h2>
                <ul>
                  {c.items.map((it) => {
                    const loc = locations.find((l) => l.city === it.label);
                    return (
                      <li key={it.label}>
                        <a href={loc ? `#loc-${loc.slug}` : it.href}>
                          {loc ? `${loc.city}, ${loc.state}` : it.label}
                          {loc?.status === "coming-soon" && " (coming soon)"}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
