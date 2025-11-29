import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentSuccessPage() {
  const { paymentRef } = useParams<{ paymentRef: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/dashboard"), 2500); // or change '/dashboard' to your dashboard route
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Payment successful</h2>
      <p>Transaction ID: <strong>{paymentRef}</strong></p>
      <p>Your voucher has been claimed successfully. Redirecting you to dashboard…</p>
    </div>
  );
}
