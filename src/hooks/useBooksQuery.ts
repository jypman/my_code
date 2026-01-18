import {
  keepPreviousData,
  useQuery,
  useInfiniteQuery,
  type UseQueryResult,
  type UseInfiniteQueryResult,
  type InfiniteData,
} from '@tanstack/react-query';
import type { IBookListReqParams, IBookDetail, IBookError, IComic, IWebNovel, IWebtoon } from '@/types/books/api.types';
import { getBookDetail, getBookList, handleResInQueryFn } from '@/actions/books';

export const booksQueryKey = {
  list: 'bookList',
  detail: 'bookDetail',
};

export const useGetBookListQuery = (
  payload: IBookListReqParams,
): UseInfiniteQueryResult<InfiniteData<Array<IComic | IWebNovel | IWebtoon>>, IBookError> => {
  const { filter, page, limit } = payload;
  return useInfiniteQuery({
    queryKey: [booksQueryKey.list, filter],
    queryFn: ({ pageParam }) => {
      const param: IBookListReqParams = {
        ...payload,
        page: pageParam,
        limit,
      };
      return getBookList(param);
    },
    getNextPageParam: (lastPage) => {
      const resData = lastPage as Array<IComic | IWebNovel | IWebtoon>;
      const isEmpty: boolean = !resData || resData.length === 0 || resData.length < limit;
      if (isEmpty) return undefined;

      return page + 1;
    },
    placeholderData: keepPreviousData,
    initialPageParam: page,
  });
};

export const useGetBookDetailQuery = (id: string): UseQueryResult<IBookDetail, IBookError> => {
  return useQuery({
    queryKey: [booksQueryKey.detail, id],
    queryFn: async () => {
      const res = await getBookDetail(id);
      return handleResInQueryFn(res);
    },
  });
};
