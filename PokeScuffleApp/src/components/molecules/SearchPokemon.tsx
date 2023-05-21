import React, { Component } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";

import axios from "axios";
import pokemonUtils from "pokemon";
import { Pokemon, PokemonType } from "../../types/Pokemon";
import {
  PokemonDetailResponse,
  PokemonSpecieDetailResponse,
  PokemonTypeBriefResponse,
} from "../../types/PokemonAPIResponse";
import { getPokemonDetail, getPokemonSpecieDetail } from "../../services/PokeAPI";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

interface SearchPokemonProps {
  pokemonInst: Pokemon;
  setCallerPokemonInst: (pokemon: Pokemon) => void;
  setCallerLoadingStatus: (isLoading: boolean) => void;
}

interface State {
  searchInput: string;
}

class SearchPokemon extends Component<SearchPokemonProps, State> {
  constructor(props: SearchPokemonProps) {
    super(props);

    this.state = {
      searchInput: "", // the currently input text
    };
  }

  render() {
    return (
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
          <Button onPress={this.searchPokemon} title="Search" color="#0064e1" />
        </View>
      </View>
    );
  }

  searchPokemon = async () => {
    try {
      const pokemonID = pokemonUtils.getId(this.state.searchInput); // check if the entered Pokémon name is valid

      // start loading
      this.props.setCallerLoadingStatus(true);

      // const { data: pokemonDetail } = await axios.get<PokemonDetailResponse>(
      //   `${POKE_API_BASE_URL}/pokemon/${pokemonID}`
      // );

      const pokemonDetail = await getPokemonDetail(pokemonID)
      if (!pokemonDetail) {
        throw new Error("retrieved pokemon is null")
      }

      const pokemonSpeciesDetail = await getPokemonSpecieDetail(pokemonID)
      if (!pokemonSpeciesDetail) {
        throw new Error("retrieved pokemon species is null")
      }

      this.props.setCallerPokemonInst({
        id: pokemonID,
        name: pokemonDetail.name,
        pic: pokemonDetail.sprites.front_default,
        types: this.mapAPITypesToPokemonTypes(pokemonDetail.types),
        desc: this.getDescription(pokemonSpeciesDetail.flavor_text_entries),
      });
    } catch (err) {
      Alert.alert("Error", "Pokémon not found");
    } finally {
      // load done
      this.props.setCallerLoadingStatus(false);
    }
  };

  getDescription = (entries) =>
    entries.find((item) => item.language.name === "en").flavor_text;

  /**
   * Maps API types to Pokémon type slots.
   * @param apiTypes - a list of brief pokemon types extracted from API response
   * @returns An array of Pokémon type slots.
   */
  mapAPITypesToPokemonTypes = (
    apiTypes: PokemonTypeBriefResponse[]
  ): PokemonType[] => {
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
  textInput: {
    height: 35,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5,
  },
});

export default SearchPokemon;
