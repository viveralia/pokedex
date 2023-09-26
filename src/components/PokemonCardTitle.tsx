import { useTheme } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { ScaledSheet } from "react-native-size-matters";

import { Text } from "./Text";

export default function PokemonCardTitle({
  children,
}: PropsWithChildren): JSX.Element {
  const theme = useTheme();

  return (
    <Text
      style={[styles.title, { color: theme.colors.primary }]}
      numberOfLines={1}
    >
      {children}
    </Text>
  );
}

const styles = ScaledSheet.create({
  title: {
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: "16@ms",
  },
});
