import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { DevScreen } from "~/features/dev/screens/DevScreen";
import { PokemonListScreen } from "~/features/pokemon-list/screens";

export type BottomTabsParamList = {
  PokemonList: undefined;
  Dev: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

export function BottomTabsNavigator(): JSX.Element {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{
          title: "Pokédex",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="pokeball" {...props} />
          ),
        }}
      />
      {__DEV__ && (
        <Tabs.Screen
          name="Dev"
          component={DevScreen}
          options={{
            title: "Devtools",
            tabBarIcon: (props) => (
              <MaterialCommunityIcons name="toolbox-outline" {...props} />
            ),
          }}
        />
      )}
    </Tabs.Navigator>
  );
}
