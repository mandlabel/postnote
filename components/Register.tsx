import React, { useMemo, useState } from 'react';
import { Dimensions, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { Ionicons } from '@expo/vector-icons';

import useUserService from '../hooks/useUserService';
import { styles } from '../styles';
import { AuthMethod } from '../utils/UserContext';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { register } = useUserService()

  const handleRegister = async () => {
    const res = await register(AuthMethod.EMAIL_AND_PASSWORD, { email, password })

    Toast.show(res.result, {
      duration: res.success ? Toast.durations.SHORT : Toast.durations.LONG,
    })

    setEmail('')
    setPassword('')
  }

  const canRegister = useMemo(() => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return new RegExp(re).test(email) && password === password2
  }, [email])

  return (
    <View style={{ flex: 1, backgroundColor: '#fbd9e3' }}>
      <ImageBackground
        source={require('../assets/writing-app.png')}
        style={{ height: Dimensions.get('window').height / 2.5 }}>
        <View style={styles.brandView}>
          <Ionicons name="location" size={100} color="black" />
          <Text style={styles.brandViewText}>PostNote</Text>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: 'white', fontSize: 34 }}>Hi {email.split('@')[0]}!</Text>
          {/* Form inputs */}
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Ionicons name="person-circle-outline" size={30} color="black" />
              <TextInput
                style={styles.input}
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="key-outline" size={30} color="black" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="key-outline" size={30} color="black" />
              <TextInput
                style={styles.input}
                value={password2}
                onChangeText={setPassword2}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={async () => await handleRegister()}
                disabled={!canRegister}
                style={canRegister ? styles.btn : { ...styles.btn, backgroundColor: '#D3D3D3' }}>
                <Text style={{ fontSize: 18 }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default Register
