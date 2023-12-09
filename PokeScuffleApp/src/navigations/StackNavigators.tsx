import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Atlas from "../components/screens/AtlasScreen";
import PokeDetailScreen from "../components/screens/PokeDetailScreen";
import {
  PokeDexScreenName,
  PokeAtlasScreenName,
  PokeDetailScreenName,
} from "../constants/Screens";
import { Pokemon } from "../types/Pokemon";
import { PokedexScreen } from "../components/screens/PokeDexScreen";

export type RootStackParams = {
  [PokeDexScreenName]: undefined;
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
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' }
      }}
      initialRouteName={PokeDexScreenName}
    >
      <RootStack.Screen name={PokeDexScreenName} component={PokedexScreen} />
      <RootStack.Screen name={PokeAtlasScreenName} component={Atlas} />
      <RootStack.Screen
        name={PokeDetailScreenName}
        component={PokeDetailScreen}
      />
    </RootStack.Navigator>
  );
};
