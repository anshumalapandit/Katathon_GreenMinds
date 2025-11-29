import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function RouteImpactMap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";

  useEffect(() => {
    if (!origin || !destination) {
      navigate("/");
    }
  }, [origin, destination, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header isLoggedIn={false} isDashboard={false} />
      
      <div className="flex-1 w-full overflow-hidden">
        <iframe
          src={`/impact-route/impact.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`}
          title="Route Impact Analyzer Map"
          style={{
            width: "100%",
            height: "calc(100vh - 80px)",
            border: "none",
            display: "block"
          }}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}
