import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/es/integration/react';
import getCombinedReducers from './reducers';
import sagas from './sagas';

const logger = createLogger({
  predicate: () => __DEV__
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(getCombinedReducers(), {}, compose(applyMiddleware(sagaMiddleware, logger)));
const persistor = persistStore(store, { throttle: 2000 });

sagaMiddleware.run(sagas);

export default class ReduxStore extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>{this.props.children}</PersistGate>
      </Provider>
    );
  }
}

ReduxStore.propTypes = {
  children: PropTypes.any
};
