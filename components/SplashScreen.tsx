import React from 'react'
import { Image, View } from 'react-native'
import { styles } from '../styles'

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image style={styles.logo} source={require('../assets/loader.png')} />
  </View>
)

export default SplashScreen
