import type { AxiosError, AxiosResponse } from 'axios';
import { books } from '@/api/books';
import { booksHttp } from '@/lib/axios-instance/books';
import type { IComic, IWebtoon, IWebNovel, IBookError, IBookListReqParams, IBookDetail } from '@/types/books/api.types';

const ERROR_RES: IBookError = {
  errorCode: 'UNKNOWN_ERROR',
  errorMessage: '정의되지 않은 오류입니다.',
};

const handleApiRes = <T>(res: AxiosResponse<T>): T => {
  const { data: responseData } = res;
  console.log('response data:', responseData);

  return responseData;
};

const handleApiErrorRes = (err: unknown): IBookError => {
  const error = err as AxiosError<IBookError>;
  const errorData = error.response?.data || ERROR_RES;
  console.error('error data:', errorData);
  return errorData;
};

export const handleResInQueryFn = <T extends object>(res: T | IBookError): never | T => {
  if ('errorCode' in res) {
    throw res;
  }

  return res;
};

const { list, detail } = books;

export async function getBookList(
  params: IBookListReqParams,
): Promise<Array<IComic | IWebtoon | IWebNovel> | IBookError> {
  try {
    const res = await booksHttp.get(list, { params });
    return handleApiRes(res);
  } catch (err) {
    return handleApiErrorRes(err);
  }
}

export async function getBookDetail(id: string): Promise<IBookDetail | IBookError> {
  try {
    const res = await booksHttp.get(detail.replace(':id', id));
    return handleApiRes(res);
  } catch (err) {
    return handleApiErrorRes(err);
  }
}
