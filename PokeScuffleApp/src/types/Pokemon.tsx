export type Pokemon = {
    id: number
    name: string
    pic: string
    desc: string
    types: PokemonType[]
}

// 20 types, obtained from https://pokeapi.co/api/v2/type
export type PokemonType = {
    id: number
    name: string // type name, e.g., dragon, fairy, shadow
    url: string // api to get detail information of the pokemon type
}