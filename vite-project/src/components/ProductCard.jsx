import { useState } from "react";

export default function ProductCard({ id, name, price, farmer, category, img, onAdd }) {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (onAdd) onAdd({ id, name, price, farmer, category, img });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid #e8e8e8", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.22s" }}>
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img src={img || `https://placehold.co/320x200/d8f3dc/2d6a4f?text=${encodeURIComponent(name)}`} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s" }} />
        <span style={{ position: "absolute", top: "10px", left: "10px", background: "#1a4229", color: "white", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>{category}</span>
        {hov && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,30,15,0.15)", transition: "all 0.2s" }} />
        )}
      </div>
      <div style={{ padding: "1rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#1a2e1a", marginBottom: "3px" }}>{name}</h3>
        <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginBottom: "0.75rem" }}>by {farmer}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, color: "#2d6a4f", fontSize: "1rem" }}>{price}</span>
          <button onClick={handleAdd} style={{ background: added ? "#52b788" : "#2d6a4f", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", transform: added ? "scale(0.95)" : "scale(1)" }}>
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}