import React, { useMemo, type PropsWithChildren, useRef } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { darken } from "polished";
import { ScaledSheet } from "react-native-size-matters";

import { typesWithColor } from "../constants";
import PokemonCardImage from "./PokemonCardImage";
import PokemonCardTitle from "./PokemonCardTitle";
import PokemonCardSubtitle from "./PokemonCardSubtitle";
import PokemonInfoContext, {
  type PokemonInfoContextValue,
} from "./PokemonCardContext";

interface Props
  extends Pick<PressableProps, "onPress">,
    PokemonInfoContextValue {
  style?: StyleProp<ViewStyle>;
}

function PokemonCard({
  children,
  onPress,
  id,
  style,
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  const baseColor = useMemo(() => {
    return theme.colors.card;
  }, [theme.colors.card]);

  const pressedBgColor = useMemo(() => {
    return darken(0.0175, baseColor);
  }, [baseColor]);

  const shadowColor = useMemo(() => {
    return darken(0.0975, baseColor);
  }, [pressedBgColor]);

  const ctx = useMemo(() => {
    return { id };
  }, [id]);

  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedShadowOpacity = useRef(new Animated.Value(0)).current;

  function pressInHandler(e: GestureResponderEvent) {
    // if (!onPress) return;

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
    ]).start();
  }

  function pressOutHandler(e: GestureResponderEvent) {
    // if (!onPress) return;

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
  }

  return (
    <PokemonInfoContext.Provider value={ctx}>
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
    </PokemonInfoContext.Provider>
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

PokemonCard.Image = PokemonCardImage;
PokemonCard.Title = PokemonCardTitle;
PokemonCard.Subtitle = PokemonCardSubtitle;

export default PokemonCard;
