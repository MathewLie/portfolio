import { Link } from "react-router-dom";
import { TopNav, Reveal, Footer } from "../components";

export default function NotFound({ t, dark, setDark }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav t={t} dark={dark} setDark={setDark} />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "140px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 520 }}>
          <Reveal>
            <p className="font-body" style={{ color: t.inkSoft, fontSize: 11,
              letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>404</p>
            <h1 className="font-heading" style={{ fontWeight: 800, color: t.ink,
              fontSize: "clamp(34px,5vw,54px)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              That page doesn't exist.
            </h1>
            <p className="font-body" style={{ color: t.inkMid, fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              The link may be old or mistyped. The homepage is a good place to start.
            </p>
            <Link to="/" className="font-body panel"
              style={{ display: "inline-flex", padding: "14px 28px", borderRadius: 999,
                color: t.ink, textDecoration: "none", fontSize: 14, fontWeight: 600,
                background: t.bgAlt, borderColor: t.line }}>
              Back to the homepage
            </Link>
          </Reveal>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
