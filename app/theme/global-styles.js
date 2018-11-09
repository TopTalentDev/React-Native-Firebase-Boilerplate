import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const containers = StyleSheet.create({
  containerMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    flex: 1
  }
});

export const layout = StyleSheet.create({
  w100: { width: '100%' }
});

export const flexbox = StyleSheet.create({
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnCentered: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const elevations = StyleSheet.create({
  e_10: {
    elevation: 10
  }
});
