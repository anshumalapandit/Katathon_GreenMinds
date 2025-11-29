import { Gift, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  onOpenDonateModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function CallToAction({
  onOpenDonateModal,
  onOpenContactModal,
}: CallToActionProps) {
  return (
    <section id="get-involved" className="py-16 md:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-4">
            Get Involved & Make Impact
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Whether you're an individual contributor or a city partner, there's
            a way to join the green movement
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Donate Card */}
          <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-eco-yellow/10 to-white border-2 border-eco-yellow/30 hover:border-eco-yellow p-8 sm:p-10 transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:translate-y-[-4px]">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-eco-yellow/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-eco-yellow/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-7 h-7 text-eco-yellow" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-4">
                Donate to Green Initiatives
              </h3>

              <p className="text-foreground/70 leading-relaxed mb-8">
                Every donation funds city tree-planting, park maintenance, and
                clean-air programs. Use QR vouchers to track impact in real
                time. Secure, transparent, and rewarding.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Instant QR voucher generation",
                  "Real-time impact tracking",
                  "Partner with local governments",
                  "$5 can plant one tree",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-eco-yellow mt-1">✓</span>
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenDonateModal}
                className={cn(
                  "w-full px-8 py-4 bg-eco-yellow text-foreground font-semibold rounded-lg",
                  "hover:bg-yellow-600 transition-all duration-200 transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-yellow",
                  "shadow-soft hover:shadow-soft-lg"
                )}
                aria-label="Donate to green city initiatives"
              >
                Donate Now
              </button>
            </div>
          </div>

          {/* Integration Card */}
          <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-eco-teal/10 to-white border-2 border-eco-teal/30 hover:border-eco-teal p-8 sm:p-10 transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:translate-y-[-4px]">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-eco-teal/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform" />

            <div className="relative z-10">
              <div className="w-14 h-14 bg-eco-teal/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7 text-eco-teal" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-headline font-bold text-foreground mb-4">
                Integrate with Your City
              </h3>

              <p className="text-foreground/70 leading-relaxed mb-8">
                Is your city ready for green routing? We partner with
                municipalities to integrate real-time data, funding programs,
                and community dashboards.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Custom data integrations",
                  "Branded city portals",
                  "Community reporting tools",
                  "Impact dashboard & analytics",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-eco-teal mt-1">✓</span>
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenContactModal}
                className={cn(
                  "w-full px-8 py-4 bg-eco-teal text-white font-semibold rounded-lg",
                  "hover:bg-eco-green transition-all duration-200 transform hover:scale-105",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-teal",
                  "shadow-soft hover:shadow-soft-lg"
                )}
                aria-label="Contact us for city integration"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center bg-eco-mint/30 rounded-2xl border border-eco-mint p-8">
          <p className="text-foreground/70 mb-6">
            Not sure where to start? Check out our documentation or schedule a
            quick call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#docs"
              className={cn(
                "px-6 py-3 bg-white text-eco-green font-semibold rounded-lg border-2 border-eco-green",
                "hover:bg-eco-mint transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-green",
                "shadow-soft"
              )}
            >
              Read Docs
            </a>
            <a
              href="#calendar"
              className={cn(
                "px-6 py-3 bg-eco-green text-white font-semibold rounded-lg",
                "hover:bg-eco-teal transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
                "shadow-soft hover:shadow-soft-lg"
              )}
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
