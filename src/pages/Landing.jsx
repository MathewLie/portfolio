import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, BlurText, DarkToggle, Footer } from "../components";

const PATHS = [
  {
    to: "/triathlon",
    label: "Triathlon",
    desc: "My race calendar, the countdown to what's next, and why I signed up in the first place.",
  },
  {
    to: "/product",
    label: "Product & Career",
    desc: "Product management background, experience, and the projects I've worked on.",
  },
  {
    to: "/linkedin",
    label: "LinkedIn Content",
    desc: "The professional content I create — workflow, results, and what brands have said.",
  },
];

export default function Landing({ t, dark, setDark }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <DarkToggle dark={dark} setDark={setDark} t={t} />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 900, width: "100%", textAlign: "center" }}>
          <Reveal>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
              letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20 }}>
              Content Creator · Product Manager · Triathlete
            </p>
          </Reveal>

          <h1 className="font-heading" style={{ fontWeight: 900, color: t.ink,
            fontSize: "clamp(40px,8vw,120px)", lineHeight: 0.95, letterSpacing: "-0.02em",
            textTransform: "uppercase", marginBottom: 20 }}>
            <BlurText text="Matthew Li" />
          </h1>

          <Reveal delay={0.1}>
            <p className="font-body" style={{ color: t.inkMid, fontSize: 17, lineHeight: 1.6,
              maxWidth: 520, margin: "0 auto 56px" }}>
              Three different reasons you might be here. Pick the one that's yours.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 18 }}>
            {PATHS.map(({ to, label, desc }, i) => (
              <Reveal key={to} delay={0.16 + i * 0.06}>
                <Link to={to} className="panel"
                  style={{ display: "block", height: "100%", borderRadius: 14, padding: "30px 26px",
                    background: t.bgAlt, borderColor: t.line, textDecoration: "none",
                    textAlign: "left", transition: "transform 0.25s ease, border-color 0.25s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = t.ink; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = t.line; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <h2 className="font-heading" style={{ fontWeight: 800, color: t.ink,
                      fontSize: 20, letterSpacing: "-0.01em" }}>{label}</h2>
                    <ArrowUpRight size={18} color={t.inkSoft} />
                  </div>
                  <p className="font-body" style={{ color: t.inkMid, fontSize: 14, lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 13, marginTop: 40 }}>
              Or just say hello — <a href="mailto:matthewgx.li@gmail.com" style={{ color: t.inkMid }}>matthewgx.li@gmail.com</a>
            </p>
          </Reveal>
        </div>
      </div>

      <Footer t={t} />
    </div>
  );
}
