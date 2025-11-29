import { useState } from "react";
import { Heart, Gift, Mic, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeatureDeepDives() {
  const [selectedCondition, setSelectedCondition] = useState<string>("");

  const conditions = [
    { id: "asthma", label: "Asthma Mode", description: "Avoid high PM2.5 and allergens" },
    { id: "heart", label: "Heart-Sensitive", description: "Minimize exertion and air pollution" },
    { id: "elderly", label: "Elderly-Friendly", description: "Flat, accessible routes" },
    { id: "pregnancy", label: "Pregnancy Safe", description: "Reduced pollution exposure" },
    { id: "allergies", label: "Allergy Profile", description: "Avoid pollen and ozone peaks" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        {/* Feature 1: Personalized Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Health Profile Preview */}
            <div className="bg-gradient-to-br from-eco-mint to-white rounded-2xl border border-border p-8 shadow-soft">
              <h3 className="text-2xl font-headline font-bold text-foreground mb-6">
                Your Health Profile
              </h3>

              {/* Health Conditions Grid */}
              <div className="space-y-3 mb-8">
                {conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() =>
                      setSelectedCondition(
                        selectedCondition === condition.id ? "" : condition.id
                      )
                    }
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                      selectedCondition === condition.id
                        ? "bg-eco-green/10 border-eco-green text-eco-green"
                        : "bg-white border-border text-foreground hover:border-eco-teal"
                    )}
                  >
                    <div className="font-semibold text-sm">{condition.label}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {condition.description}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-foreground/60 bg-eco-mint/50 rounded-lg p-4">
                💡 Health info is stored only if you authorize and can be deleted
                anytime.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-6">
              <Heart className="w-8 h-8 inline text-eco-green mr-2" />
              Personalized Green Routes
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Choose routes that reduce your pollution exposure — personalized
              for your health. We weight every path for asthma, allergies, heart
              health, mobility, and pregnancy.
            </p>

            {/* Route Comparison */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-medium text-foreground/60 mb-3">
                <span>Route Comparison</span>
                <span>Health Score</span>
              </div>

              {/* Route A */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-red-700">Route A (Fastest)</h4>
                    <p className="text-sm text-red-600">25 min • 3.2 km</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">4.2/10</div>
                    <div className="text-xs text-red-500">High pollution</div>
                  </div>
                </div>
                <div className="text-xs text-red-600 space-y-1">
                  <div>PM2.5 exposure: 145 µg/m³</div>
                  <div>Fuel estimate: 0.8L</div>
                </div>
              </div>

              {/* Route B */}
              <div className="bg-eco-mint border-2 border-eco-green rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-eco-green">
                      Route B (Green)
                    </h4>
                    <p className="text-sm text-eco-teal">32 min • 4.1 km</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-eco-green">8.7/10</div>
                    <div className="text-xs text-eco-teal">Low pollution</div>
                  </div>
                </div>
                <div className="text-xs text-eco-green space-y-1">
                  <div>PM2.5 exposure: 48 µg/m³</div>
                  <div>Fuel estimate: 0.3L</div>
                </div>
              </div>
            </div>

            <button
              className={cn(
                "w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg",
                "hover:bg-eco-teal transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                "shadow-soft hover:shadow-soft-lg"
              )}
            >
              Choose Green Route
            </button>
          </div>
        </div>

        {/* Feature 2: QR Donation & Vouchers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-6">
              <Gift className="w-8 h-8 inline text-eco-yellow mr-2" />
              QR Donation & Voucher
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Donate to city greening programs. Scan QR to redeem a voucher.
              Secure: payments handled by partners. In production, this
              integrates with government redemption APIs.
            </p>

            {/* Donation Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-eco-yellow rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-foreground mb-4">
                Choose Amount
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {["$5", "$10", "$25"].map((amount) => (
                  <button
                    key={amount}
                    className={cn(
                      "py-2 rounded-lg font-semibold transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow",
                      "border-2 hover:border-eco-yellow hover:bg-eco-yellow/5"
                    )}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Custom Amount
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-white border border-border rounded-lg text-foreground/60">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="50"
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow"
                  />
                </div>
              </div>

              <button
                className={cn(
                  "w-full px-6 py-3 bg-eco-yellow text-foreground font-semibold rounded-lg",
                  "hover:bg-yellow-600 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-yellow",
                  "shadow-soft hover:shadow-soft-lg"
                )}
              >
                Generate QR Voucher
              </button>

              <p className="text-xs text-foreground/60 mt-4 text-center">
                This demo simulates donation flow. In production we integrate
                secure 3rd-party payment and government redemption API.
              </p>
            </div>

            <p className="text-sm text-foreground/60 bg-eco-mint/50 rounded-lg p-4">
              Partnered with X City Pilot for green initiative funding
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* QR Code Mockup */}
            <div className="bg-white rounded-2xl border-4 border-eco-yellow p-6 shadow-soft-lg mb-6 max-w-xs">
              <div className="bg-white aspect-square rounded-lg border-8 border-white flex items-center justify-center">
                {/* Simplified QR visual */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="200" height="200" fill="white" />
                  <defs>
                    <pattern
                      id="qr-pattern"
                      x="0"
                      y="0"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        width="5"
                        height="5"
                        fill={Math.random() > 0.5 ? "black" : "white"}
                      />
                    </pattern>
                  </defs>

                  {/* Corner markers */}
                  {[
                    [0, 0],
                    [160, 0],
                    [0, 160],
                  ].map((pos, i) => (
                    <g key={i}>
                      <rect
                        x={pos[0]}
                        y={pos[1]}
                        width="40"
                        height="40"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <rect
                        x={pos[0] + 5}
                        y={pos[1] + 5}
                        width="30"
                        height="30"
                        fill="black"
                      />
                      <rect
                        x={pos[0] + 10}
                        y={pos[1] + 10}
                        width="20"
                        height="20"
                        fill="white"
                      />
                    </g>
                  ))}

                  {/* Data area */}
                  <rect x="50" y="50" width="100" height="100" fill="url(#qr-pattern)" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-2">
                Scan to claim voucher
              </p>
              <div className="text-sm text-foreground/60 space-y-1">
                <p>Voucher Code: ECO-2024-AZ9X2</p>
                <p>Expires: 2025-02-28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: AI Accessibility Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            {/* Voice UI Mockup */}
            <div className="bg-gradient-to-br from-blue-50 to-eco-mint rounded-2xl border border-border p-8 shadow-soft">
              <div className="flex flex-col items-center mb-8">
                {/* Mic button */}
                <button
                  className={cn(
                    "w-20 h-20 rounded-full bg-gradient-to-br from-eco-teal to-eco-green",
                    "flex items-center justify-center text-white mb-6",
                    "hover:scale-110 transition-transform shadow-soft-lg",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-eco-teal focus-visible:ring-offset-4",
                    "animate-pulse"
                  )}
                  aria-label="Talk to eco Yatra - voice assistant"
                >
                  <Mic className="w-8 h-8" />
                </button>

                <p className="text-sm font-medium text-foreground text-center mb-6">
                  Talk to eco Yatra
                </p>
              </div>

              {/* Chat Bubble */}
              <div className="bg-white rounded-2xl rounded-tl-none p-4 mb-4 border border-border">
                <p className="text-sm text-foreground">
                  "I found a low-pollution route to Downtown Station. It's 5
                  minutes longer, but reduces your PM2.5 exposure by 60%. Would
                  you like directions?"
                </p>
              </div>

              {/* Transcript Area */}
              <div className="bg-eco-mint/30 rounded-lg p-4 text-xs text-foreground/60 font-mono">
                <p>
                  [Listening...] "Show me a green route to the hospital"
                </p>
              </div>

              <div className="mt-4 text-xs text-foreground/50 text-center">
                Keyboard shortcut: Ctrl+M • Works with screen readers
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-6">
              <Mic className="w-8 h-8 inline text-eco-teal mr-2" />
              AI Assistant for Accessibility
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Voice-first interface with transcription, TTS playback, and
              natural-language routing. Built for low-vision and mobility
              users.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-eco-mint/30 rounded-xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-2">
                  What you can say:
                </h3>
                <ul className="text-sm text-foreground/70 space-y-2">
                  <li>✓ "Show me the greenest route to..."</li>
                  <li>✓ "What's the air quality now?"</li>
                  <li>✓ "Report a traffic jam at..."</li>
                  <li>✓ "Find nearby parks"</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-foreground/60 bg-eco-mint/50 rounded-lg p-4">
              Tap the "Talk to eco Yatra" button to speak your request. Works
              with screen readers and voice commands.
            </p>
          </div>
        </div>

        {/* Feature 4: Community Reporting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-6">
              <AlertCircle className="w-8 h-8 inline text-eco-yellow mr-2" />
              Community Reporting
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed mb-8">
              Report environmental issues in real-time. Pollution hotspots,
              blocked routes, wrong map data, or safety hazards. Moderation
              workflow ensures quality and impact.
            </p>

            {/* Report Form */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What did you observe?
                </label>
                <textarea
                  placeholder="E.g., Traffic jam on Main St, heavy smog in park area..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Pollution",
                    "Blocked Route",
                    "Wrong Data",
                    "Safety Issue",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className={cn(
                        "p-2 rounded-lg border-2 text-sm font-medium transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-yellow",
                        "border-border hover:border-eco-yellow hover:bg-eco-yellow/5"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={cn(
                  "w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg",
                  "hover:bg-eco-teal transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                  "shadow-soft hover:shadow-soft-lg"
                )}
              >
                Submit Report
              </button>
            </div>

            <p className="text-xs text-foreground/60 bg-eco-mint/50 rounded-lg p-4 mt-4">
              Thanks — your report is submitted and under review. Our team
              reviews all submissions within 24 hours.
            </p>
          </div>

          <div className="flex items-center justify-center">
            {/* Admin Dashboard Preview */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-soft-lg w-full">
              <h3 className="font-bold text-foreground mb-4">
                Moderation Dashboard
              </h3>

              <div className="space-y-3">
                {[
                  {
                    status: "pending",
                    title: "Heavy smog near Central Park",
                    time: "2 min ago",
                  },
                  {
                    status: "approved",
                    title: "Route A blocked construction",
                    time: "15 min ago",
                  },
                  {
                    status: "resolved",
                    title: "Air quality sensor miscalibration",
                    time: "1 hour ago",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {item.title}
                      </div>
                      <div className="text-xs text-foreground/50 mt-1">
                        {item.time}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-xs font-semibold px-2 py-1 rounded",
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-eco-mint text-eco-green"
                      )}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
