import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { MapPin, Heart, Gift, ArrowRight, Wind, Zap, TrendingUp, Navigation, BarChart3, Leaf, AlertCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import RouteFinderModal from "@/components/modals/RouteFinderModal";
import DonateModal from "@/components/modals/DonateModal";
import ContactModal from "@/components/modals/ContactModal";
import DemoVideoModal from "@/components/modals/DemoVideoModal";

export default function Index() {
  const { user } = useAuth();
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDemoVideoModalOpen, setIsDemoVideoModalOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <Header
        onOpenRouteModal={() => setIsRouteModalOpen(true)}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        isLoggedIn={!!user}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-eco-mint via-white to-white pt-12 md:pt-20 pb-12 md:pb-28">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-eco-mint rounded-full -mr-48 -mt-48 opacity-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-eco-mint/30 rounded-full -ml-36 -mb-36 opacity-30 blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-foreground leading-tight mb-6">
                  eco Yatra — Travel cleaner, breathe easier.
                </h1>

                <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-8">
                  Real-time air-quality maps, personalized green routes, and an
                  AI assistant that makes sustainable travel effortless.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    to="/signup"
                    className={cn(
                      "px-8 py-3.5 sm:py-4 bg-eco-green text-white font-semibold rounded-lg",
                      "hover:bg-eco-teal transition-all duration-200 transform hover:scale-105",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                      "flex items-center justify-center gap-2",
                      "shadow-soft hover:shadow-soft-lg"
                    )}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Started Free</span>
                  </Link>

                  <button
                    onClick={() => setIsDemoVideoModalOpen(true)}
                    className={cn(
                      "px-8 py-3.5 sm:py-4 bg-white text-eco-green font-semibold rounded-lg",
                      "border-2 border-eco-green hover:bg-eco-mint transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                      "flex items-center justify-center gap-2",
                      "shadow-soft"
                    )}
                  >
                    <span>Watch Demo</span>
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-eco-teal to-eco-green border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span>Used by eco-conscious travelers</span>
                </div>
              </div>

              {/* Right Column - Device Mockup */}
              <div className="relative animate-slide-up lg:animate-fade-in">
                <div className="relative mx-auto w-full max-w-sm perspective">
                  {/* iPhone Frame */}
                  <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 aspect-video sm:aspect-[9/16]">
                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-eco-teal/20 to-eco-green/20 overflow-hidden">
                      {/* Mock map */}
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 400 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="400" height="600" fill="#F0F8F5" />
                        <defs>
                          <radialGradient id="heatmap1" r="40%">
                            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#FFA500" stopOpacity="0.2" />
                          </radialGradient>
                          <radialGradient id="heatmap3" r="40%">
                            <stop offset="0%" stopColor="#90EE90" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#32CD32" stopOpacity="0.1" />
                          </radialGradient>
                        </defs>
                        <circle cx="120" cy="150" r="80" fill="url(#heatmap1)" />
                        <circle cx="200" cy="380" r="100" fill="url(#heatmap3)" />
                        <path
                          d="M 80 500 Q 150 350 200 200 T 320 80"
                          stroke="#0B8A6B"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="12, 4"
                          className="animate-pulse"
                        />
                        <circle cx="80" cy="500" r="12" fill="#0B8A6B" />
                        <circle cx="320" cy="80" r="12" fill="#FFB703" />
                      </svg>

                      {/* Route comparison card overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-eco-mint p-3 animate-slide-up">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-red-50 p-2 rounded border border-red-200">
                            <div className="font-bold text-red-700">25 min</div>
                            <div className="text-red-600 text-xs">PM2.5: 145</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded border border-eco-green">
                            <div className="font-bold text-eco-green">32 min</div>
                            <div className="text-eco-green text-xs">PM2.5: 48</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10" />
                  </div>

                  {/* Shadow under device */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/10 blur-lg rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview Section (Compact) */}
        <section className="py-16 md:py-24 bg-white border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-foreground/60">
                Everything you need for cleaner, healthier, and greener travel
              </p>
            </div>

            {/* Features Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
              {[
                {
                  icon: MapPin,
                  title: "Smart Route Planning",
                  description: "Real-time pollution and traffic data guide you to healthier paths",
                  tag: "Navigation",
                },
                {
                  icon: Heart,
                  title: "Health-Personalized",
                  description: "Routes tailored to asthma, allergies, heart health, and mobility needs",
                  tag: "Wellness",
                },
                {
                  icon: Wind,
                  title: "Live Air Quality Maps",
                  description: "Real-time PM2.5, NO₂, and AQI data with predictive forecasts",
                  tag: "Real-time Data",
                },
                {
                  icon: Zap,
                  title: "AI Voice Assistant",
                  description: "Voice-guided navigation with environmental insights and alerts",
                  tag: "AI-Powered",
                },
                {
                  icon: BarChart3,
                  title: "Predictive Analytics",
                  description: "Detailed health impact predictions for every route you take",
                  tag: "Analytics",
                },
                {
                  icon: TrendingUp,
                  title: "Route Impact Dashboard",
                  description: "Interactive maps showing ERS scores, weather, and traffic overlay",
                  tag: "Dashboard",
                },
                {
                  icon: Leaf,
                  title: "Eco Coins Rewards",
                  description: "Earn coins from green routes, redeem vouchers, support tree plantation",
                  tag: "Rewards",
                },
                {
                  icon: Gift,
                  title: "Green Donations",
                  description: "Support city greening with secure QR vouchers, get gift rewards",
                  tag: "Giving Back",
                },
                {
                  icon: Navigation,
                  title: "Seamless Navigation",
                  description: "One-click navigation with TomTom maps integration and real-time updates",
                  tag: "Integration",
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "rounded-xl p-6 bg-white border border-border hover:border-eco-teal hover:shadow-soft-lg",
                      "transition-all hover:translate-y-[-4px] animate-fade-in group"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-eco-mint rounded-lg flex items-center justify-center group-hover:bg-eco-green/20 transition-colors">
                        <Icon className="w-6 h-6 text-eco-green group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-xs font-bold text-eco-green bg-eco-mint px-2 py-1 rounded-full">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-eco-green transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Additional Features Highlight */}
            <div className="bg-gradient-to-r from-eco-green/10 to-eco-teal/10 rounded-2xl border border-eco-green/20 p-8 md:p-12 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-green mb-2">🗺️ Smart</div>
                  <p className="text-sm text-foreground/70">Location Autocomplete</p>
                  <p className="text-xs text-foreground/50 mt-1">TomTom API Integration</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-green mb-2">📊 Deep</div>
                  <p className="text-sm text-foreground/70">Route Analytics</p>
                  <p className="text-xs text-foreground/50 mt-1">ERS Scoring System</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-green mb-2">🎯 Eco</div>
                  <p className="text-sm text-foreground/70">Impact Tracking</p>
                  <p className="text-xs text-foreground/50 mt-1">Route History & Stats</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-eco-green mb-2">🌍 Community</div>
                  <p className="text-sm text-foreground/70">Collective Impact</p>
                  <p className="text-xs text-foreground/50 mt-1">Trees & CO₂ Tracking</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/signup"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 bg-eco-green text-white font-semibold rounded-lg",
                  "hover:bg-eco-teal transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                  "shadow-soft hover:shadow-soft-lg"
                )}
              >
                Explore Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RouteFinderModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
      />
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <DemoVideoModal
        isOpen={isDemoVideoModalOpen}
        onClose={() => setIsDemoVideoModalOpen(false)}
      />
    </>
  );
}
