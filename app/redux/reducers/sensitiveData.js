import { REHYDRATE } from 'redux-persist';

// Persisted data that requires encryption
export function sensitiveData(state = {}, action) {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}
