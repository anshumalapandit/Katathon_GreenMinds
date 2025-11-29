import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, MapPin, Heart, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationSuggestion {
  name: string;
  address: string;
  poi?: { name: string };
  address?: { freeformAddress: string };
  type: string;
  position: { lat: number; lon: number };
}

interface RouteFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOMTOM_API_KEY = "LxGeVBqp9HRFuVcG9C8wGLZvmVtedXdb";

export default function RouteFinderModal({ isOpen, onClose }: RouteFinderModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"location" | "health" | "results">("location");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [originSuggestions, setOriginSuggestions] = useState<LocationSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [loadingDest, setLoadingDest] = useState(false);
  const originInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const originTimerRef = useRef<NodeJS.Timeout>();
  const destTimerRef = useRef<NodeJS.Timeout>();

  const conditions = [
    { id: "asthma", label: "Asthma" },
    { id: "heart", label: "Heart Condition" },
    { id: "allergies", label: "Allergies" },
    { id: "pregnancy", label: "Pregnancy" },
    { id: "elderly", label: "Mobility Constraints" },
  ];

  // Search for location using TomTom API
  const searchLocation = async (query: string): Promise<LocationSuggestion[]> => {
    if (!query || query.length < 2) return [];
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${TOMTOM_API_KEY}&countrySet=IN&limit=5`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Location search error:", error);
      return [];
    }
  };

  // Handle origin input change with debounce
  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOrigin(value);

    if (originTimerRef.current) clearTimeout(originTimerRef.current);

    if (value.length < 2) {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
      return;
    }

    setLoadingOrigin(true);
    setShowOriginSuggestions(true);

    originTimerRef.current = setTimeout(async () => {
      const results = await searchLocation(value);
      setOriginSuggestions(results);
      setLoadingOrigin(false);
    }, 300);
  };

  // Handle destination input change with debounce
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);

    if (destTimerRef.current) clearTimeout(destTimerRef.current);

    if (value.length < 2) {
      setDestSuggestions([]);
      setShowDestSuggestions(false);
      return;
    }

    setLoadingDest(true);
    setShowDestSuggestions(true);

    destTimerRef.current = setTimeout(async () => {
      const results = await searchLocation(value);
      setDestSuggestions(results);
      setLoadingDest(false);
    }, 300);
  };

  // Select origin from suggestions
  const selectOriginSuggestion = (suggestion: LocationSuggestion) => {
    const displayName = suggestion.address?.freeformAddress || 
                       suggestion.poi?.name || 
                       suggestion.type;
    setOrigin(displayName);
    setShowOriginSuggestions(false);
    setOriginSuggestions([]);
  };

  // Select destination from suggestions
  const selectDestinationSuggestion = (suggestion: LocationSuggestion) => {
    const displayName = suggestion.address?.freeformAddress || 
                       suggestion.poi?.name || 
                       suggestion.type;
    setDestination(displayName);
    setShowDestSuggestions(false);
    setDestSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (originInputRef.current && !originInputRef.current.contains(e.target as Node)) {
        setShowOriginSuggestions(false);
      }
      if (destInputRef.current && !destInputRef.current.contains(e.target as Node)) {
        setShowDestSuggestions(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  const handleFindRoute = () => {
    if (origin && destination) {
      setStep("health");
    }
  };

  const handleHealthSubmit = () => {
    setStep("results");
  };

  const handleChooseGreenRoute = () => {
    // Navigate to the comparison page with origin and destination as query params
    navigate(`/green-route-comparison?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-finder-title"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between rounded-t-2xl">
          <h2 id="route-finder-title" className="text-2xl font-headline font-bold">
            Find Green Route
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-eco-mint rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
            aria-label="Close route finder"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === "location" && (
            <>
              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Starting Point
                </label>
                <input
                  ref={originInputRef}
                  type="text"
                  placeholder="Current location or address"
                  value={origin}
                  onChange={handleOriginChange}
                  onFocus={() => origin.length >= 2 && setShowOriginSuggestions(true)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
                
                {/* Origin Suggestions Dropdown */}
                {showOriginSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loadingOrigin ? (
                      <div className="p-4 flex items-center justify-center gap-2 text-foreground/70">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Searching...</span>
                      </div>
                    ) : originSuggestions.length > 0 ? (
                      originSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectOriginSuggestion(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-eco-mint/30 border-b border-border/30 last:border-b-0 transition-colors"
                        >
                          <p className="font-medium text-foreground text-sm">
                            {suggestion.address?.freeformAddress || suggestion.poi?.name || suggestion.type}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {suggestion.type}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-foreground/70">
                        No locations found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Destination
                </label>
                <input
                  ref={destInputRef}
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={handleDestinationChange}
                  onFocus={() => destination.length >= 2 && setShowDestSuggestions(true)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
                
                {/* Destination Suggestions Dropdown */}
                {showDestSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loadingDest ? (
                      <div className="p-4 flex items-center justify-center gap-2 text-foreground/70">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Searching...</span>
                      </div>
                    ) : destSuggestions.length > 0 ? (
                      destSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectDestinationSuggestion(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-eco-mint/30 border-b border-border/30 last:border-b-0 transition-colors"
                        >
                          <p className="font-medium text-foreground text-sm">
                            {suggestion.address?.freeformAddress || suggestion.poi?.name || suggestion.type}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {suggestion.type}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-foreground/70">
                        No locations found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleFindRoute}
                disabled={!origin || !destination}
                className={cn(
                  "w-full px-6 py-3 font-semibold rounded-lg transition-all",
                  origin && destination
                    ? "bg-eco-green text-white hover:bg-eco-teal cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                Next: Health Profile
              </button>
            </>
          )}

          {step === "health" && (
            <>
              <p className="text-foreground/70 text-sm">
                <Heart className="w-4 h-4 inline mr-2 text-eco-green" />
                Optional: Tell us about your health for personalized routes
              </p>

              <div className="space-y-2">
                {conditions.map((condition) => (
                  <label
                    key={condition.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-eco-teal hover:bg-eco-mint/30 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedConditions([
                            ...selectedConditions,
                            condition.id,
                          ]);
                        } else {
                          setSelectedConditions(
                            selectedConditions.filter(
                              (id) => id !== condition.id
                            )
                          );
                        }
                      }}
                      className="w-4 h-4 rounded border-border text-eco-green focus-visible:ring-2 focus-visible:ring-eco-teal cursor-pointer"
                    />
                    <span className="font-medium text-foreground">
                      {condition.label}
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-xs text-foreground/50 bg-eco-mint/30 rounded p-3">
                Health info is opt-in and can be deleted anytime
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("location")}
                  className="flex-1 px-6 py-3 text-foreground border-2 border-border rounded-lg hover:bg-eco-mint transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleHealthSubmit}
                  className="flex-1 px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-all"
                >
                  See Routes
                </button>
              </div>
            </>
          )}

          {step === "results" && (
            <>
              <div className="space-y-4">
                <p className="text-foreground font-semibold">
                  Routes from {origin} to {destination}
                </p>

                {/* Route Option 1 */}
                <div className="border-2 border-red-200 bg-red-50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-red-700">Route A (Fastest)</h3>
                      <p className="text-sm text-red-600">25 min • 3.2 km</p>
                    </div>
                    <span className="text-2xl font-bold text-red-600">
                      4.2/10
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mb-3">PM2.5: 145 µg/m³</p>
                  <button className="w-full px-4 py-2 bg-white text-red-600 font-medium rounded border border-red-200 hover:bg-red-50">
                    Choose
                  </button>
                </div>

                {/* Route Option 2 */}
                <div className="border-2 border-eco-green bg-eco-mint rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-eco-green">
                        Route B (Green) ⭐
                      </h3>
                      <p className="text-sm text-eco-teal">32 min • 4.1 km</p>
                    </div>
                    <span className="text-2xl font-bold text-eco-green">
                      8.7/10
                    </span>
                  </div>
                  <p className="text-xs text-eco-green mb-3">PM2.5: 48 µg/m³</p>
                  <button 
                    onClick={handleChooseGreenRoute}
                    className="w-full px-4 py-2 bg-eco-green text-white font-medium rounded hover:bg-eco-teal"
                  >
                    Choose Green Route
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 text-foreground border-2 border-border rounded-lg hover:bg-eco-mint transition-all"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
