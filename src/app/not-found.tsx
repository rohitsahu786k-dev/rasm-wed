import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#FDFCFA]">
      <h1 className="font-manrope text-4xl sm:text-6xl text-charcoal-900 mb-4">Page not found</h1>
      <p className="text-charcoal-600 mb-8 max-w-md">The page you are looking for has moved or does not exist.</p>
      <Link href="/" className="px-8 py-3 rounded-full bg-charcoal-900 text-white">
        Back to Rasm Weddings
      </Link>
    </main>
  );
}
