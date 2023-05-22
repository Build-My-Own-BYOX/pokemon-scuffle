import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Atlas from "../components/screens/AtlasScreen";
import PokeDetailScreen from "../components/screens/PokeDetailScreen";
import {
  PokeAtlasScreenName,
  PokeDetailScreenName,
} from "../constants/Screens";

export type RootStackParams = {
  [PokeAtlasScreenName]: undefined;
  [PokeDetailScreenName]: undefined;
}

declare global {
  namespace ReactNavigation {
      interface RootParamList extends RootStackParams { }
  }
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name={PokeAtlasScreenName} component={Atlas} />
      <Stack.Screen name={PokeDetailScreenName} component={PokeDetailScreen} />
    </Stack.Navigator>
  );
};
