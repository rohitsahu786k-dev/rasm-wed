import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export interface MediaItemType {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

const WEDDING_BENTO_MEDIA: MediaItemType[] = [
  {
    id: 1,
    type: 'image',
    title: 'Sacred Sunset Vows by Lake Pichola',
    desc: 'Bespoke floating mandap overlooking the Mewar palace pavilions at sunset.',
    url: 'https://rasmwed.com/wp-content/uploads/2026/04/Romantic-Indian-Wedding-Moment.jpg',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-4 sm:row-span-5',
  },
  {
    id: 2,
    type: 'image',
    title: 'The Oberoi Udaivilas Royal Reflections',
    desc: 'Heritage domes, sprawling reflection pools, and imperial Mewari courtyards.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Oberoi-Udaivilas.webp',
    span: 'col-span-1 sm:col-span-1 md:col-span-2 row-span-3 sm:row-span-3',
  },
  {
    id: 3,
    type: 'image',
    title: 'Jagmandir Island Palace Private Buyout',
    desc: 'Grand illuminated marble courtyard and royal boat arrival jetty.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/Jagmandir-Island-Palace.webp',
    span: 'col-span-1 sm:col-span-1 md:col-span-1 row-span-3 sm:row-span-3',
  },
  {
    id: 4,
    type: 'image',
    title: 'Palatial Scenography & Mandap Illumination',
    desc: 'Intricate crystal chandeliers, gold carvings, and hand-strung jasmine canopies.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/MLVR0388-scaled.webp',
    span: 'col-span-1 sm:col-span-1 md:col-span-1 row-span-3 sm:row-span-3',
  },
  {
    id: 5,
    type: 'image',
    title: 'Royal Baraat Cavalcade & Rajputana Regalia',
    desc: 'Vintage luxury procession, royal dhol troupe, and ceremonial rose showers.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/IMG_E5208.webp',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-3 sm:row-span-4',
  },
  {
    id: 6,
    type: 'image',
    title: 'Fateh Garh Hilltop Sunset Panorama',
    desc: 'Panoramic fort views across the Aravali mountain valleys and Lake Pichola.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/Fateh-Garh-Palace.webp',
    span: 'col-span-1 sm:col-span-1 md:col-span-1 row-span-3 sm:row-span-4',
  },
  {
    id: 7,
    type: 'image',
    title: 'The Leela Palace Lakeside Luxury',
    desc: 'Private lakeside dining terraces and royal Mewari hospitality.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/08/The-Leela-Palace-Udaipur.webp',
    span: 'col-span-1 sm:col-span-1 md:col-span-1 row-span-3 sm:row-span-4',
  },
  {
    id: 8,
    type: 'image',
    title: 'Sacred Agni Pheras Ceremony',
    desc: 'Traditional Vedic rites with floral mandap architecture by master artisans.',
    url: 'https://rasmwed.com/wp-content/uploads/2026/04/download-49.jpg',
    span: 'col-span-1 sm:col-span-1 md:col-span-2 row-span-3 sm:row-span-3',
  },
  {
    id: 9,
    type: 'image',
    title: 'Twilight Courtyard Banquet & Mixology',
    desc: 'Curated royal Mewari khansama feast and bespoke mixology under star-lit canopies.',
    url: 'https://rasmwed.com/wp-content/uploads/2024/07/PTIG5387.webp',
    span: 'col-span-1 sm:col-span-2 md:col-span-2 row-span-3 sm:row-span-3',
  },
];

// MediaItem component renders clean image without any text overlay
const MediaItem: React.FC<{
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}> = ({ item, className, onClick }) => {
  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover cursor-pointer select-none`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

// GalleryModal component displays selected media item with interactive draggable dock
interface GalleryModalProps {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  mediaItems,
}) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      {/* Main Full-Screen Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Main Content Card */}
        <motion.div
          key={selectedItem.id}
          className="relative w-full max-w-4xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-charcoal-950 border border-white/10"
          initial={{ y: 20, scale: 0.95 }}
          animate={{
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
            },
          }}
          exit={{ y: 20, scale: 0.95, transition: { duration: 0.15 } }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-[16/10] w-full max-h-[72vh] flex items-center justify-center bg-black/40">
            <MediaItem
              item={selectedItem}
              className="w-full h-full object-contain"
            />
            {/* Modal Bottom Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-white font-manrope font-medium text-lg sm:text-xl">
                {selectedItem.title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 font-light max-w-2xl">
                {selectedItem.desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Close Button */}
        <motion.button
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2.5 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md transition-all shadow-lg z-60"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Draggable Dock (21st.dev Interactive Bento Gallery Signature Feature) */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          initial={false}
          animate={{ x: dockPosition.x, y: dockPosition.y }}
          onDragEnd={(_, info) => {
            setDockPosition((prev) => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y,
            }));
          }}
          className="fixed z-60 left-1/2 bottom-5 -translate-x-1/2 touch-none"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div className="relative rounded-2xl bg-white/90 backdrop-blur-2xl border border-gold/30 shadow-[0_12px_40px_rgba(0,0,0,0.25)] cursor-grab active:cursor-grabbing p-2 sm:p-2.5">
            <div className="flex items-center -space-x-1.5 px-1 sm:px-2">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                  }}
                  className={`relative group w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer ${
                    selectedItem.id === item.id
                      ? 'ring-2 ring-[#C5A059] shadow-md'
                      : 'hover:ring-2 hover:ring-gold/40 opacity-80 hover:opacity-100'
                  }`}
                  initial={{ rotate: index % 2 === 0 ? -8 : 8 }}
                  animate={{
                    scale: selectedItem.id === item.id ? 1.25 : 1,
                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -8 : 8,
                    y: selectedItem.id === item.id ? -6 : 0,
                  }}
                  whileHover={{
                    scale: 1.35,
                    rotate: 0,
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

interface HomeGallerySectionProps {
  onNavigate?: (path: string) => void;
}

export const HomeGallerySection: React.FC<HomeGallerySectionProps> = ({ onNavigate }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items] = useState<MediaItemType[]>(WEDDING_BENTO_MEDIA);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#FFFFFF] relative border-b border-gold/15 overflow-hidden">
      {/* Subtle ambient blur glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="w-[92%] max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-ivory-200 to-amber-50/60 border border-gold/35 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs uppercase font-medium gold-gradient-text tracking-normal">
              Interactive Palatial Visual Archives
            </span>
          </div>

          <h2 className="font-manrope font-medium text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            Imperial Celebrations in <span className="gold-gradient-text italic font-normal">Interactive Bento</span>
          </h2>

          <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-2xl mx-auto">
            Explore authentic wedding celebrations captured across Lake Pichola, The Oberoi Udaivilas, Jagmandir Island, and Rambagh Palace. Drag cards to feel the physics or click to open the interactive dock.
          </p>
        </div>

        {/* 21st.dev Interactive Bento Gallery Grid (anurag-mishra22 style) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[60px] sm:auto-rows-[70px] md:auto-rows-[80px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`media-${item.id}`}
              className={`relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.18)] hover:border-gold/50 transition-shadow duration-300 bg-stone-100 ${item.span}`}
              onClick={() => {
                if (!isDragging) setSelectedItem(item);
              }}
              variants={{
                hidden: { y: 40, scale: 0.95, opacity: 0 },
                visible: {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    delay: index * 0.04,
                  },
                },
              }}
              whileHover={{ scale: 1.015 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => {
                setTimeout(() => setIsDragging(false), 50);
              }}
            >
              {/* Pure image without ANY text overlay */}
              <MediaItem
                item={item}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View Complete Visual Archives CTA */}
        {onNavigate && (
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('/gallery')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-charcoal-950 text-white hover:bg-black font-manrope font-medium text-xs sm:text-sm tracking-normal shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(197,160,89,0.2)] transition-all duration-300 group"
            >
              <span>Explore Complete Archives (200+ Photos)</span>
              <ArrowRight className="w-4 h-4 text-[#E2C785] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Modal with Signature Draggable Dock */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HomeGallerySection;
