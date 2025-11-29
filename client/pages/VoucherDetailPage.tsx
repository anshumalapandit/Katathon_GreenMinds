import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRDisplay from "../components/QRDisplay";

// Example: fetch voucher info from your data source or props.
// If you already have voucher list, replace this fetch with your existing logic.
const VOUCHERS = [
  { id: "v1", title: "Coffee Coupon", ecoCost: 100, cashAmount: 5 },
  { id: "v2", title: "Park Entry", ecoCost: 300, cashAmount: 10 },
];

function makeToken() {
  return "tkn_" + Math.random().toString(36).slice(2, 10);
}

export default function VoucherDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    const v = VOUCHERS.find((x) => x.id === id) || null;
    setVoucher(v);
  }, [id]);

  async function handleGenerateQR() {
    if (!voucher) return;
    const t = makeToken();
    const ttlMs = 1000 * 60 * 30; // 30 minutes
    const payload = { voucherId: voucher.id, createdAt: Date.now(), expiresAt: Date.now() + ttlMs, paid: false };
    localStorage.setItem("redeem_" + t, JSON.stringify(payload));
    setToken(t);
    setExpiresAt(Date.now() + ttlMs);
  }

  function handleProceedToPay() {
    if (!token) {
      alert("Please generate QR first.");
      return;
    }
    navigate(`/pay/${token}`);
  }

  if (!voucher) return <div style={{ padding: 20 }}>Voucher not found.</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>{voucher.title}</h2>
      <div style={{ color: "#555", marginBottom: 12 }}>
        EcoCoins required: <strong>{voucher.ecoCost}</strong>
      </div>

      {!token ? (
        <>
          <div>To claim this voucher you will pay ₹{voucher.cashAmount}.</div>
          <div style={{ marginTop: 16 }}>
            <button onClick={handleGenerateQR} style={{ padding: "8px 14px", background: "#2563eb", color: "#fff", borderRadius: 6 }}>
              Generate QR & Proceed
            </button>
          </div>
        </>
      ) : (
        <>
          <QRDisplay amount={voucher.cashAmount} expiresAt={expiresAt || undefined} />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button onClick={handleProceedToPay} style={{ padding: "10px 18px", background: "#059669", color: "#fff", borderRadius: 6 }}>
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
}