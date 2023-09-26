export type PokeballTypes =
  | "pokeBall"
  | "greatBall"
  | "ultraBall"
  | "masterBall";

export interface Pokeball {
  catchRateModifier: number;
}

export const pokeBalls: Record<PokeballTypes, Pokeball> = {
  pokeBall: {
    catchRateModifier: 1,
  },
  greatBall: {
    catchRateModifier: 1.5,
  },
  ultraBall: {
    catchRateModifier: 2,
  },
  masterBall: {
    catchRateModifier: 255,
  },
} as const;
