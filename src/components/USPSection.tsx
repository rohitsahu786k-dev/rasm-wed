import React from 'react';
import { Crown, Eye, Globe2, Sparkles, ShieldCheck, ArrowRight, Utensils, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface USPSectionProps {
  onOpenInquiry: () => void;
}

export const USPSection: React.FC<USPSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] relative overflow-hidden border-b border-gold/15">
      {/* Golden Ambient Blur Backdrops */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

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
            From direct palace management relationships to virtual 3D mandap simulations, we eliminate uncertainty and deliver uncompromising royal celebrations.
          </p>
        </div>

        {/* 21st.dev Popular Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-6">
          
          {/* Card 1: Direct Palace Partnerships (Hero Card - Spans 4 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-charcoal-950 text-white min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-stone-800"
          >
            {/* Background Image with Dark Royal Vignette */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-55"
              style={{
                backgroundImage: `url('https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/20" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-wider font-medium text-[#E2C785]">
                  Exclusive Palace Privileges
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C5A059]/20 backdrop-blur-md border border-[#C5A059]/40 text-[11px] font-medium text-[#E2C785]">
                  Zero Vendor Markups
                </span>
              </div>

              <h3 className="font-manrope font-medium text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-2">
                Direct Palace Partnerships & Island Buyouts
              </h3>

              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mb-6">
                Direct executive relationships with Taj Lake Palace, Jagmandir Island, Oberoi Udaivilas, The Leela, and City Palace. We secure preferred room allocations and buyouts without broker fees.
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs font-light text-stone-300">
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
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 hover:border-gold/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Virtual Pre-Visualization
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-3">
                3D Spatial Mandap Simulations
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Experience your wedding venue in photorealistic 3D months before you fly to India. Mandap geometry, floral canopies, and lighting simulated to the exact millimeter.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal-800">Zero Guesswork Guarantee</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Card 3: 24/7 NRI & Global Concierge (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 hover:border-gold/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Global Standards
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-3">
                24/7 NRI & International Concierge
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed mb-4">
                Dedicated timezone-synchronized liaison in New York, London & Dubai. Flawless flight tracking, VIP airport transfers, and multilingual Vedic pundits.
              </p>

              {/* Timezone Clocks Pill */}
              <div className="flex items-center gap-2 text-[10px] font-medium text-charcoal-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <Clock className="w-3 h-3 text-[#C5A059]" />
                <span>NYC · LON · DXB · DEL Live Sync</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-[#C5A059]">Multilingual Guest Desks</span>
            </div>
          </motion.div>

          {/* Card 4: Generational Mewari Gastronomy (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 hover:border-gold/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Heritage Feasts
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-3">
                Generational Royal Mewari Khansamas
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Master royal chefs curating authentic Mewari royal thalis alongside world-class global catering, molecular mixology, and customized vegan/Jain stations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-[#C5A059]">Royal Court Recipes</span>
            </div>
          </motion.div>

          {/* Card 5: Weather & Redundancy Guarantee (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 hover:border-gold/50 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
                Zero-Risk Assurance
              </span>

              <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight leading-snug mb-3">
                100% Weather & Logistics Redundancy
              </h3>

              <p className="text-charcoal-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Full indoor backup venues reserved, generator grids on standby, and 30-minute rapid decor change protocols to ensure an uninterrupted celebration.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-[#C5A059]">Contingency Guaranteed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </motion.div>

        </div>

        {/* Quiet Luxury Bottom Action Bar */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-ivory-100 via-amber-50/40 to-ivory-100 p-6 sm:p-8 border border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
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
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-charcoal-950 text-white hover:bg-black font-manrope font-medium text-xs sm:text-sm tracking-normal shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(197,160,89,0.2)] transition-all duration-300 group"
          >
            <span>Request Private Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#E2C785] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
