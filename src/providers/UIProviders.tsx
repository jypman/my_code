'use client';

import { useEffect, useRef } from 'react';
import { useModalStore, useBottomSheetStore } from '@/hooks/store/useUIStore';

import Modal from '@/components/ui/common/Modal';
import Toast from '@/components/ui/common/Toast';
import BottomSheet from '@/components/ui/common/BottomSheet';

interface ICommonProviderProps {
  children: React.ReactNode;
}

const MODAL_HASH = 'openModal';
const BOTTOM_SHEET_HASH = 'openBottomSheet';
const VISIBLE_ANIMATION_TIME_MS = 300;

function UIProvider({ children }: ICommonProviderProps): React.ReactElement {
  const { isShow: isShowModal } = useModalStore();
  const { isShow: isShowBottomSheet, hideBottomSheet } = useBottomSheetStore();
  const duplicatedHistoryCountRef = useRef<number>(0);

  const clearHistoryHash = (hash: string): void => {
    if (window.location.hash.includes(hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      duplicatedHistoryCountRef.current = duplicatedHistoryCountRef.current + 1;
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

  useEffect(toggleModal, [isShowModal]);

  useEffect(toggleBottomSheet, [isShowBottomSheet]);

  useEffect(() => {
    const handlePopState = (): void => {
      if (isShowModal) {
        window.history.forward();
        return;
      }

      if (isShowBottomSheet) {
        hideBottomSheet();
        return;
      }

      if (duplicatedHistoryCountRef.current > 0) {
        window.history.go(-1 * duplicatedHistoryCountRef.current);
        duplicatedHistoryCountRef.current = 0;
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
