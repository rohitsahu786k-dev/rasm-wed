'use client';

import Image from 'next/image';
import { useState } from 'react';
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

/** Homepage enquiry block. Submitting opens WhatsApp with the details (same behaviour as the contact page form). */
export function HomeContact() {
  const settings = useSettings();
  const { destination: preset } = useInquiry();
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? '').trim();
    const text =
      `*New Wedding Consultation Request*\n\n` +
      `*Name:* ${get('name')}\n*Phone/WhatsApp:* ${get('phone')}\n*Destination:* ${get('destination')}\n` +
      `*Wedding Date:* ${get('date') || 'Flexible'}\n*Guests:* ${get('guests') || 'Not sure yet'}\n*Message:* ${get('message') || '-'}`;
    setDone(true);
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="bg-ivory-200 border-b border-gold/15">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image src={HOME_IMAGES.contact.src} alt={HOME_IMAGES.contact.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-top" />
        </div>

        <div className="rasm-container py-12 sm:py-16 lg:py-20 grid xl:grid-cols-[minmax(0,1fr)_220px] gap-10 items-start">
          <div>
            <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">Let&apos;s Plan Your</p>
            <h2 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15] mb-3">
              Royal <span className="gold-gradient-text italic">Story</span>
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-7 max-w-lg">
              Share a few details and our Udaipur team will get in touch with a personalised proposal for your wedding.
            </p>

            {done ? (
              <div role="status" className="rounded-2xl border border-gold/30 bg-white p-8 text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 mb-3" />
                <p className="font-manrope font-medium text-xl text-charcoal-900 mb-1">Thank you!</p>
                <p className="text-sm text-charcoal-600 font-light mb-4">WhatsApp is opening so you can send us your details directly.</p>
                <button type="button" onClick={() => setDone(false)} className="text-sm font-medium text-gold-dark hover:text-charcoal-900">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <label className="sr-only" htmlFor="hc-name">Your name</label>
                <input id="hc-name" name="name" required placeholder="Your Name" autoComplete="name" className={field} />
                <label className="sr-only" htmlFor="hc-phone">WhatsApp or phone number</label>
                <input id="hc-phone" name="phone" type="tel" required placeholder="WhatsApp / Phone Number" autoComplete="tel" className={field} />
                <label className="sr-only" htmlFor="hc-dest">Wedding destination</label>
                <select id="hc-dest" name="destination" defaultValue={preset || DESTINATIONS[0]} className={field}>
                  {DESTINATIONS.map((x) => <option key={x}>{x}</option>)}
                </select>
                <label className="sr-only" htmlFor="hc-date">Wedding date</label>
                <input id="hc-date" name="date" type="date" className={field} />
                <label className="sr-only" htmlFor="hc-guests">Guest count</label>
                <input id="hc-guests" name="guests" inputMode="numeric" placeholder="Guest Count" className={field} />
                <label className="sr-only" htmlFor="hc-msg">Message</label>
                <input id="hc-msg" name="message" placeholder="Message (Optional)" className={field} />
                <button type="submit" className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#A88434] via-[#B8923A] to-[#8F6A14] px-8 py-3.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all sm:justify-self-start">
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
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
    </section>
  );
}
