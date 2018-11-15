import {
  AppActionTypes,
  ErrorActionTypes
} from '../actionTypes';
import { ActionCreator, Action } from 'redux';

export interface RequestAppInitialize extends Action {
  type: AppActionTypes.APP_INITIALIZE_REQUEST
}

export interface SetAppInitializeError extends Action {
  type: AppActionTypes.APP_INITIALIZE_ERROR
  payload: string
}

export interface SetAppAsInitialized extends Action {
  type: AppActionTypes.APP_INITIALIZED_SET
}

export interface ClearError extends Action {
  type: ErrorActionTypes.ERROR_CLEAR
}

export interface ClearAllErrors extends Action {
  type: ErrorActionTypes.ERROR_CLEAR_ALL
}

export type AppAction = RequestAppInitialize | SetAppInitializeError | SetAppAsInitialized;
export type ErrorAction = ClearError | ClearAllErrors;

export const requestAppInitialize: ActionCreator<RequestAppInitialize> = () => {
  return {
    type: AppActionTypes.APP_INITIALIZE_REQUEST
  };
}

export const setAppInitializeError: ActionCreator<SetAppInitializeError> = (error: string) => {
  return {
    type: AppActionTypes.APP_INITIALIZE_ERROR,
    payload: error
  };
}

export const setAppAsInitialized: ActionCreator<SetAppAsInitialized> = () => {
  return {
    type: AppActionTypes.APP_INITIALIZED_SET
  };
}

export const clearError: ActionCreator<ClearError> = (key) => {
  return {
    type: ErrorActionTypes.ERROR_CLEAR,
    payload: key
  };
}

export const clearAllErrors: ActionCreator<ClearAllErrors> = () => {
  return {
    type: ErrorActionTypes.ERROR_CLEAR_ALL
  };
}
