import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { PokemonListScreen } from "~/features/pokemon-list/screens";
import { PokemonDetailsScreen } from "~/features/pokemon-details/screens";
import { darkTheme, lightTheme } from "~/themes";
import { capitalizeWord } from "~/utils";
import { Toaster } from "~/components/Toaster";

import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { useAuth } from "~/features/auth/hooks";
import { OnBoardingScreen } from "~/features/auth/screens/OnBoarding";

export type RootStackParamList = {
  OnBoarding: undefined;
  BottomTabs: undefined;
  PokemonList: undefined;
  PokemonDetails: { name: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isOnBoardingComplete = useAuth((state) => state.isOnBoardingComplete);
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primary,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: theme.colors.background },
            // animation: "fade_from_bottom",
            headerLargeTitle: true,
            headerTitleAlign: "left",
            headerTitleStyle: styles.headerTitleStyle,
          }}
        >
          {!isOnBoardingComplete ? (
            <RootStack.Screen name="OnBoarding" component={OnBoardingScreen} />
          ) : (
            <>
              {/* <RootStack.Screen
                name="BottomTabs"
                component={BottomTabsNavigator}
                options={{ headerShown: false }}
              /> */}
              <RootStack.Screen
                name="PokemonList"
                component={PokemonListScreen}
                options={{
                  title: "Pokédex",
                }}
              />
              <RootStack.Screen
                name="PokemonDetails"
                component={PokemonDetailsScreen}
                options={({ route }) => ({
                  title: capitalizeWord(route.params.name),
                  // presentation: "modal",
                })}
              />
            </>
          )}
        </RootStack.Navigator>
        <Toaster />
      </NavigationContainer>
    </>
  );
}

const styles = ScaledSheet.create({
  headerTitleStyle: {
    fontSize: "18@ms",
    fontWeight: "700",
  },
});
