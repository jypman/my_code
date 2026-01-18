'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useGetBookListQuery } from '@/hooks/useBooksQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IBookListReqParams, IComic, IWebNovel, IWebtoon, IBookType } from '@/types/books/api.types';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';
import { useToastStore } from '@/hooks/store/useUIStore';

import PageLayout from '@/components/ui/common/PageLayout';
import Txt from '@/components/ui/common/Txt';
import ScrollToTopButton from '@/components/ui/common/ScrollToTopButton';

const defaultPayload: IBookListReqParams = {
  page: 1,
  limit: 20,
};

function Books(): React.ReactElement {
  const { showToast } = useToastStore();
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetBookListQuery(defaultPayload);

  const { targetRef, inView } = useIntersectionObserver({
    threshold: 0.5,
    enabled: hasNextPage,
  });

  const books: Array<IComic | IWebNovel | IWebtoon> = data?.pages.flatMap((page) => page) || [];

  const showExpiredMessage = (): void => {
    showToast('판권이 만료되었어요!');
  };

  const handleNextPage = (id: string, isExpired: boolean): void => {
    if (isExpired) {
      showExpiredMessage();
      return;
    }

    router.push(`/${id}`);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <PageLayout>
      <Txt typography="h4" color={black}>
        책 목록
      </Txt>
      <Grid>
        {books.map((book) => {
          const { id, img, title, type, isExpired, price } = book;
          const isDays = 'days' in book;
          return (
            <BookCard key={id} onClick={() => handleNextPage(id, isExpired)}>
              <ImageWrapper>
                <BookImage src={img} alt={title} loading="lazy" />
                {isDays && <DayBadge>{book.days}요일 연재</DayBadge>}
              </ImageWrapper>
              <BookInfo>
                <BookTypeBadge $type={type}>{getTypeLabel(type)}</BookTypeBadge>
                <BookTitle>{title}</BookTitle>
                <BookPrice>{price.toLocaleString()}원</BookPrice>
                {isExpired && <ExpiredBadge>만료됨</ExpiredBadge>}
              </BookInfo>
            </BookCard>
          );
        })}
      </Grid>

      <Observer ref={targetRef}>{isFetchingNextPage && <StatusMessage>Loading more...</StatusMessage>}</Observer>
      <ScrollToTopButton />
    </PageLayout>
  );
}

const { black, white, green500, blue500, orange500 } = colors;
const { unit4, unit8, unit12, fontWeightBold, fontWeightSemiBold } = typhography;

const getTypeLabel = (type: IBookType): string => {
  switch (type) {
    case 'webToon':
      return '웹툰';
    case 'webNovel':
      return '웹소설';
    case 'comic':
      return '만화';
    default:
      return type;
  }
};

const getTypeColor = (type: IBookType): string => {
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: ${white};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DayBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${white};
  padding: ${unit4} ${unit8};
  border-radius: 4px;
  font-size: 12px;
  font-weight: ${fontWeightBold};
`;

const BookInfo = styled.div`
  padding: ${unit12};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BookTypeBadge = styled.span<{ $type: IBookType }>`
  font-size: 11px;
  font-weight: ${fontWeightBold};
  color: ${({ $type }: { $type: IBookType }): string => getTypeColor($type)};
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: ${fontWeightSemiBold};
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.grey900};
`;

const BookPrice = styled.span`
  font-size: 14px;
  color: ${colors.grey700};
`;

const ExpiredBadge = styled.span`
  display: inline-block;
  margin-top: ${unit4};
  padding: 2px 6px;
  background-color: ${colors.grey200};
  color: ${colors.grey600};
  font-size: 11px;
  border-radius: 4px;
  width: fit-content;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: ${colors.grey600};
  font-size: 14px;
`;

const Observer = styled.div`
  height: 20px;
  margin: 20px 0;
`;

export default Books;
