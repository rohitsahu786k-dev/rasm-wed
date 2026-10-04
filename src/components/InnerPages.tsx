import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { Destination, MediaItem } from '@/types';
import type { WPPage, WPPost } from '@/lib/wp';
import { getSiteSettings } from '@/lib/acf';
import { getCityProfile } from '@/lib/city';
import { PAGE_IMAGES, SERVICE_IMAGES } from '@/data/page-media';
import {
  ABOUT_FAQ, ABOUT_POINTS, ABOUT_PROSE, BLOG_PROSE, CONTACT_FAQ, CORPORATE_FAQ, CORPORATE_PROSE, CORPORATE_TYPES, DECOR_FAQ,
  DECOR_PROSE, DECOR_STEPS, DECOR_TYPES, DEST_FAQ, DEST_PROSE, FACTS, GALLERY_PROSE, PROCESS, SERVICES, SERVICES_FAQ, SERVICES_PROSE,
} from '@/data/pages-content';
import { Band, Cards, CtaBand, ExploreLinks, Facts, Faq, PageHero, PhotoGrid, Prose, SectionTitle, Steps } from '@/components/PageParts';
import { PackagesBlock } from '@/components/PackagesBlock';
import { RealWeddingsGallery } from '@/components/RealWeddingsGallery';
import { HomeContact } from '@/components/HomeContact';
import { WpBody } from '@/components/WpBody';

const CORE_LINKS = [
  { label: 'Wedding Planner in Udaipur', href: '/wedding-planner-in-udaipur/' },
  { label: 'Wedding Planner in Jaipur', href: '/wedding-planner-in-jaipur/' },
  { label: 'Wedding Planner in Jodhpur', href: '/wedding-planner-in-jodhpur/' },
  { label: 'Wedding Planner in Jaisalmer', href: '/wedding-planner-in-jaisalmer/' },
  { label: 'Wedding Planner in Goa', href: '/wedding-planner-in-goa/' },
  { label: 'Wedding Venues', href: '/wedding-destination/' },
  { label: 'Wedding Decoration', href: '/traditional-decoration/' },
  { label: 'Corporate Events', href: '/corporate-events/' },
  { label: 'Wedding Gallery', href: '/gallery/' },
  { label: 'Blog', href: '/blog/' },
];
const linksExcept = (...hrefs: string[]) => CORE_LINKS.filter((l) => !hrefs.includes(l.href));

/* ---------------------------------- Services ---------------------------------- */

export function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
        schemaPath="/services/"
        eyebrow="Wedding Planning Services"
        title="Wedding Planning Services in Udaipur,"
        accent="From Venue to Farewell"
        lead="Nine services under one roof: venues, decor, food, entertainment, hospitality, logistics, vendors, budgets and invitations. Take the full package or pick only what you need."
        image={PAGE_IMAGES.heroServices}
        primary={{ label: 'Request a Quote', context: 'Wedding services quote' }}
        secondary={{ label: 'See Packages', href: '#packages' }}
      />
      <Band tone="ivory">
        <Facts items={FACTS} />
      </Band>

      <Band>
        <SectionTitle eyebrow="What We Do" title="Our Nine" accent="Wedding Planning Services" lead="Every service can be booked on its own or as part of a complete plan for your wedding in Udaipur or any of our 12 destinations." />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const img = SERVICE_IMAGES[s.key];
            return (
              <li key={s.key} id={s.key} className="rounded-3xl overflow-hidden border border-gold/25 bg-white shadow-[0_8px_30px_rgba(197,160,89,0.08)] flex flex-col">
                {img && (
                  <div className="relative aspect-[3/2] bg-stone-100">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm text-charcoal-600 font-light leading-relaxed">{s.text}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-charcoal-700 font-light list-disc pl-5 marker:text-gold">
                    {s.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Band>

      <div id="packages"><PackagesBlock headingAs="h2" /></div>

      <Band tone="ivory">
        <SectionTitle eyebrow="How We Work" title="Our Wedding Planning" accent="Process" center lead="A clear, step-by-step process so you always know what happens next." />
        <Steps steps={PROCESS} />
      </Band>

      <Band>
        <Prose blocks={SERVICES_PROSE} />
      </Band>

      <Faq title="Wedding Planning Services:" accent="Your Questions Answered" faqs={SERVICES_FAQ} />
      <ExploreLinks title="Plan Your Wedding by Destination" links={linksExcept('/blog/', '/gallery/')} />
      <CtaBand title="Tell us about your wedding" text="Share your dates, guest count and destination. Our Udaipur team will suggest venues, a plan and a clear written estimate." context="Services page enquiry" />
    </div>
  );
}

/* ---------------------------------- About ---------------------------------- */

export function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'About Us' }]}
        schemaPath="/about-us/"
        eyebrow="About Rasm Weddings & Events"
        title="Wedding and Event Planners in Udaipur,"
        accent="Over a Decade of Celebrations"
        lead="We are an Udaipur-based team that has planned more than 500 weddings and events for families in India and abroad, from intimate ceremonies to multi-day destination weddings."
        image={PAGE_IMAGES.heroAbout}
        primary={{ label: 'Book a Consultation', context: 'About page enquiry' }}
        secondary={{ label: 'Our Services', href: '/services/' }}
      />
      <Band tone="ivory">
        <Facts items={FACTS} />
      </Band>
      <Band>
        <SectionTitle eyebrow="Why Couples Choose Us" title="What Makes Rasm Different" center />
        <Cards items={ABOUT_POINTS} />
      </Band>
      <Band tone="sand">
        <PhotoGridAbout />
      </Band>
      <Band>
        <Prose blocks={ABOUT_PROSE} />
      </Band>
      <Band tone="ivory">
        <SectionTitle eyebrow="How We Work" title="From First Call to" accent="Last Guest Departure" center />
        <Steps steps={PROCESS} />
      </Band>
      <Faq title="About Rasm Weddings & Events:" accent="Questions" faqs={ABOUT_FAQ} />
      <ExploreLinks links={linksExcept('/blog/')} />
      <CtaBand title="Let us plan your wedding in Udaipur" text="Meet the team that will plan, design and run your celebration. The first consultation is free." context="About page closing enquiry" />
    </div>
  );
}

function PhotoGridAbout() {
  return (
    <>
      <SectionTitle eyebrow="Our Work" title="Decor, Venues and Ceremonies" accent="We Plan" center />
      <PhotoGrid items={PAGE_IMAGES.about} />
    </>
  );
}

/* ---------------------------------- Decoration ---------------------------------- */

export function DecorationPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Wedding Decoration' }]}
        schemaPath="/traditional-decoration/"
        eyebrow="Wedding Decorators in Udaipur"
        title="Wedding Decoration in Udaipur,"
        accent="Designed Around Your Story"
        lead="Mandaps, stages, entrances, florals and lighting for palaces, lakesides, hotels and gardens, from traditional Rajasthani styles to modern white and gold."
        image={PAGE_IMAGES.heroDecor}
        primary={{ label: 'Get a Decor Quote', context: 'Wedding decoration enquiry' }}
        secondary={{ label: 'View Services', href: '/services/' }}
      />
      <Band>
        <SectionTitle eyebrow="What We Decorate" title="Wedding Decor" accent="for Every Function" center lead="Whatever you are celebrating, we design the space so it looks good in person and in photographs." />
        <Cards items={DECOR_TYPES} />
      </Band>
      <Band tone="sand">
        <SectionTitle eyebrow="Our Work" title="Decor Styles We Create" center />
        <PhotoGrid items={PAGE_IMAGES.decor} />
        <p className="mt-6 text-center text-sm">
          <Link href="/gallery/" className="inline-flex items-center gap-2 font-medium text-gold-dark hover:text-charcoal-900">
            See the full wedding gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      </Band>
      <Band tone="ivory">
        <SectionTitle eyebrow="Our Process" title="How We Design and Deliver" accent="Your Wedding Decor" center />
        <Steps steps={DECOR_STEPS} />
      </Band>
      <Band>
        <Prose blocks={DECOR_PROSE} />
      </Band>
      <Faq title="Wedding Decoration in Udaipur:" accent="Questions" faqs={DECOR_FAQ} />
      <ExploreLinks links={linksExcept('/traditional-decoration/', '/blog/')} />
      <CtaBand title="Plan your wedding decor with Rasm" text="Share your venue, date and style. We will send a concept and an estimate for your approval." context="Decoration page closing enquiry" />
    </div>
  );
}

/* ---------------------------------- Corporate ---------------------------------- */

export function CorporatePage({ wpPage }: { wpPage?: WPPage | null }) {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Corporate Events' }]}
        schemaPath="/corporate-events/"
        eyebrow="Corporate Event Management in Udaipur"
        title="Corporate Events in Udaipur and Rajasthan,"
        accent="Planned End to End"
        lead="Conferences, incentive trips, gala dinners and product launches at palaces, heritage hotels and resorts, with hospitality, production and logistics handled by one team."
        image={PAGE_IMAGES.heroCorporate}
        primary={{ label: 'Plan a Corporate Event', context: 'Corporate event enquiry' }}
        secondary={{ label: 'Our Services', href: '/services/' }}
      />
      <Band>
        <SectionTitle eyebrow="Event Types" title="Corporate and VIP Events" accent="We Manage" center />
        <Cards items={CORPORATE_TYPES} />
      </Band>
      <Band tone="sand">
        <SectionTitle eyebrow="Our Work" title="Event Setups" accent="for Every Format" center />
        <PhotoGrid items={PAGE_IMAGES.corporate} cols={4} />
      </Band>
      <Band tone="ivory">
        <SectionTitle eyebrow="How We Work" title="From Brief to" accent="Event Day" center />
        <Steps steps={PROCESS.map((s, i) => (i === 0 ? { title: 'Brief and objectives', text: 'We understand your agenda, headcount, dates and budget, and recommend venues and a programme.' } : s))} />
      </Band>
      <Band>
        <Prose blocks={CORPORATE_PROSE} />
        {wpPage?.content && /\S/.test(wpPage.content.replace(/<[^>]+>/g, '')) && (
          <details className="max-w-3xl mx-auto mt-10 rounded-2xl border border-gold/25 bg-[#FDFCFA] p-5">
            <summary className="cursor-pointer font-manrope font-medium text-charcoal-900">Read our full guide to corporate and VIP events in Rajasthan</summary>
            <WpBody content={wpPage.content} className="mt-4" />
          </details>
        )}
      </Band>
      <Faq title="Corporate Events in Udaipur:" accent="Questions" faqs={CORPORATE_FAQ} />
      <ExploreLinks links={linksExcept('/corporate-events/', '/blog/', '/traditional-decoration/')} />
      <CtaBand title="Planning a corporate event in Rajasthan?" text="Tell us the format, headcount and dates. We will suggest venues and a plan, with a clear estimate." context="Corporate page closing enquiry" />
    </div>
  );
}

/* ---------------------------------- Contact ---------------------------------- */

export async function ContactPage() {
  const s = await getSiteSettings();
  const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;
  const mapQuery = encodeURIComponent(`Rasm Weddings & Events, ${s.address}`);
  const cards = [
    { icon: Phone, label: 'Call us', lines: [{ text: s.phone, href: tel(s.phone) }, ...(s.phone2 ? [{ text: s.phone2, href: tel(s.phone2) }] : [])] },
    { icon: MessageCircle, label: 'WhatsApp', lines: [{ text: `+${s.whatsapp}`, href: `https://wa.me/${s.whatsapp}` }] },
    { icon: Mail, label: 'Email', lines: [{ text: s.email, href: `mailto:${s.email}` }] },
    { icon: MapPin, label: 'Office, Udaipur', lines: [{ text: s.address, href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}` }] },
  ];
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
        schemaPath="/contact-us/"
        eyebrow="Contact Rasm Weddings & Events"
        title="Talk to a Wedding Planner in Udaipur,"
        accent="Free Consultation"
        lead="Share your dates, guest count and destination. Call, message us on WhatsApp or send the form below and our Udaipur team will get back to you."
      />
      <Band tone="ivory">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ icon: Icon, label, lines }) => (
            <li key={label} className="rounded-2xl border border-gold/25 bg-white p-6">
              <Icon className="w-5 h-5 text-gold-dark mb-3" strokeWidth={1.6} />
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-medium mb-2">{label}</h2>
              {lines.map((l) => (
                <p key={l.text} className="text-sm text-charcoal-800 leading-relaxed">
                  <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="hover:text-gold-dark transition-colors break-words">{l.text}</a>
                </p>
              ))}
            </li>
          ))}
        </ul>
      </Band>
      <HomeContact />
      <Faq title="Contact and Booking:" accent="Questions" faqs={CONTACT_FAQ} tone="white" />
      <ExploreLinks links={linksExcept('/blog/')} />
    </div>
  );
}

/* ---------------------------------- Gallery ---------------------------------- */

export function GalleryPage({ media }: { media: MediaItem[] }) {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Gallery' }]}
        schemaPath="/gallery/"
        eyebrow="Wedding Gallery"
        title="Wedding Gallery:"
        accent="Decor and Celebrations in Udaipur"
        lead="Photographs of mandaps, stages, entrances, florals and lighting from weddings and events planned by Rasm Weddings & Events across Rajasthan."
        image={PAGE_IMAGES.heroGallery}
        primary={{ label: 'Plan Your Wedding', context: 'Gallery page enquiry' }}
      />
      <RealWeddingsGallery media={media} />
      <Band tone="ivory">
        <Prose blocks={GALLERY_PROSE} />
      </Band>
      <ExploreLinks links={linksExcept('/gallery/', '/blog/')} />
      <CtaBand title="Like what you see?" text="Share your favourite photos with us and we will design something that feels like you." context="Gallery closing enquiry" />
    </div>
  );
}

/* ---------------------------------- Destinations ---------------------------------- */

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const bestMonths = (t?: string) => new RegExp(`(?:${MONTHS})(?:\\s+to\\s+|\\s*[-–]\\s*)(?:${MONTHS})`).exec(t ?? '')?.[0] ?? '';

export function DestinationsPage({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Wedding Destinations' }]}
        schemaPath="/wedding-destination/"
        eyebrow="Destination Wedding Planner"
        title="Destination Wedding Venues in Rajasthan,"
        accent="Goa and Beyond"
        lead="Compare 12 wedding destinations by season, access and setting, then let Rasm plan your wedding in Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa, Thailand and more."
        image={PAGE_IMAGES.heroDestinations}
        primary={{ label: 'Plan My Destination Wedding', context: 'Destination wedding enquiry' }}
        secondary={{ label: 'Compare Destinations', href: '#compare' }}
      />
      <Band>
        <SectionTitle eyebrow="12 Destinations" title="Where Will Your" accent="Wedding Be?" center lead="Pick a destination to see venues, season, how guests get there and how Rasm plans weddings in that city." />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d, i) => (
            <li key={d.id}>
              <Link href={`/${d.slug}/`} className="group block h-full rounded-3xl overflow-hidden border border-gold/25 bg-white shadow-[0_8px_30px_rgba(197,160,89,0.08)] hover:shadow-xl transition-shadow">
                {d.imageUrl && (
                  <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden">
                    <Image src={d.imageUrl} alt={`Wedding planner in ${d.title}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={i < 3} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight mb-2">Wedding Planner in {d.title}</h3>
                  <p className="text-charcoal-600 text-sm font-light leading-relaxed mb-4 line-clamp-3">{d.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-gold-dark">
                    Explore {d.title} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="ivory" id="compare">
        <SectionTitle eyebrow="Compare" title="Wedding Destinations" accent="at a Glance" center lead="Use this table to shortlist. Travel options and schedules change, so confirm current routes when booking." />
        <div className="overflow-x-auto rounded-2xl border border-gold/25 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory-200 text-charcoal-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Destination</th>
                <th scope="col" className="px-4 py-3 font-medium">Comfortable months</th>
                <th scope="col" className="px-4 py-3 font-medium">Nearest airport</th>
                <th scope="col" className="px-4 py-3 font-medium">Known for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15 text-charcoal-700 font-light">
              {destinations.map((d) => {
                const p = getCityProfile(d.slug);
                return (
                  <tr key={d.id}>
                    <th scope="row" className="px-4 py-3 font-medium text-charcoal-900 whitespace-nowrap">
                      <Link href={`/${d.slug}/`} className="hover:text-gold-dark">{d.title}</Link>
                    </th>
                    <td className="px-4 py-3">{bestMonths(p?.facts.bestMonths) || 'Ask our team'}</td>
                    <td className="px-4 py-3">{p?.facts.nearestAirport ?? '-'}</td>
                    <td className="px-4 py-3">{p?.facts.knownFor.slice(0, 2).join(', ') ?? '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Band>

      <PackagesBlock headingAs="h2" />
      <Band>
        <Prose blocks={DEST_PROSE} />
      </Band>
      <Faq title="Destination Weddings:" accent="Questions" faqs={DEST_FAQ} />
      <ExploreLinks links={linksExcept('/wedding-destination/', '/blog/', '/gallery/')} />
      <CtaBand title="Not sure which destination fits?" text="Tell us your guest count, season and budget. We will compare two or three destinations and share costs for each." context="Destinations page closing enquiry" />
    </div>
  );
}

/* ---------------------------------- Blog index ---------------------------------- */

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function BlogIndex({ posts }: { posts: WPPost[] }) {
  const [first, ...rest] = posts;
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Blog' }]}
        schemaPath="/blog/"
        eyebrow="The Rasm Wedding Journal"
        title="Wedding Planning Blog:"
        accent="Udaipur and Destination Wedding Guides"
        lead="Venue guides, budget advice, rituals explained and decor ideas from the team that plans weddings in Udaipur and across Rajasthan."
        image={PAGE_IMAGES.heroBlog}
      />
      <Band>
        {first && (
          <article className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl border border-gold/20 bg-[#FDFCFA] overflow-hidden mb-10">
            {first.image && (
              <Link href={`/${first.slug}/`} className="relative block aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px] bg-stone-100" tabIndex={-1} aria-hidden="true">
                <Image src={first.image} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </Link>
            )}
            <div className="p-6 sm:p-10">
              <p className="text-gold-dark text-[11px] uppercase tracking-[0.3em] font-medium mb-3">Latest guide</p>
              <h2 className="font-manrope font-medium text-2xl sm:text-3xl text-charcoal-900 tracking-tight leading-snug mb-3">
                <Link href={`/${first.slug}/`} className="hover:text-gold-dark transition-colors">{first.title}</Link>
              </h2>
              <p className="text-charcoal-600 font-light leading-relaxed mb-5 line-clamp-4">{first.excerpt}</p>
              <p className="text-xs text-charcoal-500 mb-5"><time dateTime={first.date}>{fmt(first.date)}</time></p>
              <Link href={`/${first.slug}/`} className="inline-flex items-center gap-2 text-sm font-medium text-charcoal-900 hover:text-gold-dark">
                Read the guide <ArrowRight className="w-4 h-4 text-gold-dark" />
              </Link>
            </div>
          </article>
        )}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <li key={p.slug}>
              <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-gold/20 bg-white group">
                <Link href={`/${p.slug}/`} className="relative block aspect-[16/10] bg-stone-100 overflow-hidden" tabIndex={-1} aria-hidden="true">
                  {p.image && <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-charcoal-500 mb-2"><time dateTime={p.date}>{fmt(p.date)}</time></p>
                  <h3 className="font-manrope font-medium text-lg text-charcoal-900 tracking-tight leading-snug mb-2 line-clamp-2">
                    <Link href={`/${p.slug}/`} className="hover:text-gold-dark transition-colors">{p.title}</Link>
                  </h3>
                  <p className="text-sm text-charcoal-600 font-light leading-relaxed line-clamp-3">{p.excerpt}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Band>
      <Band tone="ivory">
        <Prose blocks={BLOG_PROSE} />
      </Band>
      <ExploreLinks links={linksExcept('/blog/')} />
      <CtaBand title="Ready to turn ideas into a plan?" text="Talk to our Udaipur team about your wedding. The first consultation is free." context="Blog index enquiry" />
    </div>
  );
}

/* ---------------------------------- Policy and other WordPress pages ---------------------------------- */

export async function InfoPage({ slug, wpPage }: { slug: string; wpPage?: WPPage | null }) {
  const s = await getSiteSettings();
  const title = wpPage?.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-28 sm:pt-32 pb-10 bg-[#FDFCFA] border-b border-gold/20">
        <div className="rasm-container max-w-4xl">
          <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">Rasm Weddings & Events, Udaipur</p>
          <h1 className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-snug">{title}</h1>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="rasm-container max-w-4xl">
          {wpPage?.content ? (
            <WpBody content={wpPage.content} className="max-w-none" />
          ) : (
            <p className="text-charcoal-600 font-light">
              For details about this page, please write to <a className="text-gold-dark underline" href={`mailto:${s.email}`}>{s.email}</a>.
            </p>
          )}
          <p className="mt-10 text-sm">
            <Link href="/" className="text-gold-dark hover:text-charcoal-900">Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
