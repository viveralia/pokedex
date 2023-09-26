import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScaledSheet } from "react-native-size-matters";

import { Card, PokemonCard } from "~/components";
import { RootStackParamList } from "~/navigators";

import { type GetAllPokemonInifiniteQueryResponse } from "../hooks";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  pokemon: GetAllPokemonInifiniteQueryResponse["pokemon"][0];
  style?: StyleProp<ViewStyle>;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
export const SPACE_BETWEEN_CARDS = 18;
export const NUMBER_OF_COLUMNS = 2;

function getImgResponsiveSize(spacing: number, ratio = 0.375): number {
  const responsiveSize = ((SCREEN_WIDTH - spacing * 3) / 2) * ratio;
  return responsiveSize;
}

function getOfficialArtworkPokemonImage(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function PokemonListItem({ pokemon, style }: Props) {
  const navigation = useNavigation<Navigation>();
  const queryClient = useQueryClient();

  function pressHandler() {
    queryClient.setQueryData(["pokemon", pokemon.name], pokemon);
    navigation.navigate("PokemonDetails", { name: pokemon.name });
  }

  return (
    <Card style={[styles.item, style]} onPress={pressHandler}>
      <Card.Image
        source={{ uri: getOfficialArtworkPokemonImage(pokemon.id) }}
        style={styles.img as any}
      />
      <Card.Title>{pokemon.name}</Card.Title>
      <Card.Subtitle>{String(pokemon.id).padStart(3, "0")}</Card.Subtitle>
    </Card>
  );

  return (
    <PokemonCard
      style={[styles.item, style]}
      id={pokemon.id}
      onPress={pressHandler}
    >
      <PokemonCard.Image size={getImgResponsiveSize(SPACE_BETWEEN_CARDS)} />
      <PokemonCard.Title>{pokemon.name}</PokemonCard.Title>
      <PokemonCard.Subtitle>
        {String(pokemon.id).padStart(3, "0")}
      </PokemonCard.Subtitle>
    </PokemonCard>
  );
}

const styles = ScaledSheet.create({
  item: {
    margin: SPACE_BETWEEN_CARDS / NUMBER_OF_COLUMNS + "@ms",
  },
  img: {
    width: "60@s",
    height: "60@s",
  },
});
