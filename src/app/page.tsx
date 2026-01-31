import Books from '@/components/pages/Books';
import PrefetchInfiniteHydration from '@/components/ui/server/PrefetchInfiniteHydration';
import type { IBookListReqParams, IBookError, IComic, IWebNovel, IWebtoon } from '@/types/books/api.types';
import { booksQueryKey } from '@/hooks/useBooksQuery';
import { getBookList } from '@/actions/books';
import type { IPrefetchInfiniteQueryItem } from '@/types/common/index.types';

export default async function BooksPage(): Promise<React.ReactElement> {
  const payload: IBookListReqParams = {
    page: 1,
    limit: 20,
    filter: '',
  };

  const queryItem: IPrefetchInfiniteQueryItem = {
    queryKey: [booksQueryKey.list, payload.filter || ''],
    queryFn: (): Promise<Array<IComic | IWebtoon | IWebNovel> | IBookError> => getBookList(payload),
    initialPageParam: 1,
  };

  return (
    <PrefetchInfiniteHydration queryItem={queryItem}>
      <Books />
    </PrefetchInfiniteHydration>
  );
}
