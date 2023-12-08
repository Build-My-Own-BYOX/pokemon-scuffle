import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { colors } from '../constants/Colors';
import PokeAboutTab from '../components/organisms/PokeAboutTab';


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
    </Tab.Navigator>
  )
}