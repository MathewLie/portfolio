import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Linkedin, Music2, Mail,
  ExternalLink, ArrowUpRight, Play, Sparkles, MapPin,
  Zap, Target, Megaphone, Package, Sun, Moon
} from "lucide-react";

// ─── Global Styles ──────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  .font-heading { font-family: 'Inter', sans-serif; }
  .font-body    { font-family: 'Inter', sans-serif; }

  ::-webkit-scrollbar { width: 0; }
  body { scrollbar-width: none; -ms-overflow-style: none; }

  .panel {
    border-width: 1px;
    border-style: solid;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }

  .video-el { width:100%; height:100%; object-fit:cover; display:block; }
`;

const ease = [0.16, 1, 0.3, 1];

// ─── Theme Tokens ────────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    bg:          "#fafafa",
    bgAlt:       "#f0f0ee",
    ink:         "#0a0a0a",
    inkMid:      "#525252",
    inkSoft:     "#a3a3a0",
    line:        "#e2e2df",
    invert:      "#0a0a0a",
    invertText:  "#fafafa",
    placeholderBg:   "#e8e8e5",
    placeholderText: "#8f8f8a",
    quoteC:      "#525252",
    footerC:     "#a3a3a0",
    accent:      "#a3672b",
    accentSoft:  "rgba(163,103,43,0.07)",
  },
  dark: {
    bg:          "#0a0a0a",
    bgAlt:       "#141412",
    ink:         "#fafafa",
    inkMid:      "#a3a3a0",
    inkSoft:     "#5c5c58",
    line:        "#262624",
    invert:      "#fafafa",
    invertText:  "#0a0a0a",
    placeholderBg:   "#1b1b18",
    placeholderText: "#6b6b66",
    quoteC:      "#a3a3a0",
    footerC:     "#5c5c58",
    accent:      "#e0a655",
    accentSoft:  "rgba(224,166,85,0.1)",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────────
function BlurText({ text, style = {} }) {
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

function Reveal({ children, delay = 0, style = {} }) {
  return (
    <motion.div style={style}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.82, ease, delay }}
    >{children}</motion.div>
  );
}

// Stand-in for a real photo. Swap the `src` prop in once photography is ready —
// layout and sizing won't need to change.
function PlaceholderImage({ t, ratio = "4/5", label, radius = 6, src, style = {}, children }) {
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
function DarkToggle({ dark, setDark, t, inline = false }) {
  return (
    <motion.button
      onClick={() => setDark(!dark)} whileTap={{ scale: 0.9 }}
      className="font-body panel"
      style={{
        width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, background: t.bgAlt, borderColor: t.line,
        ...(inline ? {} : { position: "fixed", top: 22, right: 24, zIndex: 200 }),
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

// ─── Navbar ──────────────────────────────────────────────────────────────────────
function Navbar({ t, dark, setDark }) {
  const links = [["About","#about"],["Why Me","#why-me"],["Portfolio","#portfolio"],["Contact","#contact"],["Reviews","#reviews"]];

  return (
    <>
      <nav style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "center", padding: "0 24px" }}>
        <div className="panel" style={{ borderRadius: 999, padding: "8px 8px",
          display: "flex", alignItems: "center", gap: 2, maxWidth: "100%", overflowX: "auto",
          background: t.bg, borderColor: t.line }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} className="font-body"
              style={{ color: t.inkMid, fontSize: 13, fontWeight: 500, padding: "8px 14px",
                borderRadius: 999, textDecoration: "none", letterSpacing: "0.01em", transition: "color 0.25s",
                whiteSpace: "nowrap", flexShrink: 0 }}
              onMouseEnter={e => (e.target.style.color = t.ink)}
              onMouseLeave={e => (e.target.style.color = t.inkMid)}
            >{label}</a>
          ))}
          <a href="mailto:matthewgx.li@gmail.com" className="font-body"
            style={{ marginLeft: 8, background: t.invert, color: t.invertText,
              fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 999,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
              transition: "opacity 0.3s", whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Work With Me <ArrowUpRight size={12} />
          </a>
          <div style={{ marginLeft: 6, flexShrink: 0 }}>
            <DarkToggle dark={dark} setDark={setDark} t={t} inline />
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          nav > div { padding: 6px 6px !important; gap: 1px !important; }
          nav a { font-size: 11px !important; padding: 6px 10px !important; }
          nav a[href^="mailto"] { margin-left: 4px !important; padding: 6px 12px !important; }
          nav a[href^="mailto"] svg { display: none !important; }
        }
        @media (max-width: 480px) {
          nav a span:last-child { display: none; }
          nav a[href^="mailto"]::after { content: "Email"; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mattgx.li/" },
    { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/matthew-li733/" },
    { icon: Music2,    label: "TikTok",    href: "https://www.tiktok.com/@mattgx.li" },
    { icon: Mail,      label: "Email",     href: "mailto:matthewgx.li@gmail.com" },
  ];

  return (
    <section id="about" style={{ paddingTop: 140, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <Reveal>
          <div className="font-body panel" style={{ display: "inline-flex",
            alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 20px", marginBottom: 30,
            background: t.bgAlt, borderColor: t.line }}>
            <Sparkles size={11} color={t.inkMid} />
            <span style={{ color: t.inkMid, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Content Creator · Product Manager · Triathlete
            </span>
          </div>
        </Reveal>

        <h1 className="font-heading" style={{ fontWeight: 900, color: t.ink,
          fontSize: "clamp(34px,6vw,96px)", lineHeight: 0.95, letterSpacing: "-0.02em",
          textTransform: "uppercase", marginBottom: 8 }}>
          <BlurText text="Matthew Li" />
        </h1>
      </div>

      <CountdownStack t={t} />

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

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 100px", textAlign: "center" }}>
        <Reveal delay={0.1}>
          <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.7,
            marginBottom: 34 }}>
            5K+ Followers &nbsp;·&nbsp; LinkedIn 4K+ &nbsp;·&nbsp; CS @ University of Florida
          </p>
        </Reveal>

        <Reveal delay={0.16}>
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
        </Reveal>
      </div>
    </section>
  );
}

// ─── Why Me ───────────────────────────────────────────────────────────────────────
function WhyMe({ t }) {
  const pillars = ["Product Thinking.", "Authentic Voice.", "Shows Up Anyway."];

  const openingParas = [
    "As a Asian American CS student and Product Manager, I approach content like a product: understand the user, deliver value, drive action.",
    "I don't just execute your brief - I think through what your audience actually needs to hear, then say it in a way they'll remember and act on.",
    "I'm building that same track record in endurance sports right now, one race at a time, and I want brand partners in that space along for it.",
  ];

  const reasoningPara = "I go looking for the situations where I might fail, on purpose, because that's where I actually grow. Early mornings, slow splits, and a few moments I wanted to quit got me to the start line, and finishing last didn't change how it felt to cross it. That's the whole point of putting this out there: if I'm willing to go chase the thing that might break me, I want the people watching to go chase theirs too.";

  return (
    <section id="why-me" style={{ padding: "60px 24px 120px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>The Case</p>
          <h2 className="font-heading" style={{ fontWeight: 800,
            fontSize: "clamp(34px,5vw,54px)", color: t.ink, letterSpacing: "-0.02em" }}>
            Why Me?
          </h2>
        </Reveal>

        <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            {pillars.map((p) => (
              <span key={p} className="font-heading" style={{ fontWeight: 700, fontSize: 18,
                color: t.ink, letterSpacing: "-0.01em" }}>{p}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel" style={{ borderRadius: 10, padding: "48px 48px 44px", position: "relative",
            background: t.bgAlt, borderColor: t.line }}>
            {openingParas.map((text, i) => (
              <p key={i} className="font-body" style={{ color: t.inkMid, fontSize: 16,
                lineHeight: 1.85, marginBottom: 20 }}>{text}</p>
            ))}

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

// ─── Video Carousel ───────────────────────────────────────────────────────────────
const videoData = {
  profdev: [
    { file: "videos/profdev/LinkedInZoom.mp4",    title: "Workplace Tips — Zoom Out",
      views: "25K", impressions: "25K", engagement: "1.5%", likes: "323",
      description: "Tips for interns to succeed in their work environment.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7349059863555031045/" },
    { file: "videos/profdev/LinkedinSilence.mov", title: "Workplace Tips — Speaking Out",
      views: "3.5K", impressions: "3.5K", engagement: "2.9%", likes: "72",
      description: "Tips for interns to stand out in their work environment.",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7351241773987360769/" },
  ],
  startups: [
    { file: "videos/startups/FavorIt.mp4", title: "FavorIt Carpool Feature Ad",
      views: "84K", impressions: "84K", engagement: "4.8%", likes: "2.6K",
      description: "First ad for FavorIt app, promoting the carpool feature to college students.",
      link: "https://www.instagram.com/myfavoritapp/" },
  ],
};

function VideoCarousel({ videos, label, t, dark }) {
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

// ─── Gallery ────────────────────────────────────────────────────────────────────────
function Gallery({ t, dark }) {
  return (
    <section id="portfolio" style={{ padding: "60px 24px 120px" }}>
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
          <Reveal delay={0.08}>
            <div className="panel" style={{ borderRadius: 10, overflow: "hidden", background: t.bgAlt, borderColor: t.line, height: "100%" }}>
              <div style={{ padding: "26px 28px 18px" }}>
                <p className="font-body" style={{ color: t.inkSoft, fontSize: 10,
                  letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Race Day</p>
                <h3 className="font-heading" style={{ fontWeight: 700, color: t.ink, fontSize: 22, letterSpacing: "-0.01em" }}>
                  Double Dash, Madison MS
                </h3>
              </div>
              <PlaceholderImage t={t} ratio="4/5" radius={0} label="Race photo" src="/photos/gallery.jpg" />
            </div>
          </Reveal>
          <Reveal delay={0.16}><VideoCarousel videos={videoData.startups} label="Startups" t={t} dark={dark} /></Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────────
const RACES = {
  sprint: {
    label: "Next Up",
    name: "Hub City Hustle Triathlon",
    type: "Sprint Triathlon",
    location: "Sumrall, Mississippi",
    date: new Date("2026-10-18T07:00:00-05:00"),
    dateLabel: "Oct 18, 2026",
    link: "https://www.trisignup.com/Race/MS/Oloh/HubCityHustleTriathlon",
  },
  half: {
    label: "The Long Game",
    name: "IRONMAN 70.3",
    type: "Florida",
    location: "Haines City, Florida",
    date: new Date("2026-12-13T07:00:00-05:00"),
    dateLabel: "Dec 13, 2026",
    link: "https://www.ironman.com/races/im703-florida",
  },
};

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target - new Date());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target - new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return Math.max(0, remaining);
}

function Countdown({ t, race, size = "large" }) {
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

function CountdownStack({ t }) {
  return (
    <div id="countdown" style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 36px",
      display: "flex", flexDirection: "column", gap: 14 }}>
      <Countdown t={t} race={RACES.sprint} size="large" />
      <Countdown t={t} race={RACES.half} size="small" />
    </div>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────────
const workflowSteps = [
  { step: "01", title: "Strategy", icon: Target,    desc: "Discussing ideas, expectations, and logistics through email or a phone call." },
  { step: "02", title: "Creating", icon: Zap,       desc: "Scripting and editing the first video draft for your review and approval." },
  { step: "03", title: "Edits",    icon: Megaphone, desc: "Incorporating your feedback and refining until the content is exactly right." },
  { step: "04", title: "Delivery", icon: Package,   desc: "Final polished content delivered within 5–7 business days, ready to publish." },
];

function Process({ t }) {
  return (
    <section id="process" style={{ padding: "60px 24px 120px" }}>
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

// ─── Closing Statement ─────────────────────────────────────────────────────────────
function ClosingStatement({ t }) {
  return (
    <section style={{ padding: "0" }}>
      <div style={{ position: "relative" }}>
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
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────────
function Contact({ t }) {
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

// ─── Reviews ──────────────────────────────────────────────────────────────────────
function Reviews({ t }) {
  return (
    <section id="reviews" style={{ padding: "60px 24px 140px" }}>
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

// ─── Footer ───────────────────────────────────────────────────────────────────────
function Footer({ t }) {
  const explore = [["Why Me","#why-me"],["Portfolio","#portfolio"],["Process","#process"],["Reviews","#reviews"]];
  const connect = [["Instagram","https://www.instagram.com/mattgx.li/"],["LinkedIn","https://www.linkedin.com/in/matthew-li733/"],["TikTok","https://www.tiktok.com/@mattgx.li"],["Email","mailto:matthewgx.li@gmail.com"]];

  const col = (title, items) => (
    <div>
      <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: 14 }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map(([label, href]) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer" className="font-body"
            style={{ color: t.footerC, fontSize: 14, textDecoration: "none", transition: "color 0.25s" }}
            onMouseEnter={e => (e.target.style.color = t.ink)}
            onMouseLeave={e => (e.target.style.color = t.footerC)}
          >{label}</a>
        ))}
      </div>
    </div>
  );

  return (
    <footer style={{ borderTop: `1px solid ${t.line}`, padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, marginBottom: 44 }}>
          <div>
            <p className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 24, letterSpacing: "-0.01em" }}>
              Matthew Li
            </p>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 13, marginTop: 6 }}>
              Keep Failing Forward.
            </p>
          </div>
          {col("Explore", explore)}
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

// ─── App ──────────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const t = THEMES[dark ? "dark" : "light"];

  return (
    <motion.div initial={false} animate={{ backgroundColor: t.bg }} transition={{ duration: 0.45 }}
      style={{ minHeight: "100vh", overflowX: "hidden", width: "100vw" }}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <Navbar t={t} dark={dark} setDark={setDark} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero        t={t} />
        <WhyMe       t={t} />
        <Gallery     t={t} dark={dark} />
        <Process     t={t} />
        <ClosingStatement t={t} />
        <Contact     t={t} />
        <Reviews     t={t} />
      </main>

      <Footer t={t} />
    </motion.div>
  );
}
