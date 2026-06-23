import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const USERS = [
  { email: "elly.oyim@student.com", password: "admin123",  name: "Elly Dickens Oyim", role: "admin"  },
  { email: "peter@farmsphere.com",               password: "farmer123", name: "peter okoth",       role: "farmer" },
  { email: "wesonga@farmsphere.com",               password: "buyer123",  name: "wesonga amanda",       role: "buyer"  },
];

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const found = USERS.find(u => u.email === form.email && u.password === form.password);
    if (!found) { setError("Invalid email or password. Check demo accounts below."); return; }
    onLogin(found);
    navigate(found.role === "admin" ? "/admin" : "/dashboard");
  }

  const inp = { padding: "0.75rem 1rem", border: "1.5px solid #e8e8e8", borderRadius: "8px", fontSize: "0.95rem", width: "100%", outline: "none", fontFamily: "var(--font-body)", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "85vh", display: "flex", background: "#f8f6f1" }}>
      <div className="fade" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "420px", background: "white", borderRadius: "16px", padding: "2.5rem", border: "1px solid #e8e8e8" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "1.75rem" }}>
            <div style={{ width: "28px", height: "28px", background: "#2d6a4f", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>🌿</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#2d6a4f", fontWeight: 700 }}>FarmSphere</span>
          </Link>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#1a2e1a" }}>Welcome Back</h2>
          <p style={{ color: "#6b7f72", fontSize: "0.88rem", margin: "0.3rem 0 1.5rem" }}>Log in to your FarmSphere account.</p>
          {error && <div style={{ background: "#fde8e8", color: "#c0392b", padding: "0.75rem 1rem", borderRadius: "8px", fontSize: "0.88rem", marginBottom: "1rem" }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#3d5046", display: "block", marginBottom: "5px" }}>Email Address</label>
              <input style={inp} type="email" placeholder="james@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#3d5046", display: "block", marginBottom: "5px" }}>Password</label>
              <input style={inp} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onFocus={e => e.target.style.borderColor = "#2d6a4f"} onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#6b7f72" }}>
                <input type="checkbox" style={{ accentColor: "#2d6a4f" }} /> Remember me
              </label>
              <span style={{ fontSize: "0.85rem", color: "#2d6a4f", cursor: "pointer", fontWeight: 500 }}>Forgot Password?</span>
            </div>
            <button type="submit" style={{ width: "100%", padding: "0.85rem", background: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
              onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
              Login
            </button>
          </form>
          <p style={{ textAlign: "center", fontSize: "0.88rem", color: "#6b7f72", marginTop: "1.25rem" }}>
            Don't have an account? <Link to="/register" style={{ color: "#2d6a4f", fontWeight: 500 }}>Sign up</Link>
          </p>
          <div style={{ marginTop: "1.25rem", padding: "1rem", background: "#f0faf3", borderRadius: "10px", fontSize: "0.78rem", color: "#3d5046", lineHeight: 1.8 }}>
            <strong style={{ color: "#1a4229" }}>Demo Accounts:</strong><br />
            🔑 Admin: elly.oyim@student.com / admin123<br />
            🌾 Farmer: peter@farmsphere.com / farmer123<br />
            🛒 Buyer: wesonga@farmsphere.com / buyer123
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", background: "#f0f4f1" }}>
        <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700&q=80" alt="Farm"
          style={{ width: "100%", maxWidth: "500px", height: "440px", objectFit: "cover", borderRadius: "16px" }} />
      </div>
    </div>
  );
}
