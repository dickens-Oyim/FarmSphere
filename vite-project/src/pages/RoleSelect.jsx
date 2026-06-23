import { Link } from "react-router-dom";
import { useState } from "react";

export default function RoleSelect() {
  const [hovRole, setHovRole] = useState(null);

  const roles = [
    {
      id: "farmer", emoji: "🏠", emojiDark: "🟢", title: "Join as a Farmer",
      desc: "Sell your fresh produce directly to local buyers. Set your own prices, manage your listings, and grow your farm business.",
      features: ["List unlimited products","Direct payments to your account","Access buyer analytics","Free storefront setup"],
      to: "/register", primary: false, iconBg: "#e8f5e9", iconColor: "#2d6a4f"
    },
    {
      id: "buyer", emoji: "🛒", title: "Join as a Buyer",
      desc: "Discover and purchase fresh farm products from trusted local farmers. Get the freshest produce delivered to your door.",
      features: ["Browse 3,000+ fresh products","Secure checkout & delivery","Rate and review farmers","Schedule recurring orders"],
      to: "/register", primary: true, iconBg: "#c0612a", iconColor: "white"
    },
  ];

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", background: "#f8f6f1" }}>
      <div className="fade" style={{ width: "100%", maxWidth: "720px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "#1a2e1a", marginBottom: "0.5rem" }}>Choose Your Role</h1>
        <p style={{ color: "#6b7f72", marginBottom: "2.5rem" }}>Select how you'd like to use FarmSphere. You can always switch later.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {roles.map(({ id, emoji, title, desc, features, to, primary, iconBg, iconColor }) => {
            const isHov = hovRole === id;
            return (
              <div key={id}
                onMouseEnter={() => setHovRole(id)}
                onMouseLeave={() => setHovRole(null)}
                style={{ background: "white", borderRadius: "16px", padding: "2.25rem", border: `2px solid ${isHov ? (primary ? "#c0612a" : "#2d6a4f") : (primary ? "#c0612a" : "#e8e8e8")}`, textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: isHov ? "0 8px 28px rgba(0,0,0,0.1)" : "none", transform: isHov ? "translateY(-4px)" : "none", transition: "all 0.22s" }}>
                <div style={{ width: "72px", height: "72px", background: iconBg, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto" }}>
                  {emoji}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 600, color: "#1a2e1a" }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#6b7f72", lineHeight: 1.7 }}>{desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
                  {features.map(f => (
                    <li key={f} style={{ fontSize: "0.85rem", color: "#3d5046", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: primary ? "#c0612a" : "#2d6a4f", fontWeight: 600 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to={to} style={{ display: "block", padding: "0.85rem", background: primary ? "#c0612a" : "transparent", color: primary ? "white" : "#2d6a4f", border: primary ? "none" : "1.5px solid #2d6a4f", borderRadius: "8px", fontWeight: 600, marginTop: "auto", transition: "all 0.2s" }}>
                  Get Started →
                </Link>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.88rem", color: "#6b7f72" }}>
          Already have an account? <Link to="/login" style={{ color: "#2d6a4f", fontWeight: 500 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}