import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [grandeur, setGrandeur] = useState('Signature Royal Celebration');
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open so page doesn't scroll underneath
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  // Render modal directly to document.body via createPortal
  // This guarantees it is ALWAYS dead-centered in the current active screen viewport!
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gold/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_25px_70px_rgba(0,0,0,0.35)] my-auto transition-all animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-charcoal-700 hover:bg-stone-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-manrope font-medium text-2xl text-charcoal-900 tracking-tight">Opening WhatsApp...</h3>
            <p className="text-charcoal-600 text-sm">Connecting with our senior wedding concierge.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.2em] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="gold-gradient-text font-semibold">Private Consultation</span>
            </div>
            <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight leading-snug">
              Plan Your Royal Celebration
            </h3>
            <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
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
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-charcoal-900 text-sm focus:outline-none focus:border-gold focus:bg-white transition-colors"
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
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-charcoal-900 text-sm focus:outline-none focus:border-gold focus:bg-white transition-colors"
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
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-charcoal-900 text-xs focus:outline-none focus:border-gold focus:bg-white transition-colors"
                >
                  <option value="Udaipur, Rajasthan">Udaipur, RJ</option>
                  <option value="Jaipur, Rajasthan">Jaipur, RJ</option>
                  <option value="Jodhpur, Rajasthan">Jodhpur, RJ</option>
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
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-charcoal-900 text-xs focus:outline-none focus:border-gold focus:bg-white transition-colors"
                >
                  <option value="Intimate Palatial (< 100 Guests)">Intimate Palatial (&lt; 100 Guests)</option>
                  <option value="Signature Royal (150 - 300 Guests)">Signature Royal (150 - 300 Guests)</option>
                  <option value="Grand Imperial (300+ Guests)">Grand Imperial (300+ Guests)</option>
                  <option value="Bespoke Palace Takeover">Bespoke Palace Takeover</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <AnimatedButton
                variant="gold-shimmer"
                size="md"
                type="submit"
                className="w-full justify-center text-sm py-3 font-medium shadow-md"
                icon={<Send className="w-4 h-4 text-[#E2C785]" />}
              >
                Connect on WhatsApp
              </AnimatedButton>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default InquiryModal;
