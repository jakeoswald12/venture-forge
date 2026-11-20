import Link from "next/link";

const versions = [
  { path: "/a", name: "A", ref: "Founders Club" },
  { path: "/b", name: "B", ref: "Soho House" },
  { path: "/c", name: "C", ref: "Joby Aviation" },
  { path: "/d", name: "D", ref: "Partiful" },
  { path: "/e", name: "E", ref: "Telescope" },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0c0c0c", color: "#f2f0ea", fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif", padding: "clamp(24px, 6vw, 80px)" }}>
      <p style={{ margin: 0, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6 }}>Venture Forge</p>
      <h1 style={{ margin: "12px 0 48px", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em" }}>Website concepts</h1>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid #2a2a2a", maxWidth: 880 }}>
        {versions.map((v) => (
          <li key={v.path} style={{ borderBottom: "1px solid #2a2a2a" }}>
            <Link href={v.path} style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "22px 0", textDecoration: "none" }}>
              <span style={{ fontSize: 28, fontWeight: 500, width: 40 }}>{v.name}</span>
              <span style={{ fontSize: 20, flex: 1 }}>{v.ref} style</span>
              <span aria-hidden style={{ opacity: 0.6 }}>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
