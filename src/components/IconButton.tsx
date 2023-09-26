import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Entypo, createIconSet } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { transparentize } from "polished";
import { ScaledSheet, moderateScale } from "react-native-size-matters";

type Icon = ReturnType<typeof createIconSet>;

interface IconButtonProps extends Omit<PressableProps, "style"> {
  IconSet?: Icon;
  icon: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  IconSet = Entypo,
  icon,
  size = moderateScale(24),
  color,
  style,
  ...props
}: IconButtonProps): JSX.Element {
  const theme = useTheme();
  color = color ?? theme.colors.text;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          borderRadius: size,
          backgroundColor: transparentize(pressed ? 0.75 : 0.95, color),
        },
        style,
      ]}
      {...props}
    >
      <IconSet name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  container: {
    padding: "6@ms",
  },
});
