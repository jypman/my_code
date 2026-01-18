import {
  keepPreviousData,
  useQuery,
  useInfiniteQuery,
  type UseQueryResult,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from '@tanstack/react-query';
import type { IBookListReqParams, IBookError, IComic, IWebNovel, IWebtoon } from '@/types/books/api.types';
import { getBookDetail, getBookList, handleResInQueryFn } from '@/actions/books';

export const booksQueryKey = {
  list: 'bookList',
  detail: 'bookDetail',
};

export const useGetBookListQuery = (
  payload: IBookListReqParams,
): UseInfiniteQueryResult<InfiniteData<Array<IComic | IWebNovel | IWebtoon>>, IBookError> => {
  const { filter, limit } = payload;
  return useInfiniteQuery({
    queryKey: [booksQueryKey.list, filter],
    queryFn: async ({ pageParam }) => {
      const param: IBookListReqParams = {
        ...payload,
        page: pageParam,
        limit,
      };
      const res = await getBookList(param);
      return handleResInQueryFn(res);
    },
    getNextPageParam: (lastPage, allPages) => {
      const resData = lastPage as Array<IComic | IWebNovel | IWebtoon>;
      const isEmpty: boolean = !resData || resData.length === 0 || resData.length < limit;
      if (isEmpty) return undefined;

      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
  });
};

export const useGetBookDetailQuery = (id: string): UseQueryResult<IComic | IWebNovel | IWebtoon, IBookError> => {
  return useQuery({
    queryKey: [booksQueryKey.detail, id],
    queryFn: async () => {
      const res = await getBookDetail(id);
      return handleResInQueryFn(res);
    },
  });
};
