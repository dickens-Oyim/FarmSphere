import { useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const PRODUCTS = [
  { id: 1,  name: "Organic Tomatoes",   price: "KSh 120/kg",     farmer: "Mwangi Kamau",      category: "Vegetables", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80" },
  { id: 2,  name: "Fresh Avocados",     price: "KSh 80/piece",   farmer: "Achieng Odhiambo",  category: "Fruits",     img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80" },
  { id: 3,  name: "Mixed Vegetables",   price: "KSh 350/basket", farmer: "Kipchumba Rono",    category: "Vegetables", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { id: 4,  name: "Fresh Carrots",      price: "KSh 90/kg",      farmer: "Wanjiku Njeri",     category: "Vegetables", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80" },
  { id: 5,  name: "Fresh Milk (1L)",    price: "KSh 80/litre",   farmer: "Otieno Onyango",    category: "Dairy",      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: 6,  name: "Free Range Eggs",    price: "KSh 180/tray",   farmer: "Waweru Muthoni",    category: "Poultry",    img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80" },
  { id: 7,  name: "Maize Flour (2kg)",  price: "KSh 200/bag",    farmer: "Odhiambo Ochieng",  category: "Grains",     img: "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?w=400&q=80" },
  { id: 8,  name: "Fresh Spinach",      price: "KSh 50/bunch",   farmer: "Akinyi Adhiambo",   category: "Vegetables", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
  { id: 9,  name: "Sweet Watermelon",   price: "KSh 250/piece",  farmer: "Njoroge Kariuki",   category: "Fruits",     img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80" },
  { id: 10, name: "Camel Milk (500ml)", price: "KSh 120/bottle", farmer: "Hassan Abdi",     category: "Dairy",      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: 11, name: "Fresh Tilapia",      price: "KSh 350/kg",     farmer: "Auma Akoth",      category: "Poultry",    img: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&q=80" },
  { id: 12, name: "Organic Coffee",     price: "KSh 800/kg",     farmer: "Kimani Maina",    category: "Grains",     img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80" },
];

const FILTERS = ["All","Vegetables","Fruits","Dairy","Poultry","Grains"];

export default function Seller({ addToCart }) {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = PRODUCTS.filter(p =>
    (active === "All" || p.category === active) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ background: "#2d6a4f", padding: "3rem clamp(1.5rem,6vw,5rem)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>Marketplace</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>Buy fresh produce directly from verified Kenyan farmers</p>
        <SearchBar placeholder="Search products, farmers..." value={search} onChange={e => setSearch(e.target.value)} light />
      </div>

      <div style={{ padding: "2rem clamp(1.5rem,6vw,5rem)" }}>
        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{ padding: "0.45rem 1.1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: active === f ? 500 : 400, border: `1.5px solid ${active === f ? "#2d6a4f" : "#e8e8e8"}`, background: active === f ? "#2d6a4f" : "white", color: active === f ? "white" : "#3d5046", cursor: "pointer", transition: "all 0.18s" }}>{f}</button>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "#6b7f72" }}><strong>{filtered.length}</strong> products found</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.25rem", paddingBottom: "3rem" }}>
          {filtered.map(p => <ProductCard key={p.id} {...p} onAdd={addToCart} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
