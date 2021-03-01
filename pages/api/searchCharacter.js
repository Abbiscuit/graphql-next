import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const search = req.body;

  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${search}" }) {
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

    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (err) {
    if (err.message === '400: Not Found') {
      res.status(400).json({ characters: null, error: 'No Character Found' });
    } else {
      res.status(500).json({ characters: null, error: 'Internal Error' });
    }
  }
};
