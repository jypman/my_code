'use client';

import styled from 'styled-components';
import { useGetBookDetailQuery } from '@/hooks/useBooksQuery';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';
import devices from '@/constants/devices';
import { getTypeLabel, getTypeColor } from '@/utils/books';
import type { IBookType, DayType } from '@/types/books/api.types';
import { useBottomSheetStore } from '@/hooks/store/useUIStore';

import PageLayout from '@/components/ui/common/PageLayout';
import Button from '@/components/ui/common/Button';
import PaymentMethodList from '@/components/ui/books/PaymentMethodList';

interface BookDetailProps {
  id: string;
}

function BookDetail({ id }: BookDetailProps): React.ReactElement {
  const { showBottomSheet } = useBottomSheetStore();
  const { data: book } = useGetBookDetailQuery(id);

  const { img, title, type, price, desc } = book || {};
  const days: undefined | DayType = book && 'days' in book ? book.days : undefined;

  const showPaymentMethod = (): void => {
    showBottomSheet({
      content: <PaymentMethodList />,
      title: '결제 수단을 선택해주세요',
    });
  };

  return (
    <PageLayout>
      <Container>
        <ImageWrapper>
          <BookImage src={img} alt={title} />
          {!!days && <DayBadge>{days}요일 연재</DayBadge>}
        </ImageWrapper>

        <InfoWrapper>
          <Header>{type && <TypeBadge $type={type}>{getTypeLabel(type)}</TypeBadge>}</Header>

          <Title>{title}</Title>

          <PriceWrapper>
            <PriceLabel>가격</PriceLabel>
            <PriceValue>{price?.toLocaleString()}원</PriceValue>
          </PriceWrapper>

          <Button variant="primary" size="large" onClick={showPaymentMethod}>
            구매하기
          </Button>

          <Description>
            <DescTitle>작품 소개</DescTitle>
            <DescText>{desc}</DescText>
          </Description>
        </InfoWrapper>
      </Container>
    </PageLayout>
  );
}

const { black, white, grey600, grey900, grey200 } = colors;
const { unit4, unit8, unit16, unit24, unit32, fontWeightBold, fontWeightSemiBold } = typhography;
const { tablet } = devices;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${unit24};
  padding: ${unit16} 0;

  @media (min-width: ${tablet}) {
    flex-direction: row;
    align-items: flex-start;
    gap: ${unit32};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: ${tablet}) {
    width: 300px;
    flex-shrink: 0;
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DayBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: ${white};
  padding: ${unit4} ${unit8};
  border-radius: 4px;
  font-size: 13px;
  font-weight: ${fontWeightBold};
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${unit16};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${unit8};
`;

interface ITypeBadge {
  $type: IBookType;
}

const TypeBadge = styled.span<ITypeBadge>`
  font-size: 13px;
  font-weight: ${fontWeightBold};
  color: ${({ $type }: ITypeBadge): string => getTypeColor($type)};
  border: 1px solid ${({ $type }: ITypeBadge): string => getTypeColor($type)};
  padding: 2px 8px;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: ${fontWeightBold};
  color: ${grey900};
  line-height: 1.4;
  margin: 0;

  @media (min-width: ${tablet}) {
    font-size: 32px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${unit8};
  padding-bottom: ${unit16};
  border-bottom: 1px solid ${grey200};
`;

const PriceLabel = styled.span`
  font-size: 14px;
  color: ${grey600};
`;

const PriceValue = styled.span`
  font-size: 20px;
  font-weight: ${fontWeightBold};
  color: ${black};
`;

const Description = styled.div`
  margin-top: ${unit8};
`;

const DescTitle = styled.h3`
  font-size: 16px;
  font-weight: ${fontWeightSemiBold};
  color: ${grey900};
  margin-bottom: ${unit8};
`;

const DescText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${grey600};
  white-space: pre-wrap;
`;

export default BookDetail;
