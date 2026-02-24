import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haru & Co',
  description: `Discover curated high-end designer bags, watches, and jewelry. From Ohio to the world, experience global luxury with [Brand Name]’s exclusive collections.`,
};

export default function Home() {
  return (
    <>
      <Button>Click me</Button>
    </>
  );
}
