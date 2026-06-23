import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar     from "./components/Navbar";
import Home       from "./pages/Home";
import Farmer     from "./pages/Farmer";
import Admin      from "./pages/Admin";
import Directory  from "./pages/Directory";
import Seller     from "./pages/Seller";
import Cart       from "./pages/Cart";
import Dashboard  from "./pages/Dashboard";
import Profile    from "./pages/Profile";
import Login      from "./pages/Login";
import Register   from "./pages/Register";
import RoleSelect from "./pages/RoleSelect";
import Success    from "./pages/Success";

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) { setCart(prev => prev.filter(p => p.id !== id)); }
  function updateQty(id, qty) {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  }
  function clearCart() { setCart([]); }
  function handleLogin(u) { setUser(u); }
  function handleLogout() { setUser(null); setCart([]); }

  const cartCount = cart.reduce((s, p) => s + p.qty, 0);

  return (
    <HashRouter>
      <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} />
      <Routes>
        <Route path="/"          element={<Home addToCart={addToCart} />} />
        <Route path="/farmer"    element={<Farmer />} />
        <Route path="/seller"    element={<Seller addToCart={addToCart} />} />
        <Route path="/cart"      element={<Cart cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onClear={clearCart} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile"   element={<Profile user={user} />} />
        <Route path="/admin"     element={<Admin user={user} onLogout={handleLogout} />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/auth"      element={<Navigate to="/role" />} />
        <Route path="/login"     element={<Login onLogin={handleLogin} />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/role"      element={<RoleSelect />} />
        <Route path="/success"   element={<Success />} />
      </Routes>
    </HashRouter>
  );
}
