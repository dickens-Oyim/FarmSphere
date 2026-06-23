import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!form.name)    e.name    = "Full name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone || form.phone.length < 10) e.phone = "Valid phone number required";
    if (!form.password || form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    navigate("/success");
  }

  const inp = (name) => ({
    padding: "0.75rem 1rem", border: `1.5px solid ${errors[name] ? "#e74c3c" : "#e8e8e8"}`,
    borderRadius: "8px", fontSize: "0.95rem", width: "100%", outline: "none",
    fontFamily: "var(--font-body)", transition: "border-color 0.2s"
  });

  const fields = [
    { name: "name",     label: "Full Name",        type: "text",     placeholder: "Dickens Oyim" },
    { name: "email",    label: "Email Address",     type: "email",    placeholder: "dickens@example.com" },
    { name: "phone",    label: "Phone Number",      type: "text",     placeholder: "+254 700 000 000" },
    { name: "password", label: "Password",          type: "password", placeholder: "Min  characters" },
    { name: "confirm",  label: "Confirm Password",  type: "password", placeholder: "Repeat password" },
  ];

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem", background: "#f8f6f1" }}>
      <div className="fade" style={{ width: "100%", maxWidth: "480px", background: "white", borderRadius: "16px", padding: "2.5rem", border: "1px solid #e8e8e8" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "1.75rem" }}>
          <div style={{ width: "28px", height: "28px", background: "#2d6a4f", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>🌿</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "#2d6a4f", fontWeight: 700 }}>FarmSphere</span>
        </Link>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#1a2e1a" }}>Create Account</h2>
        <p style={{ color: "#6b7f72", fontSize: "0.88rem", margin: "0.3rem 0 1.5rem" }}>Join FarmSphere and start trading fresh produce.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {fields.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "#3d5046", display: "block", marginBottom: "5px" }}>{label}</label>
              <input style={inp(name)} type={type} placeholder={placeholder} value={form[name]}
                onChange={e => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: "" }); }}
                onFocus={e => { if (!errors[name]) e.target.style.borderColor = "#2d6a4f"; }}
                onBlur={e => { if (!errors[name]) e.target.style.borderColor = "#e8e8e8"; }} />
              {errors[name] && <span style={{ fontSize: "0.78rem", color: "#e74c3c", marginTop: "3px", display: "block" }}>{errors[name]}</span>}
            </div>
          ))}
          <button type="submit" style={{ width: "100%", padding: "0.85rem", background: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", marginTop: "0.5rem", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#3a8a65"}
            onMouseLeave={e => e.currentTarget.style.background = "#2d6a4f"}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "#6b7f72", marginTop: "1.25rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#2d6a4f", fontWeight: 500 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
