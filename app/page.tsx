import { Suspense } from 'react';

import movies from './movies.json';
import { SearchBar } from './search-bar';

async function getMovies(query = '') {
  const delay = Math.random() * 10_000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  const lowerCaseParam = query.toLowerCase();

  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerCaseParam) ||
      movie.director.toLowerCase().includes(lowerCaseParam) ||
      movie.genre.toLowerCase().includes(lowerCaseParam) ||
      movie.cast.some((castMember) =>
        castMember.toLowerCase().includes(lowerCaseParam)
      )
  );
}

async function MoviesList({ query }: { query: string }) {
  const movies = await getMovies(query);

  if (!movies || movies.length === 0) return 'No Movies';

  return (
    <ul className='space-y-6 mt-6'>
      {movies.map(
        ({ id, title, director, release_year, genre, rating, cast }) => (
          <li
            key={id}
            className='p-6 bg-white shadow-lg rounded-lg hover:bg-gray-100 transition-colors'
          >
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              {title}
            </h2>
            <p className='text-gray-600 mb-1'>
              <strong>Director:</strong> {director}
            </p>
            <p className='text-gray-600 mb-1'>
              <strong>Release Year:</strong> {release_year}
            </p>
            <p className='text-gray-600 mb-1'>
              <strong>Genre:</strong> {genre}
            </p>
            <p className='text-gray-600 mb-1'>
              <strong>Rating:</strong> {rating}/10
            </p>
            <p className='text-gray-600 mb-1'>
              <strong>Cast:</strong> {cast.join(', ')}
            </p>
          </li>
        )
      )}
    </ul>
  );
}

export default function Home(props: {
  searchParams: {
    query: string;
  };
}) {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
        Awesome Movie Listing Site
      </h1>
      <Suspense fallback='Loading....'>
        <div className='flex justify-center mb-8'>
          <SearchBar />
        </div>
        <MoviesList query={props.searchParams.query} />
      </Suspense>
    </main>
  );
}
