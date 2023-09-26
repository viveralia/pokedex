import { useInfiniteQuery } from "@tanstack/react-query";
import { gql } from "graphql-request/build/cjs/index.js";

import { client } from "~/client";

const getAllPokemonQueryDocument = gql`
  query GetAllPokemonQuery($limit: Int = 50, $offset: Int = 0) {
    pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
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

export interface GetAllPokemonInifiniteQueryResponse {
  pokemon: Array<{
    id: number;
    name: string;
    types: Array<{ type: { name: string } }>;
  }>;
}

export default function useGetAllPokemonInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = 20;
      let offset = (pageParam - 1) * limit;
      // offset = offset < 0 ? 0 : offset;
      const response = await client.request<
        GetAllPokemonInifiniteQueryResponse,
        { limit?: number; offset?: number }
      >(getAllPokemonQueryDocument, { limit, offset });
      return { page: pageParam, results: response.pokemon };
    },
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
}
