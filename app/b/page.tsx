import { audiences, brand, footer, format, links, locations, nav, partnerNames, partners, speakers, strategy, vision } from "@/lib/content";
import Carousel from "./Carousel";
import Header from "./Header";
import { HeroVideo, RecapVideo } from "./Media";
import Reveal from "./Reveal";
import styles from "./page.module.css";

const tileTone: Record<string, string> = { "silicon-valley": styles.toneSage, franklin: styles.toneBlush };
const locationFocus: Record<string, string> = { austin: "62% 50%", "dallas-fort-worth": "30% 50%", birmingham: "8% 50%" };

const rowOne = [
  { src: "/photos/auditorium-wide.jpg", alt: "Auditorium filled with attendees", w: 1100, h: 733 },
  { src: "/photos/two-women-smiling.jpg", alt: "Two attendees smiling", w: 1100, h: 619 },
  { src: "/photos/panel-four-men.jpg", alt: "Four panelists in conversation", w: 1098, h: 620 },
  { src: "/photos/handshake.jpg", alt: "Attendees shaking hands", w: 1100, h: 733 },
  { src: "/photos/banquet-wide.jpg", alt: "Banquet hall with round tables", w: 1098, h: 620 },
  { src: "/photos/speaker-podium.jpg", alt: "Speaker at a podium", w: 1100, h: 760 },
  { src: "/photos/audience-smiling.jpg", alt: "Audience members smiling", w: 1100, h: 733 },
  { src: "/photos/networking-three-men.jpg", alt: "Three attendees talking", w: 1100, h: 733 },
];
const rowTwo = [
  { src: "/photos/lunch-table.jpg", alt: "Attendees at a lunch table", w: 1024, h: 682 },
  { src: "/photos/panel-stage-blue.jpg", alt: "Panel on stage", w: 1100, h: 733 },
  { src: "/photos/group-portrait.jpg", alt: "Group portrait of attendees", w: 1100, h: 733 },
  { src: "/photos/speaker-woman-stage.jpg", alt: "Speaker presenting on stage", w: 1100, h: 620 },
  { src: "/photos/table-conversation.jpg", alt: "Conversation at a table", w: 1100, h: 733 },
  { src: "/photos/auditorium-audience.jpg", alt: "Audience in the auditorium", w: 1100, h: 733 },
  { src: "/photos/networking-lanyards.jpg", alt: "Attendees networking", w: 1100, h: 735 },
  { src: "/photos/finalists-on-stage.jpg", alt: "Pitch finalists on stage", w: 1100, h: 734 },
  { src: "/photos/two-women-laptop.jpg", alt: "Two attendees at a laptop", w: 1059, h: 732 },
];

const strategyPhotos = [
  { src: "/photos/one-on-one-meeting.jpg", alt: "One-on-one meeting at a table", pos: "35% 50%" },
  { src: "/photos/ballroom-wide.jpg", alt: "Ballroom full of attendees", pos: "50% 50%" },
  { src: "/photos/winners-on-stage.jpg", alt: "Pitch winners on stage", pos: "50% 50%" },
];

const audiencePhotos = [
  { src: "/photos/conversation-two-men.jpg", alt: "Two attendees in conversation", pos: "38% 50%" },
  { src: "/photos/speaker-blue-screen.jpg", alt: "Founder presenting in front of a screen", pos: "72% 50%" },
  { src: "/photos/expo-crowd.jpg", alt: "Attendees at partner tables", pos: "45% 50%" },
];

export default function Page() {
  return (
    <>
      <a href="#locations" className={styles.skip}>Skip to content</a>
      <Header />
      <main id="top">
        <section className={styles.hero} aria-label="Venture Forge">
          <HeroVideo />
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>{brand.tagline}</h1>
            <a href={links.register} className={`${styles.btn} ${styles.btnLight}`}>Register</a>
          </div>
        </section>

        <Reveal as="section" className={styles.intro}>
          <p className={styles.introText}>{brand.description}</p>
          <div className={styles.actions}>
            <a href={links.register} className={`${styles.btn} ${styles.btnPrimary}`}>Register</a>
            <a href={links.applyToPitch} className={`${styles.btn} ${styles.btnSecondary}`}>Apply to pitch</a>
          </div>
        </Reveal>

        <section id="locations" className={styles.section}>
          <Reveal>
            <h2 className={styles.title}>Locations</h2>
          </Reveal>
          <Reveal>
            <Carousel label="Locations" trackClassName={styles.locTrack} className={styles.locCarousel}>
              {locations.map((l) => (
                <li key={l.slug} className={styles.loc}>
                  <div className={`${styles.locMedia} ${l.photo ? "" : tileTone[l.slug] ?? styles.toneSage}`}>
                    {l.photo ? (
                      <img src={l.photo} alt={`${l.city}, ${l.state}`} width={880} height={1100} loading="lazy" style={{ objectPosition: locationFocus[l.slug] }} />
                    ) : (
                      <span className={styles.locCenter}>{l.status === "coming-soon" ? "Coming soon" : l.city}</span>
                    )}
                  </div>
                  <h3 className={styles.locCity}>{l.city}</h3>
                  <p className={styles.locState}>{l.state}</p>
                  {l.event && (
                    <p className={styles.locMeta}>
                      {l.event}
                      <br />
                      {l.dates}
                      <br />
                      {l.venue}
                    </p>
                  )}
                </li>
              ))}
            </Carousel>
          </Reveal>
        </section>

        <section className={styles.gallery} aria-label="Photos">
          <Reveal>
            <Carousel label="Event photos, row one" trackClassName={styles.galleryTrack}>
              {rowOne.map((p) => (
                <li key={p.src} className={styles.galleryTile}>
                  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
                </li>
              ))}
            </Carousel>
            <Carousel label="Event photos, row two" trackClassName={styles.galleryTrack} offset={0.5}>
              {rowTwo.map((p) => (
                <li key={p.src} className={styles.galleryTile}>
                  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" />
                </li>
              ))}
            </Carousel>
          </Reveal>
        </section>

        <section id="strategy" className={styles.section}>
          <Reveal>
            <h2 className={styles.title}>Strategy</h2>
          </Reveal>
          <ul className={styles.strategy}>
            {strategy.map((s, i) => (
              <Reveal as="li" key={s.title} className={styles.strategyItem}>
                <div className={styles.strategyMedia}>
                  <img src={strategyPhotos[i].src} alt={strategyPhotos[i].alt} width={1100} height={733} loading="lazy" style={{ objectPosition: strategyPhotos[i].pos }} />
                </div>
                <h3 className={styles.itemTitle}>{s.title}</h3>
                <p className={styles.itemBody}>{s.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.features} aria-label="Who it is for">
          {audiences.map((a, i) => (
            <Reveal key={a.title} className={`${styles.feature} ${i % 2 ? styles.featureFlip : ""}`}>
              <div className={styles.featureText}>
                <h2 className={styles.featureTitle}>{a.title === "Partners" ? "Sponsors" : a.title}</h2>
                <p className={styles.featureBody}>{a.body}</p>
                <a href={a.href} className={`${styles.btn} ${styles.btnPrimary}`}>{a.cta}</a>
              </div>
              <div className={styles.featureMedia}>
                <img src={audiencePhotos[i].src} alt={audiencePhotos[i].alt} width={1100} height={733} loading="lazy" style={{ objectPosition: audiencePhotos[i].pos }} />
              </div>
            </Reveal>
          ))}
        </section>

        <section className={styles.band} aria-labelledby="b-format">
          <div className={styles.bandInner}>
            <Reveal className={styles.bandMedia}>
              <img src="/photos/fireside-chat.jpg" alt="Fireside chat on stage" width={1100} height={733} loading="lazy" style={{ objectPosition: "62% 50%" }} />
            </Reveal>
            <Reveal className={styles.bandText}>
              <h2 id="b-format" className={`${styles.title} ${styles.titleLeft}`}>Format</h2>
              <ol className={styles.formatList}>
                {format.map((f) => (
                  <li key={f.title} className={styles.formatItem}>
                    <h3 className={styles.formatTitle}>{f.title}</h3>
                    <p className={styles.formatBody}>{f.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="speakers" className={styles.section}>
          <Reveal>
            <h2 className={styles.title}>2026 speakers</h2>
          </Reveal>
          <Reveal>
            <Carousel label="2026 speakers" trackClassName={styles.speakerTrack} className={styles.speakerCarousel}>
              {speakers.map((s) => (
                <li key={s.name} className={styles.speaker}>
                  <div className={styles.speakerMedia}>
                    {s.photo && <img src={s.photo} alt={s.name} width={700} height={700} loading="lazy" />}
                  </div>
                  <h3 className={styles.speakerName}>{s.name}</h3>
                  <p className={styles.speakerOrg}>
                    {s.role}
                    <br />
                    {s.org}
                  </p>
                </li>
              ))}
            </Carousel>
          </Reveal>
        </section>

        <Reveal as="section" className={styles.recapSection}>
          <RecapVideo />
        </Reveal>

        <section id="vision" className={styles.vision}>
          <Reveal className={styles.visionInner}>
            <h2 className={styles.title}>{vision.heading}</h2>
            <p className={styles.visionBody}>{vision.body}</p>
            <a href={links.register} className={`${styles.btn} ${styles.btnPrimary}`}>Register</a>
          </Reveal>
        </section>

        <section id="partners" className={styles.section}>
          <Reveal>
            <h2 className={styles.title}>Partners</h2>
          </Reveal>
          <Reveal>
            <ul className={styles.partners}>
              {partners.map((p) => (
                <li key={p.name} className={styles.partner}>
                  <img src={p.logo} alt={p.name} width={200} height={80} loading="lazy" />
                </li>
              ))}
            </ul>
            <ul className={styles.partnerNames}>
              {partnerNames.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          {footer.columns.map((c) => (
            <nav key={c.title} className={styles.footerCol} aria-label={c.title}>
              <h2 className={styles.footerHead}>{c.title}</h2>
              <ul>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href}>{it.label}</a>
                    {it.label === "Franklin" && <span className={styles.footerNote}> Coming soon</span>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav className={styles.footerCol} aria-label="Sections">
            <h2 className={styles.footerHead}>Venture Forge</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.footerCta}>
            <a href={links.register} className={`${styles.btn} ${styles.btnPrimary}`}>Register</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span className={`${styles.wordmark} ${styles.wordmarkSmall}`}>Venture Forge</span>
          <span className={styles.legal}>{footer.legal}</span>
        </div>
      </footer>
    </>
  );
}
