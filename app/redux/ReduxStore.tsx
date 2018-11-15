import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose, Store } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
import getCombinedReducers from './reducers';
import sagas from './sagas';
import { requestAppInitialize } from './actions/app';

const logger = createLogger({
  predicate: () => __DEV__
});
const sagaMiddleware = createSagaMiddleware();
const store: Store = createStore(getCombinedReducers(), {}, compose(applyMiddleware(sagaMiddleware, logger)));
const persistor: Persistor = persistStore(store, { throttle: 2000 }, () => store.dispatch(requestAppInitialize()));

sagaMiddleware.run(sagas);

export interface Props {
  children: any
}

export class ReduxStore extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>{this.props.children}</PersistGate>
      </Provider>
    );
  }
}
