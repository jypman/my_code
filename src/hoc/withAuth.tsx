'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth<P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function WithAuth(props: P): React.ReactElement | null {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean>(false);

    useEffect(() => {
      const userInfo = sessionStorage.getItem('userInfo');

      if (!userInfo) {
        router.replace('/login');
      } else {
        setIsVerified(true);
      }
    }, []);

    if (!isVerified) {
      return null;
    }

    return <Component {...props} />;
  };
}
