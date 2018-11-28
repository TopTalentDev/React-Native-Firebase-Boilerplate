import { StorageActionTypes } from '../actionTypes';
import { StorageAction } from '../actions/storage';
import { Reducer } from 'redux';

export interface StorageState {
  local: {[key: string]: string}
  remote: {[key: string]: string}
  isProcessing: boolean
}

export const storage: Reducer<StorageState, StorageAction> = (state={local:{}, remote: {}, isProcessing: false}, action) => {
  switch (action.type) {
    case StorageActionTypes.STORAGE_LOCAL_URI_SET:
      return { ...state, local: {...state.local, ...{ [action.payload.key]: action.payload.uri }} };
    case StorageActionTypes.STORAGE_REMOTE_URI_SET:
      return { ...state, remote: {...state.remote, ...{ [action.payload.key]: action.payload.uri }} };
    case StorageActionTypes.STORAGE_IS_PROCESSING_SET:
      return { ...state, isProcessing: action.payload };
  }
  return state;
}

