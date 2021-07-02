import { Level, PastActivity, TechName, User } from '../shared/types';
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

export function newGameRequest(username: string): AppAction {
  return {
    type: 'NEW_GAME_REQUEST',
    username,
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

export function getUserDataRequest(username: string): AppAction {
  return {
    type: 'GET_USER_DATA_REQUEST',
    username,
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

// reset error

export function resetError(): AppAction {
  return {
    type: 'RESET_ERROR',
  };
}
