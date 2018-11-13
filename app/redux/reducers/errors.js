import { USER_LOGIN_ERROR_SET } from '../actionTypes';

export function errors(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_ERROR_SET:
      return { ...state, [USER_LOGIN_ERROR_SET]: action.payload };
  }
  return state;
}
