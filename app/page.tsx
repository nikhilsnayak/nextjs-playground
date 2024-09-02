import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='w-full h-screen grid place-items-center p-4'>
      <div>
        <h1 className='text-2xl font-bold text-center mb-4'>
          Nextjs Playground
        </h1>
        <section className='max-w-xl w-full flex gap-4 justify-center items-center'>
          <Button asChild>
            <Link href='/lazy-search'>Lazy Search</Link>
          </Button>
          <Button asChild>
            <Link href='/rsc-chat'>RSC Chat</Link>
          </Button>
          <Button asChild>
            <Link href='/use-previous'>usePrevious</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
