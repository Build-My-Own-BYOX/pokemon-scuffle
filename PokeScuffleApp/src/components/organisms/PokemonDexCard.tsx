import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { PokemonCustom } from '../../types/PokemonList';
import { PokemonDexBuildCard } from '../molecules/PokemonDexBuildCard';
import { getImageColors } from '../../utils/getColors';
import { PokeDetailScreenName } from '../../constants/Screens';
import { Pokemon } from '../../types/Pokemon';

type Props = {
    item: PokemonCustom,
}
const DEFAULT_COLOR = '#f5f5f5'

const PokemonDexCard = ({ item }: Props) => {
    const [background, setBackground] = useState(DEFAULT_COLOR)
    const { picture, name, id } = item
    const { navigate } = useNavigation()

    const getPictureColors = useCallback(
        async () => {
            // TODO: fix error "cannot find native module getColor"
            // const [primary = DEFAULT_COLOR] = await getImageColors(picture)
            const primary = '#f44336'
            setBackground(primary)
        },
        [picture],
    )

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            getPictureColors()
        }

        return () => {
            isMounted = false
        }
    }, [])

    if (background === DEFAULT_COLOR) {
        return <PokemonDexBuildCard id={id} name={name} pokeballColor='gray' />
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                navigate(PokeDetailScreenName, {
                    pokemonInst: {
                        id: parseInt(item.id, 10), 
                        name: item.name,
                        pic: item.picture,
                    } as Pokemon,
                }
                )
            }}
        >
            <PokemonDexBuildCard id={id} name={name} color='#fff' backgroundColor={background}>
                <Image source={{ uri: picture }} style={styles.img} />
            </PokemonDexBuildCard>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        position: 'absolute',
        bottom: -15,
        right: -10,
        zIndex: 1
    }
})

export const PokedexItem = React.memo(PokemonDexCard)