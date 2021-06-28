import { PastActivity, TechName, User } from '../shared/types';
import { AppAction } from './storeTypes';

// save activity

export function saveActivityRequest(activity: PastActivity): AppAction {
  return {
    type: 'SAVE_ACTIVITY_REQUEST',
    activity,
  };
}

export function saveActivitySuccess(activity: PastActivity): AppAction {
  return {
    type: 'SAVE_ACTIVITY_SUCCESS',
    activity,
  };
}

export function saveActivityFailure(error: Error | string): AppAction {
  return {
    type: 'SAVE_ACTIVITY_FAILURE',
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

export function learnTechSuccess(techName: TechName): AppAction {
  return {
    type: 'LEARN_TECH_SUCCESS',
    techName,
  };
}

export function learnTechFailure(error: Error | string): AppAction {
  return {
    type: 'LEARN_TECH_FAILURE',
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

// login

// export function loginRequest(credentials: UserCredentials): AppAction {
//   return {
//     type: 'LOGIN_REQUEST',
//     credentials
//   };
// }

export function loginSuccess(user: User): AppAction {
  return {
    type: 'LOGIN_SUCCESS',
    user,
  };
}

export function loginFailure(error: Error | string): AppAction {
  return {
    type: 'LOGIN_FAILURE',
    error,
  };
}

// register

// export function registerRequest(credentials: UserCredentials): AppAction {
//   return {
//     type: 'REGISTER_REQUEST',
//     credentials
//   };
// }

export function registerSuccess(user: User): AppAction {
  return {
    type: 'REGISTER_SUCCESS',
    user,
  };
}

export function registerFailure(error: Error | string): AppAction {
  return {
    type: 'REGISTER_FAILURE',
    error,
  };
}

// reset error

export function resetError(): AppAction {
  return {
    type: 'RESET_ERROR',
  };
}
