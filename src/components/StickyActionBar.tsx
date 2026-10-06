'use client';

import Link from 'next/link';
import {
  BadgeCheck,
  FileText,
  LayoutGrid,
  MapPin,
  Phone,
  Users,
} from 'lucide-react';
import { useInquiry } from '@/components/InquiryProvider';
import { useSettings } from '@/components/SiteSettingsProvider';
import styles from './StickyActionBar.module.css';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.894 9.899-9.894a9.825 9.825 0 0 1 7.021 2.91 9.825 9.825 0 0 1 2.9 7.03c-.003 5.45-4.445 9.897-9.935 9.897m8.432-18.327A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.3-1.654a11.88 11.88 0 0 0 5.69 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.461-8.443Z" />
    </svg>
  );
}

export function StickyActionBar() {
  const { open } = useInquiry();
  const settings = useSettings();
  const telephone = settings.phone.replace(/[^\d+]/g, '');
  const whatsappHref = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Rasm Weddings, I would like a free consultation for my wedding.',
  )}`;

  return (
    <aside className={styles.dock} aria-label="Quick wedding planning actions">
      <div className={styles.desktopBar}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}><Users aria-hidden="true" /></span>
          <span className={styles.copy}>
            <strong>500+ Successful Events</strong>
            <small>Trusted wedding planners in Rajasthan</small>
          </span>
        </div>

        <button className={styles.infoItem} type="button" onClick={() => open('Free consultation')}>
          <span className={styles.infoIcon}><BadgeCheck aria-hidden="true" /></span>
          <span className={styles.copy}>
            <strong>Free Consultation</strong>
            <small>Let&apos;s plan your dream wedding</small>
          </span>
        </button>

        <button className={styles.quoteButton} type="button" onClick={() => open('Free wedding quote')}>
          <FileText aria-hidden="true" />
          <span>Get Free Quote</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>

        <a className={styles.actionButton} href={`tel:${telephone}`}>
          <Phone aria-hidden="true" />
          <span className={styles.copy}>
            <strong>Call Now</strong>
            <small>{settings.phone}</small>
          </span>
        </a>

        <a className={`${styles.actionButton} ${styles.whatsappButton}`} href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          <span className={styles.copy}>
            <strong>WhatsApp</strong>
            <small>Chat with us</small>
          </span>
        </a>

        <Link className={styles.actionButton} href="/services/">
          <LayoutGrid aria-hidden="true" />
          <span className={styles.copy}>
            <strong>Services</strong>
            <small>Explore our services</small>
          </span>
        </Link>

        <Link className={styles.actionButton} href="/wedding-destination/">
          <MapPin aria-hidden="true" />
          <span className={styles.copy}>
            <strong>Destinations</strong>
            <small>Wedding locations</small>
          </span>
        </Link>
      </div>

      <nav className={styles.mobileBar} aria-label="Mobile quick actions">
        <a className={styles.mobileAction} href={`tel:${telephone}`} aria-label={`Call Rasm Weddings at ${settings.phone}`}>
          <span className={styles.mobileIcon}><Phone aria-hidden="true" /></span>
          <span>Call</span>
        </a>
        <a className={styles.mobileAction} href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rasm Weddings on WhatsApp">
          <span className={`${styles.mobileIcon} ${styles.whatsappIcon}`}><WhatsAppIcon /></span>
          <span>WhatsApp</span>
        </a>
        <button className={`${styles.mobileAction} ${styles.mobileQuote}`} type="button" onClick={() => open('Free wedding quote')}>
          <span className={styles.mobileIcon}><FileText aria-hidden="true" /></span>
          <span>Quote</span>
        </button>
        <Link className={styles.mobileAction} href="/services/">
          <span className={styles.mobileIcon}><LayoutGrid aria-hidden="true" /></span>
          <span>Services</span>
        </Link>
        <Link className={styles.mobileAction} href="/wedding-destination/">
          <span className={styles.mobileIcon}><MapPin aria-hidden="true" /></span>
          <span>Destinations</span>
        </Link>
      </nav>
    </aside>
  );
}
