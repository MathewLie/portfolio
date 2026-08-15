import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { TopNav, PageHero, CountdownStack, PlaceholderImage, ScrollPhoto, Reveal, Contact, Process, Footer } from "../components";
import { RACES } from "../theme";

function ClosingStatement({ t }) {
  return (
    <section>
      <PlaceholderImage t={t} ratio="21/9" radius={0} label="Finish line — Double Dash, Madison MS"
        src="/photos/closing">
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
  { brand: "[Brand Name]", file: "/videos/brands/brand-1.mp4",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
  { brand: "[Brand Name]", file: "/videos/brands/brand-2.mp4",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
  { brand: "[Brand Name]", file: "/videos/brands/brand-3.mp4",
    desc: "[What the partnership was — the product, the post, and the result if you have one.]" },
];

function BrandVideoCard({ t, brand, file, desc }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="panel" style={{ borderRadius: 10, overflow: "hidden",
      background: t.bgAlt, borderColor: t.line, height: "100%" }}>
      <div style={{ padding: "22px 24px 0" }}>
        <p className="font-body" style={{ color: t.inkSoft, fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Instagram</p>
        <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 18, letterSpacing: "-0.01em" }}>
          {brand}
        </h3>
      </div>

      <div style={{ position: "relative", aspectRatio: "9/16", margin: "16px 24px 0",
        borderRadius: 6, overflow: "hidden", background: t.placeholderBg }}>
        {!failed && (
          <video ref={videoRef} src={file} loop muted playsInline className="video-el"
            onError={() => setFailed(true)} />
        )}
        {failed && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
            <div style={{ position: "absolute", inset: 0,
              backgroundImage: `repeating-linear-gradient(135deg, ${t.line} 0px, ${t.line} 1px, transparent 1px, transparent 15px)` }} />
            <span className="font-body" style={{ position: "relative", margin: 16, fontSize: 11,
              letterSpacing: "0.08em", textTransform: "uppercase", color: t.placeholderText }}>
              Reel or post
            </span>
          </div>
        )}
        {!failed && !playing && (
          <div onClick={() => { videoRef.current?.play(); setPlaying(true); }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", background: "rgba(0,0,0,0.18)", cursor: "pointer" }}>
            <div className="panel" style={{ width: 54, height: 54, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: t.bg, borderColor: t.line }}>
              <Play size={19} color={t.ink} fill={t.ink} style={{ marginLeft: 3 }} />
            </div>
          </div>
        )}
      </div>

      <p className="font-body" style={{ color: t.inkMid, fontSize: 13, lineHeight: 1.65,
        padding: "16px 24px 22px" }}>{desc}</p>
    </div>
  );
}

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
              <BrandVideoCard t={t} brand={d.brand} file={d.file} desc={d.desc} />
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

        <Reveal delay={0.2}>
          <PlaceholderImage t={t} ratio="16/9" radius={0} label="Race day — Double Dash, Madison MS"
            src="/photos/hero">
            <div style={{ position: "relative", padding: "40px 28px", width: "100%",
              background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 65%)" }}>
              <p className="font-heading" style={{ color: "#fafafa", fontWeight: 700,
                fontSize: "clamp(22px,4vw,42px)", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
                I finished my first triathlon last month.<br />Now I'm training for a 70.3.
              </p>
            </div>
          </PlaceholderImage>
        </Reveal>
      </PageHero>

      <ScrollPhoto t={t} src="/photos/bike" label="Road bike" direction="ltr" />
      <BrandDeals t={t} />
      <Process t={t} />
      <ScrollPhoto t={t} src="/photos/swim" label="Open water swim" direction="rtl" />
      <TheStory t={t} />
      <ScrollPhoto t={t} src="/photos/run" label="Run" direction="rtl" />
      <ClosingStatement t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
