'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/hooks/store/useUserStore';

export default function withAuth<P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function WithAuth(props: P): React.ReactElement | null {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const { nickName, point } = useUserStore();

    const verifyUser = (): void => {
      const isUserInfoValid: boolean = nickName !== '' && point !== 0;
      if (isUserInfoValid) {
        setIsVerified(true);
      } else {
        router.replace('/login');
      }
    };

    useEffect(verifyUser, []);

    if (!isVerified) {
      return null;
    }

    return <Component {...props} />;
  };
}
