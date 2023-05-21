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
import { PokemonDetailResponse, PokemonSpecieDetailResponse, PokemonTypeBriefResponse } from "../../types/PokemonAPIResponse";

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
      const { data: pokemonDetail} = await axios.get<PokemonDetailResponse>(
        `${POKE_API_BASE_URL}/pokemon/${pokemonID}`
      );
      const { data: pokemonSpecieDetail } = await axios.get<PokemonSpecieDetailResponse>(
        `${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`
      );
      this.setState((prevState) => ({
        pokemonInst: {
          ...prevState.pokemonInst, // Keep the existing attributes
          id: pokemonID,
          name: pokemonDetail.name,
          pic: pokemonDetail.sprites.front_default,
          types: this.mapAPITypesToPokemonTypes(pokemonDetail.types),
          desc: this.getDescription(pokemonSpecieDetail.flavor_text_entries),
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
   * @param apiTypes - a list of brief pokemon types extracted from API response 
   * @returns An array of Pokémon type slots.
  */
  mapAPITypesToPokemonTypes = (apiTypes: PokemonTypeBriefResponse[]): PokemonType[] => {
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

      // extract type id from field url
      const typeId = item.type.url.split("/").slice(-2, -1)[0];
      return {
        id: parseInt(typeId) ?? 0,
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
