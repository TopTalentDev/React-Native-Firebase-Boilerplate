import { PERMISSIONS_ALL_GET, PERMISSIONS_ALL_SET, PERMISSIONS_REQUEST } from '../actionTypes';

export function getAllPermissions() {
  return {
    type: PERMISSIONS_ALL_GET
  };
}

export function setAllPermissions(permissions) {
  return {
    type: PERMISSIONS_ALL_SET,
    payload: permissions
  };
}

export function requestPermission(type) {
  return {
    type: PERMISSIONS_REQUEST,
    payload: type
  };
}
