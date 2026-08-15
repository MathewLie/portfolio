import { TopNav, PageHero, ScrollPhoto, Reveal, Contact, Footer } from "../components";

const experience = [
  { role: "[Job Title]", company: "[Company Name]", dates: "[Start] – [Present]",
    desc: "[One or two lines on scope and impact — what you owned, what shipped, what moved.]" },
  { role: "[Job Title]", company: "[Company Name]", dates: "[Start] – [End]",
    desc: "[One or two lines on scope and impact — what you owned, what shipped, what moved.]" },
];

const projects = [
  { name: "[Project Name]", tag: "[0→1 / Growth / B2C]",
    desc: "[What the project was, your role in it, and the outcome.]" },
  { name: "[Project Name]", tag: "[0→1 / Growth / B2C]",
    desc: "[What the project was, your role in it, and the outcome.]" },
  { name: "[Project Name]", tag: "[0→1 / Growth / B2C]",
    desc: "[What the project was, your role in it, and the outcome.]" },
];

function Experience({ t }) {
  return (
    <section style={{ padding: "20px 24px 100px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Background</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Experience
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel" style={{ borderRadius: 10, padding: "8px 0", background: t.bgAlt, borderColor: t.line }}>
            {experience.map((e, i) => (
              <div key={i} style={{ padding: "28px 40px",
                borderBottom: i < experience.length - 1 ? `1px solid ${t.line}` : "none" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <p className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 19, letterSpacing: "-0.01em" }}>
                    {e.role} <span style={{ color: t.inkMid, fontWeight: 400 }}>· {e.company}</span>
                  </p>
                  <p className="font-body" style={{ color: t.inkSoft, fontSize: 12, letterSpacing: "0.05em" }}>{e.dates}</p>
                </div>
                <p className="font-body" style={{ color: t.inkMid, fontSize: 15, lineHeight: 1.7 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16} style={{ textAlign: "center", marginTop: 28 }}>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-body panel"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: 999, color: t.inkMid, textDecoration: "none", fontSize: 14, fontWeight: 500,
              background: t.bgAlt, borderColor: t.line }}
          >
            Resume (add PDF at /resume.pdf)
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Projects({ t }) {
  return (
    <section style={{ padding: "0 24px 100px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Work</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Projects
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 20 }}>
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="panel" style={{ borderRadius: 10, padding: 28, height: "100%",
                background: t.bgAlt, borderColor: t.line }}>
                <p className="font-body" style={{ color: t.inkSoft, fontSize: 10,
                  letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>{p.tag}</p>
                <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 19,
                  letterSpacing: "-0.01em", marginBottom: 10 }}>{p.name}</h3>
                <p className="font-body" style={{ color: t.inkMid, fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Product({ t, dark, setDark }) {
  return (
    <div>
      <TopNav t={t} dark={dark} setDark={setDark} />

      <PageHero t={t} eyebrow="Product Manager" tagline="Product Thinking.">
        <Reveal delay={0.06} style={{ maxWidth: 620, margin: "0 auto", padding: "0 24px 20px" }}>
          <p className="font-body" style={{ color: t.inkMid, fontSize: 17, lineHeight: 1.75 }}>
            [A few lines on your product management background, the kind of problems you like
            working on, and what you're looking for next — replace this with your real intro.]
          </p>
        </Reveal>
      </PageHero>

      <Experience t={t} />
      <ScrollPhoto t={t} src="/photos/work" label="Add a work photo" direction="ltr" />
      <Projects t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
