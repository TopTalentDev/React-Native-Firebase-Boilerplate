import { AUTH_ERROR_SET, ERROR_CLEAR, ERROR_CLEAR_ALL } from '../actionTypes';

export function errors(state = {}, action) {
  switch (action.type) {
    case AUTH_ERROR_SET:
      return { ...state, authError: action.payload };
    case ERROR_CLEAR:
      return { ...state, [action.payload]: null };
    case ERROR_CLEAR_ALL:
      return {};
  }
  return state;
}
