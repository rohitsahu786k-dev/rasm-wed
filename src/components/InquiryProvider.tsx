'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { InquiryModal } from '@/components/InquiryModal';
import { useSettings } from '@/components/SiteSettingsProvider';

interface InquiryCtx {
  destination: string;
  open: (destination?: string) => void;
}

const Ctx = createContext<InquiryCtx>({ destination: 'Udaipur, Rajasthan', open: () => {} });
export const useInquiry = () => useContext(Ctx);

/** Tiny client boundary: holds only the modal-open state. Page content stays server-rendered. */
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const settings = useSettings();
  const [isOpen, setOpen] = useState(false);
  const [destination, setDestination] = useState('Udaipur, Rajasthan');

  const open = useCallback((dest?: string) => {
    if (dest) setDestination(dest);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ destination, open }), [destination, open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <InquiryModal isOpen={isOpen} onClose={() => setOpen(false)} settings={settings} defaultDestination={destination} />
    </Ctx.Provider>
  );
}
