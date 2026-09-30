import { InquiryAnimatedButton } from '@/components/InquiryClient';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import type { WPPage } from '@/lib/wp';
import { settings } from '@/data/settings';
import { media } from '@/data/media';
import { Sparkles, MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Heart, Crown, Award, Users, Phone, Mail } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ServicesBento } from '@/components/ServicesBento';
import { RealWeddingsGallery } from '@/components/RealWeddingsGallery';
import { ContactSection } from '@/components/ContactSection';

interface PageViewProps {
  slug: string;
  wpPage?: WPPage | null;
}

export const PageView: React.FC<PageViewProps> = ({ slug: cleanSlug, wpPage }) => {

  // 2. Specialized Non-City Pages
  if (cleanSlug === 'services') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        <div className="py-16 bg-[#FDFCFA] border-b border-gold/20 text-center px-4">
          <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
            World-Class Orchestration
          </span>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            Bespoke Royal <span className="gold-gradient-text italic">Wedding Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-charcoal-600 text-sm sm:text-base font-light">
            From direct palace reservations to 3D photorealistic mandap simulations and generational royal Mewari feasts.
          </p>
        </div>
        <ServicesBento />
        <div className="py-16 text-center border-t border-gold/15 bg-[#FAF8F5]">
          <InquiryAnimatedButton
            variant="gold-shimmer"
            size="lg"
             context={'Wedding Services Consultation'}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Inquire Royal Wedding Services
          </InquiryAnimatedButton>
        </div>
      </div>
    );
  }

  if (cleanSlug === 'gallery') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        <h1 className="sr-only">Real Palace Wedding Gallery</h1>
        <RealWeddingsGallery media={media} />
      </div>
    );
  }

  if (cleanSlug === 'contact-us' || cleanSlug === 'contact') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        <h1 className="sr-only">Contact Rasm Weddings & Events</h1>
        <ContactSection />
      </div>
    );
  }

  if (cleanSlug === 'about-us' || cleanSlug === 'about') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        {/* About Us Hero */}
        <section className="relative py-24 bg-[#FDFCFA] border-b border-gold/20 overflow-hidden text-center">
          <div className="rasm-container relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory-200 border border-gold/40 text-gold-dark text-xs uppercase tracking-[0.28em] font-medium mb-6">
              <Crown className="w-3.5 h-3.5 text-gold-dark" />
              <span>12+ Years of Royal Heritage</span>
            </div>
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 mb-6 tracking-tight leading-[1.2]">
              Architects of Royal <span className="gold-gradient-text italic">Indian Celebrations</span>
            </h1>
            <p className="max-w-3xl mx-auto text-charcoal-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10">
              Founded in the imperial city of Udaipur, Rasm Wedding & Events was created to bridge timeless Rajputana heritage with contemporary high-fashion wedding production. Over the past decade, we have orchestrated 450+ bespoke celebrations for couples from the US, UK, Middle East, and India.
            </p>
          </div>
        </section>

        {/* 4 Pillars of Rasm */}
        <section className="py-20 rasm-container border-b border-gold/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs text-center">
              <Award className="w-10 h-10 text-gold-dark mx-auto mb-4" />
              <h3 className="font-manrope font-medium text-2xl text-charcoal-900 mb-3 tracking-tight">
                Direct Palatial Access
              </h3>
              <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                Direct partnerships with general managers across The Oberoi Udaivilas, Taj Lake Palace, The Leela, and City Palace complexes without broker fees.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs text-center">
              <Users className="w-10 h-10 text-gold-dark mx-auto mb-4" />
              <h3 className="font-manrope font-medium text-2xl text-charcoal-900 mb-3 tracking-tight">
                White-Glove NRI Care
              </h3>
              <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                Dedicated 24/7 global timezone coordination, airport liaisons, VIP luggage transfers, and multilingual Vedic pundits.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs text-center">
              <ShieldCheck className="w-10 h-10 text-gold-dark mx-auto mb-4" />
              <h3 className="font-manrope font-medium text-2xl text-charcoal-900 mb-3 tracking-tight">
                3D Spatial Simulations
              </h3>
              <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                Experience photorealistic 3D architectural renders of your mandap, stage, and floral setups months before you land in India.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#FAF8F5] text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-snug">
              Let’s Plan Your Royal Celebration
            </h2>
            <p className="text-charcoal-600 text-sm font-light">
              Connect with our senior wedding architects in Udaipur today.
            </p>
            <div className="pt-4">
              <InquiryAnimatedButton
                variant="gold-shimmer"
                size="lg"
                 context={'About Us Page Inquiry'}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Private Consultation
              </InquiryAnimatedButton>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (cleanSlug === 'traditional-decoration') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        <section className="relative py-24 bg-[#FDFCFA] border-b border-gold/20 text-center">
          <div className="rasm-container relative z-10">
            <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
              Heritage Scenography
            </span>
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 mb-6 tracking-tight leading-[1.2]">
              Traditional Royal <span className="gold-gradient-text italic">Wedding Decoration</span>
            </h1>
            <p className="max-w-2xl mx-auto text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-10">
              Vedic mandap architecture, handcrafted marigold arrays, brass urli installations, and night illumination inspired by the royal darbars of Mewar.
            </p>
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
               context={'Traditional Decoration Inquiry'}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Inquire Royal Decoration
            </InquiryAnimatedButton>
          </div>
        </section>

        <section className="py-20 rasm-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card rounded-2xl overflow-hidden bg-white border border-gold/20">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp"
                alt="Palatial Mandap"
                className="w-full h-56 object-cover"
               width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="p-6">
                <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">Vedic Lake Mandaps</h3>
                <p className="text-charcoal-600 text-xs leading-relaxed font-light">
                  Handcrafted mandap pavilions with real tuberose, marigolds, and sacred copper havan kund setups.
                </p>
              </div>
            </div>

            <div className="editorial-card rounded-2xl overflow-hidden bg-white border border-gold/20">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp"
                alt="Courtyard Scenography"
                className="w-full h-56 object-cover"
               width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="p-6">
                <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">Rajputana Courtyards</h3>
                <p className="text-charcoal-600 text-xs leading-relaxed font-light">
                  Traditional Mewari lighting, candlelit water basins, and royal velvet drapery for sangeet nights.
                </p>
              </div>
            </div>

            <div className="editorial-card rounded-2xl overflow-hidden bg-white border border-gold/20">
              <Image
                src="https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg"
                alt="Sacred Pheras Setup"
                className="w-full h-56 object-cover"
               width={1200} height={800} sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="p-6">
                <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">Floral Architecture</h3>
                <p className="text-charcoal-600 text-xs leading-relaxed font-light">
                  Exotic imported orchids, Mogra arches, and organic rose petal carpets for aisle entries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (cleanSlug === 'corporate-events') {
    return (
      <div className="pt-24 bg-white min-h-screen">
        <section className="relative py-24 bg-[#FDFCFA] border-b border-gold/20 text-center">
          <div className="rasm-container relative z-10">
            <span className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium block mb-2">
              Executive Heritage Galas
            </span>
            <h1 className="font-manrope font-medium text-3xl sm:text-5xl md:text-6xl text-charcoal-900 mb-6 tracking-tight leading-[1.2]">
              Corporate & VIP <span className="gold-gradient-text italic">Event Management</span>
            </h1>
            <p className="max-w-2xl mx-auto text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-10">
              Executive leadership retreats, high-profile product unveilings, and royal gala banquets orchestrated in the palatial venues of Udaipur and Rajasthan.
            </p>
            <InquiryAnimatedButton
              variant="gold-shimmer"
              size="lg"
               context={'Corporate Events Inquiry'}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Inquire Corporate Galas
            </InquiryAnimatedButton>
          </div>
        </section>

        <section className="py-20 rasm-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs">
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">Palace Retreats & Summits</h3>
              <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                Full-service buyout management of boutique heritage fortresses with boardroom AV and luxury dining.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gold/20 shadow-xs">
              <h3 className="font-manrope font-medium text-xl text-charcoal-900 mb-2 tracking-tight">VIP Chauffeur & Charter Logistics</h3>
              <p className="text-charcoal-600 text-xs sm:text-sm font-light leading-relaxed">
                Armored vehicle escorts, airport tarmac welcomes, and coordinated fleet management for C-suite dignitaries.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 3. Fallback for Legal / Informational Pages (Privacy, Terms, Policies)
  const cleanTitle = wpPage?.title || cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Sanitize content from Elementor noise if present
  let cleanContent = (wpPage?.content || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<(\/?)h1\b/gi, '<$1h2'); // template already renders the page H1
  if (cleanContent.includes('elementor')) {
    // Strip raw elementor div wrapper tags if found, keeping readable paragraphs
    cleanContent = cleanContent
      .replace(/<div class="elementor[^>]*>/g, '')
      .replace(/<\/div>/g, '')
      .replace(/<section class="elementor[^>]*>/g, '')
      .replace(/<\/section>/g, '');
  }

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-charcoal-900">
      <div className="rasm-container">
        <div className="text-center mb-12 pb-8 border-b border-gold/20">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Official Policy & Information</span>
          </div>
          <h1 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 mb-3 tracking-tight leading-snug">
            {cleanTitle}
          </h1>
          <p className="text-charcoal-500 text-xs uppercase tracking-wider font-light">
            Rasm Weddings & Events · Established in Udaipur, Rajasthan
          </p>
        </div>

        {cleanContent ? (
          <div
            className="prose prose-stone max-w-none text-charcoal-700 text-sm leading-relaxed font-light space-y-6 [&_h2]:font-manrope [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-charcoal-900 [&_h3]:font-manrope [&_h3]:font-bold [&_h3]:text-xl [&_p]:leading-relaxed p-8 rounded-3xl bg-[#FAF8F5] border border-gold/20"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />
        ) : (
          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-gold/20 text-center space-y-4">
            <p className="text-charcoal-600 text-sm font-light">
              For full details regarding this policy or service, please connect with our administrative desk in Udaipur.
            </p>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold-dark font-medium hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>{settings.email}</span>
            </a>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href={'/'}
            
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest text-charcoal-700 bg-white border border-gold/30 hover:border-gold shadow-2xs transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
