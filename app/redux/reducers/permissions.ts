import { PermissionsActionTypes } from '../actionTypes';
import { PermissionAction } from '../actions/permissions';
import { Reducer } from 'redux';

interface PermissionsState {}
const permissionsState = {};

export const permissions: Reducer<PermissionsState, PermissionAction>=(state = permissionsState, action) => {
  switch (action.type) {
    case PermissionsActionTypes.PERMISSIONS_ALL_SET:
      return { ...state, ...action.payload };
  }
  return state;
}
