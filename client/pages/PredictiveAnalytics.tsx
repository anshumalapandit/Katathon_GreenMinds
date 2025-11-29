import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Leaf, LogOut, TrendingDown, Zap, MapPin, Heart, Gauge, ArrowRight, Loader, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface HourlyForecast {
  time: string;
  pm25: number;
  trend: string;
}

interface DailyForecast {
  date: string;
  pm25_max: number;
  pm25_min: number;
}

interface AirQualityData {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm25: number;
    pm10: number;
  };
}

export default function PredictiveAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState<"all" | "health" | "env">("all");
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number; name: string }>({
    lat: 18.5204,
    lon: 73.8567,
    name: "Pune",
  });
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch weather forecast data on component mount or location change
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const API_KEY = "f4f5a20348dc6c0a0b3fb49989172800";
        const lat = currentLocation.lat;
        const lon = currentLocation.lon;

        // Fetch Air Pollution Data - this gives us the real AQI
        const airPollutionResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        if (airPollutionResponse.ok) {
          const aqiData = await airPollutionResponse.json();
          setAirQualityData({
            aqi: aqiData.list[0].main.aqi,
            components: aqiData.list[0].components,
          });

          // Generate hourly forecast based on real PM2.5 data
          const basePM25 = Math.round(aqiData.list[0].components.pm25 || 48);
          const hourlyData: HourlyForecast[] = [
            { time: "Now", pm25: basePM25, trend: "Stable" },
            { time: "2 Hours", pm25: basePM25 + 5, trend: "↑ Slight increase" },
            { time: "4 Hours", pm25: basePM25 + 10, trend: "↑ Moderate increase" },
            { time: "8 Hours", pm25: basePM25 + 20, trend: "↑ Notable increase" },
            { time: "12 Hours", pm25: basePM25 + 10, trend: "↓ Improving" },
          ];
          setHourlyForecast(hourlyData);

          // Generate daily forecast
          const dailyData: DailyForecast[] = [
            {
              date: new Date().toLocaleDateString(),
              pm25_max: basePM25 + 20,
              pm25_min: basePM25,
            },
            {
              date: new Date(Date.now() + 86400000).toLocaleDateString(),
              pm25_max: basePM25 + 15,
              pm25_min: basePM25 - 5,
            },
            {
              date: new Date(Date.now() + 172800000).toLocaleDateString(),
              pm25_max: basePM25 + 10,
              pm25_min: basePM25 - 10,
            },
          ];
          setDailyForecast(dailyData);
          setError(null);
        } else {
          throw new Error("Failed to fetch air pollution data");
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to fetch air quality data for this location");
        // Use fallback data on error
        setHourlyForecast([
          { time: "Now", pm25: 48, trend: "Stable" },
          { time: "2 Hours", pm25: 52, trend: "↑ Slight increase" },
          { time: "4 Hours", pm25: 58, trend: "↑ Moderate increase" },
          { time: "8 Hours", pm25: 71, trend: "↑ Notable increase" },
          { time: "12 Hours", pm25: 65, trend: "↓ Improving" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [currentLocation]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  // Search for cities/locations using TomTom API
  const handleLocationSearch = async (query: string) => {
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const TOMTOM_API_KEY = "LxGeVBqp9HRFuVcG9C8wGLZvmVtedXdb";
        const response = await fetch(
          `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${TOMTOM_API_KEY}&countrySet=IN&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(
            data.results.map((result: any) => ({
              id: result.id,
              name: result.address.freeformAddress || result.address.municipality || result.poi?.name,
              lat: result.position.lat,
              lon: result.position.lon,
            }))
          );
        }
      } catch (err) {
        console.error("Error searching locations:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  // Select a location from search results
  const selectLocation = (result: any) => {
    setCurrentLocation({
      lat: result.lat,
      lon: result.lon,
      name: result.name,
    });
    setSearchQuery("");
    setSearchResults([]);
  };

  // Get AQI label based on AQI number (1-5 scale)
  const getAQILabel = (aqi: number): { label: string; color: string; description: string } => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "text-eco-green bg-eco-mint", description: "Air quality is satisfactory" };
      case 2:
        return { label: "Fair", color: "text-blue-600 bg-blue-50", description: "Acceptable air quality" };
      case 3:
        return { label: "Moderate", color: "text-yellow-600 bg-yellow-50", description: "May affect sensitive groups" };
      case 4:
        return { label: "Poor", color: "text-orange-600 bg-orange-50", description: "Unhealthy for sensitive groups" };
      case 5:
        return { label: "Very Poor", color: "text-red-600 bg-red-50", description: "Unhealthy air quality" };
      default:
        return { label: "Unknown", color: "text-gray-600 bg-gray-50", description: "Unable to determine" };
    }
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
              Predictive Analytics
            </h2>
            <p className="text-foreground/70">
              Sign in to your account to view detailed route analysis and air quality predictions.
            </p>
          </div>

          <div className="bg-eco-mint/30 border border-eco-green/30 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-eco-green">✓ Route predictions</p>
            <p className="text-sm font-semibold text-eco-green">✓ Air quality forecasts</p>
            <p className="text-sm font-semibold text-eco-green">✓ Personalized recommendations</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/green-route" className="text-eco-green hover:text-eco-teal font-semibold">
                Green Route
              </Link>
              <ArrowRight className="w-4 h-4 text-foreground/40" />
              <span className="text-foreground font-semibold">Predictive Analytics</span>
            </div>
            <h1 className="text-4xl font-headline font-bold text-foreground mb-2">
              Route Analysis & Predictions
            </h1>
            <p className="text-lg text-foreground/60">
              {currentLocation.name}
            </p>
          </div>

          {/* Location Search Card */}
          <div className="bg-white rounded-xl border border-border p-6 shadow-soft mb-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-eco-green" />
              <h3 className="text-lg font-bold text-foreground">Select Location or City</h3>
            </div>
            <div className="relative">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Search for city or location..."
                    value={searchQuery}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-foreground/50 hover:text-foreground" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectLocation(result)}
                      className="w-full text-left px-4 py-2.5 hover:bg-eco-mint/30 border-b border-border/50 last:border-0 transition-colors"
                    >
                      <p className="font-semibold text-foreground text-sm">{result.name}</p>
                      <p className="text-xs text-foreground/50">
                        {result.lat.toFixed(4)}, {result.lon.toFixed(4)}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 p-4 text-center">
                  <Loader className="w-4 h-4 animate-spin inline-block text-eco-green" />
                </div>
              )}
            </div>
          </div>

          {/* Route Summary Card */}
          <div className="bg-gradient-to-r from-eco-teal to-eco-green rounded-xl p-8 text-white mb-8 shadow-soft-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-eco-mint/80 text-sm font-medium mb-2">Distance</p>
                <p className="text-3xl font-bold">13.2 km</p>
              </div>
              <div>
                <p className="text-eco-mint/80 text-sm font-medium mb-2">Duration</p>
                <p className="text-3xl font-bold">32 min</p>
              </div>
              <div>
                <p className="text-eco-mint/80 text-sm font-medium mb-2">PM2.5 Exposure</p>
                <p className="text-3xl font-bold">{airQualityData?.components?.pm25?.toFixed(1) || "48"}</p>
              </div>
              <div>
                <p className="text-eco-mint/80 text-sm font-medium mb-2">CO₂ Saved</p>
                <p className="text-3xl font-bold">2.3 kg</p>
              </div>
            </div>
          </div>

          {/* Health Alert Banner */}
          {user?.healthProfile?.allergies?.length > 0 && (
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                🏥 Your Health Profile
              </p>
              <div className="flex flex-wrap gap-2">
                {user.healthProfile.allergies.map((allergy) => {
                  const allergyLabels: Record<string, string> = {
                    smoke: "Smoke Sensitive",
                    dust: "Dust Sensitive",
                    pollen: "Pollen Allergic",
                    pollution: "Pollution Sensitive",
                    noise: "Noise Sensitive",
                  };
                  return (
                    <span
                      key={allergy}
                      className="text-xs bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium"
                    >
                      {allergyLabels[allergy] || allergy}
                    </span>
                  );
                })}
              </div>
              <p className="text-xs text-blue-800 mt-2">
                We'll personalize recommendations based on these sensitivities.
              </p>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { id: "all", label: "All Metrics" },
              { id: "health", label: "Health Impact" },
              { id: "env", label: "Environmental" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id as any)}
                className={cn(
                  "px-4 py-2 font-semibold rounded-lg transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                  selectedMetric === tab.id
                    ? "bg-eco-green text-white shadow-soft"
                    : "bg-white border border-border hover:border-eco-teal"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Impact Prediction */}
            {(selectedMetric === "all" || selectedMetric === "health") && (
              <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Health Impact Analysis
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-eco-mint/30 rounded-lg p-4 border border-eco-green/20">
                    <p className="text-sm font-semibold text-eco-green mb-1">
                      Risk Assessment: LOW ✓
                    </p>
                    <p className="text-xs text-foreground/70">
                      This route is suitable for users with asthma or respiratory conditions.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Air Quality Index
                        </span>
                        <span className="text-sm font-bold text-eco-green">Good</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-eco-green h-2 rounded-full"
                          style={{ width: "72%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Pollen Level
                        </span>
                        <span className="text-sm font-bold text-yellow-600">Moderate</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "55%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          Noise Level
                        </span>
                        <span className="text-sm font-bold text-eco-green">Low</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-eco-green h-2 rounded-full"
                          style={{ width: "35%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-foreground mb-2">
                      Recommendations:
                    </p>
                    <ul className="text-xs text-foreground/70 space-y-1">
                      {user?.healthProfile?.allergies?.includes("smoke") && (
                        <li>✓ This route avoids high-traffic areas (good for smoke sensitivity)</li>
                      )}
                      {user?.healthProfile?.allergies?.includes("pollution") && (
                        <li>✓ Air quality is favorable for those with pollution sensitivity</li>
                      )}
                      {user?.healthProfile?.allergies?.includes("noise") && (
                        <li>✓ Noise levels are low on this route</li>
                      )}
                      {user?.healthProfile?.conditions?.includes("asthma") && (
                        <li>✓ Safe for asthma sufferers (low pollution zones)</li>
                      )}
                      {user?.healthProfile?.conditions?.includes("respiratory") && (
                        <li>✓ Good respiratory conditions on this route</li>
                      )}
                      {!user?.healthProfile?.allergies?.length && !user?.healthProfile?.conditions?.length ? (
                        <>
                          <li>✓ Safe to travel during peak hours</li>
                          <li>✓ No special precautions needed</li>
                        </>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Air Quality Forecast */}
            {(selectedMetric === "all" || selectedMetric === "env") && (
              <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-eco-yellow" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Air Quality Forecast
                  </h3>
                </div>

                {/* Real AQI Data Section */}
                {airQualityData && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-eco-mint/20 to-eco-green/20 rounded-lg border border-eco-green/30">
                    <p className="text-xs font-semibold text-eco-green mb-3">REAL-TIME AIR QUALITY DATA</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">AQI Status</p>
                        <div className={cn("px-3 py-2 rounded-lg inline-block", getAQILabel(airQualityData.aqi).color)}>
                          <p className="font-bold text-sm">{getAQILabel(airQualityData.aqi).label}</p>
                          <p className="text-xs">{getAQILabel(airQualityData.aqi).description}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Components</p>
                        <div className="text-sm space-y-0.5">
                          <p><span className="font-semibold">PM2.5:</span> {airQualityData.components?.pm25?.toFixed(1) || "N/A"} µg/m³</p>
                          <p><span className="font-semibold">PM10:</span> {airQualityData.components?.pm10?.toFixed(1) || "N/A"} µg/m³</p>
                          <p><span className="font-semibold">NO₂:</span> {airQualityData.components?.no2?.toFixed(1) || "N/A"} µg/m³</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-eco-green" />
                    <p className="ml-2 text-foreground/70">Loading forecast data for {currentLocation.name}...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hourlyForecast.length > 0 ? (
                      hourlyForecast.map((forecast, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-sm text-foreground">
                              {forecast.time}
                            </p>
                            <p className="text-xs text-foreground/60">{forecast.trend}</p>
                          </div>
                          <div className="text-right">
                            <p
                              className={cn(
                                "font-bold text-sm",
                                forecast.pm25 > 100
                                  ? "text-red-600"
                                  : forecast.pm25 > 50
                                  ? "text-yellow-600"
                                  : "text-eco-green"
                              )}
                            >
                              {forecast.pm25}
                            </p>
                            <p className="text-xs text-foreground/50">µg/m³</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-foreground/70">No forecast data available</p>
                    )}
                  </div>
                )}

                <div className="border-t border-border mt-4 pt-4 space-y-2">
                  <p className="text-xs text-foreground/70">
                    💡 Best time to travel: <strong>Now or within 2 hours</strong>
                  </p>
                  {user?.healthProfile?.allergies?.includes("pollution") && (
                    <p className="text-xs bg-yellow-50 border border-yellow-200 rounded p-2 text-yellow-800">
                      ⚠️ Watch out: Pollution levels increase after 4 hours. Travel early if possible.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Traffic Prediction */}
            {(selectedMetric === "all" || selectedMetric === "env") && (
              <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-eco-mint rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-eco-green" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Traffic Prediction
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-eco-mint/30 border border-eco-green/20 rounded-lg">
                    <p className="text-sm font-semibold text-eco-green mb-1">
                      Current Traffic: Light
                    </p>
                    <p className="text-xs text-foreground/70">
                      Expected travel time: 32 minutes
                      {user?.healthProfile?.allergies?.includes("smoke") && (
                        <span> (Minimal smoke exposure)</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground mb-2">
                      Next 6 hours forecast:
                    </p>
                    <div className="space-y-2">
                      {[
                        { hour: "12:00 - 2:00 PM", congestion: 15 },
                        { hour: "2:00 - 4:00 PM", congestion: 35 },
                        { hour: "4:00 - 6:00 PM", congestion: 75 },
                        { hour: "6:00 - 8:00 PM", congestion: 45 },
                      ].map((slot, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-foreground/70">{slot.hour}</span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={cn(
                                "h-1.5 rounded-full",
                                slot.congestion > 60
                                  ? "bg-red-500"
                                  : slot.congestion > 30
                                  ? "bg-yellow-500"
                                  : "bg-eco-green"
                              )}
                              style={{ width: `${slot.congestion}%` }}
                            />
                          </div>
                          <span className="font-semibold text-foreground w-8 text-right">
                            {slot.congestion}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Environmental Impact */}
            {(selectedMetric === "all" || selectedMetric === "env") && (
              <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-eco-mint rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-eco-green" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Environmental Impact
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-eco-mint/30 rounded-lg p-4 border border-eco-green/20">
                    <p className="text-2xl font-bold text-eco-green mb-1">
                      2.3 kg
                    </p>
                    <p className="text-xs text-foreground/70">
                      CO₂ saved compared to normal route
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="font-bold text-eco-green text-lg">5</p>
                      <p className="text-xs text-foreground/60 mt-1">Trees worth</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="font-bold text-eco-teal text-lg">13.2 km</p>
                      <p className="text-xs text-foreground/60 mt-1">Green distance</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-foreground mb-2">
                      If you use this route daily:
                    </p>
                    <div className="space-y-1 text-xs text-foreground/70">
                      <p>• 529 kg CO₂ saved annually</p>
                      <p>• 1,095 trees worth of impact</p>
                      <p>• 4,818 km of green travel</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Insights */}
          <div className="mt-8 bg-white rounded-xl border border-border p-6 shadow-soft">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-eco-green" />
              Detailed Insights
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-eco-mint to-eco-mint/50 rounded-lg border border-eco-green/20">
                <p className="text-sm font-bold text-eco-green mb-2">🏥 Health Benefit</p>
                <p className="text-xs text-foreground/70">
                  This green route reduces your respiratory exposure by 67% compared to the fastest route.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-lg border border-blue-200">
                <p className="text-sm font-bold text-blue-600 mb-2">🌍 Climate Impact</p>
                <p className="text-xs text-foreground/70">
                  Taking this route instead of the normal route prevents 0.82 kg of CO₂ per trip.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-lg border border-purple-200">
                <p className="text-sm font-bold text-purple-600 mb-2">⏱️ Time Trade-off</p>
                <p className="text-xs text-foreground/70">
                  Trading 4 minutes of travel time for 67% health improvement is a worthwhile investment.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                // Navigate to impact map with location coordinates
                navigate(`/impact-route?origin=Current&destination=${currentLocation.name}`, {
                  state: {
                    sourceCoords: [currentLocation.lon, currentLocation.lat],
                    destCoords: [currentLocation.lon, currentLocation.lat],
                  }
                });
              }}
              className={cn(
                "flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                "bg-eco-green text-white hover:bg-eco-teal shadow-soft hover:shadow-soft-lg"
              )}
            >
              <MapPin className="w-5 h-5" />
              Navigate This Route
            </button>
            <Link
              to="/green-route"
              className={cn(
                "flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                "bg-white text-eco-green border-2 border-eco-green hover:bg-eco-mint"
              )}
            >
              <ArrowRight className="w-5 h-5" />
              Find Another Route
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
