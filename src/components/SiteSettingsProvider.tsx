'use client';

import { createContext, useContext } from 'react';
import type { SiteSettings } from '@/types';

export type FullSettings = SiteSettings & { phone2: string; facebookUrl: string; youtubeUrl: string };

const Ctx = createContext<FullSettings | null>(null);

/** Contact details managed in WordPress (ACF), read on the server and shared with client components. */
export function SiteSettingsProvider({ value, children }: { value: FullSettings; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings(): FullSettings {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSettings must be used inside SiteSettingsProvider');
  return v;
}
