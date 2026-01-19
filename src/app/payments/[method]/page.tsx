import Payments from '@/components/pages/Payments';
import type { PaymentMethodType } from '@/types/books/index.types';

interface PageProps {
  params: Promise<{ method: PaymentMethodType }>;
}

async function Page({ params }: PageProps): Promise<React.ReactElement> {
  const { method } = await params;
  return <Payments method={method} />;
}

export default Page;
