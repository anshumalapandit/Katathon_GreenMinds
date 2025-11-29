import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConditionalVoiceAssistant from "@/components/ConditionalVoiceAssistant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Donate from "./pages/Donate";
import EcoCoins from "./pages/EcoCoins";
import NotFound from "./pages/NotFound";
import GreenRoute from "./pages/GreenRoute";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import ImpactRouteAnalyzer from "./pages/ImpactRouteAnalyzer";
import RouteImpactMap from "./pages/RouteImpactMap";
import GreenRouteComparison from "./pages/GreenRouteComparison";
import VouchersPage from "./pages/VouchersPage";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ConditionalVoiceAssistant />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/eco-coins" element={<EcoCoins />} />
              <Route path="/green-route" element={<GreenRoute />} />
              <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
              <Route path="/impact-route" element={<ImpactRouteAnalyzer />} />
              <Route path="/route-impact-map" element={<RouteImpactMap />} />
              <Route path="/green-route-comparison" element={<GreenRouteComparison />} />
              <Route path="/vouchers" element={<VouchersPage />} />
              <Route path="/vouchers/:id" element={<VoucherDetailPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
