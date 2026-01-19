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

    showModal({
      title: errorMessage,
      onClickConfirm: router.back,
    });
  };

  useEffect(showErrorModal, [error]);

  return null;
}
