'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/components/SiteSettingsProvider';
import { useInquiry } from '@/components/InquiryProvider';
import { MessageCircle, Menu, X, Sparkles, ChevronDown, MapPin, Crown, ArrowRight, Building2 } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const menuTransition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 12,
  stiffness: 110,
};

export const Navbar: React.FC = () => {
  const settings = useSettings();
  const currentPath = (usePathname() || '/').replace(/(.)\/$/, '$1');
  const { open } = useInquiry();
  const onOpenInquiry = () => open();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'destinations' | 'services' | 'explore' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rajasthanDestinations = [
    { name: 'Udaipur Palaces', slug: 'wedding-planner-in-udaipur', desc: 'Lake Pichola & City Palace Heritage' },
    { name: 'Jaipur Forts & Havelis', slug: 'wedding-planner-in-jaipur', desc: 'Pink City Grandeur & Royal Mandaps' },
    { name: 'Jodhpur & Jaisalmer', slug: 'wedding-planner-in-jodhpur', desc: 'Mehrangarh & Golden Thar Dunes' },
    { name: 'Kumbhalgarh & Ranakpur', slug: 'wedding-planner-in-kumbhalgarh', desc: 'Historic Fortress Solitude' },
    { name: 'Pushkar & Kota', slug: 'wedding-planner-in-pushkar', desc: 'Sacred Lakes & Chambal Palaces' },
  ];

  const otherDestinations = [
    { name: 'Goa Coastal Weddings', slug: 'wedding-planner-in-goa', desc: 'Sunset Oceanfront Beach Mandaps' },
    { name: 'Rishikesh Riverside', slug: 'why-rishikesh-is-new-destination-wedding-hotspot', desc: 'Soulful Ganga Ghats & Serenity' },
    { name: 'Jim Corbett Wilderness', slug: 'wedding-ideas-for-jim-corbett', desc: 'Luxury Forest Lodges & Canopies' },
    { name: 'Mount Abu & Nathdwara', slug: 'wedding-planner-in-mount-abu', desc: 'Aravalli Hills & Shrinathji Blessings' },
    { name: 'Thailand International', slug: 'wedding-planner-in-thailand', desc: 'Phuket & Hua Hin Luxury Resorts' },
  ];

  const servicesList = [
    {
      title: 'Royal Wedding Planning',
      desc: 'End-to-end bespoke orchestration, palace permits, lake mandaps, and hospitality concierges.',
      icon: Crown,
      path: '/services',
      badge: 'Signature',
    },
    {
      title: 'Traditional Decoration',
      desc: 'Artisanal marigold flower arrays, Vedic mandap architecture, and Mewari royal themes.',
      icon: Sparkles,
      path: '/traditional-decoration',
      badge: 'Vedic Craft',
    },
    {
      title: 'Corporate & VIP Events',
      desc: 'Heritage corporate galas, executive retreats, and product unveilings in royal settings.',
      icon: Building2,
      path: '/corporate-events',
      badge: 'VIP Elite',
    },
  ];

  const closeNav = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/85 backdrop-blur-xl border-b border-gold/25 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
          : 'py-3.5 sm:py-4 bg-white/60 backdrop-blur-md border-b border-gold/15'
      }`}
      onMouseLeave={() => {
        setActiveMenu(null);
        setHoveredNav(null);
      }}
    >
      <div className="rasm-container">
        {/* Floating Glass Bar Container */}
        <div className="relative flex items-center justify-between px-2 sm:px-3 py-1">
          {/* Brand Logo */}
          <Link href={'/'} onClick={closeNav}
            
            className="flex items-center gap-3 text-left focus:outline-none group py-0.5"
            aria-label="Rasm Weddings Home"
          >
            <Image
              src="/rasm-official-logo.png"
              alt="Rasm Wedding & Events"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
             width={1024} height={497} priority sizes="120px" />
          </Link>

          {/* Center Navigation with Floating Pill Indicator (21st.dev style) */}
          <nav className="hidden lg:flex items-center space-x-1.5 text-[14px] tracking-[0.02em] font-medium text-charcoal-800">
            {/* Home */}
            <div
              className="relative"
              onMouseEnter={() => {
                setHoveredNav('home');
                setActiveMenu(null);
              }}
            >
              <Link href={'/'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors z-10 text-[14px] font-medium tracking-[0.02em] ${
                  currentPath === '/' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                }`}
              >
                Home
              </Link>
              {hoveredNav === 'home' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </div>

            {/* Destinations Trigger */}
            <div
              className="relative"
              onMouseEnter={() => {
                setHoveredNav('destinations');
                setActiveMenu('destinations');
              }}
            >
              <Link href={'/wedding-destination'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
                  currentPath.includes('wedding-planner') || currentPath === '/wedding-destination'
                    ? 'text-gold-dark font-semibold'
                    : 'hover:text-gold-dark'
                }`}
              >
                <span>Destinations</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gold-dark transition-transform duration-200 ${
                    activeMenu === 'destinations' ? 'rotate-180' : ''
                  }`}
                />
              </Link>
              {hoveredNav === 'destinations' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
              <Link href={'/services'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
                  currentPath === '/services' || currentPath === '/traditional-decoration' || currentPath === '/corporate-events'
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
              </Link>
              {hoveredNav === 'services' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
              <Link href={'/gallery'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors z-10 ${
                  currentPath === '/gallery' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                }`}
              >
                Gallery
              </Link>
              {hoveredNav === 'gallery' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </div>

            {/* Explore Pages Trigger */}
            <div
              className="relative"
              onMouseEnter={() => {
                setHoveredNav('explore');
                setActiveMenu('explore');
              }}
            >
              <button
                className={`relative px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 z-10 ${
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
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </div>

            {/* Journal */}
            <div
              className="relative"
              onMouseEnter={() => {
                setHoveredNav('journal');
                setActiveMenu(null);
              }}
            >
              <Link href={'/blog'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors z-10 ${
                  currentPath === '/blog' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                }`}
              >
                Journal
              </Link>
              {hoveredNav === 'journal' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
              <Link href={'/contact-us'} onClick={closeNav}
                
                className={`relative px-3.5 py-2 rounded-xl transition-colors z-10 ${
                  currentPath === '/contact-us' ? 'text-gold-dark font-semibold' : 'hover:text-gold-dark'
                }`}
              >
                Contact
              </Link>
              {hoveredNav === 'contact' && (
                <motion.div
                  layoutId="navbar-pill"
                  className="absolute inset-0 bg-gold/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </div>
          </nav>

          {/* Right Action: WhatsApp Direct + Gold Shimmer CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20am%20inquiring%20about%20a%20luxury%20destination%20wedding%20in%20Udaipur.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium tracking-wider text-charcoal-700 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-full border border-emerald-600/20 hover:border-emerald-600/40 bg-emerald-50/50"
              title="Chat directly with our Udaipur Wedding Concierge"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <AnimatedButton
              variant="dark-shimmer"
              size="sm"
              onClick={onOpenInquiry}
              icon={<Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />}
            >
              Plan Wedding
            </AnimatedButton>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenInquiry}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-charcoal-900 text-white shadow-xs"
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

      {/* Aceternity Style Spring-Animated Megamenus */}
      <AnimatePresence>
        {activeMenu === 'destinations' && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-[calc(100%_+_0.5rem)] left-0 right-0 z-40"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Column 1: Palaces of Rajasthan */}
                  <div className="col-span-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gold/15">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
                        Palaces of Rajasthan
                      </span>
                      <Crown className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="space-y-1.5">
                      {rajasthanDestinations.map((d, i) => (
                        <Link href={`/${d.slug}`} onClick={closeNav}
                          key={i}
                          
                          className="w-full text-left p-2.5 rounded-xl hover:bg-gold/10 transition-all flex items-start justify-between group"
                        >
                          <div>
                            <h4 className="font-manrope font-semibold text-sm text-charcoal-900 group-hover:text-gold-dark transition-colors">
                              {d.name}
                            </h4>
                            <p className="text-[11px] text-charcoal-500 font-light mt-0.5">{d.desc}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Hills, Coast & Global */}
                  <div className="col-span-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gold/15">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
                        Riverside, Hills & Coast
                      </span>
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="space-y-1.5">
                      {otherDestinations.map((d, i) => (
                        <Link href={`/${d.slug}`} onClick={closeNav}
                          key={i}
                          
                          className="w-full text-left p-2.5 rounded-xl hover:bg-gold/10 transition-all flex items-start justify-between group"
                        >
                          <div>
                            <h4 className="font-manrope font-semibold text-sm text-charcoal-900 group-hover:text-gold-dark transition-colors">
                              {d.name}
                            </h4>
                            <p className="text-[11px] text-charcoal-500 font-light mt-0.5">{d.desc}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Featured Visual Card */}
                  <div className="col-span-4 rounded-2xl overflow-hidden relative group p-6 flex flex-col justify-end bg-stone-900 shadow-md">
                    <Image
                      src="https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp"
                      alt="Lake Pichola Udaipur"
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                     width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="relative z-10 space-y-2 text-white">
                      <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold bg-gold/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/40 inline-block">
                        Signature Royal Venue
                      </span>
                      <h4 className="font-manrope font-medium text-xl text-white">
                        Lake Pichola, Udaipur
                      </h4>
                      <p className="text-xs text-stone-300 font-light leading-relaxed">
                        World-renowned royal palatial wedding capital. Explore The Oberoi Udaivilas, Taj Lake Palace & Leela Palace.
                      </p>
                      <Link href={'/wedding-planner-in-udaipur'} onClick={closeNav}
                        
                        className="inline-flex items-center gap-1.5 text-xs text-gold-light hover:text-white font-medium pt-2 group-hover:translate-x-1 transition-transform"
                      >
                        <span>View Udaipur Palaces</span>
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
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-[calc(100%_+_0.5rem)] left-0 right-0 z-40"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8">
                <div className="grid grid-cols-3 gap-6">
                  {servicesList.map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                      <Link href={srv.path} onClick={closeNav}
                        key={idx}
                        
                        className="text-left p-6 rounded-2xl border border-gold/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-dark group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold bg-gold/15 px-2.5 py-0.5 rounded-full">
                            {srv.badge}
                          </span>
                        </div>
                        <h4 className="font-manrope font-semibold text-base text-charcoal-900 group-hover:text-gold-dark transition-colors">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-charcoal-600 font-light mt-2 leading-relaxed">
                          {srv.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-xs text-gold-dark font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Explore Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explore Pages Megamenu */}
        {activeMenu === 'explore' && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={menuTransition}
            className="hidden lg:block absolute top-[calc(100%_+_0.5rem)] left-0 right-0 z-40"
          >
            <div className="rasm-container">
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                      Core Showcase
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href={'/about-us'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          About Rasm Legacy
                        </Link>
                      </li>
                      <li>
                        <Link href={'/services'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          All Bespoke Services
                        </Link>
                      </li>
                      <li>
                        <Link href={'/gallery'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Royal Photo Gallery
                        </Link>
                      </li>
                      <li>
                        <Link href={'/blog'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Wedding Journal & Guides
                        </Link>
                      </li>
                      <li>
                        <Link href={'/contact-us'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Contact Concierge Desk
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                      Specializations
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href={'/traditional-decoration'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Traditional Decoration
                        </Link>
                      </li>
                      <li>
                        <Link href={'/corporate-events'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Corporate & VIP Galas
                        </Link>
                      </li>
                      <li>
                        <Link href={'/wedding-planner-in-mount-abu'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Mount Abu Weddings
                        </Link>
                      </li>
                      <li>
                        <Link href={'/wedding-planner-in-nathdwara'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Nathdwara Holy Weddings
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                      Heritage Cities
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href={'/wedding-planner-in-udaipur'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Udaipur Royal Palaces
                        </Link>
                      </li>
                      <li>
                        <Link href={'/wedding-planner-in-jaipur'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Jaipur Heritage Forts
                        </Link>
                      </li>
                      <li>
                        <Link href={'/wedding-planner-in-jodhpur'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Jodhpur Sun City
                        </Link>
                      </li>
                      <li>
                        <Link href={'/wedding-planner-in-jaisalmer'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Jaisalmer Golden Forts
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                      Trust & Policies
                    </span>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      <li>
                        <Link href={'/privacy-policy'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href={'/terms-and-conditions'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link href={'/refund-policy'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Refund Policy
                        </Link>
                      </li>
                      <li>
                        <Link href={'/shipping-policy'} onClick={closeNav}  className="hover:text-gold-dark transition-colors">
                          Booking & Concierge Policy
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

      {/* Mobile Animated Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-[72px] bg-white/98 backdrop-blur-2xl border-b border-gold/30 shadow-2xl max-h-[85vh] overflow-y-auto px-6 py-6"
          >
            <div className="space-y-6">
              {/* Core Links */}
              <div className="flex flex-col space-y-3 pb-4 border-b border-gold/15">
                <Link href={'/'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  Home
                </Link>
                <Link href={'/wedding-destination'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  Destinations Directory
                </Link>
                <Link href={'/services'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  All Bespoke Services
                </Link>
                <Link href={'/gallery'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  Royal Photo Gallery
                </Link>
                <Link href={'/blog'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  Wedding Journal & Guides
                </Link>
                <Link href={'/contact-us'} onClick={closeNav}
                  
                  className="text-left font-manrope font-semibold text-base text-charcoal-900 hover:text-gold-dark py-1"
                >
                  Contact Concierge
                </Link>
              </div>

              {/* Popular Destinations Quick Links */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark block mb-2">
                  Featured Palaces
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={'/wedding-planner-in-udaipur'} onClick={closeNav}
                    
                    className="text-left p-2.5 rounded-xl bg-ivory-200 text-xs font-medium text-charcoal-800 hover:bg-gold/15"
                  >
                    Udaipur Palaces
                  </Link>
                  <Link href={'/wedding-planner-in-jaipur'} onClick={closeNav}
                    
                    className="text-left p-2.5 rounded-xl bg-ivory-200 text-xs font-medium text-charcoal-800 hover:bg-gold/15"
                  >
                    Jaipur Forts
                  </Link>
                  <Link href={'/wedding-planner-in-goa'} onClick={closeNav}
                    
                    className="text-left p-2.5 rounded-xl bg-ivory-200 text-xs font-medium text-charcoal-800 hover:bg-gold/15"
                  >
                    Goa Mandaps
                  </Link>
                  <Link href={'/wedding-planner-in-jodhpur'} onClick={closeNav}
                    
                    className="text-left p-2.5 rounded-xl bg-ivory-200 text-xs font-medium text-charcoal-800 hover:bg-gold/15"
                  >
                    Jodhpur Dunes
                  </Link>
                </div>
              </div>

              {/* Mobile CTAs */}
              <div className="pt-2 space-y-3">
                <AnimatedButton
                  variant="gold-shimmer"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Plan Royal Wedding
                </AnimatedButton>

                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20am%20inquiring%20about%20a%20destination%20wedding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-emerald-600/30 text-emerald-700 bg-emerald-50/70 text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
