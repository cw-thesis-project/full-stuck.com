import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as appActions from './actions';
import * as thunks from './thunks';
import { AppState } from './storeTypes';

export const actions = {
  learnTech: thunks.learnTech,
  saveActivity: thunks.saveActivity,
  getUserData: thunks.getUserData,
  // login: thunks.login,
  // register: thunks.register,
  decreasePointsToAssign: appActions.decreasePointsToAssign,
  setPointsToAssign: appActions.setPointsToAssign,
};

// <any> for now, until I figure out how to solve it (my bad)
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { default as store } from './store';
