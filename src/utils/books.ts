import type { IBookType } from '@/types/books/api.types';
import colors from '@/constants/colors';

const { green500, blue500, orange500 } = colors;

export const getTypeLabel = (type: IBookType): string => {
  switch (type) {
    case 'webToon':
      return '웹툰';
    case 'webNovel':
      return '웹소설';
    case 'comic':
      return '만화';
    default:
      return '';
  }
};

export const getTypeColor = (type: IBookType): string => {
  switch (type) {
    case 'webToon':
      return green500;
    case 'webNovel':
      return blue500;
    case 'comic':
      return orange500;
    default:
      return '';
  }
};
