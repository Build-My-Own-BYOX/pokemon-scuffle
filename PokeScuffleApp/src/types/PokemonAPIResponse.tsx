
// GET /pokemon/{param1}/
// https://pokeapi.api-docs.io/v2.0/pokemon/cGhCjX5rx9jc4Y4vh
export type PokemonDetailResponse = {
    id: number
    name: string
    sprites: {
        front_default: string
    }
    types: PokemonTypeBriefResponse[]
}

// extracted from PokemonDetailResponse: GET /pokemon/{param1}/
export type PokemonTypeBriefResponse = {
    slot: number // starting from 1, because a pokemon could have many types
    type: {
        name: string // pokemon type
        url: string // api to get details of this pokemon type
    }
}

export type PokemonSpecieDetailResponse = {
    flavor_text_entries: [
        {
            flavor_text: string
            language: {
                name: string
            }
        }
    ]
}