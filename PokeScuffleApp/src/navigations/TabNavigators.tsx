import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from '../constants/Colors';
import PokeAboutTab from '../components/organisms/PokeAboutTab';
import { PokeStatsTab } from '../components/organisms/PokeStatsTab';
import { PokeEvolutionTab } from '../components/organisms/PokeEvolutionTab';
import { PokeMovesTab } from '../components/organisms/PokeMovesTab';


const Tab = createMaterialTopTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.tabIndicator, },
        tabBarLabelStyle: { textTransform: 'capitalize' },
        tabBarStyle: { elevation: 1 },
      }}
    >
      <Tab.Screen name="About" component={PokeAboutTab} />
      <Tab.Screen name="Stats" component={PokeStatsTab} />
      <Tab.Screen name="Evolution" component={PokeEvolutionTab} />
      <Tab.Screen name="Moves" component={PokeMovesTab} />
    </Tab.Navigator>
  )
}