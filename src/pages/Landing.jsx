import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Bike, Footprints, Glasses, Briefcase, FileText, GraduationCap, Camera, Video, MessageSquare } from "lucide-react";
import { Reveal, BlurText, DarkToggle, Footer } from "../components";

const PATHS = [
  {
    to: "/triathlon",
    label: "Triathlon Content",
    desc: "My race calendar, the countdown to what's next, and why I signed up in the first place.",
    stickers: [
      { Icon: Bike, pos: { top: -20, left: -18 }, rotate: -14 },
      { Icon: Footprints, pos: { top: -22, right: -16 }, rotate: 12 },
      { Icon: Glasses, pos: { bottom: -18, left: 24 }, rotate: -8 },
    ],
  },
  {
    to: "/product",
    label: "Career & Resume",
    desc: "Product management background, experience, and the projects I've worked on.",
    stickers: [
      { Icon: Briefcase, pos: { top: -20, left: -16 }, rotate: -10 },
      { Icon: FileText, pos: { top: -22, right: -18 }, rotate: 10 },
      { Icon: GraduationCap, pos: { bottom: -18, right: 20 }, rotate: 8 },
    ],
  },
  {
    to: "/linkedin",
    label: "General Content",
    desc: "The professional content I create — workflow, results, and what brands have said.",
    stickers: [
      { Icon: Camera, pos: { top: -20, left: -18 }, rotate: -12 },
      { Icon: Video, pos: { top: -22, right: -16 }, rotate: 11 },
      { Icon: MessageSquare, pos: { bottom: -18, left: 24 }, rotate: -6 },
    ],
  },
];

function Sticker({ Icon, pos, rotate, hovered, delay, t }) {
  return (
    <motion.div
      initial={false}
      animate={hovered
        ? { scale: 1, opacity: 1, rotate }
        : { scale: 0, opacity: 0, rotate: rotate * 0.4 }}
      transition={{ type: "spring", stiffness: 320, damping: 18, delay: hovered ? delay : 0 }}
      style={{
        position: "absolute", zIndex: -1, ...pos,
        width: 52, height: 52, borderRadius: "50%",
        background: t.bg, border: `1px solid ${t.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
        pointerEvents: "none",
      }}
    >
      <Icon size={22} color={t.ink} strokeWidth={1.75} />
    </motion.div>
  );
}

export default function Landing({ t, dark, setDark }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
            {PATHS.map(({ to, label, desc, stickers }, i) => (
              <Reveal key={to} delay={0.16 + i * 0.06}>
                <Link to={to} className="panel"
                  style={{ position: "relative", zIndex: 0, display: "block", height: "100%",
                    borderRadius: 14, padding: "30px 26px",
                    background: t.bgAlt, borderColor: t.line, textDecoration: "none",
                    textAlign: "left", transition: "transform 0.25s ease, border-color 0.25s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = t.ink; setHoveredIdx(i); }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = t.line; setHoveredIdx(null); }}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                >
                  {stickers.map((s, si) => (
                    <Sticker key={si} Icon={s.Icon} pos={s.pos} rotate={s.rotate}
                      hovered={hoveredIdx === i} delay={si * 0.05} t={t} />
                  ))}

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
