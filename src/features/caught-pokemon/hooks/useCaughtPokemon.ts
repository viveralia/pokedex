import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CaughtPokemon {
  id: number;
  name: string;
  caughtSince: Date;
}

export type CaughtPokemonPayload = Omit<CaughtPokemon, "caughtSince">;

interface CaughtPokemonState {
  caughtPokemonList: CaughtPokemon[];
  catchPokemon: (pokemon: CaughtPokemonPayload) => void;
  releasePokemon: (pokemon: CaughtPokemonPayload) => void;
}

export const useCaughtPokemon = create<CaughtPokemonState>()(
  persist(
    (set) => ({
      caughtPokemonList: [],
      catchPokemon: (pokemon) => {
        set((state) => ({
          caughtPokemonList: [
            ...state.caughtPokemonList,
            {
              ...pokemon,
              caughtSince: new Date(Date.now()),
            },
          ],
        }));
      },
      releasePokemon: (pokemon) => {
        set((state) => ({
          caughtPokemonList: state.caughtPokemonList.filter(
            (pk) => pk.id !== pokemon.id
          ),
        }));
      },
    }),
    {
      name: "caughtPokemon",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
