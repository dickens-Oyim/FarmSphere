import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { KENYAN_FARMERS } from "../data/farmers";

const DIRECTORY = [
  ...KENYAN_FARMERS.slice(0, 6).map(farmer => ({
    id: farmer.id,
    type: "Farmer",
    name: farmer.name,
    location: farmer.county,
    specialty: farmer.specialty,
    products: farmer.listings,
    rating: farmer.rating,
    image: farmer.img,
  })),
  { type: "Product", name: "Organic Tomatoes", location: "Nakuru", specialty: "KSh 120/kg", products: 142, rating: "4.8", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=180&q=80" },
  { type: "Product", name: "Fresh Avocados", location: "Kisumu", specialty: "KSh 80/piece", products: 98, rating: "4.9", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=180&q=80" },
  { type: "Product", name: "Mixed Vegetables", location: "Thika", specialty: "KSh 350/basket", products: 76, rating: "4.6", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=180&q=80" },
];

const FILTERS = ["All", "Farmer", "Product"];

export default function Directory() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const results = DIRECTORY.filter(item => {
    const matchesFilter = filter === "All" || item.type === filter;
    const text = `${item.name} ${item.location} ${item.specialty}`.toLowerCase();
    return matchesFilter && text.includes(search.toLowerCase());
  });

  return (
    <div>
      <section style={{ background: "#1a4229", color: "white", padding: "3.5rem clamp(1.5rem,6vw,5rem)" }}>
        <div style={{ maxWidth: "860px" }}>
          <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "0.4rem 0.8rem", fontSize: "0.82rem" }}>
            FarmSphere Directory
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,5vw,4rem)", lineHeight: 1.05, marginTop: "1rem", marginBottom: "0.8rem" }}>
            Find farmers, produce, and trusted marketplace contacts.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", maxWidth: "620px" }}>
            Search across verified farmers and available products from farms across Kenya.
          </p>
        </div>
      </section>

      <section style={{ padding: "2rem clamp(1.5rem,6vw,5rem) 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search directory..."
            style={{
              width: "min(100%, 420px)",
              padding: "0.85rem 1rem",
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
              outline: "none",
              fontSize: "0.95rem",
              background: "white",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem", background: "white", border: "1px solid #e8e8e8", borderRadius: "10px", padding: "0.35rem" }}>
            {FILTERS.map(item => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  border: "none",
                  borderRadius: "7px",
                  padding: "0.55rem 1rem",
                  background: filter === item ? "#2d6a4f" : "transparent",
                  color: filter === item ? "white" : "#3d5046",
                  fontWeight: 600,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
          {results.map(item => (
            <article key={`${item.type}-${item.name}`} style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: "8px", padding: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <img src={item.image} alt={item.name} style={{ width: "74px", height: "74px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <span style={{ color: item.type === "Farmer" ? "#2d6a4f" : "#c0612a", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.type}</span>
                <h2 style={{ fontSize: "1.05rem", color: "#1a2e1a", margin: "0.1rem 0" }}>{item.name}</h2>
                <p style={{ color: "#6b7f72", fontSize: "0.86rem" }}>{item.location} · {item.specialty}</p>
                <p style={{ color: "#3d5046", fontSize: "0.82rem", marginTop: "0.35rem" }}>★ {item.rating} · {item.products} {item.type === "Farmer" ? "listings" : "orders"}</p>
                {item.type === "Farmer" && <Link to={`/profile?farmer=${item.id}`} style={{ display: "inline-block", marginTop: "0.45rem", color: "#2d6a4f", fontSize: "0.82rem", fontWeight: 700 }}>View profile</Link>}
              </div>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: "8px", padding: "3rem", textAlign: "center", color: "#6b7f72" }}>
            No directory results found.
          </div>
        )}

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/farmer" style={{ background: "#2d6a4f", color: "white", padding: "0.8rem 1.2rem", borderRadius: "8px", fontWeight: 700 }}>Browse Farmers</Link>
          <Link to="/seller" style={{ background: "white", color: "#2d6a4f", border: "1px solid #d8f3dc", padding: "0.8rem 1.2rem", borderRadius: "8px", fontWeight: 700 }}>Browse Products</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
