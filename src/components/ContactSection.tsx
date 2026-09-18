import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { MapPin, Mail, MessageCircle, Send, Sparkles, CheckCircle2, Clock, Globe } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface ContactSectionProps {
  settings: SiteSettings;
  prefilledDestination?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  prefilledDestination = '',
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('United States (+1)');
  const [destination, setDestination] = useState(prefilledDestination || 'Udaipur, Rajasthan');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('150 - 250 Guests');
  const [grandeur, setGrandeur] = useState('Signature Royal Celebration');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = encodeURIComponent(
      `*New Destination Wedding Consultation*\n\n` +
      `*Name:* ${name}\n` +
      `*Country/Location:* ${country}\n` +
      `*Phone/WhatsApp:* ${contact}\n` +
      `*Target Destination:* ${destination}\n` +
      `*Tentative Date:* ${date || 'Flexible'}\n` +
      `*Expected Guests:* ${guests}\n` +
      `*Celebration Scale:* ${grandeur}\n` +
      `*Vision/Notes:* ${notes || 'Looking for bespoke royal planning in Udaipur.'}`
    );

    const waUrl = `https://wa.me/${settings.whatsapp}?text=${message}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="rasm-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Private Consultation</span>
              </div>
              {/* Cinzel 400 heading */}
              <h2 className="font-cinzel font-normal text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-[0.03em]">
                Let’s Begin Your <span className="gold-gradient-text italic font-normal">Royal Story</span>
              </h2>
              <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
                Connect with our senior wedding architects in Udaipur. Whether you reside in the US, UK, Middle East, or India, we ensure every detail is curated with royal distinction.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-ivory-200 border border-gold/25 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gold/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-gold-dark font-medium mb-1">
                    Udaipur Studio & Office
                  </h4>
                  <p className="text-charcoal-700 text-xs sm:text-sm font-light leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-600/25 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-600/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-emerald-700 font-medium mb-1">
                    Global WhatsApp Concierge
                  </h4>
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal-800 text-xs sm:text-sm hover:text-emerald-700 transition-colors font-normal"
                  >
                    +{settings.whatsapp} (Direct 24/7 International Desk)
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ivory-200 border border-gold/25 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gold/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-gold-dark font-medium mb-1">
                    Official Inquiries & Proposals
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-charcoal-800 text-xs sm:text-sm hover:text-gold-dark transition-colors font-normal"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ivory-200 border border-gold/25 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gold/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-5 h-5 text-gold-dark" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest text-gold-dark font-medium mb-1">
                    International Call Windows
                  </h4>
                  <p className="text-charcoal-700 text-xs sm:text-sm font-light">
                    US / UK / Europe / India hours coordinated daily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Editorial Consultation Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-8 sm:p-10 rounded-3xl bg-white border-gold/30 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-cinzel font-normal text-2xl text-charcoal-900">
                    Thank You, {name || 'Esteemed Couple'}
                  </h3>
                  <p className="text-charcoal-600 text-sm font-light max-w-md mx-auto">
                    Your destination wedding inquiry has been registered. Opening WhatsApp now to connect directly with our head planner.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-charcoal-900 bg-gold hover:bg-gold-light"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-cinzel font-normal text-2xl text-charcoal-900 mb-1">
                    Request a Bespoke Proposal
                  </h3>
                  <p className="text-charcoal-500 text-xs sm:text-sm font-light mb-6">
                    Tell us your vision. We provide transparent palatial venue estimates and bespoke itineraries.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        Couple / Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maya & Daniel"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        Your Current Country / City *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="United States (+1)">United States (+1)</option>
                        <option value="United Kingdom (+44)">United Kingdom (+44)</option>
                        <option value="Canada (+1)">Canada (+1)</option>
                        <option value="United Arab Emirates (+971)">United Arab Emirates (+971)</option>
                        <option value="India (+91)">India (+91)</option>
                        <option value="Australia (+61)">Australia (+61)</option>
                        <option value="Europe / Other">Europe / Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        Preferred Palace Destination
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="Udaipur, Rajasthan">Udaipur, Rajasthan (Palaces & Lakes)</option>
                        <option value="Jaipur, Rajasthan">Jaipur, Rajasthan (Historic Forts)</option>
                        <option value="Rishikesh, Uttarakhand">Rishikesh (Ganga Ghats Serenity)</option>
                        <option value="Goa">Goa (Beachfront Mandap)</option>
                        <option value="Jim Corbett">Jim Corbett (Wilderness Luxury)</option>
                        <option value="Nathdwara & Mount Abu">Nathdwara & Mount Abu</option>
                        <option value="Other / Multi-City">Other / Multi-City</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        Tentative Wedding Date / Season
                      </label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g. Winter 2026 / Dec 2026"
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                        Celebration Scale & Ambition
                      </label>
                      <select
                        value={grandeur}
                        onChange={(e) => setGrandeur(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="Intimate Palatial (< 100 Guests)">Intimate Palatial (&lt; 100 Guests)</option>
                        <option value="Signature Royal Celebration (150 - 300 Guests)">Signature Royal Celebration (150 - 300 Guests)</option>
                        <option value="Grand Imperial Extravaganza (300+ Guests)">Grand Imperial Extravaganza (300+ Guests)</option>
                        <option value="Bespoke Multi-Day Palace Takeover">Bespoke Multi-Day Palace Takeover</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-700 mb-2">
                      Your Wedding Vision & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. We want an intimate 3-day palace wedding with sunset pheras and royal Mewari banquet..."
                      className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-gold/25 text-charcoal-900 placeholder-stone-400 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="pt-2">
                    <AnimatedButton
                      variant="gold-shimmer"
                      size="lg"
                      type="submit"
                      className="w-full justify-center"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Connect with Udaipur Head Planner
                    </AnimatedButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
