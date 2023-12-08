import { StackScreenProps } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";

import React, { Component } from "react";
import { RootStackParams } from "../../navigations/StackNavigators";
import { PokeDetailScreenName } from "../../constants/Screens";
import { Pokemon } from "../../types/Pokemon";
import PokeDetailHeader from "../organisms/PokeDetailHeader";
import { TabNavigator } from "../../navigations/TabNavigators";
import PokeNotFound from "../organisms/PokeNotFound";
import { usePokemon } from "../../services/PokeAPI";

type Props = StackScreenProps<RootStackParams, "Pokemon Detail">;

const PokeDetailScreen = ({ route }: Props) => {
  const { pokemonInst } = route.params;
  const { pokemon, status } = usePokemon(pokemonInst.id.toString())


  return (
    <>
      <PokeDetailHeader
        backgroundColor="#FF0000"
        picture={pokemonInst?.pic}
        name={pokemonInst?.name}
        types={pokemonInst?.types}
        id={pokemonInst?.id.toString()}
      />
      <View style={styles.tabsContainer}>
        {status === "error" && (
          <PokeNotFound message="No details found for this pokemon." />
        )}
        {status === "success" && <TabNavigator />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

export default PokeDetailScreen;
