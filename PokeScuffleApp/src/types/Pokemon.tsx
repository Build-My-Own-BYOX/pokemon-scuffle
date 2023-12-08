export type Pokemon = {
    id: number
    name: string
    pic: string
    desc: string
    height: number
    weight: number
    stats: Stat[]
    moves: Move[]
    abilities: Ability[]
    types: PokemonType[]
}

// 20 types, obtained from https://pokeapi.co/api/v2/type
export type PokemonType = {
    id: number
    name: string // type name, e.g., dragon, fairy, shadow
    url: string // api to get detail information of the pokemon type
}

export type Ability = {
    is_hidden: boolean
    slot: number
    ability: SpeciesCustom
}

export type SpeciesCustom = {
    name: string
    url: string
}

export type Move = {
    move: SpeciesCustom
    version_group_details: VersionGroupDetail[]
}

export type VersionGroupDetail = {
    level_learned_at: number
    version_group: SpeciesCustom
    move_learn_method: SpeciesCustom
}

export type Stat = {
    base_stat: number
    effort: number
    stat: SpeciesCustom
}