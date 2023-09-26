import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Button } from "~/components";

export function DevScreen(): JSX.Element {
  async function resetPersistanceHandler() {
    try {
      await AsyncStorage.clear();
      Alert.alert("Success!", "Persisted data removed succesfully");
    } catch (error) {
      Alert.alert("Failure", "Could not remove persisted data", [
        {
          text: "OK",
          style: "cancel",
        },
        {
          text: "Retry",
          onPress: resetPersistanceHandler,
          isPreferred: true,
          style: "default",
        },
      ]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Button onPress={resetPersistanceHandler}>Reset persistence</Button>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@s",
    paddingVertical: "16@s",
  },
});
