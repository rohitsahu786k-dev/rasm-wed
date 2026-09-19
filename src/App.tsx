import React, { useState, useEffect, useRef } from 'react';
import { fetchSiteData } from './services/wordpress';
import { SiteSettings, BlogPost, MediaItem, Destination, MenuItem, WPPage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { USPSection } from './components/USPSection';
import { ServicesBento } from './components/ServicesBento';
import { InternationalConcierge } from './components/InternationalConcierge';
import { RealWeddingsGallery } from './components/RealWeddingsGallery';
import { HomeGallerySection } from './components/HomeGallerySection';
import { RoyalCommunityOrbitSection } from './components/RoyalCommunityOrbitSection';
import { RoyalHarmonicWaveSection } from './components/RoyalHarmonicWaveSection';
import { RealCouplesStories } from './components/RealCouplesStories';
import { BlogFeed } from './components/BlogFeed';
import { ContactSection } from './components/ContactSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { LuxuryTextMarquee } from './components/LuxuryTextMarquee';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PageView } from './components/PageView';
import { Crown, Loader2, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const DEFAULT_SETTINGS: SiteSettings = {
  title: 'Rasm Wedding & Events',
  description: 'Premier Luxury Destination Wedding Architects in Udaipur & Rajasthan',
  url: 'https://rasmwed.com',
  logoUrl: '/rasm-official-logo.png',
  phone: '+91 98290 12345',
  whatsapp: '919829012345',
  email: 'ankitab890@gmail.com',
  address: 'Near Lake Pichola, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001',
  heroHeadline: 'Where Royal Heritage Meets Timeless Romance',
  heroSubheadline: 'Curating bespoke palatial celebrations across Udaipur, Jaipur, and iconic rasm destinations for discerning couples worldwide.',
  instagramUrl: 'https://instagram.com/rasmwed',
  stats: {
    experience: '12+ Years',
    weddings: '450+ Curated',
    destinations: '18+ Palaces',
    satisfaction: '100% Bliss'
  }
};

export const App: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [pages, setPages] = useState<WPPage[]>([]);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('Udaipur, Rajasthan');
  
  // Multipage Routing State
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSiteData();
        if (data.settings) setSettings(data.settings);
        if (data.posts) setPosts(data.posts);
        if (data.media) setMedia(data.media);
        if (data.destinations) setDestinations(data.destinations);
        if (data.menus) setMenus(data.menus);
        if (data.pages) setPages(data.pages);
      } catch (err) {
        console.error('Failed to load site data:', err);
      }
    }
    load();

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const target = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentPath]);

  const handleSelectDestination = (destName: string) => {
    setSelectedDestination(destName);
    setInquiryOpen(true);
  };

  const isHome = currentPath === '/' || currentPath === '';

  return (
    <div className="min-h-screen bg-white text-charcoal-900 flex flex-col selection:bg-gold selection:text-white">
      {/* Top Navigation with Mega Menu */}
      <Navbar
        settings={settings}
        menus={menus}
        pages={pages}
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      <main className="flex-grow" ref={mainRef}>
        {isHome ? (
          <>
            {/* Hero Section */}
            <Hero
              settings={settings}
              onOpenInquiry={() => setInquiryOpen(true)}
            />

            {/* Destinations Showcase (No Prices) */}
            <DestinationsSection
              destinations={destinations}
              onSelectDestination={handleSelectDestination}
            />

            {/* Modern Luxury Text Marquee Ticker */}
            <LuxuryTextMarquee />

            {/* World-Class USP Section */}
            <USPSection
              onOpenInquiry={() => setInquiryOpen(true)}
            />

            {/* Services Bento Grid */}
            <ServicesBento />

            {/* Royal Community Orbit (Interactive Builders Community Hero Adapted for Luxury Weddings) */}
            <RoyalCommunityOrbitSection
              onOpenInquiry={(ctx) => {
                if (ctx) setSelectedDestination(ctx);
                setInquiryOpen(true);
              }}
            />

            {/* Harmonic Palatial Wave (Interactive Spatial Wave Gallery) */}
            <RoyalHarmonicWaveSection />

            {/* Imperial Visual Archives: 21st.dev Style Masonry Lightbox Gallery */}
            <HomeGallerySection onNavigate={navigateTo} />

            {/* Real Royal Testimonials: 4 & 5 Grid Testimonials Section */}
            <RealCouplesStories
              onOpenInquiry={(ctx) => {
                if (ctx) setSelectedDestination(ctx);
                setInquiryOpen(true);
              }}
            />

            {/* Real Live WordPress Blog Feed */}
            <BlogFeed posts={posts} onNavigate={navigateTo} />

            {/* Live Instagram Feed Section */}
            <InstagramFeedSection />

            {/* Contact & Consultation Desk */}
            <ContactSection
              settings={settings}
              prefilledDestination={selectedDestination}
            />
          </>
        ) : (
          /* Multi-Page Renderer for all WordPress Pages */
          <PageView
            slug={currentPath}
            pages={pages}
            settings={settings}
            destinations={destinations}
            media={media}
            posts={posts}
            onOpenInquiry={() => setInquiryOpen(true)}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={navigateTo} />

      {/* Private Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        settings={settings}
        defaultDestination={selectedDestination}
      />
    </div>
  );
};

export default App;
