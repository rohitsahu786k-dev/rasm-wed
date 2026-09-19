import React from 'react';
import { Crown, Eye, Globe2, ShieldCheck, ArrowRight, Utensils, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface USPSectionProps {
  onOpenInquiry: () => void;
}

export const USPSection: React.FC<USPSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="py-24 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-gold/15">
      {/* Subtle Golden Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-[92%] max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-ivory-200 to-amber-50/60 border border-gold/35 shadow-2xs mb-3">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase font-medium gold-gradient-text tracking-normal">
              The Rasm Distinctive Standard
            </span>
          </div>

          <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            Why Discerning Couples <span className="gold-gradient-text italic font-normal">Choose Rasm</span>
          </h2>

          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            From direct palace executive relationships to virtual 3D mandap simulations, we eliminate uncertainty and deliver uncompromising royal celebrations.
          </p>
        </div>

        {/* High-Contrast Luxury Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: Direct Palace Partnerships & Island Buyouts (Grand Obsidian Card - Spans 4 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-[#121214] text-white min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-7 sm:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.18)] border border-stone-800"
          >
            {/* Dark royal backdrop image with high-contrast gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-40"
              style={{
                backgroundImage: `url('https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/80 to-transparent" />

            {/* Content with 100% readable white text and gold accents */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-wider font-semibold text-[#E2C785]">
                  Exclusive Access
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#C5A059]/25 backdrop-blur-md border border-[#C5A059]/50 text-[11px] font-medium text-[#E2C785]">
                  Zero Vendor Fees
                </span>
              </div>

              <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-2.5">
                Direct Palace Partnerships & Island Buyouts
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mb-6">
                Priority direct access to Taj Lake Palace, Jagmandir Island, Oberoi Udaivilas, The Leela, and City Palace complexes — without broker commissions or third-party markups.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15 text-xs font-light text-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2C785]" />
                  <span>100% Direct Venue Allocation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E2C785]" />
                  <span>Lake Jetty & Barge Permits</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 3D Mandap Simulations (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-stone-200/90 hover:border-gold/50 hover:shadow-[0_14px_35px_rgba(197,160,89,0.12)] transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Virtual Pre-Visualization
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-2.5">
                3D Spatial Mandap Simulations
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed mb-5">
                Experience your venue in photorealistic 3D months before you fly in — mandap dimensions, floral arches, sangeet lighting, all rendered to perfection.
              </p>

              {/* Visual Blueprint Badge */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-150 flex items-center justify-between text-xs text-charcoal-700">
                <span className="font-mono text-[11px] text-[#C5A059]">SCALE 1:1 · ZERO ERROR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal-800">Zero Guesswork</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>
          </motion.div>

          {/* Card 3: 24/7 NRI & International Concierge (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-stone-200/90 hover:border-gold/50 hover:shadow-[0_14px_35px_rgba(197,160,89,0.12)] transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Global Standards
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-2.5">
                24/7 NRI & International Concierge
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed mb-4">
                Dedicated timezone-aware coordination, VIP airport transfers, multilingual pundits, and luxury welcome experiences for your global guest list.
              </p>

              {/* Timezone Live Status */}
              <div className="flex items-center gap-2 text-[10px] font-medium text-charcoal-700 bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>LON · NYC · DXB · DEL Live Sync</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-charcoal-800">Multilingual Team</span>
            </div>
          </motion.div>

          {/* Card 4: Generational Mewari Khansamas (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-stone-200/90 hover:border-gold/50 hover:shadow-[0_14px_35px_rgba(197,160,89,0.12)] transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Utensils className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Heritage Gastronomy
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-2.5">
                Royal Mewari Feasts
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Generational royal khansamas crafting authentic Mewari thalis, molecular mixology, and bespoke menus for international dietary needs.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal-800">Authentic Royal Recipes</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </motion.div>

          {/* Card 5: Weather & Logistics Redundancy (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-stone-200/90 hover:border-gold/50 hover:shadow-[0_14px_35px_rgba(197,160,89,0.12)] transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Flawless Execution
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-2.5">
                100% Weather & Logistics Redundancy
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Full indoor backup venues, generator grids, rapid decor teams and zero-risk contingency protocols ensuring an uninterrupted celebration.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal-800">Zero-Risk Guarantee</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </motion.div>

        </div>

        {/* High-Contrast Bottom Action Bar */}
        <div className="mt-12 rounded-2xl bg-white p-6 sm:p-8 border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-manrope font-medium text-base sm:text-lg text-charcoal-900">
              Ready to experience effortless palace wedding curation?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-1">
              Speak directly with our senior royal wedding architect in Udaipur.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal-950 hover:bg-black text-white font-manrope font-medium text-sm tracking-normal shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.25)] transition-all duration-300 group"
          >
            <span className="text-white">Request Private Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#E2C785] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default USPSection;
