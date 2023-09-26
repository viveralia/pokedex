import { useTheme } from "@react-navigation/native";
import { Pressable, SafeAreaView } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";

import { ToastItem, useToast } from "~/hooks";

import { IconButton } from "./IconButton";
import { Text } from "./Text";

export function Toast({
  toast,
  onPress,
}: {
  toast: ToastItem;
  onPress?: (toast: ToastItem) => void;
}): JSX.Element {
  const theme = useTheme();
  const dismiss = useToast((state) => state.dismissToast);

  function dismissHandler() {
    dismiss(toast.id);
  }

  function pressHandler() {
    onPress(toast);
    dismiss(toast.id);
  }

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Pressable
        style={[styles.toast, { backgroundColor: theme.colors.primary }]}
        onPress={pressHandler}
      >
        <Text style={[{ color: theme.colors.background }]}>{toast.title}</Text>
        <IconButton
          onPress={dismissHandler}
          icon="cross"
          color={theme.colors.background}
        />
      </Pressable>
    </Animated.View>
  );
}

export function Toaster(): JSX.Element {
  const toasts = useToast((state) => state.toasts);

  return (
    <SafeAreaView style={styles.toaster}>
      {toasts.map(({ onPress, ...toast }) => (
        <Toast key={toast.id} toast={toast} onPress={onPress} />
      ))}
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  toaster: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9,
    width: "100%",
  },
  toast: {
    paddingHorizontal: "16@ms",
    paddingVertical: "16@ms",
    marginHorizontal: "16@ms",
    borderRadius: "8@ms",
    marginBottom: "6@ms",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
