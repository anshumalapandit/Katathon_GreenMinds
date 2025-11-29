import React from "react";
import { Link } from "react-router-dom";

/**
 * If you have a user context that exposes ecoCoins, replace the stub below
 * with your real hook/import (example: import { useUserContext } from "../context/UserContext")
 */
// OPTIONAL: Try to read ecoCoins from a context if available.
// If you don't have such a hook, the page still works (shows all vouchers).
function useUserEcoCoins(): number | null {
  try {
    // @ts-ignore
    const mod = require("../context/UserContext");
    if (mod && typeof mod.useUserContext === "function") {
      // @ts-ignore
      return mod.useUserContext()?.ecoCoins ?? null;
    }
  } catch {
    // ignore if not present
  }
  return null;
}

type Voucher = {
  id: string;
  title: string;
  ecoCost: number;
  cashAmount: number;
  description?: string;
};

const VOUCHERS: Voucher[] = [
  { id: "v1", title: "Coffee Coupon", ecoCost: 100, cashAmount: 5, description: "₹5 coffee at partner cafes" },
  { id: "v2", title: "Park Entry Pass", ecoCost: 300, cashAmount: 10, description: "One-day entry to City Park" },
  { id: "v3", title: "Eco Shop Discount", ecoCost: 50, cashAmount: 5, description: "5% discount at EcoShop" },
];

export default function VouchersPage() {
  const ecoCoins = useUserEcoCoins();
  // If ecoCoins is available, filter vouchers affordable by the user.
  const list = typeof ecoCoins === "number" ? VOUCHERS.filter(v => v.ecoCost <= ecoCoins) : VOUCHERS;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Available Vouchers</h1>

      {ecoCoins !== null && (
        <div style={{ marginBottom: 12, color: "#333" }}>
          Your EcoCoins: <strong>{ecoCoins}</strong>
        </div>
      )}

      {list.length === 0 ? (
        <div style={{ padding: 12, background: "#fff7e6", borderRadius: 6 }}>
          No vouchers are available for your EcoCoins balance right now.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {list.map((v) => (
            <div
              key={v.id}
              style={{
                border: "1px solid #e6e6e6",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff"
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{v.title}</div>
                <div style={{ color: "#666", fontSize: 13 }}>{v.description}</div>
                <div style={{ marginTop: 6, color: "#444", fontSize: 13 }}>
                  Cost: <strong>{v.ecoCost}</strong> EcoCoins • Pay ₹{v.cashAmount}
                </div>
              </div>

              <div>
                <Link to={`/voucher/${v.id}`}>
                  <button style={{ padding: "8px 12px", background: "#2563eb", color: "#fff", borderRadius: 6, border: "none" }}>
                    Claim
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
