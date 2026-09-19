import React from 'react';
import HarmonicWave from './ui/harmonic-wave';
import { Camera } from 'lucide-react';

export const RoyalHarmonicWaveSection: React.FC = () => {
  return (
    <section id="gallery" className="relative bg-white border-b border-gold/15">
      {/* Intro Header */}
      <div className="pt-16 pb-4 text-center">
        <div className="rasm-container">
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-3">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Harmonic Scenography & Motion</span>
          </div>
          <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 mb-3 tracking-tight leading-[1.22]">
            The <span className="gold-gradient-text italic font-normal">Royal Cinematic</span> Showcase
          </h2>
          <p className="text-charcoal-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Scroll smoothly to experience our interactive spatial card wave showcasing Udaipur's grandest palace venues and royal mandap moments.
          </p>
        </div>
      </div>

      {/* The Scroll-Driven Harmonic Wave (Smooth 180vh scroll length without blank gap) */}
      <HarmonicWave
        scrollLength={180}
        stackScale={0.75}
        cardRadius={18}
        showScrollHint={true}
      />
    </section>
  );
};
export default RoyalHarmonicWaveSection;
