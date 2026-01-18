'use client';

import { useEffect, useState, useMemo } from 'react';
import styled, { css, type RuleSet } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useGetBookListQuery } from '@/hooks/useBooksQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IBookListReqParams, IComic, IWebNovel, IWebtoon, IBookType } from '@/types/books/api.types';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';
import zIndex from '@/constants/zIndex';
import { useToastStore } from '@/hooks/store/useUIStore';
import { getTypeLabel, getTypeColor } from '@/utils/books';

import PageLayout from '@/components/ui/common/PageLayout';
import Txt from '@/components/ui/common/Txt';
import ScrollToTopButton from '@/components/ui/common/ScrollToTopButton';

function Books(): React.ReactElement {
  const { showToast } = useToastStore();
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState<IBookType[]>([]);

  const payload: IBookListReqParams = useMemo<IBookListReqParams>(
    () => ({
      page: 1,
      limit: 20,
      filter: selectedFilters.join('|'),
    }),
    [selectedFilters],
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetBookListQuery(payload);

  const { targetRef, inView } = useIntersectionObserver({
    threshold: 0.5,
    enabled: hasNextPage,
  });

  const books: Array<IComic | IWebNovel | IWebtoon> = data?.pages.flatMap((page) => page) || [];

  const handleFilterChange = (type: IBookType): void => {
    setSelectedFilters((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

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

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(scrollToTop, [selectedFilters]);

  return (
    <PageLayout>
      <StickyHeader>
        <Txt typography="h4" color={black}>
          작품 목록
        </Txt>
        <FilterContainer>
          <FilterButton $isActive={selectedFilters.includes('webToon')} onClick={() => handleFilterChange('webToon')}>
            웹툰
          </FilterButton>
          <FilterButton $isActive={selectedFilters.includes('webNovel')} onClick={() => handleFilterChange('webNovel')}>
            웹소설
          </FilterButton>
          <FilterButton $isActive={selectedFilters.includes('comic')} onClick={() => handleFilterChange('comic')}>
            만화
          </FilterButton>
        </FilterContainer>
      </StickyHeader>

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

      <Observer ref={targetRef}>{isFetchingNextPage && <StatusMessage>목록 불러오는 중...</StatusMessage>}</Observer>
      <ScrollToTopButton />
    </PageLayout>
  );
}

const { black, white, grey200, grey900, grey600 } = colors;
const { unit4, unit8, unit12, unit20, fontWeightBold, fontWeightSemiBold } = typhography;
const { priority } = zIndex;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: ${priority};
  background-color: ${white};
  padding: ${unit20} 0;
  border-bottom: 1px solid ${grey200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${unit20};
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${unit8};
  align-items: center;
`;

interface IActiveUI {
  $isActive: boolean;
}

const FilterButton = styled.button<IActiveUI>`
  padding: 6px 12px;
  border-radius: 20px;
  ${({ $isActive }: IActiveUI): RuleSet<IActiveUI> => css`
    border: 1px solid ${$isActive ? 'transparent' : black};
    background-color: ${$isActive ? black : white};
    color: ${$isActive ? white : grey900};
  `}
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive }: IActiveUI): string => ($isActive ? black : grey200)};
  }
`;

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
  color: ${grey900};
`;

const BookPrice = styled.span`
  font-size: 14px;
  color: ${colors.grey700};
`;

const ExpiredBadge = styled.span`
  display: inline-block;
  margin-top: ${unit4};
  padding: 2px 6px;
  background-color: ${grey200};
  color: ${grey600};
  font-size: 11px;
  border-radius: 4px;
  width: fit-content;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: ${grey600};
  font-size: 14px;
`;

const Observer = styled.div`
  height: 20px;
  margin: 20px 0;
`;

export default Books;
