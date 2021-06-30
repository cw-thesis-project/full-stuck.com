import { PastActivity, TechName, User } from '../shared/types';
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

// login

// export function loginRequest(credentials: UserCredentials): AppAction {
//   return {
//     type: 'LOGIN_REQUEST',
//     credentials
//   };
// }

// export function loginSuccess(user: User): AppAction {
//   return {
//     type: 'LOGIN_SUCCESS',
//     user,
//   };
// }

// export function loginFailure(error: Error | string): AppAction {
//   return {
//     type: 'LOGIN_FAILURE',
//     error,
//   };
// }

// register

// export function registerRequest(credentials: UserCredentials): AppAction {
//   return {
//     type: 'REGISTER_REQUEST',
//     credentials
//   };
// }

// export function registerSuccess(user: User): AppAction {
//   return {
//     type: 'REGISTER_SUCCESS',
//     user,
//   };
// }

// export function registerFailure(error: Error | string): AppAction {
//   return {
//     type: 'REGISTER_FAILURE',
//     error,
//   };
// }

// reset error

export function resetError(): AppAction {
  return {
    type: 'RESET_ERROR',
  };
}
