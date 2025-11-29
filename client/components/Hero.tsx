import { Play, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  onOpenRouteModal?: () => void;
  onOpenDemoVideo?: () => void;
}

export default function Hero({ onOpenRouteModal, onOpenDemoVideo }: HeroProps) {
  return (
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
              Real-time traffic + air-quality maps, personalized green routes,
              donation QR vouchers, and an AI assistant built for everyone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onOpenRouteModal}
                className={cn(
                  "px-8 py-3.5 sm:py-4 bg-eco-green text-white font-semibold rounded-lg",
                  "hover:bg-eco-teal transition-all duration-200 transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                  "flex items-center justify-center gap-2",
                  "shadow-soft hover:shadow-soft-lg"
                )}
                aria-label="Find Green Route - opens route finder modal"
              >
                <MapPin className="w-5 h-5" />
                <span>Find Green Route</span>
              </button>

              <button
                onClick={onOpenDemoVideo}
                className={cn(
                  "px-8 py-3.5 sm:py-4 bg-white text-eco-green font-semibold rounded-lg",
                  "border-2 border-eco-green hover:bg-eco-mint transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                  "flex items-center justify-center gap-2",
                  "shadow-soft"
                )}
                aria-label="Watch 60 second demo video"
              >
                <Play className="w-5 h-5" />
                <span>Watch 60s Demo</span>
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
              <span>Used by city planners & eco-conscious travelers</span>
            </div>
          </div>

          {/* Right Column - Device Mockup */}
          <div className="relative animate-slide-up lg:animate-fade-in">
            <div className="relative mx-auto w-full max-w-sm perspective">
              {/* iPhone Frame */}
              <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 aspect-video sm:aspect-[9/16]">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-eco-teal/20 to-eco-green/20 overflow-hidden">
                  {/* Mock map background with heatmap effect */}
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Base map */}
                    <rect width="400" height="600" fill="#F0F8F5" />

                    {/* Pollution heatmap gradient circles (red = high, green = low) */}
                    <defs>
                      <radialGradient id="heatmap1" r="40%">
                        <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FFA500" stopOpacity="0.2" />
                      </radialGradient>
                      <radialGradient id="heatmap2" r="40%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#90EE90" stopOpacity="0.1" />
                      </radialGradient>
                      <radialGradient id="heatmap3" r="40%">
                        <stop offset="0%" stopColor="#90EE90" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#32CD32" stopOpacity="0.1" />
                      </radialGradient>
                    </defs>

                    {/* Pollution zones */}
                    <circle cx="120" cy="150" r="80" fill="url(#heatmap1)" />
                    <circle cx="280" cy="200" r="60" fill="url(#heatmap2)" />
                    <circle cx="200" cy="380" r="100" fill="url(#heatmap3)" />

                    {/* Green route line (A* path) */}
                    <path
                      d="M 80 500 Q 150 350 200 200 T 320 80"
                      stroke="#0B8A6B"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="12, 4"
                      className="animate-pulse"
                    />

                    {/* Route markers */}
                    <circle cx="80" cy="500" r="12" fill="#0B8A6B" />
                    <circle cx="320" cy="80" r="12" fill="#FFB703" />

                    {/* Map controls (top right) */}
                    <g>
                      <rect
                        x="320"
                        y="20"
                        width="60"
                        height="80"
                        rx="8"
                        fill="white"
                        opacity="0.9"
                      />
                      <line x1="330" y1="30" x2="370" y2="30" stroke="#999" />
                      <line x1="330" y1="50" x2="370" y2="50" stroke="#999" />
                      <line x1="330" y1="70" x2="370" y2="70" stroke="#999" />
                      <line x1="330" y1="90" x2="370" y2="90" stroke="#999" />
                    </g>
                  </svg>

                  {/* Route comparison card overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-eco-mint p-3 animate-slide-up">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-red-50 p-2 rounded border border-red-200">
                        <div className="font-bold text-red-700">25 min</div>
                        <div className="text-red-600 text-xs">
                          PM2.5: 145 µg/m³
                        </div>
                      </div>
                      <div className="bg-green-50 p-2 rounded border border-eco-green">
                        <div className="font-bold text-eco-green">32 min</div>
                        <div className="text-eco-green text-xs">
                          PM2.5: 48 µg/m³
                        </div>
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
  );
}
