'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

interface InquiryCtx {
  destination: string;
  open: (context?: string) => void;
}

const Ctx = createContext<InquiryCtx>({ destination: 'Udaipur, Rajasthan', open: () => {} });
export const useInquiry = () => useContext(Ctx);

/** Enquiry entry points send visitors to the contact page form (no popup), carrying what they clicked on. */
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [destination, setDestination] = useState('Udaipur, Rajasthan');

  const open = useCallback(
    (context?: string) => {
      const q = context ? `?ref=${encodeURIComponent(context)}` : '';
      if (context) setDestination(context);
      router.push(`/contact-us/${q}#contact`);
    },
    [router],
  );
  const value = useMemo(() => ({ destination, open }), [destination, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
