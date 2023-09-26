import React, { useContext } from "react";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";

import { useCaughtPokemon } from "~/features/caught-pokemon/hooks";

import PokemonCardContext from "./PokemonCardContext";

interface Props {
  size: number;
  getPokemonImage?: (id: number) => string;
}

function getOfficialArtworkPokemonImage(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export default function PokemonCardImage({
  size,
  getPokemonImage = getOfficialArtworkPokemonImage,
}: Props): JSX.Element {
  const theme = useTheme();
  const { id } = useContext(PokemonCardContext);
  const caughtPokemonList = useCaughtPokemon((s) => s.caughtPokemonList);
  const hasBeenCaught = caughtPokemonList.some((pk) => pk.id === id);

  return (
    <Image
      style={[
        // @ts-ignore
        styles.image,
        {
          tintColor: hasBeenCaught ? undefined : theme.colors.text,
          opacity: hasBeenCaught ? 1 : 0.275,
          width: size,
          height: size,
        },
      ]}
      contentFit="contain"
      source={getPokemonImage(id)}
      cachePolicy="memory-disk"
    />
  );
}

const styles = ScaledSheet.create({
  image: {
    alignSelf: "center",
  },
});
