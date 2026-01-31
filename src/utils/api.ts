import type { AxiosError, AxiosResponse } from 'axios';
import type { IBookError } from '@/types/books/api.types';

const ERROR_RES: IBookError = {
  errorCode: 'UNKNOWN_ERROR',
  errorMessage: '정의되지 않은 오류입니다.',
};

export const handleApiRes = <T>(res: AxiosResponse<T>): T => {
  const { data: responseData } = res;
  console.log('response data:', responseData);

  return responseData;
};

export const handleApiErrorRes = (err: unknown): IBookError => {
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
