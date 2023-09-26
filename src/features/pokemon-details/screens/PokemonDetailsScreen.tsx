import React from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";

import { RootStackParamList } from "~/navigators";
import {
  Button,
  PokeballActivityIndicator,
  PokemonCard,
  Text,
} from "~/components";
import {
  useCaughtPokemon,
  useTryToCatchMutation,
} from "~/features/caught-pokemon/hooks";
import { usePokeballs } from "~/features/pokeballs/hooks";
import { capitalizeWord, prettyLog } from "~/utils";
import { PokemonStatistics } from "~/features/caught-pokemon/utils";

import { useGetPokemonDetailsQuery } from "../hooks";

export function PokemonDetailsScreen(): JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const pokemon = useGetPokemonDetailsQuery(route.params!.name);
  const caughtPokemonList = useCaughtPokemon((s) => s.caughtPokemonList);
  const releasePokemon = useCaughtPokemon((s) => s.releasePokemon);
  const availablePokeballs = usePokeballs((state) => state.availablePokeballs);
  const tryToCatch = useTryToCatchMutation();

  prettyLog(availablePokeballs);

  const caughtPokemon = caughtPokemonList.find(
    (pk) => pk.id === pokemon.data.id
  );
  const hasBeenCaught = !!caughtPokemon;

  function pressHandler() {
    const pk = { id: pokemon.data.id, name: pokemon.data.name };
    if (hasBeenCaught) {
      return Alert.alert("Are you sure?", "You will lose your pokeball", [
        {
          style: "cancel",
          text: "Cancel",
          isPreferred: true,
        },
        {
          style: "destructive",
          text: `Release ${capitalizeWord(pokemon.data.name)}`,
          onPress: () => releasePokemon(pk),
        },
      ]);
    }
    const wildPokemon: PokemonStatistics = {
      id: pokemon.data.id,
      attack: 10,
      defense: 10,
      hp: 1000,
      name: pokemon.data.name,
    };
    tryToCatch.mutate({ wildPokemon, pokeball: "pokeBall" });
  }

  if (!pokemon.data && pokemon.isLoading) {
    return <PokeballActivityIndicator />;
  }

  return (
    <>
      <ScrollView
        style={styles.root}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.rootContent}
      >
        <PokemonCard id={pokemon.data.id}>
          <PokemonCard.Image size={220} />
        </PokemonCard>
        {hasBeenCaught && (
          <Text>Caught since: {JSON.stringify(caughtPokemon.caughtSince)}</Text>
        )}
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <Button onPress={pressHandler}>
          {hasBeenCaught ? "Release pokemon" : "Catch pokemon"}
        </Button>
      </SafeAreaView>
    </>
  );
}

const styles = ScaledSheet.create({
  root: {
    flex: 1,
  },
  rootContent: {
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
  footer: {
    paddingHorizontal: "16@s",
    marginBottom: "16@s",
  },
});
