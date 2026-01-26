'use server';

import { prefetchQuery } from '@/lib/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { IPrefetchQueryItem } from '@/types/common/index.types';

interface PrefetchHydrationProps {
  children: React.ReactNode;
  queryList: IPrefetchQueryItem[];
}

async function PrefetchHydration({ children, queryList }: PrefetchHydrationProps): Promise<React.ReactElement> {
  const dehydratedState = await prefetchQuery(queryList);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}

export default PrefetchHydration;
