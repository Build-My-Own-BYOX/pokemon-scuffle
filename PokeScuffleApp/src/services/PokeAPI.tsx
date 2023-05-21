import { POKE_API_SERVICE } from "../constants/APIs";
import { PokemonDetailResponse, PokemonSpecieDetailResponse } from "../types/PokemonAPIResponse";

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

const getPokemonSpecieDetail = async (
  pokemonID: number
): Promise<PokemonSpecieDetailResponse | null> => {
  try {
    const response = await POKE_API_SERVICE.get(`/pokemon-species/${pokemonID}`);
    return response.data;
  } catch (error) {
    console.warn("Error retrieving Pokemon species detail:", error);
    return null;
  }
};

export { getPokemonDetail, getPokemonSpecieDetail };
