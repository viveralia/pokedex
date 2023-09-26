import { useCallback, useMemo } from "react";

import { PokeballActivityIndicator } from "~/components";

import { PokemonList } from "../components";
import { useGetAllPokemonInfiniteQuery } from "../hooks";

export function PokemonListScreen() {
  const pokemon = useGetAllPokemonInfiniteQuery();

  const pokemonList = useMemo(() => {
    return pokemon.data?.pages.map((page) => page.results).flat();
  }, [pokemon.data]);

  const endReachedHandler = useCallback((): void => {
    pokemon.fetchNextPage();
  }, []);

  if (!pokemon.data && pokemon.isLoading) {
    return <PokeballActivityIndicator />;
  }

  return (
    <PokemonList
      pokemon={pokemonList}
      isFetchingNextPage={pokemon.isFetchingNextPage}
      onEndReached={endReachedHandler}
    />
  );
}
