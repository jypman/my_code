import { http, HttpResponse } from 'msw';
import type { DayType, IBookDetail, IBook, IComic, IWebtoon, IWebNovel } from '@/types/books/api.types';

const generateBooks = (): Array<IComic | IWebtoon | IWebNovel> => {
  const days: DayType[] = ['월', '화', '수', '목', '금', '토', '일'];
  const totalBooks = 100;

  const books = Array.from({ length: totalBooks }, (_, i) => {
    const startIndex = i + 1;
    const book: IBook = {
      id: startIndex.toString(),
      title: `테스트 도서 ${startIndex}`,
      img: `https://picsum.photos/200/300?random=${startIndex}`,
      isExpired: startIndex % 5 === 0,
      price: startIndex * 1_000,
    };

    const isWebToon = startIndex % 4 === 0;
    const isWebNovel = startIndex % 9 === 0;

    if (isWebToon) {
      const webToon: IWebtoon = {
        ...book,
        type: 'webToon',
        days: days[startIndex % days.length],
      };
      return webToon;
    }

    if (isWebNovel) {
      const webNovel: IWebNovel = {
        ...book,
        type: 'webNovel',
        days: days[startIndex % days.length],
      };
      return webNovel;
    }

    const comic: IComic = {
      ...book,
      type: 'comic',
    };

    return comic;
  });

  return books;
};

const allBooks = generateBooks();

export const handlers = [
  http.get('/books', ({ request }) => {
    const startPage = 1;
    const defaultLimit = 20;
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter');
    const page = Number(url.searchParams.get('page') || `${startPage}`);
    const offset = Number(url.searchParams.get('limit') || `${defaultLimit}`);

    let filteredBooks = allBooks;

    if (filter) {
      filteredBooks = filteredBooks.filter((book) => book.type === filter);
    }

    const start = (page - 1) * offset;
    const end = start + offset;
    const paginatedBooks = filteredBooks.slice(start, end);

    return HttpResponse.json(paginatedBooks);
  }),

  http.get('/books/:id', ({ params }) => {
    const { id } = params;
    const book = allBooks.find((b) => b.id === id);

    if (!book) {
      const errorObj = {
        errorCode: 'BOOK_NOT_FOUND',
        message: '해당하는 도서를 찾을 수 없습니다.',
      };
      return new HttpResponse(errorObj, { status: 404 });
    }

    const detail: IBookDetail = {
      ...book,
      desc: '테스트 도서 상세 설명입니다.',
    };

    return HttpResponse.json(detail);
  }),
];
