import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ADMIN_PROFILE, KENYAN_FARMERS } from "../data/farmers";

const REVENUE_DATA = [
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 380000 },
  { month: "Mar", revenue: 510000 },
  { month: "Apr", revenue: 470000 },
  { month: "May", revenue: 620000 },
  { month: "Jun", revenue: 580000 },
  { month: "Jul", revenue: 750000 },
];

const FARMERS_DATA = KENYAN_FARMERS.slice(0, 5).map(farmer => ({
  ...farmer,
  products: farmer.listings,
  sc: farmer.status === "Suspended" ? "#c0392b" : farmer.status === "Pending" ? "#c0612a" : "#2d6a4f",
  sb: farmer.status === "Suspended" ? "#fde8e8" : farmer.status === "Pending" ? "#fdebd0" : "#e8f5e9",
}));

const PRODUCTS_DATA = [
  { id: "PRD-101", name: "Organic Tomatoes", farmer: "Mwangi Kamau", category: "Vegetables", stock: "240 kg", price: "KSh 120/kg", status: "Live", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=90&q=80" },
  { id: "PRD-102", name: "Fresh Avocados", farmer: "Achieng Odhiambo", category: "Fruits", stock: "520 pcs", price: "KSh 80/piece", status: "Live", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=90&q=80" },
  { id: "PRD-103", name: "Kienyeji Eggs", farmer: "Waweru Muthoni", category: "Poultry", stock: "86 trays", price: "KSh 420/tray", status: "Review", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=90&q=80" },
  { id: "PRD-104", name: "Nyeri Coffee", farmer: "Njoroge Kariuki", category: "Herbs", stock: "120 kg", price: "KSh 950/kg", status: "Live", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=90&q=80" },
];

const CATEGORIES_DATA = [
  { name: "Vegetables", products: 1380, farmers: 418, revenue: "KSh 860K", color: "#2d6a4f" },
  { name: "Fruits", products: 940, farmers: 286, revenue: "KSh 640K", color: "#c0612a" },
  { name: "Dairy", products: 520, farmers: 145, revenue: "KSh 410K", color: "#1877f2" },
  { name: "Poultry", products: 386, farmers: 97, revenue: "KSh 290K", color: "#9b59b6" },
  { name: "Grains", products: 767, farmers: 302, revenue: "KSh 520K", color: "#52b788" },
];

const ORDERS_DATA = [
  { id: "#ORD-2044", buyer: "John Kamau", farmer: "Mwangi Kamau", product: "Organic Tomatoes", amount: "KSh 4,800", status: "Delivered" },
  { id: "#ORD-2043", buyer: "Faith Wambui", farmer: "Achieng Odhiambo", product: "Fresh Avocados", amount: "KSh 3,200", status: "In Transit" },
  { id: "#ORD-2042", buyer: "Brian Otieno", farmer: "Waweru Muthoni", product: "Kienyeji Eggs", amount: "KSh 8,400", status: "Processing" },
  { id: "#ORD-2041", buyer: "Mercy Njeri", farmer: "Njoroge Kariuki", product: "Nyeri Coffee", amount: "KSh 9,500", status: "Delivered" },
];

const ACTIVITY = [
  { icon: "✅", text: "New farmer registered",           sub: "Wanjiku Njeri from Kiambu",   time: "2 min ago"  },
  { icon: "🛒", text: "Order #ORD-2041 completed",       sub: "Buyer: John Kamau",           time: "8 min ago"  },
  { icon: "⚠️", text: "New listing flagged for review",  sub: "Farmer: Otieno Onyango",      time: "15 min ago" },
  { icon: "❌", text: "Dispute raised on #ORD-2038",     sub: "Buyer: Faith Wambui",         time: "32 min ago" },
  { icon: "✅", text: "Farmer account verified",         sub: "Kipchumba Rono",              time: "1 hr ago"   },
  { icon: "💰", text: "Payment processed",               sub: "KSh 24,500 to Mwangi Kamau",  time: "1 hr ago"   },
];

const SIDEBAR_ITEMS = [
  { id: "overview",    label: "Overview",    icon: "▣" },
  { id: "farmers",     label: "Farmers",     icon: "👤" },
  { id: "products",    label: "Products",    icon: "📦" },
  { id: "categories",  label: "Categories",  icon: "🏷️" },
  { id: "orders",      label: "Orders",      icon: "🛒" },
  { id: "reports",     label: "Reports",     icon: "📊" },
  { id: "settings",    label: "Settings",    icon: "⚙️" },
];

export default function Admin({ user, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [farmers, setFarmers] = useState(FARMERS_DATA);
  const [hovTab, setHovTab] = useState(null);
  const navigate = useNavigate();

  function logout() { onLogout(); navigate("/"); }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", fontFamily: "var(--font-body)", background: "#f8f6f1" }}>

      {/* ── SIDEBAR*/}
      <div style={{
        width: "236px", flexShrink: 0,
        background: "#1a4229",
        display: "flex", flexDirection: "column",
        position: "sticky", top: "68px",
        height: "calc(100vh - 68px)", overflowY: "auto",
      }}>
        {/* Brand */}
        <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div style={{ width: "32px", height: "32px", background: "#2d6a4f", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🌿</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "white", fontWeight: 700 }}>FarmSphere</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", paddingLeft: "40px" }}>Admin Dashboard</div>
        </div>

        {/* Nav */}
        <div style={{ padding: "1rem 0.75rem", flex: 1 }}>
          <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 0.5rem", marginBottom: "0.5rem" }}>MAIN MENU</div>
          {SIDEBAR_ITEMS.map(({ id, label, icon }) => {
            const isActive = tab === id;
            const isHov = hovTab === id;
            return (
              <button key={id} onClick={() => setTab(id)}
                onMouseEnter={() => setHovTab(id)}
                onMouseLeave={() => setHovTab(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "0.7rem 0.85rem",
                  borderRadius: "8px", border: "none", cursor: "pointer",
                  background: isActive ? "#2d6a4f" : isHov ? "rgba(255,255,255,0.06)" : "transparent",
                  color: isActive ? "white" : isHov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                  fontSize: "0.9rem", fontWeight: isActive ? 500 : 400,
                  textAlign: "left", marginBottom: "2px",
                  transition: "all 0.15s",
                }}>
                <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* Admin user at bottom */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.6rem 0.5rem", marginBottom: "0.75rem" }}>
            <img src={ADMIN_PROFILE.image} alt={ADMIN_PROFILE.name} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.35)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "0.82rem", color: "white", fontWeight: 500 }}>{user?.name || ADMIN_PROFILE.name}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>Super Admin</div>
            </div>
          </div>
          <button onClick={logout}
            style={{ width: "100%", padding: "0.6rem", background: "rgba(192,57,43,0.18)", color: "#e74c3c", border: "1px solid rgba(192,57,43,0.25)", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(192,57,43,0.28)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(192,57,43,0.18)"}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Topbar  */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0.9rem 2rem", background: "white",
          borderBottom: "1px solid #eee",
          position: "sticky", top: 0, zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f8f6f1", border: "1px solid #eee", borderRadius: "30px", padding: "0.5rem 1rem", width: "280px" }}>
            <span style={{ color: "#6b7f72", fontSize: "0.9rem" }}>🔍</span>
            <input placeholder="Search farmers, products..." style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.88rem", color: "#3d4f3d", width: "100%", fontFamily: "var(--font-body)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.2rem", cursor: "pointer", color: "#6b7f72", position: "relative" }}>
              
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "8px", height: "8px", background: "#e74c3c", borderRadius: "50%", display: "block" }} />
            </span>
            <span style={{ fontSize: "0.85rem", color: "#6b7f72" }}>Monday, June 29, 2026</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src={ADMIN_PROFILE.image} alt={ADMIN_PROFILE.name} onClick={() => navigate("/profile")} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #d8f3dc", cursor: "pointer" }} />
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1a2e1a" }}>{user?.name || ADMIN_PROFILE.name}</div>
                <div style={{ fontSize: "0.7rem", color: "#6b7f72" }}>Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PAGE CONTENT ── */}
        <div style={{ padding: "2rem" }}>

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <>
              {/* 4 Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  { icon: "👥", label: "Total Farmers",   val: "1,248", trend: "+24 this month",  trendColor: "#2d6a4f" },
                  { icon: "📦", label: "Products",        val: "3,993", trend: "+187 this week",  trendColor: "#1877f2" },
                  { icon: "🏷️", label: "Categories",      val: "8,541", trend: "Across 12 types", trendColor: "#9b59b6" },
                  { icon: "💰", label: "Revenue",         val: "KSh 2.4M", trend: "+18.3% MoM",  trendColor: "#27ae60" },
                ].map(({ icon, label, val, trend, trendColor }) => (
                  <div key={label} style={{ background: "white", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid #eee", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div style={{ width: "40px", height: "40px", background: "#f0faf3", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{icon}</div>
                      <span style={{ fontSize: "0.75rem", color: trendColor, fontWeight: 600 }}>{trend}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700, color: "#111d13", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: "0.82rem", color: "#6b7f72", marginTop: "5px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Revenue Chart + Platform Health */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem", marginBottom: "1.5rem" }}>
                {/* Chart */}
                <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #eee" }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#111d13" }}>Platform Revenue</h3>
                    <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginTop: "2px" }}>Monthly revenue breakdown (KSh)</p>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7f72" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#6b7f72" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                      <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #eee", fontSize: "0.85rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} formatter={v => [`KSh ${v.toLocaleString()}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#1a4229" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: "#2d6a4f" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Platform Health */}
                <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #eee" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#111d13", marginBottom: "0.5rem" }}>Platform Health</h3>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#e8f5e9", color: "#2d6a4f", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "20px", marginBottom: "1.5rem", fontWeight: 600 }}>
                    <span>✅</span> All systems operational
                  </div>
                  {[
                    { label: "Server Performance", val: "96%",  color: "#27ae60",  width: "96%" },
                    { label: "Database Health",    val: "88%",  color: "#1877f2",  width: "88%" },
                    { label: "API Availability",   val: "99%",  color: "#27ae60",  width: "99%" },
                    { label: "Security Monitoring",val: "100%", color: "#9b59b6",  width: "100%" },
                  ].map(({ label, val, color, width }) => (
                    <div key={label} style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.85rem", color: "#3d4f3d" }}>{label}</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111d13" }}>{val}</span>
                      </div>
                      <div style={{ height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width, background: color, borderRadius: "3px", transition: "width 0.8s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity + Farmers Management */}
              <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "1.25rem" }}>
                {/* Activity */}
                <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#111d13" }}>Recent Activity</h3>
                    <span style={{ fontSize: "0.82rem", color: "#2d6a4f", cursor: "pointer", fontWeight: 500 }}>View all</span>
                  </div>
                  {ACTIVITY.map(({ icon, text, sub, time }, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "0.65rem 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                      <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.82rem", color: "#111d13", fontWeight: 500, lineHeight: 1.3, marginBottom: "2px" }}>{text}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7f72" }}>{sub}</div>
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "#6b7f72", flexShrink: 0, whiteSpace: "nowrap" }}>{time}</span>
                    </div>
                  ))}
                </div>

                {/* Farmers Management Table */}
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#111d13" }}>Farmers Management</h3>
                    <span style={{ fontSize: "0.82rem", color: "#2d6a4f", cursor: "pointer", fontWeight: 500 }}>View All</span>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                    <thead>
                      <tr style={{ background: "#fafaf8" }}>
                        {["Farmer","Products","Revenue","Status","Actions"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "0.7rem 1.25rem", fontSize: "0.72rem", fontWeight: 600, color: "#6b7f72", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {farmers.map((f, idx) => (
                        <tr key={f.id} style={{ borderBottom: idx < farmers.length - 1 ? "1px solid #f5f5f5" : "none", transition: "background 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#fafaf8"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td style={{ padding: "0.85rem 1.25rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <img src={f.img} alt={f.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 500, color: "#111d13", fontSize: "0.88rem" }}>{f.name}</div>
                                <div style={{ fontSize: "0.72rem", color: "#6b7f72" }}>{f.county}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "0.85rem 1.25rem", color: "#6b7f72" }}>{f.products}</td>
                          <td style={{ padding: "0.85rem 1.25rem", fontWeight: 600, color: "#2d6a4f" }}>{f.revenue}</td>
                          <td style={{ padding: "0.85rem 1.25rem" }}>
                            <span style={{ background: f.sb, color: f.sc, fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 600 }}>{f.status}</span>
                          </td>
                          <td style={{ padding: "0.85rem 1.25rem" }}>
	                          <button onClick={() => navigate(`/profile?farmer=${f.id}`)} style={{ background: "#e8f5e9", border: "none", color: "#2d6a4f", cursor: "pointer", fontSize: "0.78rem", padding: "5px 10px", borderRadius: "6px", fontWeight: 700, transition: "all 0.15s" }}
  	                              onMouseEnter={e => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#111d13"; }}
  	                              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#6b7f72"; }}>
	                              View
	                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* FARMERS TAB */}
          {tab === "farmers" && (
            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #eee" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#111d13" }}>All Farmers</h2>
                  <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginTop: "2px" }}>{farmers.length} registered farmers</p>
                </div>
                <button style={{ background: "#2d6a4f", color: "white", border: "none", padding: "8px 18px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>+ Add Farmer</button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#fafaf8" }}>
                    {["Farmer","County","Products","Revenue","Status","Actions"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.5rem", fontSize: "0.72rem", fontWeight: 600, color: "#6b7f72", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((f, idx) => (
                    <tr key={f.id} style={{ borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fafaf8"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "0.9rem 1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={f.img} alt={f.name} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }} />
                          <span style={{ fontWeight: 500, color: "#111d13" }}>{f.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "0.9rem 1.5rem", color: "#6b7f72" }}>{f.county}</td>
                      <td style={{ padding: "0.9rem 1.5rem", color: "#3d4f3d" }}>{f.products}</td>
                      <td style={{ padding: "0.9rem 1.5rem", fontWeight: 600, color: "#2d6a4f" }}>{f.revenue}</td>
                      <td style={{ padding: "0.9rem 1.5rem" }}>
                        <span style={{ background: f.sb, color: f.sc, fontSize: "0.75rem", padding: "3px 12px", borderRadius: "20px", fontWeight: 600 }}>{f.status}</span>
                      </td>
                      <td style={{ padding: "0.9rem 1.5rem" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
	                          <button onClick={() => navigate(`/profile?farmer=${f.id}`)} style={{ background: "#e8f5e9", color: "#2d6a4f", border: "none", padding: "5px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>View Profile</button>
                          <button onClick={() => setFarmers(prev => prev.filter(x => x.id !== f.id))} style={{ background: "#fde8e8", color: "#c0392b", border: "none", padding: "5px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* REPORTS TAB */}
          {tab === "reports" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #eee" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#111d13", marginBottom: "1.25rem" }}>Monthly Summary</h3>
                {[["New Registrations","127"],["Orders Completed","1,842"],["Revenue Generated","KSh 2.4M"],["Disputes Resolved","14"],["Products Listed","312"]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f5f5f5", fontSize: "0.88rem" }}>
                    <span style={{ color: "#6b7f72" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: "#2d6a4f" }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #eee" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#111d13", marginBottom: "1.25rem" }}>Top Counties</h3>
                {[["Kiambu","28%","#2d6a4f"],["Nakuru","19%","#3a8a65"],["Nyeri","14%","#c0612a"],["Kisumu","11%","#52b788"],["Eldoret","8%","#9b59b6"]].map(([county, pct, color]) => (
                  <div key={county} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.9rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "#6b7f72", width: "80px", flexShrink: 0 }}>{county}</span>
                    <div style={{ flex: 1, height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: pct, background: color, borderRadius: "3px" }} />
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111d13", width: "36px", textAlign: "right" }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

	          {tab === "products" && (
	            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", overflow: "hidden" }}>
	              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #eee" }}>
	                <div>
	                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#111d13" }}>Products</h2>
	                  <p style={{ fontSize: "0.82rem", color: "#6b7f72" }}>Live marketplace listings and review queue</p>
	                </div>
	                <button style={{ background: "#2d6a4f", color: "white", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 700 }}>+ Add Product</button>
	              </div>
	              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
	                <thead><tr style={{ background: "#fafaf8" }}>{["Product","Farmer","Category","Stock","Price","Status","Action"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.5rem", fontSize: "0.72rem", color: "#6b7f72", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
	                <tbody>{PRODUCTS_DATA.map(item => <tr key={item.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
	                  <td style={{ padding: "0.85rem 1.5rem" }}><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><img src={item.img} alt={item.name} style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }} /><strong>{item.name}</strong></div></td>
	                  <td style={{ padding: "0.85rem 1.5rem", color: "#6b7f72" }}>{item.farmer}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}>{item.category}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}>{item.stock}</td>
	                  <td style={{ padding: "0.85rem 1.5rem", color: "#2d6a4f", fontWeight: 700 }}>{item.price}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}><span style={{ background: item.status === "Live" ? "#e8f5e9" : "#fdebd0", color: item.status === "Live" ? "#2d6a4f" : "#c0612a", padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>{item.status}</span></td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}><button style={{ background: "#f0faf3", color: "#2d6a4f", border: "none", borderRadius: "6px", padding: "5px 10px", fontWeight: 700 }}>Manage</button></td>
	                </tr>)}</tbody>
	              </table>
	            </div>
	          )}

	          {tab === "categories" && (
	            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
	              {CATEGORIES_DATA.map(item => (
	                <div key={item.name} style={{ background: "white", border: "1px solid #eee", borderRadius: "12px", padding: "1.25rem" }}>
	                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: item.color, marginBottom: "1rem" }} />
	                  <h2 style={{ fontFamily: "var(--font-display)", color: "#111d13", fontSize: "1.35rem" }}>{item.name}</h2>
	                  <p style={{ color: "#6b7f72", fontSize: "0.85rem", marginBottom: "1rem" }}>{item.farmers} farmers serving {item.products.toLocaleString()} products</p>
	                  <div style={{ display: "flex", justifyContent: "space-between", color: "#2d6a4f", fontWeight: 800 }}><span>Revenue</span><span>{item.revenue}</span></div>
	                </div>
	              ))}
	            </div>
	          )}

	          {tab === "orders" && (
	            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", overflow: "hidden" }}>
	              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #eee" }}>
	                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "#111d13" }}>Orders</h2>
	                <p style={{ fontSize: "0.82rem", color: "#6b7f72" }}>Track buyer orders and farmer fulfillment</p>
	              </div>
	              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
	                <thead><tr style={{ background: "#fafaf8" }}>{["Order","Buyer","Farmer","Product","Amount","Status","Action"].map(h => <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.5rem", fontSize: "0.72rem", color: "#6b7f72", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
	                <tbody>{ORDERS_DATA.map(item => <tr key={item.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
	                  <td style={{ padding: "0.85rem 1.5rem", color: "#6b7f72" }}>{item.id}</td>
	                  <td style={{ padding: "0.85rem 1.5rem", fontWeight: 700 }}>{item.buyer}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}>{item.farmer}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}>{item.product}</td>
	                  <td style={{ padding: "0.85rem 1.5rem", color: "#2d6a4f", fontWeight: 800 }}>{item.amount}</td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}><span style={{ background: item.status === "Delivered" ? "#e8f5e9" : "#fdebd0", color: item.status === "Delivered" ? "#2d6a4f" : "#c0612a", padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>{item.status}</span></td>
	                  <td style={{ padding: "0.85rem 1.5rem" }}><button style={{ background: "#f0faf3", color: "#2d6a4f", border: "none", borderRadius: "6px", padding: "5px 10px", fontWeight: 700 }}>View</button></td>
	                </tr>)}</tbody>
	              </table>
	            </div>
	          )}

	          {tab === "settings" && (
	            <div style={{ background: "white", borderRadius: "12px", border: "1px solid #eee", padding: "2rem", display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem", alignItems: "center" }}>
	              <img src={ADMIN_PROFILE.image} alt={ADMIN_PROFILE.name} style={{ width: "220px", height: "260px", objectFit: "cover", borderRadius: "12px", border: "6px solid #f0faf3", boxShadow: "0 14px 35px rgba(26,66,41,0.15)" }} />
	              <div>
	                <span style={{ color: "#2d6a4f", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin Profile</span>
	                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "#111d13", margin: "0.25rem 0" }}>{user?.name || ADMIN_PROFILE.name}</h2>
	                <p style={{ color: "#6b7f72", lineHeight: 1.8, maxWidth: "560px" }}>Super Admin overseeing farmer approvals, marketplace quality, category health, order monitoring, and platform reports.</p>
	                <button onClick={() => navigate("/profile")} style={{ marginTop: "1.25rem", background: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", padding: "0.75rem 1.2rem", fontWeight: 800 }}>View Full Profile</button>
	              </div>
	            </div>
	          )}

        </div>
      </div>
    </div>
  );
}
