import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Wind,
  Check,
  Copy,
  X,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import qrCodeImage from "@/src/assets/qrcode.png";

export default function Donate() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // User's eco coins balance (earned from green routes, CO2 savings, etc.)
  const userEcoCoinsBalance = 1250;
  
  // User's environmental stats
  const userStats = {
    treesPlanted: 248,
    co2Saved: 12.4,
    routesTaken: 45,
  };

  const presets = [
    { amount: 100, label: "₹100" },
    { amount: 250, label: "₹250" },
    { amount: 500, label: "₹500" },
    { amount: 1000, label: "₹1000" },
  ];

  const finalAmount = customAmount ? parseInt(customAmount) : donationAmount || 0;

  const generateVoucher = () => {
    const code = `DONATE-${Date.now().toString().slice(-8).toUpperCase()}`;
    setVoucherCode(code);
  };

  const inspirationalQuotes = [
    "Every rupee donated plants seeds of change.",
    "Your generosity today creates cleaner air tomorrow.",
    "Small donations, big environmental impact.",
    "Giving back to nature means living better.",
    "Together, we breathe easier.",
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const copyToClipboard = () => {
    if (voucherCode) {
      navigator.clipboard.writeText(voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              <h2 className="text-2xl font-bold text-foreground mb-2">Sign In to Donate</h2>
              <p className="text-foreground/70">Create an account to support environmental initiatives and track your impact.</p>
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">Support Our Mission</h1>
            <p className="text-lg text-foreground/60">Donate to help us plant trees, improve air quality, and build a greener India</p>
          </div>

          {/* User Stats Card - Shows Eco Coins Earned from Activities */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8 border border-eco-green/20">
            <h3 className="text-lg font-bold text-foreground mb-6">Your Eco Stats (from Green Routes & Activities)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Eco Coins Earned */}
              <div className="text-center p-4 bg-eco-mint/30 rounded-xl border border-eco-green/30">
                <div className="text-4xl font-bold text-eco-green mb-2">💚 {userEcoCoinsBalance}</div>
                <p className="text-sm text-foreground/70 font-medium">Eco Coins Earned</p>
                <p className="text-xs text-foreground/50 mt-1">(from green routes & CO2 savings)</p>
              </div>

              {/* Trees Planted */}
              <div className="text-center p-4 bg-eco-mint/30 rounded-xl border border-eco-green/30">
                <Leaf className="w-8 h-8 text-eco-green mx-auto mb-2" />
                <div className="text-3xl font-bold text-eco-green mb-1">{userStats.treesPlanted}</div>
                <p className="text-sm text-foreground/70 font-medium">Trees Planted</p>
              </div>

              {/* CO2 Saved */}
              <div className="text-center p-4 bg-eco-mint/30 rounded-xl border border-eco-green/30">
                <Wind className="w-8 h-8 text-eco-green mx-auto mb-2" />
                <div className="text-3xl font-bold text-eco-green mb-1">{userStats.co2Saved} kg</div>
                <p className="text-sm text-foreground/70 font-medium">CO₂ Offset</p>
              </div>
            </div>
          </div>

          {/* Donation Section */}
          {!paymentComplete ? (
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20">
              <h2 className="text-2xl font-bold text-foreground mb-2">Make a Donation</h2>
              <p className="text-foreground/60 mb-8">Choose how much you'd like to donate to support environmental initiatives</p>

              {/* Preset Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {presets.map((preset) => (
                  <button
                    key={preset.amount}
                    onClick={() => {
                      setDonationAmount(preset.amount);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-center",
                      donationAmount === preset.amount && !customAmount
                        ? "border-eco-green bg-eco-green/10"
                        : "border-border hover:border-eco-green"
                    )}
                  >
                    <div className="font-bold text-lg text-foreground">{preset.label}</div>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3">Or enter custom amount</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60">₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount(null);
                      }}
                      className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    />
                  </div>
                </div>
              </div>

              {/* Donation Summary */}
              {finalAmount > 0 && (
                <div className="bg-eco-mint/20 rounded-xl p-6 mb-8 border border-eco-green/30">
                  <div className="mb-4">
                    <p className="text-sm text-foreground/70 mb-2">Donation Amount</p>
                    <p className="text-4xl font-bold text-foreground">₹{finalAmount}</p>
                  </div>
                  <div className="text-sm text-foreground/70 bg-white/60 p-3 rounded-lg">
                    <p>✓ 90% goes to environmental initiatives</p>
                    <p>✓ 10% covers operations</p>
                    <p>✓ Transparent tracking of impact</p>
                  </div>
                </div>
              )}

              {/* Donate Button */}
              <button
                onClick={() => {
                  if (finalAmount > 0) {
                    generateVoucher();
                    setShowQRModal(true);
                  }
                }}
                disabled={finalAmount === 0}
                className={cn(
                  "w-full py-3 px-6 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                  finalAmount > 0
                    ? "bg-eco-green text-white hover:bg-eco-teal shadow-soft hover:shadow-soft-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <Gift className="w-5 h-5" />
                Proceed to Payment
              </button>
            </div>
          ) : (
            /* Success Screen */
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-eco-green/20 text-center">
              <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-eco-green" />
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-2">Thank You! 🙏</h2>
              <p className="text-lg text-eco-green font-semibold mb-6">Your donation has been received</p>

              {/* Success Stats */}
              <div className="bg-eco-mint/20 rounded-xl p-6 mb-8 border border-eco-green/30">
                <div className="mb-6">
                  <p className="text-sm text-foreground/70 mb-2">Amount Donated</p>
                  <p className="text-4xl font-bold text-foreground">₹{finalAmount}</p>
                </div>

                <div className="text-sm text-foreground/70 bg-white/60 p-4 rounded-lg">
                  <p className="font-semibold text-foreground mb-3">Your donation will:</p>
                  <p>✓ Plant {Math.floor(finalAmount / 20)} trees</p>
                  <p>✓ Offset {(finalAmount * 0.02).toFixed(2)} kg of CO₂</p>
                  <p>✓ Support clean air initiatives for {Math.floor(finalAmount / 50)} people</p>
                </div>
              </div>

              {/* Donation Receipt */}
              {voucherCode && (
                <div className="bg-gradient-to-br from-eco-green/10 to-eco-teal/10 rounded-xl p-6 mb-8 border border-eco-green/30">
                  <p className="text-sm text-foreground/70 mb-3">Your Donation Receipt</p>
                  <div className="flex items-center gap-2 justify-center">
                    <code className="text-lg font-bold text-eco-green">{voucherCode}</code>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5 text-eco-green" />
                    </button>
                  </div>
                  {copied && <p className="text-sm text-eco-green mt-2">✓ Copied to clipboard!</p>}
                  <p className="text-xs text-foreground/60 mt-3">Save this code for your records</p>
                </div>
              )}

              {/* Inspirational Quote */}
              <div className="bg-white border-l-4 border-eco-green p-6 rounded-lg mb-8">
                <p className="text-lg italic text-foreground/70">"{randomQuote}"</p>
                <p className="text-sm text-foreground/50 mt-2">— eco Yatra</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-all"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => {
                    setPaymentComplete(false);
                    setDonationAmount(null);
                    setCustomAmount("");
                    setShowQRModal(false);
                    setVoucherCode(null);
                  }}
                  className="px-6 py-3 bg-white text-eco-green font-semibold rounded-lg border-2 border-eco-green hover:bg-eco-mint transition-all"
                >
                  Donate Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* QR Modal */}
        {showQRModal && !paymentComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Scan to Pay</h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-foreground/60" />
                </button>
              </div>

              {/* QR Code Image */}
              <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
                <img 
                  src={qrCodeImage} 
                  alt="QR Code for Payment" 
                  className="w-48 h-48 object-contain"
                />
              </div>

              {/* Payment Amount */}
              <div className="bg-eco-mint/20 rounded-lg p-4 mb-6 text-center border border-eco-green/30">
                <p className="text-sm text-foreground/70 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-foreground">₹{finalAmount}</p>
              </div>

              {/* Instructions */}
              <p className="text-center text-sm text-foreground/70 mb-6">
                Scan this QR code with any UPI app to complete your donation
              </p>

              {/* Confirmation Button */}
              <button
                onClick={() => setPaymentComplete(true)}
                className="w-full py-3 px-6 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-all mb-3"
              >
                Payment Done
              </button>

              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-2 px-6 bg-gray-100 text-foreground font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
