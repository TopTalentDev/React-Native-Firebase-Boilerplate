import { APP_INITIALIZE_REQUEST, APP_INITIALIZED_SET, APP_INITIALIZE_ERROR } from '../actionTypes';

export function requestAppInitialize() {
  return {
    type: APP_INITIALIZE_REQUEST
  };
}

export function setAppInitializeError(error) {
  return {
    type: APP_INITIALIZE_ERROR,
    payload: error
  };
}

export function setAppAsInitialized() {
  return {
    type: APP_INITIALIZED_SET
  };
}
