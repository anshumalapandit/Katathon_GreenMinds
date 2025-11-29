import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Leaf, LogOut, MapPin, ArrowRight, Zap, Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface Route {
  type: "normal" | "green";
  distance: string;
  duration: string;
  pm25: number;
  co2Saved: string;
  description: string;
}

interface LocationSuggestion {
  freeformAddress: string;
  position: {
    lat: number;
    lon: number;
  };
  poiName?: string;
}

export default function GreenRoute() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [sourceSuggestions, setSourceSuggestions] = useState<LocationSuggestion[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [sourceCoords, setSourceCoords] = useState<[number, number] | null>(null);
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null);

  // Load origin and destination from URL query parameters on mount
  useEffect(() => {
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");

    if (origin) {
      setSource(decodeURIComponent(origin));
    }

    if (destination) {
      setDestination(decodeURIComponent(destination));
    }
  }, [searchParams]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  // Search for locations using TomTom API
  const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
    if (!query || query.length < 2) return [];
    
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=LxGeVBqp9HRFuVcG9C8wGLZvmVtedXdb&countrySet=IN&limit=5`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      
      if (!data.results) return [];
      
      return data.results.map((result: any) => ({
        freeformAddress: result.address?.freeformAddress || result.poi?.name || result.type,
        position: {
          lat: result.position.lat,
          lon: result.position.lon,
        },
        poiName: result.poi?.name,
      }));
    } catch (error) {
      console.error("Location search error:", error);
      return [];
    }
  };

  // Handle source input change
  const handleSourceChange = async (value: string) => {
    setSource(value);
    
    if (value.length < 2) {
      setShowSourceSuggestions(false);
      return;
    }
    
    const suggestions = await searchLocations(value);
    setSourceSuggestions(suggestions);
    setShowSourceSuggestions(suggestions.length > 0);
  };

  // Handle destination input change
  const handleDestinationChange = async (value: string) => {
    setDestination(value);
    
    if (value.length < 2) {
      setShowDestSuggestions(false);
      return;
    }
    
    const suggestions = await searchLocations(value);
    setDestSuggestions(suggestions);
    setShowDestSuggestions(suggestions.length > 0);
  };

  // Select source from suggestions
  const selectSource = (suggestion: LocationSuggestion) => {
    setSource(suggestion.freeformAddress);
    setSourceCoords([suggestion.position.lon, suggestion.position.lat]);
    setShowSourceSuggestions(false);
  };

  // Select destination from suggestions
  const selectDestination = (suggestion: LocationSuggestion) => {
    setDestination(suggestion.freeformAddress);
    setDestCoords([suggestion.position.lon, suggestion.position.lat]);
    setShowDestSuggestions(false);
  };

  const findRoutes = () => {
    if (!source.trim() || !destination.trim()) {
      return;
    }

    // Mock data for routes - in reality this would be from TomTom API
    const mockRoutes: Route[] = [
      {
        type: "normal",
        distance: "12.5 km",
        duration: "28 min",
        pm25: 145,
        co2Saved: "0 kg",
        description: "Fastest route via main highways",
      },
      {
        type: "green",
        distance: "13.2 km",
        duration: "32 min",
        pm25: 48,
        co2Saved: "2.3 kg",
        description: "Eco-friendly route through green areas",
      },
    ];

    setRoutes(mockRoutes);
    setSelectedRoute(mockRoutes[1]); // Default to green route
  };

  const handleAnalyzeRoute = () => {
    if (!selectedRoute) return;

    // Navigate to predictive analytics with route data
    const routeData = {
      source,
      destination,
      route: selectedRoute,
    };

    navigate("/predictive-analytics", { state: routeData });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-eco-teal to-eco-green rounded-full flex items-center justify-center mx-auto">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-headline font-bold text-foreground mb-2">
              Access Green Routes
            </h2>
            <p className="text-foreground/70">
              Sign in to your account to find eco-friendly routes and see real-time air quality data.
            </p>
          </div>

          <div className="bg-eco-mint/30 border border-eco-green/30 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-eco-green">✓ Find green routes</p>
            <p className="text-sm font-semibold text-eco-green">✓ Analyze air quality</p>
            <p className="text-sm font-semibold text-eco-green">✓ Get personalized recommendations</p>
          </div>

          <div className="space-y-3">
            <Link
              to="/signin"
              className="w-full px-6 py-3 bg-eco-green text-white font-semibold rounded-lg hover:bg-eco-teal transition-colors inline-block"
            >
              Sign In
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-xs text-foreground/50">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
            <Link
              to="/signup"
              className="w-full px-6 py-3 bg-white text-eco-green font-semibold rounded-lg border-2 border-eco-green hover:bg-eco-mint transition-colors inline-block"
            >
              Create Account
            </Link>
          </div>

          <Link
            to="/"
            className="text-eco-teal hover:text-eco-green font-medium text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-headline font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-eco-teal to-eco-green rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            eco Yatra
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/70">
              Welcome, <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-eco-mint rounded-lg transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-5 h-5 text-foreground/60" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-headline font-bold text-foreground mb-2">
              Find Green Route
            </h1>
            <p className="text-lg text-foreground/60">
              Compare normal and eco-friendly routes, then analyze the path for predictive insights
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-xl border border-border p-8 shadow-soft mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Source Input */}
              <div>
                <label htmlFor="source" className="block text-sm font-semibold text-foreground mb-3">
                  Source Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-eco-green" />
                  <input
                    id="source"
                    type="text"
                    placeholder="Enter starting point (e.g., Home, Office)"
                    value={source}
                    onChange={(e) => handleSourceChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && findRoutes()}
                  />
                  
                  {/* Source Suggestions Dropdown */}
                  {showSourceSuggestions && sourceSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10">
                      {sourceSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => selectSource(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-eco-mint/20 transition-colors border-b border-border last:border-b-0 flex items-start gap-2"
                        >
                          <MapPin className="w-4 h-4 text-eco-green flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {suggestion.freeformAddress}
                            </p>
                          </div>
                          {sourceCoords && sourceCoords[0] === suggestion.position.lon && 
                           sourceCoords[1] === suggestion.position.lat && (
                            <Check className="w-4 h-4 text-eco-green flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination Input */}
              <div>
                <label htmlFor="destination" className="block text-sm font-semibold text-foreground mb-3">
                  Destination Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-eco-green" />
                  <input
                    id="destination"
                    type="text"
                    placeholder="Enter destination (e.g., Airport, Station)"
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && findRoutes()}
                  />
                  
                  {/* Destination Suggestions Dropdown */}
                  {showDestSuggestions && destSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10">
                      {destSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => selectDestination(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-eco-mint/20 transition-colors border-b border-border last:border-b-0 flex items-start gap-2"
                        >
                          <MapPin className="w-4 h-4 text-eco-green flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {suggestion.freeformAddress}
                            </p>
                          </div>
                          {destCoords && destCoords[0] === suggestion.position.lon && 
                           destCoords[1] === suggestion.position.lat && (
                            <Check className="w-4 h-4 text-eco-green flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Find Routes Button */}
            <button
              onClick={findRoutes}
              disabled={!source.trim() || !destination.trim()}
              className={cn(
                "w-full px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                source.trim() && destination.trim()
                  ? "bg-eco-green text-white hover:bg-eco-teal shadow-soft hover:shadow-soft-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Zap className="w-5 h-5" />
              Find Routes
            </button>
          </div>

          {/* Routes Comparison Section */}
          {routes && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">
                Route Comparison
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedRoute(route)}
                    className={cn(
                      "rounded-xl border-2 p-6 cursor-pointer transition-all",
                      selectedRoute?.type === route.type
                        ? "border-eco-green bg-eco-mint/20 shadow-soft-lg"
                        : "border-border bg-white hover:border-eco-teal hover:shadow-soft"
                    )}
                  >
                    {/* Route Type Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span
                          className={cn(
                            "inline-block px-3 py-1 rounded-full text-sm font-bold",
                            route.type === "green"
                              ? "bg-eco-green/20 text-eco-green"
                              : "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {route.type === "green" ? "🌱 Green Route" : "🛣️ Normal Route"}
                        </span>
                      </div>
                      {selectedRoute?.type === route.type && (
                        <span className="text-eco-green font-bold text-sm">✓ Selected</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-foreground/70 text-sm mb-6">
                      {route.description}
                    </p>

                    {/* Route Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Distance */}
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-foreground/60 text-xs font-medium mb-1">
                          Distance
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {route.distance}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-foreground/60 text-xs font-medium mb-1">
                          Duration
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {route.duration}
                        </p>
                      </div>

                      {/* PM2.5 */}
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-foreground/60 text-xs font-medium mb-1">
                          PM2.5 Exposure
                        </p>
                        <p
                          className={cn(
                            "text-2xl font-bold",
                            route.pm25 > 100
                              ? "text-red-600"
                              : route.pm25 > 50
                              ? "text-yellow-600"
                              : "text-eco-green"
                          )}
                        >
                          {route.pm25}
                        </p>
                      </div>

                      {/* CO2 Saved */}
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-foreground/60 text-xs font-medium mb-1">
                          CO₂ Saved
                        </p>
                        <p className="text-2xl font-bold text-eco-green">
                          {route.co2Saved}
                        </p>
                      </div>
                    </div>

                    {/* Health Impact */}
                    {route.type === "green" ? (
                      <div className="bg-eco-green/10 border border-eco-green/30 rounded-lg p-4 flex items-start gap-3">
                        <Heart className="w-5 h-5 text-eco-green flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-eco-green mb-1">
                            Health Benefit
                          </p>
                          <p className="text-xs text-foreground/70">
                            {user?.healthProfile?.allergies?.includes("smoke")
                              ? "✓ This route avoids high-traffic areas (smoke-free)"
                              : user?.healthProfile?.allergies?.includes("pollution")
                              ? "✓ This route has 67% lower air pollution exposure"
                              : user?.healthProfile?.allergies?.includes("noise")
                              ? "✓ This route has significantly lower noise levels"
                              : "This route reduces health risk by 67% compared to normal route"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <Heart className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-600 mb-1">
                            Health Warning
                          </p>
                          <p className="text-xs text-red-700">
                            {user?.healthProfile?.allergies?.includes("smoke")
                              ? "⚠️ This route has heavy traffic - high smoke exposure for someone with your allergies"
                              : user?.healthProfile?.allergies?.includes("pollution")
                              ? "⚠️ This route has high air pollution levels"
                              : user?.healthProfile?.allergies?.includes("noise")
                              ? "⚠️ This route has high noise pollution"
                              : "This route has higher pollution exposure"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAnalyzeRoute}
                  className={cn(
                    "flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                    "bg-eco-green text-white hover:bg-eco-teal shadow-soft hover:shadow-soft-lg"
                  )}
                >
                  <Zap className="w-5 h-5" />
                  Analyze This Route
                </button>
                <Link
                  to="/"
                  className={cn(
                    "flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                    "bg-white text-eco-green border-2 border-eco-green hover:bg-eco-mint"
                  )}
                >
                  <ArrowRight className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!routes && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-eco-mint mx-auto mb-4 opacity-50" />
              <p className="text-foreground/60 text-lg">
                Enter a source and destination to find green routes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
