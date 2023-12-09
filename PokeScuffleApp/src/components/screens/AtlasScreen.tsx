import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Pokemon } from "../../types/Pokemon";
import PokemonCard from "../molecules/PokemonCard";
import SearchPokemon from "../molecules/SearchPokemon";

interface State {
  isLoading: boolean;
  pokemonInst: Pokemon;
}

class Atlas extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false, // decides whether to show the activity indicator or not
      pokemonInst: {
        id: 0,
        name: "",
        pic: "",
        desc: "",
        types: [],
      } as Pokemon,
    };
  }

  setPokemonInst = (updatedPokemon: Pokemon) => {
    this.setState({ pokemonInst: updatedPokemon });
  };

  setLoadingStatus = (isLoading: boolean) => {
    this.setState({ isLoading: isLoading });
  };

  render() {
    const { isLoading, pokemonInst } = this.state; // extract the Pokémon data from the state

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <SearchPokemon
            pokemonInst={pokemonInst}
            setCallerPokemonInst={this.setPokemonInst}
            setCallerLoadingStatus={this.setLoadingStatus}
          />

          <View style={styles.mainContainer}>
            {isLoading && <ActivityIndicator size="large" color="#0064e1" />}

            {!isLoading && <PokemonCard {...pokemonInst} />}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  mainContainer: {
    flex: 9,
  },
});

export default Atlas;