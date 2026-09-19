import React from 'react';
import CommunityOrbit, { type OrbitItem, type OrbitStat, type OrbitTag } from './ui/builders-community-hero';
import { Crown, Sparkles, Building2, Star, MessageSquareText, ShieldCheck, Heart, MapPin, Compass, CheckCircle2 } from 'lucide-react';

interface RoyalCommunityOrbitSectionProps {
  onOpenInquiry?: (context?: string) => void;
}

const items: OrbitItem[] = [
  // Outer Ring (from left to right)
  {
    kind: 'status',
    ring: 'outer',
    angle: 132,
    label: 'Palace Buyout Confirmed'
  },
  {
    kind: 'card',
    ring: 'outer',
    angle: 112.6,
    icon: <Crown className="w-6 h-6 text-gold" />,
    badge: '18+'
  },
  {
    kind: 'pill',
    ring: 'outer',
    angle: 90,
    icon: <Crown className="w-3.5 h-3.5 text-gold" />,
    label: 'NRI Desk: NYC · London · Dubai'
  },
  {
    kind: 'pill',
    ring: 'outer',
    angle: 67.6,
    icon: <Star className="w-3.5 h-3.5 fill-gold text-gold" />,
    label: '450+ Celebrations'
  },
  {
    kind: 'avatar',
    ring: 'outer',
    angle: 50.9,
    src: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    alt: 'Royal Wedding Couple',
    color: '#FAF8F5',
    size: 70
  },
  {
    kind: 'pill',
    ring: 'outer',
    angle: 35.2,
    icon: <MessageSquareText size={13} strokeWidth={2} className="text-gold-dark" />,
    label: '24/7 Royal Liaison'
  },

  // Inner Ring (from left to right)
  {
    kind: 'avatar',
    ring: 'inner',
    angle: 137.2,
    src: 'https://rasmwed.com/wp-content/uploads/2026/04/download-51.jpg',
    alt: 'Imperial Vows Couple',
    color: '#FAF8F5',
    size: 52
  },
  {
    kind: 'pill',
    ring: 'inner',
    angle: 116.6,
    icon: <Building2 className="w-3.5 h-3.5 text-gold-dark" />,
    label: 'Udaipur Heritage'
  },
  {
    kind: 'avatar',
    ring: 'inner',
    angle: 90,
    src: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    alt: 'Palace Venue',
    color: '#FAF8F5',
    size: 48
  },
  {
    kind: 'card',
    ring: 'inner',
    angle: 63.3,
    icon: <Sparkles className="w-6 h-6 text-gold" />
  },
  {
    kind: 'check',
    ring: 'inner',
    angle: 41.8
  },
];

const stats: OrbitStat[] = [
  { value: '450+', label: 'Royal Celebrations' },
  { value: '18+', label: 'Historic Palaces' },
  { value: '100%', label: 'Discreet NRI Trust' },
];

export const RoyalCommunityOrbitSection: React.FC<RoyalCommunityOrbitSectionProps> = ({ onOpenInquiry }) => {
  const tags: OrbitTag[] = [
    {
      icon: <Building2 strokeWidth={2} />,
      label: 'Lake Pichola Palaces',
      onClick: () => onOpenInquiry && onOpenInquiry('Lake Pichola Palaces Consultation'),
    },
    {
      icon: <Compass strokeWidth={2} />,
      label: 'Worldwide NRI Concierge',
      onClick: () => onOpenInquiry && onOpenInquiry('Worldwide NRI Concierge Desk'),
    },
    {
      icon: <Sparkles strokeWidth={2} />,
      label: '3D Spatial Simulations',
      onClick: () => onOpenInquiry && onOpenInquiry('3D Spatial Simulations Inquiry'),
    },
    {
      icon: <ShieldCheck strokeWidth={2} />,
      label: 'Direct GM Partnerships',
      onClick: () => onOpenInquiry && onOpenInquiry('Direct Hotel GM Access'),
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gold/15 relative overflow-hidden">
      {/* Subtle Ambient Gold Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent" />

      <div className="rasm-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>The Global Royal Circle</span>
          </div>
        </div>

        <CommunityOrbit
          items={items}
          stats={stats}
          headline={
            <span className="font-manrope font-bold text-charcoal-900 block text-2xl sm:text-3xl md:text-4xl tracking-tight">
              Where Royal Dreams <br className="hidden sm:block" />
              <span className="gold-gradient-text italic font-normal">Turn Into Palatial Reality</span>
            </span>
          }
          tags={tags}
          className="bg-transparent"
        />
      </div>
    </section>
  );
};
export default RoyalCommunityOrbitSection;
