'use client';

import Image from 'next/image';

export interface PageBannerProps {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Universal Responsive Luxury Banner Component:
 * - Desktop: 21:9 aspect ratio (`aspect-[21/9]`)
 * - Mobile: 1:1 aspect ratio (`aspect-square`)
 * - Completely clean: No text, overlays, or buttons on top of the image.
 * - Dynamic: Easily updated via WordPress backend (ACF / REST API) or local fallback.
 */
export function PageBanner({
  desktopSrc,
  mobileSrc,
  alt,
  priority = true,
  className = '',
}: PageBannerProps) {
  const mSrc = mobileSrc || desktopSrc;

  return (
    <div className={`w-full relative overflow-hidden bg-stone-100 border-b border-gold/20 shadow-xs ${className}`}>
      {/* 1. Desktop Banner (21:9 Aspect Ratio) */}
      <div className="hidden md:block relative w-full aspect-[21/9] max-h-[660px]">
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 2. Mobile Banner (1:1 Aspect Ratio) */}
      <div className="block md:hidden relative w-full aspect-square">
        <Image
          src={mSrc}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

export default PageBanner;
