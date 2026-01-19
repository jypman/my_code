'use client';

import { useEffect, useState } from 'react';
import styled, { css, type RuleSet } from 'styled-components';
import colors from '@/constants/colors';
import zIndex from '@/constants/zIndex';
import type { IVisibleUI } from '@/types/common/index.types';

const scrollTopThreshold = 300;

function ScrollToTopButton(): React.ReactElement | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    const isVisible: boolean = window.scrollY > scrollTopThreshold;
    setIsVisible(isVisible);
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return (): void => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <ScrollButton onClick={scrollToTop} isShow={isVisible}>
      top
    </ScrollButton>
  );
}

const { white, grey900 } = colors;
const { fab } = zIndex;

const ScrollButton = styled.button.withConfig({ shouldForwardProp: (prop) => prop !== 'isShow' })<IVisibleUI>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${grey900};
  color: ${white};
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: ${fab};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isShow = false }: IVisibleUI): RuleSet<IVisibleUI> | false =>
    isShow
      ? css`
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        `}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default ScrollToTopButton;
