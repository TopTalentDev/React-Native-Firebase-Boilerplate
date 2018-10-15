import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import ReduxStore from './redux';
import styles from './AppStyles';
import { runAppConfiguration } from './AppConfig';
import { AppNavigator } from './navigators';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

runAppConfiguration();

export default class App extends Component {
  render() {
    return (
      <ReduxStore>
        <AppNavigator />
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </ReduxStore>
    );
  }
}
