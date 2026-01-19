'use client';

import { QueryClient, type QueryClient as QueryClientType, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type BrowserQueryClientType = QueryClient | undefined;

function makeQueryClient(): QueryClientType {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        throwOnError: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: BrowserQueryClientType = undefined;

function getQueryClient(): BrowserQueryClientType {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function ReactQueryRegistry({ children }: { children: React.ReactNode }): React.ReactElement {
  const [queryClient] = useState<BrowserQueryClientType>(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient as QueryClientType}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
}

export default ReactQueryRegistry;
