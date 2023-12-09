import { useContext, useEffect, useRef, useState } from "react"

import { POKE_API_SERVICE, pokemonSprite } from "../constants/APIs";
import { Store } from "../context/store";

import { RequestStatus } from "../types/RequestStatus";
import { PokemonCustom, PokemonsResponse, Result } from "../types/PokemonList";

export const usePokemons = () => {
    const [status, setStatus] = useState<RequestStatus>('idle')
    const [pokemons, setPokemons] = useState<PokemonCustom[]>([])
    const { dispatch } = useContext(Store)

    const urlAllPokemons = useRef(`${POKE_API_SERVICE.getUri()}/pokemon?limit=20`)

    const buildPokemonCustom = (list: Result[]) => {
        setStatus('loading')

        const appendPokemons: PokemonCustom[] = list.map(({ name, url }) => {
            const urlSplit = url.split('/')
            const id = urlSplit[urlSplit.length - 2]
            const picture = `${pokemonSprite}/${id}.png`

            return { id, picture, name }
        })
        
        setPokemons([...pokemons, ...appendPokemons])
        dispatch({type: 'SET_POKEMONS', payload: [...pokemons, ...appendPokemons]})
        setStatus('success')
    }

    const getPokemons = async () => {
        try {
            const response = await POKE_API_SERVICE.get<PokemonsResponse>(urlAllPokemons.current)
            urlAllPokemons.current = response.data.next
            buildPokemonCustom(response.data.results)
        } catch (error) {
            setPokemons([])
            setStatus('error')
        }
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) { getPokemons() }

        return () => {
            isMounted = false
        }
    }, [])

    return { pokemons, status, getPokemons }
}