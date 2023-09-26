import {
  FlashList,
  type FlashListProps,
  type ListRenderItem,
} from "@shopify/flash-list";
import { useCallback } from "react";
import { ScaledSheet } from "react-native-size-matters";

import { GetAllPokemonInifiniteQueryResponse } from "../hooks";
import {
  NUMBER_OF_COLUMNS,
  PokemonListItem,
  SPACE_BETWEEN_CARDS,
} from "./PokemonListItem";
import { PokeballActivityIndicator } from "~/components";

type ListItem = GetAllPokemonInifiniteQueryResponse["pokemon"][0];
type RenderItem = ListRenderItem<ListItem>;
type KeyExtractor = (item: ListItem) => string;

interface Props extends Omit<FlashListProps<ListItem>, "renderItem" | "data"> {
  pokemon: ListItem[];
  isFetchingNextPage?: boolean;
}

const keyExtractor: KeyExtractor = (item) => {
  return item.id.toString();
};

export function PokemonList({
  pokemon,
  isFetchingNextPage,
  ...props
}: Props): JSX.Element {
  const renderFooter = useCallback((): JSX.Element => {
    if (!isFetchingNextPage) return null;
    return <PokeballActivityIndicator style={styles.footer} />;
  }, [isFetchingNextPage]);

  const renderItem: RenderItem = ({ item: pokemon }) => {
    return <PokemonListItem pokemon={pokemon} />;
  };

  return (
    <FlashList
      removeClippedSubviews
      numColumns={NUMBER_OF_COLUMNS}
      // @ts-ignore
      contentContainerStyle={styles.listContentContainer}
      data={pokemon}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.25}
      renderItem={renderItem}
      estimatedItemSize={180}
      ListFooterComponent={renderFooter}
      {...props}
    />
  );
}

const styles = ScaledSheet.create({
  listContentContainer: {
    paddingVertical: SPACE_BETWEEN_CARDS,
    paddingHorizontal: SPACE_BETWEEN_CARDS / NUMBER_OF_COLUMNS,
  },
  footer: {
    paddingVertical: "12@s",
  },
});
