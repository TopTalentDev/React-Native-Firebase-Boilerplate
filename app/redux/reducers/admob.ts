import { AdmobActionTypes } from '../actionTypes';
import { AdmobAction } from '../actions/admob';
import { Reducer } from 'redux';

export interface AdMobState {
  isLoading: boolean
  didLoad: boolean
}

export const admob: Reducer<AdMobState, AdmobAction> = (state={ isLoading: false, didLoad: false}, action) => {
  switch (action.type) {
    case AdmobActionTypes.ADMOB_LOAD_REQUEST: {
      return { ...state, isLoading: true, didLoad: false };
    }
    case AdmobActionTypes.ADMOB_IS_LOADED_SET: {
      return { ...state, isLoading: false, didLoad: action.payload };
    }
  }
  return state;
}

