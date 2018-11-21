import {
  AdmobActionTypes
} from '../actionTypes';
import { Action } from 'redux';

export interface RequestAdLoad extends Action {
  type: AdmobActionTypes.ADMOB_LOAD_REQUEST
}

export interface SetAdIsLoaded extends Action {
  type: AdmobActionTypes.ADMOB_IS_LOADED_SET
  payload: boolean
}

export interface ShowSampleInterstitial extends Action {
  type: AdmobActionTypes.ADMOB_SHOW_SAMPLE_INTERSTITIAL
}

export type AdmobAction = RequestAdLoad | SetAdIsLoaded | ShowSampleInterstitial;

/**
 * Used to indicate to the app that an ad is in the process of loading. Useful for displaying
 * a loading spinner.
 */
export const requestAdLoad = (): RequestAdLoad => {
  return {
    type: AdmobActionTypes.ADMOB_LOAD_REQUEST
  };
}

/**
 * Indicates to the app that the ad has loaded. This can be used to let the app hide a loading spinner.
 * @param isLoaded
 */
export const setAdIsLoaded = (isLoaded: boolean): SetAdIsLoaded => {
  return {
    type: AdmobActionTypes.ADMOB_IS_LOADED_SET,
    payload: isLoaded
  };
}

export const showSampleInterstitial = (): ShowSampleInterstitial => {
  return {
    type: AdmobActionTypes.ADMOB_SHOW_SAMPLE_INTERSTITIAL
  };
}
