import Input from '@/components/ui/common/Input';

export default function Home(): React.ReactElement {
  return (
    <div>
      <h1>Hello World</h1>
      <Input>
        <Input.TextField isError />
      </Input>
    </div>
  );
}
