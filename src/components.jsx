import { Fragment, useState, useRef, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Instagram, Linkedin, Music2, Mail,
  ExternalLink, Play, Sun, Moon,
} from "lucide-react";
import { ease, workflowSteps } from "./theme";
import { EMAIL, CALENDLY_URL, socials, PAGE_LINKS } from "./data/site";
import { normalizePath } from "./routes";

// ─── Motion Helpers ─────────────────────────────────────────────────────────────
// Words are separated by real spaces (not just margins) so the heading reads
// "Matthew Li" to crawlers and screen readers, not "MatthewLi".
export function BlurText({ text, style = {} }) {
  return (
    <motion.span style={style}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.065 } } }}
    >
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <motion.span className="inline-block"
            variants={{
              hidden:  { filter: "blur(12px)", opacity: 0, y: 36 },
              visible: { filter: "blur(0px)",  opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
          >{word}</motion.span>
        </Fragment>
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

// Web-renderable formats only — HEIC isn't included because no browser
// displays it in an <img>, no matter what it's named. Convert those first.
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

function hasExtension(path) {
  return path.split("/").pop().includes(".");
}

// Stand-in for a real photo. Pass `src` as either a full filename
// ("/photos/hero.jpg") or, to accept whichever format ends up in the folder,
// just the base name with no extension ("/photos/hero") — it'll try
// .jpg/.jpeg/.png/.webp in order and use whichever one actually exists.
// Falls back to the striped placeholder if none of them do.
export function PlaceholderImage(props) {
  // Keyed by src so a changed src remounts with fresh state instead of
  // needing an effect to manually reset the fallback progress.
  return <PlaceholderImageForSrc key={props.src} {...props} />;
}

function PlaceholderImageForSrc({ t, ratio = "4/5", label, alt, radius = 6, src, priority = false, lazy = false, style = {}, children }) {
  const candidates = !src ? [] : hasExtension(src) ? [src] : IMAGE_EXTENSIONS.map((ext) => `${src}.${ext}`);
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const currentSrc = candidates[candidateIdx];
  const showPlaceholder = !currentSrc || failed;

  // Takes the index that failed so a second report for the same candidate
  // (the error event plus the ref check below) can't skip one.
  const handleError = (failedIdx) => {
    if (failedIdx < candidates.length - 1) setCandidateIdx((i) => (i === failedIdx ? i + 1 : i));
    else setFailed(true);
  };

  // The page is prerendered, so an image can fail to load before React attaches
  // its onError handler during hydration. Catch that case on mount.
  const checkAlreadyBroken = (img) => {
    if (img && img.complete && img.naturalWidth === 0) handleError(candidateIdx);
  };

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: ratio,
      background: t.placeholderBg, overflow: "hidden", borderRadius: radius,
      display: "flex", alignItems: "flex-end", ...style,
    }}>
      {currentSrc && !failed && (
        <img key={currentSrc} ref={checkAlreadyBroken} src={currentSrc} alt={alt ?? label ?? ""}
          onError={() => handleError(candidateIdx)}
          loading={lazy ? "lazy" : undefined} decoding={priority ? undefined : "async"}
          fetchPriority={priority ? "high" : undefined}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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

// A photo that rides across the screen as its section scrolls through the
// viewport, in either direction — tied directly to scroll position, not a
// timed animation. `direction="rtl"` enters from the right instead of the
// left, useful for alternating rhythm when a page has more than one of these.
export function ScrollPhoto({ t, src, label, ratio = "3/2", direction = "ltr", height = "60vh" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rtl = direction === "rtl";
  const x = useTransform(scrollYProgress, [0, 1], rtl ? ["110vw", "-60vw"] : ["-60vw", "110vw"]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], rtl ? [4, 0, -4] : [-4, 0, 4]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", height, minHeight: 340, overflow: "hidden" }}>
      <motion.div style={{
        position: "absolute", top: "50%", left: 0, y: "-50%",
        x: reduceMotion ? "27vw" : x,
        rotate: reduceMotion ? 0 : rotate,
        opacity: reduceMotion ? 0.6 : opacity,
        width: "clamp(280px, 46vw, 680px)",
      }}>
        <PlaceholderImage t={t} ratio={ratio} radius={10} label={label} src={src} />
      </motion.div>
    </section>
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
      }}
      title={dark ? "Light mode" : "Dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
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

// ─── Top Nav ──────────────────────────────────────────────────────────────────────
// Logo goes home. The links go to the two pages that aren't the homepage. The bar
// is the page background at 80%, so at the top of a page it looks the same as before.
export function TopNav({ t, dark, setDark }) {
  const { pathname } = useLocation();
  const current = normalizePath(pathname);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      padding: "16px 24px", background: `${t.bg}cc`,
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      transition: "background-color 0.45s",
    }}>
      <Link to="/" className="font-heading" style={{
        fontWeight: 800, fontSize: 18, color: t.ink, textDecoration: "none",
        letterSpacing: "-0.01em", whiteSpace: "nowrap",
      }}>Matthew Li</Link>
      <nav aria-label="Pages" className="site-nav" style={{ display: "flex", alignItems: "center" }}>
        {PAGE_LINKS.filter((p) => p.to !== "/").map((p) => (
          <Link key={p.to} to={p.to} className="font-body"
            aria-current={current === p.to ? "page" : undefined}
            style={{ fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap",
              color: current === p.to ? t.ink : t.inkMid, transition: "color 0.25s" }}
            onMouseEnter={e => (e.currentTarget.style.color = t.ink)}
            onMouseLeave={e => (e.currentTarget.style.color = current === p.to ? t.ink : t.inkMid)}
          >{p.navLabel}</Link>
        ))}
        <DarkToggle dark={dark} setDark={setDark} t={t} />
      </nav>
    </header>
  );
}

// ─── Social Row ───────────────────────────────────────────────────────────────────
const socialLinks = [
  { icon: Instagram, label: "Instagram", href: socials.find((s) => s.key === "instagram").url },
  { icon: Linkedin,  label: "LinkedIn",  href: socials.find((s) => s.key === "linkedin").url },
  { icon: Music2,    label: "TikTok",    href: socials.find((s) => s.key === "tiktok").url },
  { icon: Mail,      label: "Email",     href: `mailto:${EMAIL}` },
];

export function SocialRow({ t, only }) {
  const links = only ? socialLinks.filter((s) => only.includes(s.label)) : socialLinks;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
      {links.map(({ icon: Icon, label, href }) => (
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
export function PageHero({ t, eyebrow, tagline, children, showStats = true, socials }) {
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

      <div style={{ maxWidth: 780, margin: "0 auto",
        padding: showStats ? "40px 24px 100px" : "16px 24px 100px", textAlign: "center" }}>
        {showStats && (
          <Reveal delay={0.1}>
            <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.7,
              marginBottom: 34 }}>
              5K+ Followers &nbsp;·&nbsp; LinkedIn 4K+ &nbsp;·&nbsp; CS @ University of Florida
            </p>
          </Reveal>
        )}
        <Reveal delay={0.16}><SocialRow t={t} only={socials} /></Reveal>
      </div>
    </section>
  );
}

// ─── Race Timeline ────────────────────────────────────────────────────────────────
// A clock that ticks once a second. The server (and the first client render, so
// hydration matches) gets null, which the timeline shows as the starting state.
let clockSnapshot = 0;
const readClock = () => clockSnapshot || (clockSnapshot = Math.floor(Date.now() / 1000) * 1000);
const readServerClock = () => null;
function subscribeToClock(onTick) {
  const id = setInterval(() => {
    clockSnapshot = Math.floor(Date.now() / 1000) * 1000;
    onTick();
  }, 1000);
  clockSnapshot = Math.floor(Date.now() / 1000) * 1000;
  return () => clearInterval(id);
}

// A run cycle drawn as five poses. Each limb morphs through its poses, so the
// knees drive up, the back leg kicks, and the arms pump (not a walking swing).
const POSE = {
  legFwd:    "20,29 29,32 29,42",
  legStance: "20,29 18,37 12,45",
  legBack:   "20,29 14,37 6,35",
  legTuck:   "20,29 24,33 15,38",
  armBack:   "27,15 17,19 16,27",
  armMid:    "27,15 25,22 31,22",
  armFwd:    "27,15 32,20 37,14",
};
const CYCLE = {
  legA: [POSE.legFwd, POSE.legStance, POSE.legBack, POSE.legTuck, POSE.legFwd],
  legB: [POSE.legBack, POSE.legTuck, POSE.legFwd, POSE.legStance, POSE.legBack],
  armA: [POSE.armBack, POSE.armMid, POSE.armFwd, POSE.armMid, POSE.armBack],
  armB: [POSE.armFwd, POSE.armMid, POSE.armBack, POSE.armMid, POSE.armFwd],
};

function Runner({ t, running }) {
  const limb = (key, opacity) => (
    <polyline points={CYCLE[key][0]} opacity={opacity}>
      {running && (
        <animate attributeName="points" dur="0.56s" repeatCount="indefinite"
          values={CYCLE[key].join(";")} />
      )}
    </polyline>
  );
  return (
    <svg viewBox="-8 0 52 50" width="45" height="43" fill="none" stroke={t.ink} strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      {running && [20, 26, 32].map((y, i) => (
        <line key={y} className="speed-line" x1="-8" y1={y} x2={-1 - i * 2} y2={y}
          stroke={t.inkSoft} strokeWidth="1.5" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      <g className={running ? "runner-bob" : undefined}>
        {limb("armB", 0.55)}
        {limb("legB", 0.55)}
        <line x1="27" y1="14" x2="20" y2="29" />
        <circle cx="31" cy="8" r="4.5" fill={t.bg} />
        {limb("legA", 1)}
        {limb("armA", 1)}
      </g>
    </svg>
  );
}

function FinishFlag({ t }) {
  const cells = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    cells.push(<rect key={`${r}${c}`} x={5 + c * 5.5} y={2 + r * 6} width="5.5" height="6"
      fill={(r + c) % 2 ? t.bg : t.ink} stroke="none" />);
  }
  return (
    <svg viewBox="0 0 30 42" width="30" height="42" aria-hidden="true" style={{ display: "block" }}>
      <line x1="4" y1="1" x2="4" y2="40" stroke={t.ink} strokeWidth="2" strokeLinecap="round" />
      {cells}
      <rect x="5" y="2" width="22" height="12" fill="none" stroke={t.ink} strokeWidth="1" />
    </svg>
  );
}

// One card for the whole race: name, place, date, the countdown, and a track where
// the runner moves toward the finish flag as race day gets closer. `journeyStart`
// is where the track begins.
export function RaceTimeline({ t, race, journeyStart }) {
  const now = useSyncExternalStore(subscribeToClock, readClock, readServerClock);
  const reduceMotion = useReducedMotion();
  const raceMs = new Date(race.start).getTime();
  const startMs = new Date(journeyStart).getTime();

  const remaining = now === null ? null : Math.max(0, raceMs - now);
  const progress = now === null ? 0 : Math.min(1, Math.max(0, (now - startMs) / (raceMs - startMs)));
  const done = remaining === 0;
  const running = !done && !reduceMotion;

  const units = [
    ["Days", remaining === null ? null : Math.floor(remaining / 86400000)],
    ["Hours", remaining === null ? null : Math.floor((remaining % 86400000) / 3600000)],
    ["Min", remaining === null ? null : Math.floor((remaining % 3600000) / 60000)],
    ["Sec", remaining === null ? null : Math.floor((remaining % 60000) / 1000)],
  ];
  const pct = `${(progress * 100).toFixed(2)}%`;

  return (
    <div className="panel" style={{ borderRadius: 14, padding: "22px 20px 16px", background: t.bgAlt,
      borderColor: t.line, maxWidth: 560, margin: "0 auto" }}>
      <p className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 18,
        letterSpacing: "-0.01em" }}>{race.title}</p>
      <p className="font-body" style={{ color: t.inkMid, fontSize: 13, marginTop: 2, marginBottom: 18 }}>
        {race.place} &nbsp;·&nbsp; {race.date}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, marginBottom: 20 }}>
        {units.map(([label, val]) => (
          <div key={label} style={{ borderRadius: 8, padding: "11px 4px", background: t.bg,
            border: `1px solid ${t.line}` }}>
            <div className="font-heading" style={{ fontWeight: 800, fontSize: 24, color: t.ink,
              fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
              {val === null ? "--" : String(val).padStart(2, "0")}
            </div>
            <div className="font-body" style={{ fontSize: 9, letterSpacing: "0.1em",
              textTransform: "uppercase", color: t.inkSoft, marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Track: the runner starts at the left and reaches the flag on race day. */}
      <div className={`race-track${running ? "" : " is-still"}`}
        style={{ position: "relative", height: 62, marginLeft: 14 }}>
        <div style={{ position: "absolute", left: 0, right: 34, top: 0, bottom: 0 }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, height: 2, background: t.line }} />
          <div className="race-fill" style={{ position: "absolute", left: 0, bottom: 8, height: 2,
            width: pct, background: t.accent }} />
          <div className="race-runner" style={{ position: "absolute", bottom: 7, left: pct }}>
            <Runner t={t} running={running} />
          </div>
        </div>
        <div style={{ position: "absolute", right: 0, bottom: 8 }}><FinishFlag t={t} /></div>
      </div>

      <div className="font-body" style={{ display: "flex", justifyContent: "space-between",
        color: t.inkSoft, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>
        <span>Start</span>
        <span>{done ? "Race day" : "Finish"}</span>
      </div>
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
export function Contact({ t, blurb = "Ready to create something amazing?", coffeeChat = false }) {
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
              {blurb}
            </p>
            <a href={`mailto:${EMAIL}`} className="font-heading"
              style={{ fontWeight: 800, color: t.ink,
                fontSize: "clamp(20px,4vw,36px)", textDecoration: "none",
                transition: "opacity 0.3s", display: "inline-block", letterSpacing: "-0.01em",
                overflowWrap: "anywhere" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >{EMAIL}</a>
            {coffeeChat && (
              <div style={{ marginTop: 28 }}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="font-body panel"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px",
                    borderRadius: 999, color: t.ink, textDecoration: "none", fontSize: 14, fontWeight: 600,
                    background: t.bg, borderColor: t.line, transition: "border-color 0.25s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = t.ink)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = t.line)}
                >Schedule a coffee chat</a>
              </div>
            )}
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

// ─── Footer ───────────────────────────────────────────────────────────────────────
// "More pages" lists the pages other than the one you're on. "Connect" lists the
// social accounts, Instagram first and TikTok last.
const footerLinkStyle = (t) => ({
  display: "flex", flexWrap: "wrap", columnGap: 8, color: t.footerC, fontSize: 14,
  textDecoration: "none", padding: "3px 0", transition: "color 0.25s",
});

function FooterLink({ t, label, handle, href, to }) {
  const style = footerLinkStyle(t);
  const hover = (e) => (e.currentTarget.style.color = t.ink);
  const unhover = (e) => (e.currentTarget.style.color = t.footerC);
  const text = (
    <>
      <span>{label}</span>
      {handle && <span style={{ opacity: 0.75 }}>{handle}</span>}
    </>
  );
  if (to) {
    return <Link to={to} className="font-body" style={style} onMouseEnter={hover} onMouseLeave={unhover}>{text}</Link>;
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-body"
        style={style} onMouseEnter={hover} onMouseLeave={unhover}>{text}</a>
    );
  }
  // No link yet (YouTube before launch): plain text.
  return <span className="font-body" style={style}>{label} (launching soon)</span>;
}

export function Footer({ t }) {
  const { pathname } = useLocation();
  const current = normalizePath(pathname);
  const otherPages = PAGE_LINKS.filter((p) => p.to !== current);

  const col = (title, children) => (
    <div>
      <p className="font-body" style={{ color: t.inkSoft, fontSize: 11, letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: 12 }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>
    </div>
  );

  return (
    <footer style={{ borderTop: `1px solid ${t.line}`, padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid" style={{ marginBottom: 44 }}>
          <div>
            <Link to="/" className="font-heading" style={{ fontWeight: 800, color: t.ink, fontSize: 24,
              letterSpacing: "-0.01em", textDecoration: "none" }}>
              Matthew Li
            </Link>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 13, marginTop: 6 }}>
              Keep Failing Forward.
            </p>
          </div>
          {col("More pages", otherPages.map((p) => (
            <FooterLink key={p.to} t={t} label={p.label} to={p.to} />
          )))}
          {col("Connect", socials.map((s) => (
            <FooterLink key={s.key} t={t} label={s.label} handle={s.handle} href={s.url} />
          )))}
        </div>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 24 }}>
          <p className="font-body" style={{ color: t.inkSoft, fontSize: 12 }}>
            © 2026 Matthew Li. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
