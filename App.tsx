import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Router from './Router';
import { UserProvider } from './utils/UserContext';

export default function App() {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <UserProvider>
          <StatusBar style="auto" />
          <Router />
        </UserProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  )
}
