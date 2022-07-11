import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';

import { auth, User } from '../config/firebase';

export interface FirebaseResult {
  result: string
  success: boolean
}

export enum AuthMethod {
  EMAIL_AND_PASSWORD,
  TOKEN,
}

interface IUserContext {
  user: User | null
  logOut: () => Promise<FirebaseResult>
  logIn: (authMethod: AuthMethod, payload: any) => Promise<FirebaseResult>
  register: (authMethod: AuthMethod, payload: any) => Promise<FirebaseResult>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  logOut: () => {
    throw new Error('Not implemented.')
  },
  logIn: (authMethod: AuthMethod, payload: any) => {
    throw new Error('Not implemented.')
  },
  register: (authMethod: AuthMethod, payload: any) => {
    throw new Error('Not implemented.')
  },
})

type Children = {
  children: JSX.Element | JSX.Element[]
}

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const initialize = async () => {
      let userToken
      try {
        userToken = await SecureStore.getItemAsync('userToken')
        await logIn(AuthMethod.TOKEN, userToken)
      } catch (error) {
        userToken = null
      } finally {
      }
    }
    initialize()
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((param: User | null) => {
      setUser(param)
    })

    return () => unsubscribe()
  }, [])

  const logIn = async (authMethod: AuthMethod, payload: any) => {
    let loginResult: FirebaseResult
    switch (authMethod) {
      case AuthMethod.EMAIL_AND_PASSWORD: {
        const castedPayload = payload as { email: string; password: string }
        loginResult = await auth
          .signInWithEmailAndPassword(castedPayload.email, castedPayload.password)
          .then(async (cred) => {
            const token = await cred.user?.getIdToken()
            await SecureStore.setItemAsync('userToken', token as string)
            return { result: 'Login succeded.', success: true }
          })
          .catch((error) => {
            return { result: error.message as string, success: true }
          })
        break
      }
      case AuthMethod.TOKEN: {
        const token = payload as string

        loginResult = await auth
          .signInWithCustomToken(token)
          .then((_) => {
            return { result: 'Login succeeded.', success: true }
          })
          .catch(async (error) => {
            await SecureStore.deleteItemAsync('userToken')
            return { result: error.message as string, success: false }
          })
      }
    }
    return loginResult
  }

  const logOut = async () => {
    const res = await auth
      .signOut()
      .then(async (_) => {
        await SecureStore.deleteItemAsync('userToken')
        return { result: 'Logout succeeded.', success: true }
      })
      .catch((error) => {
        return { result: error.message as string, success: false }
      })
    return res
  }

  const register = async (authMethod: AuthMethod, payload: any) => {
    let registerResponse: FirebaseResult | undefined = undefined
    switch (authMethod) {
      case AuthMethod.EMAIL_AND_PASSWORD:
        const castedPayload = payload as { email: string; password: string }
        registerResponse = await auth
          .createUserWithEmailAndPassword(castedPayload.email, castedPayload.password)
          .then(async (user) => {
            return {
              result: 'Registration successful.',
              success: true,
            }
          })
          .catch((err) => {
            return { result: err.message, success: false }
          })
        break
    }
    return registerResponse as FirebaseResult
  }

  return (
    <UserContext.Provider value={{ user, logOut, logIn, register }}>
      {children}
    </UserContext.Provider>
  )
}
