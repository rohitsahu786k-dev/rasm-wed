'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Headset, Landmark, Lightbulb, ReceiptText } from 'lucide-react';
import { useInquiry } from '@/components/InquiryProvider';
import { useSettings } from '@/components/SiteSettingsProvider';
import { HOME_IMAGES } from '@/data/home-media';

const DESTINATIONS = ['Udaipur, Rajasthan', 'Jaipur, Rajasthan', 'Jodhpur, Rajasthan', 'Jaisalmer, Rajasthan', 'Kumbhalgarh & Mount Abu', 'Nathdwara & Pushkar', 'Goa', 'Thailand', 'Other / Multi-City'];

const BENEFITS = [
  { icon: Lightbulb, label: 'Personalised Suggestions' },
  { icon: Landmark, label: 'Best Venue Options' },
  { icon: ReceiptText, label: 'Transparent Pricing' },
  { icon: Headset, label: 'Dedicated Support' },
];

const field = 'w-full rounded-lg border border-gold/25 bg-white px-4 py-3 text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:border-gold';

/** Enquiry form (home + contact page). Sends the details by email to the Rasm inbox through /api/contact. */
export function HomeContact() {
  const settings = useSettings();
  const { destination: preset } = useInquiry();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [source, setSource] = useState('');
  const [dest, setDest] = useState<string>(DESTINATIONS[0]);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref') ?? '';
    // Reads the query string once on the client (cannot be known during static prerender).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSource(`${window.location.pathname}${ref ? ` (${ref})` : ''}`);
    const hint = `${ref} ${preset}`.toLowerCase();
    const match = DESTINATIONS.find((d) => hint.includes(d.split(/[,&]/)[0].trim().toLowerCase()));
    if (match) setDest(match);
  }, [preset]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(d.entries()), source }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
      form.reset();
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-ivory-200 border-b border-gold/15 py-10 sm:py-14 scroll-mt-24">
      <div className="rasm-container">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-[#FBF8F2]">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image src={HOME_IMAGES.contact.src} alt={HOME_IMAGES.contact.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover object-top" />
        </div>

        <div className="p-6 sm:p-10 lg:p-12 grid xl:grid-cols-[minmax(0,1fr)_220px] gap-8 items-start">
          <div>
            <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">Let&apos;s Plan Your</p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15] mb-3">
              Royal <span className="gold-gradient-text italic">Story</span>
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-7 max-w-lg">
              Share a few details and our Udaipur team will get in touch with a personalised proposal for your wedding.
            </p>

            {status === 'done' ? (
              <div role="status" className="rounded-2xl border border-gold/30 bg-white p-8 text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 mb-3" />
                <p className="font-manrope font-medium text-xl text-charcoal-900 mb-1">Thank you, we have your enquiry</p>
                <p className="text-sm text-charcoal-600 font-light mb-4">Our Udaipur team will contact you shortly. For a faster reply you can also message us on WhatsApp.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gold-dark hover:text-charcoal-900">Chat on WhatsApp</a>
                  <button type="button" onClick={() => setStatus('idle')} className="text-sm font-medium text-gold-dark hover:text-charcoal-900">Send another enquiry</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <label className="sr-only" htmlFor="hc-name">Your name</label>
                <input id="hc-name" name="name" required placeholder="Your Name" autoComplete="name" className={field} />
                <label className="sr-only" htmlFor="hc-phone">WhatsApp or phone number</label>
                <input id="hc-phone" name="phone" type="tel" required placeholder="WhatsApp / Phone Number" autoComplete="tel" className={field} />
                <label className="sr-only" htmlFor="hc-email">Email address</label>
                <input id="hc-email" name="email" type="email" placeholder="Email (Optional)" autoComplete="email" className={field} />
                <label className="sr-only" htmlFor="hc-dest">Wedding destination</label>
                <select id="hc-dest" name="destination" value={dest} onChange={(e) => setDest(e.target.value)} className={field}>
                  {DESTINATIONS.map((x) => <option key={x}>{x}</option>)}
                </select>
                <label className="sr-only" htmlFor="hc-date">Wedding date</label>
                <input id="hc-date" name="date" type="date" className={field} />
                <label className="sr-only" htmlFor="hc-guests">Guest count</label>
                <input id="hc-guests" name="guests" inputMode="numeric" placeholder="Guest Count" className={field} />
                <label className="sr-only" htmlFor="hc-msg">Message</label>
                <input id="hc-msg" name="message" placeholder="Message (Optional)" className={`${field} sm:col-span-2`} />
                {status === 'error' && (
                  <p role="alert" className="sm:col-span-2 text-sm text-red-700">
                    {error} You can also call {settings.phone} or write to {settings.email}.
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#A88434] via-[#B8923A] to-[#8F6A14] px-8 py-3.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all sm:justify-self-start disabled:opacity-60">
                  {status === 'sending' ? 'Sending...' : 'Get a Free Consultation'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <ul className="grid grid-cols-2 xl:grid-cols-1 gap-3">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white px-4 py-3">
                <Icon className="w-5 h-5 text-gold-dark shrink-0" strokeWidth={1.5} />
                <span className="text-[13px] text-charcoal-800">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
