import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { KENYAN_FARMERS } from "../data/farmers";

const FILTERS = ["All", "Fruits", "Vegetables", "Dairy", "Poultry", "Grains", "Herbs"];

export default function Farmer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [hovId, setHovId] = useState(null);

  const categoryParam = searchParams.get("category") || "All";

  function setCategory(cat) {
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  }

  const filtered = KENYAN_FARMERS.filter(f => {
    const matchesCat = categoryParam === "All" || f.category === categoryParam;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.specialty.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ background: "#2d6a4f", padding: "3rem clamp(1.5rem,6vw,5rem)", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Find Local Farmers</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>Discover trusted farmers near you and buy directly from the source.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SearchBar placeholder="Search farmers by name, location, or specialty..." value={search} onChange={e => setSearch(e.target.value)} light />
        </div>
      </div>

      <div style={{ padding: "2rem clamp(1.5rem,6vw,5rem)" }}>
        {/* Filter chips */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1rem", color: "#6b7f72" }}>🔽</span>
            {FILTERS.map(f => {
              const isActive = categoryParam === f;
              return (
                <button key={f} onClick={() => setCategory(f)} style={{
                  padding: "0.45rem 1.1rem", borderRadius: "20px", fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 400,
                  border: `1.5px solid ${isActive ? "#2d6a4f" : "#e8e8e8"}`,
                  background: isActive ? "#2d6a4f" : "white",
                  color: isActive ? "white" : "#3d4f3d",
                  cursor: "pointer", transition: "all 0.18s"
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "#2d6a4f"; e.currentTarget.style.color = "#2d6a4f"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#3d4f3d"; } }}>
                  {f}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: "0.85rem", color: "#6b7f72" }}>
            Showing <strong style={{ color: "#111d13" }}>{filtered.length}</strong> farmer{filtered.length !== 1 ? "s" : ""}
            {categoryParam !== "All" && <span style={{ color: "#2d6a4f" }}> in {categoryParam}</span>}
          </p>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#6b7f72" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#111d13", marginBottom: "0.5rem" }}>No farmers found</h3>
            <p>Try a different category or search term.</p>
            <button onClick={() => setCategory("All")} style={{ marginTop: "1rem", background: "#2d6a4f", color: "white", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
              Show all farmers
            </button>
          </div>
        )}

        {/* Farmer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem", paddingBottom: "3rem" }}>
          {filtered.map(({ id, name, location, specialty, rating, reviews, listings, img, badge, badgeColor }) => {
            const isHov = hovId === id;
            return (
              <div key={id}
                onMouseEnter={() => setHovId(id)}
                onMouseLeave={() => setHovId(null)}
                style={{ background: "white", borderRadius: "12px", padding: "1.75rem", border: `1px solid ${isHov ? "#95d5b2" : "#eee"}`, textAlign: "center", transition: "all 0.22s", transform: isHov ? "translateY(-4px)" : "none", boxShadow: isHov ? "0 8px 28px rgba(45,106,79,0.14)" : "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer" }}>

                {/* Avatar with blue ring on hover */}
                <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                  <div style={{ padding: "3px", borderRadius: "50%", background: isHov ? "linear-gradient(135deg, #1877f2, #42a5f5)" : "transparent", transition: "all 0.25s", display: "inline-block" }}>
                    <img src={img} alt={name} style={{ width: "82px", height: "82px", borderRadius: "50%", objectFit: "cover", border: "3px solid white", display: "block" }} />
                  </div>
                  <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", background: badgeColor, color: "white", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", whiteSpace: "nowrap", fontWeight: 600 }}>{badge}</span>
                </div>

                <h3 style={{ fontWeight: 600, fontSize: "1.1rem", color: isHov ? "#1877f2" : "#111d13", marginBottom: "4px", transition: "color 0.2s" }}>{name}</h3>
                <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginBottom: "6px" }}>📍 {location}</p>
                <span style={{ background: "#e8f5e9", color: "#2d6a4f", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "0.75rem", fontWeight: 500 }}>{specialty}</span>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.82rem", color: "#6b7f72", marginBottom: "1rem" }}>
                  <span>⭐ {rating} ({reviews})</span>
                  <span>📦 {listings} listings</span>
                </div>
                <Link to={`/profile?farmer=${id}`} style={{ display: "block", width: "100%", background: isHov ? "#1877f2" : "#2d6a4f", color: "white", border: "none", padding: "9px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", transition: "all 0.22s" }}>
                  View Profile
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
