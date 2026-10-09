import { ArrowDown, ArrowUpRight, Download, ExternalLink } from "lucide-react";
import { TopNav, BlurText, Reveal, PlaceholderImage, RaceTimeline, Contact, Footer } from "../components";
import { MEDIA_KIT_URL } from "../data/site";
import { instagramStats, audience } from "../data/stats";
import { nextRace, journeyStart, topContent, REELS_PAGE_URL, gear, offers, raceCalendar } from "../data/home";

// Heading pattern from the other pages, without the small eyebrow line on top.
function SectionHeader({ t, title, subtitle }) {
  return (
    <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
      <h2 className="font-heading" style={{ fontWeight: 800,
        fontSize: "clamp(32px,5vw,50px)", color: t.ink, letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="font-body" style={{ color: t.inkSoft, fontSize: 13, marginTop: 10 }}>{subtitle}</p>
      )}
    </Reveal>
  );
}

const section = { padding: "44px 24px" };

const pillBase = {
  display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px",
  borderRadius: 999, textDecoration: "none", fontSize: 14, fontWeight: 600,
};

// ─── 1. Hero ──────────────────────────────────────────────────────────────────────
// Name, tagline, then one card that holds the race, the countdown, and the runner.
function Hero({ t }) {
  return (
    <section style={{ paddingTop: 120, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h1 className="font-heading" style={{ fontWeight: 900, color: t.ink,
          fontSize: "clamp(34px,6vw,96px)", lineHeight: 0.95, letterSpacing: "-0.02em",
          textTransform: "uppercase", marginBottom: 12 }}>
          <BlurText text="Matthew Li" />
        </h1>

        <Reveal delay={0.06}>
          <p className="font-heading" style={{ fontWeight: 700, color: t.accent,
            fontSize: "clamp(16px,2vw,20px)", letterSpacing: "-0.01em", marginBottom: 28 }}>
            From zero to IRONMAN 70.3
          </p>
        </Reveal>

        <Reveal delay={0.12} style={{ marginBottom: 28 }}>
          <RaceTimeline t={t} race={nextRace} journeyStart={journeyStart} />
        </Reveal>

        <Reveal delay={0.18}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#contact" className="font-body"
              style={{ ...pillBase, background: t.invert, color: t.invertText, border: `1px solid ${t.invert}`,
                transition: "opacity 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Work with me <ArrowDown size={15} />
            </a>
            <a href={MEDIA_KIT_URL} download="Matthew-Li-media-kit.pdf" className="font-body panel"
              style={{ ...pillBase, color: t.ink, background: t.bgAlt, borderColor: t.line }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = t.ink)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = t.line)}
            >
              <Download size={15} /> Download media kit
            </a>
          </div>
        </Reveal>
      </div>

      {/* Photo slot: replace public/photos/home-hero.jpg with any photo you like. */}
      <Reveal delay={0.22}>
        <PlaceholderImage t={t} ratio="16/9" radius={0} label="Hero photo" alt="Matthew Li"
          src="/photos/home-hero" priority />
      </Reveal>
    </section>
  );
}

// ─── 2 + 3. Past 30 days performance, with the audience under it ──────────────────
function StatTile({ t, value, label, change }) {
  return (
    <div className="panel" style={{ borderRadius: 10, padding: "22px 14px", textAlign: "center",
      background: t.bgAlt, borderColor: t.line, height: "100%" }}>
      <p className="font-heading" style={{ fontWeight: 800, color: t.ink, letterSpacing: "-0.02em",
        fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </p>
      {change && (
        <p className="font-body" style={{ color: t.accent, fontSize: 13, fontWeight: 700, marginTop: 6 }}>
          {change}
        </p>
      )}
      <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", lineHeight: 1.5, marginTop: 8 }}>{label}</p>
    </div>
  );
}

function Performance({ t }) {
  const s = instagramStats;
  const tiles = [
    { label: "Followers", value: s.followers.value, change: s.followers.change },
    { label: "Views", value: s.views },
    { label: "Accounts reached", value: s.accountsReached },
    { label: "Engagement rate", value: s.engagementRate },
    { label: "Views from non-followers", value: s.nonFollowerViews },
  ];
  return (
    <section style={{ ...section, paddingTop: 56 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader t={t} title="Past 30 days performance" subtitle={s.periodLabel} />
        <div className="stat-grid">
          {tiles.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 0.05} style={{ height: "100%" }}>
              <StatTile t={t} {...tile} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 20,
            letterSpacing: "-0.01em", textAlign: "center", margin: "40px 0 16px" }}>Audience</h3>
        </Reveal>
        <div className="audience-grid">
          <div className="audience-tiles">
            <Reveal style={{ height: "100%" }}><StatTile t={t} value={audience.ageRange.value} label={audience.ageRange.label} /></Reveal>
            <Reveal delay={0.05} style={{ height: "100%" }}><StatTile t={t} value={audience.men.value} label={audience.men.label} /></Reveal>
          </div>

          <Reveal delay={0.1} style={{ height: "100%" }}>
            <div className="panel" style={{ borderRadius: 10, padding: "20px 22px 8px",
              background: t.bgAlt, borderColor: t.line, height: "100%" }}>
              <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 4 }}>Top countries</p>
              <ol style={{ listStyle: "none" }}>
                {audience.topCountries.map((c, i) => (
                  <li key={c.name} className="font-body" style={{ display: "flex", alignItems: "baseline",
                    gap: 14, padding: "11px 0", borderTop: i ? `1px solid ${t.line}` : "none" }}>
                    <span style={{ color: t.inkSoft, fontSize: 13, width: 16 }}>{i + 1}</span>
                    <span style={{ color: t.ink, fontSize: 16, fontWeight: 600, flex: 1 }}>{c.name}</span>
                    {c.share && (
                      <span className="font-heading" style={{ color: t.ink, fontSize: 16, fontWeight: 800,
                        fontVariantNumeric: "tabular-nums" }}>{c.share}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Top content ───────────────────────────────────────────────────────────────
const REEL_STATS = [["Views", "views"], ["Engagement", "engagement"], ["Likes", "likes"], ["Comments", "comments"]];

function TopContent({ t }) {
  return (
    <section style={section}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader t={t} title="Top Reels" />
        <div className="reel-grid">
          {topContent.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.07} style={{ height: "100%" }}>
              <a href={r.url || REELS_PAGE_URL} target="_blank" rel="noopener noreferrer"
                className="panel" style={{ display: "flex", flexDirection: "column", borderRadius: 10,
                  overflow: "hidden", background: t.bgAlt, borderColor: t.line, textDecoration: "none",
                  height: "100%", transition: "transform 0.25s ease, border-color 0.25s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = t.ink; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = t.line; }}
              >
                <PlaceholderImage t={t} ratio="1/1" radius={0} label="Reel thumbnail" alt={r.title}
                  src={r.thumb} lazy />
                <div style={{ padding: "18px 20px 0" }}>
                  <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 18,
                    letterSpacing: "-0.01em", marginBottom: 6 }}>{r.title}</h3>
                  <p className="font-body" style={{ color: t.inkMid, fontSize: 14, lineHeight: 1.6 }}>{r.blurb}</p>
                </div>

                {/* Stat slots. Fill them in src/data/home.js. */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 1,
                  margin: "16px 20px 0", background: t.line, borderRadius: 6, overflow: "hidden" }}>
                  {REEL_STATS.map(([label, key]) => {
                    const value = r.stats?.[key];
                    return (
                      <div key={key} style={{ padding: "10px 2px", textAlign: "center", background: t.bgAlt }}>
                        <p className="font-heading" style={{ fontWeight: 700, fontSize: 15, marginBottom: 2,
                          color: value ? t.ink : t.inkSoft }}>{value || "--"}</p>
                        <p className="font-body" style={{ color: t.inkSoft, fontSize: 8.5,
                          letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</p>
                      </div>
                    );
                  })}
                </div>

                <span className="font-body" style={{ display: "inline-flex", alignItems: "center", gap: 6,
                  color: t.ink, fontSize: 13, fontWeight: 600, padding: "14px 20px 20px", marginTop: "auto" }}>
                  Watch on Instagram <ArrowUpRight size={14} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Gear ──────────────────────────────────────────────────────────────────────
function Tile({ t, children }) {
  return (
    <div className="panel font-heading" style={{ borderRadius: 10, padding: "20px 16px",
      textAlign: "center", fontWeight: 700, fontSize: 16, lineHeight: 1.35, color: t.ink,
      letterSpacing: "-0.01em", background: t.bgAlt, borderColor: t.line,
      height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function Gear({ t }) {
  return (
    <section style={section}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader t={t} title="Gear I actually train with" />
        <div className="tile-grid">
          {gear.map((g, i) => (
            <Reveal key={g} delay={i * 0.04}><Tile t={t}>{g}</Tile></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Work with me ──────────────────────────────────────────────────────────────
function WorkWithMe({ t }) {
  return (
    <section style={section}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader t={t} title="Work with me" />
        <div className="tile-grid" style={{ marginBottom: 28 }}>
          {offers.map((o, i) => (
            <Reveal key={o} delay={i * 0.04}><Tile t={t}>{o}</Tile></Reveal>
          ))}
        </div>
        <Reveal>
          <p className="font-body" style={{ color: t.ink, fontSize: 16, fontWeight: 600, textAlign: "center", marginBottom: 6 }}>
            Rates open to discussion.
          </p>
          <p className="font-body" style={{ color: t.inkMid, fontSize: 16, textAlign: "center" }}>
            All partnerships are clearly disclosed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 7. Race calendar ─────────────────────────────────────────────────────────────
function RaceCalendar({ t }) {
  return (
    <section style={section}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionHeader t={t} title="Race calendar" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {raceCalendar.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <div className="panel" style={{ borderRadius: 10, padding: "20px 22px", background: t.bgAlt,
                borderColor: t.line, display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 12 }}>
                <div style={{ textAlign: "left", flex: "1 1 220px" }}>
                  <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
                    textTransform: "uppercase", marginBottom: 6 }}>{r.when}</p>
                  <h3 className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 19,
                    lineHeight: 1.25, letterSpacing: "-0.01em" }}>{r.name}</h3>
                  {r.place && (
                    <p className="font-body" style={{ color: t.inkMid, fontSize: 14, marginTop: 4 }}>{r.place}</p>
                  )}
                </div>
                {r.status && (
                  <span className="font-body" style={{ color: t.accent, background: t.accentSoft,
                    border: `1px solid ${t.accent}`, borderRadius: 999, padding: "5px 14px",
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {r.status}
                  </span>
                )}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-body"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, color: t.ink,
                      fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity 0.25s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Race info <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home({ t, dark, setDark }) {
  return (
    <div>
      <TopNav t={t} dark={dark} setDark={setDark} />
      <main>
        <Hero t={t} />
        <Performance t={t} />
        <TopContent t={t} />
        <Gear t={t} />
        <WorkWithMe t={t} />
        <RaceCalendar t={t} />
        <Contact t={t} blurb="Brand partnerships, questions, or just saying hi." />
      </main>
      <Footer t={t} />
    </div>
  );
}
