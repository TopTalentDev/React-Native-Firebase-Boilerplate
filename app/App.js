import React, { Component } from 'react';
import ReduxStore from './redux';
import { AppNavigator } from './navigators';

export default class App extends Component {
  render() {
    return (
      <ReduxStore>
        <AppNavigator />
      </ReduxStore>
    );
  }
}
