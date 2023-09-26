import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Button, Text } from "~/components";

import { useAuth } from "../hooks";

export function OnBoardingScreen(): JSX.Element {
  const { t } = useTranslation();
  const completeOnBoarding = useAuth((state) => state.completeOnBoarding);

  function pressHandler() {
    completeOnBoarding();
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container}>
        <Text>{t("auth.title")}</Text>
        <Text>{t("auth.subtitle")}</Text>
      </ScrollView>
      <Button onPress={pressHandler} style={styles.button}>
        Start
      </Button>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: "16@ms",
  },
  button: {
    marginHorizontal: "16@ms",
  },
});
