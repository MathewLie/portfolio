import { TopNav, PageHero, VideoCarousel, Reveal, Contact, Footer } from "../components";
import { videoData, workflowSteps } from "../theme";

function Gallery({ t, dark }) {
  return (
    <section style={{ padding: "20px 24px 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Work</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Content Portfolio
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 24 }}>
          <Reveal delay={0}><VideoCarousel videos={videoData.profdev} label="LinkedIn" t={t} dark={dark} /></Reveal>
          <Reveal delay={0.08}><VideoCarousel videos={videoData.startups} label="Startups" t={t} dark={dark} /></Reveal>
        </div>
      </div>
    </section>
  );
}

function Process({ t }) {
  return (
    <section style={{ padding: "20px 24px 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Process</p>
          <h2 className="font-heading" style={{ fontWeight: 800, color: t.ink,
            fontSize: "clamp(34px,5vw,54px)", letterSpacing: "-0.02em" }}>
            My Workflow
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 1,
          background: t.line, borderRadius: 10, overflow: "hidden" }}>
          {workflowSteps.map(({ step, title, icon: Icon, desc }, i) => (
            <Reveal key={step} delay={i * 0.07} style={{ background: t.bgAlt, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="panel" style={{ width: 40, height: 40, borderRadius: 8,
                  borderColor: t.line, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={17} color={t.inkMid} />
                </div>
                <span className="font-heading" style={{ fontWeight: 800,
                  color: t.inkSoft, fontSize: 26 }}>{step}</span>
              </div>
              <h4 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 20, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h4>
              <p className="font-body" style={{ color: t.inkMid, fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews({ t }) {
  return (
    <section style={{ padding: "0 24px 140px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Testimonials</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Client Testimonials
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 24 }}>
          <Reveal>
            <div className="panel" style={{ borderRadius: 10, padding: 36, background: t.bgAlt, borderColor: t.line }}>
              <p className="font-body" style={{ color: t.quoteC, fontSize: 15, lineHeight: 1.8,
                marginBottom: 22 }}>
                "Matthew is a fantastic creator and very diligent. If it's not great work, he'll make sure it becomes great with effort and dedication."
              </p>
              <p className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 17 }}>— FavorIt</p>
              <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
                letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>Brand Partner</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function LinkedIn({ t, dark, setDark }) {
  return (
    <div>
      <TopNav t={t} dark={dark} setDark={setDark} />
      <PageHero t={t} eyebrow="Content Creator" tagline="Authentic Voice." />
      <Gallery t={t} dark={dark} />
      <Process t={t} />
      <Reviews t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
