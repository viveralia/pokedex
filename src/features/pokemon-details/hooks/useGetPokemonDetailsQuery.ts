import {useQuery} from '@tanstack/react-query';
import {gql} from 'graphql-request/build/cjs/index.js';

import {client} from '~/client';

const getPokemonDetailsQueryDocument = gql`
  query GetPokemonDetails($name: String!) {
    pokemon: pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`;

interface GetPokemonDetailsQueryResponse {
  pokemon: Array<{
    id: number;
    name: string;
    types: Array<{type: {name: string}}>;
  }>;
}

export default function useGetPokemonDetailsQuery(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const response = await client.request<GetPokemonDetailsQueryResponse>(
        getPokemonDetailsQueryDocument,
        {name},
      );
      return response.pokemon[0];
    },
  });
}
