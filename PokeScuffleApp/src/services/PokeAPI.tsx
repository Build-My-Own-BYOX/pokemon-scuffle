import { POKE_API_SERVICE } from "../constants/APIs";
import { PokemonDetailResponse, PokemonSpeciesDetailResponse } from "../types/PokemonAPIResponse";

const getPokemonDetail = async (
  pokemonID: number
): Promise<PokemonDetailResponse | null> => {
  try {
    const response = await POKE_API_SERVICE.get(`/pokemon/${pokemonID}`);
    return response.data;
  } catch (error) {
    console.warn("Error retrieving Pokemon detail:", error);
    return null;
  }
};

const getPokemonSpeciesDetail = async (
  pokemonID: number
): Promise<PokemonSpeciesDetailResponse | null> => {
  try {
    const response = await POKE_API_SERVICE.get(`/pokemon-species/${pokemonID}`);
    return response.data;
  } catch (error) {
    console.warn("Error retrieving Pokemon species detail:", error);
    return null;
  }
};

export { getPokemonDetail, getPokemonSpeciesDetail };
