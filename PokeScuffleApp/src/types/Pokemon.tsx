export type Pokemon = {
    id: number
    name: string
    pic: string
    desc: string
    types: PokemonType[]
}

export type PokemonType = {
    id: number
    name: string
    url: string
}