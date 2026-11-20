import {
  brand, links, stats, strategy, format, speakers, keynote, partners, partnerNames, vision, video, footer, nav, locations,
} from "@/lib/content";
import Fx from "./Fx";
import Header from "./Header";
import Locations from "./Locations";
import Audiences from "./Audiences";
import Recap from "./Recap";
import s from "./c.module.css";

const [taglineA, taglineB] = brand.tagline.split(". ").map((t, i, a) => (i < a.length - 1 ? `${t}.` : t));
const austin = locations[0];

const strategyPhotos = ["/photos/networking-lanyards.jpg", "/photos/expo-crowd.jpg", "/photos/winners-on-stage.jpg"];
const strip = [
  { src: "/photos/networking-handshake-2.jpg", w: 1030, h: 566, size: 1 },
  { src: "/photos/two-women-smiling.jpg", w: 1100, h: 619, size: 0.62 },
  { src: "/photos/panel-two-men.jpg", w: 1100, h: 733, size: 0.82 },
  { src: "/photos/handshake.jpg", w: 1100, h: 733, size: 0.56 },
  { src: "/photos/auditorium-audience.jpg", w: 1100, h: 733, size: 0.94 },
  { src: "/photos/table-conversation.jpg", w: 1100, h: 733, size: 0.68 },
  { src: "/photos/finalists-on-stage.jpg", w: 1100, h: 734, size: 0.86 },
  { src: "/photos/audience-smiling.jpg", w: 1100, h: 733, size: 0.6 },
  { src: "/photos/speaker-woman-stage.jpg", w: 1100, h: 620, size: 0.78 },
];

function Fill({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={`${s.fill} ${className ?? ""}`} data-fill>
      {words.map((w, i) => (
        <span key={i} style={{ "--w": (i / words.length).toFixed(3) } as React.CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={s.root} data-c-root id="top">
      <Fx />
      <Header />
      <main>
        <section className={s.hero} data-tone="dark" data-hero>
          <div className={s.heroMedia}>
            <video
              src={video.skyline.src}
              poster={video.skyline.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
          <a className={s.heroCard} href={links.register} target="_blank" rel="noreferrer">
            <span className={s.heroCardTop}>{austin.event}</span>
            <span className={s.heroCardCity}>{austin.city}</span>
            <span className={s.heroCardFoot}>
              <span>{austin.dates}<br />{austin.venue}</span>
              <span className={s.arrowCircle}><Arrow /></span>
            </span>
          </a>
          <p className={s.heroCaption}>{brand.short}</p>
          <h1 className={s.heroTitle}>
            <span>{taglineA}</span> <span>{taglineB}</span>
          </h1>
        </section>

        <section className={s.intro} data-tone="blue">
          <div className={s.introText}>
            <Fill text={brand.description} className={s.statement} />
            <a className={`${s.pill} ${s.pillDark}`} href={links.register} target="_blank" rel="noreferrer">Register</a>
          </div>
          <dl className={s.stats}>
            {stats.map((st, i) => (
              <div key={st.label} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <dt>{st.label}</dt>
                <dd>{st.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="locations" className={s.locations} data-tone="light">
          <h2 className={s.giant} data-reveal>Locations</h2>
          <Locations />
        </section>

        <section id="strategy" className={s.section} data-tone="light">
          <div className={s.head}>
            <h2 className={s.h2} data-reveal>Strategy</h2>
          </div>
          <div className={s.cards}>
            {strategy.map((item, i) => (
              <article key={item.title} className={s.card} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <span className={s.cardNum}>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <img src={strategyPhotos[i]} alt="" width={1100} height={733} loading="lazy" />
              </article>
            ))}
          </div>
        </section>

        <section className={s.recap} data-tone="dark" data-enter aria-label={video.recap.label}>
          <Recap />
        </section>

        <section className={s.section} data-tone="light">
          <div className={s.head}>
            <h2 className={s.h2} data-reveal>Format</h2>
          </div>
          <div className={s.formatMedia}>
            <img src="/photos/ballroom-wide.jpg" alt="" width={1100} height={733} loading="lazy" data-reveal />
            <img src="/photos/fireside-chat.jpg" alt="" width={1100} height={733} loading="lazy" data-reveal />
          </div>
          <ol className={s.formatList}>
            {format.map((f, i) => (
              <li key={f.title} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <span>{i + 1}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${s.section} ${s.who}`} data-tone="light">
          <h2 className={`${s.h2} ${s.center}`} data-reveal>Who it is for</h2>
          <Audiences />
        </section>

        <div className={s.strip} data-tone="light" data-p>
          <div className={s.stripTrack}>
            {strip.map((p) => (
              <img
                key={p.src}
                src={p.src}
                alt=""
                width={p.w}
                height={p.h}
                loading="lazy"
                style={{ "--size": p.size, aspectRatio: `${p.w} / ${p.h}` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <section id="speakers" className={s.section} data-tone="light">
          <div className={s.head}>
            <h2 className={s.h2} data-reveal>2026 speakers</h2>
            <a className={s.pill} href={links.register} target="_blank" rel="noreferrer">Register</a>
          </div>
          <div className={s.keynote} data-reveal>
            <p className={s.small}>{keynote.location}</p>
            <div>
              <h3>{keynote.name}</h3>
              <p>{keynote.role}, {keynote.org}</p>
            </div>
            <p>{keynote.bio}</p>
          </div>
          <ul className={s.speakers}>
            {speakers.map((sp, i) => (
              <li key={sp.name} data-reveal style={{ "--d": `${(i % 7) * 50}ms` } as React.CSSProperties}>
                {sp.photo && <img src={sp.photo} alt={sp.name} width={400} height={500} loading="lazy" />}
                <h3>{sp.name}</h3>
                <p>{sp.role}<br />{sp.org}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="partners" className={s.section} data-tone="light">
          <div className={s.head}>
            <h2 className={s.h2} data-reveal>Partners</h2>
            <a className={s.pill} href={links.sponsor} target="_blank" rel="noreferrer">Sponsor</a>
          </div>
          <ul className={s.logos}>
            {partners.map((p) => (
              <li key={p.name} data-reveal>
                <img src={p.logo} alt={p.name} width={160} height={60} loading="lazy" />
              </li>
            ))}
          </ul>
          <ul className={s.names}>
            {partnerNames.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        <section id="vision" className={s.vision} data-tone="blue">
          <h2 className={s.giant} data-reveal>{vision.heading}</h2>
          <div className={s.visionText}>
            <Fill text={vision.body} className={s.statement} />
          </div>
          <figure className={s.visionMedia} data-enter>
            <img src="/photos/auditorium-wide.jpg" alt="" width={1100} height={733} loading="lazy" />
            <figcaption>{vision.quote}</figcaption>
          </figure>
        </section>
      </main>

      <footer className={s.footer} data-tone="blue">
        <div className={s.footTop}>
          <p className={s.footLegal}>{footer.legal}</p>
          <div className={s.footCols}>
            <div>
              <h3>{brand.name}</h3>
              <ul>
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href}>{n.label}</a></li>
                ))}
              </ul>
            </div>
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a href={it.href} {...(it.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{it.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={s.footBottom}>
          <span className={s.footMark}>Venture Forge</span>
          <a className={s.footCta} href={links.register} target="_blank" rel="noreferrer">
            Register <Arrow />
          </a>
        </div>
        <div className={s.stripes} aria-hidden="true">
          <span />
          <span />
        </div>
      </footer>
    </div>
  );
}
