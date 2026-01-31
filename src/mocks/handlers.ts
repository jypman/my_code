import { http, HttpResponse } from 'msw';
import booksData from '@/mocks/books.json';
import type { IComic, IWebtoon, IWebNovel } from '@/types/books/api.types';

const allBooks = booksData as Array<IComic | IWebtoon | IWebNovel>;

export const handlers = [
  http.get('http://localhost:3000/books', ({ request }) => {
    const startPage = 1;
    const defaultLimit = 20;
    const url = new URL(request.url);

    const filters = url.searchParams.get('filter');
    const page = Number(url.searchParams.get('page') || `${startPage}`);
    const offset = Number(url.searchParams.get('limit') || `${defaultLimit}`);

    let filteredBooks = allBooks;

    if (filters) {
      filteredBooks = filteredBooks.filter(({ type }) => filters.includes(type));
    }

    const start = (page - 1) * offset;
    const end = start + offset;
    const paginatedBooks = filteredBooks.slice(start, end);

    return HttpResponse.json(paginatedBooks);
  }),

  http.get('http://localhost:3000/books/:id', ({ params }) => {
    const { id } = params;
    const book = allBooks.find((b) => b.id === id);

    if (!book) {
      const errorObj = {
        errorCode: 'BOOK_NOT_FOUND',
        errorMessage: '해당하는 도서를 찾을 수 없습니다.',
      };
      return HttpResponse.json(errorObj, { status: 404 });
    }

    return HttpResponse.json(book);
  }),
];
