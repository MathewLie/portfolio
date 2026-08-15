import { TopNav, PageHero, VideoCarousel, ScrollPhoto, PlaceholderImage, Reveal, Contact, Process, Footer } from "../components";
import { videoData } from "../theme";

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

function Reviews({ t }) {
  return (
    <section style={{ padding: "0 24px 140px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
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
      <PageHero t={t} eyebrow="Content Creator" tagline="Authentic Voice.">
        <Reveal delay={0.2}>
          <PlaceholderImage t={t} ratio="16/9" radius={0} label="UGC hero — add your LinkedIn photo"
            src="/photos/ugc-hero">
            <div style={{ position: "relative", padding: "40px 28px", width: "100%",
              background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 65%)" }}>
              <p className="font-heading" style={{ color: "#fafafa", fontWeight: 700,
                fontSize: "clamp(22px,4vw,42px)", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
                [Add a line about your content style — what makes your UGC different.]
              </p>
            </div>
          </PlaceholderImage>
        </Reveal>
      </PageHero>
      <Gallery t={t} dark={dark} />
      <ScrollPhoto t={t} src="/photos/content" label="Add a behind-the-scenes photo" direction="ltr" />
      <Process t={t} />
      <Reviews t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
