import { create } from 'zustand';
import type {
  IModalStore,
  IToastStore,
  IBottomSheetStore,
  IModalContent,
  IBottomSheetContent,
  ITopModalContent,
} from '@/types/common/index.types';

// 각각 독립적인 store
export const useModalStore = create<IModalStore>((set) => ({
  isShow: false,
  title: null,
  desc: null,
  content: null,
  onClickConfirm: null,
  showModal: ({ title, desc, content, onClickConfirm = null }: IModalContent): void => {
    set({ isShow: true, title, desc, content, onClickConfirm });
  },
  hideModal: (): void => set({ isShow: false, title: null, desc: null, content: null, onClickConfirm: null }),
}));

export const useToastStore = create<IToastStore>((set) => ({
  isShow: false,
  message: null,
  showToast: (message: React.ReactNode, visibleTime?: number): void => {
    set({ isShow: true, message, visibleTime });
  },
  hideToast: (): void => set({ isShow: false }),
}));

export const useBottomSheetStore = create<IBottomSheetStore>((set) => ({
  isShow: false,
  content: null,
  title: null,
  className: '',
  showBottomSheet: ({ content, title = null, className = '' }: IBottomSheetContent): void => {
    set({ isShow: true, content, title, className });
  },
  hideBottomSheet: (): void => {
    set({ isShow: false });
  },
}));
