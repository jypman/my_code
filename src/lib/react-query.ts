import { dehydrate, QueryClient, type DehydratedState } from '@tanstack/react-query';
import type { IPrefetchQueryItem } from '@/types/common/index.types';

export async function prefetchQuery(queryList: IPrefetchQueryItem[]): Promise<DehydratedState> {
  const queryClient = new QueryClient();

  await Promise.all(
    queryList.map(async (queryItem) => {
      return queryClient.prefetchQuery(queryItem);
    }),
  );

  return dehydrate(queryClient);
}

export async function prefetchInfiniteQuery(
  queryKey: string[],
  queryFn: (context: { pageParam: number }) => Promise<unknown>,
  initialPageParam: number = 1,
): Promise<DehydratedState> {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
  });

  return dehydrate(queryClient);
}
