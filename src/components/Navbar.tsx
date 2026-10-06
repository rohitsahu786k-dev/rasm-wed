'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/components/SiteSettingsProvider';
import { useInquiry } from '@/components/InquiryProvider';
import {
  MessageCircle,
  Menu,
  X,
  Flower2,
  ChevronDown,
  ChevronRight,
  MapPin,
  ArrowRight,
  Building2,
  Home,
  Compass,
  Gem,
  Image as ImageIcon,
  BookOpen,
  Phone,
  Award,
  Users
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { WP_ORIGIN } from '@/lib/site';

const menuTransition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 14,
  stiffness: 120,
};

export const Navbar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const availabilityYears = `${currentYear}–${currentYear + 1}`;
  const settings = useSettings();
  const currentPath = (usePathname() || '/').replace(/(.)\/$/, '$1');
  const { open } = useInquiry();
  const onOpenInquiry = () => open();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'destinations' | 'services' | 'explore' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<'destinations' | 'services' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Palaces of Rajasthan (8 top royal destinations)
  const rajasthanDestinations = [
    { name: 'Udaipur Palaces', slug: 'wedding-planner-in-udaipur', desc: 'Lake Pichola & City Palace Heritage', badge: 'Signature' },
    { name: 'Jaipur Forts & Havelis', slug: 'wedding-planner-in-jaipur', desc: 'Pink City Style & Royal Mandaps', badge: 'Popular' },
    { name: 'Jodhpur Sun City', slug: 'wedding-planner-in-jodhpur', desc: 'Umaid Bhawan & Mehrangarh Fort', badge: 'Heritage' },
    { name: 'Jaisalmer Golden Dunes', slug: 'wedding-planner-in-jaisalmer', desc: 'Suryagarh & Thar Desert Magic', badge: 'Exotic' },
    { name: 'Kumbhalgarh Fortress', slug: 'wedding-planner-in-kumbhalgarh', desc: 'Historic Solitude & Hilltop Fort', badge: 'Fortress' },
    { name: 'Pushkar Sacred Oasis', slug: 'wedding-planner-in-pushkar', desc: 'Sacred Lakes & Desert Mandaps', badge: 'Serene' },
    { name: 'Mount Abu Hills', slug: 'wedding-planner-in-mount-abu', desc: 'Cool Aravalli Hill Station Celebrations', badge: 'Hill' },
    { name: 'Nathdwara Holy Temples', slug: 'wedding-planner-in-nathdwara', desc: 'Shrinathji Blessings & Sanctified Rites', badge: 'Divine' },
  ];

  // Coastal, Hills & Global Destinations (6 destinations)
  const otherDestinations = [
    { name: 'Goa Coastal Weddings', slug: 'wedding-planner-in-goa', desc: 'Sunset Oceanfront Beach Mandaps & Resorts', badge: 'Beach' },
    { name: 'Thailand International', slug: 'wedding-planner-in-thailand', desc: 'Phuket & Hua Hin Luxury Beach Celebrations', badge: 'Global' },
    { name: 'Kota Chambal Palaces', slug: 'wedding-planner-in-kota', desc: 'Chambal River Heritage & Royal Havelis', badge: 'Riverside' },
    { name: 'Ranakpur Architecture', slug: 'wedding-planner-in-ranakpur', desc: 'Intricate Marble Temples & Jungle Resorts', badge: 'Scenic' },
    { name: 'Ahmedabad Heritage', slug: 'wedding-planner-in-ahmedabad', desc: 'Historic Havelis, Sabarmati & Grand Lawns', badge: 'Metro' },
    { name: 'Gandhinagar Capital', slug: 'wedding-planner-in-gandhinagar', desc: 'Sprawling Green Resorts & Luxury Banquets', badge: 'Grand' },
  ];

  // Core Luxury Services
  const servicesList = [
    {
      title: 'Royal Wedding Planning & Production',
      desc: 'End-to-end planning, palace permits, lake mandaps, celebrity artists, and turnkey production.',
      icon: Gem,
      path: '/services',
      badge: 'Turnkey Luxury',
    },
    {
      title: 'Handmade Floral & Vedic Decor',
      desc: 'Handcrafted floral arrays, Vedic mandap architecture, Raj Gharana themes, and atmospheric lighting.',
      icon: Flower2,
      path: '/traditional-decoration',
      badge: 'Handmade Craft',
    },
    {
      title: 'VIP Hospitality & Guest Hospitality',
      desc: 'Airport royal reception, vintage car transfers, 24/7 guest helpline, and heritage welcome rituals.',
      icon: Users,
      path: '/services',
      badge: '5-Star Service',
    },
    {
      title: 'Corporate Galas & Royal Summits',
      desc: 'Heritage corporate galas, executive retreats, milestone jubilees, and VIP hospitality in palaces.',
      icon: Building2,
      path: '/corporate-events',
      badge: 'VIP Elite',
    },
  ];

  const closeNav = () => {
    setActiveMenu(null);
    setHoveredNav(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 left-0 right-0 z-[100] w-full transition-all duration-300"
      onMouseLeave={() => {
        setActiveMenu(null);
        setHoveredNav(null);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setActiveMenu(null);
          setHoveredNav(null);
        }
      }}
    >
      {/* 1. Top Micro Bar: Premium VIP Strip (Tucks away smoothly on scroll) */}
      <div
        className={`hidden md:block w-full bg-[#0F1012] text-stone-300 border-b border-gold/20 transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0 py-0 border-transparent' : 'max-h-10 opacity-100 py-1.5'
        }`}
      >
        <div className="rasm-container flex items-center justify-between text-[11px] font-normal tracking-wide">
          {/* Left: Brand Tagline & Key Destinations */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-gold font-medium">
              <Flower2 className="w-3 h-3 text-[#D4AF37]" />
              <span>Premier Luxury Destination Wedding Planners</span>
            </span>
            <span className="text-stone-600">|</span>
            <span className="hidden lg:inline text-stone-400">
              Udaipur · Jaipur · Jodhpur · Goa · Thailand · 14 Destinations
            </span>
          </div>

          {/* Right: Direct Phone & Availability */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 text-stone-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10.5px]">{availabilityYears} Dates Available</span>
            </div>

            <a
              href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-gold-light transition-colors"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span className="font-medium tracking-wider">{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Glassmorphism Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl border-b border-gold/30 shadow-[0_10px_35px_rgba(15,16,18,0.06)] py-2 sm:py-2.5'
            : 'bg-white/85 backdrop-blur-xl border-b border-gold/15 py-3 sm:py-3.5'
        }`}
      >
        <div className="rasm-container">
          <div className="relative flex items-center justify-between">
            {/* Brand Official Logo */}
            <Link
              href="/"
              onClick={closeNav}
              className="flex items-center gap-3 text-left focus:outline-none group py-0.5"
              aria-label="Rasm Weddings Home"
            >
              <div className="relative">
                <Image
                  src="/rasm-official-logo.png"
                  alt="Rasm Wedding & Events"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                  width={1024}
                  height={497}
                  priority
                  sizes="(max-width: 640px) 110px, 140px"
                />
              </div>
            </Link>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 text-[13.5px] tracking-[0.02em] font-medium text-charcoal-800">
              {/* Home */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('home');
                  setActiveMenu(null);
                }}
              >
                <Link
                  href="/"
                  onClick={closeNav}
                  className={`relative px-3 py-1.5 rounded-xl transition-colors z-10 ${
                    currentPath === '/' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                  }`}
                >
                  Home
                </Link>
                {hoveredNav === 'home' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Destinations Trigger (with 14 cities badge) */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('destinations');
                  setActiveMenu('destinations');
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenu('destinations')}
                  onFocus={() => {
                    setHoveredNav('destinations');
                    setActiveMenu('destinations');
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'destinations'}
                  aria-controls="desktop-destinations-menu"
                  className={`relative px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
                    currentPath.includes('wedding-planner') || currentPath === '/wedding-destination'
                      ? 'text-gold-dark font-semibold'
                      : 'hover:text-gold-dark'
                  }`}
                >
                  <span>Destinations</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gold/15 text-gold-dark rounded-full border border-gold/25">
                    14
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gold-dark transition-transform duration-200 ${
                      activeMenu === 'destinations' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {hoveredNav === 'destinations' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Services Trigger */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('services');
                  setActiveMenu('services');
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenu('services')}
                  onFocus={() => {
                    setHoveredNav('services');
                    setActiveMenu('services');
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'services'}
                  aria-controls="desktop-services-menu"
                  className={`relative px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
                    currentPath === '/services' ||
                    currentPath === '/traditional-decoration' ||
                    currentPath === '/corporate-events'
                      ? 'text-gold-dark font-semibold'
                      : 'hover:text-gold-dark'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gold-dark transition-transform duration-200 ${
                      activeMenu === 'services' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {hoveredNav === 'services' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Gallery */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('gallery');
                  setActiveMenu(null);
                }}
              >
                <Link
                  href="/gallery"
                  onClick={closeNav}
                  className={`relative px-3 py-1.5 rounded-xl transition-colors z-10 ${
                    currentPath === '/gallery' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                  }`}
                >
                  Gallery
                </Link>
                {hoveredNav === 'gallery' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Blogs */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('blogs');
                  setActiveMenu(null);
                }}
              >
                <Link
                  href="/blog"
                  onClick={closeNav}
                  className={`relative px-3 py-1.5 rounded-xl transition-colors z-10 ${
                    currentPath === '/blog' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                  }`}
                >
                  Blogs
                </Link>
                {hoveredNav === 'blogs' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Explore Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('explore');
                  setActiveMenu('explore');
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveMenu('explore')}
                  onFocus={() => {
                    setHoveredNav('explore');
                    setActiveMenu('explore');
                  }}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'explore'}
                  aria-controls="desktop-explore-menu"
                  className={`relative px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
                    activeMenu === 'explore' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                  }`}
                >
                  <span>Explore</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gold-dark transition-transform duration-200 ${
                      activeMenu === 'explore' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {hoveredNav === 'explore' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>

              {/* Contact */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav('contact');
                  setActiveMenu(null);
                }}
              >
                <Link
                  href="/contact-us"
                  onClick={closeNav}
                  className={`relative px-3 py-1.5 rounded-xl transition-colors z-10 ${
                    currentPath === '/contact-us' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                  }`}
                >
                  Contact
                </Link>
                {hoveredNav === 'contact' && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-gold/10 border border-gold/20 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </div>
            </nav>

            {/* Right Action: WhatsApp Direct + Gold Shimmer CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20am%20inquiring%20about%20a%20luxury%20destination%20wedding.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium tracking-wide text-charcoal-700 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-full border border-emerald-600/25 hover:border-emerald-600/50 bg-emerald-50/60 shadow-xs"
                title="Chat directly with our Royal Wedding Planning team"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>

              <AnimatedButton
                variant="gold-shimmer"
                size="sm"
                onClick={onOpenInquiry}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Plan Wedding
              </AnimatedButton>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenInquiry}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gradient-to-r from-[#D4AF37] to-[#B38B3F] text-charcoal-950 shadow-xs"
              >
                Inquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-800 hover:text-gold-dark focus:outline-none rounded-xl hover:bg-gold/10 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Luxury Dropdown Megamenus */}
      <AnimatePresence>
        {/* Destinations Megamenu */}
        {activeMenu === 'destinations' && (
          <motion.div
            key="destinations"
            id="desktop-destinations-menu"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-full left-0 right-0 z-40 pt-2"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-7">
                <div className="grid grid-cols-12 gap-7">
                  {/* Column 1: Palaces of Rajasthan */}
                  <div className="col-span-4 space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-gold/20">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark flex items-center gap-1.5">
                        <Gem className="w-3.5 h-3.5 text-gold" />
                        Palaces of Rajasthan
                      </span>
                      <span className="text-[10px] text-charcoal-400 font-medium">8 Heritage Cities</span>
                    </div>
                    <div className="space-y-1">
                      {rajasthanDestinations.map((d, i) => (
                        <Link
                          href={`/${d.slug}`}
                          onClick={closeNav}
                          key={i}
                          className="w-full text-left p-2 rounded-xl hover:bg-gold/10 transition-all flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-manrope font-semibold text-[13px] text-charcoal-900 group-hover:text-gold-dark transition-colors truncate">
                                {d.name}
                              </h4>
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 bg-gold/10 text-gold-dark font-medium rounded-full border border-gold/20">
                                {d.badge}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-charcoal-500 font-light truncate mt-0.5">{d.desc}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Coastal, Hills & Global */}
                  <div className="col-span-4 space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-gold/20">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        Coast, Hills & Global
                      </span>
                      <span className="text-[10px] text-charcoal-400 font-medium">6 Premier Hubs</span>
                    </div>
                    <div className="space-y-1">
                      {otherDestinations.map((d, i) => (
                        <Link
                          href={`/${d.slug}`}
                          onClick={closeNav}
                          key={i}
                          className="w-full text-left p-2 rounded-xl hover:bg-gold/10 transition-all flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-manrope font-semibold text-[13px] text-charcoal-900 group-hover:text-gold-dark transition-colors truncate">
                                {d.name}
                              </h4>
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 bg-stone-100 text-charcoal-600 font-medium rounded-full border border-stone-200">
                                {d.badge}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-charcoal-500 font-light truncate mt-0.5">{d.desc}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/wedding-destination"
                        onClick={closeNav}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/25 transition-all text-xs font-semibold text-gold-dark"
                      >
                        <span>Browse Full 14-City Directory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 3: Featured Palace Card */}
                  <div className="col-span-4 rounded-2xl overflow-hidden relative group p-6 flex flex-col justify-end bg-stone-900 shadow-md">
                    <Image
                      src={`${WP_ORIGIN}/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp`}
                      alt="Lake Pichola Udaipur"
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="relative z-10 space-y-2 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold bg-gold/30 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-gold/40 inline-block">
                          Flagship Capital
                        </span>
                      </div>
                      <h4 className="font-manrope font-semibold text-lg text-white">
                        Lake Pichola & Umaid Bhawan
                      </h4>
                      <p className="text-[11.5px] text-stone-300 font-light leading-relaxed">
                        Royal palace takeovers, private lake mandaps, and custom heritage choreography across Rajasthan.
                      </p>
                      <Link
                        href="/wedding-planner-in-udaipur"
                        onClick={closeNav}
                        className="inline-flex items-center gap-1.5 text-xs text-gold-light hover:text-white font-medium pt-2 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Explore Signature Palaces</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Services Megamenu */}
        {activeMenu === 'services' && (
          <motion.div
            key="services"
            id="desktop-services-menu"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-full left-0 right-0 z-40 pt-2"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-7">
                <div className="grid grid-cols-4 gap-5">
                  {servicesList.map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                      <Link
                        href={srv.path}
                        onClick={closeNav}
                        key={idx}
                        className="text-left p-5 rounded-2xl border border-gold/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3.5">
                            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-dark group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-gold-dark font-semibold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                              {srv.badge}
                            </span>
                          </div>
                          <h4 className="font-manrope font-semibold text-sm text-charcoal-900 group-hover:text-gold-dark transition-colors line-clamp-1">
                            {srv.title}
                          </h4>
                          <p className="text-[11.5px] text-charcoal-600 font-light mt-1.5 leading-relaxed">
                            {srv.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-gold-dark font-medium">
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom Quick Contact Bar */}
                <div className="mt-5 pt-4 border-t border-gold/15 flex items-center justify-between bg-gold/[0.04] -mx-7 -mb-7 px-7 py-3.5 rounded-b-3xl">
                  <div className="flex items-center gap-2 text-xs text-charcoal-700">
                    <Flower2 className="w-4 h-4 text-gold" />
                    <span>Planning a {availabilityYears} destination wedding? Book a direct 1-on-1 concept session with our Lead Wedding Planner.</span>
                  </div>
                  <button
                    onClick={() => {
                      closeNav();
                      onOpenInquiry();
                    }}
                    className="text-xs font-semibold text-gold-dark hover:underline flex items-center gap-1"
                  >
                    <span>Request Concept Call</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explore Megamenu */}
        {activeMenu === 'explore' && (
          <motion.div
            key="explore"
            id="desktop-explore-menu"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-full left-0 right-0 z-40 pt-2"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_24px_70px_rgba(0,0,0,0.12)] p-7">
                <div className="grid grid-cols-4 gap-6">
                  {/* Column 1: The Rasm Legacy */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/20">
                      The Rasm Legacy
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href="/about-us" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> About Rasm & Founders
                        </Link>
                      </li>
                      <li>
                        <Link href="/services" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Complete Custom Services
                        </Link>
                      </li>
                      <li>
                        <Link href="/wedding-destination" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> 14 Wedding Destinations
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact-us" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Udaipur Office
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Visual Galleries & Media */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/20">
                      Visual Showcases
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href="/gallery" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Royal Photo Gallery
                        </Link>
                      </li>
                      <li>
                        <Link href="/traditional-decoration" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Mandap & Decor Craft
                        </Link>
                      </li>
                      <li>
                        <Link href="/corporate-events" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> VIP Corporate Galas
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Guides & Planning Tools */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/20">
                      Wedding Guides
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href="/blog" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Wedding Cost Guides & Tips
                        </Link>
                      </li>
                      <li>
                        <Link href="/why-rishikesh-is-new-destination-wedding-hotspot" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Rishikesh Ghat Weddings
                        </Link>
                      </li>
                      <li>
                        <Link href="/wedding-ideas-for-jim-corbett" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Jim Corbett Wilderness
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Trust & Policies */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/20">
                      Trust & Policies
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href="/privacy-policy" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-and-conditions" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link href="/refund-policy" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Refund & Booking Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping-policy" onClick={closeNav} className="hover:text-gold-dark transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-gold" /> Dispatch Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Luxury Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-[105] bg-charcoal-950/60 backdrop-blur-sm"
              onClick={closeNav}
              aria-hidden="true"
            />

            {/* Solid Sliding Sidebar Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={menuTransition}
              className="lg:hidden fixed top-0 right-0 z-[110] h-[100dvh] w-[88%] max-w-[390px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.3)] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer Header with Logo & Close */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 bg-stone-50">
                <Link href="/" onClick={closeNav} className="flex items-center gap-2" aria-label="Rasm Weddings Home">
                  <Image
                    src="/rasm-official-logo.png"
                    alt="Rasm Wedding & Events"
                    className="h-9 w-auto object-contain"
                    width={1024}
                    height={497}
                    sizes="100px"
                  />
                </Link>
                <button
                  onClick={closeNav}
                  className="p-2 rounded-xl text-charcoal-700 hover:text-gold-dark hover:bg-gold/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct VIP Call & WhatsApp Action Strip */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-gold/[0.06] border-b border-gold/15">
                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-gold/25 text-charcoal-800 text-xs font-medium shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20am%20inquiring%20about%20a%20luxury%20destination%20wedding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs font-medium shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {/* Core Navigation Links */}
                <div className="flex flex-col divide-y divide-gold/10 rounded-2xl border border-gold/15 overflow-hidden">
                  <Link
                    href="/"
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-4 py-3 font-manrope font-medium text-[14.5px] transition-colors ${
                      currentPath === '/' ? 'text-gold-dark bg-gold/10' : 'text-charcoal-900 hover:bg-stone-50'
                    }`}
                  >
                    <Home className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Home</span>
                  </Link>

                  {/* Accordion: Destinations */}
                  <div>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'destinations' ? null : 'destinations')}
                      className="w-full flex items-center justify-between px-4 py-3 font-manrope font-medium text-[14.5px] text-charcoal-900 hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Compass className="w-4 h-4 text-gold-dark shrink-0" />
                        <span>Destinations</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gold/15 text-gold-dark rounded-full">
                          14
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gold-dark transition-transform ${
                          mobileAccordion === 'destinations' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileAccordion === 'destinations' && (
                      <div className="p-3 bg-stone-50 space-y-3 border-t border-gold/10">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-dark block mb-1.5">
                            Palaces of Rajasthan
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {rajasthanDestinations.map((d, i) => (
                              <Link
                                key={i}
                                href={`/${d.slug}`}
                                onClick={closeNav}
                                className="text-left p-2 rounded-lg bg-white border border-gold/15 text-[11.5px] font-medium text-charcoal-800 hover:bg-gold/10"
                              >
                                {d.name.split(' ')[0]}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-dark block mb-1.5">
                            Coast & Global
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {otherDestinations.map((d, i) => (
                              <Link
                                key={i}
                                href={`/${d.slug}`}
                                onClick={closeNav}
                                className="text-left p-2 rounded-lg bg-white border border-gold/15 text-[11.5px] font-medium text-charcoal-800 hover:bg-gold/10"
                              >
                                {d.name.split(' ')[0]}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <Link
                          href="/wedding-destination"
                          onClick={closeNav}
                          className="block text-center p-2 rounded-lg bg-gold/15 text-gold-dark text-xs font-semibold"
                        >
                          View Full Directory →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Accordion: Services */}
                  <div>
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                      className="w-full flex items-center justify-between px-4 py-3 font-manrope font-medium text-[14.5px] text-charcoal-900 hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Gem className="w-4 h-4 text-gold-dark shrink-0" />
                        <span>Services</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gold-dark transition-transform ${
                          mobileAccordion === 'services' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileAccordion === 'services' && (
                      <div className="p-3 bg-stone-50 space-y-1.5 border-t border-gold/10">
                        {servicesList.map((srv, idx) => (
                          <Link
                            key={idx}
                            href={srv.path}
                            onClick={closeNav}
                            className="block p-2 rounded-lg bg-white border border-gold/15 text-xs text-charcoal-800 hover:bg-gold/10"
                          >
                            <div className="font-semibold text-charcoal-900">{srv.title}</div>
                            <div className="text-[10.5px] text-charcoal-500 line-clamp-1">{srv.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/gallery"
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-4 py-3 font-manrope font-medium text-[14.5px] transition-colors ${
                      currentPath === '/gallery' ? 'text-gold-dark bg-gold/10' : 'text-charcoal-900 hover:bg-stone-50'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Royal Gallery</span>
                  </Link>

                  <Link
                    href="/blog"
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-4 py-3 font-manrope font-medium text-[14.5px] transition-colors ${
                      currentPath === '/blog' ? 'text-gold-dark bg-gold/10' : 'text-charcoal-900 hover:bg-stone-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Blogs</span>
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-4 py-3 font-manrope font-medium text-[14.5px] transition-colors ${
                      currentPath === '/about-us' ? 'text-gold-dark bg-gold/10' : 'text-charcoal-900 hover:bg-stone-50'
                    }`}
                  >
                    <Award className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>About Rasm Legacy</span>
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-4 py-3 font-manrope font-medium text-[14.5px] transition-colors ${
                      currentPath === '/contact-us' ? 'text-gold-dark bg-gold/10' : 'text-charcoal-900 hover:bg-stone-50'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Contact Desk</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Sticky Action Button */}
              <div className="p-4 border-t border-gold/20 bg-stone-50 space-y-2.5 shrink-0">
                <AnimatedButton
                  variant="gold-shimmer"
                  size="md"
                  className="w-full text-center"
                  onClick={() => {
                    closeNav();
                    onOpenInquiry();
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Plan Royal Wedding
                </AnimatedButton>
                <div className="text-center">
                  <span className="text-[10px] text-charcoal-400">
                    Custom Destination Planning Across 14 Royal Cities
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
