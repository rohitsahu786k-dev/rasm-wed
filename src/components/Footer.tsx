import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { FullSettings } from '@/components/SiteSettingsProvider';
import { NewsletterForm, BackToTop } from '@/components/FooterClient';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  destinations: [
    { label: 'Wedding Planner in Udaipur', href: '/wedding-planner-in-udaipur/' },
    { label: 'Wedding Planner in Jaipur', href: '/wedding-planner-in-jaipur/' },
    { label: 'Wedding Planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' },
    { label: 'Wedding Planner in Jaisalmer', href: '/wedding-planner-in-jaisalmer/' },
    { label: 'Wedding Planner in Goa', href: '/wedding-planner-in-goa/' },
    { label: 'Wedding Planner in Kumbhalgarh', href: '/wedding-planner-in-kumbhalgarh/' },
    { label: 'Wedding Planner in Mount Abu', href: '/wedding-planner-in-mount-abu/' },
    { label: 'Wedding Planner in Nathdwara', href: '/wedding-planner-in-nathdwara/' },
    { label: 'Wedding Planner in Pushkar', href: '/wedding-planner-in-pushkar/' },
    { label: 'Wedding Planner in Kota', href: '/wedding-planner-in-kota/' },
    { label: 'Wedding Planner in Ranakpur', href: '/wedding-planner-in-ranakpur/' },
    { label: 'Wedding Planner in Thailand', href: '/wedding-planner-in-thailand/' },
    { label: 'Wedding Planner in Ahmedabad', href: '/wedding-planner-in-ahmedabad/' },
    { label: 'Wedding Planner in Gandhinagar', href: '/wedding-planner-in-gandhinagar/' },
    { label: 'Rishikesh Destination Wedding', href: '/why-rishikesh-is-new-destination-wedding-hotspot/' },
  ],
  services: [
    { label: 'Wedding Planning Services', href: '/services/' },
    { label: 'Wedding Decoration in Udaipur', href: '/traditional-decoration/' },
    { label: 'Venue Selection and Booking', href: '/services/#venues' },
    { label: 'Wedding Catering', href: '/services/#food' },
    { label: 'Wedding Entertainment and Artists', href: '/services/#entertainment' },
    { label: 'Guest Hospitality', href: '/services/#hospitality' },
    { label: 'Corporate Events in Udaipur', href: '/corporate-events/' },
  ],
  venues: [
    { label: 'Taj Lake Palace Udaipur', href: '/wedding-planner-in-udaipur/' },
    { label: 'The Oberoi Udaivilas', href: '/wedding-planner-in-udaipur/' },
    { label: 'Jagmandir Island Palace', href: '/wedding-planner-in-udaipur/' },
    { label: 'Rambagh Palace Jaipur', href: '/wedding-planner-in-jaipur/' },
    { label: 'Umaid Bhawan Palace Jodhpur', href: '/wedding-planner-in-jodhpur/' },
    { label: 'Fairmont Jaipur', href: '/wedding-planner-in-jaipur/' },
    { label: 'Grand Hyatt Goa', href: '/wedding-planner-in-goa/' },
  ],
  company: [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Wedding Gallery', href: '/gallery/' },
    { label: 'Wedding Blog', href: '/blog/' },
    { label: 'All Wedding Destinations', href: '/wedding-destination/' },
    { label: 'Contact Us', href: '/contact-us/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'Refund Policy', href: '/refund-policy/' },
    { label: 'Shipping Policy', href: '/shipping-policy/' },
  ],
};

export const Footer: React.FC<{ settings: FullSettings }> = ({ settings }) => {
  return (
    <footer className="relative bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F4EBDB] text-charcoal-800 overflow-hidden pt-16 pb-10 font-manrope font-normal border-t border-gold/30 select-none z-10">
      {/* Signature Watermark Stroke Typography in Subtle Gold */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center items-end pointer-events-none z-0 overflow-hidden">
        <p aria-hidden="true" className="text-[12vw] sm:text-[14vw] font-manrope font-medium text-transparent [-webkit-text-stroke:1px_rgba(197,160,89,0.12)] leading-none select-none tracking-normal opacity-70 whitespace-nowrap">
          RASM WEDDINGS
        </p>
      </div>

      {/* Golden Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-gradient-to-tl from-amber-200/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="rasm-container relative z-10 space-y-16">
        
        {/* VIP Newsletter & Direct Inquiries Card (Luxury White-Gold Card Style) */}
        <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-br from-white/95 via-[#FDFCFA] to-[#F7F0DF] border border-gold/40 shadow-[0_16px_45px_rgba(197,160,89,0.15)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.12),transparent_65%)] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-gold-dark text-[11px] uppercase tracking-[0.3em] font-medium">Wedding Planning Updates</p>
              <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-normal leading-snug">
                Get Wedding Planning Tips from Udaipur
              </h3>
              <p className="text-charcoal-600 text-sm font-normal max-w-xl leading-relaxed tracking-normal">
                Venue ideas, season guides and decor inspiration for weddings in Udaipur and across Rajasthan, sent to your inbox.
              </p>
            </div>

            {/* Right: Form & WhatsApp Trigger */}
            <div className="lg:col-span-5 space-y-4">
              <NewsletterForm />

              <div className="flex items-center justify-between text-xs text-charcoal-500 pt-1 tracking-normal">
                <span>We never share your email.</span>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20would%20like%20to%20receive%20the%20wedding%20lookbook.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient-text hover:underline flex items-center gap-1 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Multi-Column Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-2">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="inline-block group focus:outline-none" aria-label="Rasm Weddings Home">
              <Image
                src="/rasm-official-logo.png"
                alt="Rasm Wedding & Events"
                className="h-12 w-auto object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
               width={1024} height={497} sizes="100px" />
            </Link>
            <p className="text-charcoal-600 text-sm leading-relaxed font-normal tracking-normal">
              {settings.description || 'Luxury wedding planner in Udaipur, Rajasthan'}. We plan palace weddings, lake weddings and destination weddings across India, with venues, decor, hospitality and execution managed by one team.
            </p>

            {/* Social Pill Badges */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/40 bg-white/80 shadow-xs flex items-center justify-center text-charcoal-700 hover:border-gold hover:text-gold-dark hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all"
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
                className="w-10 h-10 rounded-full border border-gold/40 bg-white/80 shadow-xs flex items-center justify-center text-charcoal-700 hover:border-emerald-500 hover:text-emerald-700 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-10 h-10 rounded-full border border-gold/40 bg-white/80 shadow-xs flex items-center justify-center text-charcoal-700 hover:border-gold hover:text-gold-dark hover:shadow-[0_0_12px_rgba(197,160,89,0.25)] transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-charcoal-600 text-xs pt-1 tracking-normal">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {settings.address}
              </span>
            </div>
          </div>

          {/* Column 2: Royal Destinations */}
          <div>
            <h4 className="font-manrope font-medium text-[16px] text-charcoal-900 mb-4 pb-1.5 border-b border-gold/20 tracking-normal">
              Wedding Destinations
            </h4>
            <ul className="space-y-2.5 text-[14.5px]">
              {footerLinks.destinations.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-charcoal-600 hover:text-charcoal-950 hover:underline transition-colors text-left leading-relaxed tracking-normal inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Bespoke Services */}
          <div>
            <h4 className="font-manrope font-medium text-[16px] text-charcoal-900 mb-4 pb-1.5 border-b border-gold/20 tracking-normal">
              Wedding Services
            </h4>
            <ul className="space-y-2.5 text-[14.5px]">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-charcoal-600 hover:text-charcoal-950 hover:underline transition-colors text-left leading-relaxed tracking-normal inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Palatial Venues */}
          <div>
            <h4 className="font-manrope font-medium text-[16px] text-charcoal-900 mb-4 pb-1.5 border-b border-gold/20 tracking-normal">
              Popular Wedding Venues
            </h4>
            <ul className="space-y-2.5 text-[14.5px]">
              {footerLinks.venues.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-charcoal-600 hover:text-charcoal-950 hover:underline transition-colors text-left leading-relaxed tracking-normal inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Heritage & Trust */}
          <div>
            <h4 className="font-manrope font-medium text-[16px] text-charcoal-900 mb-4 pb-1.5 border-b border-gold/20 tracking-normal">
              Company
            </h4>
            <ul className="space-y-2.5 text-[14.5px]">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-charcoal-600 hover:text-charcoal-950 hover:underline transition-colors text-left leading-relaxed tracking-normal inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright on Left, Powered & Developed by iprixmedia.com on Left/Center, Back-to-Top on Right */}
        <div className="pt-6 border-t border-gold/25 flex flex-col md:flex-row items-center justify-between gap-4 text-charcoal-700 text-[14px] tracking-normal font-normal">
          
          {/* Left Side: Copyright + Powered and Developed by */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} {settings.title || 'Rasm Weddings & Events'}. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-charcoal-300">|</span>
            <span className="font-normal text-charcoal-600">
              Powered and Developed by{' '}
              <a
                href="https://iprixmedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient-text font-medium hover:underline inline-block"
              >
                iprixmedia.com
              </a>
            </span>
          </div>

          {/* Right Side: Back to Top */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-500 font-normal">
              Udaipur, Rajasthan. Weddings across India and abroad.
            </span>
            <BackToTop />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
