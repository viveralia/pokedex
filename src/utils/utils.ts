export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getPokemonImage(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function prettyLog(value: unknown) {
  console.debug(JSON.stringify(value, null, 2));
}

export function capitalizeWord(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
