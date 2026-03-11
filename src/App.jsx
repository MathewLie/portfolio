import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram, Linkedin, Music2, Mail, ChevronLeft, ChevronRight,
  ExternalLink, Star, ArrowUpRight, Play, Sparkles,
  Zap, Target, Megaphone, Package, Sun, Moon
} from "lucide-react";

// ─── Global Styles ──────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { font-family: 'Barlow', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  .font-heading { font-family: 'Instrument Serif', serif; }
  .font-body    { font-family: 'Barlow', sans-serif; }


  ::-webkit-scrollbar { width: 0; }
  body { scrollbar-width: none; -ms-overflow-style: none; }


  /* Light glass */
  .lg-light {
    background: rgba(255,255,255,0.65);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 2px 20px rgba(100,116,139,0.08), inset 0 1px 1px rgba(255,255,255,0.95);
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .lg-light::before {
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
    background: linear-gradient(180deg,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.35) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.35) 75%,rgba(255,255,255,0.9) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
  }
  .lgs-light {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    box-shadow: 0 8px 40px rgba(100,116,139,0.11), inset 0 1px 0 rgba(255,255,255,1);
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .lgs-light::before {
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1.2px;
    background: linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0.5) 20%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.5) 80%,rgba(255,255,255,1) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
  }

  /* Dark glass */
  .lg-dark {
    background: rgba(255,255,255,0.015);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.2);
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .lg-dark::before {
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
    background: linear-gradient(180deg,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.05) 20%,rgba(255,255,255,0) 50%,rgba(255,255,255,0.05) 80%,rgba(255,255,255,0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
  }
  .lgs-dark {
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(50px); -webkit-backdrop-filter: blur(50px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2);
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .lgs-dark::before {
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1.2px;
    background: linear-gradient(180deg,rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0) 50%,rgba(255,255,255,0.15) 80%,rgba(255,255,255,0.4) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
  }

  .video-el { width:100%; height:100%; object-fit:cover; display:block; }
`;

const ease = [0.16, 1, 0.3, 1];

// ─── Theme Tokens ────────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    bg:          "#f8fafc",
    text:        "#1e293b",
    textMid:     "#475569",
    textSoft:    "#94a3b8",
    label:       "rgba(71,85,105,0.55)",
    labelUp:     "rgba(71,85,105,0.42)",
    glass:       "lg-light",
    glassStrong: "lgs-light",
    divider:     "rgba(203,213,225,0.55)",
    statBg:      "rgba(241,245,249,0.9)",
    statBorder:  "rgba(203,213,225,0.45)",
    orbA:        "59,130,246",
    orbB:        "148,163,184",
    orbO:        0.08,
    btnPrimary:  "#1e293b",
    btnPrimaryC: "white",
    socialC:     "#475569",
    socialCH:    "#1e293b",
    starC:       "rgba(234,179,8,0.9)",
    quoteC:      "#475569",
    footerC:     "#94a3b8",
    playC:       "#1e293b",
    iconC:       "rgba(71,85,105,0.5)",
    ghostNum:    "rgba(203,213,225,0.6)",
  },
  dark: {
    bg:          "#02040A",
    text:        "white",
    textMid:     "rgba(255,255,255,0.55)",
    textSoft:    "rgba(255,255,255,0.22)",
    label:       "rgba(255,255,255,0.32)",
    labelUp:     "rgba(255,255,255,0.28)",
    glass:       "lg-dark",
    glassStrong: "lgs-dark",
    divider:     "rgba(255,255,255,0.06)",
    statBg:      "rgba(2,4,10,0.4)",
    statBorder:  "rgba(255,255,255,0.04)",
    orbA:        "59,130,246",
    orbB:        "96,165,250",
    orbO:        0.07,
    btnPrimary:  "white",
    btnPrimaryC: "#02040A",
    socialC:     "rgba(255,255,255,0.58)",
    socialCH:    "white",
    starC:       "rgba(251,191,36,0.85)",
    quoteC:      "rgba(255,255,255,0.5)",
    footerC:     "rgba(255,255,255,0.22)",
    playC:       "white",
    iconC:       "rgba(255,255,255,0.4)",
    ghostNum:    "rgba(255,255,255,0.06)",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────────
function Orb({ t, color, size = 480, style = {} }) {
  const c = color || t.orbA;
  return (
    <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `rgba(${c},${t.orbO})`, filter: "blur(110px)",
      pointerEvents: "none", zIndex: 0, ...style }} />
  );
}

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
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.82, ease, delay }}
    >{children}</motion.div>
  );
}

// ─── Dark Mode Toggle ────────────────────────────────────────────────────────────
function DarkToggle({ dark, setDark, t }) {
  return (
    <motion.button
      onClick={() => setDark(!dark)} whileTap={{ scale: 0.9 }}
      className={`font-body ${t.glass}`}
      style={{ width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "fixed", top: 22, right: 24, zIndex: 200 }}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={dark ? "sun" : "moon"}
          initial={{ rotate: -25, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 25, opacity: 0 }} transition={{ duration: 0.22 }}
          style={{ display: "flex" }}
        >
          {dark ? <Sun size={17} color="rgba(255,255,255,0.75)" /> : <Moon size={17} color={t.textMid} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────────
function Navbar({ t }) {
  const links = [["About","#about"],["Why Me","#why-me"],["Portfolio","#portfolio"],["Contact","#contact"],["Reviews","#reviews"]];
  return (
    <nav style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "center", padding: "0 90px" }}>
      <div className={t.glass} style={{ borderRadius: 999, padding: "8px 8px",
        display: "flex", alignItems: "center", gap: 2 }}>
        {links.map(([label, href]) => (
          <a key={label} href={href} className="font-body"
            style={{ color: t.label, fontSize: 13, fontWeight: 500, padding: "8px 18px",
              borderRadius: 999, textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.25s" }}
            onMouseEnter={e => (e.target.style.color = t.text)}
            onMouseLeave={e => (e.target.style.color = t.label)}
          >{label}</a>
        ))}
        <a href="mailto:matthewgx.li@gmail.com" className="font-body"
          style={{ marginLeft: 8, background: t.btnPrimary, color: t.btnPrimaryC,
            fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 999,
            textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Work With Me <ArrowUpRight size={12} />
        </a>
      </div>
    </nav>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────────
function About({ t }) {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mattgx.li/" },
    { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/matthew-li733/" },
    { icon: Music2,    label: "TikTok",    href: "https://www.tiktok.com/@mattgx.li" },
    { icon: Mail,      label: "Email",     href: "mailto:matthewgx.li@gmail.com" },
  ];

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "130px 24px 90px", position: "relative", overflow: "hidden" }}>
      <Orb t={t} size={560} style={{ top: 0, left: 0, transform: "translate(-30%,-20%)" }} />
      <Orb t={t} color={t.orbB} size={360} style={{ bottom: 0, right: 0, transform: "translate(20%,20%)" }} />

      <div style={{ maxWidth: 780, textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <Reveal>
          <div className={`font-body ${t.glass}`} style={{ display: "inline-flex",
            alignItems: "center", gap: 8, borderRadius: 999, padding: "8px 20px", marginBottom: 32 }}>
            <Sparkles size={11} color={t.label} />
            <span style={{ color: t.label, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Content Creator · Product Manager
            </span>
          </div>
        </Reveal>

        {/* Name */}
        <h1 className="font-heading" style={{ fontStyle: "italic", color: t.text,
          fontSize: "clamp(56px,9vw,96px)", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 20 }}>
          <BlurText text="Matthew Li" />
        </h1>

        {/* Meta */}
        {/* <Reveal delay={0.2}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 12,
            letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 22, fontWeight: 500 }}>
            5K+ Followers &nbsp;·&nbsp; LinkedIn 4K+ &nbsp;·&nbsp; CS @ University of Florida
          </p>
        </Reveal> */}

        <Reveal delay={0.2}>
          <p className="font-body" style={{ color: t.textMid, fontSize: 18, lineHeight: 1.82,
            maxWidth: 580, margin: "0 auto 44px" }}>
            5K+ Followers &nbsp;·&nbsp; LinkedIn 4K+ &nbsp;·&nbsp; CS @ University of Florida
          </p>
        </Reveal>

        {/* Socials */}
        <Reveal delay={0.42}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`font-body ${t.glass}`}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px",
                  borderRadius: 999, color: t.socialC, textDecoration: "none",
                  fontSize: 14, fontWeight: 500, transition: "color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.color = t.socialCH)}
                onMouseLeave={e => (e.currentTarget.style.color = t.socialC)}
              >
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Polaroid stack — commented out (style mismatch)
        <PolaroidStack />
        */}
      </div>
    </section>
  );
}

// ─── Why Me ───────────────────────────────────────────────────────────────────────
function WhyMe({ t }) {
  /* Trait pills — commented out
  const traits = [
    { icon: "🧠", label: "PM Thinking" }, { icon: "🎯", label: "Audience-First" },
    { icon: "🔥", label: "Authentic Voice" }, { icon: "📊", label: "Data-Driven" },
    { icon: "⚡", label: "Fast Turnaround" }, { icon: "🤝", label: "Brand Aligned" },
  ];
  */

  const paras = [
  "I know what it takes to hold attention — because I've built an audience by being authentic, not performative.",
  "As a CS student moving into product management, I approach content like a product: understand the user, deliver value, drive action. That's why my content performs.",
  "I don't just execute your brief — I think through what your audience actually needs to hear, then say it in a way they'll remember and act on.",
  ];

  return (
    <section id="why-me" style={{ padding: "80px 24px 120px", position: "relative", overflow: "hidden" }}>
      <Orb t={t} color="99,102,241" size={460} style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>The Case</p>
          <h2 className="font-heading" style={{ fontStyle: "italic",
            fontSize: "clamp(36px,5vw,56px)", color: t.text, letterSpacing: "-0.02em" }}>
            Why Me?
          </h2>
        </Reveal>

        <Reveal>
          <div className={t.glassStrong} style={{ borderRadius: 32, padding: "48px 48px 44px", position: "relative" }}>
            {/* Accent top line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
              borderRadius: "32px 32px 0 0",
              background: "linear-gradient(90deg, rgba(59,130,246,0.45), rgba(96,165,250,0.45))" }} />

            {paras.map((text, i) => (
              <p key={i} className="font-body" style={{ color: t.textMid, fontSize: 16,
                lineHeight: 1.92, marginBottom: i < paras.length - 1 ? 20 : 0 }}>{text}</p>
            ))}

            <div style={{ borderTop: `1px solid ${t.divider}`, paddingTop: 28, marginTop: 28 }}>
              <p className="font-heading" style={{ fontStyle: "italic", color: t.text,
                fontSize: 22, lineHeight: 1.55 }}>
                Your brand doesn't need more content. It needs content that earns attention and converts. That's what I build.
              </p>
            </div>
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

function VideoCarousel({ videos, label, t, dark}) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const cur = videos[idx];
  const go = (n) => { setIdx((idx + n + videos.length) % videos.length); setPlaying(false); };

  return (
    <div className={t.glassStrong} style={{ borderRadius: 28, overflow: "hidden" }}>

      <div style={{ padding: "26px 28px 0" }}>
        <p className="font-body" style={{ color: t.labelUp, fontSize: 10,
          letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
        <h3 className="font-heading" style={{ fontStyle: "italic", color: t.text, fontSize: 24 }}>
          {cur.title}
        </h3>
      </div>

      {/* Video */}
      <div style={{ position: "relative", aspectRatio: "9/16", margin: "18px 28px 0",
        borderRadius: 20, overflow: "hidden", background: t.statBg }}>
        <video ref={videoRef} key={cur.file} className="video-el"
          src={cur.file} loop muted playsInline />
        {!playing && (
          <div onClick={() => { videoRef.current?.play(); setPlaying(true); }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", background: "rgba(0,0,0,0.18)", cursor: "pointer" }}>
            <div className={t.glass} style={{ width: 54, height: 54, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Play size={19} color={t.playC} fill={t.playC} style={{ marginLeft: 3 }} />
            </div>
          </div>
        )}
        {videos.length > 1 && (
          <>
            <div className={`font-body ${t.glass}`} style={{ position: "absolute", top: 12, right: 12,
              borderRadius: 999, padding: "5px 13px", fontSize: 11, color: t.textMid }}>
              {idx + 1} / {videos.length}
            </div>
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: 8 }}>
              {[-1, 1].map((dir, i) => (
                <button key={i} onClick={() => go(dir)}
                  style={{ 
                    width: 40,
                    height: 40,
                    minWidth: 40,  // ← ADD THIS to prevent squishing
                    minHeight: 40, // ← ADD THIS
                    borderRadius: "50%", 
                    border: `2px solid ${dark ? "white" : "black"}`,
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "center", 
                    background: dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    fontSize: "24px",  // ← Bigger arrows
                    fontWeight: "bold",
                    color: dark ? "white" : "black",
                    padding: 0,  // ← ADD THIS
                    flexShrink: 0  // ← ADD THIS to prevent squishing
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {dir === -1 ? "‹" : "›"}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
        margin: "18px 28px 0", background: t.statBorder, borderRadius: 14, overflow: "hidden" }}>
        {[["Views", cur.views],["Impressions", cur.impressions],["Engagement", cur.engagement],["Likes", cur.likes]].map(([sl, val]) => (
          <div key={sl} style={{ padding: "13px 6px", textAlign: "center", background: t.statBg }}>
            <p className="font-heading" style={{ fontStyle: "italic", color: t.text,
              fontSize: 18, marginBottom: 2 }}>{val}</p>
            <p className="font-body" style={{ color: t.labelUp, fontSize: 9,
              letterSpacing: "0.14em", textTransform: "uppercase" }}>{sl}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 28px 26px" }}>
        <p className="font-body" style={{ color: t.textMid, fontSize: 14, lineHeight: 1.72,
          marginBottom: 12 }}>{cur.description}</p>
        {cur.link && (
          <a href={cur.link} target="_blank" rel="noopener noreferrer" className="font-body"
            style={{ display: "inline-flex", alignItems: "center", gap: 7,
              color: t.label, fontSize: 13, textDecoration: "none", transition: "color 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.color = t.text)}
            onMouseLeave={e => (e.currentTarget.style.color = t.label)}
          >
            <ExternalLink size={13} /> View Original Post
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────────
function Portfolio({ t, dark }) {
  return (
    <section id="portfolio" style={{ padding: "80px 24px 120px", position: "relative", overflow: "hidden" }}>
      <Orb t={t} size={400} style={{ top: 0, right: 0, transform: "translate(30%,-20%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Work</p>
          <h2 className="font-heading" style={{ fontStyle: "italic",
            fontSize: "clamp(36px,5vw,56px)", color: t.text, letterSpacing: "-0.02em" }}>
            Content Portfolio
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: 28 }}>
          <Reveal delay={0}><VideoCarousel videos={videoData.profdev} label="📱 LinkedIn" t={t} dark={dark} /></Reveal>
          <Reveal delay={0.1}><VideoCarousel videos={videoData.startups} label="🚀 Startups" t={t} dark={dark} /></Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────────
const workflowSteps = [
  { step: "01", title: "Strategy", icon: Target,    desc: "Discussing ideas, expectations, and logistics through email or a phone call." },
  { step: "02", title: "Creating", icon: Zap,       desc: "Scripting and editing the first video draft for your review and approval." },
  { step: "03", title: "Edits",    icon: Megaphone, desc: "Incorporating your feedback and refining until the content is exactly right." },
  { step: "04", title: "Delivery", icon: Package,   desc: "Final polished content delivered within 5–7 business days, ready to publish." },
];

function Contact({ t }) {
  return (
    <section id="contact" style={{ padding: "80px 24px 120px", position: "relative", overflow: "hidden" }}>
      <Orb t={t} color={t.orbB} size={380} style={{ bottom: 0, left: 0, transform: "translate(-30%,20%)" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Get In Touch</p>
          <h2 className="font-heading" style={{ fontStyle: "italic",
            fontSize: "clamp(36px,5vw,56px)", color: t.text, letterSpacing: "-0.02em" }}>
            Let's Work Together
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={t.glassStrong} style={{ borderRadius: 28, padding: "44px 40px",
            textAlign: "center", marginBottom: 48 }}>
            <p className="font-body" style={{ color: t.labelUp, fontSize: 12,
              letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Ready to create something amazing?
            </p>
            <a href="mailto:matthewgx.li@gmail.com" className="font-heading"
              style={{ fontStyle: "italic", color: t.text,
                fontSize: "clamp(22px,4vw,38px)", textDecoration: "none",
                transition: "opacity 0.3s", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >matthewgx.li@gmail.com</a>
          </div>
        </Reveal>

        <Reveal delay={0.12} style={{ textAlign: "center", marginBottom: 36 }}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>Process</p>
          <h3 className="font-heading" style={{ fontStyle: "italic", color: t.text, fontSize: 34 }}>
            My Workflow
          </h3>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 20 }}>
          {workflowSteps.map(({ step, title, icon: Icon, desc }, i) => (
            <Reveal key={step} delay={i * 0.07}>
              <div className={t.glass} style={{ borderRadius: 24, padding: 28,
                transition: "transform 0.3s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12,
                    border: `1px solid ${t.divider}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={t.iconC} />
                  </div>
                  <span className="font-heading" style={{ fontStyle: "italic",
                    color: t.ghostNum, fontSize: 30 }}>{step}</span>
                </div>
                <h4 className="font-heading" style={{ fontStyle: "italic", color: t.text, fontSize: 22, marginBottom: 10 }}>{title}</h4>
                <p className="font-body" style={{ color: t.textMid, fontSize: 14, lineHeight: 1.72 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────────
function Reviews({ t }) {
  return (
    <section id="reviews" style={{ padding: "80px 24px 140px", position: "relative", overflow: "hidden" }}>
      <Orb t={t} size={320} style={{ top: "30%", right: "8%" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Testimonials</p>
          <h2 className="font-heading" style={{ fontStyle: "italic",
            fontSize: "clamp(36px,5vw,56px)", color: t.text, letterSpacing: "-0.02em" }}>
            Client Testimonials
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 24 }}>
          <Reveal>
            <div className={t.glassStrong} style={{ borderRadius: 28, padding: 36,
              transition: "transform 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} color={t.starC} fill={t.starC} />
                ))}
              </div>
              <p className="font-body" style={{ color: t.quoteC, fontSize: 15, lineHeight: 1.82,
                marginBottom: 24, fontStyle: "italic" }}>
                "Matthew is a fantastic creator and very diligent. If it's not great work, he'll make sure it becomes great with effort and dedication."
              </p>
              <p className="font-heading" style={{ fontStyle: "italic", color: t.text, fontSize: 18 }}>— FavorIt</p>
              <p className="font-body" style={{ color: t.labelUp, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>Brand Partner</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{ borderTop: `1px solid ${t.divider}`, padding: "44px 40px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex",
        alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <p className="font-heading" style={{ fontStyle: "italic", color: t.textMid, fontSize: 22 }}>
            Matthew Li
          </p>
          <p className="font-body" style={{ color: t.textSoft, fontSize: 12, marginTop: 4 }}>
            Keep Failing Forward.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Instagram","https://www.instagram.com/mattgx.li/"],["LinkedIn","https://www.linkedin.com/in/matthew-li733/"],["TikTok","https://www.tiktok.com/@mattgx.li"]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="font-body"
              style={{ color: t.footerC, fontSize: 13, textDecoration: "none", transition: "color 0.25s" }}
              onMouseEnter={e => (e.target.style.color = t.text)}
              onMouseLeave={e => (e.target.style.color = t.footerC)}
            >{label}</a>
          ))}
        </div>
        <p className="font-body" style={{ color: t.textSoft, fontSize: 12 }}>
          © 2026 Matthew Li. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Squirtle — commented out ────────────────────────────────────────────────────
// function Squirtle({ t }) { ... }

// ─── App ──────────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const t = THEMES[dark ? "dark" : "light"];

  return (
    <motion.div animate={{ backgroundColor: t.bg }} transition={{ duration: 0.45 }}
      style={{ minHeight: "100vh", overflowX: "hidden", width: "100vw" }}> 
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* Light-mode background mesh */}
      {!dark && (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 18% 40%, rgba(59,130,246,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 82% 70%, rgba(96,165,250,0.06) 0%, transparent 45%),
            radial-gradient(ellipse at 55% 8%,  rgba(59,130,246,0.05) 0%, transparent 40%)
          `
        }} />
      )}

      <DarkToggle dark={dark} setDark={setDark} t={t} />
      <Navbar t={t} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <About    t={t} />
        <WhyMe    t={t} />
        <Portfolio t={t} dark={dark}/>
        <Contact  t={t} />
        <Reviews  t={t} />
      </main>

      <Footer t={t} />

      {/* <Squirtle t={t} /> */}
    </motion.div>
  );
}
