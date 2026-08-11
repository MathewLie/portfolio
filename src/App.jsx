import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { THEMES } from "./theme";
import Landing from "./pages/Landing";
import Triathlon from "./pages/Triathlon";
import Product from "./pages/Product";
import LinkedIn from "./pages/LinkedIn";

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

export default function App() {
  const [dark, setDark] = useState(false);
  const t = THEMES[dark ? "dark" : "light"];
  const pageProps = { t, dark, setDark };

  return (
    <BrowserRouter>
      <motion.div initial={false} animate={{ backgroundColor: t.bg }} transition={{ duration: 0.45 }}
        style={{ minHeight: "100vh", overflowX: "hidden", width: "100vw" }}>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

        <Routes>
          <Route path="/" element={<Landing {...pageProps} />} />
          <Route path="/triathlon" element={<Triathlon {...pageProps} />} />
          <Route path="/product" element={<Product {...pageProps} />} />
          <Route path="/linkedin" element={<LinkedIn {...pageProps} />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}
