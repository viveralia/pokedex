import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Text } from "~/components";

interface Badge {
  title: string;
  isCompleted: false;
}

export default function BadgeCard(): JSX.Element {
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = ScaledSheet.create({});
