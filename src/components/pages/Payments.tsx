'use client';

import styled from 'styled-components';
import type { PaymentMethodType } from '@/types/books/index.types';
import { getPaymentMethod } from '@/utils/books';
import withAuth from '@/hoc/withAuth';

interface PaymentsProps {
  method: PaymentMethodType;
}

function Payments({ method }: PaymentsProps): React.ReactElement {
  return (
    <Container>
      <Message>{getPaymentMethod(method)}로 결제하기</Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /*
`;

const Message = styled.div`
  font-size: 40px;
`;

export default withAuth(Payments);
