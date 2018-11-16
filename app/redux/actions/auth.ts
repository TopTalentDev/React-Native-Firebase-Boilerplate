import {
  AuthActionTypes
} from '../actionTypes';
import { Action } from 'redux';
import { User, AdditionalUserInfo } from '../../types';

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
  payload: User
}

export interface SetAdditionalUserInfo extends Action {
  type: AuthActionTypes.AUTH_ADDITIONAL_USER_INFO_SET
  payload: AdditionalUserInfo
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

export const requestAnonymousLogin = (): RequestAnonymousLogin => {
  return {
    type: AuthActionTypes.AUTH_ANONYMOUS_LOGIN_REQUEST
  };
}

export const requestUserCreateWithEmailAndPassword = (email: string, password: string): RequestUserCreateWithEmailAndPassword => {
  return {
    type: AuthActionTypes.AUTH_CREATE_EMAIL_PASSWORD_USER_REQUEST,
    payload: { email, password }
  };
}

export const requestFacebookLogin = (): RequestFacebookLogin => {
  return {
    type: AuthActionTypes.AUTH_FACEBOOK_LOGIN_REQUEST
  };
}

export const setAdditionalUserInfo = (data: any): SetAdditionalUserInfo => {
  return {
    type: AuthActionTypes.AUTH_ADDITIONAL_USER_INFO_SET,
    payload: data
  };
}

export const setAuthChange = (user: User): SetAuthChange => {
  return {
    type: AuthActionTypes.AUTH_STATE_CHANGE_SET,
    payload: user
  };
}

export const setAuthError = (error: string): SetAuthError => {
  return {
    type: AuthActionTypes.AUTH_ERROR_SET,
    payload: error
  };
}

export const requestLogin = (email: string, password: string): RequestLogin =>  {
  return {
    type: AuthActionTypes.AUTH_LOGIN_REQUEST,
    payload: { email, password }
  };
}

export const requestLogout = (): RequestLogout => {
  return {
    type: AuthActionTypes.AUTH_LOGOUT_REQUEST
  };
}