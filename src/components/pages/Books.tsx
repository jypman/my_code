'use client';

import { useGetBookListQuery } from '@/hooks/useBooksQuery';
import { type IBookListReqParams } from '@/types/books/api.types';

function Books(): React.ReactElement {
  const payload: IBookListReqParams = {
    page: 1,
    limit: 20,
  };

  const { data, isLoading, isError } = useGetBookListQuery(payload);

  return <div></div>;
}

export default Books;
