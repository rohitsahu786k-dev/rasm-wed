import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const clamp = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}...` : s);

/**
 * Branded 1200x630 share image per page (title + line), so shared links do not all show the same venue photo.
 * Used as the default og:image/twitter:image by buildMetadata(); posts with their own featured image keep it.
 */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const title = clamp((q.get('title') || 'Destination Wedding Planner in Udaipur').trim(), 90);
  const sub = clamp((q.get('sub') || 'Palace, fort and resort weddings across Rajasthan, Goa and Thailand').trim(), 120);

  let logo: string | undefined;
  try {
    const bytes = await readFile(path.join(process.cwd(), 'public', 'rasm-official-logo.png'));
    logo = `data:image/png;base64,${bytes.toString('base64')}`;
  } catch {
    logo = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #FFFDF8 0%, #F6EBD3 100%)',
          borderTop: '14px solid #B8923A',
          color: '#1a1a1a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" height={96} style={{ height: 96 }} />
          ) : null}
          <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#8F6A14', textTransform: 'uppercase' }}>Rasm Weddings &amp; Events</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.12, fontWeight: 700, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 30, color: '#555', maxWidth: 980 }}>{sub}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#8F6A14' }}>rasmwed.com  |  Udaipur, Rajasthan</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
