import BookDetail from '@/components/pages/BookDetail';
import PrefetchHydration from '@/components/ui/server/PrefetchHydration';
import type { IPrefetchQueryItem } from '@/types/common/index.types';
import { booksQueryKey } from '@/hooks/useBooksQuery';
import { getBookDetail } from '@/actions/books';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps): Promise<React.ReactElement> {
  const { id } = await params;

  const queryList: IPrefetchQueryItem[] = [
    {
      queryKey: [booksQueryKey.detail, id],
      queryFn: () => getBookDetail(id),
    },
  ];

  return (
    <PrefetchHydration queryList={queryList}>
      <BookDetail id={id} />
    </PrefetchHydration>
  );
}
