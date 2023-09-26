import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Medal {
  id: string;
  name: string;
}

type MedalIncollection = Medal["id"];

export interface MedalsState {
  medalCollection: MedalIncollection[];
  addMedalToCollection: (medalId: MedalIncollection) => void;
}

export const useMedals = create<MedalsState>()(
  persist(
    (set) => ({
      medalCollection: [],
      addMedalToCollection: (medalId) =>
        set((state) => ({
          medalCollection: [...state.medalCollection, medalId],
        })),
    }),
    {
      name: "medalCollection",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
