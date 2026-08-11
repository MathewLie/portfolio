import { TopNav, PageHero, CountdownStack, PlaceholderImage, Reveal, Contact, Footer } from "../components";
import { RACES } from "../theme";

function ClosingStatement({ t }) {
  return (
    <section>
      <PlaceholderImage t={t} ratio="21/9" radius={0} label="Finish line — Double Dash, Madison MS"
        src="/photos/closing.jpg">
        <div style={{ position: "relative", padding: "40px 28px", width: "100%",
          background: "linear-gradient(0deg, rgba(0,0,0,0.6), transparent 70%)",
          display: "flex", justifyContent: "center" }}>
          <p className="font-heading" style={{ color: "#fafafa", fontWeight: 800,
            fontSize: "clamp(28px,5vw,56px)", letterSpacing: "-0.02em", textAlign: "center" }}>
            Keep Failing Forward.
          </p>
        </div>
      </PlaceholderImage>
    </section>
  );
}

const brandDeals = [
  { brand: "[Brand Name]", file: "brand-1.jpg",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
  { brand: "[Brand Name]", file: "brand-2.jpg",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
  { brand: "[Brand Name]", file: "brand-3.jpg",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
];

function BrandDeals({ t }) {
  return (
    <section style={{ padding: "20px 24px 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Brand Work</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Partnerships &amp; Ads
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 }}>
          {brandDeals.map((d, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="panel" style={{ borderRadius: 10, overflow: "hidden",
                background: t.bgAlt, borderColor: t.line, height: "100%" }}>
                <div style={{ padding: "22px 24px 0" }}>
                  <p className="font-body" style={{ color: t.inkSoft, fontSize: 10,
                    letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Instagram</p>
                  <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 18, letterSpacing: "-0.01em" }}>
                    {d.brand}
                  </h3>
                </div>
                <PlaceholderImage t={t} ratio="9/16" radius={6} label="Reel or post"
                  src={`/photos/${d.file}`} style={{ margin: "16px 24px 0" }} />
                <p className="font-body" style={{ color: t.inkMid, fontSize: 13, lineHeight: 1.65,
                  padding: "16px 24px 22px" }}>{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheStory({ t }) {
  const reasoningPara = "I go looking for the situations where I might fail, on purpose, because that's where I actually grow. Early mornings, slow splits, and a few moments I wanted to quit got me to the start line, and finishing last didn't change how it felt to cross it. That's the whole point of putting this out there: if I'm willing to go chase the thing that might break me, I want the people watching to go chase theirs too.";

  return (
    <section style={{ padding: "20px 24px 100px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>The Story</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Why I Race
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel" style={{ borderRadius: 10, padding: "44px 44px 40px",
            background: t.bgAlt, borderColor: t.line }}>
            <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.85, marginBottom: 24 }}>
              On August 8, 2026, I lined up in Madison, Mississippi for the Double Dash at Reunion, my first
              triathlon. I signed up a month earlier with zero experience in the sport.
            </p>

            <p className="font-body" style={{ fontWeight: 800, color: t.ink,
              fontSize: 17, lineHeight: 1.5, letterSpacing: "-0.005em",
              borderLeft: `3px solid ${t.ink}`, paddingLeft: 20, margin: "0 0 24px" }}>
              I finished last in my age group. I'm still proud of every second of it.
            </p>

            <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.85 }}>
              {reasoningPara}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Triathlon({ t, dark, setDark }) {
  return (
    <div>
      <TopNav t={t} dark={dark} setDark={setDark} />

      <PageHero t={t} eyebrow="Triathlete" tagline="Shows Up Anyway.">
        <CountdownStack t={t} races={RACES} />

        <Reveal delay={0.2} style={{ maxWidth: 880, margin: "0 auto 0", padding: "0 24px" }}>
          <PlaceholderImage t={t} ratio="16/9" radius={4} label="Race day — Double Dash, Madison MS"
            src="/photos/hero.jpg" style={{ position: "relative" }}>
            <div style={{ position: "relative", padding: "26px 30px", background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 65%)",
              width: "100%" }}>
              <p className="font-heading" style={{ color: "#fafafa", fontWeight: 700,
                fontSize: "clamp(19px,3vw,30px)", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
                I finished my first triathlon last month.<br />Now I'm training for a 70.3.
              </p>
            </div>
          </PlaceholderImage>
        </Reveal>
      </PageHero>

      <BrandDeals t={t} />
      <TheStory t={t} />
      <ClosingStatement t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
