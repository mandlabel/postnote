import * as Location from 'expo-location';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import MapView from 'react-native-maps';
import Toast from 'react-native-root-toast';

import { Ionicons } from '@expo/vector-icons';

import { db } from '../config/firebase';
import useUserService from '../hooks/useUserService';
import { styles } from '../styles';
import { SplashScreen } from './';
import { CurrentLocation } from './Home';

const AddItem = ({ navigation }) => {
  const [message, setMessage] = useState('')

  // Location

  const [userLoc, setUserLoc] = useState<CurrentLocation>()

  const { user } = useUserService()
  const addMessage = async () => {
    await db
      .collection('posts')
      .add({
        coords: new firebase.firestore.GeoPoint(
          userLoc?.latitude as number,
          userLoc?.longitude as number
        ),
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        createdBy: user?.email,
        message: message,
      })
      .then(() => {
        Toast.show('Succesful post creation!', { duration: Toast.durations.SHORT })
        navigation.navigate('Home')
      })
      .catch((err) => {
        Toast.show(err.message, { duration: Toast.durations.LONG })
      })
  }

  useEffect(() => {
    const getLoc = async () => {
      const status = await Location.requestForegroundPermissionsAsync()
      if (status.granted === false) {
        navigation.navigate('Home')
      }
      const { coords } = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = coords

      setUserLoc({ latitude, longitude })
    }
    getLoc()
  }, [])

  if (!userLoc) return <SplashScreen />

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <MapView
        style={{ height: Dimensions.get('window').height / 2.5 }}
        showsUserLocation
        region={{
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.05,
        }}></MapView>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: 'white', fontSize: 34 }}>Add Note</Text>
          <Text>Type your message:</Text>
          {/* Form inputs */}
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Ionicons name="add-outline" size={30} color="black" />
              <AutoGrowingTextInput
                style={styles.input}
                value={message}
                keyboardType="email-address"
                onChangeText={setMessage}
                placeholder="Your message"
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity onPress={addMessage} style={styles.btn}>
                <Text style={{ fontSize: 18 }}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default AddItem
