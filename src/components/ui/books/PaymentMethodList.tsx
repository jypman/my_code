'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import colors from '@/constants/colors';
import typhography from '@/constants/typhography';
import { useBottomSheetStore } from '@/hooks/store/useUIStore';
import type { PaymentMethodType } from '@/types/books/index.types';
import { getPaymentMethod } from '@/utils/books';

import Button from '@/components/ui/common/Button';

const { grey100, grey800, blue500 } = colors;
const { unit16, fontWeightSemiBold } = typhography;

function PaymentMethodList(): React.ReactElement {
  const router = useRouter();
  const { hideBottomSheet } = useBottomSheetStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const methods: PaymentMethodType[] = ['c', 'p', 'a'];

  const handleSelect = (method: PaymentMethodType): void => {
    setSelectedMethod(method);
  };

  const handlePayment = (): void => {
    if (!selectedMethod) return;

    hideBottomSheet();

    setTimeout(() => {
      router.push(`/payments/${selectedMethod}`);
    }, 300);
  };

  return (
    <Container>
      <List>
        {methods.map((method) => (
          <ListItem key={method} onClick={() => handleSelect(method)}>
            <MethodName $isSelected={selectedMethod === method}>{getPaymentMethod(method)}</MethodName>
            {selectedMethod === method && (
              <CheckIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17L4 12"
                  stroke={blue500}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </CheckIcon>
            )}
          </ListItem>
        ))}
      </List>
      <ButtonWrapper>
        <Button variant="primary" size="full" onClick={handlePayment} disabled={!selectedMethod}>
          결제하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${unit16} 0;
  height: 60px;
  border-bottom: 1px solid ${grey100};
  cursor: pointer;
  transition: background-color 0.2s;
  box-sizing: border-box;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${grey100};
  }
`;

interface ISelectedMethod {
  $isSelected: boolean;
}

const MethodName = styled.span<ISelectedMethod>`
  font-size: 18px;
  font-weight: ${fontWeightSemiBold};
  color: ${({ $isSelected }: ISelectedMethod): string => ($isSelected ? blue500 : grey800)};
`;

const CheckIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const ButtonWrapper = styled.div`
  padding-top: 10px;
`;

export default PaymentMethodList;
