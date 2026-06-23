import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#0f2518", color: "rgba(255,255,255,0.65)", marginTop: "5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "3rem clamp(1.5rem,5vw,4rem)", flexWrap: "wrap", gap: "2rem" }}>
        <div style={{ maxWidth: "280px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
            <div style={{ width: "28px", height: "28px", background: "#2d6a4f", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>🌿</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "white" }}>FarmSphere</span>
          </div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.75 }}>Connecting farms to tables across Kenya. Fresh produce, fair prices, direct from the source.</p>
          <p style={{ fontSize: "0.78rem", marginTop: "1rem", color: "rgba(255,255,255,0.3)" }}>© 2026 FarmSphere. Connecting farms to tables across Kenya.</p>
        </div>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[["Platform", [["/","Home"],["/farmer","Farmers"],["/seller","Marketplace"],["/dashboard","Dashboard"]]],
            ["Account",  [["/login","Login"],["/register","Register"],["/profile","Profile"],["/admin","Admin"]]],
            ["Support",  [["#","Privacy"],["#","Terms"],["#","Help Center"],["#","Contact"]]]
          ].map(([title, links]) => (
            <div key={title} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h4 style={{ color: "white", fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>{title}</h4>
              {links.map(([to, label]) => (
                <Link key={label} to={to} style={{ fontSize: "0.88rem", transition: "color 0.15s" }}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1rem clamp(1.5rem,5vw,4rem)", display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
        <span>Built by Elly Dickens Oyim · June 2026</span>
        <span>Privacy · Terms · Support</span>
      </div>
    </footer>
  );
}