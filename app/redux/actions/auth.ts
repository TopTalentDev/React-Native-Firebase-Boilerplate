import {
  AuthActionTypes
} from '../actionTypes';
import { Action, ActionCreator } from 'redux';

export interface RequestLogout extends Action {
  type: AuthActionTypes.AUTH_LOGOUT_REQUEST
}

export interface RequestLogin extends Action {
  type: AuthActionTypes.AUTH_LOGIN_REQUEST
  payload: {email: string, password: string}
}

export interface SetAuthError extends Action {
  type: AuthActionTypes.AUTH_ERROR_SET
  payload: string
}

export interface SetAuthChange extends Action {
  type: AuthActionTypes.AUTH_STATE_CHANGE_SET
  payload: any
}

export interface SetAdditionalUserInfo extends Action {
  type: AuthActionTypes.AUTH_ADDITIONAL_USER_INFO_SET
  payload: any
}

export interface RequestFacebookLogin extends Action {
  type: AuthActionTypes.AUTH_FACEBOOK_LOGIN_REQUEST
}

export interface RequestAnonymousLogin extends Action {
  type: AuthActionTypes.AUTH_ANONYMOUS_LOGIN_REQUEST
}

export interface RequestUserCreateWithEmailAndPassword extends Action {
  type: AuthActionTypes.AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST
  payload: {email: string, password: string}
}

export type AuthAction = RequestAnonymousLogin | RequestUserCreateWithEmailAndPassword | RequestFacebookLogin | SetAdditionalUserInfo | SetAuthChange | SetAuthError | RequestLogin | RequestLogout;

export const requestAnonymousLogin: ActionCreator<RequestAnonymousLogin> = () => {
  return {
    type: AuthActionTypes.AUTH_ANONYMOUS_LOGIN_REQUEST
  };
}

export const requestUserCreateWithEmailAndPassword: ActionCreator<RequestUserCreateWithEmailAndPassword> = (email: string, password: string) => {
  return {
    type: AuthActionTypes.AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST,
    payload: { email, password }
  };
}

export const requestFacebookLogin: ActionCreator<RequestFacebookLogin> = () => {
  return {
    type: AuthActionTypes.AUTH_FACEBOOK_LOGIN_REQUEST
  };
}

export const setAdditionalUserInfo: ActionCreator<SetAdditionalUserInfo> = (data: any) => {
  return {
    type: AuthActionTypes.AUTH_ADDITIONAL_USER_INFO_SET,
    payload: data
  };
}

export const setAuthChange: ActionCreator<SetAuthChange> = (user: any) => {
  return {
    type: AuthActionTypes.AUTH_STATE_CHANGE_SET,
    payload: user
  };
}

export const setAuthError: ActionCreator<SetAuthError> = (error: string) => {
  return {
    type: AuthActionTypes.AUTH_ERROR_SET,
    payload: error
  };
}

export const requestLogin: ActionCreator<RequestLogin> = (email: string, password: string) =>  {
  return {
    type: AuthActionTypes.AUTH_LOGIN_REQUEST,
    payload: { email, password }
  };
}

export const requestLogout: ActionCreator<RequestLogout>  = () => {
  return {
    type: AuthActionTypes.AUTH_LOGOUT_REQUEST
  };
}
