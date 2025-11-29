import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const HEALTH_CONDITIONS = [
  { id: "asthma", label: "Asthma", emoji: "🫁" },
  { id: "allergies", label: "Allergies", emoji: "🤧" },
  { id: "heart", label: "Heart Condition", emoji: "❤️" },
  { id: "mobility", label: "Mobility Issues", emoji: "♿" },
  { id: "respiratory", label: "Respiratory Issues", emoji: "💨" },
  { id: "none", label: "No Health Issues", emoji: "✓" },
];

const ALLERGY_TYPES = [
  { id: "smoke", label: "Smoke", emoji: "💨" },
  { id: "dust", label: "Dust", emoji: "🌪️" },
  { id: "pollen", label: "Pollen", emoji: "🌾" },
  { id: "pollution", label: "Air Pollution", emoji: "🚗" },
  { id: "noise", label: "Noise", emoji: "🔊" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState<"basic" | "health">("basic");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [healthData, setHealthData] = useState({
    conditions: [] as string[],
    allergies: [] as string[],
    additionalInfo: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const toggleCondition = (conditionId: string) => {
    if (conditionId === "none") {
      setHealthData((prev) => ({
        ...prev,
        conditions: prev.conditions.includes("none") ? [] : ["none"],
      }));
    } else {
      setHealthData((prev) => {
        const newConditions = prev.conditions.includes(conditionId)
          ? prev.conditions.filter((c) => c !== conditionId)
          : [...prev.conditions.filter((c) => c !== "none"), conditionId];
        return { ...prev, conditions: newConditions };
      });
    }
  };

  const toggleAllergy = (allergyId: string) => {
    setHealthData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergyId)
        ? prev.allergies.filter((a) => a !== allergyId)
        : [...prev.allergies, allergyId],
    }));
  };

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setStep("health");
  };

  const handleHealthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      await signUp(formData.email, formData.password, formData.name, {
        conditions: healthData.conditions,
        allergies: healthData.allergies,
        additionalInfo: healthData.additionalInfo,
      });
      navigate("/");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-mint via-white to-white flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-eco-mint rounded-full -mr-48 -mt-48 opacity-30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-eco-mint/20 rounded-full -ml-36 -mb-36 opacity-20 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-eco-teal to-eco-green rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-bold text-2xl text-foreground">
            eco Yatra
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-soft-lg border border-border p-8">
          {step === "basic" ? (
            <>
              <h1 className="text-2xl font-headline font-bold text-foreground mb-2">
                Create Account
              </h1>
              <p className="text-foreground/60 text-sm mb-6">
                Join eco Yatra to find cleaner routes and make a green impact
              </p>

              <form onSubmit={handleBasicSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Next Button */}
                <button
                  type="submit"
                  className={cn(
                    "w-full px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                    "bg-eco-green text-white hover:bg-eco-teal cursor-pointer"
                  )}
                >
                  Continue to Health Profile
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Terms */}
                <p className="text-xs text-foreground/60 text-center">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-eco-green hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-foreground/70 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-eco-green font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-headline font-bold text-foreground mb-2">
                Health Profile
              </h1>
              <p className="text-foreground/60 text-sm mb-6">
                Help us personalize your routes based on your health needs
              </p>

              <form onSubmit={handleHealthSubmit} className="space-y-6">
                {/* Health Conditions */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Do you have any health conditions?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {HEALTH_CONDITIONS.map((condition) => (
                      <button
                        key={condition.id}
                        type="button"
                        onClick={() => toggleCondition(condition.id)}
                        className={cn(
                          "p-3 rounded-lg border-2 transition-all text-sm font-semibold",
                          healthData.conditions.includes(condition.id)
                            ? "border-eco-green bg-eco-mint text-eco-green"
                            : "border-border bg-white text-foreground hover:border-eco-teal"
                        )}
                      >
                        <span className="mr-2">{condition.emoji}</span>
                        {condition.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergies - only show if they have conditions */}
                {healthData.conditions.length > 0 && !healthData.conditions.includes("none") && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      What are you allergic or sensitive to?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {ALLERGY_TYPES.map((allergy) => (
                        <button
                          key={allergy.id}
                          type="button"
                          onClick={() => toggleAllergy(allergy.id)}
                          className={cn(
                            "p-3 rounded-lg border-2 transition-all text-sm font-semibold",
                            healthData.allergies.includes(allergy.id)
                              ? "border-eco-green bg-eco-mint text-eco-green"
                              : "border-border bg-white text-foreground hover:border-eco-teal"
                          )}
                        >
                          <span className="mr-2">{allergy.emoji}</span>
                          {allergy.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Any additional health information? (Optional)
                  </label>
                  <textarea
                    value={healthData.additionalInfo}
                    onChange={(e) =>
                      setHealthData((prev) => ({
                        ...prev,
                        additionalInfo: e.target.value,
                      }))
                    }
                    placeholder="e.g., I avoid areas with heavy traffic due to asthma..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal min-h-24 resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("basic")}
                    className="flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 bg-white text-foreground border-2 border-border hover:border-eco-teal"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "flex-1 px-6 py-3 font-semibold rounded-lg transition-all flex items-center justify-center gap-2",
                      isLoading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-eco-green text-white hover:bg-eco-teal cursor-pointer"
                    )}
                  >
                    {isLoading ? "Creating Account..." : "Complete Signup"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-foreground/60 text-sm hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
