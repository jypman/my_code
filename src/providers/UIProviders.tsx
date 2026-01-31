'use client';

import { useEffect, useRef } from 'react';
import { useModalStore, useBottomSheetStore } from '@/hooks/store/useUIStore';
import type { PageDirectionType } from '@/types/common/index.types';
import BottomSheet from '@/components/ui/common/BottomSheet';
import Modal from '@/components/ui/common/Modal';
import Toast from '@/components/ui/common/Toast';

interface ICommonProviderProps {
  children: React.ReactNode;
}

const MODAL_HASH = 'openModal';
const BOTTOM_SHEET_HASH = 'openBottomSheet';
const VISIBLE_ANIMATION_TIME_MS = 300;

function UIProvider({ children }: ICommonProviderProps): React.ReactElement {
  const { isShow: isShowModal } = useModalStore();
  const { isShow: isShowBottomSheet, hideBottomSheet, showBottomSheet } = useBottomSheetStore();

  const currentIndexRef = useRef<number>(0);
  const directionRef = useRef<PageDirectionType>('initial');

  const clearHistoryHash = (hash: string): void => {
    if (window.location.hash.includes(hash)) {
      window.history.back();
    }
  };

  const toggleModal = (): void => {
    if (isShowModal) {
      window.location.hash = MODAL_HASH;
    } else {
      clearHistoryHash(MODAL_HASH);
    }
  };

  const toggleBottomSheet = (): void => {
    if (isShowBottomSheet) {
      window.location.hash = BOTTOM_SHEET_HASH;
    } else {
      clearHistoryHash(BOTTOM_SHEET_HASH);
      setTimeout(() => {
        const modalContent =
          document.querySelector('.modal .infinite_scroll_container') ||
          document.querySelector('.modal .modal_contents');
        if (modalContent) modalContent.scrollTo(0, 0);
      }, VISIBLE_ANIMATION_TIME_MS);
    }
  };

  const initCurrentIndex = (): void => {
    if (!window.history.state?.index) {
      const state = { index: 0 };
      window.history.replaceState(state, '');
      currentIndexRef.current = 0;
    } else {
      currentIndexRef.current = window.history.state.index;
    }
  };

  const updateCurrentIndex = (event: PopStateEvent): void => {
    const newIndex = event.state?.index ?? 0;
    const currentIndex = currentIndexRef.current;

    if (newIndex > currentIndex) {
      directionRef.current = 'forward';
    } else if (newIndex < currentIndex) {
      directionRef.current = 'back';
    }

    currentIndexRef.current = newIndex;
  };

  useEffect(toggleModal, [isShowModal]);

  useEffect(toggleBottomSheet, [isShowBottomSheet]);

  useEffect(initCurrentIndex, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent): void => {
      updateCurrentIndex(event);

      if (isShowModal) {
        window.history.forward();
        return;
      }

      if (isShowBottomSheet) {
        hideBottomSheet();
        return;
      }

      if (window.location.hash.includes(MODAL_HASH)) {
        if (directionRef.current === 'forward') {
          history.go(1);
        } else {
          history.go(-1);
        }
        return;
      }

      if (window.location.hash.includes(BOTTOM_SHEET_HASH)) {
        showBottomSheet();
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);

    return (): void => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isShowModal, isShowBottomSheet]);

  return (
    <>
      {children}
      <Modal />
      <Toast />
      <BottomSheet />
    </>
  );
}

export default UIProvider;
