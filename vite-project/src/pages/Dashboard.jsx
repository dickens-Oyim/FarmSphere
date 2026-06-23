import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "../components/Footer";

const CHART = [
  { month: "Jan", revenue: 32000 }, { month: "Feb", revenue: 28000 },
  { month: "Mar", revenue: 41000 }, { month: "Apr", revenue: 37000 },
  { month: "May", revenue: 53000 }, { month: "Jun", revenue: 48000 },
  { month: "Jul", revenue: 62000 },
];

const ORDERS = [
  { id: "#ORD-1042", product: "Organic Tomatoes",        buyer: "Sarah Njeri",     price: "KSh 2,400", status: "Completed", sc: "#2d6a4f", sb: "#e8f5e9" },
  { id: "#ORD-1041", product: "Fresh Avocados (10kg)",   buyer: "Peter Maina",     price: "KSh 1,800", status: "Pending",   sc: "#c0612a", sb: "#fdebd0" },
  { id: "#ORD-1040", product: "Mixed Vegetables Basket", buyer: "Anne Wanjiru",    price: "KSh 3,150", status: "Completed", sc: "#2d6a4f", sb: "#e8f5e9" },
  { id: "#ORD-1039", product: "Kale (5kg)",              buyer: "Odhiambo Ouma",   price: "KSh 750",   status: "Cancelled", sc: "#c0392b", sb: "#fde8e8" },
  { id: "#ORD-1038", product: "Organic Carrots",         buyer: "Faith Wambui",    price: "KSh 1,200", status: "Pending",   sc: "#c0612a", sb: "#fdebd0" },
];

const LISTINGS = [
  { name: "Organic Tomatoes", price: "KSh 120/kg",   stock: "48 kg",   sales: 142, status: "Active",        img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&q=80" },
  { name: "Fresh Avocados",   price: "KSh 80/piece", stock: "120 pcs", sales: 98,  status: "Active",        img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&q=80" },
  { name: "Kale Bunch",       price: "KSh 50/bunch", stock: "0",       sales: 210, status: "Out of Stock",  img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&q=80" },
  { name: "Fresh Carrots",    price: "KSh 90/kg",    stock: "30 kg",   sales: 67,  status: "Active",        img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&q=80" },
];

export default function Dashboard({ user }) {
  const name = user?.name?.split(" ")[0] || "Farmer";
  return (
    <div>
      <div style={{ padding: "2.5rem clamp(1.5rem,6vw,5rem) 0" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "#1a2e1a" }}>Welcome Back, {name}! 👋</h1>
            <p style={{ color: "#6b7f72", marginTop: "4px" }}>Here's what's happening with your farm today.</p>
          </div>
          <button style={{ background: "#2d6a4f", color: "white", border: "none", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
            onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
            + Add Listing
          </button>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "📈", label: "Total Sales",     val: "KSh 42,500", trend: "+12.5%",     color: "#2d6a4f" },
            { icon: "📦", label: "Products Listed", val: "128",         trend: "+4 new",     color: "#1877f2" },
            { icon: "🛒", label: "Active Orders",   val: "6",           trend: "2 pending",  color: "#c0612a" },
            { icon: "⭐", label: "Rating",          val: "4.8★",        trend: "128 reviews",color: "#f39c12" },
          ].map(({ icon, label, val, trend, color }) => (
            <div key={label} style={{ background: "white", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid #e8e8e8", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                <span style={{ fontSize: "0.75rem", color, fontWeight: 500 }}>{trend}</span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "#1a2e1a", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.82rem", color: "#6b7f72", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Chart + This Month */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e8e8e8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "#1a2e1a" }}>Sales Trend</h3>
                <p style={{ fontSize: "0.82rem", color: "#6b7f72" }}>Monthly revenue (KSh)</p>
              </div>
              <span style={{ fontSize: "0.82rem", color: "#2d6a4f", cursor: "pointer", fontWeight: 500 }}>View report ↗</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7f72" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7f72" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e8e8e8", fontSize: "0.85rem" }} formatter={v => [`KSh ${v.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#2d6a4f" strokeWidth={2.5} dot={{ fill: "#2d6a4f", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e8e8e8" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "#1a2e1a", marginBottom: "1.25rem" }}>This Month</h3>
            {[
              { label: "Revenue",              val: "KSh 42,500", pct: "100%", color: "#2d6a4f" },
              { label: "Orders Fulfilled",     val: "94 / 98",    pct: "96%",  color: "#2d6a4f" },
              { label: "Customer Satisfaction",val: "4.8 / 5.0",  pct: "96%",  color: "#2d6a4f" },
            ].map(({ label, val, pct, color }) => (
              <div key={label} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "0.85rem" }}>
                  <span style={{ color: "#6b7f72" }}>{label}</span>
                  <span style={{ fontWeight: 500, color: "#1a2e1a" }}>{val}</span>
                </div>
                <div style={{ height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: pct, background: color, borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e8e8e8", marginBottom: "1.5rem", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "#1a2e1a" }}>Recent Orders</h3>
            <span style={{ fontSize: "0.85rem", color: "#2d6a4f", cursor: "pointer", fontWeight: 500 }}>View all →</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ background: "#fafaf8" }}>
                {["Order ID","Product","Buyer","Price","Status"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 600, color: "#6b7f72", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map(({ id, product, buyer, price, status, sc, sb }) => (
                <tr key={id} style={{ borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafaf8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "0.85rem 1.5rem", color: "#6b7f72" }}>{id}</td>
                  <td style={{ padding: "0.85rem 1.5rem", fontWeight: 500, color: "#1a2e1a" }}>{product}</td>
                  <td style={{ padding: "0.85rem 1.5rem", color: "#6b7f72" }}>{buyer}</td>
                  <td style={{ padding: "0.85rem 1.5rem", fontWeight: 600, color: "#2d6a4f" }}>{price}</td>
                  <td style={{ padding: "0.85rem 1.5rem" }}>
                    <span style={{ background: sb, color: sc, fontSize: "0.78rem", fontWeight: 500, padding: "3px 10px", borderRadius: "20px" }}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* My Listings */}
        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e8e8e8", marginBottom: "3rem", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "#1a2e1a" }}>My Listings</h3>
            <button style={{ background: "#e8f5e9", color: "#2d6a4f", border: "none", padding: "5px 12px", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer" }}>+ Add New</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#f0f0f0" }}>
            {LISTINGS.map(({ name, price, stock, sales, status, img }) => (
              <div key={name} style={{ background: "white", padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafaf8"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}>
                <img src={img} alt={name} style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <span style={{ fontWeight: 500, fontSize: "0.9rem", color: "#1a2e1a" }}>{name}</span>
                    <span style={{ background: status === "Active" ? "#e8f5e9" : "#fde8e8", color: status === "Active" ? "#2d6a4f" : "#c0392b", fontSize: "0.72rem", padding: "2px 8px", borderRadius: "20px", fontWeight: 500 }}>{status}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#2d6a4f", fontWeight: 500 }}>{price}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7f72" }}>Stock: {stock} · {sales} sales</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <button style={{ background: "none", border: "1px solid #e8e8e8", color: "#6b7f72", width: "28px", height: "28px", borderRadius: "5px", cursor: "pointer", fontSize: "0.8rem" }}>✏️</button>
                  <button style={{ background: "none", border: "1px solid #fde8e8", color: "#c0392b", width: "28px", height: "28px", borderRadius: "5px", cursor: "pointer", fontSize: "0.8rem" }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
