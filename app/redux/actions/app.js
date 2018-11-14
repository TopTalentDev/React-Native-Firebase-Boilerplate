import {
  APP_INITIALIZE_REQUEST,
  APP_INITIALIZED_SET,
  APP_INITIALIZE_ERROR,
  ERROR_CLEAR,
  ERROR_CLEAR_ALL
} from '../actionTypes';

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

export function clearError(key) {
  return {
    type: ERROR_CLEAR,
    payload: key
  };
}

export function clearAllErrors() {
  return {
    type: ERROR_CLEAR_ALL
  };
}
