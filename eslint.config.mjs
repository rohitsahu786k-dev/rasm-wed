import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ['.next/**', 'dist/**', 'vite-src/**', 'next-site/**', 'next-env.d.ts'] },
  // Apostrophes/quotes in JSX copy are valid HTML; the rule is stylistic only.
  { rules: { 'react/no-unescaped-entities': 'off' } },
];
