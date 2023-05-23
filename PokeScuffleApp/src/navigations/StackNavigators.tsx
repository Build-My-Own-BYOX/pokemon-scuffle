import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Atlas from "../components/screens/AtlasScreen";
import PokeDetailScreen from "../components/screens/PokeDetailScreen";
import {
  PokeAtlasScreenName,
  PokeDetailScreenName,
} from "../constants/Screens";
import { Pokemon } from "../types/Pokemon";

export type RootStackParams = {
  [PokeAtlasScreenName]: undefined;
  [PokeDetailScreenName]: { pokemonInst: Pokemon };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

const RootStack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
      initialRouteName={PokeAtlasScreenName}
    >
      <RootStack.Screen name={PokeAtlasScreenName} component={Atlas} />
      <RootStack.Screen
        name={PokeDetailScreenName}
        component={PokeDetailScreen}
      />
    </RootStack.Navigator>
  );
};
