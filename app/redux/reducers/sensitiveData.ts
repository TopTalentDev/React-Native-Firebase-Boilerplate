import { REHYDRATE } from 'redux-persist';
import { Reducer } from 'redux';

// Persisted data that requires encryption
export const sensitiveData: Reducer<any, any> = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}
