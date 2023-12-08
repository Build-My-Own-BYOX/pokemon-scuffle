import { useContext, useEffect, useState } from "react"
import { POKE_API_SERVICE } from "../constants/APIs";
import {
  PokemonDetailResponse,
  PokemonSpeciesDetailResponse,
} from "../types/PokemonAPIResponse";
import { Store } from "../context/store";
import { RequestStatus } from "../types/RequestStatus";
import { Pokemon } from "../types/Pokemon";
import { Species } from "../types/Species";
import { mapToAbout } from "../utils/mapper";

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
    const response = await POKE_API_SERVICE.get(
      `/pokemon-species/${pokemonID}`
    );
    return response.data;
  } catch (error) {
    console.warn("Error retrieving Pokemon species detail:", error);
    return null;
  }
};

const usePokemon = (id: string) => {
  const { dispatch } = useContext(Store);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const getPokemonInfo = async () => {
    setStatus("loading");
    try {
      const getAbout = POKE_API_SERVICE.get<Pokemon>(`/pokemon/${id}`);
      const getSpecies = POKE_API_SERVICE.get<Species>(
        `/pokemon-species/${id}`
      );
      const getEvolution = POKE_API_SERVICE.get(
        (await getSpecies).data.evolution_chain.url
      );

      const [about, species, evolution] = await Promise.all([
        getAbout,
        getSpecies,
        getEvolution,
      ]);

      if (!dispatch) {
        console.error("Dispatch is not defined: ", dispatch);
        return; // or handle the error appropriately
      }
      
      dispatch({
        type: "SET_ABOUT",
        payload: mapToAbout(about.data, species.data),
      });
      dispatch({ type: "SET_STATS", payload: about.data.stats });
      dispatch({ type: "SET_EVOLUTION", payload: evolution.data });
      dispatch({ type: "SET_MOVES", payload: about.data.moves });
      
      setPokemon(about.data);
      setStatus("success");
    } catch (error) {
      console.log(error)
      setPokemon(null);
      setStatus("error");
    }
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  return { pokemon, status };
};

export { getPokemonDetail, getPokemonSpeciesDetail, usePokemon };
