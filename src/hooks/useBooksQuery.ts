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
      // limit보다 적게 왔으면 더 이상 데이터가 없는 것으로 판단
      const isEmpty: boolean = !resData || resData.length === 0 || resData.length < limit;
      if (isEmpty) return undefined;

      return allPages.length + 1; // 다음 페이지 번호 반환
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1, // 초기 페이지 1로 고정
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
