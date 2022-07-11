import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import useUserService from '../hooks/useUserService';
import { styles } from '../styles';

const Profile = () => {
  const { user, logOut } = useUserService()

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.brandView}>
        <Ionicons name="person-circle" size={60} color="black" />
        <Text style={styles.brandViewText}>Profile</Text>
      </View>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: 'white', fontSize: 34 }}>Your Profile:</Text>
          {/* Form inputs */}
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="person-circle-outline" size={25} color="black" />
              <Text>Email: {user?.email}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-outline" size={25} color="black" />
              <Text>Location:</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity onPress={async () => await logOut()} style={styles.btn}>
                <Text style={{ fontSize: 18 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile
