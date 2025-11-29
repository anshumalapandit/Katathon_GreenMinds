import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Gift,
  MapPin,
  Calendar,
  TrendingUp,
  Copy,
  CheckCircle,
  AlertCircle,
  Wind,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

interface RouteHistory {
  id: string;
  routeName: string;
  source: string;
  destination: string;
  ecoCoinsEarned: number;
  co2Saved: number;
  date: string;
  duration: string;
  status: "completed" | "pending";
}

interface Voucher {
  id: string;
  code: string;
  ecoCoins: number;
  status: "collected" | "redeemed";
  createdDate: string;
  redeemedDate?: string;
  giftVoucher?: {
    type: string;
    value: number;
    code: string;
  };
}

export default function EcoCoins() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"redeem" | "history">("redeem");
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // User's eco coins stats
  const userEcoCoinsBalance = 1250;
  const totalCoinsEarned = 4850;
  const totalCoinsRedeemed = 3600;

  // Mock route history data
  const routeHistory: RouteHistory[] = [
    {
      id: "1",
      routeName: "City Center to Airport Green Route",
      source: "Connaught Place, Delhi",
      destination: "Indira Gandhi International Airport",
      ecoCoinsEarned: 450,
      co2Saved: 8.5,
      date: "2025-11-27",
      duration: "45 mins",
      status: "completed",
    },
    {
      id: "2",
      routeName: "Home to Office - Eco Route",
      source: "Dwarka, Delhi",
      destination: "MG Road, Delhi",
      ecoCoinsEarned: 280,
      co2Saved: 5.2,
      date: "2025-11-26",
      duration: "32 mins",
      status: "completed",
    },
    {
      id: "3",
      routeName: "Shopping District Tour",
      source: "Khan Market",
      destination: "Select Citywalk Mall",
      ecoCoinsEarned: 320,
      co2Saved: 6.1,
      date: "2025-11-24",
      duration: "28 mins",
      status: "completed",
    },
    {
      id: "4",
      routeName: "Weekend Park Visit",
      source: "Home",
      destination: "Lodhi Gardens",
      ecoCoinsEarned: 200,
      co2Saved: 3.8,
      date: "2025-11-22",
      duration: "15 mins",
      status: "completed",
    },
  ];

  // Mock collected vouchers
  const collectedVouchers: Voucher[] = [
    {
      id: "v1",
      code: "ECOGREEN-2025-001",
      ecoCoins: 500,
      status: "collected",
      createdDate: "2025-11-20",
    },
    {
      id: "v2",
      code: "ECOCLEAN-2025-005",
      ecoCoins: 750,
      status: "collected",
      createdDate: "2025-11-18",
    },
    {
      id: "v3",
      code: "ECOTRAIL-2025-008",
      ecoCoins: 600,
      status: "collected",
      createdDate: "2025-11-15",
    },
  ];

  // Mock redeemed vouchers
  const redeemedVouchers: Voucher[] = [
    {
      id: "r1",
      code: "ECOBIO-2025-002",
      ecoCoins: 1000,
      status: "redeemed",
      createdDate: "2025-11-10",
      redeemedDate: "2025-11-14",
      giftVoucher: {
        type: "Amazon Gift Card",
        value: 1000,
        code: "AMAZ-ECO-12345",
      },
    },
    {
      id: "r2",
      code: "ECOPURE-2025-003",
      ecoCoins: 800,
      status: "redeemed",
      createdDate: "2025-11-05",
      redeemedDate: "2025-11-12",
      giftVoucher: {
        type: "Cafe Coffee Day Voucher",
        value: 500,
        code: "CCD-ECO-98765",
      },
    },
    {
      id: "r3",
      code: "ECOGREEN-2025-004",
      ecoCoins: 800,
      status: "redeemed",
      createdDate: "2025-11-08",
      redeemedDate: "2025-11-11",
      giftVoucher: {
        type: "Flipkart Voucher",
        value: 800,
        code: "FLIP-ECO-54321",
      },
    },
  ];

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-eco-teal to-eco-green rounded-full flex items-center justify-center mx-auto">
              <Leaf className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Sign In to Access Eco Coins</h2>
              <p className="text-foreground/70">View your eco coins, redeem vouchers, and track your environmental impact.</p>
            </div>

            <button
              onClick={() => navigate("/signin")}
              className="w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="w-full px-6 py-3 bg-white text-eco-green font-semibold rounded-lg border-2 border-eco-green hover:bg-eco-mint transition-colors"
            >
              Create Account
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleRedeemVoucher = () => {
    if (voucherCode.trim()) {
      // Simulate redeem logic
      setRedeemSuccess(true);
      setVoucherCode("");
      setTimeout(() => {
        setShowRedeemModal(false);
        setRedeemSuccess(false);
      }, 3000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">Eco Coins Hub</h1>
            <p className="text-lg text-foreground/60">Collect coins from green routes, redeem vouchers, and help plant trees across India</p>
          </div>

          {/* Eco Coins Balance Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Current Balance */}
            <div className="bg-gradient-to-br from-eco-green to-eco-teal rounded-2xl shadow-soft p-8 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium opacity-90">Current Balance</p>
                <Leaf className="w-5 h-5 opacity-70" />
              </div>
              <p className="text-5xl font-bold mb-2">💚 {userEcoCoinsBalance}</p>
              <p className="text-sm opacity-80">Ready to redeem</p>
            </div>

            {/* Total Earned */}
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Total Earned</p>
                <TrendingUp className="w-5 h-5 text-eco-green" />
              </div>
              <p className="text-5xl font-bold text-foreground mb-2">{totalCoinsEarned}</p>
              <p className="text-sm text-foreground/60">from green routes</p>
            </div>

            {/* Total Redeemed */}
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Total Redeemed</p>
                <Gift className="w-5 h-5 text-eco-green" />
              </div>
              <p className="text-5xl font-bold text-foreground mb-2">{totalCoinsRedeemed}</p>
              <p className="text-sm text-foreground/60">redeemed to govt</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("redeem")}
              className={cn(
                "px-6 py-3 font-semibold transition-all relative",
                activeTab === "redeem"
                  ? "text-eco-green"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              Redeem Vouchers
              {activeTab === "redeem" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-eco-green rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={cn(
                "px-6 py-3 font-semibold transition-all relative",
                activeTab === "history"
                  ? "text-eco-green"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              Route History
              {activeTab === "history" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-eco-green rounded-t-full"></div>
              )}
            </button>
          </div>

          {/* Redeem Vouchers Tab */}
          {activeTab === "redeem" && (
            <div className="space-y-8">
              {/* Redeem New Voucher Section */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
                <h2 className="text-2xl font-bold text-foreground mb-2">Collected Vouchers</h2>
                <p className="text-foreground/60 mb-6">Redeem your collected vouchers to contribute to tree plantation and get gift rewards</p>

                {/* Redeem Button */}
                <button
                  onClick={() => setShowRedeemModal(true)}
                  className="w-full px-6 py-4 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-all flex items-center justify-center gap-2 mb-8"
                >
                  <Zap className="w-5 h-5" />
                  Redeem a Voucher
                </button>

                {/* Collected Vouchers List */}
                {collectedVouchers.length > 0 ? (
                  <div className="grid gap-4">
                    {collectedVouchers.map((voucher) => (
                      <div
                        key={voucher.id}
                        className="bg-gradient-to-r from-eco-green/10 to-eco-teal/10 rounded-xl p-6 border border-eco-green/30 hover:shadow-soft transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-foreground/70 font-medium">Voucher Code</p>
                            <p className="font-mono font-bold text-lg text-foreground mb-3">{voucher.code}</p>
                            <p className="text-sm text-foreground/60">Collected on {new Date(voucher.createdDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-bold text-eco-green">💚 {voucher.ecoCoins}</div>
                            <p className="text-xs text-foreground/60 mt-1">Eco Coins</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(voucher.code)}
                          className="mt-4 px-4 py-2 bg-white hover:bg-eco-mint text-eco-green font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-eco-mint/10 rounded-lg border border-eco-green/20">
                    <Gift className="w-12 h-12 text-eco-green/30 mx-auto mb-3" />
                    <p className="text-foreground/60">No collected vouchers yet</p>
                  </div>
                )}
              </div>

              {/* Redeemed Vouchers Section */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
                <h2 className="text-2xl font-bold text-foreground mb-2">Redeemed Vouchers & Gifts</h2>
                <p className="text-foreground/60 mb-6">Your coins have been used for tree plantation. Here are your gift rewards</p>

                {redeemedVouchers.length > 0 ? (
                  <div className="grid gap-4">
                    {redeemedVouchers.map((voucher) => (
                      <div
                        key={voucher.id}
                        className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-eco-green/30"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-eco-green" />
                              <p className="font-mono font-bold text-foreground">{voucher.code}</p>
                            </div>
                            <p className="text-sm text-foreground/70">
                              Redeemed on {new Date(voucher.redeemedDate!).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-eco-green">{voucher.ecoCoins}</p>
                            <p className="text-xs text-foreground/60">Eco Coins Donated</p>
                          </div>
                        </div>

                        {/* Gift Reward */}
                        {voucher.giftVoucher && (
                          <div className="mt-4 p-4 bg-white rounded-lg border border-eco-green/20">
                            <p className="text-sm text-foreground/70 font-medium mb-2">Your Gift Reward:</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{voucher.giftVoucher.type}</p>
                                <p className="text-sm text-eco-green font-bold">₹{voucher.giftVoucher.value}</p>
                              </div>
                              <button
                                onClick={() => copyToClipboard(voucher.giftVoucher!.code)}
                                className="px-3 py-2 bg-eco-green text-white text-xs font-medium rounded hover:bg-eco-teal transition-colors flex items-center gap-1"
                              >
                                <Copy className="w-3 h-3" />
                                Copy
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Impact Info */}
                        <div className="mt-4 p-4 bg-eco-mint/20 rounded-lg border border-eco-green/20">
                          <p className="text-xs font-semibold text-foreground/70 mb-2">Government Initiative Impact:</p>
                          <p className="text-sm text-foreground/70">
                            ✓ {Math.floor(voucher.ecoCoins / 20)} trees to be planted across India
                          </p>
                          <p className="text-sm text-foreground/70">
                            ✓ CO₂ offset: {(voucher.ecoCoins * 0.025).toFixed(1)} kg over 10 years
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-eco-mint/10 rounded-lg border border-eco-green/20">
                    <CheckCircle className="w-12 h-12 text-eco-green/30 mx-auto mb-3" />
                    <p className="text-foreground/60">No redeemed vouchers yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Route History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
                <h2 className="text-2xl font-bold text-foreground mb-2">Your Green Routes</h2>
                <p className="text-foreground/60 mb-8">See how much you've earned and the environmental impact you've made</p>

                {/* Route History List */}
                {routeHistory.length > 0 ? (
                  <div className="space-y-4">
                    {routeHistory.map((route) => (
                      <div
                        key={route.id}
                        className="border border-border rounded-xl p-6 hover:shadow-soft transition-all hover:border-eco-green/50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                          {/* Route Info */}
                          <div className="md:col-span-2">
                            <h3 className="font-bold text-foreground text-lg mb-3">{route.routeName}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-foreground/70">
                                <MapPin className="w-4 h-4 text-eco-green" />
                                <span>{route.source}</span>
                              </div>
                              <div className="flex items-center gap-2 text-foreground/70 ml-6 text-xs">
                                ↓
                              </div>
                              <div className="flex items-center gap-2 text-foreground/70">
                                <MapPin className="w-4 h-4 text-eco-teal" />
                                <span>{route.destination}</span>
                              </div>
                              <div className="flex items-center gap-2 text-foreground/60 text-xs mt-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(route.date).toLocaleDateString()} • {route.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Eco Coins Earned */}
                          <div className="text-center p-4 bg-eco-green/10 rounded-lg border border-eco-green/20">
                            <p className="text-sm text-foreground/70 font-medium mb-1">Eco Coins</p>
                            <p className="text-3xl font-bold text-eco-green">💚 {route.ecoCoinsEarned}</p>
                          </div>

                          {/* CO2 Saved */}
                          <div className="text-center p-4 bg-eco-teal/10 rounded-lg border border-eco-teal/20">
                            <p className="text-sm text-foreground/70 font-medium mb-1">CO₂ Saved</p>
                            <div className="flex items-center justify-center gap-1">
                              <Wind className="w-4 h-4 text-eco-teal" />
                              <p className="text-2xl font-bold text-eco-teal">{route.co2Saved} kg</p>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                          {route.status === "completed" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-eco-green" />
                              <span className="text-sm text-eco-green font-semibold">Completed & Coins Credited</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-yellow-600 font-semibold">Pending Verification</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-eco-mint/10 rounded-lg border border-eco-green/20">
                    <MapPin className="w-12 h-12 text-eco-green/30 mx-auto mb-3" />
                    <p className="text-foreground/60">No green routes taken yet</p>
                    <button
                      onClick={() => navigate("/green-route")}
                      className="mt-4 px-6 py-2 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-colors"
                    >
                      Take a Green Route
                    </button>
                  </div>
                )}
              </div>

              {/* Environmental Impact Summary */}
              <div className="bg-gradient-to-br from-eco-green/10 to-eco-teal/10 rounded-2xl shadow-soft p-8 border border-eco-green/20">
                <h3 className="text-xl font-bold text-foreground mb-6">Your Total Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Leaf className="w-8 h-8 text-eco-green mx-auto mb-2" />
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {Math.floor(routeHistory.reduce((sum, r) => sum + r.ecoCoinsEarned, 0) / 20)}
                    </p>
                    <p className="text-sm text-foreground/70">Trees to be Planted</p>
                  </div>
                  <div className="text-center">
                    <Wind className="w-8 h-8 text-eco-teal mx-auto mb-2" />
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {routeHistory.reduce((sum, r) => sum + r.co2Saved, 0).toFixed(1)} kg
                    </p>
                    <p className="text-sm text-foreground/70">CO₂ Offset</p>
                  </div>
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-eco-green mx-auto mb-2" />
                    <p className="text-3xl font-bold text-foreground mb-1">{routeHistory.length}</p>
                    <p className="text-sm text-foreground/70">Green Routes Taken</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Redeem Voucher Modal */}
        {showRedeemModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
              {redeemSuccess ? (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-eco-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Voucher Redeemed!</h3>
                    <p className="text-foreground/70 mb-4">Your coins will contribute to tree plantation and environmental initiatives across India.</p>
                    <p className="text-sm text-foreground/60">A gift voucher will be sent to your registered email.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Redeem Your Voucher</h3>
                  <p className="text-foreground/60 mb-6">Enter your voucher code to redeem your eco coins and receive a gift voucher</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Voucher Code</label>
                      <input
                        type="text"
                        placeholder="e.g., ECOGREEN-2025-001"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      />
                    </div>

                    <button
                      onClick={handleRedeemVoucher}
                      disabled={!voucherCode.trim()}
                      className={cn(
                        "w-full py-3 px-6 font-semibold rounded-lg transition-all",
                        voucherCode.trim()
                          ? "bg-eco-green text-white hover:bg-eco-teal"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      Redeem Now
                    </button>

                    <button
                      onClick={() => setShowRedeemModal(false)}
                      className="w-full py-2 px-6 bg-gray-100 text-foreground font-semibold rounded-lg hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-eco-mint/20 rounded-lg border border-eco-green/20">
                    <p className="text-xs text-foreground/70 font-semibold mb-2">How it works:</p>
                    <ul className="text-xs text-foreground/60 space-y-1">
                      <li>✓ Redeem voucher → Coins sent to government</li>
                      <li>✓ Government plants trees nationwide</li>
                      <li>✓ You receive gift voucher reward</li>
                      <li>✓ Receive tax certificate & impact report</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
