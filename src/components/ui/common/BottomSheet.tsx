'use client';

import styled, { css, type RuleSet } from 'styled-components';
import { useBottomSheetStore } from '@/hooks/store/useUIStore';
import zIndex from '@/constants/zIndex';
import typhography from '@/constants/typhography';
import colors from '@/constants/colors';
import type { IVisibleUIProps } from '@/types/common/index.types';

function BottomSheet(): React.ReactElement {
  const { isShow, content, title, className = '', hideBottomSheet } = useBottomSheetStore();

  const isVisible: boolean = isShow && !!content;

  return (
    <BottomSheetContainer $isShow={isVisible} className={className}>
      <BottomSheetWrap $isShow={isVisible}>
        {title && (
          <Header>
            <Title>{title}</Title>
          </Header>
        )}
        <ContentWrapper>{content}</ContentWrapper>
      </BottomSheetWrap>
      <Dim onClick={hideBottomSheet} />
    </BottomSheetContainer>
  );
}

const { bottomSheet, priority } = zIndex;
const { unit8, unit16, layoutPadding, fontWeightSemiBold } = typhography;
const { grey50, black, dimmedBackground } = colors;

const BottomSheetContainer = styled.div<IVisibleUIProps>`
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${bottomSheet};
  transition: all 0.3s;

  ${({ $isShow = false }: IVisibleUIProps): RuleSet<IVisibleUIProps> | false =>
    $isShow &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const BottomSheetWrap = styled.div<IVisibleUIProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  max-height: calc(100% - 30px);
  padding: ${unit16} 0 0;
  background-color: ${grey50};
  border-radius: 20px 20px 0 0;
  z-index: ${priority};
  transition: all 0.3s;

  ${({ $isShow = false }: IVisibleUIProps): RuleSet<IVisibleUIProps> | false =>
    $isShow &&
    css`
      bottom: 0;
    `}
`;

const Header = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 20px;
  padding: ${unit8} calc(${layoutPadding} + 40px) ${unit16} ${layoutPadding};
`;

const Title = styled.strong`
  line-height: 1.45;
  font-size: 1.9rem;
  font-weight: ${fontWeightSemiBold};
  color: ${black};
  word-break: break-all;
`;

const ContentWrapper = styled.div`
  overflow-y: scroll;
  padding: 0 ${layoutPadding} 112px;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${dimmedBackground};
`;

export default BottomSheet;
