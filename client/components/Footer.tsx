import { useState } from "react";
import { Leaf, Moon, Maximize2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [language, setLanguage] = useState("en");

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Documentation", href: "#docs" },
    { label: "GitHub", href: "https://github.com/ecoyatra", external: true },
    { label: "Contact", href: "#contact" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "ja", label: "日本語" },
  ];

  return (
    <footer
      className={cn(
        "bg-white border-t border-border transition-all duration-300",
        highContrast && "bg-black text-white"
      )}
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className={cn(
                  "w-8 h-8 bg-gradient-to-br from-eco-teal to-eco-green rounded-lg flex items-center justify-center",
                  highContrast && "bg-white border-2 border-black"
                )}
              >
                <Leaf className={cn("w-5 h-5 text-white", highContrast && "text-black")} />
              </div>
              <span className="font-headline font-bold text-lg">eco Yatra</span>
            </div>

            <p className="text-foreground/60 mb-6 text-sm leading-relaxed">
              Geo-intelligence platform for healthier, sustainable travel.
              Choose clean routes. Donate to green cities. Report pollution.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { label: "Twitter", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Instagram", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={cn(
                    "w-10 h-10 rounded-lg border border-border flex items-center justify-center",
                    "hover:bg-eco-mint hover:border-eco-teal transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                    highContrast && "border-white hover:bg-white hover:text-black"
                  )}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "API Docs", href: "#api" },
                { label: "Dashboard", href: "#dashboard" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-foreground/60 hover:text-foreground transition-colors text-sm",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-eco-teal",
                      highContrast && "text-gray-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Blog", href: "#blog" },
                { label: "Careers", href: "#careers" },
                { label: "Partners", href: "#partners" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-foreground/60 hover:text-foreground transition-colors text-sm",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-eco-teal",
                      highContrast && "text-gray-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className={cn(
            "border-t border-border mb-8",
            highContrast && "border-white/20"
          )}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-foreground/50">
            <p>
              &copy; {currentYear} eco Yatra. All rights reserved.
            </p>
            <div className="hidden sm:block">•</div>
            <div className="flex gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "hover:text-foreground transition-colors",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-eco-teal",
                    highContrast && "text-gray-300 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Accessibility & Language Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto">
            {/* Accessibility Toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "p-2 rounded-lg border border-border transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                  "hover:bg-eco-mint",
                  highContrast
                    ? "bg-white border-white text-black"
                    : "text-foreground/60 hover:text-foreground"
                )}
                title="Toggle high contrast mode"
                aria-label="Toggle high contrast mode"
              >
                <Moon className="w-4 h-4" />
              </button>

              <button
                onClick={() => setLargeText(!largeText)}
                className={cn(
                  "p-2 rounded-lg border border-border transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                  "hover:bg-eco-mint",
                  largeText
                    ? "bg-eco-mint border-eco-teal text-eco-green"
                    : "text-foreground/60 hover:text-foreground"
                )}
                title="Toggle large text mode"
                aria-label="Toggle large text mode"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={cn(
                  "pl-8 pr-4 py-2 rounded-lg border border-border text-sm font-medium",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal",
                  "bg-white text-foreground hover:border-eco-teal transition-colors",
                  "appearance-none cursor-pointer",
                  highContrast &&
                    "bg-black text-white border-white hover:bg-gray-900"
                )}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <Globe className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Accessibility Statement */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <details className="text-xs text-foreground/60">
            <summary className="cursor-pointer hover:text-foreground font-medium mb-2">
              ♿ Accessibility Statement
            </summary>
            <p className="mt-2 leading-relaxed">
              eco Yatra is committed to accessibility (WCAG 2.1 AA). We provide
              keyboard navigation, screen reader support, high-contrast modes,
              and voice-assistant integration. Need assistance? Contact us at
              accessibility@ecoyatra.earth
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
