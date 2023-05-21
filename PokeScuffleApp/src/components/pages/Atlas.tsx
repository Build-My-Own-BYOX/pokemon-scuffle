import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import pokemonUtils from "pokemon";
import { Pokemon, PokemonType } from "../../types/Pokemon";
import PokemonView from "../molecules/PokemonView";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

interface State {
  isLoading: boolean;
  searchInput: string;
  pokemonInst: Pokemon;
}

export default class Atlas extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false, // decides whether to show the activity indicator or not
      searchInput: "", // the currently input text
      pokemonInst: {
        id: 0,
        name: "",
        pic: "",
        desc: "",
        types: [],
      },
    };
  }

  render() {
    const { searchInput, isLoading, pokemonInst } = this.state; // extract the Pokémon data from the state

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={(searchInput) => this.setState({ searchInput })}
                value={this.state.searchInput}
                placeholder="Search Pokémon"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this.searchPokemon}
                title="Search"
                color="#0064e1"
              />
            </View>
          </View>

          <View style={styles.mainContainer}>
            {isLoading && <ActivityIndicator size="large" color="#0064e1" />}

            {!isLoading && <PokemonView {...pokemonInst} />}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  searchPokemon = async () => {
    try {
      const pokemonID = pokemonUtils.getId(this.state.searchInput); // check if the entered Pokémon name is valid
      this.setState({
        isLoading: true, // show the loader while request is being performed
      });
      const { data: pokemonData } = await axios.get(
        `${POKE_API_BASE_URL}/pokemon/${pokemonID}`
      );
      const { data: pokemonSpecieData } = await axios.get(
        `${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`
      );

      const { name, sprites, types } = pokemonData;
      const { flavor_text_entries } = pokemonSpecieData;

      this.setState((prevState) => ({
        pokemonInst: {
          ...prevState.pokemonInst, // Keep the existing attributes
          id: pokemonID,
          name: name,
          pic: sprites.front_default,
          types: this.mapAPITypesToPokemonTypes(types),
          desc: this.getDescription(flavor_text_entries),
        },
        isLoading: false, // hide loader
      }));
    } catch (err) {
      Alert.alert("Error", "Pokémon not found");
    }
  };

  getDescription = (entries) =>
    entries.find((item) => item.language.name === "en").flavor_text;

  /**
   * Maps API types to Pokémon type slots.
   * @param apiTypes - The array of API types to be mapped.
   * @returns An array of Pokémon type slots.
   * 
   * 
   * example of apiTypes
   * [
   *  {
   *    "slot": 1,
   *    "type": {
   *      "name": "water",
   *      "url": "https://pokeapi.co/api/v2/type/11/"
   *    }
   *  },
   *  {
   *    "slot": 2,
   *    "type": {
   *      "name": "electric",
   *      "url": "https://pokeapi.co/api/v2/type/13/"
   *    }
   *  }
   * ]
   * 
  */
  mapAPITypesToPokemonTypes = (apiTypes: any[]): PokemonType[] => {
    return apiTypes.map((item) => {
      if (
        !item ||
        typeof item.slot !== "number" ||
        !item.type ||
        typeof item.type.name !== "string" ||
        typeof item.type.url !== "string"
      ) {
        return {
          id: 0,
          name: "",
          url: "",
        };
      }

      const typeId = item.type.url.split("/").slice(-2, -1)[0];
      return {
        id: typeId,
        name: item.type.name,
        url: item.type.url,
      };
    });
  };
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
  headContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 100,
  },
  textInputContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 9,
  },
  textInput: {
    height: 35,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5,
  },
});
