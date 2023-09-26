import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

export function PokeballActivityIndicator({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}): JSX.Element {
  return (
    <SafeAreaView style={[styles.root, style]}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
