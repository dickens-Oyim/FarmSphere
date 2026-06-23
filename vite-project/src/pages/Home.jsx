import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { KENYAN_FARMERS } from "../data/farmers";

const STATS = [
  { val: "1,200+", label: "Active Farmers" },
  { val: "8,500+", label: "Products Available" },
  { val: "30+",    label: "Counties Served" },
  { val: "4.8★",  label: "Star Rating" },
];

const CATEGORIES = [
  { emoji: "🍎", name: "Fruits",     count: "240+" },
  { emoji: "🥬", name: "Vegetables", count: "380+" },
  { emoji: "🥛", name: "Dairy",      count: "95+"  },
  { emoji: "🍗", name: "Poultry",    count: "62+"  },
  { emoji: "🌾", name: "Grains",     count: "110+" },
  { emoji: "🌿", name: "Herbs",      count: "78+"  },
];

const PRODUCTS = [
  { id: 1, name: "Organic Tomatoes",  farmer: "Mwangi Kamau",      price: "KSh 120/kg",     category: "Vegetables", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" },
  { id: 2, name: "Fresh Avocados",    farmer: "Achieng Odhiambo",  price: "KSh 80/piece",   category: "Fruits",     img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80" },
  { id: 3, name: "Mixed Vegetables",  farmer: "Kipchumba Rono",    price: "KSh 350/basket", category: "Vegetables", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { id: 4, name: "Fresh Carrots",     farmer: "Wanjiku Njeri",     price: "KSh 90/kg",      category: "Vegetables", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80" },
];

const FARMERS = KENYAN_FARMERS.slice(0, 3);

const WHY = [
  { icon: "👥", title: "Direct Farmer Connections", desc: "Buy directly from local farmers with no middlemen. Build lasting relationships with the people who grow your food." },
  { icon: "🛡️", title: "Secure Payments",           desc: "Every transaction is protected by our escrow system. Pay with confidence knowing your money is safe." },
  { icon: "🌿", title: "Fresh Produce Guaranteed",  desc: "All produce is harvested fresh and quality-checked before listing. Farm-to-table freshness every time." },
  { icon: "🚚", title: "Nationwide Delivery",       desc: "We partner with trusted logistics providers to deliver fresh produce across Kenya within 24-48 hours." },
];

export default function Home({ addToCart }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "600px", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80" alt="Farm"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,25,12,0.65)", zIndex: 1 }} />
        <div className="fade" style={{ position: "relative", zIndex: 2, padding: "0 clamp(1.5rem,6vw,5rem)", maxWidth: "680px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: "13px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1.5rem", backdropFilter: "blur(8px)" }}>
            🌍 Kenya's #1 Agricultural Marketplace
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem,6vw,4.8rem)", fontWeight: 700, color: "white", lineHeight: 1.08, marginBottom: "1.25rem" }}>
            Fresh From The Farm<br />
            <span style={{ color: "#74c69d", fontStyle: "italic" }}>To Your Table</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem", fontWeight: 300, maxWidth: "500px" }}>
            Connect with local farmers and buy fresh produce directly. No middlemen, no compromise on quality.
          </p>
          <div className="fade2" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/seller" style={{ background: "white", color: "#1a4229", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}>
              Explore Marketplace →
            </Link>
            <Link to="/role" style={{ background: "#2d6a4f", color: "white", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.2s" }}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "white", display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: "1px solid #e8e8e8" }}>
        {STATS.map(({ val, label }, i) => (
          <div key={label} style={{ padding: "2rem", textAlign: "center", borderRight: i < 3 ? "1px solid #e8e8e8" : "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "#1a4229" }}>{val}</div>
            <div style={{ fontSize: "0.85rem", color: "#6b7f72", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section style={{ padding: "4rem clamp(1.5rem,6vw,5rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#1a2e1a" }}>Browse Categories</h2>
            <p style={{ color: "#6b7f72", fontSize: "0.9rem", marginTop: "4px" }}>Fresh produce from farms across all 47 counties</p>
          </div>
          <Link to="/seller" style={{ color: "#2d6a4f", fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>View all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "1rem" }}>
          {CATEGORIES.map(({ emoji, name, count }) => (
            <Link to="/seller" key={name} style={{ background: "white", border: "1px solid #e8e8e8", borderRadius: "12px", padding: "1.5rem 1rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "inherit", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,106,79,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#95d5b2"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e8e8e8"; }}>
              <span style={{ fontSize: "2.2rem" }}>{emoji}</span>
              <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1a2e1a" }}>{name}</span>
              <span style={{ fontSize: "0.75rem", color: "#6b7f72" }}>{count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Fresh Today */}
      <section style={{ padding: "0 clamp(1.5rem,6vw,5rem) 4rem", background: "#fafaf8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "3rem", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#1a2e1a" }}>Fresh Today</h2>
            <p style={{ color: "#6b7f72", fontSize: "0.9rem", marginTop: "4px" }}>Picked fresh and ready for delivery</p>
          </div>
          <Link to="/seller" style={{ color: "#2d6a4f", fontSize: "0.9rem", fontWeight: 500 }}>View all products →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} {...p} onAdd={addToCart} />)}
        </div>
      </section>

      {/* Why FarmSphere */}
      <section style={{ background: "#f0f4f1", padding: "4rem clamp(1.5rem,6vw,5rem)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#1a2e1a", textAlign: "center", marginBottom: "0.5rem" }}>Why Choose FarmSphere?</h2>
        <p style={{ textAlign: "center", color: "#6b7f72", marginBottom: "2.5rem" }}>We make it easy to connect farmers with buyers for a fresher, fairer food system.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
          {WHY.map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "white", borderRadius: "12px", padding: "1.75rem", border: "1px solid #e8e8e8", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,106,79,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#1a2e1a", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#6b7f72", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Farmers */}
      <section style={{ padding: "4rem clamp(1.5rem,6vw,5rem)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#1a2e1a" }}>Top Farmers</h2>
            <p style={{ color: "#6b7f72", fontSize: "0.9rem", marginTop: "4px" }}>Our highest rated agricultural producers</p>
          </div>
          <Link to="/farmer" style={{ color: "#2d6a4f", fontSize: "0.9rem", fontWeight: 500 }}>Browse all farmers →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
          {FARMERS.map(({ name, location, specialty, rating, reviews, listings, img, badge, badgeColor }) => (
            <div key={name} style={{ background: "white", borderRadius: "12px", padding: "1.75rem", border: "1px solid #e8e8e8", textAlign: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,106,79,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                <img src={img} alt={name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid #e8f5e9", transition: "all 0.2s" }} />
                <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", background: badgeColor, color: "white", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", whiteSpace: "nowrap", fontWeight: 500 }}>{badge}</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "1.05rem", color: "#1a2e1a", marginBottom: "4px" }}>{name}</h3>
              <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginBottom: "6px" }}>📍 {location}</p>
              <span style={{ background: "#e8f5e9", color: "#2d6a4f", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "0.75rem" }}>{specialty}</span>
              <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginBottom: "1rem" }}>⭐ {rating} ({reviews}) · {listings} listings</p>
              <button style={{ width: "100%", background: "#2d6a4f", color: "white", border: "none", padding: "8px", borderRadius: "8px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
                onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 clamp(1.5rem,6vw,5rem) 4rem" }}>
        <div style={{ background: "#2d6a4f", borderRadius: "16px", padding: "3rem 3.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Ready to Start Selling?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", maxWidth: "420px" }}>Join 850+ farmers already selling on FarmSphere. Set up your store in minutes and reach thousands of buyers.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/role" style={{ background: "white", color: "#1a4229", padding: "0.85rem 1.8rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s" }}>Join as Farmer</Link>
            <Link to="/seller" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "white", padding: "0.85rem 1.8rem", borderRadius: "8px", fontWeight: 600, transition: "all 0.2s" }}>Learn More</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
