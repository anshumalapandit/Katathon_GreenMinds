import { MapPin, Heart, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const features = [
    {
      id: 1,
      icon: MapPin,
      title: "Live maps & correlation analytics",
      description:
        "Real-time traffic and air-quality data from OpenAQ, OpenStreetMap, and city sensors — all synchronized.",
      stat: "95% accuracy in PM2.5 prediction",
    },
    {
      id: 2,
      icon: Heart,
      title: "Personalized routes & health profiles",
      description:
        "Input your health conditions. We weight routes for asthma, heart health, mobility, and pregnancy.",
      stat: "42% reduction in exposure",
    },
    {
      id: 3,
      icon: Gift,
      title: "Community & donations (QR vouchers)",
      description:
        "Donate to city greening. QR voucher system partners with local governments for instant impact.",
      stat: "250K trees planted",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white border-b border-border"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-4"
          >
            How eco Yatra Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Three simple steps to cleaner, healthier travel in your city
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={cn(
                  "relative group rounded-2xl p-8 transition-all duration-300",
                  "bg-white border border-border hover:border-eco-teal hover:shadow-soft-lg",
                  "hover:translate-y-[-4px]",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-eco-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />

                {/* Number Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-eco-teal/10 rounded-full flex items-center justify-center">
                  <span className="text-eco-teal font-bold text-lg">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-eco-teal to-eco-green rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-headline font-bold text-foreground mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-border">
                  <p className="text-eco-green font-semibold text-sm">
                    {feature.stat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Under */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-foreground/60 mb-6">
            Ready to reduce your pollution exposure?
          </p>
          <button
            className={cn(
              "px-8 py-3 bg-eco-green text-white font-semibold rounded-lg",
              "hover:bg-eco-teal transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-green",
              "shadow-soft hover:shadow-soft-lg"
            )}
          >
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}
