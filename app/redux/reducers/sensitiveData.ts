import { REHYDRATE } from 'redux-persist';
import { Reducer } from 'redux';

export interface SensitiveDataState {}
// Persisted data that requires encryption
export const sensitiveData: Reducer<SensitiveDataState, any> = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return { ...state };
    }
  }
  return state;
}
