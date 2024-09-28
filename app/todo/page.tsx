'use client';

import { PropsWithChildren } from 'react';

import { DEFAULT_MAX, DEFAULT_MIN } from './db/utils';
import { InMemoryTodo } from './in-memory-todo';
import { OptimisticPersistedTodo } from './optimistic-persisted-todo';
import { PersistedTodo } from './persisted-todo';

function Controls({ children }: PropsWithChildren) {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h2>Controls:</h2>
        <div className='space-x-4'>
          <label>
            Min Delay:{' '}
            <input
              type='text'
              defaultValue={window?.min ?? DEFAULT_MIN}
              className='flex-1 px-2 py-1 border rounded'
              onChange={(e) => {
                window.min = Number(e.target.value);
              }}
            />
          </label>
          <label>
            Max Delay:{' '}
            <input
              type='text'
              defaultValue={window?.max ?? DEFAULT_MAX}
              className='flex-1 px-2 py-1 border rounded'
              onChange={(e) => {
                window.max = Number(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function TodoPage() {
  return (
    <main className='w-full h-screen grid place-items-center p-4'>
      <h1 className='font-bold text-2xl'>Billion Dollar Todo App</h1>
      <InMemoryTodo />
      <Controls>
        <PersistedTodo />
      </Controls>
      <Controls>
        <OptimisticPersistedTodo />
      </Controls>
    </main>
  );
}
