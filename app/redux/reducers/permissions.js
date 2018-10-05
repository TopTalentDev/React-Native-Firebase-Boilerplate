import { PERMISSIONS_ALL_SET } from '../actionTypes';

const permissionsState = {};

export function permissions(state = permissionsState, action) {
  switch (action.type) {
    case PERMISSIONS_ALL_SET:
      return { ...state, ...action.payload };
  }
  return state;
}
