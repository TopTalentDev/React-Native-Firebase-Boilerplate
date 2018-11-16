import {
  AppActionTypes,
  ErrorActionTypes
} from '../actionTypes';
import { Action } from 'redux';

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
  payload: string
}

export interface ClearAllErrors extends Action {
  type: ErrorActionTypes.ERROR_CLEAR_ALL
}

export type AppAction = RequestAppInitialize | SetAppInitializeError | SetAppAsInitialized;
export type ErrorAction = ClearError | ClearAllErrors;

export const requestAppInitialize = (): RequestAppInitialize => {
  return {
    type: AppActionTypes.APP_INITIALIZE_REQUEST
  };
}

export const setAppInitializeError = (error: string): SetAppInitializeError => {
  return {
    type: AppActionTypes.APP_INITIALIZE_ERROR,
    payload: error
  };
}

export const setAppAsInitialized = (): SetAppAsInitialized => {
  return {
    type: AppActionTypes.APP_INITIALIZED_SET
  };
}

export const clearError = (key: string): ClearError => {
  return {
    type: ErrorActionTypes.ERROR_CLEAR,
    payload: key
  };
}

export const clearAllErrors = (): ClearAllErrors => {
  return {
    type: ErrorActionTypes.ERROR_CLEAR_ALL
  };
}
