'use client';

import { useEffect } from 'react';
import { useModalStore, useBottomSheetStore } from '@/hooks/store/useUIStore';
import BottomSheet from '@/components/ui/common/BottomSheet';
import Modal from '@/components/ui/common/Modal';
import Toast from '@/components/ui/common/Toast';

interface ICommonProviderProps {
  children: React.ReactNode;
}

const MODAL_HASH = 'openModal';
const BOTTOM_SHEET_HASH = 'openBottomSheet';

function UIProvider({ children }: ICommonProviderProps): React.ReactElement {
  const { isShow: isShowModal } = useModalStore();
  const { isShow: isShowBottomSheet, hideBottomSheet } = useBottomSheetStore();

  const addHashToUrl = (hashToAdd: string): void => {
    const currentHash = window.location.hash.slice(1);

    if (currentHash.includes(hashToAdd)) {
      return;
    }

    const newHash = currentHash ? `#${currentHash}&${hashToAdd}` : `#${hashToAdd}`;

    window.history.pushState({ hash: hashToAdd }, '', window.location.pathname + window.location.search + newHash);
  };

  const removeHashFromUrl = (hashToRemove: string): void => {
    if (window.location.hash.includes(hashToRemove)) {
      window.history.back();
    }
  };

  const toggleModal = (): void => {
    if (isShowModal) {
      addHashToUrl(MODAL_HASH);
    } else {
      removeHashFromUrl(MODAL_HASH);
    }
  };

  const toggleBottomSheet = (): void => {
    if (isShowBottomSheet) {
      addHashToUrl(BOTTOM_SHEET_HASH);
    } else {
      removeHashFromUrl(BOTTOM_SHEET_HASH);
    }
  };

  useEffect(() => {
    const handlePopState = (): void => {
      const currentHash = window.location.hash;

      if (!currentHash.includes(MODAL_HASH) && isShowModal) {
        window.history.forward();
      }

      if (!currentHash.includes(BOTTOM_SHEET_HASH) && isShowBottomSheet) {
        hideBottomSheet();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return (): void => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isShowModal, isShowBottomSheet]);

  useEffect(toggleModal, [isShowModal]);
  useEffect(toggleBottomSheet, [isShowBottomSheet]);

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
