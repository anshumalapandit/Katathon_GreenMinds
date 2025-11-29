import { useState } from "react";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
    >
      <div
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-gradient-to-br from-eco-teal/20 to-eco-green/20 flex items-center justify-center">
            {!isPlaying ? (
              <>
                {/* Mock Video Thumbnail */}
                <svg
                  viewBox="0 0 1920 1080"
                  className="w-full h-full absolute inset-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="videoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B8A6B" />
                      <stop offset="100%" stopColor="#2F855A" />
                    </linearGradient>
                  </defs>
                  <rect width="1920" height="1080" fill="url(#videoBg)" />

                  {/* Map mockup on left */}
                  <g opacity="0.8">
                    <rect x="100" y="100" width="800" height="880" fill="white" rx="20" />
                    <circle cx="400" cy="300" r="100" fill="#FF6B6B" opacity="0.4" />
                    <circle cx="600" cy="500" r="80" fill="#FFB703" opacity="0.5" />
                    <path
                      d="M 200 700 Q 350 500 500 300"
                      stroke="#0B8A6B"
                      strokeWidth="12"
                      fill="none"
                    />
                  </g>

                  {/* UI overlays on right */}
                  <g opacity="0.8">
                    <rect x="1020" y="200" width="800" height="680" fill="white" rx="20" />
                    <rect x="1050" y="230" width="300" height="80" fill="#F0F8F5" rx="10" />
                    <text x="1200" y="280" fontSize="24" fontWeight="bold" fill="#0B8A6B" textAnchor="middle">
                      Route Comparison
                    </text>
                    <rect x="1050" y="340" width="300" height="100" fill="#FFE6E6" rx="10" />
                    <text x="1200" y="375" fontSize="16" fontWeight="bold" fill="#FF6B6B" textAnchor="middle">
                      Route A: 25 min
                    </text>
                    <text x="1200" y="410" fontSize="14" fill="#FF6B6B" textAnchor="middle">
                      PM2.5: 145 µg/m³
                    </text>
                    <rect x="1050" y="460" width="300" height="100" fill="#E6F9F4" rx="10" />
                    <text x="1200" y="495" fontSize="16" fontWeight="bold" fill="#0B8A6B" textAnchor="middle">
                      Route B: 32 min
                    </text>
                    <text x="1200" y="530" fontSize="14" fill="#0B8A6B" textAnchor="middle">
                      PM2.5: 48 µg/m³
                    </text>
                  </g>

                  {/* Text overlay */}
                  <text
                    x="960"
                    y="100"
                    fontSize="48"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                  >
                    eco Yatra Demo
                  </text>
                  <text
                    x="960"
                    y="150"
                    fontSize="24"
                    fill="white"
                    textAnchor="middle"
                    opacity="0.9"
                  >
                    Find cleaner routes. Breathe easier.
                  </text>
                </svg>

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className={cn(
                    "relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center",
                    "hover:bg-white hover:scale-110 transition-all",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-eco-teal",
                    "shadow-2xl"
                  )}
                  aria-label="Play demo video"
                >
                  <Play className="w-8 h-8 text-eco-green ml-1" fill="currentColor" />
                </button>
              </>
            ) : (
              /* Playing state - show placeholder */
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <div className="text-5xl">🎬</div>
                  <p className="text-xl font-bold">
                    Demo Video Playing
                  </p>
                  <p className="text-sm opacity-70">
                    60-second walkthrough of eco Yatra features
                  </p>
                  <div className="text-xs opacity-50 mt-8">
                    [In production, embedded video would play here]
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Video Info */}
        <div className="bg-white rounded-b-2xl p-6 shadow-2xl">
          <h2 id="video-title" className="text-xl font-bold text-foreground mb-2">
            eco Yatra: 60-Second Demo
          </h2>
          <p className="text-foreground/70 text-sm mb-4">
            Watch how eco Yatra helps you find the cleanest routes, donate to green
            initiatives, and report environmental issues in your city. This demo
            showcases the core features with real data from San Francisco.
          </p>

          {/* Transcript */}
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="font-semibold text-foreground cursor-pointer hover:text-eco-green">
              📝 View Transcript
            </summary>
            <div className="mt-4 text-sm text-foreground/70 space-y-3">
              <p>
                <strong>Narrator:</strong> "Welcome to eco Yatra, the platform
                that helps you travel cleaner."
              </p>
              <p>
                <strong>Narrator:</strong> "Enter your starting point and
                destination..."
              </p>
              <p>
                <strong>Narrator:</strong> "eco Yatra analyzes real-time traffic
                and pollution data to show you the greenest route."
              </p>
              <p>
                <strong>Narrator:</strong> "See how choosing the green route reduces
                your PM2.5 exposure from 145 to 48 µg/m³."
              </p>
              <p>
                <strong>Narrator:</strong> "Support green city initiatives by
                donating via secure QR vouchers."
              </p>
              <p>
                <strong>Narrator:</strong> "Report pollution hotspots to help your
                community."
              </p>
              <p>
                <strong>Narrator:</strong> "Try eco Yatra today. Travel cleaner.
                Breathe easier."
              </p>
            </div>
          </details>

          {/* CTA */}
          <button
            onClick={onClose}
            className={cn(
              "w-full mt-6 px-6 py-3 bg-eco-green text-white font-semibold rounded-lg",
              "hover:bg-eco-teal transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
              "shadow-soft hover:shadow-soft-lg"
            )}
          >
            Got It - Let's Find a Route
          </button>
        </div>
      </div>
    </div>
  );
}
