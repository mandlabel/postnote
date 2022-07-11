import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { db, GeoPoint, Timestamp } from '../config/firebase';
import useUserService from '../hooks/useUserService';
import { SplashScreen } from './';

export type CurrentLocation = {
  latitude: number
  longitude: number
}

export interface IPost {
  id?: string
  message: string
  createdBy: string
  createdAt: Timestamp
  coords: GeoPoint
}

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState<IPost[]>([]) // posts
  const { user } = useUserService()
  const [homeLocation, setHomeLocation] = useState<CurrentLocation>() // temp

  const markerPress = ({ id, message, createdAt, createdBy }) => {
    navigation.navigate('Note', {
      id,
      message,
      createdAt,
      createdBy,
    })
  }
  const getPosts = async () => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          message: doc.data().message,
          createdAt: doc.data().createdAt,
          createdBy: doc.data().createdBy,
          coords: doc.data().coords,
        }))
      )
    })
  }

  useEffect(() => {
    getPosts()
    console.log(posts)
  }, [])

  // Global location
  useEffect(() => {
    const getLoc = async () => {
      const status = await Location.requestForegroundPermissionsAsync()
      if (status.granted === false) {
        navigation.navigate('Home')
      }
      const { coords } = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = coords

      setHomeLocation({ latitude, longitude })
      console.log(`Location changed to: ${JSON.stringify(homeLocation)}`)
    }
    getLoc()
  }, [])

  if (!homeLocation) return <SplashScreen />

  return (
    <View>
      {homeLocation && (
        <MapView
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          showsUserLocation
          region={{
            latitude: homeLocation.latitude,
            longitude: homeLocation.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.05,
          }}>
          {posts.map((post) => (
            <Marker
              key={post.id}
              coordinate={{
                latitude: post.coords.latitude,
                longitude: post.coords.longitude,
              }}
              description={post.createdBy}
              onPress={() =>
                markerPress({
                  id: post.id,
                  message: post.message,
                  createdAt: post.createdAt,
                  createdBy: post.createdBy,
                })
              }>
              {post.createdBy === user?.uid ? (
                <>
                  <Image
                    source={require('../assets/myflag.png')}
                    style={{ height: 50, width: 50 }}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require('../assets/marker.png')}
                    style={{ height: 50, width: 50 }}
                  />
                </>
              )}
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  )
}

export default Home
