import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import React from 'react';
import * as appActions from './actions';
import * as thunks from './thunks';
import { AppAction, AppState, Thunk } from './storeTypes';

export const actions = {
  learnTech: thunks.learnTech,
  saveActivity: thunks.saveActivity,
  getUserData: thunks.getUserData,
  newGame: thunks.newGame,
  levelUserUp: thunks.levelUserUp,
  decreasePointsToAssign: appActions.decreasePointsToAssign,
  setPointsToAssign: appActions.setPointsToAssign,
};

// <any> for now, until I figure out how to solve it (my bad)
export const useAppDispatch = (): React.Dispatch<Thunk | AppAction> =>
  useDispatch();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { default as store } from './store';
