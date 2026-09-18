import React, { useState, useEffect } from 'react';
import { SiteSettings, MenuItem, WPPage } from '../types';
import { MessageCircle, Menu, X, Sparkles, ChevronDown, MapPin, Crown, ArrowRight, ShieldCheck, Camera, BookOpen, Building2 } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface NavbarProps {
  settings: SiteSettings;
  menus: MenuItem[];
  pages: WPPage[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  menus,
  pages,
  currentPath,
  onNavigate,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'destinations' | 'services' | 'pages' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rajasthanDestinations = [
    { name: 'Udaipur Palaces', slug: 'wedding-planner-in-udaipur', desc: 'Lake Pichola & City Palace' },
    { name: 'Jaipur Heritage', slug: 'wedding-planner-in-jaipur', desc: 'Pink City Forts & Havelis' },
    { name: 'Jodhpur & Jaisalmer', slug: 'wedding-planner-in-jodhpur', desc: 'Sun City & Golden Dunes' },
    { name: 'Kumbhalgarh & Ranakpur', slug: 'wedding-planner-in-kumbhalgarh', desc: 'Ancient Fortress Solitude' },
    { name: 'Pushkar & Kota', slug: 'wedding-planner-in-pushkar', desc: 'Sacred Lakes & Chambal Palaces' },
  ];

  const otherDestinations = [
    { name: 'Goa Coastal', slug: 'wedding-planner-in-goa', desc: 'Oceanfront Beach Mandaps' },
    { name: 'Rishikesh Riverside', slug: 'why-rishikesh-is-new-destination-wedding-hotspot', desc: 'Soulful Ganga Ghats' },
    { name: 'Jim Corbett Forests', slug: 'wedding-ideas-for-jim-corbett', desc: 'Wilderness Luxury Lodges' },
    { name: 'Mount Abu & Nathdwara', slug: 'wedding-planner-in-mount-abu', desc: 'Serene Hills & Shrinathji Blessings' },
    { name: 'Thailand International', slug: 'wedding-planner-in-thailand', desc: 'Phuket & Hua Hin Luxury' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gold/20 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.04)]'
          : 'bg-white/90 backdrop-blur-sm border-b border-gold/15 py-4'
      }`}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="rasm-container flex items-center justify-between">
        {/* Left: Official Gold Royal Insignia Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 text-left focus:outline-none group py-1"
        >
          <img
            src="/rasm-official-logo.png"
            alt="Rasm Wedding"
            referrerPolicy="no-referrer"
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
          />
        </button>

        {/* Desktop Navigation with Luxury Mega Menus */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.18em] uppercase font-medium text-charcoal-700">
          <button
            onClick={() => onNavigate('/')}
            className={`hover:text-gold-dark transition-colors py-2 ${currentPath === '/' ? 'text-gold-dark font-semibold' : ''}`}
          >
            Home
          </button>

          {/* Destinations Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('destinations')}
          >
            <button
              onClick={() => onNavigate('/wedding-destination')}
              className={`hover:text-gold-dark transition-colors py-2 flex items-center gap-1 ${currentPath.includes('wedding-planner') || currentPath === '/wedding-destination' ? 'text-gold-dark font-semibold' : ''}`}
            >
              <span>Destinations</span>
              <ChevronDown className="w-3.5 h-3.5 text-gold-dark transition-transform" />
            </button>
          </div>

          {/* Services Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('services')}
          >
            <button
              onClick={() => onNavigate('/services')}
              className={`hover:text-gold-dark transition-colors py-2 flex items-center gap-1 ${currentPath === '/services' || currentPath === '/traditional-decoration' || currentPath === '/corporate-events' ? 'text-gold-dark font-semibold' : ''}`}
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-gold-dark transition-transform" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('/gallery')}
            className={`hover:text-gold-dark transition-colors py-2 ${currentPath === '/gallery' ? 'text-gold-dark font-semibold' : ''}`}
          >
            Gallery
          </button>

          {/* All WordPress Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMegaMenu('pages')}
          >
            <button
              className="hover:text-gold-dark transition-colors py-2 flex items-center gap-1"
            >
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5 text-gold-dark transition-transform" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('/blog')}
            className={`hover:text-gold-dark transition-colors py-2 ${currentPath === '/blog' ? 'text-gold-dark font-semibold' : ''}`}
          >
            Journal
          </button>

          <button
            onClick={() => onNavigate('/contact-us')}
            className={`hover:text-gold-dark transition-colors py-2 ${currentPath === '/contact-us' ? 'text-gold-dark font-semibold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action: WhatsApp Direct + 21st.dev Shimmer Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Hello%20Rasm%20Weddings,%20I%20am%20inquiring%20about%20a%20luxury%20destination%20wedding%20in%20Udaipur.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-charcoal-800 hover:text-emerald-700 transition-colors px-2 py-1"
            title="Chat directly with our Udaipur Wedding Concierge"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <AnimatedButton
            variant="gold-shimmer"
            size="sm"
            onClick={onOpenInquiry}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Plan Wedding
          </AnimatedButton>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenInquiry}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-gold text-charcoal-900 shadow-sm"
          >
            Inquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal-800 hover:text-gold-dark focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 21st.dev Style Destinations Mega Menu Panel */}
      {activeMegaMenu === 'destinations' && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-gold/25 shadow-2xl py-8 px-4 sm:px-8 animate-fade-in">
          <div className="rasm-container grid grid-cols-12 gap-8">
            {/* Column 1: Palaces of Rajasthan */}
            <div className="col-span-4 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark block pb-2 border-b border-gold/15">
                Palaces of Rajasthan
              </span>
              <div className="space-y-2.5">
                {rajasthanDestinations.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveMegaMenu(null);
                      onNavigate(`/${d.slug}`);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-ivory-200 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <h4 className="font-cinzel font-normal text-sm text-charcoal-900 group-hover:text-gold-dark">
                        {d.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 font-light">{d.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Hills, Coast & Global */}
            <div className="col-span-4 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-dark block pb-2 border-b border-gold/15">
                Riverside, Hills & Coast
              </span>
              <div className="space-y-2.5">
                {otherDestinations.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveMegaMenu(null);
                      onNavigate(`/${d.slug}`);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-ivory-200 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <h4 className="font-cinzel font-normal text-sm text-charcoal-900 group-hover:text-gold-dark">
                        {d.name}
                      </h4>
                      <p className="text-[11px] text-charcoal-500 font-light">{d.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-dark opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Featured Visual Card */}
            <div className="col-span-4 rounded-2xl overflow-hidden relative group p-6 flex flex-col justify-end bg-stone-900">
              <img
                src="https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp"
                alt="Udaipur Palaces"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 space-y-2 text-white">
                <span className="text-[10px] uppercase tracking-widest text-gold-light font-medium bg-black/40 px-2 py-0.5 rounded-full">
                  Signature Destination
                </span>
                <h4 className="font-cinzel font-normal text-2xl text-white">
                  Lake Pichola, Udaipur
                </h4>
                <p className="text-xs text-stone-300 font-light">
                  Voted India’s most romantic palatial wedding capital. Explore iconic venues.
                </p>
                <button
                  onClick={() => {
                    setActiveMegaMenu(null);
                    onNavigate('/wedding-planner-in-udaipur');
                  }}
                  className="inline-flex items-center gap-1 text-xs text-gold-light hover:text-white font-medium pt-2"
                >
                  <span>View Udaipur Venues</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Mega Menu Panel */}
      {activeMegaMenu === 'services' && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-gold/25 shadow-2xl py-8 px-4 sm:px-8 animate-fade-in">
          <div className="rasm-container grid grid-cols-3 gap-8">
            <button
              onClick={() => {
                setActiveMegaMenu(null);
                onNavigate('/services');
              }}
              className="text-left p-4 rounded-2xl border border-gold/20 hover:border-gold hover:bg-ivory-100 transition-all group"
            >
              <Crown className="w-6 h-6 text-gold-dark mb-3" />
              <h4 className="font-cinzel font-normal text-lg text-charcoal-900 group-hover:text-gold-dark">
                Royal Wedding Planning
              </h4>
              <p className="text-xs text-charcoal-600 font-light mt-1">
                End-to-end orchestration, palace permits, lake mandaps, and guest concierges.
              </p>
            </button>

            <button
              onClick={() => {
                setActiveMegaMenu(null);
                onNavigate('/traditional-decoration');
              }}
              className="text-left p-4 rounded-2xl border border-gold/20 hover:border-gold hover:bg-ivory-100 transition-all group"
            >
              <Sparkles className="w-6 h-6 text-gold-dark mb-3" />
              <h4 className="font-cinzel font-normal text-lg text-charcoal-900 group-hover:text-gold-dark">
                Traditional Decoration
              </h4>
              <p className="text-xs text-charcoal-600 font-light mt-1">
                Artisanal marigold flower arrays, Vedic mandap architecture, and Mewari themes.
              </p>
            </button>

            <button
              onClick={() => {
                setActiveMegaMenu(null);
                onNavigate('/corporate-events');
              }}
              className="text-left p-4 rounded-2xl border border-gold/20 hover:border-gold hover:bg-ivory-100 transition-all group"
            >
              <Building2 className="w-6 h-6 text-gold-dark mb-3" />
              <h4 className="font-cinzel font-normal text-lg text-charcoal-900 group-hover:text-gold-dark">
                Corporate & VIP Events
              </h4>
              <p className="text-xs text-charcoal-600 font-light mt-1">
                Heritage corporate galas, executive retreats, and product unveilings in royal settings.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Pages Mega Menu Panel */}
      {activeMegaMenu === 'pages' && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-gold/25 shadow-2xl py-8 px-4 sm:px-8 animate-fade-in">
          <div className="rasm-container grid grid-cols-4 gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                Core Pages
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/about-us'); }} className="hover:text-gold-dark">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/services'); }} className="hover:text-gold-dark">
                    All Services
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/gallery'); }} className="hover:text-gold-dark">
                    Royal Photo Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/blog'); }} className="hover:text-gold-dark">
                    Wedding Journal & Blogs
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/contact-us'); }} className="hover:text-gold-dark">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                Specializations
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/traditional-decoration'); }} className="hover:text-gold-dark">
                    Traditional Decoration
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/corporate-events'); }} className="hover:text-gold-dark">
                    Corporate Events
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-mount-abu'); }} className="hover:text-gold-dark">
                    Mount Abu Weddings
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-nathdwara'); }} className="hover:text-gold-dark">
                    Nathdwara Weddings
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                Rajasthan Destinations
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-udaipur'); }} className="hover:text-gold-dark">
                    Wedding Planner in Udaipur
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-jaipur'); }} className="hover:text-gold-dark">
                    Wedding Planner in Jaipur
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-jodhpur'); }} className="hover:text-gold-dark">
                    Wedding Planner in Jodhpur
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/wedding-planner-in-jaisalmer'); }} className="hover:text-gold-dark">
                    Wedding Planner in Jaisalmer
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark block mb-3 pb-1 border-b border-gold/15">
                Policies & Trust
              </span>
              <ul className="space-y-2 text-xs text-charcoal-700">
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/privacy-policy'); }} className="hover:text-gold-dark">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/terms-and-conditions'); }} className="hover:text-gold-dark">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/refund-policy'); }} className="hover:text-gold-dark">
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveMegaMenu(null); onNavigate('/shipping-policy'); }} className="hover:text-gold-dark">
                    Booking Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gold/20 px-6 py-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-3 text-xs font-medium tracking-[0.18em] uppercase text-charcoal-800">
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/'); }} className="text-left py-1 hover:text-gold-dark">
              Home
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/wedding-destination'); }} className="text-left py-1 hover:text-gold-dark">
              Destinations
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/services'); }} className="text-left py-1 hover:text-gold-dark">
              Services
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/traditional-decoration'); }} className="text-left py-1 hover:text-gold-dark">
              Traditional Decoration
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/corporate-events'); }} className="text-left py-1 hover:text-gold-dark">
              Corporate Events
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/gallery'); }} className="text-left py-1 hover:text-gold-dark">
              Royal Gallery
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/about-us'); }} className="text-left py-1 hover:text-gold-dark">
              About Us
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/blog'); }} className="text-left py-1 hover:text-gold-dark">
              Journal & Blogs
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigate('/contact-us'); }} className="text-left py-1 hover:text-gold-dark">
              Contact Us
            </button>
          </nav>

          <div className="pt-4 space-y-2.5 border-t border-gold/15">
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-emerald-600/30 text-emerald-700 bg-emerald-50 text-xs font-semibold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
            <AnimatedButton
              variant="dark-shimmer"
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
            >
              Book Private Consultation
            </AnimatedButton>
          </div>
        </div>
      )}
    </header>
  );
};
