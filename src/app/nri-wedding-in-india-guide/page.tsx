import { pillarMetadata, PillarRoute } from '@/components/PillarRoute';

const SLUG = 'nri-wedding-in-india-guide';

export const revalidate = 86400;
export const generateMetadata = () => pillarMetadata(SLUG);

export default function Page() {
  return <PillarRoute slug={SLUG} />;
}
