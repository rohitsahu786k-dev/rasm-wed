'use client';

import { useEffect } from 'react';

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

/**
 * Conversion events the site had no way to measure (GA4 showed 0 key events):
 *   - click on a WhatsApp / phone / email link  -> GA4 `generate_lead` (method) + Meta `Contact`
 *   - inquiry / contact form submit             -> GA4 `generate_lead` + Meta `Lead`
 * One delegated listener, no per-component wiring. Mark `generate_lead` as a key event in GA4 once.
 */
export function LeadTracking() {
  useEffect(() => {
    const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
    const fire = (method: string, page: string) => {
      w.gtag?.('event', 'generate_lead', { method, page_path: page });
      w.fbq?.('track', method === 'form' ? 'Lead' : 'Contact');
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) fire('whatsapp', location.pathname);
      else if (href.startsWith('tel:')) fire('phone', location.pathname);
      else if (href.startsWith('mailto:')) fire('email', location.pathname);
    };
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null;
      // The footer newsletter is not a lead; every other form (inquiry modal, contact, quick inquiry) is.
      if (form?.querySelector?.('#footer-email')) return;
      fire('form', location.pathname);
    };
    document.addEventListener('click', onClick, { capture: true });
    document.addEventListener('submit', onSubmit, { capture: true });
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('submit', onSubmit, { capture: true });
    };
  }, []);
  return null;
}
