import { useState } from "react";
import { MapPin, Wind, Volume2, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoStrip() {
  const [activeLayer, setActiveLayer] = useState<"traffic" | "pm25" | "noise" | "green">(
    "pm25"
  );

  const layers = [
    { id: "traffic", label: "Traffic", icon: MapPin },
    { id: "pm25", label: "PM2.5", icon: Wind },
    { id: "noise", label: "Noise", icon: Volume2 },
    { id: "green", label: "Green Routes", icon: Leaf },
  ];

  const kpis = [
    {
      label: "Avg PM2.5 (µg/m³)",
      value: "68",
      unit: "neighborhood",
      trend: "-22%",
    },
    {
      label: "Estimated CO₂ saved",
      value: "2.4T",
      unit: "monthly",
      trend: "+12%",
    },
    {
      label: "Open Reports",
      value: "247",
      unit: "resolved",
      trend: "-8%",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-eco-mint/20 to-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
            Interactive Map Demo
          </h2>
          <p className="text-lg text-foreground/60">
            Toggle between different data layers to explore pollution, traffic,
            and green routes
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden shadow-soft-lg mb-8 bg-white border border-border">
          {/* Map Placeholder */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-eco-mint via-blue-50 to-white overflow-hidden">
            {/* SVG Map with different layer representations */}
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 600"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Interactive map visualization"
            >
              {/* Base map */}
              <defs>
                {/* PM2.5 Layer */}
                <radialGradient id="pm25-high" r="40%">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FFB703" stopOpacity="0.2" />
                </radialGradient>
                <radialGradient id="pm25-med" r="40%">
                  <stop offset="0%" stopColor="#FFB703" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#90EE90" stopOpacity="0.1" />
                </radialGradient>
                <radialGradient id="pm25-low" r="40%">
                  <stop offset="0%" stopColor="#90EE90" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#32CD32" stopOpacity="0.1" />
                </radialGradient>

                {/* Traffic Layer */}
                <pattern
                  id="traffic-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="15" fill="none" stroke="#FF6B6B" strokeWidth="2" opacity="0.5" />
                </pattern>
              </defs>

              {/* Background */}
              <rect width="1000" height="600" fill="#F0F8F5" />

              {/* Grid lines */}
              <g stroke="#E0E0E0" strokeWidth="1" opacity="0.3">
                <line x1="0" y1="150" x2="1000" y2="150" />
                <line x1="0" y1="300" x2="1000" y2="300" />
                <line x1="0" y1="450" x2="1000" y2="450" />
                <line x1="250" y1="0" x2="250" y2="600" />
                <line x1="500" y1="0" x2="500" y2="600" />
                <line x1="750" y1="0" x2="750" y2="600" />
              </g>

              {/* Content based on active layer */}
              {activeLayer === "pm25" && (
                <>
                  <circle cx="200" cy="150" r="120" fill="url(#pm25-high)" />
                  <circle cx="800" cy="250" r="100" fill="url(#pm25-med)" />
                  <circle cx="450" cy="450" r="140" fill="url(#pm25-low)" />
                </>
              )}

              {activeLayer === "traffic" && (
                <>
                  <path d="M 50 150 Q 250 100 500 180" stroke="#FF6B6B" strokeWidth="8" fill="none" opacity="0.8" />
                  <path d="M 300 300 Q 500 250 800 350" stroke="#FFB703" strokeWidth="8" fill="none" opacity="0.6" />
                  <path d="M 100 450 Q 400 500 850 400" stroke="#90EE90" strokeWidth="8" fill="none" opacity="0.7" />
                </>
              )}

              {activeLayer === "noise" && (
                <>
                  <circle cx="150" cy="200" r="80" fill="none" stroke="#FF6B6B" strokeWidth="4" opacity="0.8" />
                  <circle cx="150" cy="200" r="110" fill="none" stroke="#FFB703" strokeWidth="3" opacity="0.6" />
                  <circle cx="150" cy="200" r="140" fill="none" stroke="#90EE90" strokeWidth="2" opacity="0.4" />
                  <circle cx="750" cy="350" r="90" fill="none" stroke="#FF6B6B" strokeWidth="4" opacity="0.7" />
                  <circle cx="750" cy="350" r="120" fill="none" stroke="#FFB703" strokeWidth="3" opacity="0.5" />
                </>
              )}

              {activeLayer === "green" && (
                <>
                  <path d="M 80 500 Q 150 350 200 200 T 320 80" stroke="#0B8A6B" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <path d="M 200 500 Q 350 300 600 150" stroke="#2F855A" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <circle cx="80" cy="500" r="20" fill="#0B8A6B" />
                  <circle cx="320" cy="80" r="20" fill="#FFB703" />
                </>
              )}

              {/* Compass/Controls */}
              <g transform="translate(920, 50)">
                <rect width="60" height="60" rx="6" fill="white" opacity="0.95" stroke="#DDD" strokeWidth="1" />
                <text x="30" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">N</text>
                <line x1="30" y1="30" x2="30" y2="45" stroke="#333" strokeWidth="2" />
              </g>
            </svg>

            {/* Layer toggle overlay */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-lg shadow-soft p-1 flex gap-1">
              {layers.map((layer) => {
                const Icon = layer.icon;
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id as any)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                      isActive
                        ? "bg-eco-green text-white shadow-soft"
                        : "text-foreground/60 hover:text-foreground hover:bg-eco-mint/50"
                    )}
                    aria-pressed={isActive}
                  >
                    <Icon className="w-4 h-4 inline mr-1" />
                    <span className="hidden sm:inline">{layer.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur rounded-lg shadow-soft p-4 text-sm">
              <div className="font-semibold text-foreground mb-2">Legend</div>
              <div className="space-y-2">
                {activeLayer === "pm25" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>High (&gt;100 µg/m³)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Medium (50-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Low (&lt;50)</span>
                    </div>
                  </>
                )}
                {activeLayer === "green" && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-eco-green" />
                      <span>Primary Route</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Destination</span>
                    </div>
                  </>
                )}
                {!["pm25", "green"].includes(activeLayer) && (
                  <span className="text-foreground/60 text-xs">
                    Layer visualization active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Alt text for accessibility */}
          <div className="sr-only" role="status">
            Interactive map showing {activeLayer} data layer with toggle controls
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl border border-border p-6 text-center",
                "hover:border-eco-teal hover:shadow-soft transition-all",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-foreground/60 text-sm font-medium mb-2">
                {kpi.label}
              </p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-eco-green">
                  {kpi.value}
                </span>
                {kpi.trend && (
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      kpi.trend.startsWith("-")
                        ? "text-eco-green"
                        : "text-eco-yellow"
                    )}
                  >
                    {kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-foreground/50 text-xs">{kpi.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
