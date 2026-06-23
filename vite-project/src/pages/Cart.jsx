import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Cart({ cart, onRemove, onUpdateQty, onClear }) {
  const [ordered, setOrdered] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, p) => {
    const num = parseInt(p.price.replace(/[^0-9]/g, "")) || 0;
    return sum + num * p.qty;
  }, 0);
  const delivery = cart.length > 0 ? 150 : 0;
  const total = subtotal + delivery;

  function placeOrder() {
    setOrdered(true);
    setTimeout(() => { onClear(); navigate("/"); }, 3000);
  }

  if (ordered) return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "3rem" }}>
      <div style={{ fontSize: "4rem" }}>✅</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#1a4229" }}>Order Placed!</h2>
      <p style={{ color: "#6b7f72" }}>Your order has been received. Redirecting to home...</p>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "3rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem" }}>🛒</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#1a2e1a" }}>Your cart is empty</h2>
      <p style={{ color: "#6b7f72" }}>Browse the marketplace and add some fresh produce!</p>
      <Link to="/seller" style={{ background: "#2d6a4f", color: "white", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: 600, marginTop: "0.5rem" }}>Browse Marketplace</Link>
    </div>
  );

  return (
    <div>
      <div style={{ padding: "2.5rem clamp(1.5rem,6vw,5rem) 0" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "#1a2e1a", marginBottom: "0.25rem" }}>Your Cart</h1>
        <p style={{ color: "#6b7f72", marginBottom: "2rem" }}>{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2rem", paddingBottom: "3rem" }}>
          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cart.map(item => (
              <div key={item.id} style={{ background: "white", borderRadius: "12px", padding: "1.25rem", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <img src={item.img || `https://placehold.co/80x80/d8f3dc/2d6a4f?text=${item.name[0]}`} alt={item.name}
                  style={{ width: "72px", height: "72px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1a2e1a", marginBottom: "3px" }}>{item.name}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#6b7f72", marginBottom: "2px" }}>by {item.farmer}</p>
                  <span style={{ background: "#e8f5e9", color: "#2d6a4f", fontSize: "10px", padding: "2px 8px", borderRadius: "20px" }}>{item.category}</span>
                </div>
                {/* Qty Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #e8e8e8", background: "white", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>−</button>
                  <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ width: "30px", height: "30px", borderRadius: "6px", border: "1px solid #e8e8e8", background: "white", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>+</button>
                </div>
                <div style={{ fontWeight: 700, color: "#2d6a4f", fontSize: "1rem", minWidth: "100px", textAlign: "right" }}>{item.price}</div>
                <button onClick={() => onRemove(item.id)} style={{ background: "#fde8e8", border: "none", color: "#c0392b", width: "32px", height: "32px", borderRadius: "6px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/seller" style={{ color: "#2d6a4f", fontSize: "0.9rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>← Continue Shopping</Link>
              <button onClick={onClear} style={{ background: "none", border: "none", color: "#c0392b", fontSize: "0.85rem", cursor: "pointer" }}>Clear Cart</button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ height: "fit-content" }}>
            <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e8e8e8", marginBottom: "1rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600, color: "#1a2e1a", marginBottom: "1.25rem" }}>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", fontSize: "0.88rem", color: "#6b7f72", borderBottom: "1px solid #f5f5f5" }}>
                  <span>{item.name} × {item.qty}</span>
                  <span style={{ color: "#1a2e1a", fontWeight: 500 }}>{item.price}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", fontSize: "0.9rem", color: "#6b7f72", borderBottom: "1px solid #e8e8e8", marginTop: "0.5rem" }}>
                <span>Delivery</span><span>KSh {delivery}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", fontSize: "1.05rem", fontWeight: 700, color: "#1a2e1a" }}>
                <span>Total</span><span style={{ color: "#2d6a4f" }}>KSh {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout */}
            <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid #e8e8e8" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#1a2e1a", marginBottom: "1rem" }}>Payment Method</h3>
              {["📱 M-Pesa", "💳 Credit/Debit Card", "💵 Cash on Delivery"].map((method, i) => (
                <label key={method} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.75rem", borderRadius: "8px", border: `1.5px solid ${i === 0 ? "#2d6a4f" : "#e8e8e8"}`, marginBottom: "0.5rem", cursor: "pointer", background: i === 0 ? "#f0faf3" : "white", fontSize: "0.9rem", fontWeight: i === 0 ? 500 : 400 }}>
                  <input type="radio" name="payment" defaultChecked={i === 0} style={{ accentColor: "#2d6a4f" }} />
                  {method}
                </label>
              ))}
              {cart.length > 0 && (
                <input placeholder="M-Pesa phone: 0712 345 678" style={{ width: "100%", padding: "0.75rem 1rem", border: "1.5px solid #e8e8e8", borderRadius: "8px", fontSize: "0.9rem", marginTop: "0.5rem", outline: "none", fontFamily: "var(--font-body)" }} />
              )}
              <button onClick={placeOrder} style={{ width: "100%", padding: "0.9rem", background: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", marginTop: "1rem", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
                onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
                Place Order →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}