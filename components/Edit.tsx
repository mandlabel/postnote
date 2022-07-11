import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { db } from '../config/firebase';
import { styles } from '../styles';

const Edit = ({
  route: {
    params: { id },
  },
  navigation,
}) => {
  const [newMessage, setNewMessage] = useState('')

  const handleUpdate = async () => {
    await db
      .collection('posts')
      .doc(id)
      .update({ message: newMessage })
      .then(() => {
        Toast.show('Post has been edited suffesfully!', { duration: Toast.durations.SHORT })
        navigation.navigate('Home')
      })
      .catch((err) => {
        Toast.show(err.message, { duration: Toast.durations.LONG })
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="edit post message"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Submit" color="pink" onPress={handleUpdate}></Button>
      <Button title="Back" onPress={() => navigation.replace('Root')}></Button>
    </View>
  )
}
export default Edit
