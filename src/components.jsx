import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Linkedin, Music2, Mail,
  ExternalLink, Play, MapPin, Sun, Moon,
} from "lucide-react";
import { ease, workflowSteps } from "./theme";

// ─── Motion Helpers ─────────────────────────────────────────────────────────────
export function BlurText({ text, style = {} }) {
  return (
    <motion.span style={style}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.065 } } }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} className="inline-block" style={{ marginRight: "0.26em" }}
          variants={{
            hidden:  { filter: "blur(12px)", opacity: 0, y: 36 },
            visible: { filter: "blur(0px)",  opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
        >{word}</motion.span>
      ))}
    </motion.span>
  );
}

export function Reveal({ children, delay = 0, style = {} }) {
  return (
    <motion.div style={style}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.82, ease, delay }}
    >{children}</motion.div>
  );
}

// Stand-in for a real photo. Pass a `src` once photography is ready — layout and
// sizing won't need to change. Falls back to the placeholder if the file is missing.
export function PlaceholderImage({ t, ratio = "4/5", label, radius = 6, src, style = {}, children }) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: ratio,
      background: t.placeholderBg, overflow: "hidden", borderRadius: radius,
      display: "flex", alignItems: "flex-end", ...style,
    }}>
      {src && (
        <img src={src} alt={label || ""} onError={() => setFailed(true)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", display: failed ? "none" : "block" }} />
      )}
      {showPlaceholder && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, ${t.line} 0px, ${t.line} 1px, transparent 1px, transparent 15px)`,
        }} />
      )}
      {showPlaceholder && label && (
        <span className="font-body" style={{ position: "relative", margin: 16, fontSize: 11,
          letterSpacing: "0.08em", textTransform: "uppercase", color: t.placeholderText }}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

// ─── Dark Mode Toggle ────────────────────────────────────────────────────────────
export function DarkToggle({ dark, setDark, t }) {
  return (
    <motion.button
      onClick={() => setDark(!dark)} whileTap={{ scale: 0.9 }}
      className="font-body panel"
      style={{
        width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, background: t.bgAlt, borderColor: t.line,
        position: "fixed", top: 22, right: 24, zIndex: 200,
      }}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "sun" : "moon"}
          initial={{ rotate: -25, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 25, opacity: 0 }} transition={{ duration: 0.22 }}
          style={{ display: "flex" }}
        >
          {dark ? <Sun size={15} color={t.inkMid} /> : <Moon size={15} color={t.inkMid} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Top Nav (path pages only — landing has no "back to landing" need) ──────────
export function TopNav({ t, dark, setDark }) {
  return (
    <>
      <Link to="/" className="font-heading" style={{
        position: "fixed", top: 22, left: 24, zIndex: 200,
        fontWeight: 800, fontSize: 18, color: t.ink, textDecoration: "none", letterSpacing: "-0.01em",
      }}>Matthew Li</Link>
      <DarkToggle dark={dark} setDark={setDark} t={t} />
    </>
  );
}

// ─── Social Row ───────────────────────────────────────────────────────────────────
const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mattgx.li/" },
  { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/matthew-li733/" },
  { icon: Music2,    label: "TikTok",    href: "https://www.tiktok.com/@mattgx.li" },
  { icon: Mail,      label: "Email",     href: "mailto:matthewgx.li@gmail.com" },
];

export function SocialRow({ t }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
      {socialLinks.map(({ icon: Icon, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="font-body panel"
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px",
            borderRadius: 999, color: t.inkMid, textDecoration: "none",
            fontSize: 14, fontWeight: 500, transition: "color 0.25s",
            background: t.bgAlt, borderColor: t.line }}
          onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
          onMouseLeave={e => (e.currentTarget.style.color = t.inkMid)}
        >
          <Icon size={15} /> {label}
        </a>
      ))}
    </div>
  );
}

// ─── Page Hero (shared shell, per-page eyebrow/tagline/content) ────────────────
export function PageHero({ t, eyebrow, tagline, children }) {
  return (
    <section style={{ paddingTop: 140, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <Reveal>
          <div className="font-body panel" style={{ display: "inline-flex",
            alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 20px", marginBottom: 30,
            background: t.bgAlt, borderColor: t.line }}>
            <span style={{ color: t.inkMid, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {eyebrow}
            </span>
          </div>
        </Reveal>

        <h1 className="font-heading" style={{ fontWeight: 900, color: t.ink,
          fontSize: "clamp(34px,6vw,96px)", lineHeight: 0.95, letterSpacing: "-0.02em",
          textTransform: "uppercase", marginBottom: tagline ? 10 : 8 }}>
          <BlurText text="Matthew Li" />
        </h1>

        {tagline && (
          <Reveal delay={0.06}>
            <p className="font-heading" style={{ fontWeight: 700, color: t.accent,
              fontSize: "clamp(16px,2vw,20px)", letterSpacing: "-0.01em", marginBottom: 40 }}>{tagline}</p>
          </Reveal>
        )}
      </div>

      {children}

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 100px", textAlign: "center" }}>
        <Reveal delay={0.1}>
          <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.7,
            marginBottom: 34 }}>
            5K+ Followers &nbsp;·&nbsp; LinkedIn 4K+ &nbsp;·&nbsp; CS @ University of Florida
          </p>
        </Reveal>
        <Reveal delay={0.16}><SocialRow t={t} /></Reveal>
      </div>
    </section>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────────
function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target - new Date());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target - new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return Math.max(0, remaining);
}

export function Countdown({ t, race, size = "large" }) {
  const ms = useCountdown(race.date);
  const units = [
    ["Days", Math.floor(ms / 86400000)],
    ["Hours", Math.floor((ms % 86400000) / 3600000)],
    ["Min", Math.floor((ms % 3600000) / 60000)],
    ["Sec", Math.floor((ms % 60000) / 1000)],
  ];
  const large = size === "large";
  const cardColor = large ? t.ink : t.accent;
  const cardBg = large ? t.bgAlt : t.accentSoft;

  return (
    <Reveal delay={large ? 0.1 : 0.16}>
      <div className="panel" style={{ borderRadius: large ? 14 : 10, padding: large ? "26px 28px" : "16px 18px",
        background: cardBg, borderColor: large ? t.line : t.accent }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10, marginBottom: large ? 20 : 12 }}>
          <div style={{ textAlign: "left" }}>
            <p className="font-body" style={{ color: large ? t.inkSoft : t.accent, fontSize: large ? 10 : 9,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4, fontWeight: large ? 400 : 700 }}>{race.label}</p>
            <p className="font-heading" style={{ fontWeight: 800, fontSize: large ? 22 : 15, color: t.ink, letterSpacing: "-0.01em" }}>
              {race.name}
            </p>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: large ? 12 : 11, marginTop: 2 }}>{race.type}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="font-body" style={{ color: t.inkMid, fontSize: large ? 13 : 11, display: "flex",
              alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 6 }}>
              <MapPin size={large ? 13 : 11} /> {race.location} &nbsp;·&nbsp; {race.dateLabel}
            </p>
            <a href={race.link} target="_blank" rel="noopener noreferrer" className="font-body"
              style={{ display: "inline-flex", alignItems: "center", gap: 5,
                color: cardColor, fontSize: large ? 12 : 11, textDecoration: "none", transition: "opacity 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Race Info <ExternalLink size={large ? 12 : 11} />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: large ? 10 : 7, flexWrap: "wrap" }}>
          {units.map(([label, val]) => (
            <div key={label} style={{ borderRadius: 8, padding: large ? "12px 16px" : "8px 11px",
              minWidth: large ? 68 : 48, background: t.bg, border: `1px solid ${large ? t.line : t.accent}` }}>
              <div className="font-heading" style={{ fontWeight: 800, fontSize: large ? 24 : 16, color: cardColor,
                fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                {String(val).padStart(2, "0")}
              </div>
              <div className="font-body" style={{ fontSize: large ? 9 : 8, letterSpacing: "0.1em",
                textTransform: "uppercase", color: t.inkSoft, marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
        {large && (
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 12, textAlign: "center", marginTop: 16 }}>
            Training in public until race day.
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function CountdownStack({ t, races }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 36px",
      display: "flex", flexDirection: "column", gap: 14 }}>
      <Countdown t={t} race={races.sprint} size="large" />
      <Countdown t={t} race={races.half} size="small" />
    </div>
  );
}

// ─── Video Carousel ───────────────────────────────────────────────────────────────
export function VideoCarousel({ videos, label, t, dark }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const cur = videos[idx];
  const go = (n) => { setIdx((idx + n + videos.length) % videos.length); setPlaying(false); };

  return (
    <div className="panel" style={{ borderRadius: 10, overflow: "hidden", background: t.bgAlt, borderColor: t.line }}>

      <div style={{ padding: "26px 28px 0" }}>
        <p className="font-body" style={{ color: t.inkSoft, fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
        <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 22, letterSpacing: "-0.01em" }}>
          {cur.title}
        </h3>
      </div>

      <div style={{ position: "relative", aspectRatio: "9/16", margin: "18px 28px 0",
        borderRadius: 6, overflow: "hidden", background: t.bg }}>
        <video ref={videoRef} key={cur.file} className="video-el"
          src={cur.file} loop muted playsInline />
        {!playing && (
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
        {videos.length > 1 && (
          <>
            <div className="font-body panel" style={{ position: "absolute", top: 12, right: 12,
              borderRadius: 999, padding: "5px 13px", fontSize: 11, color: t.inkMid,
              background: t.bg, borderColor: t.line }}>
              {idx + 1} / {videos.length}
            </div>
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: 8 }}>
              {[-1, 1].map((dir, i) => (
                <button key={i} onClick={() => go(dir)}
                  style={{
                    width: 40, height: 40, minWidth: 40, minHeight: 40,
                    borderRadius: "50%",
                    border: `2px solid ${dark ? "white" : "black"}`,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center",
                    background: dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                    transition: "all 0.3s",
                    fontSize: "22px", fontWeight: "bold",
                    color: dark ? "white" : "black",
                    padding: 0, flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {dir === -1 ? "‹" : "›"}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
        margin: "18px 28px 0", background: t.line, borderRadius: 6, overflow: "hidden" }}>
        {[["Views", cur.views],["Impressions", cur.impressions],["Engagement", cur.engagement],["Likes", cur.likes]].map(([sl, val]) => (
          <div key={sl} style={{ padding: "13px 6px", textAlign: "center", background: t.bgAlt }}>
            <p className="font-heading" style={{ fontWeight: 700, color: t.ink,
              fontSize: 17, marginBottom: 2 }}>{val}</p>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 9,
              letterSpacing: "0.12em", textTransform: "uppercase" }}>{sl}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 28px 26px" }}>
        <p className="font-body" style={{ color: t.inkMid, fontSize: 14, lineHeight: 1.7,
          marginBottom: 12 }}>{cur.description}</p>
        {cur.link && (
          <a href={cur.link} target="_blank" rel="noopener noreferrer" className="font-body"
            style={{ display: "inline-flex", alignItems: "center", gap: 7,
              color: t.inkSoft, fontSize: 13, textDecoration: "none", transition: "color 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
            onMouseLeave={e => (e.currentTarget.style.color = t.inkSoft)}
          >
            <ExternalLink size={13} /> View Original Post
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────────
export function Contact({ t }) {
  return (
    <section id="contact" style={{ padding: "100px 24px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Get In Touch</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Let's Work Together
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel" style={{ borderRadius: 10, padding: "44px 40px",
            textAlign: "center", background: t.bgAlt, borderColor: t.line }}>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 12,
              letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              Ready to create something amazing?
            </p>
            <a href="mailto:matthewgx.li@gmail.com" className="font-heading"
              style={{ fontWeight: 800, color: t.ink,
                fontSize: "clamp(20px,4vw,36px)", textDecoration: "none",
                transition: "opacity 0.3s", display: "inline-block", letterSpacing: "-0.01em" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >matthewgx.li@gmail.com</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────────
export function Process({ t }) {
  return (
    <section style={{ padding: "20px 24px 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
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

// ─── Footer (links to the other two paths, not the current one) ────────────────
const ALL_PATHS = [
  { to: "/triathlon", label: "Triathlon Content" },
  { to: "/product", label: "Career & Resume" },
  { to: "/linkedin", label: "General Content" },
];

export function Footer({ t }) {
  const location = useLocation();
  const otherPaths = ALL_PATHS.filter((p) => p.to !== location.pathname);
  const connect = [
    ["Instagram", "https://www.instagram.com/mattgx.li/"],
    ["LinkedIn", "https://www.linkedin.com/in/matthew-li733/"],
    ["TikTok", "https://www.tiktok.com/@mattgx.li"],
    ["Email", "mailto:matthewgx.li@gmail.com"],
  ];

  const col = (title, items) => (
    <div>
      <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: 14 }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(([label, href]) => (
          href.startsWith("http") || href.startsWith("mailto") ? (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer" className="font-body"
              style={{ color: t.footerC, fontSize: 14, textDecoration: "none", transition: "color 0.25s" }}
              onMouseEnter={e => (e.target.style.color = t.ink)}
              onMouseLeave={e => (e.target.style.color = t.footerC)}
            >{label}</a>
          ) : (
            <Link key={label} to={href} className="font-body"
              style={{ color: t.footerC, fontSize: 14, textDecoration: "none", transition: "color 0.25s" }}
              onMouseEnter={e => (e.target.style.color = t.ink)}
              onMouseLeave={e => (e.target.style.color = t.footerC)}
            >{label}</Link>
          )
        ))}
      </div>
    </div>
  );

  return (
    <footer style={{ borderTop: `1px solid ${t.line}`, padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, marginBottom: 44 }}>
          <div>
            <Link to="/" className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 24,
              letterSpacing: "-0.01em", textDecoration: "none" }}>
              Matthew Li
            </Link>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 13, marginTop: 6 }}>
              Keep Failing Forward.
            </p>
          </div>
          {col("Other Paths", otherPaths.map((p) => [p.label, p.to]))}
          {col("Connect", connect)}
        </div>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 24 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 12 }}>
            © 2026 Matthew Li. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  );
}
