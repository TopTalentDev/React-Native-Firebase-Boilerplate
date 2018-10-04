import { Dimensions, StyleSheet } from 'react-native';
import fonts from '../theme/fonts';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#273142',
    height: height,
    elevation: 10
  },
  header: {
    flexDirection: 'row',
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: '#212B36'
  },
  login: {
    flex: 1,
    paddingLeft: 13,
    alignItems: 'center',
    flexDirection: 'row'
  },
  userAvatar: {
    margin: 6,
    width: 32,
    height: 32
  },
  identity: {
    marginLeft: 13
  },
  grettingLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.regular
  },
  nameLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.semibold
  },
  settingsButton: {
    alignSelf: 'flex-end',
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingsIcon: {
    width: 30,
    height: 30
  },
  list: {
    flex: 1,
    backgroundColor: '#273142'
  }
});

export default styles;
