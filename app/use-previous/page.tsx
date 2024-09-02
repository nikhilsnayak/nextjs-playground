'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

function usePrevious<T>(value: T) {
  const [prev, setPrev] = useState([null, value]);
  if (prev[1] !== value) {
    setPrev((prev) => [prev[1], value]);
  }

  return prev[0];
}

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <div className='h-screen grid place-items-center'>
      <div className='space-y-4'>
        <p>count : {count}</p>
        <p>prev : {prevCount}</p>
        <Button onClick={() => setCount((prev) => prev + 1)}>click</Button>
      </div>
    </div>
  );
}
