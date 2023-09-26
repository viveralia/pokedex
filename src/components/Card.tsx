import React, { type PropsWithChildren, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useTheme } from "@react-navigation/native";
import { darken } from "polished";

import { CardImage } from "./CardImage";
import { CardTitle } from "./CardTitle";
import { CardSubtitle } from "./CardSubtitle";

export interface CardProps extends Pick<PressableProps, "onPress"> {
  style?: StyleProp<ViewStyle>;
  baseColor?: string;
  activeColor?: string;
}

function Card({
  children,
  onPress,
  style,
  baseColor,
  activeColor,
}: PropsWithChildren<CardProps>) {
  const theme = useTheme();
  baseColor = baseColor ?? theme.colors.card;
  activeColor = activeColor ?? darken(0.0175, baseColor);
  const shadowColor = darken(0.095, activeColor);

  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedShadowOpacity = useRef(new Animated.Value(0)).current;
  const animatedBgColor = useRef(new Animated.Value(0)).current;

  function pressInHandler(e: GestureResponderEvent) {
    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: 0.975,
        bounciness: 20,
        speed: 10,
        useNativeDriver: true,
      }),
      Animated.spring(animatedShadowOpacity, {
        toValue: 0.5,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
      }),
      // Animated.spring(animatedBgColor, {
      //   toValue: 1,
      //   bounciness: 10,
      //   speed: 10,
      //   useNativeDriver: true,
      // }),
    ]).start();
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
      // Animated.spring(animatedBgColor, {
      //   toValue: 0,
      //   bounciness: 10,
      //   speed: 10,
      //   useNativeDriver: true,
      // }),
    ]).start();
  }

  const interpolatedBgColor = animatedBgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, activeColor],
  });

  return (
    <Pressable
      onPressIn={pressInHandler}
      onPressOut={pressOutHandler}
      onPress={onPress}
      style={styles.root}
    >
      <Animated.View
        style={[
          //@ts-ignore
          styles.container,
          {
            shadowColor,
            transform: [{ scale: animatedScale }],
            shadowOpacity: animatedShadowOpacity,
            backgroundColor: baseColor,
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    borderRadius: "8@ms",
  },
  container: {
    flex: 1,
    borderRadius: "8@ms",
    paddingHorizontal: "10@ms",
    paddingVertical: "22@ms",
    gap: "12@ms",
    shadowOffset: {
      width: "5@ms",
      height: "5@ms",
    },
    shadowRadius: "5@ms",
  },
});

Card.Image = CardImage;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card;
