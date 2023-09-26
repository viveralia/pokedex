import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PokeballTypes } from "../constants";

type AvailablePokeballs = Record<PokeballTypes, number>;

const initialAvailablePokeballs: AvailablePokeballs = {
  pokeBall: 3,
  greatBall: 0,
  ultraBall: 0,
  masterBall: 0,
};

export interface PokeballsState {
  availablePokeballs: AvailablePokeballs;
  addPokeball: (type: PokeballTypes, quantity?: number) => void;
  throwPokeball: (type: PokeballTypes) => void;
  resetPokeballs: () => void;
}

export const usePokeballs = create<PokeballsState>()(
  persist(
    (set) => ({
      availablePokeballs: initialAvailablePokeballs,
      addPokeball: (type, quantity = 1) => {
        set((state) => ({
          availablePokeballs: {
            ...state.availablePokeballs,
            type: state.availablePokeballs[type] + quantity,
          },
        }));
      },
      throwPokeball: (type) => {
        set((state) => {
          if (state.availablePokeballs[type] === 0) {
            throw new Error(`Not enough pokeballs of type: ${type}`);
          }

          return {
            availablePokeballs: {
              ...state.availablePokeballs,
              [type]: state.availablePokeballs[type] - 1,
            },
          };
        });
      },
      resetPokeballs: () => {
        set(() => ({ availablePokeballs: initialAvailablePokeballs }));
      },
    }),
    {
      name: "availablePokeballs",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
