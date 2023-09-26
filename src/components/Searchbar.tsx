import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export function Searchbar(props: TextInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card }]}
        {...props}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
    borderRadius: 8,
    paddingLeft: 32 + 16,
  },
});
