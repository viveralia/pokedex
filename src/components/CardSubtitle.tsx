import { useTheme } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { ScaledSheet } from "react-native-size-matters";

import { Text } from "./Text";

export function CardSubtitle({ children }: PropsWithChildren): JSX.Element {
  const theme = useTheme();

  return (
    <Text style={[styles.subtitle, { color: theme.colors.text }]}>
      {children}
    </Text>
  );
}

const styles = ScaledSheet.create({
  subtitle: {
    textAlign: "center",
    fontSize: "14@ms",
  },
});
