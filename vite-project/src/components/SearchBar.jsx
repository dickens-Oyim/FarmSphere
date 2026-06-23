import { useState } from "react";

export default function SearchBar({ placeholder = "Search...", value, onChange, light }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: light ? "rgba(255,255,255,0.15)" : "white", border: `1.5px solid ${focused ? "#2d6a4f" : light ? "rgba(255,255,255,0.3)" : "#e8e8e8"}`, borderRadius: "40px", padding: "0.65rem 1.25rem", width: "100%", maxWidth: "540px", boxShadow: focused && !light ? "0 0 0 3px rgba(45,106,79,0.1)" : "none", transition: "all 0.2s", backdropFilter: light ? "blur(8px)" : "none" }}>
      <span style={{ fontSize: "0.95rem", color: light ? "rgba(255,255,255,0.7)" : "#6b7f72" }}>🔍</span>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: light ? "white" : "#1a2e1a", width: "100%" }} />
    </div>
  );
}