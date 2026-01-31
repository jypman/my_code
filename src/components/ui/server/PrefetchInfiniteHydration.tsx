'use server';

import { prefetchInfiniteQuery } from '@/lib/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { IPrefetchInfiniteQueryItem } from '@/types/common/index.types';

interface PrefetchInfiniteHydrationProps {
  children: React.ReactNode;
  queryItem: IPrefetchInfiniteQueryItem;
}

async function PrefetchInfiniteHydration({
  children,
  queryItem,
}: PrefetchInfiniteHydrationProps): Promise<React.ReactElement> {
  const { queryKey, queryFn, initialPageParam } = queryItem;
  const dehydratedState = await prefetchInfiniteQuery(queryKey, queryFn, initialPageParam);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}

export default PrefetchInfiniteHydration;
