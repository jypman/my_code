import PageLayout from '@/components/ui/common/PageLayout';
import Books from '@/components/pages/Books';

export default function Page(): React.ReactElement {
  return (
    <PageLayout>
      <Books />
    </PageLayout>
  );
}
