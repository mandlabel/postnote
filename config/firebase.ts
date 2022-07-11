import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import Constants from 'expo-constants';
import firebase from 'firebase/app';
import * as geofirestore from 'geofirestore';

// @ts-ignore: firebaseConfig exists
const { firebaseConfig } = Constants.manifest.extra

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
const GeofireStore = geofirestore.initializeApp(db)
export type GeoPoint = firebase.firestore.GeoPoint
export type Timestamp = firebase.firestore.Timestamp
export type User = firebase.User
export const geocollection = GeofireStore.collection('locations')
export const storage = firebase.storage().ref()
export default firebase
