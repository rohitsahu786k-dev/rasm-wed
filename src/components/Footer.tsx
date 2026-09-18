import React from 'react';
import { SiteSettings } from '../types';
import { MessageCircle, Mail, MapPin, Heart, ArrowUp, Instagram } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
}

const footerLinks = {
  destinations: [
    { label: 'Udaipur Palace Weddings', href: '/wedding-planner-in-udaipur' },
    { label: 'Jaipur Heritage Forts', href: '/wedding-planner-in-jaipur' },
    { label: 'Jodhpur & Jaisalmer', href: '/wedding-planner-in-jodhpur' },
    { label: 'Goa Beachfront Mandaps', href: '/wedding-planner-in-goa' },
    { label: 'Rishikesh Riverside', href: '/why-rishikesh-is-new-destination-wedding-hotspot' },
  ],
  services: [
    { label: 'Palatial Mandap Architecture', href: '/traditional-decoration' },
    { label: 'White-Glove Hospitality', href: '/services' },
    { label: 'Royal Baraat & Processions', href: '/services' },
    { label: 'Corporate & VIP Events', href: '/corporate-events' },
    { label: 'NRI Global Concierge', href: '/about-us' },
  ],
  company: [
    { label: 'About Rasm', href: '/about-us' },
    { label: 'Our Gallery', href: '/gallery' },
    { label: 'Blog & Inspiration', href: '#blog' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
};

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigateTo = (path: string) => {
    if (path.startsWith('#')) {
      const el = document.getElementById(path.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111111] text-white/70 text-xs font-manrope font-light relative z-10">

      {/* Top CTA band */}
      <div className="border-b border-white/10">
        <div className="rasm-container py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-2">✦ Begin Your Journey</p>
            <h3 className="font-cinzel font-normal text-xl sm:text-2xl text-white">
              Ready to plan your dream wedding in India?
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A059] text-white text-sm font-semibold hover:bg-[#D4AF37] transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="rasm-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <button onClick={scrollToTop} className="inline-block">
              <img
                src="/rasm-official-logo.png"
                alt="Rasm Wedding & Events"
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain brightness-200"
              />
            </button>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              {settings.description || 'Premier Luxury Destination Wedding Planner in Udaipur & Rajasthan'}. Crafting royal, bespoke celebrations with majestic heritage, warmth, and lifelong memories.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-start gap-2 text-white/40 text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]/70 mt-0.5 shrink-0" />
              <span>Udaipur, Rajasthan, India · Serving Worldwide</span>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-cinzel font-normal text-xs uppercase tracking-widest text-white/80 mb-5">
              Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigateTo(l.href)}
                    className="text-white/45 hover:text-[#C5A059] transition-colors text-left leading-relaxed"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-cinzel font-normal text-xs uppercase tracking-widest text-white/80 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigateTo(l.href)}
                    className="text-white/45 hover:text-[#C5A059] transition-colors text-left leading-relaxed"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-cinzel font-normal text-xs uppercase tracking-widest text-white/80 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigateTo(l.href)}
                    className="text-white/45 hover:text-[#C5A059] transition-colors text-left leading-relaxed"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="https://rasmwed.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-[#C5A059] transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="https://rasmwed.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-[#C5A059] transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-[11px]">
          <p>
            © {new Date().getFullYear()} {settings.title}. All rights reserved. Curated with{' '}
            <Heart className="w-3 h-3 text-[#C5A059] inline fill-[#C5A059]" /> in Udaipur, Rajasthan.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-white/15 text-white/40 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
