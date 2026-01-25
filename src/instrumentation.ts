export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('@/mocks/server');
    server.listen({ onUnhandledRequest: 'bypass' });
    console.log('🎭 MSW Node Server started');
  }
}
