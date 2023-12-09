import axios from "axios"

const POKE_API = "https://pokeapi.co/api/v2"

export const POKE_API_SERVICE = axios.create({
    baseURL: POKE_API
})

export const pokemonSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'