import React, { Component } from 'react';
import { ReduxStore } from './redux/ReduxStore';
import { ScreenMainContainer } from './containers/ScreenMainContainer';

export default class App extends Component {
  render() {
    return (
      <ReduxStore>
        <ScreenMainContainer />
      </ReduxStore>
    );
  }
}
