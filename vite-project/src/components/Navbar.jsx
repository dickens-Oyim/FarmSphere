import { Link, NavLink } from "react-router-dom";
import { ADMIN_PROFILE } from "../data/farmers";

export default function Navbar({ user, onLogout, cartCount = 0 }) {
  const navItems = [
    ["Home", "/"],
    ["Farmer", "/farmer"],
    ["Admin", "/admin"],
    ["Directory", "/directory"],
    ["Auth", "/role"],
    ["Role", "/role"],
  ];

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "white" : "#5d6675",
    background: isActive ? "#1a6828" : "transparent",
    borderRadius: "999px",
    padding: "0.46rem 0.95rem",
    fontSize: "0.86rem",
    fontWeight: isActive ? 600 : 500,
    transition: "all 0.2s",
  });

  return (
    <header style={{
      height: "74px",
      background: "white",
      borderBottom: "1px solid #e8e8e8",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 clamp(1rem,4vw,2rem)",
      position: "sticky",
      top: 0,
      zIndex: 500,
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", color: "#166224", fontWeight: 800 }}>
        <span style={{
          width: "32px",
          height: "32px",
          borderRadius: "9px",
          background: "#166224",
          color: "white",
          display: "grid",
          placeItems: "center",
          fontSize: "1rem",
        }}>
          🌿
        </span>
        <span style={{ fontSize: "1.2rem" }}>FarmSphere</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        {cartCount > 0 && (
          <Link to="/cart" style={{ color: "#1a4229", fontWeight: 700, fontSize: "0.9rem" }}>
            Cart ({cartCount})
          </Link>
        )}
        <Link to="/login" style={{ color: "#5d6675", fontWeight: 600, fontSize: "0.9rem" }}>
          Login
        </Link>
        <Link to="/register" style={{
          background: "#166224",
          color: "white",
          padding: "0.72rem 1.15rem",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "0.9rem",
        }}>
          Register
        </Link>
        <Link to="/profile" style={{
          color: "#166224",
          border: "1px solid #d8f3dc",
          background: "#f0faf3",
          padding: "0.48rem 0.75rem",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "0.88rem",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <img src={ADMIN_PROFILE.image} alt={ADMIN_PROFILE.name} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "2px solid white" }} />
          My Profile
        </Link>
        {user && (
          <button onClick={onLogout} style={{
            border: "none",
            background: "transparent",
            color: "#c0392b",
            fontWeight: 700,
            fontSize: "0.88rem",
          }}>
            Logout
          </button>
        )}
      </div>
      <nav aria-label="Pages" style={{
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "#172131",
        color: "white",
        borderRadius: "999px",
        padding: "0.45rem",
        boxShadow: "0 14px 34px rgba(23,33,49,0.28)",
        position: "fixed",
        left: "50%",
        bottom: "1rem",
        transform: "translateX(-50%)",
        zIndex: 900,
      }}>
        <span style={{ color: "#aab3c1", fontSize: "0.75rem", padding: "0 0.45rem" }}>Pages:</span>
        {navItems.map(([label, to]) => (
          <NavLink key={`${label}-${to}`} to={to} style={navLinkStyle}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
