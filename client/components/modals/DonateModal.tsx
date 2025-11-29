import { useState } from "react";
import { X, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<"amount" | "success">("amount");
  const [generatedQR, setGeneratedQR] = useState<string>("");

  const presets = [5, 10, 25, 50];

  const handleGenerateQR = () => {
    const voucherCode = `ECO-${Date.now().toString().slice(-6).toUpperCase()}`;
    setGeneratedQR(voucherCode);
    setStep("success");
  };

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-title"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-eco-yellow to-yellow-400 p-6 flex items-center justify-between">
          <h2 id="donate-title" className="text-2xl font-headline font-bold text-black">
            <Gift className="w-6 h-6 inline mr-2" />
            Donate to Green City
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-yellow-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-yellow"
            aria-label="Close donate modal"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === "amount" && (
            <>
              <p className="text-foreground/70 text-sm">
                Every dollar funds tree planting, park maintenance, and clean-air
                programs in partner cities.
              </p>

              {/* Amount Presets */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Choose Amount
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                      className={cn(
                        "py-3 px-4 rounded-lg font-semibold transition-all border-2",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow",
                        amount === preset && !customAmount
                          ? "bg-eco-yellow text-black border-eco-yellow"
                          : "bg-white border-border text-foreground hover:border-eco-yellow"
                      )}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-gray-50 border border-border rounded-lg text-foreground/60 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setAmount(0);
                    }}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow"
                  />
                </div>
              </div>

              {/* Impact Summary */}
              <div className="bg-eco-mint/30 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Your Impact:
                </p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>✓ ${finalAmount} funds green initiatives</li>
                  <li>✓ You'll receive a QR voucher</li>
                  <li>✓ Real-time impact tracking dashboard</li>
                  <li>
                    ✓ Tax-deductible donation (in eligible regions)
                  </li>
                </ul>
              </div>

              {/* Trust Message */}
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-foreground/60">
                <p>
                  💳 <strong>Secure payment:</strong> We do not store payment details.
                  Payments processed by Stripe. Health info is opt-in and can be
                  deleted anytime.
                </p>
              </div>

              <button
                onClick={handleGenerateQR}
                disabled={finalAmount <= 0}
                className={cn(
                  "w-full px-6 py-4 font-semibold rounded-lg transition-all",
                  finalAmount > 0
                    ? "bg-eco-yellow text-black hover:bg-yellow-600 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                Generate QR Voucher (${finalAmount})
              </button>
            </>
          )}

          {step === "success" && (
            <>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-eco-mint rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-8 h-8 text-eco-green" />
                </div>

                <h3 className="text-2xl font-bold text-eco-green">
                  Thank You!
                </h3>

                <p className="text-foreground/70">
                  Your ${finalAmount} donation is confirmed. Here's your voucher:
                </p>

                {/* QR Code Display */}
                <div className="bg-white border-4 border-eco-yellow rounded-xl p-6 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-32 h-32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="200" height="200" fill="white" />
                    {/* Simplified QR pattern */}
                    <defs>
                      <pattern
                        id="qr-demo"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="10" height="20" fill="black" />
                        <rect x="10" y="0" width="10" height="10" fill="black" />
                      </pattern>
                    </defs>
                    {/* Corner markers */}
                    {[
                      [0, 0],
                      [140, 0],
                      [0, 140],
                    ].map((pos, i) => (
                      <g key={i}>
                        <rect
                          x={pos[0]}
                          y={pos[1]}
                          width="40"
                          height="40"
                          fill="none"
                          stroke="black"
                          strokeWidth="3"
                        />
                        <rect
                          x={pos[0] + 6}
                          y={pos[1] + 6}
                          width="28"
                          height="28"
                          fill="black"
                        />
                        <rect
                          x={pos[0] + 12}
                          y={pos[1] + 12}
                          width="16"
                          height="16"
                          fill="white"
                        />
                      </g>
                    ))}
                    {/* Data area */}
                    <rect
                      x="50"
                      y="50"
                      width="100"
                      height="100"
                      fill="url(#qr-demo)"
                    />
                  </svg>
                </div>

                {/* Voucher Details */}
                <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                  <div>
                    <p className="text-xs text-foreground/60">Voucher Code</p>
                    <p className="text-lg font-mono font-bold text-eco-green">
                      {generatedQR}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Expires</p>
                    <p className="text-sm font-medium">
                      {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-foreground/60 bg-eco-mint/30 rounded p-3">
                  This demo simulates donation flow. Scan the QR or share the code
                  to redeem at partner organizations.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep("amount");
                    setGeneratedQR("");
                  }}
                  className="flex-1 px-6 py-3 text-foreground border-2 border-border rounded-lg hover:bg-eco-mint transition-all"
                >
                  Make Another Donation
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-all"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
