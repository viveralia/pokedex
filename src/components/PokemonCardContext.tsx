import { createContext } from "react";

export interface PokemonInfoContextValue {
  id: number;
}

const PokemonCardContext = createContext<PokemonInfoContextValue>(
  {} as PokemonInfoContextValue
);

export default PokemonCardContext;
