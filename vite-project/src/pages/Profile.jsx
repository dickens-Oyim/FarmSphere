import Footer from "../components/Footer";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ADMIN_PROFILE, KENYAN_FARMERS } from "../data/farmers";

export default function Profile({ user }) {
  const [searchParams] = useSearchParams();
  const farmerId = Number(searchParams.get("farmer"));
  const farmer = KENYAN_FARMERS.find(item => item.id === farmerId);
  const isAdmin = !farmer && (user?.role === "admin" || !user);
  const person = farmer || (isAdmin ? ADMIN_PROFILE : KENYAN_FARMERS[0]);
  const name = user?.name && !farmer ? user.name : person.name;
  const role = farmer ? "farmer" : user?.role || person.role || "farmer";
  const image = person.image || person.img;
  const [activeTab, setActiveTab] = useState("listings");

  const TABS = ["listings","orders","reviews","settings"];

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #12351f, #2d6a4f)", height: "170px" }} />
      <div style={{ padding: "0 clamp(1.5rem,6vw,5rem) 5rem", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ background: "white", borderRadius: "14px", padding: "0 2rem 2rem", border: "1px solid #d8e8dc", marginTop: "-70px", marginBottom: "3rem", boxShadow: "0 18px 45px rgba(26,66,41,0.12)" }}>
          <div style={{ textAlign: "center" }}>
            <img src={image} alt={name} style={{ width: "126px", height: "126px", borderRadius: "50%", objectFit: "cover", margin: "-63px auto 1rem", border: "6px solid white", outline: "3px solid #95d5b2", boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "#1a2e1a", marginBottom: "0.5rem" }}>{name}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "#e8f5e9", color: "#2d6a4f", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>
                🌿 {role === "admin" ? "Super Admin" : role === "farmer" ? "Verified Farmer" : "Buyer"}
              </span>
              <span style={{ background: "#fdebd0", color: "#c0612a", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>📍 {person.location || "Nairobi, Kenya"}</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#6b7f72", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "380px", margin: "0 auto 1.5rem" }}>
              {role === "admin" ? "Platform administrator managing farmer verification, products, categories, and marketplace orders across FarmSphere." : `Kenyan farmer specializing in ${person.specialty?.toLowerCase() || "fresh produce"} and serving buyers through verified FarmSphere listings.`}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "#f8f6f1", borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem" }}>
              {(role === "admin"
                ? [["1,248","Farmers"],["3,993","Products"],["8,541","Categories"],["KSh 2.4M","Revenue"]]
                : [[person.listings || "32","Products"],[`${person.rating || "4.9"}★`,"Rating"],[person.revenue || "KSh 85K","Earned"],[person.county || "Nairobi","County"]]
              ).map(([val, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#1a4229" }}>{val}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7f72" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", background: "#f8f6f1", borderRadius: "8px", padding: "4px", marginBottom: "1.25rem" }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "7px", borderRadius: "6px", border: "none", background: activeTab === t ? "white" : "transparent", color: activeTab === t ? "#1a2e1a" : "#6b7f72", fontWeight: activeTab === t ? 500 : 400, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.15s", textTransform: "capitalize", boxShadow: activeTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
                  {t}
                </button>
              ))}
            </div>

            <button style={{ width: "100%", padding: "0.85rem", background: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
              onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
