import { useState } from "react";
import { X, Building2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    city: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-eco-teal to-eco-green p-6 flex items-center justify-between">
          <h2 id="contact-title" className="text-2xl font-headline font-bold text-white">
            <Building2 className="w-6 h-6 inline mr-2" />
            City Integration
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-eco-green rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            aria-label="Close contact modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-foreground/70 text-sm mb-6">
                Let's talk about bringing eco Yatra to your city. Our team will
                reach out within 24 hours.
              </p>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your city's needs..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-teal resize-none"
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full px-6 py-4 bg-eco-teal text-white font-semibold rounded-lg",
                  "hover:bg-eco-green transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-eco-teal",
                  "shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2"
                )}
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

              <p className="text-xs text-foreground/50 text-center">
                We respect your privacy. Your data is never shared.
              </p>
            </form>
          ) : (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-eco-mint rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8 text-eco-green" />
              </div>
              <h3 className="text-2xl font-bold text-eco-green">
                Message Sent!
              </h3>
              <p className="text-foreground/70">
                Thank you. Our team will contact you soon at {formData.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
