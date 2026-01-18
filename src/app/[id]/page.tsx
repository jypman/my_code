import BookDetail from '@/components/pages/BookDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps): Promise<React.ReactElement> {
  const { id } = await params;

  return <BookDetail id={id} />;
}
