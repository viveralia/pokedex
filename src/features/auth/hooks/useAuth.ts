import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isOnBoardingComplete: boolean;
  completeOnBoarding: () => void;
  deleteAccount: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isOnBoardingComplete: false,
      completeOnBoarding: () =>
        set((state) => ({ isOnBoardingComplete: true })),
      deleteAccount: () => set((state) => ({ isOnBoardingComplete: false })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
