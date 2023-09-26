import { useTheme } from "@react-navigation/native";
import { darken } from "polished";
import { useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Text } from "./Text";

interface ButtonProps extends Omit<PressableProps, "style"> {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedShadowOpacity = useRef(new Animated.Value(0)).current;

  function pressInHandler(e: GestureResponderEvent) {
    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: 0.975,
        bounciness: 20,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.spring(animatedShadowOpacity, {
        toValue: 0.25,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
    ]).start();
    onPressIn && onPressIn(e);
  }

  function pressOutHandler(e: GestureResponderEvent) {
    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: 1,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.spring(animatedShadowOpacity, {
        toValue: 0,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
    ]).start();

    onPressOut && onPressOut(e);
  }

  return (
    <Pressable
      style={styles.root}
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      {...props}
    >
      <Animated.View
        style={[
          //@ts-ignore
          styles.container,
          {
            shadowColor: darken(0.0975, theme.colors.primary),
            transform: [{ scale: animatedScale }],
            shadowOpacity: animatedShadowOpacity,
            backgroundColor: theme.colors.primary,
          },
          style,
        ]}
      >
        <Text style={[styles.label, { color: theme.colors.background }]}>
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  root: {
    borderRadius: "6@ms",
  },
  container: {
    paddingHorizontal: "12@ms",
    paddingVertical: "16@ms",
    borderRadius: "6@ms",
    shadowOffset: {
      width: "5@ms",
      height: "5@ms",
    },
    shadowRadius: "5@ms",
  },
  label: {
    fontSize: "14@ms",
    fontWeight: "600",
  },
});
