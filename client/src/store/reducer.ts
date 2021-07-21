/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Auth0User, User } from 'shared/types';
import { emptyUser } from 'shared/constants';
import { deepCopy } from 'shared/utils';
import { AppState, AppAction, FailureAction } from './storeTypes';

export const defaultState: AppState = {
  pointsToAssign: 0,
  loading: false,
  error: '',
  user: {
    _id: 'unregister',
    username: 'unregister',
    gameData: {
      techExperience: {
        javascript: 0,
        git: 0,
        react: 0,
        graphql: 0,
        rxjs: 0,
        typescript: 0,
        debugging: 0,
        eloquence: 0,
        espionage: 0,
      },
      history: [],
      level: 'junior',
    },
  },
};

export function reducer(state = defaultState, action: AppAction): AppState {
  let auxState: AppState;

  switch (action.type) {
    case 'CREATE_USER_STORE':
      return createUserStore(action.auth0User, state);

    case 'SET_POINTS_TO_ASSIGN':
      return setPointsToAssign(action.amount, state);

    case 'DECREASE_POINTS_TO_ASSIGN':
      return decreasePointsToAssign(state);

    case 'SAVE_ACTIVITY_SUCCESS':
      auxState = stopLoading(state);
      return addActivityToUserHistory(action.user, auxState);

    case 'UPDATE_USER_SUCCESS':
      auxState = stopLoading(state);
      return saveUser(action.user, auxState);

    case 'LEVEL_USER_UP_SUCCESS':
      auxState = stopLoading(state);
      return makeUserLevelUp(action.user, auxState);

    case 'LEARN_TECH_SUCCESS':
      auxState = stopLoading(state);
      return makeUserLearnTech(action.user, auxState);

    case 'GET_USER_DATA_SUCCESS':
    case 'NEW_GAME_SUCCESS':
      auxState = stopLoading(state);
      return saveUser(action.user, auxState);

    case 'SET_ACTIVITY_TOPIC_SUCCESS':
      auxState = stopLoading(state);
      return changeTopic(action.user, auxState);

    case 'NEW_GAME_REQUEST':
    case 'GET_USER_DATA_REQUEST':
    case 'LEARN_TECH_REQUEST':
    case 'SAVE_ACTIVITY_REQUEST':
    case 'LEVEL_USER_UP_REQUEST':
    case 'UPDATE_USER_REQUEST':
    case 'SET_ACTIVITY_TOPIC_REQUEST':
    case 'SET_APP_LOADING_TRUE':
      return startLoading(state);

    case 'NEW_GAME_FAILURE':
    case 'GET_USER_DATA_FAILURE':
    case 'LEARN_TECH_FAILURE':
    case 'SAVE_ACTIVITY_FAILURE':
    case 'LEVEL_USER_UP_FAILURE':
    case 'UPDATE_USER_FAILURE':
    case 'SET_ACTIVITY_TOPIC_FAILURE':
      auxState = stopLoading(state);
      return handleError(auxState, action as FailureAction);

    case 'SET_APP_LOADING_FALSE':
      return stopLoading(state);

    case 'RESET_ERROR':
      return resetError(state);

    default:
      return state;
  }
}

function createUserStore(auth0User: Auth0User, state: AppState): AppState {
  const user = deepCopy(emptyUser);
  user._id = auth0User.sub;
  user.username = auth0User?.nickname
    ? auth0User.nickname
    : auth0User?.name
    ? auth0User.name
    : auth0User?.email;

  return { ...state, user };
}

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

function makeUserLevelUp(user: User, state: AppState): AppState {
  if (!state.user) {
    return state;
  }
  return saveUser(user, state);
}

function changeTopic(user: User, state: AppState) {
  if (!state.user) {
    return state;
  }
  return saveUser(user, state);
}
