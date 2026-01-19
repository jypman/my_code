'use client';

import { useEffect, useState } from 'react';

function MSWRegistry({ children }: { children: React.ReactNode }): React.ReactNode {
  const [isMswReady, setIsMswReady] = useState<boolean>(false);

  const init = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      const { worker } = await import('../mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
    }
    setIsMswReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isMswReady) return null;

  return children;
}

export default MSWRegistry;
