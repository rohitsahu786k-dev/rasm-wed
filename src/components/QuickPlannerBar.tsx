import React, { useState } from 'react';
import { MapPin, Building2, Users, Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface QuickPlannerBarProps {
  onPlan: (city: string, venueType: string, guestCount: string) => void;
}

export const QuickPlannerBar: React.FC<QuickPlannerBarProps> = ({ onPlan }) => {
  const [selectedCity, setSelectedCity] = useState('Udaipur, Rajasthan');
  const [selectedVenue, setSelectedVenue] = useState('Lake Palace & Island Fortress');
  const [selectedGuests, setSelectedGuests] = useState('150 - 300 Guests');

  const cities = [
    { name: 'Udaipur, Rajasthan', slug: 'wedding-planner-in-udaipur' },
    { name: 'Jaipur, Rajasthan', slug: 'wedding-planner-in-jaipur' },
    { name: 'Jodhpur & Jaisalmer', slug: 'wedding-planner-in-jodhpur' },
    { name: 'Goa Coastal Luxury', slug: 'wedding-planner-in-goa' },
    { name: 'Kumbhalgarh & Mount Abu', slug: 'wedding-planner-in-kumbhalgarh' },
    { name: 'Thailand International', slug: 'wedding-planner-in-thailand' },
    { name: 'Rishikesh Riverside', slug: 'why-rishikesh-is-new-destination-wedding-hotspot' },
  ];

  const venueTypes = [
    'Lake Palace & Island Fortress',
    'Imperial Rajputana Fort & Haveli',
    'Hilltop Mountain Sanctuary',
    'Oceanfront Beach Mandap',
    'Thar Desert Sand Dunes',
  ];

  const guestBrackets = [
    'Intimate (50 - 150 Guests)',
    '150 - 300 Guests',
    '300 - 500 Guests',
    'Grand Gala (500+ Guests)',
  ];

  const handleSearch = () => {
    onPlan(selectedCity, selectedVenue, selectedGuests);
  };

  return (
    <div className="rasm-container relative -mt-8 z-30">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border border-gold/30 hover:border-gold/50 transition-all">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-dark font-medium">
            Meragi-Inspired Bespoke Wedding Finder
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* City Selector */}
          <div className="md:col-span-4 p-3 rounded-2xl bg-[#FAF8F5] border border-gold/20 hover:border-gold/40 transition-colors">
            <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-wider text-charcoal-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold-dark" />
              <span>Destination City</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-transparent font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold focus:outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Venue Type Selector */}
          <div className="md:col-span-4 p-3 rounded-2xl bg-[#FAF8F5] border border-gold/20 hover:border-gold/40 transition-colors">
            <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-wider text-charcoal-500 font-medium">
              <Building2 className="w-3.5 h-3.5 text-gold-dark" />
              <span>Palace & Venue Type</span>
            </div>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full bg-transparent font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold focus:outline-none cursor-pointer"
            >
              {venueTypes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Guests Selector */}
          <div className="md:col-span-4 lg:col-span-2 p-3 rounded-2xl bg-[#FAF8F5] border border-gold/20 hover:border-gold/40 transition-colors">
            <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-wider text-charcoal-500 font-medium">
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              <span>Guest Count</span>
            </div>
            <select
              value={selectedGuests}
              onChange={(e) => setSelectedGuests(e.target.value)}
              className="w-full bg-transparent font-manrope text-xs sm:text-sm text-charcoal-900 font-semibold focus:outline-none cursor-pointer"
            >
              {guestBrackets.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-12 lg:col-span-2 flex justify-end">
            <button
              onClick={handleSearch}
              className="w-full py-4 px-5 rounded-2xl bg-charcoal-900 text-gold-light hover:bg-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 group border border-gold/40 hover:border-gold"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 text-gold-dark group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
