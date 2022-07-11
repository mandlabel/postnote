import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { Ionicons } from '@expo/vector-icons';

import { db } from '../config/firebase';
import useUserService from '../hooks/useUserService';
import { styles } from '../styles';

const Note = ({
  route: {
    params: { id, message, createdBy, createdAt },
  },
  navigation,
}) => {
  const { user } = useUserService()

  const deletePost = async (id: string) => {
    await db
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        Toast.show('Delete post successfully!', {
          duration: Toast.durations.SHORT,
        })
        navigation.navigate('Home')
      })
      .catch((err) => {
        Toast.show(err.message, {
          duration: Toast.durations.SHORT,
        })
      })
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.brandView}>
        <Ionicons name="location" size={60} color="black" />
        <Text style={styles.brandViewText}>Note</Text>
      </View>
      <View style={styles.bottomView}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: 'white', fontSize: 34 }}>Note:</Text>
          {/* Data */}
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="mail-outline" size={30} color="black" style={{ paddingRight: 10 }} />
              <Text style={{ fontSize: 20 }}>{message}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>created By:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="black"
                style={{ paddingRight: 10 }}
              />
              <Text style={{ fontSize: 16 }}>{createdBy}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>created At:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="time-outline" size={30} color="black" style={{ paddingRight: 10 }} />
              <Text style={{ fontSize: 16 }}>{createdAt.toDate().toDateString()}</Text>
            </View>
            {createdBy === user?.uid && (
              <>
                <View style={{ justifyContent: 'center', marginTop: 30, flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Edit', { id: id })}
                    style={styles.notebtn}>
                    <Text style={{ fontSize: 18 }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletePost(id)} style={styles.notebtn}>
                    <Text style={{ fontSize: 18 }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Note
