import { CASE_STUDIES, GOOGLE_REVIEWS_URL, TEAM, TESTIMONIALS } from '@/data/proof';
import { JsonLd } from '@/components/JsonLd';
import { SITE, SITE_URL } from '@/lib/site';

/**
 * Testimonials, case studies and team, rendered only when real entries exist in src/data/proof.ts.
 * Review schema is emitted only for entries that carry a source link and a date, so it always matches visible content.
 */
export function ProofSection({ show = ['testimonials', 'cases'] }: { show?: ('testimonials' | 'cases' | 'team')[] }) {
  const t = show.includes('testimonials') ? TESTIMONIALS : [];
  const c = show.includes('cases') ? CASE_STUDIES : [];
  const team = show.includes('team') ? TEAM : [];
  if (!t.length && !c.length && !team.length) return null;

  const reviewSchema = t
    .filter((x) => x.sourceUrl && x.date)
    .map((x) => ({
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: { '@id': `${SITE_URL}/#organization` },
      author: { '@type': 'Person', name: x.name },
      datePublished: x.date,
      reviewBody: x.quote,
      url: x.sourceUrl,
    }));

  return (
    <section aria-labelledby="proof-heading" className="py-14 sm:py-16 bg-white border-b border-gold/15">
      {reviewSchema.length > 0 && <JsonLd data={reviewSchema} />}
      <div className="rasm-container">
        {t.length > 0 && (
          <>
            <h2 id="proof-heading" className="font-manrope font-medium text-3xl sm:text-4xl text-charcoal-900 tracking-tight text-center mb-8">What Couples Say About {SITE.name}</h2>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.map((x) => (
                <li key={x.name + x.wedding} className="rounded-2xl border border-gold/20 bg-[#FDFCFA] p-6 flex flex-col">
                  <blockquote className="text-charcoal-700 font-light leading-relaxed flex-1">&ldquo;{x.quote}&rdquo;</blockquote>
                  <p className="mt-4 font-manrope font-medium text-charcoal-900">{x.name}</p>
                  <p className="text-xs text-charcoal-500">{x.from} | Wedding in {x.wedding}</p>
                  {x.sourceUrl && <a href={x.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 text-xs underline hover:text-gold-dark">Read the original review</a>}
                </li>
              ))}
            </ul>
            {GOOGLE_REVIEWS_URL && (
              <p className="text-center mt-6 text-sm">
                <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark">See all our Google reviews</a>
              </p>
            )}
          </>
        )}
        {c.length > 0 && (
          <div className={t.length ? 'mt-14' : ''}>
            <h2 className="font-manrope font-medium text-3xl text-charcoal-900 tracking-tight text-center mb-8">Weddings We Have Planned</h2>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.map((x) => (
                <li key={x.title} className="rounded-2xl border border-gold/20 p-6">
                  <h3 className="font-manrope font-medium text-lg text-charcoal-900">{x.title}</h3>
                  <p className="text-xs text-charcoal-500 mb-2">{x.city} | {x.venue} | {x.guests} guests</p>
                  <p className="text-sm text-charcoal-600 font-light leading-relaxed">{x.summary}</p>
                  {x.href && <a href={x.href} className="mt-3 inline-block text-sm underline hover:text-gold-dark">Read the story</a>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {team.length > 0 && (
          <div className={t.length || c.length ? 'mt-14' : ''}>
            <h2 className="font-manrope font-medium text-3xl text-charcoal-900 tracking-tight text-center mb-8">Meet the Planners</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map((m) => (
                <li key={m.name} className="rounded-2xl border border-gold/20 p-5 text-center">
                  <p className="font-manrope font-medium text-charcoal-900">{m.name}</p>
                  <p className="text-xs text-gold-dark mb-2">{m.role}</p>
                  <p className="text-sm text-charcoal-600 font-light">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
