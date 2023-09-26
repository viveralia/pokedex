import { useMutation } from "@tanstack/react-query";

import { usePokeballs } from "~/features/pokeballs/hooks";
import { PokeballTypes } from "~/features/pokeballs/constants";

import { useCaughtPokemon } from "./useCaughtPokemon";
import {
  PokemonStatistics,
  getCatchingSuccessPercentage,
  getRandomBoolean,
} from "../utils";
import type { CaughtPokemonPayload } from "../hooks";

function tryToCatch({
  wildPokemon,
  pokeball,
}: {
  wildPokemon: PokemonStatistics;
  pokeball: PokeballTypes;
}): Promise<CaughtPokemonPayload> {
  return new Promise((resolve, reject) => {
    const percentage = getCatchingSuccessPercentage(wildPokemon, pokeball);
    const wasSuccessfullyCaught = getRandomBoolean(percentage);
    if (wasSuccessfullyCaught) {
      const caughtPokemon: CaughtPokemonPayload = {
        id: wildPokemon.id,
        name: wildPokemon.name,
      };
      resolve(caughtPokemon);
    } else {
      reject(`Couldn't catch ${wildPokemon.name}`);
    }
  });
}

export function useTryToCatchMutation() {
  const addPokemonToPokedex = useCaughtPokemon((state) => state.catchPokemon);
  const throwPokeball = usePokeballs((state) => state.throwPokeball);

  return useMutation({
    mutationFn: tryToCatch,
    onSuccess: (caughtPokemon) => {
      addPokemonToPokedex(caughtPokemon);
    },
    onMutate: ({ pokeball }) => {
      throwPokeball(pokeball);
    },
  });
}
