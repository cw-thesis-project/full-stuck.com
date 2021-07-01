import { PastActivity, TechName, User } from '../shared/types';
import { deepCopy } from '../utils/utils';
import { AppState, AppAction, FailureAction } from './storeTypes';

export const defaultState: AppState = {
  pointsToAssign: 0,
  user: null,
  loading: false,
  error: '',
};

function setPointsToAssign(amount: number, state: AppState): AppState {
  return { ...state, pointsToAssign: amount };
}

function decreasePointsToAssign(state: AppState): AppState {
  return { ...state, pointsToAssign: state.pointsToAssign - 1 };
}

function saveUser(user: User, state: AppState): AppState {
  return { ...state, user };
}

function addActivityToUserHistory(user: User, state: AppState): AppState {
  if (!state.user) {
    return state;
  }
  return saveUser(user, state);
}

function makeUserLearnTech(user: User, state: AppState): AppState {
  if (!state.user) {
    return state;
  }
  return saveUser(user, state);
}

function handleError(state: AppState, { error }: FailureAction) {
  return { ...state, error };
}

function stopLoading(state: AppState): AppState {
  return { ...state, loading: false };
}

function startLoading(state: AppState): AppState {
  return { ...state, loading: true };
}

function resetError(state: AppState): AppState {
  return { ...state, error: '' };
}

export function reducer(state = defaultState, action: AppAction): AppState {
  let auxState: AppState;

  switch (action.type) {
    case 'SET_POINTS_TO_ASSIGN':
      return setPointsToAssign(action.amount, state);

    case 'DECREASE_POINTS_TO_ASSIGN':
      return decreasePointsToAssign(state);

    case 'SAVE_ACTIVITY_SUCCESS':
      auxState = stopLoading(state);
      return addActivityToUserHistory(action.user, auxState);

    case 'LEARN_TECH_SUCCESS':
      auxState = stopLoading(state);
      return makeUserLearnTech(action.user, auxState);

    case 'GET_USER_DATA_SUCCESS':
    case 'NEW_GAME_SUCCESS':
      auxState = stopLoading(state);
      return saveUser(action.user, auxState);

    case 'NEW_GAME_REQUEST':
    case 'GET_USER_DATA_REQUEST':
    case 'LEARN_TECH_REQUEST':
    case 'SAVE_ACTIVITY_REQUEST':
      return startLoading(state);

    case 'NEW_GAME_FAILURE':
    case 'GET_USER_DATA_FAILURE':
    case 'LEARN_TECH_FAILURE':
    case 'SAVE_ACTIVITY_FAILURE':
      auxState = stopLoading(state);
      return handleError(auxState, action as FailureAction);

    case 'RESET_ERROR':
      return resetError(state);

    default:
      return state;
  }
}
