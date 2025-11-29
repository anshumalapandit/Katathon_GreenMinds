import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const key = "redeem_" + token;
      const raw = localStorage.getItem(key);
      if (!raw) throw new Error("Invalid redemption token.");
      const obj = JSON.parse(raw);
      if (Date.now() > obj.expiresAt) throw new Error("Token expired.");
      // simulate payment delay
      await new Promise((r) => setTimeout(r, 800));
      obj.paid = true;
      obj.paymentRef = "SIM-" + Date.now();
      obj.paidAt = Date.now();
      localStorage.setItem(key, JSON.stringify(obj));
      // navigate to success with payment ref
      navigate(`/success/${obj.paymentRef}`);
    } catch (err: any) {
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 480, margin: "0 auto" }}>
      <h3>Enter payment details</h3>
      <form onSubmit={handlePay} style={{ display: "grid", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name on card" />
        <input value={card} onChange={(e) => setCard(e.target.value)} required placeholder="Card number" />
        <input value={pin} onChange={(e) => setPin(e.target.value)} required placeholder="PIN" type="password" />
        <button disabled={loading} style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", borderRadius: 6 }}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}
