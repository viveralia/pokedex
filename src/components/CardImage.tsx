import React from "react";
import { Image, ImageStyle, ImageProps } from "expo-image";
import { ScaledSheet } from "react-native-size-matters";

interface CardImageProps extends ImageProps {
  style?: ImageStyle;
}

export function CardImage({ style, ...props }: CardImageProps): JSX.Element {
  return (
    <Image
      style={[styles.image as any, style]}
      contentFit="contain"
      cachePolicy="memory-disk"
      {...props}
    />
  );
}

const styles = ScaledSheet.create({
  image: {
    alignSelf: "center",
  },
});
