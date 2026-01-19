'use client';

import styled, { css, type RuleSet } from 'styled-components';
import { useEffect, useRef } from 'react';
import { useToastStore } from '@/hooks/store/useUIStore';
import typhography from '@/constants/typhography';
import colors from '@/constants/colors';
import type { IVisibleUI } from '@/types/common/index.types';
import zIndex from '@/constants/zIndex';

const TOAST_DURATION_MS = 3_000;

function Toast(): React.ReactElement {
  const { message, isShow, hideToast, visibleTime = TOAST_DURATION_MS } = useToastStore();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const hideCurrentToast = (): void => {
    if (!isShow) return;

    timeoutId.current = setTimeout(() => {
      hideToast();
    }, visibleTime);
  };

  const clearToastTimeout = (): (() => void) => {
    return (): void => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  };

  useEffect(hideCurrentToast, [isShow]);

  useEffect(clearToastTimeout, []);

  return (
    <ToastContainer isShow={isShow}>
      <ToastContent>{message}</ToastContent>
    </ToastContainer>
  );
}

const { unit4, unit12, unit16, unit20, unit24, fontWeightMedium } = typhography;
const { grey50, black } = colors;

const { toast } = zIndex;

const ToastContainer = styled.div.withConfig({ shouldForwardProp: (prop) => prop !== 'isShow' })<IVisibleUI>`
  visibility: hidden;
  opacity: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 ${unit12};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${unit4};
  width: calc(100% - ${unit24} * 2));
  padding: ${unit4} ${unit20};
  border-radius: 7px;
  background: ${black};
  transition: all 0.3s;
  z-index: ${toast};
  ${({ isShow = false }: IVisibleUI): RuleSet<IVisibleUI> | false =>
    isShow &&
    css`
      visibility: visible;
      opacity: 1;
      bottom: ${unit16};
    `}
`;

const ToastContent = styled.p`
  line-height: 1.45;
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  color: ${grey50};
  text-align: center;
`;

export default Toast;
