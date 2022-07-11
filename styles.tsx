import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    height: 40,
    opacity: 0.8,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
  },
  logo: {
    width: 50,
    height: 100,
  },
  list: {
    width: '100%',
  },
  postbox: {
    height: 200,
  },
  postbox_message: {
    width: '80%',
    padding: 10,
  },
  postbox_footer: {
    fontSize: 12,
  },
  arrows: {
    marginLeft: 30,
  },
  // Login Page:
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: 'pink',
    zIndex: -1,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    height: Dimensions.get('window').height,
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    height: 40,
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
    justifyContent: 'center',
  },
  notebtn: {
    width: Dimensions.get('window').width / 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 40,

    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
    marginLeft: 20,
  },
})
