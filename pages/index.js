import Head from 'next/head';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import Characters from '../components/Characters';

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <Head>
        <title>NextJS Apollo Client</title>
      </Head>

      <div className="flex flex-col justify-center p-6 border-b mb-4">
        <h1 className="text-2xl font-semibold text-center">Rick and Morty</h1>
      </div>

      <form
        className="mb-4"
        onSubmit={async e => {
          e.preventDefault();
          const results = await fetch('/api/searchCharacter', {
            method: 'POST',
            body: JSON.stringify(search),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { characters, error } = await results.json();

          setCharacters(characters);
        }}
      >
        <div className="flex items-center">
          <input
            className="px-4 py-2 h-full w-full outline-none"
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="max-content inline-block px-4 py-2 bg-red-300 text-red-900 border rounded-md mr-4"
            disabled={search === ''}
            type="submit"
          >
            Search
          </button>
          <button
            className="max-content inline-block px-4 py-2 bg-white text-red-300 border-red-300 border rounded-md mr-4"
            disabled={search === ''}
            onClick={async () => {
              setSearch('');
              setCharacters(initialState.characters);
            }}
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      <Characters characters={characters} />

      <footer className="flex flex-col justify-center p-6">
        <p className="text-center">Powered by Energy Drinks 🧋</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              name
              id
            }
            image
            origin {
              name
              id
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
