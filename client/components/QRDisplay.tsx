import React from "react";
import qrImg from "../src/assets/qrcode.png"; // <-- Correct import path

type Props = {
  amount: number;
  expiresAt?: number; // optional expiry time in ms
};

export default function QRDisplay({ amount, expiresAt }: Props) {
  const secondsLeft = expiresAt
    ? Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
    : null;

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        textAlign: "center",
        padding: 20,
      }}
    >
      <div style={{ marginBottom: 12, color: "#333" }}>
        <div style={{ fontSize: 18 }}>To claim this voucher pay</div>
        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>
          ₹{amount}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          padding: 12,
          display: "inline-block",
          borderRadius: 8,
        }}
      >
        <img
          src={qrImg}
          alt="QR Code"
          style={{ width: 240, height: 240, objectFit: "contain" }}
        />
      </div>

      {secondsLeft !== null && (
        <div style={{ marginTop: 10, color: "#666", fontSize: 13 }}>
          {secondsLeft > 0
            ? `QR expires in ${Math.floor(secondsLeft / 60)}m ${
                secondsLeft % 60
              }s`
            : "QR expired"}
        </div>
      )}
    </div>
  );
}
