'use server';

import { books } from '@/api/books';
import { booksHttp } from '@/lib/axios-instance/books';
import type { IComic, IWebtoon, IWebNovel, IBookError, IBookListReqParams } from '@/types/books/api.types';
import { handleApiRes, handleApiErrorRes } from '@/utils/api';

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

export async function getBookDetail(id: string): Promise<IComic | IWebtoon | IWebNovel | IBookError> {
  try {
    const res = await booksHttp.get(detail.replace(':id', id));
    return handleApiRes(res);
  } catch (err) {
    return handleApiErrorRes(err);
  }
}
