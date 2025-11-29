import { useState } from "react";
import { Menu, X, Leaf, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onOpenRouteModal?: () => void;
  onOpenDonateModal?: () => void;
  onOpenContactModal?: () => void;
  isDashboard?: boolean;
  isLoggedIn?: boolean;
}

export default function Header({
  onOpenRouteModal,
  onOpenDonateModal,
  onOpenContactModal,
  isDashboard = false,
  isLoggedIn = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Eco Coins", href: "/eco-coins" },
    { label: "Donate", href: "/donate" },
    { label: "Green Route", href: "/green-route" },
    { label: "Predictive Analytics", href: "/predictive-analytics" },
    { label: "Impact Route Analyzer", href: "/impact-route" },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border shadow-soft"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-eco-teal to-eco-green rounded-lg flex items-center justify-center"
              aria-label="eco Yatra"
            >
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="hidden sm:inline font-headline font-bold text-lg md:text-xl text-foreground">
              eco Yatra
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.startsWith("/") ? link.href : "#"}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-eco-mint hover:text-eco-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-teal",
                  "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {!isDashboard ? (
              <>
                <button
                  onClick={onOpenRouteModal}
                  className={cn(
                    "px-6 py-2 bg-eco-green text-white font-medium rounded-lg",
                    "hover:bg-eco-teal transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green"
                  )}
                  aria-label="Find Green Route - primary action"
                >
                  Find Green Route
                </button>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className={cn(
                      "px-4 py-2 text-foreground font-medium rounded-lg flex items-center gap-2",
                      "hover:bg-eco-mint transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-teal"
                    )}
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className={cn(
                      "px-4 py-2 text-foreground font-medium rounded-lg",
                      "hover:bg-eco-mint transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-teal"
                    )}
                  >
                    Sign In
                  </Link>
                )}
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-eco-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="lg:hidden pb-4 space-y-2 border-t border-border pt-4 animate-slide-down"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href.startsWith("/") ? link.href : "#"}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-md font-medium transition-colors",
                  "text-foreground/70 hover:text-foreground hover:bg-eco-mint",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isDashboard && (
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenRouteModal?.();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-eco-green text-white font-medium rounded-md hover:bg-eco-teal transition-colors text-sm"
                >
                  Find Route
                </button>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-foreground border border-border font-medium rounded-md hover:bg-eco-mint transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-foreground border border-border font-medium rounded-md hover:bg-eco-mint transition-colors text-sm text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
