import { Suspense } from 'react';

import { SearchBar } from './search-bar';

const movies = [
  {
    id: 1,
    title: 'Inception',
    director: 'Christopher Nolan',
    release_year: 2010,
    genre: 'Science Fiction',
    rating: 8.8,
    duration: 148,
    cast: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Elliot Page',
      'Tom Hardy',
    ],
    language: 'English',
    synopsis:
      "A thief who enters the dreams of others to steal their secrets is given a chance to have his criminal history erased if he can implant an idea into a target's subconscious.",
    box_office: 829895144,
    country: 'USA',
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    release_year: 1972,
    genre: 'Crime',
    rating: 9.2,
    duration: 175,
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Diane Keaton'],
    language: 'English',
    synopsis:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    box_office: 134966411,
    country: 'USA',
  },
  {
    id: 3,
    title: 'Parasite',
    director: 'Bong Joon Ho',
    release_year: 2019,
    genre: 'Thriller',
    rating: 8.6,
    duration: 132,
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    language: 'Korean',
    synopsis:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    box_office: 263368277,
    country: 'South Korea',
  },
  {
    id: 4,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    release_year: 2008,
    genre: 'Action',
    rating: 9.0,
    duration: 152,
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    language: 'English',
    synopsis:
      'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    box_office: 1004558444,
    country: 'USA',
  },
  {
    id: 5,
    title: 'Spirited Away',
    director: 'Hayao Miyazaki',
    release_year: 2001,
    genre: 'Animation',
    rating: 8.6,
    duration: 125,
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki', 'Takashi Naitō'],
    language: 'Japanese',
    synopsis:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    box_office: 395580000,
    country: 'Japan',
  },
];

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

export default function LazySearch(props: {
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
