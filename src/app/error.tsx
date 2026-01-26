'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useModalStore } from '@/hooks/store/useUIStore';

interface ErrorProps {
  error: object;
}

export default function Error({ error }: ErrorProps): React.ReactNode {
  const { showModal } = useModalStore();
  const router = useRouter();

  const showErrorModal = (): void => {
    if (!('errorMessage' in error)) return;

    const { errorMessage } = error;
    if (typeof errorMessage !== 'string') return;

    const onClickConfirm = (): void => {
      if (window.history.length === 0) {
        router.push('/');
        return;
      }

      router.back();
    };

    showModal({
      title: errorMessage,
      onClickConfirm,
    });
  };

  useEffect(showErrorModal, [error]);

  return null;
}
