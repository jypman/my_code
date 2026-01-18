export type DayType = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface IBook {
  id: string;
  title: string;
  img: string;
  isExpired: boolean;
  price: number;
}

export interface IComic extends IBook {
  type: 'comic';
}

export interface IWebtoon extends IBook {
  type: 'webToon';
  days: DayType;
}

export interface IWebNovel extends IBook {
  type: 'webNovel';
  days: DayType;
}

export interface IBookDetail extends IBook {
  desc: string;
  type: IComic['type'] | IWebtoon['type'] | IWebNovel['type'];
}
