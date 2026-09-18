import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  defaultDestination?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  settings,
  defaultDestination = 'Udaipur, Rajasthan',
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [grandeur, setGrandeur] = useState('Signature Royal Celebration');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = encodeURIComponent(
      `*Private Wedding Planning Consultation*\n\n` +
      `*Name:* ${name}\n` +
      `*WhatsApp:* ${contact}\n` +
      `*Preferred Destination:* ${destination}\n` +
      `*Celebration Scale:* ${grandeur}\n`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${settings.whatsapp}?text=${message}`, '_blank');
      onClose();
      setSubmitted(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white border border-gold/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-charcoal-700 hover:bg-stone-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-cinzel font-normal text-2xl text-charcoal-900">Opening WhatsApp...</h3>
            <p className="text-charcoal-600 text-sm">Connecting with our senior wedding concierge.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.2em] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Private Consultation</span>
            </div>
            {/* Cinzel 400 heading */}
            <h3 className="font-cinzel font-normal text-2xl sm:text-3xl text-charcoal-900">
              Plan Your Royal Celebration
            </h3>
            <p className="text-charcoal-500 text-xs font-light">
              Connect directly with our Udaipur planners for date availability, palace shortlists, and budget blueprints.
            </p>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-1">
                Couple / Contact Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-1">
                WhatsApp Phone Number (with country code)
              </label>
              <input
                type="tel"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+1 555-0192 or +91 98290 12345"
                className="w-full px-4 py-2.5 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-1">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-xs focus:outline-none focus:border-gold"
                >
                  <option value="Udaipur">Udaipur, RJ</option>
                  <option value="Jaipur">Jaipur, RJ</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Goa">Goa</option>
                  <option value="Jim Corbett">Jim Corbett</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-1">
                  Celebration Scale
                </label>
                <select
                  value={grandeur}
                  onChange={(e) => setGrandeur(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-xs focus:outline-none focus:border-gold"
                >
                  <option value="Intimate Palatial (< 100 Guests)">Intimate Palatial (&lt; 100 Guests)</option>
                  <option value="Signature Royal (150 - 300 Guests)">Signature Royal (150 - 300 Guests)</option>
                  <option value="Grand Imperial (300+ Guests)">Grand Imperial (300+ Guests)</option>
                  <option value="Bespoke Palace Takeover">Bespoke Palace Takeover</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <AnimatedButton
                variant="gold-shimmer"
                size="md"
                type="submit"
                className="w-full justify-center"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Connect on WhatsApp
              </AnimatedButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
