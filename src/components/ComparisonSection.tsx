import React from 'react';
import { Check, X, Sparkles, Crown, ShieldCheck } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface ComparisonSectionProps {
  onOpenInquiry?: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenInquiry }) => {
  const comparisonRows = [
    {
      feature: 'Palatial Venue Access',
      rasm: 'Direct GM Partnerships with Oberoi, Taj, Leela & Forts (Zero Broker Fees)',
      traditional: 'Middlemen brokers with 15% - 25% hidden venue markups',
      rasmHighlight: true,
    },
    {
      feature: 'Pre-Wedding Visuals',
      rasm: '3D Photorealistic Architectural Mandap & Stage Pre-Simulations',
      traditional: 'Paper sketches and verbal assumptions with zero 3D certainty',
      rasmHighlight: true,
    },
    {
      feature: 'Production & Decor Execution',
      rasm: '100% In-House Lighting, Sound Grids, Florists & Structural Carpenters',
      traditional: 'Outsourced to disconnected third-party local labor',
      rasmHighlight: true,
    },
    {
      feature: 'International / NRI Guest Care',
      rasm: 'Dedicated 24/7 Global Timezone Support & Airport Chauffeur Liaison',
      traditional: 'Local IST working hours only with fragmented coordination',
      rasmHighlight: true,
    },
    {
      feature: 'Pricing & Budget Transparency',
      rasm: 'Fixed Management Fee with 100% Direct Transparent Vendor Billing',
      traditional: 'Inflated line items, kickbacks, and surprise final bills',
      rasmHighlight: true,
    },
    {
      feature: 'Weather & Risk Contingency',
      rasm: 'Guaranteed indoor palace backup reserves, secondary sound & generator grids',
      traditional: 'Ad-hoc frantic solutions on the day of the wedding',
      rasmHighlight: true,
    },
  ];

  return (
    <section className="py-24 bg-white relative border-b border-gold/15">
      <div className="rasm-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
            <span>The Transparency Difference</span>
          </div>
          <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 mb-4 tracking-tight leading-[1.2]">
            The <span className="gold-gradient-text italic font-normal">Rasm Standard</span> vs Traditional Planners
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
            See how our modern tech-enabled luxury architecture delivers unmatched peace of mind for royal destination celebrations.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#FAF8F5] rounded-3xl p-4 sm:p-8 border border-gold/25 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-charcoal-400 font-semibold w-1/3">
                    Celebration Feature
                  </th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold w-1/3 bg-white/80 rounded-t-2xl border-t border-x border-gold/30 text-charcoal-900">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-gold-dark" />
                      <span className="font-manrope text-sm text-gold-dark font-bold tracking-wide">Rasm Weddings</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-charcoal-400 font-semibold w-1/3">
                    Traditional Middlemen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 font-medium text-charcoal-900">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 bg-white/80 border-x border-gold/30 text-charcoal-900 font-light">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{row.rasm}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-charcoal-500 font-light">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3 h-3" />
                        </div>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {onOpenInquiry && (
            <div className="mt-8 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-charcoal-600 font-light">
                Experience transparent, world-class wedding curation for your royal celebrations.
              </span>
              <AnimatedButton
                variant="gold-shimmer"
                size="md"
                onClick={onOpenInquiry}
              >
                Experience The Rasm Distinction
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
