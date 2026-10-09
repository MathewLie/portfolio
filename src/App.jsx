import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { THEMES } from "./theme";
import { metaFor } from "./routes";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import LinkedIn from "./pages/LinkedIn";
import NotFound from "./pages/NotFound";

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

  /* Race timeline: the runner slides along the track while the figure bounces */
  .race-runner { transform: translateX(-50%); transition: left 2.6s cubic-bezier(0.22, 1, 0.36, 1); }
  .race-fill { transition: width 2.6s cubic-bezier(0.22, 1, 0.36, 1); }
  .race-track .runner-bob { animation: runner-bob 0.28s ease-in-out infinite; }
  .race-track .speed-line { animation: speed-line 0.56s linear infinite; }
  @keyframes runner-bob { 0%, 100% { transform: translateY(-2.5px); } 50% { transform: translateY(0); } }
  @keyframes speed-line { 0% { opacity: 0; transform: translateX(4px); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateX(-5px); } }
  @media (prefers-reduced-motion: reduce) {
    .race-track .runner-bob, .race-track .speed-line { animation: none; }
    .race-runner, .race-fill { transition: none; }
  }

  /* Nav and footer */
  .site-nav { gap: 18px; }
  .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; }

  /* Homepage grids. Phone layout first, wider layouts below. */
  .stat-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .stat-grid > :first-child { grid-column: 1 / -1; }
  .audience-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .audience-tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .tile-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .tile-grid > :last-child:nth-child(odd) { grid-column: 1 / -1; }
  .reel-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 20px; max-width: 420px; margin: 0 auto; }

  @media (max-width: 400px) {
    .site-nav { gap: 12px; }
  }
  @media (max-width: 640px) {
    .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  }
  @media (min-width: 760px) {
    .audience-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .audience-tiles { grid-template-columns: minmax(0, 1fr); }
    .tile-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .tile-grid > :last-child:nth-child(odd) { grid-column: auto; }
    .reel-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: none; }
  }
  @media (min-width: 900px) {
    .stat-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    .stat-grid > :first-child { grid-column: auto; }
  }
`;

// Keeps the tab title and description right when you move between pages
// without a reload. The prerendered HTML already has the right ones for a fresh load.
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [pathname]);

  // New page, start at the top (skipped on first load and for #anchor links).
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [dark, setDark] = useState(false);
  const t = THEMES[dark ? "dark" : "light"];
  const pageProps = { t, dark, setDark };

  return (
    <motion.div initial={false} animate={{ backgroundColor: t.bg }} transition={{ duration: 0.45 }}
      style={{ minHeight: "100vh", overflowX: "hidden", width: "100vw" }}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <RouteEffects />

      <Routes>
        <Route path="/" element={<Home {...pageProps} />} />
        <Route path="/portfolio" element={<Portfolio {...pageProps} />} />
        <Route path="/linkedin" element={<LinkedIn {...pageProps} />} />
        <Route path="*" element={<NotFound {...pageProps} />} />
      </Routes>
    </motion.div>
  );
}
