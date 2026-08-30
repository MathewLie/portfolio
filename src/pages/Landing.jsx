import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Coffee, Bike, Footprints, Glasses, Briefcase, FileText, GraduationCap, Camera, Video, MessageSquare } from "lucide-react";
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

// Each sticker pops in and out on its own loop while idle. Rather than a
// handful of shared profiles (which made same-position stickers across
// different cards sync up), every sticker gets its own duration, start
// delay, and pause derived from its global index with non-aligning
// multipliers, so no two ever fall into lockstep.
function getIdleRate(i) {
  return {
    duration: 1.4 + ((i * 0.53) % 1.1),
    delay: (i * 0.71) % 2.4,
    repeatDelay: 0.6 + ((i * 0.37) % 2.1),
  };
}

function Sticker({ Icon, pos, rotate, hovered, rateIdx, t }) {
  const reduceMotion = useReducedMotion();
  const rate = getIdleRate(rateIdx);

  const animate = hovered
    ? { scale: 1, opacity: 1, rotate }
    : reduceMotion
      ? { scale: 0, opacity: 0, rotate: rotate * 0.4 }
      : { scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0], rotate: [rotate * 0.4, rotate, rotate, rotate * 0.4] };

  const transition = hovered
    ? { type: "spring", stiffness: 320, damping: 18 }
    : reduceMotion
      ? { duration: 0.2 }
      : { duration: rate.duration, delay: rate.delay, repeat: Infinity,
          repeatDelay: rate.repeatDelay, ease: "easeInOut", times: [0, 0.3, 0.7, 1] };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: rotate * 0.4 }}
      animate={animate}
      transition={transition}
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
              Choose your own adventure :)
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
                      hovered={hoveredIdx === i} rateIdx={i * 3 + si} t={t} />
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

          <Reveal delay={0.4} style={{ marginTop: 40 }}>
            <a href="https://calendly.com/matthewli73303" target="_blank" rel="noopener noreferrer"
              className="font-body panel"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px",
                borderRadius: 999, color: t.ink, textDecoration: "none", fontSize: 14, fontWeight: 600,
                background: t.bgAlt, borderColor: t.line, transition: "border-color 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = t.ink)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = t.line)}
            >
              <Coffee size={16} /> Schedule a Coffee Chat
            </a>
          </Reveal>
        </div>
      </div>

      <Footer t={t} />
    </div>
  );
}
