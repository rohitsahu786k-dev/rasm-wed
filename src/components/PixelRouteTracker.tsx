'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type Fbq = (...args: unknown[]) => void;

/** Fires Meta Pixel PageView on client-side navigations only (the initial view is fired by the pixel snippet). */
export function PixelRouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    (window as unknown as { fbq?: Fbq }).fbq?.('track', 'PageView');
  }, [pathname]);
  return null;
}
