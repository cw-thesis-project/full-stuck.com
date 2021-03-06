import {
  Auth0User,
  Level,
  PastActivity,
  TechName,
  User,
} from '../shared/types';
import { AppAction } from './storeTypes';

// save activity

export function saveActivityRequest(activity: PastActivity): AppAction {
  return {
    type: 'SAVE_ACTIVITY_REQUEST',
    activity,
  };
}

export function saveActivitySuccess(user: User): AppAction {
  return {
    type: 'SAVE_ACTIVITY_SUCCESS',
    user,
  };
}

export function saveActivityFailure(error: Error | string): AppAction {
  return {
    type: 'SAVE_ACTIVITY_FAILURE',
    error,
  };
}

// new game

export function newGameRequest(auth0User: Auth0User): AppAction {
  return {
    type: 'NEW_GAME_REQUEST',
    auth0User,
  };
}

export function newGameSuccess(user: User): AppAction {
  return {
    type: 'NEW_GAME_SUCCESS',
    user,
  };
}

export function newGameFailure(error: Error | string): AppAction {
  return {
    type: 'NEW_GAME_FAILURE',
    error,
  };
}

// learn tech

export function learnTechRequest(techName: TechName): AppAction {
  return {
    type: 'LEARN_TECH_REQUEST',
    techName,
  };
}

export function learnTechSuccess(user: User): AppAction {
  return {
    type: 'LEARN_TECH_SUCCESS',
    user,
  };
}

export function learnTechFailure(error: Error | string): AppAction {
  return {
    type: 'LEARN_TECH_FAILURE',
    error,
  };
}

// level user up

export function levelUserUpRequest(nextLevel: Level): AppAction {
  return {
    type: 'LEVEL_USER_UP_REQUEST',
    nextLevel,
  };
}

export function levelUserUpSuccess(user: User): AppAction {
  return {
    type: 'LEVEL_USER_UP_SUCCESS',
    user,
  };
}

export function levelUserUpFailure(error: Error | string): AppAction {
  return {
    type: 'LEVEL_USER_UP_FAILURE',
    error,
  };
}

// points to assign

export function setPointsToAssign(amount: number): AppAction {
  return {
    type: 'SET_POINTS_TO_ASSIGN',
    amount,
  };
}

export function decreasePointsToAssign(): AppAction {
  return {
    type: 'DECREASE_POINTS_TO_ASSIGN',
  };
}

export function getUserDataRequest(auth0User: Auth0User): AppAction {
  return {
    type: 'GET_USER_DATA_REQUEST',
    auth0User,
  };
}

export function getUserDataSuccess(user: User): AppAction {
  return {
    type: 'GET_USER_DATA_SUCCESS',
    user,
  };
}

export function getUserDataFailure(error: Error | string): AppAction {
  return {
    type: 'GET_USER_DATA_FAILURE',
    error,
  };
}

// UPDATE USER

export function updateUserRequest(user: User): AppAction {
  return {
    type: 'UPDATE_USER_REQUEST',
    user,
  };
}
export function updateUserSuccess(user: User): AppAction {
  return {
    type: 'UPDATE_USER_SUCCESS',
    user,
  };
}

export function updateUserFailure(error: Error | string): AppAction {
  return {
    type: 'UPDATE_USER_FAILURE',
    error,
  };
}
// set topic
export function setActivityTopicRequest(
  techName: TechName,
  user: User
): AppAction {
  return {
    type: 'SET_ACTIVITY_TOPIC_REQUEST',
    techName,
    user,
  };
}

export function setActivityTopicSuccess(user: User): AppAction {
  return {
    type: 'SET_ACTIVITY_TOPIC_SUCCESS',
    user,
  };
}

export function setActivityTopicFailure(error: Error | string): AppAction {
  return {
    type: 'SET_ACTIVITY_TOPIC_FAILURE',
    error,
  };
}
// reset error

export function createUserStore(auth0User: Auth0User): AppAction {
  return {
    type: 'CREATE_USER_STORE',
    auth0User,
  };
}

export function setAppLoading(loading: boolean): AppAction {
  if (loading) {
    return { type: 'SET_APP_LOADING_TRUE' };
  }
  return { type: 'SET_APP_LOADING_FALSE' };
}

export function resetError(): AppAction {
  return {
    type: 'RESET_ERROR',
  };
}
