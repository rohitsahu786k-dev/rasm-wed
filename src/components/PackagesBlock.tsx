import { BedDouble, Camera, Car, ClipboardCheck, Landmark, Music2, Star, Utensils } from 'lucide-react';
import { InquiryAnimatedButton } from '@/components/InquiryClient';

/** Package details exactly as published on rasmwed.com (contact-us and services pages). */
const INCLUSIONS = [
  { icon: Landmark, label: 'Venue Selection & Booking' },
  { icon: BedDouble, label: 'Hospitality & Guest Management' },
  { icon: Utensils, label: 'Catering Services' },
  { icon: Camera, label: 'Photography & Videography' },
  { icon: Star, label: 'Celebrity & Artist Management' },
  { icon: Music2, label: 'Entertainment & DJ' },
  { icon: Car, label: 'Logistics & Transportation' },
  { icon: ClipboardCheck, label: 'Complete On-ground Execution' },
];

export function PackagesBlock({ headingAs: H = 'h2' }: { headingAs?: 'h2' | 'h3' }) {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FDFCFA] to-white border-b border-gold/15">
      <div className="rasm-container max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">Wedding Packages</p>
          <H className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.2] mb-4">
            Plan Your Dream Wedding <span className="gold-gradient-text italic">With Rasm</span>
          </H>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
            Our wedding planning packages start from <strong className="font-semibold text-charcoal-900">₹30,00,000 (30 Lacs)</strong> and go up to ₹1 Crore or more, depending on your requirements, scale, venue and customisation. Whether it is a royal destination wedding, an intimate celebration or a luxury event, every package can include:
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INCLUSIONS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl border border-gold/25 bg-white p-4 shadow-2xs">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-ivory-200 shrink-0">
                <Icon className="w-5 h-5 text-gold-dark" />
              </span>
              <span className="text-sm text-charcoal-800 font-medium leading-snug">{label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <InquiryAnimatedButton variant="gold-shimmer" size="lg" context="Wedding package enquiry">
            Request a Custom Quote
          </InquiryAnimatedButton>
        </div>
      </div>
    </section>
  );
}
