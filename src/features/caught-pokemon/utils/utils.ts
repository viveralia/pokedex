import { PokeballTypes, pokeBalls } from "~/features/pokeballs/constants";

export interface PokemonStatistics {
  id: number;
  name: string;
  attack: number;
  defense: number;
  hp: number;
}

export function getCatchingSuccessPercentage(
  wildPokemon: PokemonStatistics,
  pokeball: PokeballTypes
) {
  let percentage: number;

  if (wildPokemon.hp < 10000) percentage = 0.25;
  if (wildPokemon.hp < 1000) percentage = 0.5;
  if (wildPokemon.hp < 100) percentage = 0.95;

  percentage = pokeBalls[pokeball].catchRateModifier * percentage;

  percentage = percentage >= 1 ? 0.99 : percentage;

  return percentage;
}

export function getRandomBoolean(succesPercentage: number) {
  return Math.random() < succesPercentage;
}
