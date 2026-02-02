import type { QueryFunction } from '@tanstack/react-query';
export interface IPrefetchQueryItem {
  queryKey: string[];
  queryFn: QueryFunction;
}

export interface IPrefetchInfiniteQueryItem {
  queryKey: string[];
  queryFn: (context: { pageParam: number }) => Promise<unknown>;
  initialPageParam: number;
}

export interface IVisibleUI {
  isShow: boolean;
}

export interface IModalContent {
  title?: React.ReactNode;
  desc?: React.ReactNode;
  content?: React.ReactNode;
  onClickConfirm?: (() => void) | null;
}

export interface IBottomSheetContent {
  content: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export interface IToastContent {
  message: React.ReactNode;
  visibleTime?: number;
}
export interface IModalStore extends IModalContent, IVisibleUI {
  showModal: (params: IModalContent) => void;
  hideModal: () => void;
}

export interface IToastStore extends IToastContent, IVisibleUI {
  showToast: (message: React.ReactNode, visibleTime?: number) => void;
  hideToast: () => void;
}

export interface IBottomSheetStore extends IBottomSheetContent, IVisibleUI {
  showBottomSheet: (content: IBottomSheetContent) => void;
  hideBottomSheet: () => void;
}

export interface IUseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

export interface IUseIntersectionObserverResult {
  targetRef: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
}

export interface IInputValidation {
  value: string;
  isError: boolean;
}
