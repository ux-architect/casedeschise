'use client'

import { GlobalInfoContext } from './global-info-context';
import type { SiteInfoType } from '@/types';

export function GlobalInfoProvider({
  value,
  children
}: {
  value: SiteInfoType;
  children: React.ReactNode;
}) {
  return (
    <GlobalInfoContext.Provider value={value}>
      {children}
    </GlobalInfoContext.Provider>
  );
}