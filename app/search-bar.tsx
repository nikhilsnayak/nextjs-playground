'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSearching, startSearching] = useTransition();
  const currentQuery = searchParams.get('query') ?? undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedQuery = new FormData(e.currentTarget)
      .get('query')
      ?.toString()
      ?.trim();
    if (currentQuery && currentQuery === updatedQuery) return;

    if (updatedQuery) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('query', updatedQuery);

      const path = `/?${newSearchParams.toString()}`;

      startSearching(() => {
        router.replace(path);
      });
    } else {
      startSearching(() => {
        router.replace('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center'>
      <input
        type='text'
        name='query'
        placeholder='Search...'
        defaultValue={currentQuery}
        className='w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {isSearching ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='animate-spin h-5 w-5 text-white'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke-width='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        ) : (
          'Search'
        )}
      </button>
    </form>
  );
}
