import React from 'react'
import { ScrollView } from 'react-native';

import { useEvolution } from '../../hooks/useEvolution';
import { EvolutionGroup } from '../molecules/PokemonEvolution';
import PokeNotFound from './PokeNotFound';

export const PokeEvolutionTab = () => {
  const { evolutions } = useEvolution()

  const hasNoEvolutions = evolutions.length <= 1
  const hasTwoEvolution = evolutions.length > 2

  if (hasNoEvolutions) {
    return <PokeNotFound message='No evolutions found.' />
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      <EvolutionGroup evolutions={evolutions} positions={[0, 1]} />
      {hasTwoEvolution && (
        <EvolutionGroup evolutions={evolutions} positions={[1, 2]} />
      )}
    </ScrollView>
  )
}