import { StackScreenProps } from "@react-navigation/stack";
import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { RootStackParams } from "../../navigations/StackNavigators";
import { PokeDetailScreenName } from "../../constants/Screens";
import { Pokemon } from "../../types/Pokemon";
import PokeDetailHeader from "../organisms/PokeDetailHeader";

type Props = StackScreenProps<RootStackParams, "Pokemon Detail">;

const PokeDetailScreen = ({ route }: Props) => {
  const { pokemonInst } = route.params;

  return (
    <>
      <PokeDetailHeader
        backgroundColor="#FF0000"
        picture={pokemonInst?.pic}
        name={pokemonInst?.name}
        types={pokemonInst?.types}
        id={pokemonInst?.id.toString()}
      />
    </>
  );
};

export default PokeDetailScreen;
