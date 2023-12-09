import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { colors } from '../../constants/Colors'

export const Spinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator color={colors.red} size={30} />
    </View>
  )
}