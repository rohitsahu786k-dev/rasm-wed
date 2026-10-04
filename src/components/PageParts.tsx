import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { PageImage } from '@/data/page-media';
import { InquiryAnimatedButton } from '@/components/InquiryClient';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-charcoal-500 mb-5">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {it.href ? <Link href={it.href} className="hover:text-charcoal-900">{it.name}</Link> : <span aria-current="page" className="text-charcoal-700">{it.name}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Page header: breadcrumb trail, one H1 that carries the page's main keyword, a short promise and two calls to action,
 * over a photograph that fades into ivory on the text side (same look as the homepage hero).
 */
export function PageHero({
  crumbs, eyebrow, title, accent, lead, image, primary, secondary, schemaPath,
}: {
  crumbs: { name: string; href?: string }[];
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  image?: PageImage;
  primary?: { label: string; context: string };
  secondary?: { label: string; href: string };
  schemaPath?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#FDFCFA] border-b border-gold/20 pt-28 sm:pt-32 pb-12 sm:pb-16">
      {schemaPath && (
        <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs.filter((c) => c.href).map((c) => ({ name: c.name, path: c.href as string })), { name: crumbs[crumbs.length - 1].name, path: schemaPath }])} />
      )}
      {image && (
        <>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover md:object-[75%_50%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#FDFCFA]/90 md:hidden" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(253,252,250,0.98) 0%, rgba(253,252,250,0.92) 38%, rgba(253,252,250,0.45) 62%, rgba(253,252,250,0) 82%)' }} />
        </>
      )}
      <div className="rasm-container">
        <div className="max-w-2xl">
          <Breadcrumbs items={crumbs} />
          <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">{eyebrow}</p>
          <h1 className="font-manrope font-medium text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-[1.15] mb-5">
            {title}
            {accent && <> <span className="gold-gradient-text italic">{accent}</span></>}
          </h1>
          <p className="text-charcoal-700 text-base sm:text-lg font-light leading-relaxed mb-8">{lead}</p>
          {(primary || secondary) && (
            <div className="flex flex-wrap gap-3">
              {primary && (
                <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={primary.context} icon={<ArrowRight className="w-4 h-4" />}>
                  {primary.label}
                </InquiryAnimatedButton>
              )}
              {secondary && (
                <Link href={secondary.href} className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gold/60 bg-white/70 text-sm font-medium text-charcoal-900 hover:bg-white transition-colors">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, accent, lead, center = false, as: H = 'h2' }: { eyebrow?: string; title: string; accent?: string; lead?: string; center?: boolean; as?: 'h2' | 'h3' }) {
  return (
    <div className={`mb-8 sm:mb-10 ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      {eyebrow && <p className="text-gold-dark text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-3">{eyebrow}</p>}
      <H className="font-manrope font-medium text-2xl sm:text-4xl text-charcoal-900 tracking-tight leading-[1.2]">
        {title}
        {accent && <> <span className="gold-gradient-text italic">{accent}</span></>}
      </H>
      {lead && <p className="mt-3 text-charcoal-600 font-light leading-relaxed text-base">{lead}</p>}
    </div>
  );
}

export function Band({ children, tone = 'white', id }: { children: React.ReactNode; tone?: 'white' | 'ivory' | 'sand'; id?: string }) {
  const bg = tone === 'white' ? 'bg-white' : tone === 'ivory' ? 'bg-[#FDFCFA]' : 'bg-ivory-200';
  return (
    <section id={id} className={`${bg} border-b border-gold/15 py-14 sm:py-20`}>
      <div className="rasm-container max-w-6xl">{children}</div>
    </section>
  );
}

/** Numbered process: plain numerals instead of icons. */
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-gold/20 bg-white p-6">
          <span className="font-manrope text-3xl font-medium gold-gradient-text">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-manrope font-medium text-lg text-charcoal-900 tracking-tight">{s.title}</h3>
          <p className="mt-2 text-sm text-charcoal-600 font-light leading-relaxed">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Facts({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((f) => (
        <div key={f.label} className="rounded-2xl border border-gold/25 bg-white p-6 text-center">
          <dt className="font-manrope text-3xl sm:text-4xl font-medium gold-gradient-text">{f.value}</dt>
          <dd className="mt-1 text-sm text-charcoal-600 font-light">{f.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PhotoGrid({ items, cols = 3 }: { items: readonly (PageImage & { label: string })[]; cols?: 3 | 4 }) {
  return (
    <ul className={`grid grid-cols-2 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3 sm:gap-4`}>
      {items.map((p) => (
        <li key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100 group">
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-3 bottom-3 rounded-full bg-white/90 px-3 py-1 text-[11px] sm:text-xs text-charcoal-800 shadow-sm">{p.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function Cards({ items }: { items: { title: string; text: string; href?: string }[] }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {items.map((c) => {
        const inner = (
          <>
            <h3 className="font-manrope font-medium text-lg text-charcoal-900 tracking-tight">{c.title}</h3>
            <p className="mt-2 text-sm text-charcoal-600 font-light leading-relaxed">{c.text}</p>
            {c.href && <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-gold-dark">Learn more <ArrowRight className="w-3.5 h-3.5" /></span>}
          </>
        );
        return (
          <li key={c.title} className="rounded-2xl border border-gold/20 bg-white shadow-[0_8px_30px_rgba(197,160,89,0.08)]">
            {c.href ? <Link href={c.href} className="block h-full p-6 hover:bg-ivory-100 rounded-2xl transition-colors">{inner}</Link> : <div className="p-6">{inner}</div>}
          </li>
        );
      })}
    </ul>
  );
}

/** Native <details> FAQ (works without JavaScript) plus FAQPage structured data. */
export function Faq({ title = 'Frequently Asked Questions', accent, faqs, tone = 'ivory' }: { title?: string; accent?: string; faqs: { q: string; a: string }[]; tone?: 'white' | 'ivory' | 'sand' }) {
  return (
    <section aria-labelledby="faq-h" className={`${tone === 'ivory' ? 'bg-[#FDFCFA]' : tone === 'sand' ? 'bg-ivory-200' : 'bg-white'} border-b border-gold/15 py-14 sm:py-20`}>
      <JsonLd data={faqSchema(faqs)} />
      <div className="rasm-container">
        <div>
        <div id="faq-h">
          <SectionTitle title={title} accent={accent} center />
        </div>
        <div className="grid lg:grid-cols-2 gap-3 items-start">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-2xl border border-gold/25 bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-ivory-100 transition-colors">
                <h3 className="font-manrope font-medium text-base sm:text-lg text-charcoal-900 tracking-tight">{f.q}</h3>
                <ChevronDown className="w-5 h-5 text-gold-dark shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 pt-1 text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

/** Closing enquiry band shown at the bottom of every page. */
export function CtaBand({ title, text, context, label = 'Get a Free Consultation' }: { title: string; text: string; context: string; label?: string }) {
  return (
    <section className="bg-charcoal-900 text-white py-14 sm:py-20">
      <div className="rasm-container max-w-3xl text-center">
        <h2 className="font-manrope font-medium text-2xl sm:text-4xl tracking-tight leading-[1.2] mb-4">{title}</h2>
        <p className="text-white/75 font-light leading-relaxed mb-8">{text}</p>
        <InquiryAnimatedButton variant="gold-shimmer" size="lg" context={context} icon={<ArrowRight className="w-4 h-4" />}>
          {label}
        </InquiryAnimatedButton>
      </div>
    </section>
  );
}

function linkify(text: string, links?: { text: string; href: string }[]): React.ReactNode {
  if (!links?.length) return text;
  const out: React.ReactNode[] = [];
  let rest = text;
  links.forEach((l, i) => {
    const at = rest.indexOf(l.text);
    if (at < 0) return;
    if (at > 0) out.push(rest.slice(0, at));
    out.push(
      <Link key={i} href={l.href} className="text-gold-dark underline decoration-gold/40 underline-offset-4 hover:text-charcoal-900">
        {l.text}
      </Link>,
    );
    rest = rest.slice(at + l.text.length);
  });
  out.push(rest);
  return <>{out}</>;
}

export interface ProseBlock {
  h: string;
  p: string[];
  links?: { text: string; href: string }[];
}

/** Long-form copy: real headings and paragraphs for readers and search engines. */
export function Prose({ blocks }: { blocks: ProseBlock[] }) {
  return (
    <div className="lg:columns-2 lg:gap-14 space-y-8 lg:space-y-0">
      {blocks.map((b) => (
        <div key={b.h} className="break-inside-avoid lg:mb-10">
          <h2 className="font-manrope font-medium text-xl sm:text-2xl text-charcoal-900 tracking-tight mb-3">{b.h}</h2>
          <div className="space-y-3 text-charcoal-600 font-light leading-relaxed text-[15px] sm:text-base">
            {b.p.map((t, i) => <p key={i}>{linkify(t, b.links)}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Internal-link block: where to go next. Helps visitors and spreads ranking signals across the site. */
export function ExploreLinks({ title = 'Explore More', links }: { title?: string; links: { label: string; href: string }[] }) {
  return (
    <section className="bg-white border-b border-gold/15 py-12">
      <div className="rasm-container max-w-5xl text-center">
        <h2 className="font-manrope font-medium text-xl sm:text-2xl text-charcoal-900 tracking-tight mb-5">{title}</h2>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block px-4 py-2 rounded-full border border-gold/30 bg-[#FDFCFA] text-sm text-charcoal-700 hover:border-gold hover:text-charcoal-950 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Article/city-page layout: body on the left, a sticky enquiry card on the right (desktop), stacked on mobile. */
export function WithSidebar({ children, context }: { children: React.ReactNode; context: string }) {
  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-10 xl:gap-14 items-start">
      <div className="min-w-0">{children}</div>
      <aside className="lg:sticky lg:top-28 rounded-3xl border border-gold/25 bg-[#FDFCFA] p-6 sm:p-8 shadow-[0_8px_30px_rgba(197,160,89,0.10)]">
        <h2 className="font-manrope font-medium text-xl text-charcoal-900 tracking-tight mb-2">Plan your wedding with Rasm</h2>
        <p className="text-sm text-charcoal-600 font-light leading-relaxed mb-5">Share your dates, guest count and destination. Our Udaipur team replies with venue options and a written estimate.</p>
        <InquiryAnimatedButton variant="gold-shimmer" size="md" context={context} icon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center">
          Free Consultation
        </InquiryAnimatedButton>
        <ul className="mt-5 space-y-2 text-sm text-charcoal-700">
          <li><a className="hover:text-gold-dark" href={`tel:${SITE.phone.replace(/[^d+]/g, '')}`}>Call {SITE.phone}</a></li>
          <li><a className="hover:text-gold-dark" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
          <li><Link className="hover:text-gold-dark" href="/services/">Wedding planning services</Link></li>
          <li><Link className="hover:text-gold-dark" href="/wedding-destination/">All wedding destinations</Link></li>
        </ul>
        <p className="mt-5 pt-5 border-t border-gold/20 text-xs text-charcoal-500">Packages start from Rs 30,00,000 (30 Lacs).</p>
      </aside>
    </div>
  );
}
