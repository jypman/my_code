'use client';

import styled, { css, type RuleSet } from 'styled-components';
import { useModalStore } from '@/hooks/store/useUIStore';
import type { IVisibleUI } from '@/types/common/index.types';
import zIndex from '@/constants/zIndex';
import typhography from '@/constants/typhography';
import colors from '@/constants/colors';
import Button from '@/components/ui/common/Button';

function Modal(): React.ReactElement {
  const { isShow, title, desc, content, hideModal, onClickConfirm } = useModalStore();

  const onConfirm = (): void => {
    onClickConfirm?.();
    hideModal();
  };

  return (
    <ModalContainer isShow={isShow}>
      <ModalWrap>
        <TitleWrapper>
          {title && <Title>{title}</Title>}
          {desc && <Desc>{desc}</Desc>}
        </TitleWrapper>
        {content ? (
          content
        ) : (
          <ButtonContainer>
            <Button variant="primary" size="full" onClick={onConfirm}>
              확인
            </Button>
          </ButtonContainer>
        )}
      </ModalWrap>
      <Dim />
    </ModalContainer>
  );
}

const { priority, modal } = zIndex;
const { unit8, unit20, unit24, unit28, fontWeightSemiBold, fontWeightRegular } = typhography;
const { grey50, black, dimmedBackground } = colors;

const ModalContainer = styled.div.withConfig({ shouldForwardProp: (prop) => prop !== 'isShow' })<IVisibleUI>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${modal};

  ${({ isShow = false }: IVisibleUI): RuleSet<IVisibleUI> | false =>
    isShow &&
    css`
      display: block;
    `}
`;

const ModalWrap = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0 ${unit28};
  display: flex;
  flex-direction: column;
  gap: ${unit20};
  padding: ${unit24};
  background-color: ${grey50};
  border-radius: 16px;
  z-index: ${priority};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${unit8};
`;

const Title = styled.strong`
  display: block;
  text-align: center;
  word-break: keep-all;
  white-space: pre-line;
  font-size: 19px;
  font-weight: ${fontWeightSemiBold};
  color: ${black};
  line-height: 1.45;
`;

const Desc = styled.p`
  line-height: 1.45;
  font-size: 17px;
  font-weight: ${fontWeightRegular};
  color: ${black};
  word-break: keep-all;
  text-align: center;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${unit8};
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${dimmedBackground};
`;

export default Modal;
