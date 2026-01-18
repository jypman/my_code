interface PageProps {
  searchParams: Promise<{ id: string }>;
}

export default async function Page({ searchParams }: PageProps): Promise<React.ReactElement> {
  const { id } = await searchParams;

  return <>책 id는 {id}입니다.</>;
}
