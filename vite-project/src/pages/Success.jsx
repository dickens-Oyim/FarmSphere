import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="fade" style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", background: "#f8f6f1" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "white", borderRadius: "16px", padding: "3rem 2rem", border: "1px solid #e8e8e8", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", background: "#e8f5e9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 1.25rem" }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#1a4229", marginBottom: "0.75rem" }}>You're In!</h2>
        <p style={{ color: "#6b7f72", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>Your FarmSphere account has been created successfully. Welcome to Kenya's freshest marketplace.</p>
        <Link to="/login" style={{ display: "block", padding: "0.85rem", background: "#2d6a4f", color: "white", borderRadius: "8px", fontWeight: 600, marginBottom: "0.75rem", transition: "all 0.2s" }}>
          Login to your account
        </Link>
        <Link to="/" style={{ display: "block", padding: "0.75rem", color: "#6b7f72", fontSize: "0.9rem" }}>Back to Home</Link>
      </div>
    </div>
  );
}