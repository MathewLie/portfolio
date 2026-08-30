import { TopNav, PageHero, PlaceholderImage, Reveal, Contact, Footer } from "../components";

const experience = [
  { role: "Associate Product Manager", company: "C Spire", dates: "June 2025 – Present",
    desc: "Brought a new device to market through a pilot partnership, owning pricing, rep incentives, and the store rollout plan for a live multi-store test. Led customer and stakeholder interviews that shaped the roadmap for new mobile plan offerings." },
  { role: "Product Manager Intern", company: "UpLift", dates: "Sept 2024 – Feb 2025",
    desc: "Authored the PRD for Uplift-U's TAO Connect integration and defined a scheduling flow that cut the customer journey from 9 steps to 4, serving 350,000+ students across 6 universities." },
  { role: "Software Engineer Intern", company: "C Spire", dates: "2023 – 2024 (2 summers)",
    desc: "Built Kafka-based logging and messaging microservices in Java and Scala handling 2.5M+ monthly customer communications, cutting debugging time 60% and API response times 59%." },
];

const projects = [
  { name: "New Device Launch", company: "C Spire",
    desc: "Designed the pricing structure, rep incentive program, and store rollout plan for a pilot device partnership, taking it from concept to a live multi-store test." },
  { name: "Kafka Messaging Platform", company: "C Spire",
    desc: "Built Java and Scala microservices on Apache Kafka to track and reprocess 2.5M+ monthly customer messages, cutting developer debugging time by 60%." },
  { name: "Uplift-U Scheduling Platform", company: "UpLift",
    desc: "Defined the spec for a streamlined appointment system, projecting a 50% cut in manual scheduling time for telehealth services reaching 350,000+ students." },
  { name: "Org Restructure & Workshop Series", company: "Product Space",
    desc: "Restructured the organization end to end and built 7 workshops on product strategy and UX, running 15 events including designathons with industry leaders." },
];

function Education({ t }) {
  return (
    <section style={{ padding: "0 24px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal>
          <div className="panel" style={{ borderRadius: 10, padding: "24px 32px",
            background: t.bgAlt, borderColor: t.line, display: "flex",
            alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <p className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 17, letterSpacing: "-0.01em" }}>
                University of Florida
              </p>
              <p className="font-body" style={{ color: t.inkMid, fontSize: 14, marginTop: 4 }}>
                B.S. Computer Science · Certificates in AI &amp; Project Management · GPA 3.83/4.00
              </p>
            </div>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 12, letterSpacing: "0.05em" }}>May 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
            Download Resume (PDF)
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function WorkPhoto({ t }) {
  return (
    <section>
      <PlaceholderImage t={t} ratio="16/9" radius={0} label="Add a work photo" src="/photos/work">
        <div style={{ position: "relative", padding: "40px 28px", width: "100%",
          background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 65%)" }}>
          <p className="font-heading" style={{ color: "#fafafa", fontWeight: 700,
            fontSize: "clamp(22px,4vw,42px)", lineHeight: 1.28, letterSpacing: "-0.01em" }}>
            Keep Failing Forward.
          </p>
        </div>
      </PlaceholderImage>
    </section>
  );
}

function Projects({ t }) {
  return (
    <section style={{ padding: "0 24px 100px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Work</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Projects
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel" style={{ borderRadius: 10, padding: "8px 0", background: t.bgAlt, borderColor: t.line }}>
            {projects.map((p, i) => (
              <div key={i} style={{ padding: "28px 40px",
                borderBottom: i < projects.length - 1 ? `1px solid ${t.line}` : "none" }}>
                <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{p.company}</p>
                <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 19,
                  letterSpacing: "-0.01em", marginBottom: 8 }}>{p.name}</h3>
                <p className="font-body" style={{ color: t.inkMid, fontSize: 15, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const skillGroups = [
  { label: "Languages", items: ["Java", "C++", "Python", "Scala", "SQL"] },
  { label: "Tools", items: ["Linear", "Trello", "JIRA", "Figma", "Miro", "Kafka", "Oracle", "Git", "Spring", "Pandas", "NumPy", "Grafana", "TensorFlow", "Keras", "PyTorch"] },
];

function Skills({ t }) {
  return (
    <section style={{ padding: "0 24px 100px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal>
          <div className="panel" style={{ borderRadius: 10, padding: "28px 32px",
            background: t.bgAlt, borderColor: t.line, display: "flex", flexDirection: "column", gap: 14 }}>
            {skillGroups.map(({ label, items }) => (
              <div key={label}>
                <span className="font-body" style={{ color: t.inkSoft, fontSize: 11,
                  letterSpacing: "0.14em", textTransform: "uppercase", marginRight: 12 }}>{label}</span>
                <span className="font-body" style={{ color: t.inkMid, fontSize: 14 }}>{items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Reveal>
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
          <p className="font-body" style={{ color: t.inkMid, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
            I started as a software engineer at C Spire, building Kafka pipelines and microservices
            that handled millions of customer messages a month. That's where I learned what's
            actually hard to build and what breaks under real usage.
          </p>
          <p className="font-body" style={{ color: t.inkMid, fontSize: 17, lineHeight: 1.75 }}>
            That background is why I moved into product. I write the PRDs, run the customer
            interviews, and own the roadmap now, but I still know exactly what I'm asking an
            engineering team to do when I hand them a spec. I'm looking for product roles where
            having built the thing first still matters.
          </p>
        </Reveal>
      </PageHero>

      <WorkPhoto t={t} />
      <Education t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Skills t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
