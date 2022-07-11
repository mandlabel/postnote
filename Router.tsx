import React from 'react';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, SplashScreen } from './components';
import AddItem from './components/AddItem';
import Edit from './components/Edit';
import Login from './components/Login';
import Note from './components/Note';
import Profile from './components/Profile';
import Register from './components/Register';
import useUserService from './hooks/useUserService';

const Stack = createNativeStackNavigator()
const Nav = createBottomTabNavigator()

const HomeStack = () => (
  <Nav.Navigator
    screenOptions={({ route }) => ({
      headerStyle: {
        borderRadius: 30,
      },
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 5,
        height: 70,
        position: 'absolute',
        bottom: 20,
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline'
          color = 'pink'
        } else if (route.name === 'Home') {
          iconName = focused ? 'planet' : 'planet-outline'
          color = 'pink'
        } else if (route.name === 'AddItem') {
          iconName = focused ? 'pencil' : 'pencil-outline'
          color = 'pink'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Nav.Screen name="AddItem" component={AddItem} options={{ title: 'Write Note' }} />
    <Nav.Screen name="Home" component={Home} options={{ title: 'Map', headerShown: false }} />
    <Nav.Screen name="Profile" component={Profile} options={{ title: 'My Profile' }} />
  </Nav.Navigator>
)

const Router = () => {
  const { user } = useUserService()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Root" component={HomeStack} options={{ headerShown: false }} />
            <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
            <Stack.Screen name="Note" component={Note} options={{ headerShown: true }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
