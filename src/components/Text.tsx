import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export interface TextProps extends RNTextProps {}

export function Text({ style, ...props }: TextProps): JSX.Element {
  return <RNText style={[styles.text, style]} {...props} />;
}

const styles = ScaledSheet.create({
  text: {},
});
