import 'dotenv/config'

export default {
  expo: {
    name: 'PostNote',
    slug: 'PostNote',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/loader.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      firebaseConfig: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
      },
    },
    packagerOpts: {
      sourceExts: ['ts', 'tsx'],
      transformer: 'node_modules/react-native-typescript-transformer/index.js',
    },
  },
}
