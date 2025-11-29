import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Leaf, Wind, Fuel, Clock, AlertCircle, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

interface RouteData {
  name: string;
  duration_s: number;
  distance_km: number;
  co2_g: number;
  fuelLiters: number;
  pm25Avg: number;
  no2Avg: number;
  congIndex: number;
  traffic_speed: number;
  is_green: boolean;
}

export default function GreenRouteComparison() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const [fastestRoute, setFastestRoute] = useState<RouteData | null>(null);
  const [greenRoute, setGreenRoute] = useState<RouteData | null>(null);
  const [savings, setSavings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!origin || !destination) {
      navigate("/");
      return;
    }

    // Simulate fetching route data - in real implementation, this would call an API
    const simulateRouteFetch = () => {
      const fastest: RouteData = {
        name: "Fastest Route",
        duration_s: 1500, // 25 min
        distance_km: 3.2,
        co2_g: 850,
        fuelLiters: 0.45,
        pm25Avg: 145,
        no2Avg: 85,
        congIndex: 0.75,
        traffic_speed: 28,
        is_green: false,
      };

      const green: RouteData = {
        name: "Green Route",
        duration_s: 1920, // 32 min
        distance_km: 4.1,
        co2_g: 520,
        fuelLiters: 0.28,
        pm25Avg: 48,
        no2Avg: 32,
        congIndex: 0.25,
        traffic_speed: 45,
        is_green: true,
      };

      setFastestRoute(fastest);
      setGreenRoute(green);

      // Calculate savings
      const co2Saved = fastest.co2_g - green.co2_g;
      const fuelSaved = fastest.fuelLiters - green.fuelLiters;
      const pm25Reduction =
        ((fastest.pm25Avg - green.pm25Avg) / fastest.pm25Avg) * 100;
      const no2Reduction =
        ((fastest.no2Avg - green.no2Avg) / fastest.no2Avg) * 100;
      const congestionReduction = (fastest.congIndex - green.congIndex) * 100;
      const extraTime = (green.duration_s - fastest.duration_s) / 60;

      setSavings({
        co2Saved,
        fuelSaved,
        pm25Reduction,
        no2Reduction,
        congestionReduction,
        extraTime,
      });

      setLoading(false);
    };

    simulateRouteFetch();
  }, [origin, destination, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-eco-mint to-white">
        <Header isLoggedIn={false} isDashboard={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-eco-green border-t-eco-teal rounded-full animate-spin mx-auto" />
            <p className="text-foreground/70 font-medium">Computing routes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!fastestRoute || !greenRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header isLoggedIn={false} isDashboard={false} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-foreground/70">Failed to load routes</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.round(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-eco-mint/20 via-white to-eco-teal/10">
      <Header isLoggedIn={false} isDashboard={false} />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-eco-green hover:text-eco-teal transition-colors font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-4xl font-headline font-bold text-foreground">
              Route Comparison: Eco Impact Analysis
            </h1>
            <p className="text-foreground/60">
              {origin} → {destination}
            </p>
          </div>

          {/* Routes Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fastest Route Card */}
            <div className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Fastest Route
                </h2>
                <span className="bg-red-200 text-red-800 px-4 py-2 rounded-full font-bold text-lg">
                  {formatTime(fastestRoute.duration_s)}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {/* Basic Info */}
                <div className="bg-white/70 rounded-lg p-4 space-y-3 border border-red-100">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Distance</span>
                    <span className="font-bold text-foreground">
                      {fastestRoute.distance_km} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Avg Speed</span>
                    <span className="font-bold text-foreground">
                      {fastestRoute.traffic_speed} km/h
                    </span>
                  </div>
                </div>

                {/* Pollution Metrics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    Pollution Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-4 border border-red-100">
                      <div className="text-xs text-foreground/60 mb-1">PM2.5</div>
                      <div className="text-2xl font-bold text-red-600">
                        {fastestRoute.pm25Avg}
                      </div>
                      <div className="text-xs text-red-600">µg/m³</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4 border border-red-100">
                      <div className="text-xs text-foreground/60 mb-1">NO₂</div>
                      <div className="text-2xl font-bold text-red-600">
                        {fastestRoute.no2Avg}
                      </div>
                      <div className="text-xs text-red-600">ppb</div>
                    </div>
                  </div>
                </div>

                {/* Environmental Metrics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                    Environmental Cost
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-4 border border-red-100 flex items-center gap-2">
                      <Wind className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="text-xs text-foreground/60">CO₂</div>
                        <div className="text-xl font-bold text-red-600">
                          {fastestRoute.co2_g}g
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4 border border-red-100 flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="text-xs text-foreground/60">Fuel</div>
                        <div className="text-xl font-bold text-red-600">
                          {fastestRoute.fuelLiters.toFixed(2)}L
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Congestion */}
                <div className="bg-white/70 rounded-lg p-4 border border-red-100">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Traffic Congestion
                    </span>
                    <span className="font-bold text-red-600">
                      {Math.round(fastestRoute.congIndex * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors">
                Choose This Route
              </button>
            </div>

            {/* Green Route Card */}
            <div className="border-2 border-eco-green bg-gradient-to-br from-eco-mint to-eco-mint/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ring-2 ring-eco-green/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-eco-green flex items-center gap-2">
                  <Leaf className="w-6 h-6" />
                  Green Route ⭐
                </h2>
                <span className="bg-eco-green text-white px-4 py-2 rounded-full font-bold text-lg">
                  {formatTime(greenRoute.duration_s)}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {/* Basic Info */}
                <div className="bg-white/70 rounded-lg p-4 space-y-3 border border-eco-green/30">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Distance</span>
                    <span className="font-bold text-foreground">
                      {greenRoute.distance_km} km
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Avg Speed</span>
                    <span className="font-bold text-foreground">
                      {greenRoute.traffic_speed} km/h
                    </span>
                  </div>
                </div>

                {/* Pollution Metrics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-eco-green text-sm uppercase tracking-wide">
                    Pollution Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-4 border border-eco-green/30">
                      <div className="text-xs text-foreground/60 mb-1">PM2.5</div>
                      <div className="text-2xl font-bold text-eco-green">
                        {greenRoute.pm25Avg}
                      </div>
                      <div className="text-xs text-eco-green">µg/m³</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4 border border-eco-green/30">
                      <div className="text-xs text-foreground/60 mb-1">NO₂</div>
                      <div className="text-2xl font-bold text-eco-green">
                        {greenRoute.no2Avg}
                      </div>
                      <div className="text-xs text-eco-green">ppb</div>
                    </div>
                  </div>
                </div>

                {/* Environmental Metrics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-eco-green text-sm uppercase tracking-wide">
                    Environmental Cost
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-4 border border-eco-green/30 flex items-center gap-2">
                      <Wind className="w-5 h-5 text-eco-green" />
                      <div>
                        <div className="text-xs text-foreground/60">CO₂</div>
                        <div className="text-xl font-bold text-eco-green">
                          {greenRoute.co2_g}g
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4 border border-eco-green/30 flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-eco-green" />
                      <div>
                        <div className="text-xs text-foreground/60">Fuel</div>
                        <div className="text-xl font-bold text-eco-green">
                          {greenRoute.fuelLiters.toFixed(2)}L
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Congestion */}
                <div className="bg-white/70 rounded-lg p-4 border border-eco-green/30">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-eco-green" />
                      Traffic Congestion
                    </span>
                    <span className="font-bold text-eco-green">
                      {Math.round(greenRoute.congIndex * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/route-impact-map?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)}
                className="w-full px-4 py-3 bg-eco-green text-white font-bold rounded-lg hover:bg-eco-teal transition-colors"
              >
                Choose Green Route
              </button>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="bg-gradient-to-r from-eco-green/10 to-eco-teal/10 border-2 border-eco-green/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-7 h-7 text-eco-green" />
              <h2 className="text-2xl font-bold text-foreground">
                By Choosing Green Route, You Save:
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CO2 Saved */}
              <div className="bg-white rounded-xl p-6 border-2 border-eco-green/20 hover:border-eco-green transition-colors">
                <div className="text-eco-green/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  CO₂ Reduction
                </div>
                <div className="text-4xl font-bold text-eco-green mb-1">
                  {savings.co2Saved}g
                </div>
                <div className="text-sm text-foreground/60">
                  That's like planting{" "}
                  <span className="font-bold text-eco-green">
                    {Math.round(savings.co2Saved / 21)}
                  </span>{" "}
                  trees!
                </div>
              </div>

              {/* Fuel Saved */}
              <div className="bg-white rounded-xl p-6 border-2 border-eco-green/20 hover:border-eco-green transition-colors">
                <div className="text-eco-green/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  Fuel Saved
                </div>
                <div className="text-4xl font-bold text-eco-green mb-1">
                  {savings.fuelSaved.toFixed(2)}L
                </div>
                <div className="text-sm text-foreground/60">
                  Save ₹{Math.round(savings.fuelSaved * 100)} on fuel
                </div>
              </div>

              {/* PM2.5 Reduction */}
              <div className="bg-white rounded-xl p-6 border-2 border-eco-green/20 hover:border-eco-green transition-colors">
                <div className="text-eco-green/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  PM2.5 Reduction
                </div>
                <div className="text-4xl font-bold text-eco-green mb-1">
                  {savings.pm25Reduction.toFixed(0)}%
                </div>
                <div className="text-sm text-foreground/60">
                  Breathe cleaner air
                </div>
              </div>

              {/* NO2 Reduction */}
              <div className="bg-white rounded-xl p-6 border-2 border-eco-green/20 hover:border-eco-green transition-colors">
                <div className="text-eco-green/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  NO₂ Reduction
                </div>
                <div className="text-4xl font-bold text-eco-green mb-1">
                  {savings.no2Reduction.toFixed(0)}%
                </div>
                <div className="text-sm text-foreground/60">
                  Better respiratory health
                </div>
              </div>

              {/* Congestion Reduction */}
              <div className="bg-white rounded-xl p-6 border-2 border-eco-green/20 hover:border-eco-green transition-colors">
                <div className="text-eco-green/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  Less Traffic
                </div>
                <div className="text-4xl font-bold text-eco-green mb-1">
                  {savings.congestionReduction.toFixed(0)}%
                </div>
                <div className="text-sm text-foreground/60">
                  Smoother driving experience
                </div>
              </div>

              {/* Extra Time */}
              <div className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <div className="text-orange-600/60 text-sm font-semibold uppercase tracking-wide mb-2">
                  Extra Time
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-1">
                  +{Math.round(savings.extraTime)}m
                </div>
                <div className="text-sm text-foreground/60">
                  Worth the wait for the planet!
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-8">
            <p className="text-foreground/70 mb-4">
              Ready to make a difference?
            </p>
            <button
              onClick={() => navigate("/impact-route")}
              className="px-8 py-4 bg-eco-green text-white font-bold rounded-xl hover:bg-eco-teal transition-all text-lg shadow-lg hover:shadow-xl"
            >
              Explore Interactive Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
