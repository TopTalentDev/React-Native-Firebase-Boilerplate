import { PermissionsActionTypes } from '../actionTypes';
import { Action } from 'redux';

export interface GetAllPermissions extends Action {
  type: PermissionsActionTypes.PERMISSIONS_ALL_GET
}

export interface SetAllPermissions extends Action {
  type: PermissionsActionTypes.PERMISSIONS_ALL_SET
  payload: string[]
}

export interface RequestPermission extends Action {
  type: PermissionsActionTypes.PERMISSIONS_REQUEST
  payload: string
}

export type PermissionAction = GetAllPermissions | SetAllPermissions | RequestPermission;

export const getAllPermissions = (): GetAllPermissions => {
  return {
    type: PermissionsActionTypes.PERMISSIONS_ALL_GET
  };
}

export const setAllPermissions = (permissions: string[]): SetAllPermissions => {
  return {
    type: PermissionsActionTypes.PERMISSIONS_ALL_SET,
    payload: permissions
  };
}

export const requestPermission = (type: string): RequestPermission => {
  return {
    type: PermissionsActionTypes.PERMISSIONS_REQUEST,
    payload: type
  };
}
